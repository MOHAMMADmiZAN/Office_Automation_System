import multer, { Multer } from 'multer';
import path from 'path';
import fs from 'fs';
import { v2 as cloudinaryV2 } from 'cloudinary';

cloudinaryV2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});


const fileUpload: Multer = multer({
    limits: {
        fileSize: 10000000 // maximum file size in bytes (10 MB)
    },
    fileFilter: (_req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf|doc|docx|xls|xlsx)$/i)) {
            return callback(new Error('Only image, pdf, doc and excel files are allowed!'))
        }
        callback(null, true)
    },
    storage: multer.diskStorage({
        destination: (_req, _file, cb) => {
            cb(null, 'public/uploads');
        },
        filename: (_req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        },
    }),
});


const handleFileDelete = async (filename: string): Promise<any> => {
    const filePath = path.join(__dirname, '..', `public/${filename}`);

    return new Promise((resolve: any, reject: any) => {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('File delete error=', err);
                reject(err)
            }

            console.log(`File ${filePath} deleted`);
            resolve(filePath)
        });
    })
};


const handleCloudFileUpload = async (file: Express.Multer.File): Promise<string> => {
    if (!file?.path) {
        throw new Error("File not found!");
    }

    try {
        const result = await cloudinaryV2.uploader.upload(file.path);
        console.log('file upload successfully:', result);

        // Delete file from local storage
        handleFileDelete(file.path.slice(7))

        return result.secure_url!;
    } catch (error) {
        console.log('Error uploading file to Cloudinary:', error);
        throw error;
    }
};

const handleCloudFileDelete = async (path: string): Promise<any> => {
    try {
        const arr = path.split('/');
        path = arr[arr.length - 1].split('.')[0];

        const result = await cloudinaryV2.uploader.destroy(path);
        console.log('file delete successfully:', result);
        return result;
    } catch (error) {
        console.log('Error delete file to Cloudinary:', error);
        throw error;
    }
};


export {
    fileUpload,
    handleFileDelete,
    handleCloudFileUpload,
    handleCloudFileDelete
};

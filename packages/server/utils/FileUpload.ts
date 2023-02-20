import multer, {Multer} from 'multer';
import {v2 as cloudinaryV2} from 'cloudinary';

const fileUpload: Multer = multer({
    storage: multer.diskStorage({}),
    limits: {
        fileSize: 10000000 // maximum file size in bytes (10 MB)
    },
    fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf|doc|docx|xls|xlsx)$/)) {
            return callback(new Error('Only image, pdf, doc and excel files are allowed!'))
        }
        callback(null, true)
    }
});

cloudinaryV2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const handleFileUpload = async (file: Express.Multer.File): Promise<string> => {
    if (!file?.path) {
        throw new Error("File not found!");
    }

    try {
        const result = await cloudinaryV2.uploader.upload(file.path);
        console.log('file upload successfully:', result);
        return result.secure_url!;
    } catch (error) {
        console.log('Error uploading file to Cloudinary:', error);
        throw error;
    }
};

const handleFileDelete = async (path: string): Promise<any> => {
    try {
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
    handleFileUpload,
    handleFileDelete
};

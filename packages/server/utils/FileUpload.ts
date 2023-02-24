import multer, { Multer } from 'multer';
import path from 'path';
import fs from 'fs';


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
    const filePath = path.join(__dirname, `public/${filename}`);

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



export {
    fileUpload,
    handleFileDelete,
};

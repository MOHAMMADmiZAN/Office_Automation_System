import multer from 'multer';
import cloudinary from 'cloudinary'

const cloudinaryV2 = cloudinary.v2
const fileUpload = multer({
    storage: multer.diskStorage({}),
    limits: {
        fileSize: 10000000 // maximum file size in bytes (10 MB)
    },
    fileFilter: (req: any, file: any, callback: any) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf|doc|docx|xls|xlsx)$/)) {
            return callback(new Error('Only image, pdf, doc and excel files are allowed!'))
        }
        callback(null, true)
    }
})


cloudinaryV2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


async function handleFileUpload(file: any): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
        if (!file?.path) {
            reject(new Error("File not found!"))
        }
        cloudinaryV2.uploader.upload(file.path, (error: any, result: any) => {
            if (error) {
                console.log('Error uploading file to Cloudinary: ', error);
                reject(error)
            }
            // Return Cloudinary URL of uploaded file
            console.log('file upload successfully=', result)
            resolve(result.secure_url)
        });
    })
}

async function handleFileDelete(path: string): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
        cloudinaryV2.uploader.destroy(path, (error: any, result: any) => {
            if (error) {
                console.log('Error delete file to Cloudinary: ', error);
                reject(error)
            }
            // Return Cloudinary URL of uploaded file
            console.log('file delete successfully=', result)
            resolve(result)
        });
    })
}


export {
    fileUpload,
    handleFileUpload,
    handleFileDelete
}

import multer from 'multer';
import cloudinary from 'cloudinary'

const cloudinaryV2 = cloudinary.v2
const fileUpload = multer({ dest: 'uploads/' })


cloudinaryV2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


async function handleFileUpload(file: any): Promise<any> {
    return new Promise((resolve: any, reject: any) => {
        cloudinaryV2.uploader.upload(file.path, (error: any, result: any) => {
            if (error) {
                console.log('Error uploading image to Cloudinary: ', error);
                reject(error)
            }
            // Return Cloudinary URL of uploaded image
            console.log('file upload successfully=', result)
            resolve(result.secure_url)
        });
    })
}


export {
    fileUpload,
    handleFileUpload
}
import UserService from "../services/UserService";
import {NextFunction, Response} from "express";
import {handleCloudFileDelete, handleCloudFileUpload} from "../utils/FileUpload";
import * as bcrypt from "bcrypt";


interface IUserController {
    userList: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    avatarUpdate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    userUpdate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    passwordChange: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

class UserController extends UserService implements IUserController {

    public userList = async (_req, res, next) => {
        try {
            const data = await this.findUsers();
            res.status(200).json({
                message: 'User list found successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }
    public avatarUpdate = async (req, res, next) => {
        try {
            // Check and delete previous file;
            const userInfo = await this.findUser('_id', req.params.id);
            console.log(userInfo)
            if (userInfo?.avatar) {
                await handleCloudFileDelete(userInfo.avatar);
            }
            console.log(req.file)
            console.log(req.body)
            return

            const fileUrl = await handleCloudFileUpload(req.file)
            const data = await this.updateUserAvatar(req.params.id, fileUrl);

            res.status(200).json({
                message: 'Avatar successfully updated.',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }
    public userUpdate = async (req, res, next) => {
        try {

            if (req.file) {
                // Check and delete previous file;
                const userInfo = await this.findUser('_id', req.params.id);
                if (userInfo?.avatar) {
                    await handleCloudFileDelete(userInfo.avatar);
                }
                const fileUrl = await handleCloudFileUpload(req.file)
                req.body.avatar = fileUrl;
            }


            const data = await this.updateUser(req.params.id, req.body);
            res.status(200).json({
                message: 'User successfully updated.',
                data: data
            })
        } catch (error: any) {
            next(error)
        }
    }

    public passwordChange = async (req, res, next) => {
        try {
            const userId = req.user._id;
            const {oldPassword, password, confirmPassword} = req.body

            if (password !== confirmPassword) {
                throw new Error("Confirm password doesn't match!")
            }

            const user = await this.findUser("_id", userId);

            if (!user) {
                throw new Error("User not found!");
            }

            const match = await bcrypt.compare(oldPassword, user.password);
            if (!match) {
                throw new Error("Current password doesn't match!");
            }

            const data = await this.changePasswordService(userId, password);
            res.status(200).json({
                message: 'Password has been changed successfully',
                data
            })
        } catch (error: any) {
            console.log('error', error)
            next(error)
        }
    }


}

export default UserController;
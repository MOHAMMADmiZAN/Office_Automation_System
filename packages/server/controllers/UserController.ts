import UserService from "../services/UserService";
import { NextFunction, Response } from "express";
import { handleCloudFileUpload, handleCloudFileDelete } from "../utils/FileUpload";


interface IUserController {
    userList: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    avatarUpdate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    userUpdate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
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
            if (userInfo?.avatar) {
                await handleCloudFileDelete(userInfo.avatar);
            }

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

            const data = await this.updateUser(req.params.id, req.body);
            res.status(200).json({
                message: 'User successfully updated.',
                data: data
            })
        } catch (error: any) {
            next(error)
        }
    }


}

export default UserController;
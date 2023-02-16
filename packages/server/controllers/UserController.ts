import UserService from "../services/UserService";
import { NextFunction, Response } from "express";


interface IUserController {
    userList: (req: Request, res: Response, next: NextFunction) => Promise<void>;
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

}

export default UserController;
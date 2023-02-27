import { IChangePassword } from "../models/User";
import AuthService from "../services/AuthService";
import { NextFunction } from "express";
import { handleCloudFileUpload } from "../utils/FileUpload";


interface AuthControllerInterface {
    userRegister: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    userLogin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    passwordChange: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

class AuthController extends AuthService implements AuthControllerInterface {
    public userRegister = async (req, res, next) => {
        try {
            const fileUrl = await handleCloudFileUpload(req.file)
            const user = await this.register({ ...req.body, avatar: fileUrl });
            res.status(201).json({
                message: 'User created successfully',
                user: user
            })
        } catch (error: any) {
            next(error)
        }
    }
    public userLogin = async (req, res, next) => {
        try {
            const token = await this.login(req.body.email, req.body.password);
            res.status(200).json({
                message: 'Login successful',
                ...token
            })
        } catch (error: any) {
            next(error)
        }
    }

    public passwordChange = async (req, res, next) => {
        try {
            const { oldPassword, password, confirmPassword } = req.body

            if (password !== confirmPassword) {
                throw new Error("Confirm password doesn't match!")
            }

            const changePassword: IChangePassword = {
                userId: req.params.id,
                oldPassword,
                password
            }
            const data = await this.changePassword(changePassword);
            res.status(200).json({
                message: 'Password has been changed successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }


}

export default AuthController;
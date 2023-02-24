import AuthService from "../services/AuthService";
import { NextFunction } from "express";


interface AuthControllerInterface {
    userRegister: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    userLogin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

class AuthController extends AuthService implements AuthControllerInterface {
    public userRegister = async (req, res, next) => {
        try {
            const user = await this.register({ ...req.body, avatar: `uploads/${req.file.filename}` });
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



}

export default AuthController;
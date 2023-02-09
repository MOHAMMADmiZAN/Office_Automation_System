import AuthService from "../services/AuthService";
import errorHandler, {errorResponse} from "../utils/error";
import * as http from "http";


interface AuthControllerInterface {
    userRegister: (req: Request, res: Response) => Promise<void>;
    userLogin: (req: Request, res: Response) => Promise<void>;
}

class AuthController extends AuthService implements AuthControllerInterface{
    public userRegister = async (req, res) => {
        try {
            const user = await this.register(req.body);
            res.status(201).json({
                message: 'User created successfully',
                user: user
            })
        } catch (e ) {
            if (e instanceof Error) {
                res.status(400).json({
                    message: e.message
                })
            }
        }
    }

    public userLogin = async (req, res) => {
        try {
            const token = await this.login(req.body.email, req.body.password);
            res.status(200).json({
                message: 'Login successful',
                ...token
            })
        } catch (e ) {
         if (e instanceof Error) {
            res.status(400).json({
                    message: e.message
                })

         }

        }
    }



}

export default AuthController;
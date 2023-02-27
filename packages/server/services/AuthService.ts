import UserService, { IUserService } from "./UserService";
import { IUser, IChangePassword } from "../models/User";
import * as bcrypt from "bcrypt";
import errorHandler from "../utils/error";


interface ILogin {
    token: string;
    user: IUser;
}

interface IAuthService extends IUserService {
    register(data: IUser): Promise<IUser | null>;
    login(email: string, password: string): Promise<ILogin>;
    changePassword(data: IChangePassword): Promise<IUser | null>;
}


class AuthService extends UserService implements IAuthService {

    // @ts-ignore
    public register = async (data: IUser): Promise<IUser | null> => {

        try {
            const user = await this.findUser("email", data.email);
            if (user) throw errorHandler('User already exists', 409);

            return this.createUser(data)

        } catch (e) {
            if (e instanceof Error) {
                throw errorHandler(e.message, 400)
            }
        }


    };

    public login = async (email: string, password: string) => {
        const user = await this.findUser("email", email);

        if (!user) {
            throw errorHandler("Invalid credentials", 400);
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw errorHandler("Invalid credentials", 400);
        }
        return {
            token: this.tokenGenerator(user),
            user
        }
    };


    public changePassword = async (data: IChangePassword): Promise<IUser | null> => {
        const { userId, oldPassword, password } = data

        const user = await this.findUser("_id", userId);

        if (!user) {
            throw errorHandler("User not found!", 400);
        }
        const match = await bcrypt.compare(oldPassword, user.password);
        if (!match) {
            throw errorHandler("Current password doesn't match!", 400);
        }
        return this.changePasswordService(userId, password);
    };
}

export default AuthService;

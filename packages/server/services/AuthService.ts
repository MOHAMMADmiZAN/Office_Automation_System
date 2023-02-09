import UserService, {IUserService} from "./UserService";
import {IUser} from "../models/User";
import * as bcrypt from "bcrypt";
import errorHandler from "../utils/error";

interface IAuthService extends IUserService {
    register(data: IUser): Promise<IUser>;
    login(email: string, password: string): Promise<string>;
}

class AuthService extends UserService implements IAuthService {
    public register = async (data: IUser) : Promise<IUser> => {
        try {
            const user = await this.findUser("email", data.email);
            if (user) {
                throw errorHandler("User already exists", 400);
            }

           return  await this.createUser(data);


        } catch (e) {
           if (e instanceof Error) {
               throw errorHandler(e.message, 400);
           }
        }
        return data;
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

        return this.tokenGenerator(user);
    };
}

export default AuthService;

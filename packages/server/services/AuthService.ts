import UserService, {IUserService} from "./UserService";
import {IUser} from "../models/User";
import * as bcrypt from "bcrypt";
import errorHandler, {errorResponse} from "../utils/error";


interface ILogin{
    token: string;
    user: IUser;
}
interface IAuthService extends IUserService {
    register(data: IUser): Promise<IUser|null>;
    login(email: string, password: string): Promise<ILogin>;
}

class AuthService extends UserService implements IAuthService {
    public register = async (data: IUser) : Promise<IUser|null> => {
        try {
            const user = await this.findUser("email", data.email);
            if (user) throw errorHandler('User already exists', 409);

            return  this.createUser(data)

        }catch (e) {
            throw errorResponse(e as Error, 400)
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
        return  {
            token: this.tokenGenerator(user),
            user

        }

    };
}

export default AuthService;

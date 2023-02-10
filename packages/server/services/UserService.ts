import User, {IUser} from "../models/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

export interface IUserService {
    createUser(user: IUser): Promise<IUser>;
    findUser(key: string, value: any): Promise<IUser | null>;
    findUsers(): Promise<IUser[]>;
    userDeleted(id: string): Promise<void>;
    updateUser(id: string, data: any): Promise<IUser | null>;
    tokenGenerator(user: IUser): string;

}



class UserService implements IUserService {
    async createUser({firstName,lastName,email,password,role,status,avatar}:IUser): Promise<IUser> {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        let user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role,
            status,
            avatar
        });
       return  await user.save();
    }

    findUser(key: string, value: string): Promise<IUser | null> {
        if (key === '_id') {
            return User.findById(value).exec();
        }
        return User.findOne({[key]: value}).exec();
    }

    findUsers(): Promise<IUser[]> {
        return User.find().select('-password').exec();
    }

    async userDeleted(id: string): Promise<void> {
        await User.findByIdAndDelete(id).exec();
    }

    updateUser(id: string, data: any): Promise<IUser | null> {
        return User.findByIdAndUpdate(id, {...data}, {new: true}).exec();
    }

    tokenGenerator(user): string {
        const payload = {
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                status: user.status
            }
        }
        console.log(payload)
        const jwtSecret = process.env.JWT_SECRET || 'SECRET'
        return jwt.sign(payload, jwtSecret, {expiresIn: '1d'});
    }

}


export default UserService;

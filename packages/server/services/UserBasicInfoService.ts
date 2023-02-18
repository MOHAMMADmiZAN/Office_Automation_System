import UserBasicInfo, { IUserBasicInfo } from "../models/UserBasicInfo";
import errorHandler from "../utils/error";



interface IUserBasicInfoService {
    createUserBasicInfo(data: IUserBasicInfo): Promise<IUserBasicInfo>;
    findUserBasicInfo(key: string, value: any): Promise<IUserBasicInfo | null>;
    findUserBasicInfos(): Promise<IUserBasicInfo[]>;
    updateUserBasicInfo(data: IUserBasicInfo, id: string): Promise<IUserBasicInfo | null>;
    deleteUserBasicInfo(id: string): Promise<IUserBasicInfo | null>;

}


class UserBasicInfoService implements IUserBasicInfoService {

    async createUserBasicInfo(data: IUserBasicInfo): Promise<IUserBasicInfo> {
        const hasInfo = await this.findUserBasicInfo('user', data.user);
        if (hasInfo) {
            throw errorHandler('User basic info already exists Please Update it in ProperWay', 409);
        }
        let schema = new UserBasicInfo({
            ...data
        })
        return schema.save();
    }

    findUserBasicInfo(key: string, value: any): Promise<IUserBasicInfo | null> {
        if (key === '_id') {
            return UserBasicInfo.findById(value).exec()
        }
        return UserBasicInfo.findOne({ [key]: value }).exec();
    }

    findUserBasicInfos(): Promise<IUserBasicInfo[]> {
        return UserBasicInfo.find().exec();
    }

    async updateUserBasicInfo(data: IUserBasicInfo, id: string): Promise<IUserBasicInfo | null> {
        let schema = {
            ...data
        }
        return UserBasicInfo.findByIdAndUpdate(id, { ...schema }, { new: true });
    }

    deleteUserBasicInfo(id: string): Promise<IUserBasicInfo | null> {
        return UserBasicInfo.findByIdAndDelete(id).exec();
    }



}

export default UserBasicInfoService;
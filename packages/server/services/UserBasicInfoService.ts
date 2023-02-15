import UserBasicInfo, { IUserBasicInfo } from "../models/UserBasicInfo";



interface IUserBasicInfoService {
    createUserBasicInfo(data: IUserBasicInfo): Promise<IUserBasicInfo>;
    findUserBasicInfo(key: string, value: any): Promise<IUserBasicInfo | null>;
    findUserBasicInfos(): Promise<IUserBasicInfo[]>;
    updateUserBasicInfo(data: IUserBasicInfo, id: string): Promise<IUserBasicInfo | null>;
    deleteUserBasicInfo(id: string): Promise<IUserBasicInfo | null>;
}


class UserBasicInfoService implements IUserBasicInfoService {

    createUserBasicInfo(data: IUserBasicInfo): Promise<IUserBasicInfo> {
        let schema = new UserBasicInfo({
            user: data.user,
            contact: data.contact,
            presentAddress: data.presentAddress,
            permanentAddress: data.permanentAddress,
            dateOfBirth: data.dateOfBirth,
            eContactNumber: data.eContactNumber,
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
            contact: data.contact,
            presentAddress: data.presentAddress,
            permanentAddress: data.permanentAddress,
            dateOfBirth: data.dateOfBirth,
            eContactNumber: data.eContactNumber,
        }
        return UserBasicInfo.findByIdAndUpdate(id, { ...schema }, { new: true });
    }

    deleteUserBasicInfo(id: string): Promise<IUserBasicInfo | null> {
        return UserBasicInfo.findByIdAndDelete(id).exec();
    }

}

export default UserBasicInfoService;
import UserDocument, {IUserDocument} from "../models/UserDocument";


interface IUserDocumentService {
    createUserDocument(data: IUserDocument): Promise<IUserDocument>;

    findUserDocument(key: string, value: any): Promise<IUserDocument | null>;

    findUserDocuments(): Promise<IUserDocument[]>;

    findUserDocumentsByUser(userId: string): Promise<IUserDocument[]>;

    updateUserDocument(data: IUserDocument, id: string): Promise<IUserDocument | null>;

    deleteUserDocument(id: string): Promise<IUserDocument | null>;
}


class UserDocumentService implements IUserDocumentService {

    async createUserDocument(data: IUserDocument): Promise<IUserDocument> {
        let schema = new UserDocument({
            ...data
        })
        return schema.save();
    }

    findUserDocument(key: string, value: any): Promise<IUserDocument | null> {
        if (key === '_id') {
            return UserDocument.findById(value).exec()
        }
        return UserDocument.findOne({[key]: value}).exec();
    }

    findUserDocuments(): Promise<IUserDocument[]> {
        return UserDocument.find().exec();
    }

    findUserDocumentsByUser(userId: string): Promise<IUserDocument[]> {
        return UserDocument.find({user: userId}).exec();
    }

    async updateUserDocument(data: IUserDocument, id: string): Promise<IUserDocument | null> {
        let schema = {
            ...data
        }
        return UserDocument.findByIdAndUpdate(id, {...schema}, {new: true});
    }

    deleteUserDocument(id: string): Promise<IUserDocument | null> {
        return UserDocument.findByIdAndDelete(id).exec();
    }
}

export default UserDocumentService;
import {model, Schema} from 'mongoose';

export interface IUserDocument {
    user: Schema.Types.ObjectId;
    title: string;
    document: string;
}

const UserDocumentSchema = new Schema<IUserDocument>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Title field is required'],
        trim: true
    },
    document: {
        type: String,
        required: [true, 'Document field is required'],
        trim: true
    },
}, {timestamps: true});

const UserDocument = model<IUserDocument>('UserDocument', UserDocumentSchema);
export default UserDocument;

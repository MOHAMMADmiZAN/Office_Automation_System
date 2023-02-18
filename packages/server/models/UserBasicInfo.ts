import { Schema, model } from 'mongoose';

export interface IUserBasicInfo {
    user: string;
    contactNumber: string;
    presentAddress: string;
    permanentAddress: string;
    dateOfBirth: string;
    eContactNumber?: string;
}

const UserBasicInfoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    contactNumber: {
        type: String,
        required: [true, 'Contact number field is required'],
        trim: true
    },
    presentAddress: {
        type: String,
        required: [true, 'Present address field is required'],
        trim: true
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent address field is required'],
        trim: true
    },
    dateOfBirth: {
        type: String,
        required: [true, 'Date of birth field is required'],
        trim: true
    },
    eContactNumber: {
        type: String,
        trim: true
    }
}, { timestamps: true });

const UserBasicInfo = model<IUserBasicInfo>('UserBasicInfo', UserBasicInfoSchema);
export default UserBasicInfo;

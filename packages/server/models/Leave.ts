import {model, Schema} from 'mongoose';

export interface ILeave {
    user: string;
    fromDate: string;
    toDate: string;
    manager: string;
    status: string;
    userNote?: string;
    managerNote?: string;
}

const LeaveSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fromDate: {
        type: String,
        required: [true, 'From date field is required'],
        trim: true
    },
    toDate: {
        type: String,
        required: [true, 'To date field is required'],
        trim: true
    },
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    userNote: {
        type: String,
        trim: true
    },
    managerNote: {
        type: String,
        trim: true
    },
    status: {
        type: String, enum: ['PENDING', 'ACCEPT', 'REJECT'], default: 'PENDING'
    },
}, {timestamps: true});

const Leave = model<ILeave>('Leave', LeaveSchema);
export default Leave;

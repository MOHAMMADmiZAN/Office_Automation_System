import {model, Schema} from 'mongoose';

export interface ILeave {
    user: Schema.Types.ObjectId;
    leaveType: string;
    leaveReason: string;
    leaveStartDate: Date;
    leaveEndDate: Date;
    leaveStatus: string;
    leaveComment: string;
    leaveAttachment?: string;
    requestToResponse: Schema.Types.ObjectId;
    requestToResponseComment: string;


}

const LeaveSchema = new Schema<ILeave>({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    leaveType: {type: String, required: true,},
    leaveReason: {type: String, required: true},
    leaveStartDate: {type: Date, required: true},
    leaveEndDate: {type: Date, required: true},
    leaveStatus: {type: String, required: true},
    leaveComment: {type: String, required: true},
    leaveAttachment: {type: String},
    requestToResponse: {type: Schema.Types.ObjectId, ref: 'User'},
    requestToResponseComment: {type: String},


}, {timestamps: true});

const Leave = model<ILeave>('Leave', LeaveSchema);
export default Leave;

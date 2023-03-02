import {model, Schema} from 'mongoose';

export interface IAdminAttendance {
    status: string;
    timeLimit: number;




}


const AdminAttendanceSchema = new Schema({
    status: {
        type: String,
        enum: ['RUNNING', 'COMPLETED'],
        default: 'RUNNING'
    },
    timeLimit: {
        type: Number,
        default: 60

    }

}, {timestamps: true})
const AdminAttendance = model<IAdminAttendance>('AdminAttendance', AdminAttendanceSchema)
export default AdminAttendance
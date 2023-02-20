import {model, Schema} from 'mongoose';

export interface IAttendance {
    user: string;
    checkIn: string;
    checkOut?: string;
    comment?: string;
}

const AttendanceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    checkIn: {
        type: String,
        required: [true, 'CheckIn field is required'],
        trim: true
    },
    checkOut: {
        type: String,
        trim: true
    },
    comment: {
        type: String,
        trim: true
    }
}, { timestamps: true });

const Attendance = model<IAttendance>('Attendance', AttendanceSchema);
export default Attendance;

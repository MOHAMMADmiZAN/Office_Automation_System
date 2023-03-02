import {model, Schema} from 'mongoose';


export interface IAttendance {
    user: Schema.Types.ObjectId;
    adminAttendance: Schema.Types.ObjectId;
    checkIn: Date;
    checkOut?: Date;
    status?: string;
    comment?: string;
}

const AttendanceSchema = new Schema<IAttendance>({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    adminAttendance: {
        type: Schema.Types.ObjectId,
        ref: 'AdminAttendance',
        required: true
    },

    checkIn: {
        type: Date,
        required: [true, 'CheckIn field is required'],
        trim: true
    },
    checkOut: {
        type: Date,
        trim: true
    },
    status: {
        type: String, enum: ['Present', 'Absent', 'Leave', 'Half Day', 'Weekend', 'Late', 'Holiday'],
        trim: true

    },
    comment: {
        type: String,
        trim: true
    }
}, {timestamps: true});

const Attendance = model<IAttendance>('Attendance', AttendanceSchema);
export default Attendance;

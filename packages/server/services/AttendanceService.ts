import Attendance, { IAttendance } from "../models/Attendance";



interface IAttendanceService {
    createAttendance(data: IAttendance): Promise<any>;
    findAttendance(key: string, value: any): Promise<IAttendance | null>;
    findAttendances(): Promise<IAttendance[]>;
    updateAttendance(data: IAttendance, id: string): Promise<any>;
    deleteAttendance(id: string): Promise<any>;
}


class AttendanceService implements IAttendanceService {

    createAttendance(data: IAttendance): Promise<any> {
        let schema = new Attendance({
            user: data.user,
            checkIn: data.checkIn,
        })
        return schema.save();
    }

    findAttendance(key: string, value: any): Promise<IAttendance | null> {
        if (key === '_id') {
            return Attendance.findById(value).exec()
        }
        return Attendance.findOne({ [key]: value }).exec();
    }

    findAttendances(): Promise<IAttendance[]> {
        return Attendance.find().exec();
    }

    async updateAttendance(data: IAttendance, id: string): Promise<any> {
        let schema = {
            checkOut: data.checkOut,
            comment: data.comment,
        }
        return Attendance.findByIdAndUpdate(id, { ...schema }, { new: true });
    }

    deleteAttendance(id: string): Promise<any> {
        return Attendance.findByIdAndDelete(id).exec();
    }

}

export default AttendanceService;
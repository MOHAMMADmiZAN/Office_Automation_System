import Attendance, {IAttendance} from "../models/Attendance";


interface IAttendanceService {
    createAttendance(data: IAttendance): Promise<IAttendance>;
    findAttendance(key: string, value: any): Promise<IAttendance | null>;
    findAttendances(): Promise<IAttendance[]>;
    updateAttendance(data: IAttendance, id: string): Promise<IAttendance|null>;
    deleteAttendance(id: string): Promise<IAttendance|null>;
}


class AttendanceService implements IAttendanceService {

    createAttendance(data: IAttendance): Promise<IAttendance> {
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

    async updateAttendance(data: IAttendance, id: string): Promise<IAttendance | null> {
        let schema = {
            checkOut: data.checkOut,
            comment: data.comment,
        }
        return Attendance.findByIdAndUpdate(id, { ...schema }, { new: true });
    }

    deleteAttendance(id: string): Promise<IAttendance|null> {
        return Attendance.findByIdAndDelete(id).exec();
    }

}

export default AttendanceService;
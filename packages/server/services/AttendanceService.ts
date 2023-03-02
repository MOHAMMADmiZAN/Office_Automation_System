import Attendance, {IAttendance} from "../models/Attendance";


interface IAttendanceService {
    createAttendance(data: IAttendance): Promise<IAttendance>;

    findAttendance(key: string, value: any): Promise<IAttendance | null>;

    findAttendances(): Promise<IAttendance[]>;

    updateAttendance(data: IAttendance, id: string): Promise<IAttendance | null>;

    deleteAttendance(id: string): Promise<IAttendance | null>;

    findAttendanceByUser(id: string): Promise<IAttendance[]>;
}


class AttendanceService implements IAttendanceService {

    createAttendance(data: IAttendance): Promise<IAttendance> {

        let schema = new Attendance({...data})
        return schema.save();
    }

    findAttendance(key: string, value: any): Promise<IAttendance | null> {
        if (key === '_id') {
            return Attendance.findById(value).exec()
        }
        return Attendance.findOne({[key]: value}).exec();
    }

    findAttendances(): Promise<IAttendance[]> {
        return Attendance.find().exec();
    }

    async updateAttendance(data: IAttendance, id: string): Promise<IAttendance | null> {

        return Attendance.findByIdAndUpdate(id, {...data}, {new: true});
    }

    deleteAttendance(id: string): Promise<IAttendance | null> {
        return Attendance.findByIdAndDelete(id).exec();
    }

    findAttendanceByUser(id: string): Promise<IAttendance[]> {
        return Attendance.find({user: id}).exec();
    }

}

export default AttendanceService;
import AdminAttendance, {IAdminAttendance} from "../models/AdminAttendance";
import errorHandler from "../utils/error";
import moment from "moment";

interface IAdminAttendanceWithId extends IAdminAttendance {
    _id: string;
    createdAt: string;
    updatedAt: string;

}

interface IAdminAttendanceWithIdService {
    createAdminAttendance(data: IAdminAttendance): Promise<IAdminAttendanceWithId>;

    findAdminAttendance(key: string, value: any): Promise<IAdminAttendanceWithId | null>;

    findAdminAttendances(): Promise<IAdminAttendanceWithId[]>;

    updateAdminAttendance(data: IAdminAttendance, id: string): Promise<IAdminAttendanceWithId | null>;

    deleteAdminAttendance(id: string): Promise<IAdminAttendanceWithId | null>;

    findRunningAttendance(): Promise<IAdminAttendanceWithId | null>;

    disableWhenCalled(): Promise<IAdminAttendanceWithId | null>;

    disableWhenTimeOut(): Promise<void>;

}

class AdminAttendanceService implements IAdminAttendanceWithIdService {
    async createAdminAttendance(data: IAdminAttendance): Promise<IAdminAttendanceWithId> {

        let schema = new AdminAttendance({
            ...data
        })
        return schema.save();
    }

    async findAdminAttendance(key: string, value: any): Promise<IAdminAttendanceWithId | null> {

        if (key === '_id') {
            return AdminAttendance.findById(value).exec()
        }
        return AdminAttendance.findOne({[key]: value}).exec();

    }

    async findAdminAttendances(): Promise<IAdminAttendanceWithId[]> {
        return AdminAttendance.find().exec();
    }

    async updateAdminAttendance(data: IAdminAttendanceWithId, id: string): Promise<IAdminAttendanceWithId | null> {
        return AdminAttendance.findByIdAndUpdate(id, {...data}, {new: true});

    }

    async deleteAdminAttendance(id: string): Promise<IAdminAttendanceWithId | null> {
        return AdminAttendance.findByIdAndDelete(id).exec();
    }

    async findRunningAttendance(): Promise<IAdminAttendanceWithId | null> {
        return await this.findAdminAttendance('status', 'RUNNING')
    }

    async disableWhenCalled(): Promise<IAdminAttendanceWithId | null> {
        const running = await this.findRunningAttendance();
        if (!running) {
            throw errorHandler('No running attendance', 404)
        }
        return AdminAttendance.findByIdAndUpdate(running._id, {status: 'COMPLETE'}, {new: true});


    }

    async disableWhenTimeOut(): Promise<void> {
        const running = await this.findRunningAttendance();
        if (!running) {
            throw errorHandler('No running attendance', 404)
        }
        let timeOut = moment(running.createdAt).add(running.timeLimit, 'minutes').isBefore(moment())
        if (timeOut) {
            AdminAttendance.findByIdAndUpdate(running._id, {status: 'Complete'}, {new: true});
        }


    }


}

export default AdminAttendanceService;
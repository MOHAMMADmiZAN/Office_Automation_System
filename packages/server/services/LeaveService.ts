import Leave, {ILeave} from "../models/Leave";


interface ILeaveService {
    createLeave(data: ILeave): Promise<ILeave>;

    findLeave(key: string, value: any): Promise<ILeave | null>;

    findLeaves(): Promise<ILeave[]>;

    updateLeave(data: ILeave, id: string): Promise<ILeave | null>;

    deleteLeave(id: string): Promise<ILeave | null>;
}


class LeaveService implements ILeaveService {

    createLeave(data: ILeave): Promise<ILeave> {
        let schema = new Leave({
            ...data
        })
        console.log('schema', schema)
        return schema.save();
    }

    findLeave(key: string, value: any): Promise<ILeave | null> {
        if (key === '_id') {
            return Leave.findById(value).exec()
        }
        return Leave.findOne({[key]: value}).exec();
    }

    findLeaves(): Promise<ILeave[]> {
        return Leave.find().exec();
    }

    async updateLeave(data: ILeave, id: string): Promise<ILeave | null> {
        let schema = {
            ...data
        }
        return Leave.findByIdAndUpdate(id, {...schema}, {new: true});
    }

    deleteLeave(id: string): Promise<ILeave | null> {
        return Leave.findByIdAndDelete(id).exec();
    }

}

export default LeaveService;
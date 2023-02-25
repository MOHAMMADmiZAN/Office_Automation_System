import Onboard, {IOnboard} from "../models/Onboard";


interface IOnboardService {
    createOnboard(data: IOnboard): Promise<IOnboard>;

    findOnboard(key: string, value: any): Promise<IOnboard | null>;

    findOnboards(): Promise<IOnboard[]>;

    updateOnboard(data: IOnboard, id: string): Promise<IOnboard | null>;

    deleteOnboard(id: string): Promise<IOnboard | null>;
}


class OnboardService implements IOnboardService {

    createOnboard(data: IOnboard): Promise<IOnboard> {
        let schema = new Onboard({
            user: data.user,
            joiningDate: data.joiningDate,
            jobTitle: data.jobTitle,
            salary: data.salary,
            status: data.status,
            farewellDate: data.farewellDate,
        })
        return schema.save();
    }

    findOnboard(key: string, value: any): Promise<IOnboard | null> {
        if (key === '_id') {
            return Onboard.findById(value).exec()
        }
        return Onboard.findOne({[key]: value}).exec();
    }

    findOnboards(): Promise<IOnboard[]> {
        return Onboard.find().exec();
    }

    async updateOnboard(data: IOnboard, id: string): Promise<IOnboard | null> {
        let schema = {
            joiningDate: data.joiningDate,
            jobTitle: data.jobTitle,
            salary: data.salary,
            status: data.status,
            farewellDate: data.farewellDate,
        }
        return Onboard.findByIdAndUpdate(id, {...schema}, {new: true});
    }

    deleteOnboard(id: string): Promise<IOnboard | null> {
        return Onboard.findByIdAndDelete(id).exec();
    }

}

export default OnboardService;
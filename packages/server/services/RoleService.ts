import Role, {IRole} from "../models/Role";
import errorHandler from "../utils/error";


interface IRoleService {
    createRole(data: IRole): Promise<void>;
    findRole(key: string, value: any): Promise<IRole | null>;
    findRoles(): Promise<IRole[]>;
    roleDeleted(id: string): Promise<void>;
    roleUpdate(data: IRole, id: string): Promise<IRole | null>;
}


class RoleService implements IRoleService {
    async createRole(data: IRole): Promise<void> {

        const hasRole = await this.findRole('name', data.name);
        if (hasRole) {
            throw errorHandler('Role already exists', 409)
        }

        let role = new Role({
            name: data.name
        })
        await role.save();

    }

    findRole(key: string, value: any): Promise<IRole | null> {
        if (key === '_id') {
            return Role.findById(value).exec()
        }
        return Role.findOne({ [key]: value }).exec();
    }

    findRoles(): Promise<IRole[]> {
        return Role.find().exec();
    }

    async roleDeleted(id: string): Promise<void> {
        await Role.findByIdAndDelete(id).exec();
    }

    async roleUpdate(data: IRole, id: string): Promise<IRole | null> {
        let schema = {
            name: data.name,
        }
        return Role.findByIdAndUpdate(id, { ...schema }, { new: true });
    }
}
export default RoleService;
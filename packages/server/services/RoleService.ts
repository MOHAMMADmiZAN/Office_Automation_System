import Role, {IRole} from "../models/Role";



interface IRoleService {
    createRole(data: IRole): Promise<void>;
    findRole(key: string, value: any): Promise<IRole | null>;
    findRoles(): Promise<IRole[]>;
    roleDeleted(id: string): Promise<void>;

}


class RoleService implements IRoleService{
   async createRole(data: IRole): Promise<void> {
        let role = new Role({
            name: data.name
        })
        await role.save();

    }

     findRole(key: string, value: any): Promise<IRole | null> {
        if (key === '_id') {
            return Role.findById(value).exec()
        }
        return Role.findOne({[key]: value}).exec();
    }

    findRoles(): Promise<IRole[]> {
        return Role.find().exec();
    }

    async roleDeleted(id: string): Promise<void> {
        await Role.findByIdAndDelete(id).exec();
    }

}

export default RoleService;
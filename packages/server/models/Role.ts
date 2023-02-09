import {model, Schema} from "mongoose";

export interface IRole {
    name: string;

 }

    const RoleSchema = new Schema({
        name: {
            type: String,
            required: true,
            trim: true

        }

    })

const Role = model<IRole>('Role', RoleSchema);
export default Role;

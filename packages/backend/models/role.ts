import { Schema, model } from 'mongoose';

const RoleSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true })

const Role = model('Role', RoleSchema)
export default Role
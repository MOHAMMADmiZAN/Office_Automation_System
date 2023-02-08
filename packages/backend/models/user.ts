import { Schema, model } from 'mongoose';

export const UserStatus = {
    ACTIVE: 'ACTIVE',
    PENDING: 'PENDING',
    INACTIVE: 'INACTIVE'
}

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    // role: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Role',
    //     required: true,
    // },
    avatar: {
        type: String,
        default: null,
        trim: true
    },
    status: {
        type: String,
        default: UserStatus.PENDING,
    },
}, { timestamps: true })

const User = model('User', UserSchema)
export default User

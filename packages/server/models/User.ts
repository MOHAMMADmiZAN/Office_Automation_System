import { Schema, model } from 'mongoose';

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    status?: string
    role?: string;
    avatar?: string;

}

const UserSchema = new Schema({
    firstName: {
        type: String, required: [true, ' First Name is required'], trim: true


    },
    lastName: {
        type: String, required: [true, ' Last Name is required'], trim: true


    }, email: {
        type: String, required: true, unique: true, validate: {
            validator: function (v) {
                return /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,10})$/.test(v);
            }, message: props => `${props.value} is not a valid email!`
        }
    }, password: {
        type: String, minlength: [6, 'Password must be at least 6 characters'], required: true, trim: true
    },
    status: {
        type: String, enum: ['PENDING', 'ACTIVE', 'REJECTED'], default: 'PENDING'
    },
    role: {
        type: Schema.Types.ObjectId, ref: 'Role',
    },
    avatar: {
        type: String, default: 'https://res.cloudinary.com/dxqjyqz8f/image/upload/v1621361009/avatars/default-avatar.png'
    }

}, { timestamps: true });

const User = model<IUser>('User', UserSchema);
export default User;

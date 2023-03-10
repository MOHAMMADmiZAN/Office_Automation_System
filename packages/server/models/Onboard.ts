import {model, Schema} from 'mongoose';

export interface IOnboard {
    user: Schema.Types.ObjectId;
    joiningDate: string;
    jobTitle: string;
    salary: number;
    status: string;
    farewellDate?: string;
}

const OnboardSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    joiningDate: {
        type: String,
        required: [true, 'Joining date field is required'],
        trim: true
    },
    jobTitle: {
        type: String,
        required: [true, 'Job title field is required'],
        trim: true
    },
    salary: {
        type: Number,
        required: [true, 'Salary field is required']
    },
    status: {
        type: String, enum: ['Active', 'Inactive', 'On Leave', 'Fired', 'Resigned'], default: 'Active'
    },
    farewellDate: {
        type: String,
        trim: true
    },
}, {timestamps: true});

const Onboard = model<IOnboard>('Onboard', OnboardSchema);
export default Onboard;

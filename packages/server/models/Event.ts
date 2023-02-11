import { Schema, model } from 'mongoose';

export interface IEvent {
    author: string;
    title: string;
    description?: string;
    startTime: string;
    endTime?: string;
    invitation?: any;
    status?: string
}

const EventSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Title field is required'],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    startTime: {
        type: String,
        required: [true, 'StartTime field is required'],
        trim: true
    },
    endTime: {
        type: String,
        trim: true
    },
    status: {
        type: String, enum: ['PENDING', 'ACTIVE', 'REJECTED'], default: 'PENDING'
    },
    invitation: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            status: {
                type: String, enum: ['PENDING', 'YES', 'NO', 'MAYBE'], default: 'PENDING'
            }
        }
    ]

}, { timestamps: true });

const Event = model<IEvent>('Event', EventSchema);
export default Event;

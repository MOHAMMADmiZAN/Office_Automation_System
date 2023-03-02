import {model, Schema} from 'mongoose';

export interface IEvent {
    _id?: string;
    author: Schema.Types.ObjectId;
    title: string;
    description?: string;
    startTime: string;
    endTime?: string;
    invitation?: any;
    status?: string;
    type: string
}

const EventSchema = new Schema<IEvent>({
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
        type: String, enum: ['UPCOMING', 'RUNNING', 'FINISHED'], default: 'UPCOMING'
    },
    type: {
        type: String, enum: ['MEETING', 'BIRTHDAY', 'FAREWELL', 'OTHER'], default: 'MEETING'
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

}, {timestamps: true});

const Event = model<IEvent>('Event', EventSchema);
export default Event;

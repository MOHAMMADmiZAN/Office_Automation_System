import Event, { IEvent } from "../models/Event";
import moment from 'moment';
import { dateTimeFormat } from "../utils/helper";
import { ObjectId } from "mongoose";


export interface IEventUpdate {
    title: string;
    description?: string;
    startTime: string;
    endTime: string;
    invitation?: any;
    status?: string;
}

export interface IInvitation {
    invitation: [
        {
            _id: string,
            userId: string,
            status: string
        }
    ];
}

interface IEventService {
    createEvent(data: IEvent): Promise<IEvent>;

    findEvent(key: string, value: any): Promise<IEvent | null>;

    findEvents(): Promise<IEvent[]>;

    updateEvent(data: IEvent, id: string): Promise<IEvent | null>;
    updateEventInvitation(id: string, invitation: IInvitation): Promise<IEvent | null>;

    deleteEvent(id: string): Promise<IEvent | null>;

    checkEventStatus(): Promise<void>;
}



class EventService implements IEventService {

    createEvent(data: IEvent): Promise<IEvent> {
        let event = new Event({
            title: data.title,
            description: data.description,
            author: data.author,
            startTime: dateTimeFormat(data.startTime),
            endTime: dateTimeFormat(data.endTime),
            invitation: data.invitation,
            type: data.type,
        })
        return event.save();
    }

    findEvent(key: string, value: any): Promise<IEvent | null> {
        if (key === '_id') {
            return Event.findById(value).exec()
        }
        return Event.findOne({ [key]: value }).exec();
    }

    findEvents(): Promise<IEvent[]> {
        return Event.find().exec();
    }

    async updateEvent(data: IEvent, id: string): Promise<IEvent | null> {
        let event: IEventUpdate = {
            title: data.title,
            description: data.description,
            startTime: dateTimeFormat(data.startTime),
            endTime: dateTimeFormat(data.endTime),
            invitation: data.invitation,
        }
        if (data.status) {
            event.status = data.status
        }
        return Event.findByIdAndUpdate(id, { ...event }, { new: true });
    }

    async updateEventInvitation(id: string, invitation: IInvitation): Promise<IEvent | null> {
        return Event.findByIdAndUpdate(id, { invitation }, { new: true });
    }

    deleteEvent(id: string): Promise<IEvent | null> {
        return Event.findByIdAndDelete(id).exec();
    }


    async checkEventStatus(): Promise<void> {
        let events = await this.findEvents();
        for (const event of events) {
            if (!event.startTime) return;

            let startTime = moment(event.startTime).unix();
            let endTime = moment(event.endTime).unix();
            let nowTime = moment(new Date()).unix();

            if (startTime < nowTime && nowTime < endTime) {
                await Event.findByIdAndUpdate(event._id, { status: 'RUNNING' }, { new: true });
            } else if (nowTime > endTime) {
                await Event.findByIdAndUpdate(event._id, { status: 'FINISHED' }, { new: true });

            }
        }
    }
}

export default EventService;
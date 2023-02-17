import Event, { IEvent } from "../models/Event";
import moment, { Moment } from 'moment';
import { dateTimeFormat } from "../utils/helper";



interface IEventService {
    createEvent(data: IEvent): Promise<IEvent>;
    findEvent(key: string, value: any): Promise<IEvent | null>;
    findEvents(): Promise<IEvent[]>;
    updateEvent(data: IEvent, id: string): Promise<IEvent | null>;
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
        let event = {
            title: data.title,
            description: data.description,
            startTime: dateTimeFormat(data.startTime),
            endTime: dateTimeFormat(data.endTime),
            invitation: data.invitation,
            type: data.type,
        }
        return Event.findByIdAndUpdate(id, { ...event }, { new: true });
    }

    deleteEvent(id: string): Promise<IEvent | null> {
        return Event.findByIdAndDelete(id).exec();
    }


    async checkEventStatus(): Promise<void> {
        let events = await this.findEvents();
        for (const event of events) {
            let startTime: Moment = moment(event.startTime);
            let endTime: Moment = moment(event.endTime);
            let now: Moment = moment();
            if (now.isSameOrAfter(startTime) && now.isSameOrBefore(endTime)) {
                await this.updateEvent({ ...event, status: 'RUNNING' }, event._id as string);
            } else if (now.isSameOrAfter(endTime)) {
                await this.updateEvent({ ...event, status: 'FINISHED' }, event._id as string);
            }
        }
    }
}


export default EventService;
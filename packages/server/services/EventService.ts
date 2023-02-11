import Event, { IEvent } from "../models/Event";



interface IEventService {
    createEvent(data: IEvent): Promise<any>;
    findEvent(key: string, value: any): Promise<IEvent | null>;
    findEvents(): Promise<IEvent[]>;
    updateEvent(data: IEvent, id: string): Promise<any>;
    deleteEvent(id: string): Promise<any>;

}


class EventService implements IEventService {

    createEvent(data: IEvent): Promise<any> {
        let event = new Event({
            title: data.title,
            description: data.description,
            author: data.author,
            startTime: data.startTime,
            endTime: data.endTime,
            invitation: data.invitation,
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

    async updateEvent(data: IEvent, id: string): Promise<any> {
        let event = {
            title: data.title,
            description: data.description,
            startTime: data.startTime,
            endTime: data.endTime,
            invitation: data.invitation,
        }
        return Event.findByIdAndUpdate(id, { ...event }, { new: true });
    }

    deleteEvent(id: string): Promise<any> {
        return Event.findByIdAndDelete(id).exec();
    }

}

export default EventService;
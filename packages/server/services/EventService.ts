import Event, { IEvent } from "../models/Event";



interface IEventService {
    createEvent(data: IEvent): Promise<IEvent>;
    findEvent(key: string, value: any): Promise<IEvent | null>;
    findEvents(): Promise<IEvent[]>;
    updateEvent(data: IEvent, id: string): Promise<IEvent | null>;
    deleteEvent(id: string): Promise<IEvent | null>;

}


class EventService implements IEventService {

    createEvent(data: IEvent): Promise<IEvent> {
        let event = new Event({
            title: data.title,
            description: data.description,
            author: data.author,
            startTime: data.startTime,
            endTime: data.endTime,
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
            startTime: data.startTime,
            endTime: data.endTime,
            invitation: data.invitation,
            type: data.type,
        }
        return Event.findByIdAndUpdate(id, { ...event }, { new: true });
    }

    deleteEvent(id: string): Promise<IEvent | null> {
        return Event.findByIdAndDelete(id).exec();
    }

}

export default EventService;
import {PublicApiInstance} from "./api";

interface IEventApi {
    eventList: () => Promise<IEventPayloadWithId[]>;
    eventDetail: (id: string) => Promise<IEventPayloadWithId>;
    eventCreate: (payload: IEventPayload) => Promise<IEventPayloadWithId>;
    eventUpdate: (payload: IEventPayload, id: string) => Promise<IEventPayloadWithId>;
    eventDelete: (id: string) => Promise<IEventPayloadWithId>;

}
export interface IEventPayload {

    author: string;
    title: string;
    description?: string;
    startTime: any;
    endTime?: any;
    invitation?: any;
    status?: string

}
 export interface IEventPayloadWithId extends IEventPayload {
    _id: string;
}


export const EventApi : IEventApi = {
    eventList: async () => {
        try {
            const response = await PublicApiInstance.get('/event');
            return response.data.data;
        } catch (e) {
            console.log(e)
        }
    },
    eventDetail: async (id: string) => {
        try {
            const response = await PublicApiInstance.get(`/event/${id}`);
            return response.data;
        } catch (e) {
            console.log(e)
        }
    },
    eventCreate: async (payload: IEventPayload) => {
        try {
            const response = await PublicApiInstance.post('/event', payload);
            return response.data;
        } catch (e) {
            console.log(e)
        }
    },
    eventUpdate: async (payload: IEventPayload, id: string) => {
        try {
            const response = await PublicApiInstance.put(`/event/${id}`, payload);
            return response.data;
        } catch (e) {
            console.log(e)
        }
    },
    eventDelete: async (id: string) => {
        try {
            const response = await PublicApiInstance.delete(`/event/${id}`);
            return response.data;
        } catch (e) {
            console.log(e)
        }
    }

}

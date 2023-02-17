import moment from 'moment';
import EventService from "../services/EventService"

const eventService = new EventService();

export const useCronjob = () => {
    console.log('call check event status')
    eventService.checkEventStatus()
}


export const dateTimeFormat = (dateTime: string | undefined) => {
    if (!dateTime) return '';
    return moment(dateTime).toISOString()
}
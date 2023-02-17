import EventService from "../services/EventService"

const eventService = new EventService();

export const useCronjob = () => {
    console.log('call check event status')
    eventService.checkEventStatus()
}
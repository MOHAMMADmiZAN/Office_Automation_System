import EventController from "../controllers/EventController";

import {Router} from "express";


const EventRouter = Router()

const eventController = new EventController()

EventRouter.get('/', eventController.eventList)
EventRouter.get('/:id', eventController.eventDetail)
EventRouter.post('/', eventController.eventCreate)
EventRouter.put('/:id', eventController.eventUpdate)
EventRouter.put('/changeInviteStatus/:id', eventController.changeInviteStatus)
EventRouter.delete('/:id', eventController.eventDelete)


export default EventRouter
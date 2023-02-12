import EventService from "../services/EventService";
import { NextFunction, Response } from "express";


interface IEventController {
    eventCreate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    eventDetail: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    eventList: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    eventDelete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    eventUpdate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

class EventController extends EventService implements IEventController {

    public eventCreate = async (req, res, next) => {
        try {
            const data = await this.createEvent(req.body);
            res.status(201).json({
                message: 'Event created successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }

    public eventDetail = async (req, res, next) => {
        try {
            const role = await this.findEvent('_id', req.params.id);
            res.status(200).json({
                message: 'Event found successfully',
                role
            })
        } catch (error: any) {
            next(error)
        }
    }

    public eventList = async (_req, res, next) => {
        try {
            const data = await this.findEvents();
            res.status(200).json({
                message: 'Events found successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }

    public eventUpdate = async (req, res, next) => {
        try {
            const data = await this.updateEvent(req.body, req.params.id);
            res.status(201).json({
                message: 'Event updated successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }

    public eventDelete = async (req, res, next) => {
        try {
            const data = await this.deleteEvent(req.params.id);
            res.status(200).json({
                message: 'Event deleted successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }
}

export default EventController;
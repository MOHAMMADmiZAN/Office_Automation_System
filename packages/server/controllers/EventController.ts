import EventService from "../services/EventService";
import { NextFunction, Response } from "express";
import { ObjectId } from 'mongodb'


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
            const event = await this.findEvent('_id', req.params.id);
            res.status(200).json({
                message: 'Event found successfully',
                event
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

    public changeInviteStatus = async (req, res, next) => {
        try {
            const event = await this.findEvent('_id', req.params.id);
            if (!event) {
                return res.status(200).json({
                    message: 'Event not found'
                })
            }
            const { userId, status } = req.body;
            const invitation = event.invitation.reduce((acc, cur) => {
                const objectId = new ObjectId(userId)

                if (JSON.stringify(cur._id) === JSON.stringify(objectId)) {
                    cur.status = status;
                }
                acc.push(cur);
                return acc;
            }, [])
            console.log('cu=', invitation)
            const updateData = {
                ...event,
                invitation
            }
            const data = await this.updateEvent(updateData, req.params.id);
            res.status(200).json({
                message: 'Event invitation status has been changed successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }

}

export default EventController;
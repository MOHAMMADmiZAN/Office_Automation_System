import LeaveService from "../services/LeaveService";
import {NextFunction, Response} from "express";


interface ILeaveController {
    leaveCreate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    leaveDetail: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    leaveList: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    leaveDelete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    leaveUpdate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

class LeaveController extends LeaveService implements ILeaveController {

    public leaveCreate = async (req, res, next) => {
        try {
            const data = await this.createLeave({...req.body, user: req.user._id,leaveAttachment: req.file?`uploads/${req.file.filename}`:null});
            console.log('data', data);
            res.status(201).json({
                message: 'Leave created successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }

    public leaveDetail = async (req, res, next) => {
        try {
            const role = await this.findLeave('_id', req.params.id);
            res.status(200).json({
                message: 'Leave found successfully',
                role
            })
        } catch (error: any) {
            next(error)
        }
    }

    public leaveList = async (_req, res, next) => {
        try {
            const data = await this.findLeaves();
            res.status(200).json({
                message: 'Leave list found successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }

    public leaveUpdate = async (req, res, next) => {
        try {
            const data = await this.updateLeave(req.body, req.params.id);
            res.status(201).json({
                message: 'Leave updated successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }

    public leaveDelete = async (req, res, next) => {
        try {
            const data = await this.deleteLeave(req.params.id);
            res.status(200).json({
                message: 'Leave deleted successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }
}

export default LeaveController;
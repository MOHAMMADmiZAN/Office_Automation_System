import OnboardService from "../services/OnboardService";
import {NextFunction, Response} from "express";


interface IOnboardController {
    onboardCreate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    onboardDetail: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    onboardList: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    onboardDelete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    onboardUpdate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

class OnboardController extends OnboardService implements IOnboardController {

    public onboardCreate = async (req, res, next) => {
        try {
            const data = await this.createOnboard(req.body);
            console.log('data', data);
            res.status(201).json({
                message: 'Onboard created successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }

    public onboardDetail = async (req, res, next) => {
        try {
            const role = await this.findOnboard('user', req.params.id);
            res.status(200).json({
                message: 'Onboard found successfully',
                role
            })
        } catch (error: any) {
            next(error)
        }
    }

    public onboardList = async (_req, res, next) => {
        try {
            const data = await this.findOnboards();
            res.status(200).json({
                message: 'Onboard list found successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }

    public onboardUpdate = async (req, res, next) => {
        try {
            const data = await this.updateOnboard(req.body, req.params.id);
            res.status(201).json({
                message: 'Onboard updated successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }

    public onboardDelete = async (req, res, next) => {
        try {
            const data = await this.deleteOnboard(req.params.id);
            res.status(200).json({
                message: 'Onboard deleted successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }
}

export default OnboardController;
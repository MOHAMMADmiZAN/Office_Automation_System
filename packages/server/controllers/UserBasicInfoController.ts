import UserBasicInfoService from "../services/UserBasicInfoService";
import {NextFunction, Response} from "express";


interface IUserBasicInfoController {
    userBasicInfoCreate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    userBasicInfoDetail: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    userBasicInfoList: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    userBasicInfoDelete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    userBasicInfoUpdate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

class UserBasicInfoController extends UserBasicInfoService implements IUserBasicInfoController {

    public userBasicInfoCreate = async (req, res, next) => {
        try {
            const data = await this.createUserBasicInfo(req.body);

            res.status(201).json({
                message: 'User basic info created successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }

    public userBasicInfoDetail = async (req, res, next) => {
        try {
            const data = await this.findUserBasicInfo('_id', req.params.id);
            res.status(200).json({
                message: 'User basic info found successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }

    public userBasicInfoList = async (_req, res, next) => {
        try {
            const data = await this.findUserBasicInfos();
            res.status(200).json({
                message: 'User basic info found successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }

    public userBasicInfoUpdate = async (req, res, next) => {
        try {
            const data = await this.updateUserBasicInfo(req.body, req.params.id);
            res.status(201).json({
                message: 'User basic info updated successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }

    public userBasicInfoDelete = async (req, res, next) => {
        try {
            const data = await this.deleteUserBasicInfo(req.params.id);
            res.status(200).json({
                message: 'User basic info deleted successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }
}

export default UserBasicInfoController;
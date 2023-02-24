import UserDocumentService from "../services/UserDocumentService";
import { NextFunction, Response } from "express";
import { handleFileDelete } from "../utils/FileUpload";


interface IUserDocumentController {
    userDocumentCreate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    userDocumentDetail: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    userDocumentList: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    userDocumentListByUser: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    userDocumentUpdate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    userDocumentDelete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}


class UserDocumentController extends UserDocumentService implements IUserDocumentController {

    public userDocumentCreate = async (req, res, next) => {
        try {
            const data = await this.createUserDocument({
                ...req.body,
                document: `uploads/${req.file.filename}`
            });
            res.status(201).json({
                message: 'User document created successfully',
                data: data
            })
        } catch (error: any) {
            next(error)
        }
    }

    public userDocumentDetail = async (req, res, next) => {
        try {
            const data = await this.findUserDocument('_id', req.params.id);
            res.status(200).json({
                message: 'User document found successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }

    public userDocumentList = async (_req, res, next) => {
        try {
            const data = await this.findUserDocuments();
            res.status(200).json({
                message: 'User documents found successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }

    public userDocumentListByUser = async (req, res, next) => {
        try {
            const data = await this.findUserDocumentsByUser(req.params.id);
            res.status(200).json({
                message: 'User documents found successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }

    public userDocumentUpdate = async (req, res, next) => {
        try {
            const data = await this.updateUserDocument(req.body, req.params.id);
            res.status(201).json({
                message: 'User document updated successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }

    public userDocumentDelete = async (req, res, next) => {
        try {
            const data = await this.deleteUserDocument(req.params.id);
            if (data?.document) {
                await handleFileDelete(data.document);
            }
            res.status(200).json({
                message: 'User document deleted successfully',
                data
            })
        } catch (error: any) {
            next(error)
        }
    }
}

export default UserDocumentController;
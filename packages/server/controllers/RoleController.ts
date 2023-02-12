import RoleService from "../services/RoleService";
import { NextFunction, Response } from "express";


interface IRoleController {
    createUserRole: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    findUserRole: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    findUserRoles: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    deleteUserRole: (req: Request, res: Response, next: NextFunction) => Promise<void>;

}

class RoleController extends RoleService implements IRoleController {
    public createUserRole = async (req, res, next) => {
        try {
            const role = await this.createRole(req.body);
            res.status(201).json({
                message: 'Role created successfully',
                role
            })
        } catch (error: any) {
            next(error)
        }
    }

    public findUserRole = async (req, res, next) => {
        try {
            const role = await this.findRole('_id', req.params.id);
            res.status(200).json({
                message: 'Role found successfully',
                role
            })
        } catch (error: any) {
            next(error)
        }
    }

    public findUserRoles = async (req, res, next) => {
        try {
            const roles = await this.findRoles();
            res.status(200).json({
                message: 'Roles found successfully',
                roles
            })
        } catch (error: any) {
            next(error)
        }
    }
    public deleteUserRole = async (req, res, next) => {
        try {
            const role = await this.roleDeleted(req.params.id);
            res.status(200).json({
                message: 'Role deleted successfully',
                role
            })
        } catch (error: any) {
            next(error)
        }
    }
}

export default RoleController;
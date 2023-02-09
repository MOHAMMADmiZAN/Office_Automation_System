import RoleService from "../services/RoleService";
import {errorResponse} from "../utils/error";
import {Response} from "express";


interface IRoleController {
    createUserRole: (req:Request, res:Response) => Promise<void>;
    findUserRole: (req:Request, res:Response) => Promise<void>;
    findUserRoles: (req:Request, res:Response) => Promise<void>;
    deleteUserRole: (req:Request, res:Response) => Promise<void>;

}

class RoleController extends RoleService implements IRoleController {
    public createUserRole = async (req, res) => {
        try {
            const role = await this.createRole(req.body);
            res.status(201).json({
                message: 'Role created successfully',
                role
            })
        } catch (e) {
            errorResponse(e as Error, 400);

        }
    }

    public findUserRole = async (req, res) => {
        try {
            const role = await this.findRole('_id', req.params.id);
            res.status(200).json({
                message: 'Role found successfully',
                role
            })
        } catch (e) {
            errorResponse(e as Error, 400);

        }
    }

    public findUserRoles = async (req, res) => {
        try {
            const roles = await this.findRoles();
            res.status(200).json({
                message: 'Roles found successfully',
                roles
            })
        } catch (e) {
            errorResponse(e as Error, 400);

        }
    }
    public deleteUserRole = async (req, res) => {
        try {
            const role = await this.roleDeleted(req.params.id);
            res.status(200).json({
                message: 'Role deleted successfully',
                role
            })
        } catch (e) {
            errorResponse(e as Error, 400);

        }
    }
}

export default RoleController;
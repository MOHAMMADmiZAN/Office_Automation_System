import RoleService from "../services/RoleService";
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
            if (e instanceof Error) {
                res.status(400).json({
                    message: e.message
                })
            }

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
            if (e instanceof Error) {
                res.status(400).json({
                    message: e.message
                })
            }

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
            if (e instanceof Error) {
                res.status(400).json({
                    message: e.message
                })
            }

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
          if (e instanceof Error) {
              res.status(400).json({
                  message: e.message
              })
          }

        }
    }
}

export default RoleController;
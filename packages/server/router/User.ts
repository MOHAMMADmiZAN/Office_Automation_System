import {Router} from "express";
import UserService from "../services/UserService";




const UserRouter = Router()


UserRouter.get('/', (req, res,next) => {
    const userService = new UserService()
    userService.findUsers().then(users => {
        res.status(200).json(users)
    }).catch(err => {
        next(err)
    })

})



export default UserRouter
import UserDocumentController from "../controllers/UserDocumentController";

import { Router } from "express";
import { fileUpload } from "../middleware/FileUpload";



const UserDocumentRouter = Router()

const userDocumentController = new UserDocumentController()

UserDocumentRouter.get('/', userDocumentController.userDocumentList)
UserDocumentRouter.get('/:id', userDocumentController.userDocumentDetail)
UserDocumentRouter.get('/user/:id', userDocumentController.userDocumentListByUser)
UserDocumentRouter.post('/', fileUpload.single('document'), userDocumentController.userDocumentCreate)
UserDocumentRouter.put('/:id', userDocumentController.userDocumentUpdate)
UserDocumentRouter.delete('/:id', userDocumentController.userDocumentDelete)



export default UserDocumentRouter
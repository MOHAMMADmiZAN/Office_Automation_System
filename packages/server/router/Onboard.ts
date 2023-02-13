import OnboardController from "../controllers/OnboardController";

import { Router } from "express";



const OnboardRouter = Router()

const onboardController = new OnboardController()

OnboardRouter.get('/', onboardController.onboardList)
OnboardRouter.get('/:id', onboardController.onboardDetail)
OnboardRouter.post('/', onboardController.onboardCreate)
OnboardRouter.put('/:id', onboardController.onboardUpdate)
OnboardRouter.delete('/:id', onboardController.onboardDelete)



export default OnboardRouter
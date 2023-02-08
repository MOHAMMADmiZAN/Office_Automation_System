import { User } from "../models"
import * as bcrypt from 'bcrypt';
import validator from '../validators'
import { validationError, serverError, createdSuccess, badRequest, actionSuccess, updatedSuccess, deleteSuccess, tokenGenerator } from '../utils/helper'
import { Request, Response } from 'express'
import { UserStatus } from "../models/user";



// LOGIN
const login = async (req: Request, res: Response) => {
    let { email, password } = req.body

    // // CHECK VALIDATION
    const formField = {
        "email": email,
        "password": password,
    }
    const validate = validator(formField);
    if (!validate.isValid) {
        return validationError(res, validate.error);
    }

    try {
        let user: any = await User.findOne({ email });
        if (!user) {
            return badRequest(res, null, 'Invalid credentials!');
        }

        let compare = await bcrypt.compare(password, user.password)
        if (!compare) {
            return badRequest(res, null, 'Invalid credentials!');
        }

        if (user.status === UserStatus.INACTIVE) {
            return badRequest(res, null, 'Your account has been blocked, please contact our support!');
        }
        const token: any = await tokenGenerator(user)
        return actionSuccess(res, token, 'Login Successful!');
    } catch (error) {
        return serverError(res, error);
    }
}




// USER REGISTER
const register = async (req: Request, res: Response) => {
    console.log('register')

    let { firstName, lastName, email, password } = req.body


    // // CHECK VALIDATION
    const formField = {
        firstName,
        lastName,
        email,
        password,
    }
    const validate = validator(formField);
    if (!validate.isValid) {
        return validationError(res, validate.error);
    }


    try {
        // CHECK EMAIL UNIQUE
        let findData = await User.findOne({ email });
        if (findData) {
            return badRequest(res, null, 'Email address already exist!');
        }


        // GENERATE PASSWORD HASH KEY
        let hash = await bcrypt.hash(password, 11);
        formField.password = hash

        // SAVE DATA
        let schema = new User(formField);
        let result: any = await schema.save();
        return createdSuccess(res, result);
    } catch (error) {
        return serverError(res, error);
    }
}

export {
    login,
    register
}
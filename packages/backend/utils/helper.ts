// const logger = require("./logger")
import * as jwt from 'jsonwebtoken';
// const config = require('config');
import mongoose from 'mongoose'


export const actionSuccess = (res: any, data = null, message = '') => {
    res.status(200).json({
        message,
        data,
    })
}


export const createdSuccess = (res: any, data = null, message = 'Content Created Successful!') => {
    res.status(201).json({
        message,
        data,
    })
}


export const updatedSuccess = (res: any, data = null, message = 'Content Update Successful!') => {
    res.status(201).json({
        message,
        data,
    })
}


export const deleteSuccess = (res: any, data = null, message = 'Content Delete Successful!') => {
    res.status(202).json({
        message,
        data,
    })
}


export const badRequest = (res: any, error: any, message = "Bad Request!") => {
    console.error(error)
    res.status(400).json({
        message,
        error
    })
}

export const validationError = (res: any, error: any) => {
    console.warn(error)
    res.status(406).json({
        message: 'Validation Error!',
        error
    })
}


export const serverError = (res: any, error: any) => {
    console.error(error)
    res.status(500).json({
        message: 'Server Error Occurred!',
        error
    })
}

export const makeRand = (length: number) => {
    var result = '';
    var characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}


export const filterText = (text: string) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}


export const dateFormatter = (date: any) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}


function changeTimezone(date: any) {
    var invDate = new Date(date.toLocaleString('en-US', { timeZone: "Asia/Dhaka" }));
    var diff = date.getTime() - invDate.getTime();
    return new Date(date.getTime() - diff);
}

export const toTitleCase = (str: any) => {
    if (!str) return ''

    str = str.toLowerCase()
    return str.replace(/[^-'\s]+/g, function (word: any) {
        return word.replace(/^./, function (first: any) {
            return first.toUpperCase();
        });
    });
}


export const tokenGenerator = async (user: any) => {
    const obj = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        status: user.status,
        type: user.type,
    }
    try {
        const token = await jwt.sign(obj, process.env.SECRET_KEY, { expiresIn: '15d' })
        return `Bearer ${token}`;
    } catch (error) {
        console.error(error)
        return false;
    }
}


export const objectIdIsValid = (id: string) => mongoose.Types.ObjectId.isValid(id)
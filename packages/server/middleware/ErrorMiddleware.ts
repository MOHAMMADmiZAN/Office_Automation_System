import {NextFunction, Request, Response} from "express";
import {ErrorWithStatus} from "../utils/error";

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('Error=', err.toString());

    const message = err.message ? err.message : 'Server Error Occurred';
    const status = (err as ErrorWithStatus).status ? (err as ErrorWithStatus).status : 500;

    const errorResponse = {
        success: false,
        message: message,
    };
    res.status(status).json(errorResponse);
    next()
};


export default errorMiddleware;
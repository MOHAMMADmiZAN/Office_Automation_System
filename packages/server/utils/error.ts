import {Response} from "express";


export interface ErrorWithStatus extends Error {
    status: number;
}

const errorHandler = (message: string = 'something went wrong', status: number = 500): Error => {
    const err = new Error(message);
    (err as ErrorWithStatus).status = status;
    return err;
};


export default errorHandler

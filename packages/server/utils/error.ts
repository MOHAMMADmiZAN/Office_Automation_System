export interface ErrorWithStatus extends Error {
    status: number;
}

const errorHandler = (message: string = 'something went wrong', status: number = 500): Error => {
    const err = new Error(message);
    (err as ErrorWithStatus).status = status;
    return err;
};

export const errorResponse = (err: Error,status:number = 400) => {

    (err as ErrorWithStatus).status = Number(status);

    return err;
}

export default errorHandler

import connectDB from "./db";
import router from "./router/api";
import {ErrorWithStatus} from "./utils/error";
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';


import cors from 'cors';

const app = express();
import morgan from 'morgan';


app.use([express.json(), cors(), express.urlencoded({extended: true}), express.static('public'), router, morgan('tiny')]);


const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    const errorResponse = {
        success: false,
        message: error.message,
    };
    res.status(500).json(errorResponse);
};
app.use(errorHandler);


const PORT = process.env.PORT || 5000;
const DB_NAME = process.env.DB_DATABASE || "oas";
const DB_URI = process.env.DB_URI || `mongodb+srv://admin:admin@officeautomationsystem.n6q9rvq.mongodb.net/${DB_NAME}`;


connectDB(DB_URI).then(() => {
    console.log('Connected to DB');
    const server = http.createServer(app);
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}).catch(e => {
    console.log(e);
});
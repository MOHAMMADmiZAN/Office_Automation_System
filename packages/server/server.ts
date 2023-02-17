import connectDB from "./db";
import router from "./router/api";
import express, { NextFunction, Request, Response } from 'express';
import http from 'http';
import cors from 'cors';
const app = express();
import morgan from 'morgan';
import errorMiddleware from "./middleware/ErrorMiddleware";
import * as cron from 'node-cron';
import EventService from "./services/EventService";



app.use([express.json(), cors(), express.urlencoded({ extended: true }), express.static('public'), router, morgan('tiny')]);
app.use(errorMiddleware);


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


// Call cronjob 120
cron.schedule("*/60 * * * * *", async () => {
    console.log("running a task every minute");
    const eventService = new EventService();
    eventService.checkEventStatus()
})
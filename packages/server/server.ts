import connectDB from "./db";
import router from "./router/api";
import express from 'express';
import http from 'http';
import cors from 'cors';
import morgan from 'morgan';
import errorMiddleware from "./middleware/ErrorMiddleware";
import * as cron from 'node-cron';
import EventService from "./services/EventService";

const app = express();


app.use([express.json(), cors(), express.urlencoded({extended: true}), express.static('public'), router, morgan('tiny')]);
app.use(errorMiddleware);


const PORT = process.env.PORT || 5000;
const DB_NAME = process.env.DB_DATABASE || "oas";
const DB_URI = process.env.DB_URI || `mongodb+srv://admin:admin@officeautomationsystem.n6q9rvq.mongodb.net/${DB_NAME}`;
const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;
const SUPER_ADMIN_EMAIL = process.env.SUPER_USER || 'super_admin@oas.com'


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
    const eventService = new EventService();
    await eventService.checkEventStatus()
})

// create a jwt token
//
// const  userService = new UserService();
//
//
//
//
//
//
// cron.schedule('*/60 * * * * *', async () => {
//     const tokenUser = await userService.findUser('email', SUPER_ADMIN_EMAIL)
//     let token  = userService.tokenGenerator(tokenUser)
//     try{
//         await axios.post(`${BASE_URL}/api/v1/admin-attendance`, {},{
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//     }catch (e) {
//         console.log(e)
//     }
// });
// cron.schedule('*/60 * * * * *', async () => {
//     const tokenUser = await userService.findUser('email', SUPER_ADMIN_EMAIL)
//     let token  = userService.tokenGenerator(tokenUser)
//     try{
//         await axios.post(`${BASE_URL}/api/v1/admin-attendance/disable-timeout`, {},{
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//     }catch (e) {
//         console.log(e)
//
//     }
//
// })



import connectDB from "./db";
import router from "./router/api";

const express = require('express');
const http = require('http');


const cors = require('cors');

const app = express();
const morgan = require('morgan');


app.use([express.json(), cors(), express.urlencoded({extended: true}), express.static('public'), router, morgan('tiny')]);

app.use((err, req, res, next) => {
    const message = err.message ? err.message : 'Server Error Occurred';
    const status = err.status ? err.status : 500;
    return res.status(status).json({
        message,
    });
});


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
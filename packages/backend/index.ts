import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routers from './routers';
// import * as cors from 'cors';



dotenv.config();

const app: Express = express();
const port = process.env.PORT;




// app.use(cors(options));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())


routers(app);


app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server + MongoDB');
});

// { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect(process.env.DB_CONNECTION || '').then(() => {
  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}).catch(error => console.log('error=', error))




import path from 'path';
import { Request, Response } from 'express'
import authRouter from './auth'


const routes = [
    {
        path: '/api/auth',
        handler: authRouter
    },
    {
        path: '/',
        handler: (req: Request, res: Response) => {
            // return res.sendFile(path.resolve(__dirname, '../../', 'public', 'index.html'))
            return res.send('Express + TypeScript Server');
        }
    },
    {
        path: '*',
        handler: (req: Request, res: Response) => res.send({ response: "404 Page Not Found!" }).status(200)
    }
]


export default (app: any) => {
    routes.forEach(r => {
        app.use(r.path, r.handler)
    })
}
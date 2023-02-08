"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const routes = [
    {
        path: '/api/auth',
        handler: auth_1.default
    },
    {
        path: '/',
        handler: (req, res) => {
            // return res.sendFile(path.resolve(__dirname, '../../', 'public', 'index.html'))
            return res.send('Express + TypeScript Server');
        }
    },
    {
        path: '*',
        handler: (req, res) => res.send({ response: "404 Page Not Found!" }).status(200)
    }
];
exports.default = (app) => {
    routes.forEach(r => {
        app.use(r.path, r.handler);
    });
};

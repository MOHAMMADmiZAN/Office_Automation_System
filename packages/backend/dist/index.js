"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const routers_1 = __importDefault(require("./routers"));
// import * as cors from 'cors';
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
// app.use(cors(options));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
(0, routers_1.default)(app);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server + MongoDB');
});
// { useNewUrlParser: true, useUnifiedTopology: true }
mongoose_1.default.connect(process.env.DB_CONNECTION || '').then(() => {
    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
}).catch(error => console.log('error=', error));

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectIdIsValid = exports.tokenGenerator = exports.toTitleCase = exports.dateFormatter = exports.filterText = exports.makeRand = exports.serverError = exports.validationError = exports.badRequest = exports.deleteSuccess = exports.updatedSuccess = exports.createdSuccess = exports.actionSuccess = void 0;
// const logger = require("./logger")
const jwt = __importStar(require("jsonwebtoken"));
// const config = require('config');
const mongoose_1 = __importDefault(require("mongoose"));
const actionSuccess = (res, data = null, message = '') => {
    res.status(200).json({
        message,
        data,
    });
};
exports.actionSuccess = actionSuccess;
const createdSuccess = (res, data = null, message = 'Content Created Successful!') => {
    res.status(201).json({
        message,
        data,
    });
};
exports.createdSuccess = createdSuccess;
const updatedSuccess = (res, data = null, message = 'Content Update Successful!') => {
    res.status(201).json({
        message,
        data,
    });
};
exports.updatedSuccess = updatedSuccess;
const deleteSuccess = (res, data = null, message = 'Content Delete Successful!') => {
    res.status(202).json({
        message,
        data,
    });
};
exports.deleteSuccess = deleteSuccess;
const badRequest = (res, error, message = "Bad Request!") => {
    console.error(error);
    res.status(400).json({
        message,
        error
    });
};
exports.badRequest = badRequest;
const validationError = (res, error) => {
    console.warn(error);
    res.status(406).json({
        message: 'Validation Error!',
        error
    });
};
exports.validationError = validationError;
const serverError = (res, error) => {
    console.error(error);
    res.status(500).json({
        message: 'Server Error Occurred!',
        error
    });
};
exports.serverError = serverError;
const makeRand = (length) => {
    var result = '';
    var characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
exports.makeRand = makeRand;
const filterText = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
exports.filterText = filterText;
const dateFormatter = (date) => {
    var d = new Date(date), month = '' + (d.getMonth() + 1), day = '' + d.getDate(), year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
};
exports.dateFormatter = dateFormatter;
function changeTimezone(date) {
    var invDate = new Date(date.toLocaleString('en-US', { timeZone: "Asia/Dhaka" }));
    var diff = date.getTime() - invDate.getTime();
    return new Date(date.getTime() - diff);
}
const toTitleCase = (str) => {
    if (!str)
        return '';
    str = str.toLowerCase();
    return str.replace(/[^-'\s]+/g, function (word) {
        return word.replace(/^./, function (first) {
            return first.toUpperCase();
        });
    });
};
exports.toTitleCase = toTitleCase;
const tokenGenerator = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const obj = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        status: user.status,
        type: user.type,
    };
    try {
        const token = yield jwt.sign(obj, process.env.SECRET_KEY, { expiresIn: '15d' });
        return `Bearer ${token}`;
    }
    catch (error) {
        console.error(error);
        return false;
    }
});
exports.tokenGenerator = tokenGenerator;
const objectIdIsValid = (id) => mongoose_1.default.Types.ObjectId.isValid(id);
exports.objectIdIsValid = objectIdIsValid;

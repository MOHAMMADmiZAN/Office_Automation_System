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
exports.register = exports.login = void 0;
const models_1 = require("../models");
const bcrypt = __importStar(require("bcrypt"));
const validators_1 = __importDefault(require("../validators"));
const helper_1 = require("../utils/helper");
const user_1 = require("../models/user");
// LOGIN
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, password } = req.body;
    // // CHECK VALIDATION
    const formField = {
        "email": email,
        "password": password,
    };
    const validate = (0, validators_1.default)(formField);
    if (!validate.isValid) {
        return (0, helper_1.validationError)(res, validate.error);
    }
    try {
        let user = yield models_1.User.findOne({ email });
        if (!user) {
            return (0, helper_1.badRequest)(res, null, 'Invalid credentials!');
        }
        let compare = yield bcrypt.compare(password, user.password);
        if (!compare) {
            return (0, helper_1.badRequest)(res, null, 'Invalid credentials!');
        }
        if (user.status === user_1.UserStatus.INACTIVE) {
            return (0, helper_1.badRequest)(res, null, 'Your account has been blocked, please contact our support!');
        }
        const token = yield (0, helper_1.tokenGenerator)(user);
        return (0, helper_1.actionSuccess)(res, token, 'Login Successful!');
    }
    catch (error) {
        return (0, helper_1.serverError)(res, error);
    }
});
exports.login = login;
// USER REGISTER
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('register');
    let { firstName, lastName, email, password } = req.body;
    // // CHECK VALIDATION
    const formField = {
        firstName,
        lastName,
        email,
        password,
    };
    const validate = (0, validators_1.default)(formField);
    if (!validate.isValid) {
        return (0, helper_1.validationError)(res, validate.error);
    }
    try {
        // CHECK EMAIL UNIQUE
        let findData = yield models_1.User.findOne({ email });
        if (findData) {
            return (0, helper_1.badRequest)(res, null, 'Email address already exist!');
        }
        // GENERATE PASSWORD HASH KEY
        let hash = yield bcrypt.hash(password, 11);
        formField.password = hash;
        // SAVE DATA
        let schema = new models_1.User(formField);
        let result = yield schema.save();
        return (0, helper_1.createdSuccess)(res, result);
    }
    catch (error) {
        return (0, helper_1.serverError)(res, error);
    }
});
exports.register = register;

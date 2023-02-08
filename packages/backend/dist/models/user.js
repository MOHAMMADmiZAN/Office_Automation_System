"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatus = void 0;
const mongoose_1 = require("mongoose");
exports.UserStatus = {
    ACTIVE: 'ACTIVE',
    PENDING: 'PENDING',
    INACTIVE: 'INACTIVE'
};
const UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    // role: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Role',
    //     required: true,
    // },
    avatar: {
        type: String,
        default: null,
        trim: true
    },
    status: {
        type: String,
        default: exports.UserStatus.PENDING,
    },
}, { timestamps: true });
const User = (0, mongoose_1.model)('User', UserSchema);
exports.default = User;

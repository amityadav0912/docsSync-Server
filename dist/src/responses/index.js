"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailNotVerified = exports.inCorrectPassword = exports.userNotFound = void 0;
const userNotFound = [
    {
        msg: "Your email or password is incorrect",
    },
];
exports.userNotFound = userNotFound;
const inCorrectPassword = [
    {
        msg: "Incorrect Password",
    }
];
exports.inCorrectPassword = inCorrectPassword;
const emailNotVerified = [
    {
        msg: "Please verify your email before logging in."
    }
];
exports.emailNotVerified = emailNotVerified;

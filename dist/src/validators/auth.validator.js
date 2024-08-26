"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidator = void 0;
const express_validator_1 = require("express-validator");
class AuthValidator {
    constructor() {
        this.login = [
            (0, express_validator_1.body)("email")
                .isEmail()
                .normalizeEmail()
                .withMessage("Must be a valid email Address"),
            (0, express_validator_1.body)("password").exists().withMessage("Must Provide a password"),
        ];
        this.refreshToken = [
            (0, express_validator_1.body)("token").exists().withMessage("Must Provide a valid token."),
        ];
    }
}
const authValidator = new AuthValidator();
exports.authValidator = authValidator;

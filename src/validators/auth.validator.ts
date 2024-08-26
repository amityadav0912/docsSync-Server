import {body} from "express-validator"

class AuthValidator {
    public login = [
        body("email")
            .isEmail()
            .normalizeEmail()
            .withMessage("Must be a valid email Address"),
        body("password").exists().withMessage("Must Provide a password"),
    ];

    public  refreshToken = [
        body("token").exists().withMessage("Must Provide a valid token."),
    ];
}

const authValidator = new AuthValidator();

export {authValidator};
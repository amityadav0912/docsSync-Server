import { body } from "express-validator";

class DocumentValidator{
    public update = [
        body("title")
            .optional()
            .isLength({min:0, max:25})
            .withMessage("Title length should be between 0 to 25 characters."),

        body("isPublic")
            .optional()
            .isBoolean()
            .withMessage("Must provide true or false value here")
    ]
}

const documentValidator = new DocumentValidator();

export {documentValidator};
import {param} from "express-validator";

export const idValidator = param("id")
    .exists().withMessage('id is required')
    .isString().withMessage('id must be a string')
    .isLength({ min: 1 }).withMessage('id must be not empty')
    .isMongoId().withMessage('Incorrect format of ObjectId')
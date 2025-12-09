// import {ValidationErrorType} from "./validationError";
import {HttpStatus} from "./http-statuses";

// export type ValidationErrorDto = { errorsMessages: ValidationErrorType[] };
type ValidationErrorOutput = {
    status: HttpStatus;
    detail: string;
    source: {pointer: string};
    code: string | null;
};
export type ValidationErrorListOutput = {errors: ValidationErrorOutput[]};
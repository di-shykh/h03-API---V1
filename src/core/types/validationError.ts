// export type ValidationErrorType = {
//     field: string;
//     message: string;
// }
import {HttpStatus} from "./http-statuses";

export type ValidationErrorType = {
    status: HttpStatus;
    detail: string;
    source?: string | undefined;
    code?: string | undefined;
};
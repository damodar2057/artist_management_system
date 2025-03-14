//

import { ErrorCodes } from "../constants/error-codes.enum";
import { BaseException } from "./base.exception";


export class ValidationException extends BaseException {
    constructor(message: string, details?: string){
        super(message, ErrorCodes.VALIDATION_ERROR, 400, details)
    }
}
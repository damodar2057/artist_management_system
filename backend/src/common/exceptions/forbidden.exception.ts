//  backend/src/common/exceptions/forbidden.exception.ts

import { ErrorCodes } from "../constants/error-codes.enum";
import { BaseException } from "./base.exception";


export class ForbiddenException extends BaseException {
    constructor(message: string,details?: string ){
        super(message, ErrorCodes.FORBIDDEN, 403,details)
    }
}
//  backend/src/common/exceptions/unauthorized.exception.ts

import { ErrorCodes } from "../constants/error-codes.enum";
import { BaseException } from "./base.exception";


export class UnauthorizedException extends BaseException {
    constructor(message: string,details?: string ){
        super(message, ErrorCodes.UNAUTHORIZED, 401,details)
    }
}
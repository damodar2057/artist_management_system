// backend/src/common/exceptions/resouce-conflict.exception.ts

import { ErrorCodes } from "../constants/error-codes.enum";
import { BaseException } from "./base.exception";


export class ConflictException extends BaseException {
    constructor(message: string,details?: string ){
        super(message, ErrorCodes.RESOURCE_CONFLICT, 409,details)
    }
}
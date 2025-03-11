// // src/common/exceptions/base.exception.ts

import { ErrorCodes } from "../constants/error-codes.enum";


export class BaseException extends Error {
    public readonly statusCode: number;
    public readonly code: string;
    public readonly details?: any;

    constructor(message: string, code: string, statusCode: number = 500, details?: any) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
        
        Object.setPrototypeOf(this, new.target.prototype); // Fix prototype chain
    }
}


import { ErrorCodes } from "../constants/error-codes.enum";
import { BaseException } from "./base.exception";


export class BadRequestException extends BaseException {
    constructor(message: string , details?: string){
        super(message, ErrorCodes.BAD_REQUEST, 400, details)
    }
}
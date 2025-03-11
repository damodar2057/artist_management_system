
import { BaseException } from "./base.exception";


export class BadRequestException extends BaseException {
    constructor(message: string = "Bad Request", code: string, statusCode: number = 400, details: string){
        super(message, code, statusCode, details)
    }
}
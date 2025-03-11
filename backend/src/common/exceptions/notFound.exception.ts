//

import { BaseException } from "./base.exception";


export class NotFoundException extends BaseException {
    constructor(message: string = "Not Found Exception", code: string, statusCode: number = 404, details: string){
        super(message, code, statusCode, details)
    }
}
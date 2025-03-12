//

import { ErrorCodes } from "../constants/error-codes.enum";
import { BaseException } from "./base.exception";


export class NotFoundException extends BaseException {
    constructor(message: string, details?: string){
        super(message, ErrorCodes.NOT_FOUND, 404, details)
    }
}
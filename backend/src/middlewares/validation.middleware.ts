import { NextFunction, Request, Response } from "express"
import { BadRequestException } from "src/common/exceptions/badRequest.exception";



type ValidatorFunction = (data: any) => string[]

const validatorMiddleware = (validator: ValidatorFunction) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const errors = validator(req.body);
        if (errors.length > 0){
            throw new BadRequestException(`Validation error: ${errors}`)
        }

        next();
    }
}

export default validatorMiddleware;
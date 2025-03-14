// backend/src/utils/jwt.util.ts

import * as jwt from 'jsonwebtoken'
import { IJwtPayload } from 'src/common/interfaces/jwt.payload'
import appConfig from 'src/config/app.config'

export async function signJwtToken(payload: IJwtPayload){
    return jwt.sign(payload, appConfig.jwtSecretKey, {
        expiresIn: +appConfig.jwtExpiryInterval
    })
}


export async function verifyJwtToken(token: string): Promise<IJwtPayload> {
    return  jwt.verify(token, appConfig.jwtSecretKey) as IJwtPayload
}


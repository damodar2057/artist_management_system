//

import { IPaginationResponse } from "./pagination.interface";


export interface IResponse<T> {
    message: string;
    path: string;
    statusCode: number;
    timestamp: string;
    data?: T;
    pagination?: IPaginationResponse;
}

export interface ILoginResponse extends IResponse<{accessToken: string, expiresIn: number}> {}
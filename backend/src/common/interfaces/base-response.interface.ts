//

import { IPaginationResponse } from "./paginated-response.interface";


export interface IBaseResponse<T = any> {
    message: string;
    path: string;
    statusCode: number;
    timestamp: string;
    data?: T;
    pagination?: IPaginationResponse;
}


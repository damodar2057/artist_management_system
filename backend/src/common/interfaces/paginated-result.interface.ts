//

import { IPaginationResponse } from "./paginated-response.interface";


export interface IPaginatedResult<T> {
    data: T,
    pagination: IPaginationResponse
}
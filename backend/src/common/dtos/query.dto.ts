//



export class QueryDto {

    page?: number = 1;



    pageSize?: number = 10;


    sortBy?: string = 'createdAt'


    sortOrder?: 'ASC' | 'DESC' = 'DESC'


}
//


export interface IErrorMessage{
    success: string,
    code: string,
    statusCode: string | number,
    message: string,
    path: string,
    timestamp: string,
    details?: string
}
//



export interface IErrorResponse {
  status: string;
  message: string;
  timestamp: string;
  path: string;
  stack?: string;
}
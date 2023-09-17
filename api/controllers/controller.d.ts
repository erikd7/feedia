import { Request } from "express";

export interface ResponseObject {
  status: StatusCodes;
  body: any;
}

export interface Controller {
  (req: Request): Promise<ResponseObject>;
}

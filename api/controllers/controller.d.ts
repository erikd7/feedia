import { Response, NextFunction } from "express";
import { Request } from "../types/express";

export interface ResponseObject {
  status: StatusCodes;
  body: any;
}

export interface Controller {
  (req: Request, res: Response, next: NextFunction): Promise<ResponseObject>;
}

import jwt from "jsonwebtoken";
import { DynamicId } from "../database/schemas";

export type UserToken = {
  id: DynamicId;
};

export const createToken = (payload: UserToken) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string);
};

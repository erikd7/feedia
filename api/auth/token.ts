import jwt from "jsonwebtoken";

export const createToken = (payload: Object) => {
  return jwt.sign(payload, process.env.JWT_SECRET as string);
};

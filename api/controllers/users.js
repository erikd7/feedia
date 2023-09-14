import { getUser as getUserDomain } from "../domain/users";
import User from "../models/user";
import { getFailureBody } from "./controller-helper";
import validateSchema from "../util/validate";

export const getUser = async req => {
  //Validate body
  const { userId } = req.params;
  validateSchema("userId", ...User.getIdSchema());

  const result = await getUserDomain(parseInt(userId));

  //Return success
  if (result.ok) {
    return { status: 200, body: result.user };
  }

  return getFailureBody(result);
};

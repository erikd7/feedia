import { getUser as getUserDomain } from "../domain/users";
import User from "../models/user";
import { getFailureBody } from "./controller-helper";
import { validateSchema } from "../util/schema";

export const getUser = async req => {
  //Validate body
  const { userId } = req.params;
  const validation = validateSchema(userId, User.getIdSchema());
  if (!validation.ok) {
    return getFailureBody(validation);
  }

  const result = await getUserDomain(parseInt(userId));

  //Return success
  if (result.ok) {
    return { status: 200, body: result.user };
  }

  return getFailureBody(result);
};

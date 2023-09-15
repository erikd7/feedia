import User from "../models/user";
import { createResponse } from "./controller-helper";

export const getUser = async req => {
  //Transform req to user
  const { userId } = req.params;
  const user = new User(userId);

  //Validate input
  user.validateId();

  //Retrieve info
  await user.retrieveAndSet();

  //Return success
  return createResponse(user);
};

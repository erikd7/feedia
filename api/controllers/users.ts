import User from "../models/user";
import { createResponse } from "./controller-helper";
import { Controller } from "./controller";

//Define this as a controller
export const getUser: Controller = async req => {
  //Transform req to user
  const { userId } = req.params;
  const user = new User({ id: parseInt(userId) });

  //Validate input
  user.validateId();

  //Retrieve info
  await user.retrieveAndSet();

  //Return success
  return createResponse(user);
};

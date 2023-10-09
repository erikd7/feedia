import User from "../models/user";
import { createResponse } from "./controller-helper";
import { Controller } from "./controller";

export const getSelf: Controller = async req => {
  const { user: reqUser } = req;

  //@ts-ignore
  const user = new User({ id: reqUser.id });

  //Validate input
  user.validateId();

  //Retrieve info
  await user.retrieveAndSet();

  //Return success
  return createResponse(user);
};

export const getUser: Controller = async req => {
  //Transform req to user
  const { userId } = req.params;
  const user = new User({ id: userId });

  //Validate input
  user.validateId();

  //Retrieve info
  await user.retrieveAndSet();

  //Return success
  return createResponse(user);
};

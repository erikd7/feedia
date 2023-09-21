import { runQuery, queries } from "../database/postgres";
import User from "../models/user";

export type UserCreationData = {
  externalDataSourceId: number;
  externalId: string;
  nameFirst: string;
  nameLast?: string | undefined;
  email: string;
  photoUrl?: string | undefined;
};

//Upsert to create or update user info
export const register = async (userData: UserCreationData) => {
  //Upsert user
  const { user } = await runQuery(
    queries.upsertUserByExternalId(
      userData.nameFirst,
      userData.nameLast,
      userData.email,
      userData.externalDataSourceId,
      userData.externalId,
      userData.photoUrl
    ),
    "user",
    true
  );

  return User.createFromDbRow(user);
};

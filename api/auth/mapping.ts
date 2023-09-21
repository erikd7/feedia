//Use this to map auth data provider types to internal types
import { UserCreationData } from "../domain/auth";
import { Profile as GoogleProfile } from "passport-google-oauth20";
import { getDeps } from "../config/deps";

export const mapGoogleProfileToUser = (googleProfile: GoogleProfile) => {
  const dataSouceId = getDeps("dbConstants").dataSources.GOOGLE;
  return {
    externalDataSourceId: dataSouceId,
    externalId: googleProfile.id,
    nameFirst: googleProfile.name?.givenName,
    nameLast: googleProfile.name?.familyName,
    email: googleProfile.emails?.[0]?.value,
    photoUrl: googleProfile.photos?.[0]?.value
  } as UserCreationData;
};

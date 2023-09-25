import { pg as SQL } from "yesql";
import { DynamicId } from "../schemas";

const queries = {
  getUser: (id: DynamicId) =>
    SQL(`
    select  id, name_first "nameFirst", name_last "nameLast",
              email, data_source_id "dataSourceId", external_id "externalId"
    from users
    where id = :id
  `)({ id }),

  getUserByExternalId: (dataSourceId: Number, externalId: string) =>
    SQL(`
    select  user_id "userId"          
    from users
    where data_source_id = :dataSourceId and external_id = :externalId
  `)({ dataSourceId, externalId }),

  upsertUserByExternalId: (
    nameFirst: string,
    nameLast: string | undefined,
    email: string,
    dataSourceId: Number,
    externalId: string,
    photoUrl: string | undefined
  ) =>
    SQL(`
    insert into users ("name_first", "name_last", email, data_source_id, external_id, photo_url)
    values (:nameFirst, :nameLast, :email, :dataSourceId, :externalId, :photoUrl)
    on conflict (data_source_id, external_id) do update
    set "name_first" = EXCLUDED."name_first",
        "name_last" = EXCLUDED."name_last",
        email = EXCLUDED.email,
        photo_url = EXCLUDED.photo_url
    returning id, name_first "nameFirst", name_last "nameLast",
              email, photo_url "photoUrl", data_source_id "dataSourceId", external_id "externalId"
  `)({ nameFirst, nameLast, email, dataSourceId, externalId, photoUrl })
};

export default queries;

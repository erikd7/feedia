import SQL from "sql-template-strings";
import { DynamicId } from "../schemas";

const queries = {
  create: (userId: DynamicId, listName: string) =>
    SQL`
      insert into list (id, "name", user_id) values 
      (generate_ulid(), ${listName}, ${userId})
      returning id;
    `,

  getForUser: (userId: DynamicId) =>
    SQL`
      select id, name
      from v_lists
      where "userId" = ${userId}
    `,

  getDetails: (id: DynamicId, userId: DynamicId) =>
    SQL`
      with title_info as (
        select t.*, utr.rating "userRating"
        from v_title_meta t
        left join user_title_rating utr on utr.title_id = t.id
          and utr.user_id = ${userId}
      )
      select
        l.*,
        jsonb_agg(t.*) "titles"
      from v_list l
      left join list_title lt on l.id = lt.list_id
      left join title_info t on lt.title_id = t.id
      where l.id = ${id}
      group by l.id, l.name, l."userId"
    `,

  addTitleToList: (listId: DynamicId, titleId: DynamicId) =>
    SQL`
      insert into list_title (list_id, title_id) values
      (${listId}, ${titleId})
    `
};

export default queries;

import SQL from "sql-template-strings";
import { DynamicId } from "../schemas";

const queries = {
  getRatingInfo: (userId: DynamicId, titleId: DynamicId) =>
    SQL`
      select 
        utr_all.id "titleId",
        max(utr_all.rating) "rating",
        max(utr_all.ratings) "ratings",
        max(utr_user.rating) "userRating"
      from v_title_rating utr_all
      left join user_title_rating utr_user on 
      	utr_user.user_id = ${userId} and
      	utr_user.title_id = ${titleId}
      where utr_all.id = ${titleId}
      group by utr_all.id
    `,

  setUserTitleRating: (
    userId: DynamicId,
    titleId: DynamicId,
    rating: number
  ) => SQL`
    insert into user_title_rating (user_id, title_id, rating) values
    (${userId}, ${titleId}, ${rating})
    on conflict (user_id, title_id) do update
    set rating = ${rating};
  `
};

export default queries;

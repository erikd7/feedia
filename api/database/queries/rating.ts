import SQL from "sql-template-strings";
import { DynamicId } from "../schemas";

const queries = {
  getAverageRating: (id: any) =>
    SQL`
      select title_id "titleId", round(avg(rating), 2)::float rating, count(user_id)::integer ratings
      from user_title_rating 
      where title_id = ${id}
      group by title_id`,

  setUserTitleRating: (
    userId: DynamicId,
    titleId: DynamicId,
    rating: number
  ) => SQL`
    insert into user_title_rating (user_id, title_id, rating) values
    (${userId}, ${titleId}, ${rating})
    on conflict (user_id, title_id) do update
    set rating = ${rating}
  `
};

export default queries;

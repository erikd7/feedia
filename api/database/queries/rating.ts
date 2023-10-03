import SQL from "sql-template-strings";

const queries = {
  getAverageRating: (id: any) =>
    SQL`
      select title_id "titleId", round(avg(rating), 2) rating, count(user_id) ratings
      from user_title_rating 
      where title_id = ${id}
      group by title_id`
};

export default queries;

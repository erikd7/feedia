import staticQueries from "./queries/static";
import usersQueries from "./queries/users";
import titleQueries from "./queries/title";
import ratingQueries from "./queries/rating";
import listQueries from "./queries/list";

const queries = {
  ...staticQueries,
  ...usersQueries,
  ...titleQueries,
  ...ratingQueries,
  list: listQueries
};

export default queries;

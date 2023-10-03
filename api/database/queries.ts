import staticQueries from "./queries/static";
import usersQueries from "./queries/users";
import titleQueries from "./queries/title";
import ratingQueries from "./queries/rating";

const queries = {
  ...staticQueries,
  ...usersQueries,
  ...titleQueries,
  ...ratingQueries
};

export default queries;

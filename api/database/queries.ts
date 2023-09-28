import staticQueries from "./queries/static";
import usersQueries from "./queries/users";
import titleQueries from "./queries/title";

const queries = {
  ...staticQueries,
  ...usersQueries,
  ...titleQueries
};

export default queries;

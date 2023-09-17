import staticQueries from "./queries/static";
import usersQueries from "./queries/users";

const queries = {
  ...staticQueries,
  ...usersQueries
};

export default queries;

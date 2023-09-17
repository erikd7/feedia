import { pg as SQL } from "yesql";

const queries = {
  getUser: (id: Number) =>
    SQL(`
    select  id::integer,
            name
    from users
    where id = :id
  `)({ id })
};

export default queries;

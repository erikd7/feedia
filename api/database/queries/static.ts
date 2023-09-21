//Queries on static tables to get DB constants
import { pg as SQL } from "yesql";

const queries = {
  getMediaTypes: () =>
    SQL(`
    select  id::integer,
            key
    from media_type
  `)({}),

  getDataSources: () =>
    SQL(`
    select  id::integer,
            key
    from data_source
  `)({})
};

export default queries;

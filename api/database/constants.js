import { runQuery, queries } from "./postgres";
import { arrayToHash as rowsToHash } from "../util/mapping";

const builder = [
  {
    query: queries.getMediaTypes(),
    constantsKey: "userStatusIds",
    transform: result => rowsToHash(result.rows, "key")
  }
];

const getConstants = async () => {
  let constants = {};

  for await (const { query, constantsKey, transform } of builder) {
    const result = await runQuery(query);

    constants[constantsKey] = transform(result);
  }

  return constants;
};

export default getConstants;

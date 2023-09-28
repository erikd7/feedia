import { runQuery, queries } from "./postgres";
import { arrayToHash as rowsToHash, objectSwap } from "../util/mapping";

const builder = [
  {
    query: queries.getMediaTypes(),
    constantsKey: "mediaTypes",
    transform: (result: any) => rowsToHash(result.rows)
  },
  {
    query: queries.getDataSources(),
    constantsKey: "dataSources",
    transform: (result: any) => rowsToHash(result.rows)
  }
];

const getConstants = async () => {
  let constants: any = {};

  for await (const { query, constantsKey, transform } of builder) {
    const result = await runQuery(query);

    const transformedResult = transform(result);
    constants[constantsKey] = transformedResult;

    //Reverse constants (look up key by ID)
    constants[`${constantsKey}R`] = objectSwap(transformedResult);
  }

  return constants;
};

export default getConstants;

import { get } from "../util/http.js";

const baseUrl = "https://www.googleapis.com/books/v1";

export const searchBooks = async (
  queryString,
  {
    maxResults = 10,
    printType = "books",
    projection = "lite",
    langRestrict = "en",
    orderBy = "relevance"
  } = {}
) => {
  const params = {
    q: queryString,
    maxResults,
    printType,
    projection,
    langRestrict,
    orderBy
  };
  return get(baseUrl + "/volumes", params);
};

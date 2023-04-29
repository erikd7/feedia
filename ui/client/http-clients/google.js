import { get } from "../util/http.js";

const baseUrl = "https://www.googleapis.com/books/v1";

export const searchBooks = async queryString => {
  const params = { q: queryString };
  return get(baseUrl + "/volumes", params);
};

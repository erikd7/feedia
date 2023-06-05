import config from "../config/build";
import { MEDIA_TYPES } from "./constants/base";
import getRequiredFields from "./constants/fields";
import Openlibrary from "../classes/open-library";
import TMDB from "../classes/tmdb";

const searchConfig = config.search;

const search = async (currentMediaTypesHash, query, isFullPageSearch) => {
  //Get the fields needed
  const fieldsType = isFullPageSearch ? "expanded" : "limited";
  const fields = getRequiredFields(currentMediaTypesHash, fieldsType, true);

  //Get results limit
  const resultsLimit = isFullPageSearch
    ? searchConfig.limit.full
    : searchConfig.limit.limited;

  //Get results
  let results = [];

  //TODO wrap these in Promise.all()

  //Get book info
  if (currentMediaTypesHash[MEDIA_TYPES.BOOK]) {
    const books = await Openlibrary.search(
      query,
      fields[MEDIA_TYPES.BOOK],
      resultsLimit
    );
    results = results.concat(books);
  }

  //Get movie info
  if (currentMediaTypesHash[MEDIA_TYPES.MOVIE]) {
    console.log(`gonna call tmdb search`); /* //!DELETE */
    const movies = await TMDB.search(query, resultsLimit);
    results = results.concat(movies);
  }

  //TODO Prioritize results across all media types

  return results;
};

export default search;

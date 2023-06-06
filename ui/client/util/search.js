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
  //Each media type should respect the limit and then the limit will be enforced when selecting from the different types
  //E.g. if searching movies and books, retrieve N movies and N books and then choose N movies/books from the set of 2N
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
    const movies = await TMDB.search(query, resultsLimit);
    results = results.concat(movies);
  }

  //Prioritize results across all media types
  const sortedResults = sortResults(query, results);

  return sortedResults;
};

//Eventually this will be a more robust server-side sort, but this will work for now
const sortResults = (_query, results) => {
  return results;
};

export default search;

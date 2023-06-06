import config from "../config/build";
import { MEDIA_TYPES } from "./constants/base";
import getRequiredFields from "./constants/fields";
import Openlibrary from "../classes/open-library";
import TMDB from "../classes/tmdb";

const searchConfig = config.search;

const search = async (
  query,
  currentMediaTypes,
  currentMediaTypesHash,
  isFullPageSearch
) => {
  //Get the fields needed
  const fieldsType = isFullPageSearch ? "expanded" : "limited";
  const fields = getRequiredFields(currentMediaTypesHash, fieldsType, true);

  //Get results limit
  //Each media type should respect the limit and then the limit will be enforced when selecting from the different types
  //E.g. if searching movies and books, retrieve N movies and N books and then choose N movies/books from the set of 2N
  const resultsLimit = isFullPageSearch
    ? searchConfig.limit.full
    : searchConfig.limit.limited;

  //Get search results
  //Build promises in the order of current media types
  const newPromises = currentMediaTypes.map(mediaType => {
    if (mediaType === MEDIA_TYPES.BOOK) {
      const booksPromise = Openlibrary.search(
        query,
        fields[MEDIA_TYPES.BOOK],
        resultsLimit
      );
      return booksPromise;
    }

    if (mediaType === MEDIA_TYPES.MOVIE) {
      const moviesPromise = TMDB.search(query, resultsLimit);
      return moviesPromise;
    }
  });

  //Await the search result promises
  const results = await Promise.all(newPromises);

  return results.flat();
};

export default search;

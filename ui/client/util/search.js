import config from "../config/build";
import { MEDIA_TYPES } from "./constants/base";
import getRequiredFields from "./constants/fields";
import OpenlibraryClient from "../classes/open-library";

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

  //Get book info
  if (currentMediaTypesHash[MEDIA_TYPES.BOOK]) {
    const books = await OpenlibraryClient.search(
      query,
      fields[MEDIA_TYPES.BOOK],
      resultsLimit
    );
    results = results.concat(books);
  }

  //TODO Prioritize results across all media types

  return results;
};

export default search;

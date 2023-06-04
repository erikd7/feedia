import { MEDIA_TYPES } from "./base";

//Fields stack on each other, e.g. when you collect book.expanded fields, you should already have collected book.limited fields
const levels = ["limited", "expanded"];

export const book = {
  limited: ["openLibraryEditionKey", "title", "firstPublishYear", "authors"],
  expanded: ["firstSentence", "medianPages", "subjects"]
};

const movie = {
  limited: ["title"],
  expanded: []
};

const fields = { [MEDIA_TYPES.BOOK]: book, [MEDIA_TYPES.MOVIE]: movie };

const getFields = (mediaType, level, aggregate = true) => {
  try {
    let levelsToGet = [level];
    if (aggregate) {
      const levelIndex = levels.indexOf(level);
      if (levelIndex !== -1) {
        levelsToGet = levels.slice(0, levelIndex + 1);
      }
    }
    const result = levelsToGet.reduce((acc, level) => {
      return acc.concat(fields[mediaType][level]);
    }, []);

    return result;
  } catch (e) {
    console.log(
      `Error getting fields for media type ${mediaType}, level ${level}, aggregate: ${aggregate}.`,
      e.message
    );
    return [];
  }
};

const getRequiredFields = (mediaTypes, level, aggregate = true) => {
  return Object.keys(mediaTypes).reduce((acc, mediaType) => {
    acc[mediaType] = getFields(mediaType, level, aggregate);
    return acc;
  }, {});
};

export default getRequiredFields;

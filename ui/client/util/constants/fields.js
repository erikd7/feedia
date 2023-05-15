//Fields stack on each other, e.g. when you collect book.expanded fields, you should already have collected book.limited fields

const levels = ["limited", "expanded"];

export const book = {
  limited: ["openLibraryEditionKey", "title", "firstPublishYear", "authors"],
  expanded: []
};

const fields = { book };

const getFields = (mediaType, level, aggregate) => {
  try {
    let levelsToGet = [level];
    if (aggregate) {
      const levelIndex = levels.indexOf(level);
      if (levelIndex !== -1) {
        levelsToGet = levels.slice(0, levelIndex);
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

export default getFields;

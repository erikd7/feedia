import { get } from "../util/http";
import { TwoWayMap } from "../util/mapping/mapping";
import { book as bookFields } from "../util/constants/fields";
import Book from "./Book";
import config from "../config/build";

const baseUrl = "https://openlibrary.org";
const searchLimitByType = config.search.limit;
const fieldMap = TwoWayMap.build({
  openLibraryEditionKey: "cover_edition_key",
  title: "title",
  authors: "author_name",
  firstPublishYear: "first_publish_year",
  description: "description",
  firstSentence: "first_sentence",
  medianPages: "number_of_pages_median",
  subjects: "subject_facet"
});
const fieldTransformer = {
  firstSentence: sentencesArray => sentencesArray?.[0] || ""
};

export default class OpenlibraryClient {
  constructor() {}

  //Search component
  static async search(
    queryString,
    fields = bookFields.limited,
    limit = searchLimitByType.limited
  ) {
    //Map input fields to OpenLibrary fields
    const openlibraryFields = this.getOpenLibraryFields(fields);
    const params = {
      q: `"${queryString}"`,
      fields: openlibraryFields?.join(),
      limit
    };
    //Make the request
    const books = this.destructureResponseData(
      await get(baseUrl + "/search.json", params)
    );

    //Map OpenLibrary fields back to our fields and create a class instance
    const formattedBooks = books.map(b =>
      this.instantiateBookClass(this.convertObjectToLocal(b))
    );

    return formattedBooks;
  }

  //Additional data
  static getResultsPageInfo(workId) {}

  //Get book cover
  static getCoverUrl(id, size = "S", idType = "olid") {
    return `https://covers.openlibrary.org/b/${idType}/${id}-${size}.jpg`;
  }

  //Helpers
  static destructureResponseData(response) {
    return response.data.docs;
  }

  //Mappers
  static getOpenLibraryFields(inputFields) {
    return inputFields.map(i => fieldMap.get(i) || i);
  }
  static getLocalFields(openLibraryFields) {
    return openLibraryFields.map(i => fieldMap.revGet(i) || i);
  }
  static convertObjectToLocal(openLibraryObject) {
    return Object.entries(openLibraryObject).reduce((agg, [oldKey, value]) => {
      const newKey = fieldMap.revGet(oldKey) || oldKey;
      const transformer = fieldTransformer[newKey];
      let transformedValue = value;
      if (fieldTransformer[newKey]) {
        transformedValue = transformer(value);
      }
      agg[newKey] = transformedValue;

      return agg;
    }, {});
  }
  static instantiateBookClass(bookObject) {
    return new Book(bookObject);
  }
}

import { get } from "../util/http";
import { TwoWayMap } from "../util/mapping/mapping";
import Book from "./Book";
import config from "../config/build";

const baseUrl = "https://openlibrary.org";
const searchLimitByType = config.search.limit;
const fieldMap = TwoWayMap.build({
  title: "title",
  authors: "author_name",
  firstPublishYear: "first_publish_year"
});

export default class OpenlibraryClient {
  constructor() {}

  //Search component
  static async searchBooks(
    queryString,
    { fields = ["title", "firstPublishYear", "authors"] } = {},
    limit = searchLimitByType.subComponent
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

  //Search wrapper for sub component (when router is not '/search')
  static subComponentSearch(queryString, fields) {
    const limit = searchLimitByType.subComponent;
    return this.searchBooks(queryString, fields, limit);
  }
  //Search wrapper for full page
  static fullPageSearch(queryString, fields) {
    const limit = searchLimitByType.fullPage;
    return this.searchBooks(queryString, fields, limit);
  }
  static search(queryString, isFullPageSearch = false) {
    if (isFullPageSearch) {
      return this.fullPageSearch(queryString);
    }

    return this.subComponentSearch(queryString);
  }

  //Helpers
  static destructureResponseData(response) {
    return response.data.docs;
  }

  //Mappers
  static getOpenLibraryFields(inputFields) {
    return inputFields.map(i => fieldMap.get(i));
  }
  static getLocalFields(openLibraryFields) {
    return openLibraryFields.map(i => fieldMap.revGet(i));
  }
  static convertObjectToLocal(openLibraryObject) {
    return Object.entries(openLibraryObject).reduce((agg, [oldKey, value]) => {
      const newKey = fieldMap.revGet(oldKey);
      agg[newKey] = value;

      return agg;
    }, {});
  }
  static instantiateBookClass(bookObject) {
    return new Book(bookObject);
  }
}

import { get } from "../util/http.js";
import { TwoWayMap } from "../util/mapping/mapping.js";
import Book from "./Book.js";

const baseUrl = "https://openlibrary.org";
const fieldMap = TwoWayMap.build({
  title: "title",
  authors: "author_name",
  firstPublishYear: "first_publish_year"
});

export default class OpenlibraryClient {
  constructor() {}

  static async searchBooks(
    queryString,
    { fields = ["title", "firstPublishYear", "authors"] } = {}
  ) {
    //Map input fields to OpenLibrary fields
    const openlibraryFields = this.getOpenLibraryFields(fields);
    const params = {
      q: `"${queryString}"`,
      fields: openlibraryFields?.join()
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

import { get } from "../util/http";
import { TwoWayMap } from "../util/mapping/mapping";
import { book as bookFields } from "../util/constants/fields";
import Book from "./Book";
import config from "../config/build";

export class OpenLibrary {
  constructor() {
    this.baseUrl = "https://openlibrary.org";

    this.fieldMap = TwoWayMap.build({
      openLibraryEditionKey: "cover_edition_key",
      title: "title",
      authors: "author_name",
      firstPublishYear: "first_publish_year",
      description: "description",
      firstSentence: "first_sentence",
      medianPages: "number_of_pages_median",
      subjects: "subject_facet"
    });
    this.fieldTransformer = {
      firstSentence: sentencesArray => sentencesArray?.[0] || ""
    };

    this.searchConfig = config.search;
  }

  //Search component
  async search(
    queryString,
    fields = bookFields.limited,
    limit = this.searchConfig.limit.limited
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
      await get(this.baseUrl + "/search.json", params)
    );

    //Map OpenLibrary fields back to our fields and create a class instance
    const formattedBooks = books.map(b =>
      this.instantiateBookClass(this.convertObjectToLocal(b))
    );

    return formattedBooks;
  }

  //Get book cover
  getCoverUrl(id, size = "S", idType = "olid") {
    return `https://covers.openlibrary.org/b/${idType}/${id}-${size}.jpg`;
  }

  //Helpers
  destructureResponseData(response) {
    return response.data.docs;
  }

  //Mappers
  getOpenLibraryFields(inputFields) {
    return inputFields.map(i => this.fieldMap.get(i) || i);
  }
  getLocalFields(openLibraryFields) {
    return openLibraryFields.map(i => this.fieldMap.revGet(i) || i);
  }
  convertObjectToLocal(openLibraryObject) {
    return Object.entries(openLibraryObject).reduce((agg, [oldKey, value]) => {
      const newKey = this.fieldMap.revGet(oldKey) || oldKey;
      const transformer = this.fieldTransformer[newKey];
      let transformedValue = value;
      if (this.fieldTransformer[newKey]) {
        transformedValue = transformer(value);
      }
      agg[newKey] = transformedValue;

      return agg;
    }, {});
  }
  instantiateBookClass(bookObject) {
    return new Book(bookObject);
  }
}

const openLibrary = new OpenLibrary();

export default openLibrary;

import { getNoAuth } from "../util/http";
import { TwoWayMap } from "../util/mapping/mapping";
import { book as bookFields } from "../util/constants/fields";
import Book from "./Book";
import config from "../../config/build";

export class OpenLibrary {
  constructor() {
    this.dataSourceKey = "openlibrary";
    this.baseUrl = "https://openlibrary.org";

    //Redirect info for proxy
    this.redirectUrl = config.proxy.redirect
      ? config.proxy.host + config.external.openLibrary.proxyPath
      : null;

    this.fieldMap = TwoWayMap.build({
      openLibraryEditionKey: "cover_edition_key",
      title: "title",
      authors: "author_name",
      firstPublishYear: "first_publish_year",
      description: "description",
      firstSentence: "first_sentence",
      medianPages: "number_of_pages_median",
      numPages: "number_of_pages",
      subjects: "subject_facet"
    });
    this.fieldTransformer = {
      firstSentence: sentencesArray => sentencesArray?.[0] || ""
    };

    this.searchConfig = config.search;
  }

  url() {
    return this.redirectUrl || this.baseUrl;
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
      await getNoAuth(this.url(), ["/search.json"], params)
    ).docs;

    //Filter results
    const filteredBooks = books.filter(this.filterSearchResult);

    //Map OpenLibrary fields back to our fields and create a class instance
    const formattedBooks = filteredBooks.map(b =>
      this.instantiateBookClass(this.convertObjectToLocal(b))
    );

    return formattedBooks;
  }

  //Get details
  async getDetails(id) {
    const result = this.destructureResponseData(
      await getNoAuth(this.url(), ["works", id + ".json"])
    );

    //Format
    const book = this.convertObjectToLocal(result);

    return book;
  }

  //Get book cover
  getCoverUrl(id, size = "S", idType = "olid") {
    return `https://covers.openlibrary.org/b/${idType}/${id}-${size}.jpg`;
  }

  //Helpers
  destructureResponseData(response) {
    return response.data;
  }

  //Mappers
  getOpenLibraryFields(inputFields) {
    return inputFields.map(i => this.fieldMap.get(i) || i);
  }
  getLocalFields(openLibraryFields) {
    return openLibraryFields.map(i => this.fieldMap.revGet(i) || i);
  }
  //Only include search results that have an OL edition key. Books without an OL edition key tend to be very low profile and do not have additional information (like description, cover image, etc.)
  filterSearchResult = book => book[this.fieldMap.get("openLibraryEditionKey")];
  convertObjectToLocal(openLibraryObject) {
    return Object.entries(openLibraryObject).reduce((agg, [oldKey, value]) => {
      const newKey = this.fieldMap.revGet(oldKey);
      if (newKey) {
        const transformer = this.fieldTransformer[newKey];
        let transformedValue = value;
        if (this.fieldTransformer[newKey]) {
          transformedValue = transformer(value);
        }
        agg[newKey] = transformedValue;
      }
      return agg;
    }, {});
  }
  instantiateBookClass(bookObject) {
    return new Book(bookObject);
  }
}

const openLibrary = new OpenLibrary();

export default openLibrary;

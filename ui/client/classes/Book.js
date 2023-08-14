import OpenlibraryClient from "./open-library";
import { MEDIA_TYPES } from "../util/constants/base";

export default class Book {
  constructor(input) {
    this.mediaType = MEDIA_TYPES.BOOK;
    //Limited fields
    this.title = input.title;
    this.authors = input.authors;
    this.firstPublishYear = input.firstPublishYear;
    this.openLibraryEditionKey = input.openLibraryEditionKey;

    //Expanded fields
    this.descriptions = input.description;
    this.firstSentence = input.firstSentence;
    this.medianPages = input.medianPages;
    this.subjects = input.subjects?.slice(0, 5);

    //Run cleaner functions
    this.clean();
  }

  //Cleaner functions
  dedupeAuthors() {
    if (this.authors?.length > 1) {
      const normalizedAuthorNames = new Set();

      this.authors = this.authors.reduce((authorNames, authorName) => {
        //Compare insensitive to case and punctuation
        const normalizedAuthorName = authorName
          .toLowerCase()
          .replace(/[^\w\s]/g, "");
        if (!normalizedAuthorNames.has(normalizedAuthorName)) {
          authorNames.push(authorName);
          normalizedAuthorNames.add(normalizedAuthorName);
        }
        return authorNames;
      }, []);
    }
  }
  clean() {
    this.dedupeAuthors();
  }

  //Add additional info to existing
  async addInfoResultsPage() {
    const result = await OpenlibraryClient.getResultsPageInfo(
      this.openLibraryEditionKey
    );
    return "";
  }

  routeId() {
    return this.title; //eventually this will be an internal ID
  }

  //Display info
  displayTitle() {
    return this.title;
  }
  displayAuthors() {
    return this.authors?.join(", ");
  }
  displayFirstNAuthors(n = 2) {
    return this.authors?.slice(0, n).join(", ");
  }
  displayFirstPublishYear() {
    return this.firstPublishYear;
  }
  displayDescription() {
    return this.description || "";
  }
  displayFirstSentence() {
    return this.firstSentence || "";
  }
  displayPages() {
    return this.medianPages || "";
  }

  //Cover
  getCoverName(size = "M") {
    return `book/cover/${this.openLibraryEditionKey}-${size}.jpg`;
  }
  getCoverUrl(size = "M") {
    return OpenlibraryClient.getCoverUrl(this.openLibraryEditionKey, size);
  }

  getLabel() {
    return `${this.title}${
      this.authors ? ` - ${this.displayFirstNAuthors()}` : ""
    }`;
  }
  toString() {
    return `${this.title}${this.authors ? ` - ${this.displayAuthors()}` : ""}`;
  }
}

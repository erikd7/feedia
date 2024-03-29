import OpenlibraryClient from "./open-library";
import { MEDIA_TYPES } from "../util/constants/base";
import Title from "./Title";

export default class Book extends Title {
  constructor(input, dataLevel, options) {
    super(input, dataLevel, options);

    this.infoClient = OpenlibraryClient;
    this.mediaType = MEDIA_TYPES.BOOK;
    //Limited fields
    this.title = input.title;
    this.authors = input.authors;
    this.firstPublishYear = input.firstPublishYear;
    this.openLibraryEditionKey = input.openLibraryEditionKey;
    this.externalId = input.openLibraryEditionKey || input.externalId;
    //Expanded fields
    this.descriptions = input.description;
    this.firstSentence = input.firstSentence;
    this.medianPages = input.medianPages;
    this.subjects = input.subjects?.slice(0, 5);

    //Run cleaner functions
    this.clean();
  }

  externalDataToSave() {
    return {
      authors: this.authors,
      firstPublishYear: this.firstPublishYear,
      medianPages: this.medianPages,
      descriptions: this.descriptions,
      firstSentence: this.firstSentence,
      subjects: this.subjects
    };
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
    return `book/cover/${this.externalId}-${size}.jpg`;
  }
  getCoverUrl(size = "M") {
    return this.infoClient.getCoverUrl(this.externalId, size);
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

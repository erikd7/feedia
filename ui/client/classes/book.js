import OpenlibraryClient from "./open-library";

export default class Book {
  constructor({ title, authors, firstPublishYear, openLibraryEditionKey }) {
    this.title = title;
    this.authors = authors;
    this.firstPublishYear = firstPublishYear;
    this.openLibraryEditionKey = openLibraryEditionKey;
  }

  //Add additional info to existing
  async addInfoResultsPage() {
    const result = await OpenlibraryClient.getResultsPageInfo(
      this.openLibraryEditionKey
    );
    return "";
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

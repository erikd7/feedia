import { getYearFromDate } from "../format/date";

export const httpToItems = httpResponse => httpResponse.data.items;

export const httpToSearchDropdown = book => ({
  title: book.volumeInfo.title,
  authors: book.volumeInfo.authors,
  publishedYear: getYearFromDate(book.volumeInfo.publishedDate)
});

const getAuthorsString = authorsArray => authorsArray?.slice(0, 2).join(", ");
const arrayToString = array => array?.join(", ");

export const resultToSearchLabel = book =>
  `${book.title}${book.authors ? ` - ${book.authors}` : ""}`;

export const resultsToDataView = book => ({
  title: book.volumeInfo.title,
  authors: getAuthorsString(book.volumeInfo.authors),
  publishedYear: getYearFromDate(book.volumeInfo.publishedDate),
  genres: arrayToString(book.volumeInfo.categories)
});

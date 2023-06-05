import { get } from "../util/http";
import { TwoWayMap } from "../util/mapping/mapping";
import { getYearFromDate } from "../util/format/date";
import Movie from "./Movie";

export class TMDB {
  constructor() {
    this.baseUrl = "https://api.themoviedb.org/3";

    this.fieldMap = TwoWayMap.build({
      tmdbId: "id",
      title: "title",
      year: "release_date",
      description: "overview",
      posterPath: "poster_path"
    });
    this.fieldTransformer = {
      year: releaseDate => getYearFromDate(releaseDate)
    };
  }

  //Search component
  static async search(queryString) {
    //Map input fields to OpenLibrary fields
    const params = {
      query: queryString
    };
    //Make the request
    const books = this.destructureResponseData(
      await get(this.baseUrl + "/search/movie", params)
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
    return response.data.results;
  }

  //Mappers
  getLocalFields(externalFields) {
    return externalFields.map(i => this.fieldMap.revGet(i) || i);
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
  instantiateMovieClass(movieObject) {
    return new Movie(movieObject);
  }
}

const tmdb = new TMDB();

export default tmdb;

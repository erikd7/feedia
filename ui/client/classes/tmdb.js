import { get } from "../util/http";
import { TwoWayMap } from "../util/mapping/mapping";
import { getYearFromDate } from "../util/format/date";
import Movie from "./Movie";
import config from "../config/build";

export class TMDB {
  constructor() {
    this.baseUrl = "https://api.themoviedb.org";
    this.imageBaseUrl = "https://image.tmdb.org";
    this.defaultImageWidth = "w185"; //https://www.themoviedb.org/talk/5aeaaf56c3a3682ddf0010de
    this.redirectUrl = this.redirectUrl = config.api.redirect
      ? config.api.redirectTo + "/tmdb"
      : null;
    this.versionPath = "/3";
    this.imageVersionPath = "/t/p";
    this.searchPath = "/search/movie";
    this.detailsPath = "/movie";

    this.fieldMap = TwoWayMap.build({
      tmdbId: "id",
      title: "title",
      year: "release_date",
      description: "overview",
      posterPath: "poster_path",
      genres: "genres",
      runtime: "runtime",
      status: "status"
    });
    this.fieldTransformer = {
      year: releaseDate => getYearFromDate(releaseDate),
      genres: genres => genres.map(g => g.name)
    };
  }

  url() {
    return (this.redirectUrl || this.baseUrl) + this.versionPath;
  }
  imageUrl() {
    return this.imageBaseUrl + this.imageVersionPath;
  }

  //Search component
  async search(queryString, resultsLimit) {
    //Map input fields to OpenLibrary fields
    const params = {
      query: queryString
    };
    //Make the request
    const movies = this.destructureResponseData(
      await get(this.url() + this.searchPath, params)
    );

    //Map TMDB fields back to our fields and create a class instance
    const formattedMovies = movies.map(b =>
      this.instantiateMovieClass(this.convertObjectToLocal(b))
    );

    return formattedMovies.slice(0, resultsLimit);
  }

  //Get details
  async getDetails(tmdbId) {
    //Map input fields to OpenLibrary fields
    const pathParams = [tmdbId];
    //Make the request
    const result = await get(this.url() + this.detailsPath, null, pathParams);
    const details = result.data;

    //Map TMDB fields back to our fields and create a class instance
    const formattedDetails = this.convertObjectToLocal(details);

    return formattedDetails;
  }

  //Get movie poster
  getPosterUrl(posterPath, width = this.defaultImageWidth) {
    return `${this.imageUrl()}/${width}${posterPath}`;
  }
  getPosterName(posterPath, width = this.defaultImageWidth) {
    return `movie/poster/${width}${posterPath}`;
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
  instantiateMovieClass(movieObject) {
    const dataLevel = "search";
    return new Movie(movieObject, dataLevel);
  }
}

const tmdb = new TMDB();

export default tmdb;

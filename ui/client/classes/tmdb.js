import { get } from "../util/http";
import {
  TwoWayMap,
  getNestedProperty,
  findFirstNOccurrences
} from "../util/mapping/mapping";
import { getYearFromDate } from "../util/format/date";
import Movie from "./Movie";
import config from "../config/build";

export class TMDB {
  constructor() {
    //Setup
    //URLs
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

    //Constants
    this.ENTITIES = { DETAILS: "details", CREDITS: "credits" };

    //Config
    this.maxDirectors = 1;

    //Mapping
    this.fieldMap = TwoWayMap.build(
      {
        tmdbId: { key: "id" },
        title: { key: "title" },
        year: {
          key: "release_date",
          transform: releaseDate => getYearFromDate(releaseDate)
        },
        description: { key: "overview" },
        tagline: { key: "tagline" },
        posterPath: { key: "poster_path" },
        genres: {
          key: "genres",
          transform: genres => genres.map(g => g.name)
        },
        runtime: { key: "runtime" },
        status: { key: "status" },
        directors: {
          key: "credits.crew",
          transform: crew => {
            const directorInfoArray = findFirstNOccurrences(
              crew,
              crewMember => crewMember.job === "Director",
              this.maxDirectors
            );
            if (directorInfoArray)
              return directorInfoArray.map(directorInfo => ({
                name: directorInfo.name,
                tmdbId: directorInfo.id
              }));

            return {};
          }
        }
      },
      "key"
    );
  }

  //https://developer.themoviedb.org/docs/append-to-response
  appendTo(entities) {
    return { append_to_response: entities.join(",") };
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

    return formattedMovies.slice(0, resultsLimit); //TMDB can't do this server-side
  }

  //Get details
  async getDetails(tmdbId, includeCredits = false) {
    //Map input fields to OpenLibrary fields
    const pathParams = [tmdbId];
    let queryParams = {};
    if (includeCredits) {
      queryParams = this.appendTo([this.ENTITIES.CREDITS]);
    }
    //Make the request
    const result = await get(
      this.url() + this.detailsPath,
      queryParams,
      pathParams
    );
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
    return Object.entries(this.fieldMap.map).reduce(
      (agg, [newKey, { key: oldKey, transform }]) => {
        const value = getNestedProperty(openLibraryObject, oldKey);
        if (newKey && typeof value !== "undefined") {
          let transformedValue = value;
          if (transform) {
            transformedValue = transform(value);
          }
          agg[newKey] = transformedValue;
        }

        return agg;
      },
      {}
    );
  }
  instantiateMovieClass(movieObject) {
    const dataLevel = "search";
    return new Movie(movieObject, dataLevel);
  }
}

const tmdb = new TMDB();

export default tmdb;

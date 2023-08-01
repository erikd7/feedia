import TMDBClient from "./tmdb";
import { MEDIA_TYPES } from "../util/constants/base";
import { getHoursAndMinutesFromMinutes } from "../util/format/time";

export default class Movie {
  constructor(input, dataLevel) {
    //ID
    this.tmdbId = input.tmdbId;

    this.mediaType = MEDIA_TYPES.MOVIE;

    this.dataLevel = dataLevel; //denotes the data we've retrieved for incremental fetching

    //Limited fields
    this.title = input.title;
    this.year = input.year;
    this.description = input.description;

    //Expanded fields
    this.genres = input.genres;
    this.posterPath = input.posterPath;
    this.status = input.status;
    this.runtime = input.runtime;
  }

  //Retrieve data
  getDetails() {
    return TMDBClient.getDetails(this.tmdbId);
  }

  async addDetails() {
    const details = await this.getDetails();
    this.addInfo(details);
    this.dataLevel = "details";
  }

  addInfo(newInfo) {
    Object.entries(newInfo).forEach(([key, value]) => {
      if (typeof this[key] === "undefined") {
        this[key] = value;
      }
    });
  }

  getPosterUrl(width) {
    return TMDBClient.getPosterUrl(this.posterPath, width);
  }
  getPosterName(width) {
    return TMDBClient.getPosterName(this.posterPath, width);
  }

  routeId() {
    return this.title; //eventually this will be an internal ID
  }

  //Display info
  displayTitle() {
    return this.title;
  }
  displayYear() {
    return this.year;
  }
  displayDescription() {
    return this.description;
  }
  displayRuntime() {
    return getHoursAndMinutesFromMinutes(this.runtime);
  }

  getLabel() {
    return `${this.displayTitle()}`;
  }
  toString() {
    return `${this.displayTitle()}`;
  }
}

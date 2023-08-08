import TMDBClient from "./tmdb";
import { MEDIA_TYPES } from "../util/constants/base";
import { getHoursAndMinutesFromMinutes } from "../util/format/time";
import { levels as fieldLevels } from "../util/constants/fields";

export default class Movie {
  constructor(input, dataLevel) {
    //Info client
    this.infoClient = TMDBClient;

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
    this.tagline = input.tagline;
    this.directors = input.directors;
  }

  //Retrieve data
  getDetails(includeCredits = true) {
    return this.infoClient.getDetails(this.tmdbId, includeCredits);
  }

  async addDetails(includeCredits = true) {
    //If details have not yet been retrieved
    if (
      !this.dataLevel ||
      fieldLevels.indexOf(this.dataLevel) < fieldLevels.indexOf("details")
    ) {
      const details = await this.getDetails(includeCredits);
      this.addInfo(details);
      this.dataLevel = "details";
    }
  }

  addInfo(newInfo) {
    Object.entries(newInfo).forEach(([key, value]) => {
      if (typeof this[key] === "undefined") {
        this[key] = value;
      }
    });
  }

  getPosterUrl(width) {
    return this.infoClient.getPosterUrl(this.posterPath, width);
  }
  getPosterName(width) {
    return this.infoClient.getPosterName(this.posterPath, width);
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
  displayDirectors() {
    return this.directors?.map(d => d.name)?.join(", ");
  }
  displayDescription() {
    return this.description;
  }
  displayTagline() {
    return this.tagline;
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

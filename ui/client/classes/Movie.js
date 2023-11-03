import TMDBClient from "./tmdb";
import { MEDIA_TYPES } from "../util/constants/base";
import { getHoursAndMinutesFromMinutes } from "../util/format/time";
import { levels as fieldLevels } from "../util/constants/fields";
import Title from "./Title";

export default class Movie extends Title {
  constructor(input, dataLevel, options) {
    super(input, dataLevel, options);

    //Info client
    this.infoClient = TMDBClient;

    //ID
    this.tmdbId = input.tmdbId;
    this.externalId = this.tmdbId;

    this.mediaType = MEDIA_TYPES.MOVIE;

    //Limited fields
    this.title = input.title;
    this.year = input.year;
    this.description = input.description;

    //Expanded fields
    this.genres = input.genres;
    this.posterPath = input.meta?.imagePath || input.posterPath;
    this.status = input.status;
    this.runtime = input.runtime;
    this.tagline = input.tagline;
    this.directors = input.directors;
  }

  //Build from ID
  static async build(_id) {
    //Assuming we want our IDs to be different from external IDs, we first need the backend to do this
  }

  //Retrieve data
  getExternalDetails(includeCredits = true) {
    return this.infoClient.getDetails(this.externalId, includeCredits);
  }

  externalDataToSave() {
    return {
      year: this.year,
      firstPublishYear: this.firstPublishYear,
      runtime: this.runtime,
      description: this.description,
      tagline: this.tagline,
      genres: this.genres,
      directors: this.directors
    };
  }

  async addDetails(includeCredits = true) {
    //If details have not yet been retrieved
    if (
      !this.dataLevel ||
      fieldLevels.indexOf(this.dataLevel) < fieldLevels.indexOf("details")
    ) {
      const details = await this.getExternalDetails(includeCredits);
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

  imagePath() {
    return this.posterPath;
  }

  getPosterUrl(width) {
    return this.infoClient.getPosterUrl(this.posterPath, width);
  }
  getPosterName(width) {
    return this.infoClient.getPosterName(this.posterPath, width);
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

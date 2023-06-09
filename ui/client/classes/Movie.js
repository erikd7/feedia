import OpenlibraryClient from "./open-library";
import { MEDIA_TYPES } from "../util/constants/base";

export default class Movie {
  constructor(input) {
    this.mediaType = MEDIA_TYPES.MOVIE;

    //Limited fields
    this.title = input.title;
    this.year = input.year;

    //Expanded fields
    this.description = input.description;
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

  getLabel() {
    return `${this.displayTitle()}`;
  }
  toString() {
    return `${this.displayTitle()}`;
  }
}

import {
  loadTitleByExternalId,
  getRatingInfo,
  setUserTitleRating,
  getTitleInfo
} from "../http-clients/title";
import { addTitleToList } from "../http-clients/list";

export default class Title {
  isValidTitle;
  id;
  loading;

  constructor(params, dataLevel, isLoading = false) {
    //Core properties
    this.id = params.id;

    //Rating properties
    this.rating = params.rating;
    this.ratings = params.ratings;
    this.userRating = params.userRating;

    //State properties
    this.isValidTitle = true;
    this.loading = isLoading;
    this.dataLevel = dataLevel; //denotes the data we've retrieved for incremental fetching
  }

  routeId() {
    return this.id || this.title;
  }

  //Retrieve data from scratch for empty object
  async loadDetails() {
    await this.getTitleInfo(); //Get base info, required for some subsequent calls
    await Promise.all([
      this.getRatingInfo(),
      this.getExternalDetails() //An external ID is required (must follow getTitleInfo)
    ]);

    this.loading = false;
  }

  //Internal data retrieval
  async getTitleInfo() {
    if (this.id) {
      const result = await getTitleInfo(this.id);

      this.title = result.title;
      this.dataSource = result.dataSource;
      this.externalId = result.externalId;
    } else {
      //If no ID, load by external
      this.loadTitleByExternalId();
    }
  }

  imagePath() {
    return ""; //Empty string indicates that imagePath can be built without special identifier (e.g. uses externalId)
  }

  async loadTitleByExternalId() {
    if (!this.id) {
      const result = await loadTitleByExternalId(
        this.infoClient.dataSourceKey,
        this.externalId,
        this.mediaType,
        this.title,
        { imagePath: this.imagePath() }
      );

      this.id = result.titleId;
    }
  }

  parseRatingInfo(ratingInfo) {
    this.rating = ratingInfo.rating;
    this.ratings = ratingInfo.ratings;
    this.userRating = ratingInfo.userRating;
  }

  async getRatingInfo() {
    if (this.id) {
      const result = await getRatingInfo(this.id);
      if (result) {
        this.parseRatingInfo(result);
      }
    }
  }

  async setRating(rating) {
    const result = await setUserTitleRating(this.id, rating);
    if (result) {
      this.parseRatingInfo(result);
    }
  }

  //External data retrieval
  getExternalDetails() {
    if (this.externalId) {
      return this.infoClient.getDetails(this.externalId);
    }
  }

  //Actions
  addToList(listId) {
    return addTitleToList(listId, this.id);
  }

  //Display info
  displayRating() {
    return this.rating;
  }
  displayUserRating() {
    return this.userRating;
  }
  displayRatings() {
    return this.ratings;
  }
}

import {
  loadTitleByExternalId,
  getRatingInfo,
  setUserTitleRating,
  getTitleInfo
} from "../http-clients/title";

export default class Title {
  isValidTitle;
  id;
  loading;

  constructor(params, dataLevel, isLoading = false) {
    //Core properties
    this.id = params.id;

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
    await Promise.all([
      this.getTitleInfo(),
      this.getRatingInfo(),
      this.getExternalDetails()
    ]);

    this.loading = false;
  }

  async getTitleInfo() {
    if (this.id) {
      const result = await getTitleInfo(this.id);

      this.title = result.title;
      this.dataSource = result.dataSource;
      this.externalId = result.externalId;
    }
  }

  async loadTitleByExternalId() {
    if (!this.id) {
      const result = await loadTitleByExternalId(
        this.infoClient.dataSourceKey,
        this.externalId,
        this.mediaType,
        this.displayTitle()
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

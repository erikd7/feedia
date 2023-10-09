import {
  loadTitleByExternalId,
  getRatingInfo,
  setUserTitleRating
} from "../http-clients/title";

export default class Title {
  constructor() {}
  //Internal data retrieval
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
}

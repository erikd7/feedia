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

  async getRatingInfo() {
    if (this.id) {
      const result = await getRatingInfo(this.id);
      if (result) {
        this.rating = result.rating;
        this.ratings = result.ratings;
        this.userRating = result.userRating;
      }
    }
  }

  async setRating(rating) {
    await setUserTitleRating(this.id, rating);
    this.rating = rating;
  }
}

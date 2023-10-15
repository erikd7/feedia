import { MEDIA_TYPES } from "../util/constants/base";
import Book from "./Book";
import Movie from "./Movie";

//Use to create titles with dynamic media type
export const create = (mediaType, params, isLoading) => {
  const title = (() => {
    switch (mediaType?.toUpperCase()) {
      case MEDIA_TYPES.BOOK:
        return new Book(params, null, { isLoading });
      case MEDIA_TYPES.MOVIE:
        return new Movie(params, null, { isLoading });
      default:
        throw new Error("Cannot create title for media type " + mediaType);
    }
  })();

  return title;
};

export const createAndLoadDetailsById = async (mediaType, id) => {
  const title = create(mediaType, { id }, true);

  await title.loadDetails();
  return title;
};

import {
  BookOpenIcon,
  FilmIcon,
  MusicalNoteIcon,
  TvIcon
} from "@heroicons/vue/24/solid";

export const APP_NAME = "Feedia";

export const MEDIA_TYPES = {
  BOOK: "BOOK",
  MOVIE: "MOVIE",
  TV: "TV",
  MUSIC: "MUSIC"
};

export const MEDIA_TYPE_DISPLAY = {
  BOOK: { name: "Books", icon: BookOpenIcon },
  MOVIE: { name: "Movies", icon: FilmIcon },
  TV: { name: "TV Shows", icon: TvIcon },
  MUSIC: { name: "Music", icon: MusicalNoteIcon }
};

export const getSearchTerms = mediaTypes => {
  return `Search ${mediaTypes
    .map(mt => MEDIA_TYPE_DISPLAY[mt].name)
    .join(", ")}...`;
};

export const RATING_MAX = 10;

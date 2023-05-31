import {
  BookOpenIcon,
  FilmIcon,
  MusicalNoteIcon,
  TvIcon
} from "@heroicons/vue/24/solid";

export const MEDIA_TYPES = {
  BOOK: "book",
  MOVIE: "movie"
};

export const MEDIA_TYPE_DISPLAY = {
  BOOK: { name: "Books", icon: BookOpenIcon },
  MOVIE: { name: "Movies", icon: FilmIcon },
  TV: { name: "TV Shows", icon: TvIcon },
  MUSIC: { name: "Music", icon: MusicalNoteIcon }
};

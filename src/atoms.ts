import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

////

export const movieId = atom({
  key: "movieID",
  default: -1,
});

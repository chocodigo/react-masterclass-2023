import { atom } from "recoil";

export const isDarkAtom = atom({
  key: "isDark",
  default: false,
});

// ---- pomodoro

export const round = atom({
  key: "round",
  default: 0,
});

export const goal = atom({
  key: "goal",
  default: 0,
});

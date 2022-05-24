import { defineStore } from "pinia";

export const useContext = defineStore({
  id: "characterData",
  state: () => ({
    characterSheetURL: "",
    characterName: "",
    showStats: false,
  }),
});

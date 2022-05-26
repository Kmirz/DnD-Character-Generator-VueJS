import { defineStore } from "pinia";

export const useContext = defineStore({
  id: "characterData",
  state: () => ({
    characterSheetURL: "",
    characterName: "",
    characterRace: "Human",
    showStats: false,
    className: "Barbarian",
    characterSelected: 0,
    imageReference: "./dnd-icons/Barbarian.PNG",
    selectedCharacterName: "Barbarian",
    statValues: [],
    showStats: false,
    proficiencyList: [],
  }),
});

<template>
  <div class="classSelectorWrapper">
    <div class="classSelector d-flex justify-content-center align-items-center">
      <button @click="clickLeft" class="nes nes-btn is-error selection-button">
        <span
          class="material-icons-round material-icons"
          style="font-size: 30px"
        >
          arrow_left
        </span>
      </button>
      <img :src="imageReference" alt="" />
      <button @click="clickRight" class="nes nes-btn is-error selection-button">
        <span
          class="material-icons-round material-icons"
          style="font-size: 30px"
        >
          arrow_right
        </span>
      </button>
    </div>

    <p style="text-align: center" class="characterClass">
      You have chosen a
      <span style="color: red"> {{ selectedCharacterName }}!</span>
    </p>
  </div>
</template>

<script>
import { ref } from "vue";

import { useContext } from "../stores/characterData";
import { storeToRefs } from "pinia";

export default {
  name: "ClassSelector",
  emits: ["classSelected"],
  setup(props, context) {
    const storeData = useContext();
    const {
      characterSelected,
      imageReference,
      selectedCharacterName,
      showStats,
    } = storeToRefs(storeData);

    const characterReferences = [
      {
        name: "Barbarian",
        image: "./dnd-icons/Barbarian.PNG",
        numProfficiences: 2,
      },
      {
        name: "Bard",
        image: "./dnd-icons/Bard.PNG",
        numProfficiences: 4,
      },
    ];

    function clickRight() {
      // console.log("right button clicked");
      if (characterSelected.value === characterReferences.length - 1) {
        characterSelected.value = 0;
      } else {
        characterSelected.value++;
      }

      imageReference.value = characterReferences[characterSelected.value].image;
      selectedCharacterName.value =
        characterReferences[characterSelected.value].name;
      context.emit(
        "classSelected",
        characterReferences[characterSelected.value]
      );

      showStats.value = false;
    }

    function clickLeft() {
      // console.log("left button clicked");

      if (characterSelected.value === 0) {
        characterSelected.value = characterReferences.length - 1;
      } else {
        characterSelected.value--;
      }

      imageReference.value = characterReferences[characterSelected.value].image;
      selectedCharacterName.value =
        characterReferences[characterSelected.value].name;
      context.emit(
        "classSelected",
        characterReferences[characterSelected.value]
      );
      showStats.value = false;
    }

    // expose to template and other options API hooks
    return {
      imageReference,
      clickRight,
      clickLeft,
      selectedCharacterName,
      characterSelected,
    };
  },
};
</script>

<style scoped>
.nes {
  border-image-repeat: unset;
}

.classSelector {
  align-content: center;
}

.selection-button {
  height: 50px;
}

img {
  height: 250px;
  width: 180px;
}
</style>
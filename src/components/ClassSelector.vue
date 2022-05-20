<template>
  <div class="classSelector d-flex justify-content-center align-items-center">
    <button @click="clickLeft" class="nes nes-btn is-error selection-button">
      <span class="material-icons-round material-icons" style="font-size: 30px">
        arrow_left
      </span>
    </button>
    <img :src="imageReference" alt="" />
    <button @click="clickRight" class="nes nes-btn is-error selection-button">
      <span class="material-icons-round material-icons" style="font-size: 30px">
        arrow_right
      </span>
    </button>
  </div>

  <p style="text-align: center" class="characterClass">
    You have chosen a
    <span style="color: red"> {{ selectedCharacterName }}!</span>
  </p>
</template>

<script>
import { ref } from "vue";
export default {
  name: "ClassSelector",
  emits: ["classSelected"],
  setup(props, context) {
    const imageReference = ref("./dnd-icons/Barbarian.PNG");
    let characterSelected = 0;
    const selectedCharacterName = ref("Barbarian");

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
      if (characterSelected === characterReferences.length - 1) {
        characterSelected = 0;
      } else {
        characterSelected++;
      }

      imageReference.value = characterReferences[characterSelected].image;
      selectedCharacterName.value = characterReferences[characterSelected].name;
      context.emit("classSelected", characterReferences[characterSelected]);
    }

    function clickLeft() {
      // console.log("left button clicked");

      if (characterSelected === 0) {
        characterSelected = characterReferences.length - 1;
      } else {
        characterSelected--;
      }

      imageReference.value = characterReferences[characterSelected].image;
      selectedCharacterName.value = characterReferences[characterSelected].name;
      context.emit("classSelected", characterReferences[characterSelected]);
    }

    // expose to template and other options API hooks
    return {
      imageReference,
      clickRight,
      clickLeft,
      selectedCharacterName,
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
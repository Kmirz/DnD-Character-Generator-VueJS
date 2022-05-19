<template>
  <div class="container">
    <h1>DnD Character Generator!</h1>
    <h2 style="padding: 10px">Choose your class and see what you get</h2>
    <dialog class="nes-dialog" id="dialog-default">
      <form method="dialog">
        <p class="title">{{ itemName }}</p>
        <p>{{ itemContents }}</p>
        <menu class="dialog-menu">
          <button class="nes nes-btn is-primary">cool!</button>
        </menu>
      </form>
    </dialog>
    <div class="nes nes-container is-rounded">
      <div
        class="classSelector d-flex justify-content-center align-items-center"
      >
        <button
          @click="clickLeft"
          class="nes nes-btn is-error selection-button"
        >
          <span
            class="material-icons-round material-icons"
            style="font-size: 30px"
          >
            arrow_left
          </span>
        </button>
        <img :src="imageReference" alt="" />
        <button
          @click="clickRight"
          class="nes nes-btn is-error selection-button"
        >
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
      <p>
        <label for="nestextarea_field" class="nes">Your cool hero name: </label>
        <textarea
          id="textarea_field"
          class="nes nes-textarea heroName"
        ></textarea>
      </p>
      <label for="Proficiencies"> Proficiencies </label>
      <div class="nes text-container nes-container is-rounded">
        <ul>
          <li v-for="proficiency in proficiencyList" :key="proficiency">
            <ListContent @showModal="updateModal" :itemName="proficiency" />
          </li>
        </ul>
      </div>
      <div class="d-flex justify-content-center mt-5">
        <button @click="rollStats" class="nes nes-btn">ROLL</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import ListContent from "./ListContent.vue";
export default {
  name: "CharacterModule",
  components: { ListContent },
  setup() {
    const imageReference = ref("./dnd-icons/Barbarian.PNG");
    let characterSelected = 0;
    const selectedCharacterName = ref("");

    const proficiencyList = ref(["medium-armor", "bagpipes"]);

    const itemName = ref("No Data");
    const itemContents = ref("No Data");

    const characterReferences = [
      {
        name: "Barbarian",
        image: "./dnd-icons/Barbarian.PNG",
      },
      {
        name: "Bard",
        image: "./dnd-icons/Bard.PNG",
      },
    ];

    function clickRight() {
      console.log("right button clicked");
      if (characterSelected === characterReferences.length - 1) {
        characterSelected = 0;
      } else {
        characterSelected++;
      }

      imageReference.value = characterReferences[characterSelected].image;
      selectedCharacterName.value = characterReferences[characterSelected].name;
    }

    function clickLeft() {
      console.log("left button clicked");

      if (characterSelected === 0) {
        characterSelected = characterReferences.length - 1;
      } else {
        characterSelected--;
      }

      imageReference.value = characterReferences[characterSelected].image;
      selectedCharacterName.value = characterReferences[characterSelected].name;
    }

    function rollStats() {
      console.log("clicked");
    }

    function updateModal(itemNameModal, contents) {
      itemName.value = itemNameModal;
      itemContents.value = contents;
    }
    // expose to template and other options API hooks
    return {
      imageReference,
      clickRight,
      clickLeft,
      selectedCharacterName,
      rollStats,
      proficiencyList,
      itemContents,
      itemName,
      updateModal,
    };
  },
};
</script>

<style scoped>
ul {
  position: relative;
  list-style: none;
  margin-left: 0;
  padding-left: 1.2em;
}
ul li:before {
  content: "-";
  position: absolute;
  left: 0;
}

.text-container {
  max-height: 150px;
  overflow-y: auto;
}
.heroName {
  height: 50px;
}
.classDescription {
  vertical-align: middle;
}
.classSelector {
  align-content: center;
}

.selection-button {
  height: 50px;
}

.characterClass.span {
  font-family: "Press Start 2P", cursive;
}

img {
  height: 250px;
  width: 180px;
}

.nes {
  border-image-repeat: unset;
  font-family: "Press Start 2P", cursive;
}

.nes-textarea {
  /* height: 500px; */
  max-height: 200px;
}

h1,
h2 {
  border-image-repeat: unset;
  font-family: "Press Start 2P", cursive;
  flex: 100%;
  text-align: center;
}

h2 {
  font-size: 15px;
}

.nes-dialog {
  margin: auto;
}
</style>
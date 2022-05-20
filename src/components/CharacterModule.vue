<template>
  <Modal :itemContents="itemContents" :itemName="itemName" />
  <div class="container">
    <h1>DnD Character Generator!</h1>
    <h2 style="padding: 10px">Choose your class and see what you get</h2>

    <div class="nes nes-container is-rounded">
      <ClassSelector @classSelected="setClass" />
      <p>
        <label for="nestextarea_field" class="nes">Your cool hero name: </label>
        <textarea
          id="textarea_field"
          class="nes nes-textarea heroName"
        ></textarea>
      </p>

      <StatBoxes :statValues="statValues" />

      <ProficienciesList
        :numProfficiences="numProfficiences"
        :className="className"
        @showModal="updateModal"
      />
      <div class="d-flex justify-content-center mt-5">
        <button @click="rollStats" class="nes nes-btn">ROLL</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import Modal from "./Modal.vue";
import ClassSelector from "./ClassSelector.vue";
import ProficienciesList from "./ProficienciesList.vue";
import StatBoxes from "./StatBoxes.vue";

export default {
  name: "CharacterModule",
  components: { Modal, ClassSelector, ProficienciesList, StatBoxes },
  setup() {
    const className = ref("No Data");
    const itemContents = ref("No Data");

    const itemName = ref("No Data");

    const numProfficiences = ref(2);

    const statValues = ref([]);

    function rollStats() {
      // console.log("clicked");
      statValues.value = generateStats();
    }

    function generateStats() {
      let statValues = [];

      for (let i = 0; i < 6; i++) {
        statValues.push(Math.floor(Math.random() * 5));
      }

      return statValues;
    }

    function updateModal(itemInfo) {
      // console.log(itemInfo);
      itemName.value = itemInfo.itemName;
      itemContents.value = itemInfo.contents
        ? itemInfo.contents
        : "No Description Available";
    }

    function setClass(classDetails) {
      className.value = classDetails.name;
      numProfficiences.value = classDetails.numProfficiences;
      // console.log(className);
    }

    // expose to template and other options API hooks
    return {
      rollStats,
      itemContents,
      className,
      updateModal,
      setClass,
      numProfficiences,
      itemName,
      statValues,
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

.nes {
  border-image-repeat: unset;
}

h1,
h2 {
  text-align: center;
}

h2 {
  font-size: 15px;
}

.heroName {
  height: 50px;
}
</style>
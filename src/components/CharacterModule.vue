<template>
  <Modal :itemContents="itemContents" :itemName="itemName" />

  <div class="container py-3">
    <h1>DnD Character Generator!</h1>
    <h2 class="subheader" style="padding: 10px">
      Choose your class and see what you get
    </h2>

    <div class="nes nes-container is-rounded">
      <div class="row">
        <ClassSelector class="col-md-6" @classSelected="setClass" />
        <div class="inputWrapper col-md-6 my-auto">
          <p>
            <label for="nestextarea_field" class="nes"
              >Your cool hero name:
            </label>
            <textarea
              id="textarea_field"
              v-model="characterName"
              class="nes nes-textarea heroName"
            ></textarea>
          </p>

          <label for="default_select">Select your race: </label>
          <div class="nes nes-select mb-5">
            <select
              v-model="characterRace"
              required
              id="default_select"
              class="nes"
            >
              <option value="Elf">Elf</option>
              <option value="Human">Human</option>
            </select>
          </div>
        </div>
      </div>

      <ProficienciesList
        class="proficiencies"
        :numProfficiences="numProfficiences"
        :className="className"
        @showModal="updateModal"
        ref="proficienciesID"
      />
      <div class="d-flex justify-content-center mt-5">
        <button
          v-if="!showStats"
          @click="rollStats"
          class="nes nes-btn is-primary"
        >
          ROLL STATS!
        </button>
        <button
          v-if="showStats"
          @click="rollStats"
          class="nes nes-btn is-success"
        >
          RE-ROLL STATS!
        </button>
      </div>

      <div v-if="showStats" id="statBoxesWrapper">
        <StatBoxes
          id="statBoxes"
          class="d-flex my-5 justify-content-center"
          :statValues="statValues"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick, toRaw } from "vue";

import { useContext } from "../stores/characterData";
import { storeToRefs } from "pinia";

import Modal from "./Modal.vue";
import ClassSelector from "./ClassSelector.vue";
import ProficienciesList from "./ProficienciesList.vue";
import StatBoxes from "./StatBoxes.vue";

export default {
  name: "CharacterModule",
  components: { Modal, ClassSelector, ProficienciesList, StatBoxes },
  setup() {
    // const characterName = ref("");

    // const characterRace = ref("");

    const storeData = useContext();
    const {
      characterName,
      characterRace,
      characterSheetURL,
      className,
      statValues,
      showStats,
      proficiencyList,
    } = storeToRefs(storeData);

    onMounted(() => {
      let sampleNames = [
        "Jerimiah Jones",
        "Ashleigh The DoomBringer",
        "Juliet 'The Destroyer' Thompson",
        "Jamie 'Starwalker' Picard",
        "Katy 'The Captain' Janeway",
      ];

      if (!characterName.value) {
        characterName.value =
          sampleNames[Math.floor(Math.random() * sampleNames.length)];
      }
    });

    const itemContents = ref("No Data");

    const itemName = ref("No Data");

    const numProfficiences = ref(2);

    let prevCharacterURL = "";

    const proficienciesID = ref();

    async function rollStats() {
      // console.log("clicked");
      let timesRun = 0;

      //generates proficiency list via proficiencyList component method
      proficienciesID.value.generateProfficienciesList(
        numProfficiences.value,
        className.value
      );

      showStats.value = true;

      //waits for the dom to update to show animation
      await nextTick();

      let elmnt = document.querySelector("#statBoxesWrapper");
      elmnt.scrollIntoView(true);

      let animateRoll = setInterval(() => {
        generateStats();
        timesRun++;
        if (timesRun === 45) {
          clearInterval(animateRoll);
        }
      }, 10);

      //Pause the data sent to API until after the 'rolling' occurs, due to the animation being done via set interval
      setTimeout(async () => {
        console.log("runners", characterRace.value);

        let data = {
          name: characterName.value,
          className: className.value,
          characterRace: characterRace.value,
          statValues: statValues.value,
          proficiencyList: proficiencyList.value,
        };

        let options = {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        };

        characterSheetURL.value = await fetch("api/getPDF", options)
          .then((r) => r.blob())
          .then(showFile);
      }, 460);

      function generateStats() {
        let statValuesArray = [];

        for (let i = 0; i < 6; i++) {
          statValuesArray.push(Math.floor(Math.random() * 12 + 4));
        }

        // console.log(statValuesArray);

        statValues.value = statValuesArray;
      }

      function showFile(blob) {
        // It is necessary to create a new blob object with mime-type explicitly set
        // otherwise only Chrome works like it should
        var newBlob = new Blob([blob], { type: "application/pdf" });

        if (prevCharacterURL) {
          window.URL.revokeObjectURL(prevCharacterURL);
          console.log("Purging previous URL");
        }

        // For other browsers:
        // Create a link pointing to the ObjectURL containing the blob.
        const newURL = window.URL.createObjectURL(newBlob);

        console.log(newURL);

        prevCharacterURL = newURL;

        return newURL;
      }
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
      characterName,
      characterRace,
      showStats,
      characterSheetURL,
      proficienciesID,
    };
  },
};
</script>

<style scoped>
.nes-select::after {
  border-image-repeat: unset;
}

heroName ul {
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

.heroName {
  height: 100px;
}

/* @media (min-width: 768px) {
  .heroName {
    height: 100px;
  }
} */

@media (max-width: 768px) {
  .nes-container {
    font-size: 10px;
  }

  .row {
    margin-bottom: -28px;
  }

  .heroName {
    height: 75px;
  }
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

.subheader {
  font-size: 15px;
}
</style>
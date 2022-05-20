<template>
  <label for="Proficiencies"> Proficiencies </label>
  <div class="nes text-container nes-container is-rounded">
    <ul>
      <li v-for="proficiency in proficiencyList" :key="proficiency">
        <ListContent
          @showModal="$emit('showModal', $event)"
          :itemName="proficiency"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";
import ListContent from "./ListContent.vue";

export default {
  name: "ProficienciesList",
  props: { numProfficiences: Number, className: String },
  components: { ListContent },
  emits: ["showModal"],
  setup(props) {
    const proficiencyList = ref([
      "medium-armor",
      "bagpipes",
      "saving-throw-str",
      "shortswords",
    ]);

    watchEffect(() => {
      //   console.log(`name is: ` + props.numProfficiences);
      generateProfficienciesList(props.numProfficiences, props.className);
    });

    async function generateProfficienciesList(numProfficiences, className) {
      //Obtain content reference from API
      let initialURL =
        "https://www.dnd5eapi.co/api/classes/" +
        className.toLowerCase() +
        "/proficiencies/";

      //   console.log(initialURL);

      let proficiencyListFull = await fetch(initialURL)
        .then((res) => res.json())
        .catch((err) => console.log(err));

      //   console.log(proficiencyListFull);

      //Generate random selection of proficiencies

      proficiencyList.value = [];
      proficiencyListFull = proficiencyListFull.results;

      for (let i = numProfficiences; i--; i < 0) {
        let randomNumber = Math.floor(
          Math.random() * proficiencyListFull.length
        );

        console.log("random:", randomNumber);

        proficiencyList.value.push(proficiencyListFull[randomNumber].index);

        console.log("removed:", proficiencyListFull[randomNumber].index);

        proficiencyListFull.splice(randomNumber, 1);

        console.log("profs available", proficiencyListFull);

        console.log("num of profs:", i);
      }
    }
    return { proficiencyList };
  },
};
</script>

<style scoped>
.nes {
  border-image-repeat: unset;
}
</style>
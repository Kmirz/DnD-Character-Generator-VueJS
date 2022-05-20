<template>
  <div class="stats mx-auto">
    <Statbox :value="statValues[0]" :stat="'INT'" />
    <Statbox :value="statValues[1]" :stat="'STR'" />
    <Statbox :value="statValues[2]" :stat="'WIS'" />
    <Statbox :value="statValues[3]" :stat="'DEX'" />
    <Statbox :value="statValues[4]" :stat="'CON'" />
    <Statbox :value="statValues[5]" :stat="'CHA'" />
  </div>
</template>

<script>
import { ref } from "vue";

import Statbox from "./StatBox.vue";
export default {
  name: "StatBoxes",
  props: {
    statValues: {
      type: Array,
      default: [12, 3, 4, 15, 6, 7],
    },
  },
  components: { Statbox },
  setup() {
    return {};
  },
};
</script>

<style>
.stats {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 10px;
  max-width: 600px;
}
</style>
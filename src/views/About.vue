<template>
  <main class="about-page">
    <h1>See your character sheet below!</h1>
    <div class="dataDownload my-3">
      <button class="nes nes-btn is-primary">Download PDF</button>
    </div>

    <embed
      :src="characterSheetURL"
      title="W3Schools Free Online Web Tutorials"
      type="application/pdf"
    />
  </main>
</template>

<script>
import { useContext } from "../stores/characterData";
import { storeToRefs } from "pinia";
export default {
  name: "About",

  setup() {
    const characterData = useContext();
    const { characterSheetURL } = storeToRefs(characterData);

    return { characterSheetURL };
  },
};
</script>

<style scope>
embed {
  width: 85%;
  height: 70vh;
}

.nes {
  border-image-repeat: unset;
}
</style>
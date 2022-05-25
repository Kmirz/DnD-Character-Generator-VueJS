<template>
  <main class="about-page">
    <div class="container">
      <h1 class="my-2">See your character sheet below!</h1>
      <div class="dataDownload my-3">
        <button class="nes nes-btn is-primary" @click="downloadPDF">
          Download PDF
        </button>
      </div>

      <embed
        :src="characterSheetURL"
        title="W3Schools Free Online Web Tutorials"
        type="application/pdf"
      />
    </div>
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

    function downloadPDF() {
      const link = document.createElement("a");
      link.href = characterSheetURL.value;
      link.download = "file.pdf";
      link.click();
    }

    return { characterSheetURL, downloadPDF };
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
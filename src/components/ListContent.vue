<template>
  <div class="items">
    {{ itemName }}
    <button
      type="button"
      class="nes nes-btn is-success small-button"
      @click="generateModal(itemName)"
    ></button>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "ListContent",
  emits: ["showModal"],
  props: {
    itemName: String,
  },
  setup(props, context) {
    const contents = ref("No Description Available");
    const title = ref("No Info");
    const showModal = ref(true);
    // expose to template and other options API hooks

    async function generateModal(itemName) {
      //Obtain content reference from API
      let initialURL = "https://www.dnd5eapi.co/api/proficiencies/" + itemName;

      // console.log(initialURL);

      let referenceURL = "";
      const proficiencyReference = await fetch(initialURL)
        .then((res) => res.json())
        .then((res) => (referenceURL = res.reference.url))
        .catch((err) => console.log(err));

      //Obtain contents from API
      referenceURL = "https://www.dnd5eapi.co" + referenceURL;

      console.log(referenceURL);

      contents.value = await fetch(referenceURL)
        .then((res) => res.json())
        .then((res) => {
          let messageArray = [];

          if (res.desc && res.desc.length > 0) {
            messageArray.push(`Description: ${res.desc[0]}`);
          } else {
            messageArray.push("Description: No Description Available");
          }

          if (res.equipment) {
            messageArray.push(
              `Includes: ${res.equipment.map((e) => e.name).join(", ")}`
            );
          }

          return messageArray.join("\r\n\r\n");
        })
        .catch((err) => console.log(err));

      context.emit("showModal", {
        itemName: itemName,
        contents: contents.value,
      });

      document.getElementById("dialog-default").showModal();
    }

    return { contents, generateModal, title };
  },
};
</script>

<style scoped>
@media (max-width: 500px) {
  .items {
    font-size: 10px;
  }
}

.small-button {
  height: 10px;
  width: 10px;
  font-size: 10px;
  padding: 0px;
  margin-left: 10px;
}

.nes {
  border-image-repeat: unset;
}
</style>
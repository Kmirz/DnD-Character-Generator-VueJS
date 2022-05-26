<template>
  <dialog class="nes-dialog" id="dialog-default">
    <form method="dialog">
      <p class="title">{{ itemName }}</p>
      <p>{{ itemContents }}</p>
      <menu style="text-align: center" class="dialog-menu">
        <button class="nes nes-btn is-primary">cool!</button>
      </menu>
    </form>
  </dialog>
</template>

<script>
export default {
  name: "Modal",
  props: { itemName: String, itemContents: String },
};
</script>

<style scoped>
.nes {
  border-image-repeat: unset;
  font-family: "Press Start 2P", cursive;
}

.nes-dialog {
  margin: auto;
}

p {
  white-space: pre-wrap;
}
</style>
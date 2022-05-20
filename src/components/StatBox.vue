<template>
  <div class="nes nes-container with-title is-centered is-dark m-2 col-5">
    <p class="title">
      {{ stat }}
    </p>
    <p>{{ value }}</p>
  </div>
</template>

<script>
export default {
  name: "Statbox",
  props: { stat: String, value: Number },
};
</script>

<style scoped>
.nes {
  border-image-repeat: unset;
  max-width: 150px;
}
</style>
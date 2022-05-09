const app = Vue.createApp({
  template: "Hello {{name}} You are a {{heroClass}}",
  data() {
    return {
      name: "John",
      heroClass: "Cleric",
    };
  },
});

app.mount("#app");

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://qe-test.recrutamento.avantsoft.com.br/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

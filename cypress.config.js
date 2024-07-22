const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl:'https://qa.niural.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

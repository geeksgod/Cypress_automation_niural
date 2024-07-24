const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video:true,
  e2e: {
    baseUrl:'https://qa.niural.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env:{
    apiKey : "37d4b70a826d3dceecda79c299750c94daaef0dff33c1832fed2838e6883e673",
    email:"",
    inboxId:""
  }
});

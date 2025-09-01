const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'ok5pqh',
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    viewportWidth: 1366,                  
    viewportHeight: 768,
    // video: true,
    // screenshotOnRunFailure: true,
    // retries: {
    //   runMode: 2,
    //   openMode: 0,
    // },
    setupNodeEvents(on, config) {
      // lugar para plugins e outros ajustes
      return config;
    },
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: false,
    json: true
  }
});

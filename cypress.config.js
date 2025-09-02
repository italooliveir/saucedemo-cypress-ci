const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'ok5pqh',
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    viewportWidth: 1366,
    viewportHeight: 768,
    video: true,                       // grava vídeos
    screenshotOnRunFailure: true,      // captura screenshot em falha
    retries: {
      runMode: 2,                      // tentativas em modo headless
      openMode: 0,                     // sem retries em modo aberto
    },
    setupNodeEvents(on, config) {
      // aqui você pode adicionar plugins, eventos customizados etc.
      return config;
    },
  },
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",  // pasta para salvar relatórios
    overwrite: false,
    html: false,
    json: true
  }
});

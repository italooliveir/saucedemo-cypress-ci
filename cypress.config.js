const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'ok5pqh',
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    viewportWidth: 1366,                  
    viewportHeight: 768,
//   video: true,                          // grava vídeo da execução
//   screenshotOnRunFailure: true,         // tira screenshot se falhar
//    retries: {                            // tentativas automáticas
//      runMode: 2,                         // em modo cypress run
//      openMode: 0,                        // em modo cypress open
//    },
//    setupNodeEvents(on, config) {
      // lugar para plugins e reporters (futuramente Mochawesome/Allure)
//      return config;
//    },
  },
});

const {defineConfig} = require("cypress");

module.exports = defineConfig({
    pageLoadTimeout: 10000,
    chromeWebSecurity: false,
   
    env: {
        firstCookieValue: "firstValue",
    },

    e2e: {
        experimentalSessionAndOrigin: true,
        setupNodeEvents(on, config) {
            return config;
        }
    },
});

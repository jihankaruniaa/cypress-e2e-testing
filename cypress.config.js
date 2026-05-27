const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    viewportWidth: 1440,
    viewportHeight: 900,
  },
});

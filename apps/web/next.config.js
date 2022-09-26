const withTM = require("next-transpile-modules")(["ui", "common"]);

module.exports = withTM({
  reactStrictMode: true,
});

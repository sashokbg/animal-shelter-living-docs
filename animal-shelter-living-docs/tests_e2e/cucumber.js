const path = require('path');

const docsDirPath = path.resolve(__dirname, '../docs/features')

console.log('Path is', docsDirPath)

common = {
  // tags: "@automated",
  // tags: "@focus",
  format: [
    ["message", "report/gherkin_messages.ndjson"],
    "@cucumber/pretty-formatter",
    "progress-bar",
    ["html", "report/report.html"],
  ],
  requireModule: ["ts-node/register"],
  require: ["steps/**/*.ts", "helpers/**/*.ts"],
  paths: [
    `${docsDirPath}/**/*.md`,
  ],
};

module.exports = {
  default: {
    ...common,
    worldParameters: { ci: false },
  },
  ci: {
    ...common,
    worldParameters: { ci: true },
  },
  demo: {
    ...common,
    worldParameters: { ci: false, demo: true },
  },
};

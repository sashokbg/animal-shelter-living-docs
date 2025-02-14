common = {
  // tags: "@automated",
  tags: "@focus",
  format: [
    ["message", "report/gherkin_messages.ndjson"],
    "summary",
    "progress-bar",
    ["html", "report/report.html"],
  ],
  requireModule: ["ts-node/register"],
  require: ["steps/**/*.ts", "helpers/**/*.ts"],
  paths: [
    "../docs/docs/features/**/*.md",
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

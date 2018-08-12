"use strict";

const postcss = require("postcss");
const slashCSSPlugin = require("./src/slash");

module.exports = postcss.plugin("slashcss", slashCSSPlugin);

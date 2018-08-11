"use strict";

const postcss = require("postcss");
const slashCSS = require("./src/slashCSS");

module.exports = postcss.plugin("slashcss", slashCSS);

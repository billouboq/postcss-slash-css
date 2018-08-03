"use strict";

const slashCSS = require("../index");
const postcss = require("postcss");
const fs = require("fs");

const glob = require("fast-glob");

glob("./**/*.css").then(files => {
  console.log(files);
});

// plugin we will use in postcss
// const pluginsUsed = [
//   slashCSS({ targets: "./normal.critical.css" })
// ]

// fs.readFile('./normal.css', async (err, css) => {
//   const newCSS = postcss(pluginsUsed)
//     .process(css, { from: 'src/app.css', to: 'dest/app.css' })
//     fs.writeFile('dest/app.css', result.css, () => true)
// })

"use strict";

const glob = require("fast-glob");
const postcss = require("postcss");
const slashCSS = require("../../index");
const fs = require("fs");

const inputFilePath = "../assets/normal.css";
const targetFilePath = "../assets/*.critical.css";

// plugin we will use in postcss
const pluginsUsed = [
  slashCSS({ targets: targetFilePath })
];

// this will read normal.css content, pass it to postcss
// then this plugin will read all file with .critical.css at the end
// check for duplicates between normal.css and those files
// and return a new css content with those duplicates removed
// aftre that we create a new file called result.normal.css with the new css content
fs.readFile(inputFilePath, async (err, css) => {
    const result = await postcss(pluginsUsed).process(css, {from: inputFilePath});
    fs.writeFile('./result.normal.css', result.css, () => {
        console.log("check result in the 'result.normal.css' file");
    });
})

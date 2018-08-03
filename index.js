"use strict";

const fs = require("fs");
const util = require("util");
const postcss = require("postcss");
const glob = require("fast-glob");

const getFileContent = util.promisify(fs.readFile);

function slashCSSPlugin(opts = {}) {
  if (!opts || !opts.targets) {
    throw new Error(
      "This plugins needs an option object with a targets propertie"
    );
  }

  if (typeof opts.targets !== "string") {
    throw new Error("Targets option must be a string");
  }

  return async root => {
    try {
      // get all external targets files
      const cssFilesPath = await glob(opts.targets);
      const getFileContentPromises = cssFilesPath.map(filePath =>
        getFileContent(filePath, "utf-8")
      );
      const cssFilesContent = await Promise.all(getFileContentPromises);

      cssFilesContent.forEach(targetCSSContent => {
        const targetsAST = postcss.parse(targetCSSContent).nodes;

        root.walkRules(rule => {
          // search for duplicate selector
          const findedAst = targetsAST.find(
            ast => ast.selector === rule.selector
          );

          if (findedAst) {
            rule.walkDecls(function(decl) {
              // if css properties are the sames (props and value) remove it
              if (
                findedAst.nodes.some(
                  prop => prop.prop === decl.prop && prop.value === decl.value
                )
              ) {
                decl.remove();
              }
            });

            // if selector doesn't have any props then remove selector
            if (!rule.nodes || !rule.nodes.length) {
              rule.remove();
            }
          }
        });
      });
    } catch (err) {
      throw err;
    }
  };
}

module.exports = postcss.plugin("slashcss", slashCSSPlugin);

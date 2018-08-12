"use strict";

const fs = require("fs");
const util = require("util");
const postcss = require("postcss");
const glob = require("fast-glob");

const ERRORS = require("./errors");
const { checkOptions, setDefaultOptions } = require("./options");
const { formatAST, getSingleFormatedAST } = require("./ast");

const getFileContent = util.promisify(fs.readFile);

module.exports = function slashCSSPlugin(opts = {}) {
  checkOptions(opts);

  const options = setDefaultOptions(opts);

  return async (root) => {
    try {
      const cssFilesPath = await glob(options.targets);

      if (!cssFilesPath.length) {
        throw new Error(ERRORS.NO_CSS);
      }

      const getFileASTPromises = cssFilesPath.map(filePath => {
        return getFileContent(filePath, "utf-8")
          .then(cssContent => postcss.parse(cssContent).nodes)
          .then(ast => formatAST({ast, options}));
      });

      const singleAST = getSingleFormatedAST({
        asts: await Promise.all(getFileASTPromises),
        mode: options.mode
      });

      root.walkRules(rule => {
        const targetSelector = singleAST[rule.selector];

        if (targetSelector) {
          rule.walkDecls(function (decl) {
            let propertie = `${decl.prop}|${decl.value}`;

            if (options.checkImportant && decl.important) {
              propertie += `|important`;
            }

            if (targetSelector.includes(propertie)) {
              decl.remove();
            }
          });

          if (!rule.nodes || !rule.nodes.length) {
            rule.remove();
          }
        }
      });
    } catch (err) {
      throw err;
    }
  }
};

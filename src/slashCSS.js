"use strict";

const fs = require("fs");
const util = require("util");
const postcss = require("postcss");
const glob = require("fast-glob");

const ERRORS = require("./errors");
const { MODES } = require("./constants");
const { formatAST, getSingleFormatedAST } = require("./ast");

const getFileContent = util.promisify(fs.readFile);

module.exports = function slashCSSPlugin(opts = {}) {
  const options = Object.assign({}, opts);

  if (!options || !options.targets) {
    throw new Error(ERRORS.OPTIONS_MISSING);
  }

  if (typeof options.targets !== "string") {
    throw new Error(ERRORS.OPTION_NOT_STRING("Targets"));
  }

  if (options.mode) {
    if (typeof options.mode !== "string") {
      throw new Error(ERRORS.OPTION_NOT_STRING("Mode"));
    }

    if (Object.keys(MODES).every(key => MODES[key].toLowerCase() !== options.mode.toLowerCase())) {
      throw new Error(ERRORS.INVALID_OPTION("mode"));
    }
  } else {
    options.mode === MODES.ATLEAST_ONE;
  }

  return async (root) => {
    try {
      const cssFilesPath = await glob(options.targets);

      if (!cssFilesPath.length) {
        throw new Error(ERRORS.NO_CSS);
      }

      const getFileASTPromises = cssFilesPath.map(filePath => {
        return getFileContent(filePath, "utf-8")
          .then(cssContent => postcss.parse(cssContent).nodes)
          .then(postCSSAST => formatAST(postCSSAST))
      });

      const singleAST = getSingleFormatedAST({
        asts: await Promise.all(getFileASTPromises),
        mode: options.mode
      });

      root.walkRules(rule => {
        const targetSelector = singleAST[rule.selector];

        if (targetSelector) {
          rule.walkDecls(function (decl) {
            if (targetSelector.includes(`${decl.prop}|${decl.value}`)) {
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

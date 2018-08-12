"use strict";

const { MODES } = require("./constants");
const ERRORS = require("./errors");

module.exports = {
  checkOptions,
  setDefaultOptions,
};

function checkOptions(options) {
  if (!options || !options.targets) {
    throw new Error(ERRORS.OPTIONS_MISSING);
  }

  if (typeof options.targets !== "string") {
    throw new Error(ERRORS.OPTION_NOT_STRING("Targets"));
  }

  if (options.checkImportant && typeof options.checkImportant !== "boolean") {
    throw new Error(ERRORS.OPTION_NOT_BOOLEAN("CheckImportant"));
  }

  if (options.mode) {
    if (typeof options.mode !== "string") {
      throw new Error(ERRORS.OPTION_NOT_STRING("Mode"));
    }

    if (Object.keys(MODES).every(key => MODES[key].toLowerCase() !== options.mode.toLowerCase())) {
      throw new Error(ERRORS.INVALID_OPTION("mode"));
    }
  }
}

function setDefaultOptions(opts = {}) {
  const options = {...opts};
  options.mode = options.mode || MODES.ATLEAST_ONE;
  options.checkImportant = options.checkImportant || true;

  return options;
}
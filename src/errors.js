"use strict";

module.exports = {
  NO_CSS: "No css files found",
  OPTIONS_MISSING: "This plugins needs an option object with a targets propertie",
  OPTION_NOT_STRING: optionName => `${optionName} option must be a string`,
  OPTION_NOT_BOOLEAN: optionName => `${optionName} option must be a boolean`,
  INVALID_OPTION: optionName => `Invalid ${optionName} option value`
}

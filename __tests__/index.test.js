"use strict";

const postcss = require("postcss");
const slashCSS = require("../index");
const { MODES } = require("../src/constants");

function run(input, output, opts) {
  return postcss([slashCSS(opts)])
    .process(input)
    .then(result => {
      expect(result.css.replace(/\s/g, "")).toEqual(output);
      expect(result.warnings().length).toBe(0);
    });
}

describe("Test main functions", () => {
  it("Should throw an error since we dont pass targets option", async () => {
    expect(() => slashCSS(null)).toThrow(
      "This plugins needs an option object with a targets propertie"
    );
  });

  it("Should throw an error if targets option is not a string", async () => {
    expect(() => slashCSS({
      targets: 10
    })).toThrow(
      "Targets option must be a string"
    );
  });

  it("Should throw an error if mode checkImportant is not a boolean", async () => {
    expect(() => slashCSS({
      targets: "./__tests__/assets/**/*.css",
      checkImportant: 12
    })).toThrow(
      "CheckImportant option must be a boolean"
    );
  });

  it("Should throw an error if mode option is not a string", async () => {
    expect(() => slashCSS({
      targets: "./__tests__/assets/**/*.css",
      mode: 12
    })).toThrow(
      "Mode option must be a string"
    );
  });

  it("Should throw an error if mode option is not a valid mode", async () => {
    expect(() => slashCSS({
      targets: "./__tests__/assets/**/*.css",
      mode: "tezrzr"
    })).toThrow(
      "Invalid mode option value"
    );
  });

  it("Should throw an error if no css files are found", async () => {
    expect(
      run(
        "a{font-size: 12px; color: blue; font-family: Roboto; position: relative;}",
        "a{position:relative;}",
        {targets: "./rezaraze.css"}
      )
    ).rejects.toThrow("No css files found");
  });

  it("Should remove duplicate css properties", () => {
    return run(
      "a{font-size: 12px; color: blue; font-family: Roboto; position: relative;}",
      "a{position:relative;}",
      {targets: "./__tests__/assets/**/*.atleast.css"}
    );
  });

  it("Should remove duplicate css selector since all props are removed", () => {
    return run(
      "a{font-size: 12px; color: blue; font-family: Roboto;}",
      "",
      {targets: "./__tests__/assets/**/*.atleast.css"}
    );
  });

  it("Should remove duplicate css properties MatchAtLeastOne mode", () => {
    return run(
      "a{font-size: 12px; color: blue; font-family: Roboto;}",
      "",
      {
        targets: "./__tests__/assets/**/*.atleast.css",
        mode: MODES.ATLEAST_ONE
      }
    );
  });

  it("Should remove duplicate css properties MatchAll mode", () => {
    return run(
      "a{font-size: 12px; color: blue; font-family: Roboto;}",
      "a{font-size:12px;color:blue;}",
      {
        targets: "./__tests__/assets/**/*.all.css",
        mode: MODES.ALL
      }
    );
  });

  it("Should not remove anything since it does not match all targets files", () => {
    return run(
      "a{font-size:12px;}",
      "a{font-size:12px;}",
      {
        targets: "./__tests__/assets/**/*.all.css",
        mode: MODES.ALL
      }
    );
  });

  it("Should remove duplicate css properties and not care about important (checkImportant false)", () => {
    return run(
      "a{font-size: 12px; top: 3px!important;}",
      "",
      {
        targets: "./__tests__/assets/**/*.atleast.css",
        checkImportant: false
      }
    );
  });

  it("Should remove duplicate css properties care about important (checkImportant true)", () => {
    return run(
      "a{font-size: 12px; top: 3px;}",
      "a{top:3px;}",
      {
        targets: "./__tests__/assets/**/*.atleast.css",
        checkImportant: true
      }
    );
  });
});

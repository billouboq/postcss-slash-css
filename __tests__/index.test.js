"use strict";

const postcss = require("postcss");
const slashCSS = require("../index");

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
    expect(() => slashCSS({ targets: 10 })).toThrow(
      "Targets option must be a string"
    );
  });

  it("Should throw an error if no css files are found", async () => {
    expect(
      run(
        "a{font-size: 12px; color: blue; font-family: Roboto; position: relative;}",
        "a{position:relative;}",
        { targets: "./rezaraze.css" }
      )
    ).rejects.toThrow("No css files found");
  });

  it("Should remove duplicate css properties", () => {
    return run(
      "a{font-size: 12px; color: blue; font-family: Roboto; position: relative;}",
      "a{position:relative;}",
      { targets: "./__tests__/assets/**/*.css" }
    );
  });

  it("Should remove duplicate css selector since all props are removed", () => {
    return run("a{font-size: 12px; color: blue; font-family: Roboto;}", "", {
      targets: "./__tests__/assets/**/*.css",
    });
  });
});

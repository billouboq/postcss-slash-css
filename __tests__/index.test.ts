"use strict";

import postcss from "postcss";
import removeDuplicateCSS from "../src/index";

function run(input: string, output: string, opts: object) {
  return postcss([ removeDuplicateCSS(opts) ])
    .process(input)
    .then(result => {
      expect(result.css.replace(/\s/g,'')).toEqual(output);
      expect(result.warnings().length).toBe(0);
    });
}

describe("Test main functions", () => {
  it("Should remove duplicate css properties", () => {
    return run(
      'a{font-size: 12px; color: blue; font-family: Roboto; position: relative;}',
      'a{position:relative;}',
      {targets: "./__tests__/assets/**/*.css"}
    );
  });

  it("Should remove duplicate css selector since all props are removed", () => {
    return run(
      'a{font-size: 12px; color: blue; font-family: Roboto;}',
      '',
      {targets: "./__tests__/assets/**/*.css"}
    );
  });

  it("Should throw an error since we dont pass targets option", async () => {
    expect(() => removeDuplicateCSS(null)).toThrow("This plugins needs an option object with a targets propertie");
  });
})
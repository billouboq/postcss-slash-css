"use strict";

import postcss from "postcss";
import removeDuplicateCSS from "../src/index";

function run(input: string, output: string, opts: object) {
  return postcss([ removeDuplicateCSS(opts) ])
    .process(input)
    .then(result => {
      expect(result.css).toEqual(output);
      expect(result.warnings().length).toBe(0);
    });
}

describe("Test main functions", () => {
  it("Should remove duplicate css properties", () => {
    return run('a{}', 'a{}', {});
  })
})
"use strict";

import removeDuplicateCSS from "../src/index";
import {resolve} from path;

describe("Test main functions", () => {
  it("Should add the two and numbers and return the result", done => {
    const expected = "";

    const output = removeDuplicateCSS({
      input: "./__tests__/assets/input.css",
      targets: "./__tests__/targets/**/*.css",
    });

    expect(output).toBe(expected);
    done();
  })
})
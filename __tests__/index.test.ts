"use strict";

import {add} from "../src/index";

describe("Test main functions", () => {
  it("Should add the two and numbers and return the result", done => {
    const expected = 5;
    const input1 = 3;
    const input2 = 2;

    expect(add(input1, input2)).toBe(expected);
    done();
  })
})
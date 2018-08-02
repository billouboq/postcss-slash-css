import postcss from 'postcss';
import * as AST from "../../src/ast/ast";

describe("Test ast functions", () => {
  it("Should format postcss ast to new ast format", async () => {
    const input = postcss.parse("a{font-size: 12px; color: red}");
    const result = AST.format(input);
    const expected = [
      {
        selector: "a",
        props: [
          {prop: "font-size", value: "12px"},
          {prop: "color", value: "red"}
        ]
      }
    ];

    expect(result).toEqual(expected);
  })
})
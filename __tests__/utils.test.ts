import postcss from 'postcss';
import * as utils from "../src/utils";

describe("Test getFileContent function", () => {
  it("Should get content of file", async () => {
    const filePath = "./__tests__/assets/test";
    const result = await utils.getFileContent(filePath);
    const expected = "abc"

    expect(result).toEqual(expected);
  })

  it("Should throw an error on file not found", async () => {
    expect(utils.getFileContent("./__tests__/razrzarza")).rejects.toThrow();
  })
})

describe("Test formatAST function", () => {
  it("Should format postcss ast to new ast format", async () => {
    const input = postcss.parse("a{font-size: 12px; color: red}");
    const result = utils.formatAST(input);
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
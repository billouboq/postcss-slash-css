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

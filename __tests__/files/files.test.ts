import * as files from "../../src/files/files";

describe("Test files functions", () => {
  it("Should get content of file", async () => {
    const filePath = "./__tests__/assets/test";
    const result = await files.getContent(filePath);
    const expected = "abc"

    expect(result).toEqual(expected);
  })
})
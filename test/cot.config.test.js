const Config = require("../src/cot/config.js");

const config = new Config();

describe("can return values", () => {
  test("successfully retreives simple value", () => {
    let val = config.get("application.port");

    expect(val).toEqual(8080);
  });
});

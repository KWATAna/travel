const { TestHelper } = require("uu_appg01_server-test");
const CMD = "location/setState";
const APP_CODE = "uu-travel-main";

function appCodePrefix(param) {
  return `${APP_CODE}/${param}`;
}

beforeAll(async () => {
  await TestHelper.setup();

  let dtoIn = {
    code: "pukpuk_1",
    name: "pukpuk",
    description: "fsfsf sfsfsfs sfdfsfsfsfs",
    uuAppProfileAuthorities: "urn:uu:GGALL",
  };

  await TestHelper.initUuSubAppInstance();
  await TestHelper.createUuAppWorkspace();
  let session = await TestHelper.login("AwidLicenseOwner", false, false);
  await TestHelper.executePostCommand("sys/uuAppWorkspace/init", dtoIn, session);
});

afterAll(async () => {
  await TestHelper.dropDatabase();
  await TestHelper.teardown();
});
const dtoIn = {
  name: "PORKIPINNE",
  country: "Czech Republic",
  city: "BARAGUE",
  address: "Ve Smečkách 588/12, 110 00",
  visa: false,
  category: 1,
};

describe("Testing the location/delete uuCmd...", () => {
  test("HDS", async () => {
    let helpingVar = await TestHelper.executePostCommand("location/create", dtoIn);
    let result = await TestHelper.executePostCommand("location/setState", { id: helpingVar.id, state: "closed" });
    expect.assertions(3);
    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
    expect(result.data.state).toEqual("closed");
  });

  test("DtoIn contains unsupported keys.", async () => {
    let expectedWarning = {
      code: `${CMD}/unsupportedKeys`,
      message: "DtoIn contains unsupported keys.",
      unsupportedKeys: ["extraAttribute"],
    };
    expect.assertions(3);

    let helpingVar = await TestHelper.executePostCommand("location/create", dtoIn);
    let response = await TestHelper.executePostCommand("location/setState", {
      id: helpingVar.id,
      state: "closed",
      extraAttribute: expectedWarning.unsupportedKeys,
    });
    let warning = response.uuAppErrorMap[appCodePrefix(expectedWarning.code)];
    expect(response.status).toEqual(200);
    expect(warning).toBeDefined();
    expect(warning.type).toEqual("warning");
  });
});

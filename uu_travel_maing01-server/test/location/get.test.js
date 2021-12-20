const { TestHelper } = require("uu_appg01_server-test");
const CMD = "location/get";
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
    let result = await TestHelper.executeGetCommand("location/get", { id: helpingVar.id });
    expect.assertions(4);
    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
    expect(result.data.name).toEqual(dtoIn.name);
    expect(result.data.city).toEqual(dtoIn.city);
  });
  test("DtoIn contains unsupported keys.", async () => {
    let expectedWarning = {
      code: `${CMD}/unsupportedKeys`,
      message: "DtoIn contains unsupported keys.",
      unsupportedKeys: ["extraAttribute"],
    };
    expect.assertions(2);

    let helpingVar = await TestHelper.executePostCommand("location/create", dtoIn);
    let response = await TestHelper.executeGetCommand("location/get", {
      id: helpingVar.id,
      extraAttribute: expectedWarning.unsupportedKeys,
    });
    let warning = response.uuAppErrorMap[appCodePrefix(expectedWarning.code)];
    expect(warning).toBeDefined();
    expect(warning.type).toEqual("warning");
  });
});

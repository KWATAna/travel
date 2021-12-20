const { TestHelper } = require("uu_appg01_server-test");
const CMD = "participant/list";
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
  name: "New participant 3",
  dateOfBirth: "1990-08-09",
  passNum: "KA66624",
  passExpiry: "2023-08-09",
  tripId: "61b9e130f97c1a1614b749ce",
  telNumber: "+380935678934",
};
describe("Testing participant/list command...", () => {
  test("HDS", async () => {
    expect.assertions(3);
    await TestHelper.executePostCommand("participant/create", dtoIn);
    await TestHelper.executePostCommand("participant/create", dtoIn);

    let result = await TestHelper.executeGetCommand("participant/list", {});
    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
    expect(result.data.itemList).toBeDefined();
  });

  test("DtoIn contains unsupported keys.", async () => {
    let expectedWarning = {
      code: `${CMD}/unsupportedKeys`,
    };
    expect.assertions(3);

    await TestHelper.executePostCommand("participant/create", dtoIn);
    await TestHelper.executePostCommand("participant/create", dtoIn);
    let response = await TestHelper.executeGetCommand("participant/list", {
      extraAttribute: "extraAttribute",
    });
    console.log(response);
    let warning = response.uuAppErrorMap[appCodePrefix(expectedWarning.code)];
    expect(response.data.itemList).toBeDefined();
    expect(warning).toBeDefined();
    expect(warning.type).toEqual("warning");
  });
  test("Test - TravelIsNotInCorrectState", async () => {
    const filter = `{awid: "${TestHelper.awid}"}`;
    const params = `{$set: ${JSON.stringify({ state: `vfr` })}}`;
    const restore = `{$set: ${JSON.stringify({ state: `active` })}}`;
    await TestHelper.executeDbScript(`db.travelMain.findOneAndUpdate(${filter}, ${params});`);
    let expectedError = {
      code: `${CMD}/TravelIsNotInCorrectState`,
      message: "uuTravelApp is not in correct state.",
      paramMap: { awid: TestHelper.awid, currentState: "vfr", expectedState: "active" },
    };
    expect.assertions(3);
    try {
      await TestHelper.executeGetCommand("participant/list", {});
    } catch (error) {
      expect(error.status).toEqual(400);
      expect(error.message).toEqual(expectedError.message);
      if (error.paramMap && expectedError.paramMap) {
        expect(error.paramMap).toEqual(expectedError.paramMap);
      }
    }
    await TestHelper.executeDbScript(`db.travelMain.findOneAndUpdate(${filter}, ${restore});`);
  });
  test("TravelInstanceDoesNotExist", async () => {
    let filter = `{awid: "${TestHelper.awid}"}`;
    let params = `{$set: ${JSON.stringify({ awid: 77777777777777 })}}`;
    await TestHelper.executeDbScript(`db.travelMain.findOneAndUpdate(${filter}, ${params});`);
    let expectedError = {
      code: "TravelDoesNotExist",
      message: "uuTravelApp does not exist.",
    };
    try {
      await TestHelper.executeGetCommand("participant/list", {});
    } catch (error) {
      expect(error.status).toEqual(400);
      expect(error.message).toEqual(expectedError.message);
    }
    expect.assertions(2);
  });
});

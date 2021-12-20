const { TestHelper } = require("uu_appg01_server-test");
const CMD = "participant/update";
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
describe("Testing participant/update command...", () => {
  test("HDS", async () => {
    expect.assertions(3);
    let helpingVar = await TestHelper.executePostCommand("participant/create", dtoIn);
    let result = await TestHelper.executePostCommand("participant/update", { id: helpingVar.id, name: "Valentin" });
    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
    expect(result.data.name).toEqual("Valentin");
  });

  test("Active state check", async () => {
    let expectedError = {
      code: `${CMD}/participantIsNotInCorrectState`,
      message: "DtoIn contains unsupported keys.",
      unsupportedKeys: ["extraAttribute"],
    };
    let helpingVar = await TestHelper.executePostCommand("participant/create", dtoIn);
    await TestHelper.executePostCommand("participant/setState", { id: helpingVar.id, state: "inactive" });
    try {
      await TestHelper.executePostCommand("participant/update", { id: helpingVar.id, name: "Valentin" });
    } catch (e) {
      let error = e.dtoOut.uuAppErrorMap[appCodePrefix(expectedError.code)];
      expect.assertions(2);
      expect(error).toBeDefined();
      expect(e.response.status).toEqual(400);
    }
  });
  test("Participant does not exist", async () => {
    let expectedError = {
      code: `${CMD}/participantDoesNotExist`,
      message: "DtoIn contains unsupported keys.",
      unsupportedKeys: ["extraAttribute"],
    };
    let helpingVar = await TestHelper.executePostCommand("participant/create", dtoIn);
    await TestHelper.executePostCommand("participant/setState", { id: helpingVar.id, state: "inactive" });
    try {
      await TestHelper.executePostCommand("participant/update", { id: "61bc871b2c98c03cccce8c8b", name: "Valentin" });
    } catch (e) {
      let error = e.dtoOut.uuAppErrorMap[appCodePrefix(expectedError.code)];
      expect.assertions(2);
      expect(error).toBeDefined();
      expect(e.response.status).toEqual(400);
    }
  });

  test("Invalid dtoIn", async () => {
    let expectedWarning = {
      code: `${CMD}/invalidDtoIn`,
      message: "DtoIn contains unsupported keys.",
      unsupportedKeys: ["extraAttribute"],
    };
    expect.assertions(3);
    try {
      await TestHelper.executePostCommand("participant/update", { name: "Valentin" });
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.message).toEqual("DtoIn is not valid.");
      expect(e.code).toEqual(appCodePrefix(expectedWarning.code));
    }
  });

  test("DtoIn contains unsupported keys.", async () => {
    let expectedError = {
      code: `${CMD}/unsupportedKeys`,
      message: "DtoIn contains unsupported keys.",
      unsupportedKeys: ["extraAttribute"],
    };

    let helpingVar = await TestHelper.executePostCommand("participant/create", dtoIn);
    try {
      await TestHelper.executePostCommand("participant/update", {
        id: helpingVar.id,
        name: "Mignon",
        extraAttribute: expectedError.unsupportedKeys,
      });
    } catch (e) {
      let error = e.dtoOut.uuAppErrorMap[appCodePrefix(expectedError.code)];
      expect.assertions(2);
      expect(error).toBeDefined();
      expect(e.response.status).toEqual(400);
    }
  });
  test("Test - TravelIsNotInCorrectState", async () => {
    const filter = `{awid: "${TestHelper.awid}"}`;
    const params = `{$set: ${JSON.stringify({ state: `vfr` })}}`;
    const restore = `{$set: ${JSON.stringify({ state: `active` })}}`;
    let participant = await TestHelper.executePostCommand("participant/create", dtoIn);
    await TestHelper.executeDbScript(`db.travelMain.findOneAndUpdate(${filter}, ${params});`);
    let expectedError = {
      code: `${CMD}/TravelIsNotInCorrectState`,
      message: "uuTravelApp is not in correct state.",
      paramMap: { awid: TestHelper.awid, currentState: "vfr", expectedState: "active" },
    };
    expect.assertions(3);
    try {
      await TestHelper.executePostCommand("participant/update", { id: participant.id, name: "Valentin" });
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
    let participant = await TestHelper.executePostCommand("participant/create", dtoIn);
    let filter = `{awid: "${TestHelper.awid}"}`;
    let params = `{$set: ${JSON.stringify({ awid: 77777777777777 })}}`;
    await TestHelper.executeDbScript(`db.travelMain.findOneAndUpdate(${filter}, ${params});`);
    let expectedError = {
      code: "TravelDoesNotExist",
      message: "uuTravelApp does not exist.",
    };
    try {
      await TestHelper.executePostCommand("participant/update", { id: participant.id, name: "Valentin" });
    } catch (error) {
      expect(error.status).toEqual(400);
      expect(error.message).toEqual(expectedError.message);
    }
    expect.assertions(2);
  });
});

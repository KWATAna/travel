const { TestHelper } = require("uu_appg01_server-test");
const CMD = "trip/delete";
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
  name: "New Year in Prague",
  capacity: 2,
  price: 1200,
  locationId: "61b9e130f97c1a1614b749ce",
  participantIdList: [],
  startingDate: "2021-12-30",
};
const helpingDtoIn = {
  name: "PORKIPINNE",
  country: "Czech Republic",
  city: "BARAGUE",
  address: "Ve Smečkách 588/12, 110 00",
  visa: false,
  category: 1,
};
const participantdtoIn = {
  name: "New participant 3",
  dateOfBirth: "1990-08-09",
  passNum: "KA66624",
  passExpiry: "2023-08-09",
  tripId: "61b9e130f97c1a1614b749ce",
  telNumber: "+380935678934",
};

describe("Testing trip/delete command...", () => {
  test("HDS", async () => {
    expect.assertions(2);
    let helpingVar = await TestHelper.executePostCommand("location/create", helpingDtoIn);
    let trip = await TestHelper.executePostCommand("trip/create", { ...dtoIn, locationId: helpingVar.id });
    let result = await TestHelper.executePostCommand("trip/delete", { id: trip.id });

    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
  });

  test("TheTripHasParticipants error", async () => {
    expect.assertions(2);
    let helpingVar = await TestHelper.executePostCommand("location/create", helpingDtoIn);
    let participant = await TestHelper.executePostCommand("participant/create", participantdtoIn);
    let trip = await TestHelper.executePostCommand("trip/create", {
      ...dtoIn,
      locationId: helpingVar.id,
      participantIdList: [participant.id],
    });
    let expectedError = {
      code: `${CMD}/TheTripHasParticipants`,
    };

    try {
      await TestHelper.executePostCommand("trip/delete", { id: trip.id });
    } catch (err) {
      let error = err.dtoOut.uuAppErrorMap[appCodePrefix(expectedError.code)];
      expect(error).toBeDefined();
      expect(err.response.status).toEqual(400);
    }
  });

  test("DtoIn contains unsupported keys.", async () => {
    let expectedWarning = {
      code: `${CMD}/unsupportedKeys`,
      message: "DtoIn contains unsupported keys.",
      unsupportedKeys: ["extraAttribute"],
    };
    expect.assertions(2);

    let helpingVar = await TestHelper.executePostCommand("location/create", helpingDtoIn);
    let trip = await TestHelper.executePostCommand("trip/create", {
      ...dtoIn,
      locationId: helpingVar.id,
    });
    let response = await TestHelper.executePostCommand("trip/delete", {
      id: trip.id,
      extraAttribute: "extraAttribute",
    });
    let warning = response.uuAppErrorMap[appCodePrefix(expectedWarning.code)];
    expect(warning).toBeDefined();
    expect(warning.type).toEqual("warning");
  });

  test("DtoIn is not valid.", async () => {
    let expectedError = {
      code: `${CMD}/invalidDtoIn`,
    };
    try {
      await TestHelper.executePostCommand("trip/delete", {});
    } catch (e) {
      expect.assertions(3);
      expect(e.status).toEqual(400);
      expect(e.message).toEqual("DtoIn is not valid.");
      expect(e.code).toEqual(appCodePrefix(expectedError.code));
    }
  });

  test("Test - TravelIsNotInCorrectState", async () => {
    const filter = `{awid: "${TestHelper.awid}"}`;
    const params = `{$set: ${JSON.stringify({ state: `vfr` })}}`;
    const restore = `{$set: ${JSON.stringify({ state: `active` })}}`;
    let helpingVar = await TestHelper.executePostCommand("location/create", helpingDtoIn);
    await TestHelper.executePostCommand("trip/create", { ...dtoIn, locationId: helpingVar.id });
    await TestHelper.executeDbScript(`db.travelMain.findOneAndUpdate(${filter}, ${params});`);
    let expectedError = {
      code: `${CMD}/TravelIsNotInCorrectState`,
      message: "Travel is not in correct state.",
      paramMap: { awid: TestHelper.awid, currentState: "vfr", expectedState: "active" },
    };
    expect.assertions(3);
    try {
      await TestHelper.executePostCommand("trip/delete", {});
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
    let helpingVar = await TestHelper.executePostCommand("location/create", helpingDtoIn);
    let trip = await TestHelper.executePostCommand("trip/create", { ...dtoIn, locationId: helpingVar.id });
    let filter = `{awid: "${TestHelper.awid}"}`;
    let params = `{$set: ${JSON.stringify({ awid: 77777777777777 })}}`;
    await TestHelper.executeDbScript(`db.travelMain.findOneAndUpdate(${filter}, ${params});`);
    let expectedError = {
      code: "TravelDoesNotExist",
      message: "Travel does not exist.",
    };
    try {
      await TestHelper.executeGetCommand("trip/list", { id: trip.id });
    } catch (error) {
      expect(error.status).toEqual(400);
      expect(error.message).toEqual(expectedError.message);
    }
    expect.assertions(2);
  });
});

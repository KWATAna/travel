const { TestHelper } = require("uu_appg01_server-test");
const CMD = "participant/create";
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
describe("Testing participant create command...", () => {
  test("HDS", async () => {
    expect.assertions(3);

    let result = await TestHelper.executePostCommand("participant/create", dtoIn);
    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
    expect(result.data.state).toEqual("active");
  });
  test("Invalid dtoIn", async () => {
    let expectedWarning = {
      code: `${CMD}/invalidDtoIn`,
      message: "DtoIn contains unsupported keys.",
      unsupportedKeys: ["extraAttribute"],
    };
    expect.assertions(3);
    try {
      await TestHelper.executePostCommand("participant/create", { field: "unsupported" });
    } catch (e) {
      expect(e.status).toEqual(400);
      expect(e.message).toEqual("DtoIn is not valid.");
      expect(e.code).toEqual(appCodePrefix(expectedWarning.code));
    }
  });
});

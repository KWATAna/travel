const { TestHelper } = require("uu_appg01_server-test");
const CMD = "trip/create";

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

describe("Testing participant create command...", () => {
  test("HDS", async () => {
    expect.assertions(2);
    let helpingVar = await TestHelper.executePostCommand("location/create", helpingDtoIn);
    let trip = await TestHelper.executePostCommand("trip/create", { ...dtoIn, locationId: helpingVar.id });
    let result = await TestHelper.executePostCommand("trip/delete", { id: trip.id });

    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
  });
});

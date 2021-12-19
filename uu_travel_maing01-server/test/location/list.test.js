const { TestHelper } = require("uu_appg01_server-test");
const CMD = "location/list";

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
    await TestHelper.executePostCommand("location/create", dtoIn);
    await TestHelper.executePostCommand("location/create", dtoIn);

    let result = await TestHelper.executeGetCommand("location/list", {});
    expect.assertions(3);
    expect(result.status).toEqual(200);
    expect(result.data.uuAppErrorMap).toBeDefined();
    expect(result.data.itemList).toBeDefined()
  });
});

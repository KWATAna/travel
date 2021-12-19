const { TestHelper } = require("uu_appg01_server-test");

class TravelTestHelper {
  static async initUuSubApp() {
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
  }

  static async changeTravelAwid() {
    const filter = `{awid: "${TestHelper.awid}"}`;
    const params = `{$set: ${JSON.stringify({ awid: `test` })}}`;
    await TestHelper.executeDbScript(`db.travelMain.findOneAndUpdate(${filter}, ${params});`);
  }

  static async travelSetActiveState() {
    const filter = `{awid: "${TestHelper.awid}"}`;
    const params = `{$set: ${JSON.stringify({ state: `active` })}}`;
    await TestHelper.executeDbScript(`db.travelMain.findOneAndUpdate(${filter}, ${params});`);
  }

  static async travelSetWrongState() {
    const filter = `{awid: "${TestHelper.awid}"}`;
    const params = `{$set: ${JSON.stringify({ state: `final` })}}`;
    await TestHelper.executeDbScript(`db.travelMain.findOneAndUpdate(${filter}, ${params});`);
  }
}

module.exports = TravelTestHelper;

"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { Profile, UuAppWorkspace, UuAppWorkspaceError } = require("uu_appg01_server").Workspace;
const Errors = require("../api/errors/travel-main-error.js");

const WARNINGS = {
  initUnsupportedKeys: {
    code: `${Errors.Init.UC_CODE}unsupportedKeys`,
  },
};

class TravelMainAbl {
  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("travelMain");
  }

  async init(uri, dtoIn, session) {
    const awid = uri.getAwid();
    // HDS 1 Validation of dtoIn.
    let validationResult = this.validator.validate("initDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.initUnsupportedKeys.code,
      Errors.Init.InvalidDtoIn
    );

    // HDS 2
    const schemas = ["travelMain", "trip", "location", "participant"];
    let schemaCreateResults = schemas.map(async (schema) => {
      try {
        return await DaoFactory.getDao(schema).createSchema();
      } catch (e) {
        // A3
        throw new Errors.Init.SchemaDaoCreateSchemaFailed({ uuAppErrorMap }, { schema }, e);
      }
    });
    await Promise.all(schemaCreateResults);
    if (dtoIn.uuAppProfileAuthorities) {
      try {
        await Profile.set(awid, "Authorities", dtoIn.uuAppProfileAuthorities);
      } catch (e) {
        if (e instanceof UuAppWorkspaceError) {
          // A4
          throw new Errors.Init.SysSetProfileFailed({ uuAppErrorMap }, { role: dtoIn.uuAppProfileAuthorities }, e);
        }
        throw e;
      }
    }

    const { uuAppPorfileAuthorities, ...restDtoin } = dtoIn;
    // HDS 3
    const uuObject = {
      ...restDtoin,
      state: "active",
      awid,
    };

    try {
      await this.dao.create(uuObject);
    } catch (e) {
      throw new Errors.Init.TodoInstanceCreateDaoFailed({ uuAppErrorMap }, e);
    }
    // HDS 4 - HDS N
    // TODO Implement according to application needs...

    // HDS N+1
    const workspace = UuAppWorkspace.get(awid);

    return {
      ...workspace,
      uuAppErrorMap: uuAppErrorMap,
    };
  }
}

module.exports = new TravelMainAbl();

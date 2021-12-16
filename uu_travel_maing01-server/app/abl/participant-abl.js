"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/participant-error.js");

const WARNINGS = {
  unsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
};

class ParticipantAbl {
  constructor() {
    this.validator = Validator.load();
    this.mainDao = DaoFactory.getDao("travelMain");
    this.tripDao = DaoFactory.getDao("trip");
    this.locationDao = DaoFactory.getDao("location");
    this.participantDao = DaoFactory.getDao("participant");
  }

  async update(awid, dtoIn, uuAppErrorMap = {}) {
    const uuTravelMain = await this.mainDao.getByAwid(awid);

    if (!uuTravelMain) {
      throw new Errors.Update.uuTravelAppDoesNotExist({ uuAppErrorMap }, { awid });
    }

    if (uuTravelMain.state !== "active") {
      throw new Errors.Update.uuTravelAppIsNotInCorrectState(
        { uuAppErrorMap },
        { expectedState: "active", awid, currentState: uuTravelMain.state }
      );
    }
    let validationResult = this.validator.validate("participantUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    let uuParticipant = await this.participantDao.get(awid, dtoIn.id);
    if (!uuParticipant) {
      throw new Errors.Update.uuTravelAppDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }
    console.log(uuParticipant);
    if (uuParticipant.state !== "active") {
      throw new Errors.Update.ParticipantIsNotInCorrectState(
        { uuAppErrorMap },
        { state: uuParticipant.state, expectedStateList: "active" }
      );
    }

    try {
      uuParticipant = await this.participantDao.update({ ...dtoIn, awid });
    } catch (e) {
      throw new Errors.Update.ParticipantDaoUpdateFailed({ uuAppErrorMap }, { cause: e });
    }
    return {
      ...uuParticipant,
      uuAppErrorMap,
    };
  }

  async list(awid, dtoIn, uuAppErrorMap = {}) {
    const uuTravelMain = await this.mainDao.getByAwid(awid);

    if (!uuTravelMain) {
      throw new Errors.SetState.uuTravelAppDoesNotExist({ uuAppErrorMap }, { awid });
    }

    if (uuTravelMain.state !== "active") {
      throw new Errors.SetState.uuTravelAppIsNotInCorrectState(
        { uuAppErrorMap },
        { expectedState: "active", awid, currentState: uuTravelMain.state }
      );
    }
    let validationResult = this.validator.validate("participantListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.SetState.InvalidDtoIn
    );
    const { pageInfo, ...restDtoIn } = dtoIn;
    let filter = { ...restDtoIn, awid };
    const uuParticipantList = await this.participantDao.list(filter, pageInfo);

    return {
      ...uuParticipantList,
      uuAppErrorMap,
    };
  }

  async setState(awid, dtoIn, uuAppErrorMap = {}) {
    const uuTravelMain = await this.mainDao.getByAwid(awid);

    if (!uuTravelMain) {
      throw new Errors.SetState.uuTravelAppDoesNotExist({ uuAppErrorMap }, { awid });
    }

    if (uuTravelMain.state !== "active") {
      throw new Errors.SetState.uuTravelAppIsNotInCorrectState(
        { uuAppErrorMap },
        { expectedState: "active", awid, currentState: uuTravelMain.state }
      );
    }
    let validationResult = this.validator.validate("participantSetStateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.SetState.InvalidDtoIn
    );

    let uuParticipant = await this.participantDao.get(awid, dtoIn.id);
    if (!uuParticipant) {
      throw new Errors.SetState.ParticipantDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }
    dtoIn = { awid, ...dtoIn };
    try {
      uuParticipant = await this.participantDao.update(dtoIn);
    } catch (e) {
      throw new Errors.SetState.ParticipantDAOUpdateByAwidFailed({ uuAppErrorMap }, { cause: { ...e } });
    }

    return {
      ...uuParticipant,
      uuAppErrorMap,
    };
  }

  async get(awid, dtoIn, uuAppErrorMap = {}) {
    const uuTravelMain = await this.mainDao.getByAwid(awid);

    if (!uuTravelMain) {
      throw new Errors.Create.uuTravelAppDoesNotExist({ uuAppErrorMap }, { awid });
    }

    if (uuTravelMain.state !== "active") {
      throw new Errors.Create.uuTravelAppIsNotInCorrectState(
        { uuAppErrorMap },
        { expectedState: "active", awid, currentState: uuTravelMain.state }
      );
    }
    let validationResult = this.validator.validate("participantGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    const uuParticipant = await this.participantDao.getById(awid, dtoIn.id);
    if (!uuParticipant) {
      throw new Errors.Get.ParticipantDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    return {
      ...uuParticipant,
      uuAppErrorMap,
    };
  }

  async create(awid, dtoIn, uuAppErrorMap = {}) {
    const uuTravelMain = await this.mainDao.getByAwid(awid);

    if (!uuTravelMain) {
      throw new Errors.Create.uuTravelAppDoesNotExist({ uuAppErrorMap }, { awid });
    }

    if (uuTravelMain.state !== "active") {
      throw new Errors.Create.uuTravelAppIsNotInCorrectState(
        { uuAppErrorMap },
        { expectedState: "active", awid, currentState: uuTravelMain.state }
      );
    }

    // HDS 2 System checks existence and state of the todoInstance uuObject.

    let validationResult = this.validator.validate("participantCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );
    // HDS 4 System creates uuObject list in uuAppObjectStore (using list DAO create).

    const uuObject = { awid, ...dtoIn };
    let uuParticipant = null;
    try {
      uuParticipant = await this.participantDao.create(uuObject);
    } catch (e) {
      throw new Errors.Create.ParticipantDaoCreateFailed({ uuAppErrorMap }, { cause: e });
    }

    // HDS 5 Returns properly filled dtoOut.
    return {
      ...uuParticipant,
      uuAppErrorMap,
    };
  }
}

module.exports = new ParticipantAbl();

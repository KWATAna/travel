"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/trip-error.js");

const WARNINGS = {
  unsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  ParticipantDoesNotExist: {
    code: `${Errors.Create.UC_CODE}ParticipantDoesNotExist`,
    message: "Create trip by trip DAO create failed.",
  },
};

class TripAbl {
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

    let validationResult = this.validator.validate("tripUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    let uuTrip = await this.tripDao.get(awid, dtoIn.id);
    if (!uuTrip) {
      throw new Errors.Update.TripDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    if (uuTrip.state !== "active") {
      throw new Errors.Update.TripIsNotInCorrectState(
        { uuAppErrorMap },
        { state: uuTrip.state, expectedState: "active" }
      );
    }
    uuTrip = await this.tripDao.update({ ...dtoIn, awid });

    return {
      ...uuTrip,
      uuAppErrorMap,
    };
  }

  async setState(awid, dtoIn, uuAppErrorMap = {}) {
    // HDS 1
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

    // HDS 2

    let validationResult = this.validator.validate("tripSetStateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.SetState.InvalidDtoIn
    );

    // HDS 3
    const uuTrip = await this.tripDao.get(awid, dtoIn.id);
    if (!uuTrip) {
      throw new Errors.SetState.TripDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    // HDS 4
    let uuUpdated = await this.tripDao.update({ ...dtoIn, awid });

    // HDS 5
    return {
      ...uuUpdated,
      uuAppErrorMap,
    };
  }

  async delete(awid, dtoIn, uuAppErrorMap = {}) {
    const uuTravelMain = await this.mainDao.getByAwid(awid);

    if (!uuTravelMain) {
      throw new Errors.Delete.uuTravelAppDoesNotExist({ uuAppErrorMap }, { awid });
    }

    if (uuTravelMain.state !== "active") {
      throw new Errors.Delete.uuTravelAppIsNotInCorrectState(
        { uuAppErrorMap },
        { expectedState: "active", awid, currentState: uuTravelMain.state }
      );
    }

    let validationResult = this.validator.validate("tripDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );
    const uuTrip = await this.tripDao.get(awid, dtoIn.id);
    if (uuTrip.participantIdList.length > 0) {
      throw new Errors.Delete.TheTripHasParticipants({ uuAppErrorMap });
    }
    const uuDeleted = await this.tripDao.delete({ ...dtoIn, awid });

    return {
      ...uuDeleted,
      uuAppErrorMap,
    };
  }

  async get(awid, dtoIn, uuAppErrorMap = {}) {
    // HDS 1
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

    // HDS 2

    let validationResult = this.validator.validate("tripGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // HDS 3
    const uuTrip = await this.tripDao.get(awid, dtoIn.id);
    if (!uuTrip) {
      throw new Errors.Get.TripDoesNotExist({ uuAppErrorMap }, { locationId: dtoIn.id });
    }

    // HDS 4
    return {
      ...uuTrip,
      uuAppErrorMap,
    };
  }

  async create(awid, dtoIn, uuAppErrorMap = {}) {
    // HDS 1 Checks uuTravelApp state.

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

    // HDS 2 Validation of dtoIn.

    let validationResult = this.validator.validate("tripCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    // HDS 3 System verifies the existence of the location by Id (location DAO getById).

    const uuLocation = await this.locationDao.getById(awid, dtoIn.locationId);
    if (!uuLocation) {
      throw new Errors.Create.LocationDoesNotExist({ uuAppErrorMap }, { locationId: dtoIn.listId });
    }

    // HDS 4 System verifies the existence of the participant by Id (participant DAO listByParticipantIdList).
    const participantNumber = dtoIn.participantIdList.length;
    const existingParticipants = [];
    const nonExistingParticipants = [];

    for (let i = 0; i < participantNumber; i++) {
      let singleParticipant = await this.participantDao.get(awid, dtoIn.participantIdList[i]);
      if (singleParticipant) {
        existingParticipants.push(singleParticipant.id);
      } else {
        nonExistingParticipants.push(dtoIn.participantIdList[i]);
      }
    }
    ValidationHelper.addWarning(uuAppErrorMap, WARNINGS.ParticipantDoesNotExist, {
      participantList: nonExistingParticipants,
    });

    let uuTrip = await this.tripDao.create({ ...dtoIn, awid, participantIdList: existingParticipants });
    if (!uuTrip) throw new Errors.Create.TripDaoCreateFailed({ uuAppErrorMap }, { locationId: dtoIn.listId });

    //HDS 5 Returns properly filled dtoOut.
    return {
      ...uuTrip,
      uuAppErrorMap,
    };
  }
}

module.exports = new TripAbl();

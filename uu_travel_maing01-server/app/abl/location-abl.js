"use strict";
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/location-error.js");
const { BinaryStoreError } = require("uu_appg01_binarystore");

const WARNINGS = {
  unsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
};

class LocationAbl {
  constructor() {
    this.validator = Validator.load();
    this.mainDao = DaoFactory.getDao("travelMain");
    this.locationDao = DaoFactory.getDao("location");
    this.imageDao = DaoFactory.getDao("locationImage");
  }

  async list(awid, dtoIn, uuAppErrorMap = {}) {
    const uuTodosMain = await this.mainDao.getByAwid(awid);
    if (!uuTodosMain) {
      throw new Errors.List.uuTravelAppDoesNotExist({ uuAppErrorMap }, { awid });
    }
    if (uuTodosMain.state !== "active") {
      throw new Errors.List.uuTravelAppIsNotInCorrectState(
        { uuAppErrorMap },
        { expectedState: "active", awid, currentState: uuTodosMain.state }
      );
    }
    let validationResult = this.validator.validate("locationListDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    // dtoIn.sort = { [dtoIn.sortBy]: dtoIn.order == "asc" ? 1 : -1 };
    //
    // let sort = {"name":1}
    let uuReturn = await this.locationDao.list({ ...dtoIn, awid });

    return {
      uuReturn,
    };
  }

  async setState(awid, dtoIn, uuAppErrorMap = {}) {
    const uuTodosMain = await this.mainDao.getByAwid(awid);
    if (!uuTodosMain) {
      throw new Errors.Get.uuTravelAppDoesNotExist({ uuAppErrorMap }, { awid });
    }
    if (uuTodosMain.state !== "active") {
      throw new Errors.Get.uuTravelAppIsNotInCorrectState(
        { uuAppErrorMap },
        { expectedState: "active", awid, currentState: uuTodosMain.state }
      );
    }
    let validationResult = this.validator.validate("locationSetStateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.SetState.InvalidDtoIn
    );

    let uuItem = await this.locationDao.get(awid, dtoIn.id);
    if (!uuItem) {
      throw new Errors.SetState.LocationDoesNotExist({ uuAppErrorMap }, { id: dtoIn.id });
    }

    // HDS 4
    let uuObject = { ...dtoIn, awid };

    try {
      uuObject = await this.locationDao.setState(uuObject);
    } catch (e) {
      throw new Errors.SetState.LocationDAOUpdateByAwidFailed({ uuAppErrorMap }, { cause: { ...e } });
    }

    // HDS 5
    return {
      ...uuObject,
      uuAppErrorMap,
    };
  }

  async delete(awid, dtoIn, uuAppErrorMap = {}) {
    const uuTodosMain = await this.mainDao.getByAwid(awid);
    if (!uuTodosMain) {
      throw new Errors.Delete.uuTravelAppDoesNotExist({ uuAppErrorMap }, { awid });
    }
    if (uuTodosMain.state !== "active") {
      throw new Errors.Delete.uuTravelAppIsNotInCorrectState(
        { uuAppErrorMap },
        { expectedState: "active", awid, currentState: uuTodosMain.state }
      );
    }

    let validationResult = this.validator.validate("locationDeleteDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    const uuLocation = await this.locationDao.get(awid, dtoIn.id);
    if (!uuLocation) {
      throw new Errors.Delete.LocationDoesNotExist({ uuAppErrorMap }, { id: dtoIn.listId });
    }

    if (uuLocation.state == "closed") {
      throw new Errors.Delete.LocationIsInWrongState({ uuAppErrorMap }, { id: dtoIn.listId });
    }

    let uuObject = { ...dtoIn, awid };
    uuObject = await this.locationDao.remove(uuObject);

    return {
      ...uuObject,
    };
  }

  async update(awid, dtoIn, uuAppErrorMap = {}) {
    const uuTodosMain = await this.mainDao.getByAwid(awid);
    if (!uuTodosMain) {
      throw new Errors.Update.uuTravelAppDoesNotExist({ uuAppErrorMap }, { awid });
    }
    if (uuTodosMain.state !== "active") {
      throw new Errors.Update.uuTravelAppIsNotInCorrectState(
        { uuAppErrorMap },
        { expectedState: "active", awid, currentState: uuTodosMain.state }
      );
    }

    let validationResult = this.validator.validate("locationUpdateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    // HDS 3 Loads the location uuObject from the uuAppObjectStore by id (through the location DAO get).
    const uuLocation = await this.locationDao.get(awid, dtoIn.id);
    if (!uuLocation) {
      throw new Errors.Update.LocationDoesNotExist({ uuAppErrorMap }, { id: dtoIn.listId });
    }

    // HDS 4 Checks that location is in "active" state.
    if (uuLocation.state !== "active") {
      throw new Errors.Update.LocationIsNotInCorrectState(
        { uuAppErrorMap },
        { state: uuLocation.state, expectedStateList: "active" }
      );
    }

    // HDS 5 Checked dtoIn is saved to the uuAppObjectStore (through the location DAO update).
    let uuObject = { ...dtoIn, awid };
    try {
      uuObject = await this.locationDao.update(uuObject);
    } catch (e) {
      throw new Errors.Update.ListDoesNotExist({ uuAppErrorMap }, { cause: e });
    }

    return {
      uuObject,
    };
  }

  async get(awid, dtoIn, uuAppErrorMap = {}) {
    const uuTodosMain = await this.mainDao.getByAwid(awid);
    if (!uuTodosMain) {
      throw new Errors.Get.uuTravelAppDoesNotExist({ uuAppErrorMap }, { awid });
    }
    if (uuTodosMain.state !== "active") {
      throw new Errors.Get.uuTravelAppIsNotInCorrectState(
        { uuAppErrorMap },
        { expectedState: "active", awid, currentState: uuTodosMain.state }
      );
    }
    // HDS 2 System checks existence and state of the todoInstance uuObject.
    let validationResult = this.validator.validate("locationGetDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );
    // HDS 3   System gets uuObject item from uuAppObjectStore (using item DAO get with awid and dtoIn.id).
    const uuLocation = await this.locationDao.getById(awid, dtoIn.id);
    if (!uuLocation) {
      throw new Errors.Get.LocationDoesNotExist({ uuAppErrorMap }, { locationId: dtoIn.listId });
    }
    // HDS 4 Returns properly filled dtoOut.
    return {
      ...uuLocation,
      uuAppErrorMap,
    };
  }

  async create(awid, dtoIn, uuAppErrorMap = {}) {
    const uuTravelMain = await this.mainDao.getByAwid(awid);

    if (!uuTravelMain) {
      throw new Errors.Create.TravelDoesNotExist({ uuAppErrorMap }, { awid });
    }

    if (uuTravelMain.state !== "active") {
      throw new Errors.Create.TravelIsNotInCorrectState(
        { uuAppErrorMap },
        { expectedState: "active", awid, currentState: uuTravelMain.state }
      );
    }

    // HDS 2 System checks existence and state of the todoInstance uuObject.

    let validationResult = this.validator.validate("locationCreateDtoInType", dtoIn);
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.unsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );
    // HDS 4 System creates uuObject list in uuAppObjectStore (using list DAO create).
    let locationImage;
    if (dtoIn.image) {
      try {
        locationImage = await this.imageDao.create({ awid }, dtoIn.image);
      } catch (e) {
        if (e instanceof BinaryStoreError) {
          // A3
          throw new Errors.Create.CreateLocationError({ uuAppErrorMap }, e);
        }
        throw e;
      }
      dtoIn.image = locationImage.code;
    }
    const uuObject = { awid, ...dtoIn };
    let uuLocation = null;
    try {
      uuLocation = await this.locationDao.create(uuObject);
    } catch (e) {
      throw new Errors.Create.CreateLocationError({ uuAppErrorMap }, { cause: e });
    }

    // HDS 5 Returns properly filled dtoOut.
    return {
      ...uuLocation,
      uuAppErrorMap,
    };
  }
}

module.exports = new LocationAbl();

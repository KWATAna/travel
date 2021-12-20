"use strict";
const LocationAbl = require("../../abl/location-abl.js");

class LocationController {
  list(ucEnv) {
    return LocationAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  setState(ucEnv) {
    return LocationAbl.setState(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    return LocationAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  update(ucEnv) {
    return LocationAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return LocationAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return LocationAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }
  async getImageData(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let dtoOut = await LocationAbl.getImageData(ucEnv.getUri().getAwid(), dtoIn);
    return ucEnv.setBinaryDtoOut(dtoOut, dtoIn.contentDisposition);
  }
}

module.exports = new LocationController();

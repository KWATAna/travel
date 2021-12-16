"use strict";
const TripAbl = require("../../abl/trip-abl.js");

class TripController {

  update(ucEnv) {
    return TripAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  setState(ucEnv) {
    return TripAbl.setState(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    return TripAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return TripAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return TripAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new TripController();

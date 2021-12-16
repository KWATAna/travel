"use strict";
const TravelMainAbl = require("../../abl/travel-main-abl.js");

class TravelMainController {
  init(ucEnv) {
    return TravelMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new TravelMainController();

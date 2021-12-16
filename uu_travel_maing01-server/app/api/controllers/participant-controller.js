"use strict";
const ParticipantAbl = require("../../abl/participant-abl.js");

class ParticipantController {

  update(ucEnv) {
    return ParticipantAbl.update(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  list(ucEnv) {
    return ParticipantAbl.list(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  setState(ucEnv) {
    return ParticipantAbl.setState(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return ParticipantAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return ParticipantAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new ParticipantController();

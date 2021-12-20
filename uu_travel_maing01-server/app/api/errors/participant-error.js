"use strict";

const TravelMainUseCaseError = require("./travel-main-use-case-error.js");
const PARTICIPANT_ERROR_PREFIX = `${TravelMainUseCaseError.ERROR_PREFIX}participant/`;

const Create = {
  UC_CODE: `${PARTICIPANT_ERROR_PREFIX}create/`,
  InvalidDtoIn: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  uuTravelAppDoesNotExist: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}uuTravelAppDoesNotExist`;
      this.message = "uuTravelApp does not exist.";
    }
  },

  uuTravelAppIsNotInCorrectState: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}uuTravelAppIsNotInCorrectState	`;
      this.message = "uuTravelApp is not in correct state.";
    }
  },
  ParticipantDaoCreateFailed: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}participantDaoCreateFailed	`;
      this.message = "participantDaoCreateFailed";
    }
  },
};

const Get = {
  UC_CODE: `${PARTICIPANT_ERROR_PREFIX}get/`,
  InvalidDtoIn: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  uuTravelAppDoesNotExist: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}uuTravelAppDoesNotExist`;
      this.message = "uuTravelApp does not exist.";
    }
  },

  uuTravelAppIsNotInCorrectState: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}uuTravelAppIsNotInCorrectState	`;
      this.message = "uuTravelApp is not in correct state.";
    }
  },
  ParticipantDoesNotExist: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}participantDoesNotExist`;
      this.message = "Participant does not exist.";
    }
  },
};

const SetState = {
  UC_CODE: `${PARTICIPANT_ERROR_PREFIX}setState/`,
  InvalidDtoIn: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  uuTravelAppDoesNotExist: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}uuTravelAppDoesNotExist`;
      this.message = "uuTravelApp does not exist.";
    }
  },

  uuTravelAppIsNotInCorrectState: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}uuTravelAppIsNotInCorrectState	`;
      this.message = "uuTravelApp is not in correct state.";
    }
  },
  ParticipantDoesNotExist: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}participantDoesNotExist`;
      this.message = "Participant does not exist.";
    }
  },
  ParticipantDAOUpdateByAwidFailed: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}participantDAOUpdateByAwidFailed		`;
      this.message = "Participant DAO updateByAwid failed.";
    }
  },
};

const List = {
  UC_CODE: `${PARTICIPANT_ERROR_PREFIX}list/`,
  InvalidDtoIn: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  uuTravelAppDoesNotExist: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}uuTravelAppDoesNotExist`;
      this.message = "uuTravelApp does not exist.";
    }
  },

  uuTravelAppIsNotInCorrectState: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}uuTravelAppIsNotInCorrectState	`;
      this.message = "uuTravelApp is not in correct state.";
    }
  },
};

const Update = {
  UC_CODE: `${PARTICIPANT_ERROR_PREFIX}update/`,
  InvalidDtoIn: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  uuTravelAppDoesNotExist: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}uuTravelAppDoesNotExist`;
      this.message = "uuTravelApp does not exist.";
    }
  },

  uuTravelAppIsNotInCorrectState: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}uuTravelAppIsNotInCorrectState`;
      this.message = "uuTravelApp is not in correct state.";
    }
  },
  ParticipantDoesNotExist: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}participantDoesNotExist`;
      this.message = "Participant does not exist";
    }
  },
  ParticipantIsNotInCorrectState: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}participantIsNotInCorrectState`;
      this.message = "Participant is not in correct state";
    }
  },
  ParticipantDaoUpdateFailed: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}participantDaoUpdateFailed`;
      this.message = "Update participant by participant Dao update failed.";
    }
  },
};

module.exports = {
  Update,
  List,
  SetState,
  Get,
  Create,
};

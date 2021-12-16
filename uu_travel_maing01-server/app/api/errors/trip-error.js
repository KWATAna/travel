"use strict";

const TravelMainUseCaseError = require("./travel-main-use-case-error.js");
const TRIP_ERROR_PREFIX = `${TravelMainUseCaseError.ERROR_PREFIX}trip/`;

const Create = {
  UC_CODE: `${TRIP_ERROR_PREFIX}create/`,
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
      this.message = "Travel does not exist.";
    }
  },

  uuTravelAppIsNotInCorrectState: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}uuTravelAppIsNotInCorrectState`;
      this.message = "Travel is not in correct state.";
    }
  },
  LocationDoesNotExist: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}LocationDoesNotExist`;
      this.message = "Location does not exist.";
    }
  },
  TripDaoCreateFailed: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}tripDaoCreateFailed`;
      this.message = "Create trip by trip DAO create failed.";
    }
  },
};

const Get = {
  UC_CODE: `${TRIP_ERROR_PREFIX}get/`,
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
      this.message = "Travel does not exist.";
    }
  },

  uuTravelAppIsNotInCorrectState: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}uuTravelAppIsNotInCorrectState`;
      this.message = "Travel is not in correct state.";
    }
  },
  TripDoesNotExist: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}tripDoesNotExist`;
      this.message = "Trip does not exist.";
    }
  },
};

const Delete = {
  UC_CODE: `${TRIP_ERROR_PREFIX}delete/`,
  InvalidDtoIn: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  uuTravelAppDoesNotExist: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}uuTravelAppDoesNotExist`;
      this.message = "Travel does not exist.";
    }
  },

  uuTravelAppIsNotInCorrectState: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}uuTravelAppIsNotInCorrectState`;
      this.message = "Travel is not in correct state.";
    }
  },
  TripDoesNotExist: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}tripDoesNotExist`;
      this.message = "Trip does not exist.";
    }
  },
  TheTripHasParticipants: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}TheTripHasParticipants`;
      this.message = "The trip has participants";
    }
  },
};

const SetState = {
  UC_CODE: `${TRIP_ERROR_PREFIX}setState/`,

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
      this.message = "Travel does not exist.";
    }
  },

  uuTravelAppIsNotInCorrectState: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}uuTravelAppIsNotInCorrectState`;
      this.message = "Travel is not in correct state.";
    }
  },
  TripDoesNotExist: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}tripDoesNotExist`;
      this.message = "Trip does not exist.";
    }
  },
  TripDAOUpdateByAwidFailed: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}tripDAOUpdateByAwidFailed`;
      this.message = "trip DAO updateByAwid failed.";
    }
  },
};

const Update = {
  UC_CODE: `${TRIP_ERROR_PREFIX}update/`,
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
      this.message = "Travel does not exist.";
    }
  },

  uuTravelAppIsNotInCorrectState: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}uuTravelAppIsNotInCorrectState`;
      this.message = "Travel is not in correct state.";
    }
  },
  TripDoesNotExist: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}tripDoesNotExist`;
      this.message = "Trip does not exist.";
    }
  },
  TripDAOUpdateByAwidFailed: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}tripDAOUpdateByAwidFailed`;
      this.message = "trip DAO updateByAwid failed.";
    }
  },
  TripIsNotInCorrectState: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}tripIsNotInCorrectState`;
      this.message = "Trip is not in correct state";
    }
  },
};

module.exports = {
  Update,
  SetState,
  Delete,
  Get,
  Create,
};

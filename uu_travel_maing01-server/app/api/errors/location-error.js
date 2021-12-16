"use strict";

const TravelMainUseCaseError = require("./travel-main-use-case-error.js");
const LOCATION_ERROR_PREFIX = `${TravelMainUseCaseError.ERROR_PREFIX}location/`;

const Create = {
  UC_CODE: `${LOCATION_ERROR_PREFIX}create/`,
  InvalidDtoIn: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  TravelDoesNotExist: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}TravelDoesNotExist`;
      this.message = "Travel does not exist.";
    }
  },

  TravelIsNotInCorrectState: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}TravelIsNotInCorrectState`;
      this.message = "Travel is not in correct state.";
    }
  },
  CreateLocationError: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}TravelLocationCreateError`;
      this.message = "Couldn't create location.";
    }
  },
};

const Get = {
  UC_CODE: `${LOCATION_ERROR_PREFIX}get/`,
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

  LocationDoesNotExist: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}locationDoesNotExist	`;
      this.message = "Location does not exist.";
    }
  },
};

const Update = {
  UC_CODE: `${LOCATION_ERROR_PREFIX}update/`,
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
  InvalidDtoIn: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  LocationDoesNotExist: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}locationDoesNotExist	`;
      this.message = "Location does not exist.";
    }
  },
  LocationIsNotInCorrectState: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}locationIsNotInCorrectState`;
      this.message = "Location is not in correct state.";
    }
  },
  LocationDaoUpdateFailed: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}locationDaoUpdateFailed`;
      this.message = "Update location by location Dao update failed.";
    }
  },
};

const Delete = {
  UC_CODE: `${LOCATION_ERROR_PREFIX}delete/`,
  uuTravelAppDoesNotExist: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}uuTravelAppDoesNotExist`;
      this.message = "uuTravelApp does not exist.";
    }
  },

  uuTravelAppIsNotInCorrectState: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}uuTravelAppIsNotInCorrectState`;
      this.message = "uuTravelApp is not in correct state.";
    }
  },
  InvalidDtoIn: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  LocationDoesNotExist: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}locationDoesNotExist`;
      this.message = "Location does not exist.";
    }
  },
  LocationIsInWrongState: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}locationIsInWrongState`;
      this.message = "The location is in the wrong state.";
    }
  },
};

const SetState = {
  UC_CODE: `${LOCATION_ERROR_PREFIX}setState/`,
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
      this.code = `${SetState.UC_CODE}uuTravelAppIsNotInCorrectState`;
      this.message = "uuTravelApp is not in correct state.";
    }
  },
  InvalidDtoIn: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  LocationDoesNotExist: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}locationDoesNotExist`;
      this.message = "Location does not exist.";
    }
  },
  LocationDAOUpdateByAwidFailed: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}locationDAOUpdateByAwidFailed`;
      this.message = "Location DAO updateByAwid failed.";
    }
  },
};

const List = {
  UC_CODE: `${LOCATION_ERROR_PREFIX}list/`,
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
      this.code = `${List.UC_CODE}uuTravelAppIsNotInCorrectState`;
      this.message = "uuTravelApp is not in correct state.";
    }
  },
  InvalidDtoIn: class extends TravelMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

module.exports = {
  List,
  SetState,
  Delete,
  Update,
  Get,
  Create,
};

"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class ParticipantMongo extends UuObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, _id: 1 }, { unique: true });
  }

  async create(uuObject) {
    return await super.insertOne({ ...uuObject, state: "active" });
  }

  async get(awid, id) {
    let filter = {
      awid: awid,
      id: id,
    };
    return await super.findOne(filter);
  }

  async update(uuObject) {
    let filter = {
      awid: uuObject.awid,
      id: uuObject.id,
    };
    return await super.findOneAndUpdate(filter, uuObject, "NONE");
  }
  async getById(awid, id) {
    let filter = {
      awid: awid,
      id: id,
    };
    return await super.findOne(filter);
  }
  async remove(uuObject) {
    let filter = {
      awid: uuObject.awid,
      id: uuObject.id,
    };
    return await super.deleteOne(filter);
  }
  async listByParticipantIdList(uuObject) {
    let filter = {
      awid: uuObject.awid,
      id: uuObject.id,
    };
    return await super.deleteOne(filter);
  }
  async list(filter, pageInfo = {}) {
    return await super.find(filter, pageInfo);
  }
}

module.exports = ParticipantMongo;

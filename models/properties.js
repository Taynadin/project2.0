// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var properties = {
    all: function(query, cb) {
      orm.selectAll("properties", query, function(res) {
        cb(res);
      });
    },
    one: function(id, cb) {
      orm.selectOne("properties", id, function(res) {
        cb(res);
      });
    },
    create: function(cols, vals, cb) {
      orm.insertOne("properties", cols, vals, function(res) {
        cb(res);
      });
    },
    update: function(objColVals, condition, cb) {
      orm.updateOne("properties", objColVals, condition, function(res) {
        cb(res);
      });
    }
  };

module.exports = properties;
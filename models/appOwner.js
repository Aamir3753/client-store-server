const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const localMongoose = require("passport-local-mongoose");

const appOwnerSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

appOwnerSchema.plugin(localMongoose);
const AppOwners = mongoose.model("AppOwner", appOwnerSchema);
module.exports = AppOwners;

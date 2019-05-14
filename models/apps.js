const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const appsSchcema = new Schema(
  {
    appName: {
      type: String,
      required: true
    },
    appUrl: {
      type: String,
      required: true
    },
    appImage: {
      type: String
    },
    isVarified: {
      type: Boolean,
      default: false
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'AppOwner',
      required:true
    }
  },
  { timestamps: true }
);

const Apps = mongoose.model("App", appsSchcema);

module.exports = Apps;

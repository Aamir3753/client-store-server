const mongoose = require("mongoose");
const localMongoose = require("passport-local-mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  role:{
      type:String,
      required:true
  }
});

userSchema.plugin(localMongoose);

const Users = mongoose.model("User", userSchema);
module.exports = Users;


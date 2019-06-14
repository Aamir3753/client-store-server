const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  cnic: {
    type: Number,
    required: true
  }
});

const Teachers = mongoose.model("Teacher", teacherSchema);
module.exports = Teachers;
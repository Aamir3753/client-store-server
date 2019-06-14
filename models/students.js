const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendanceSchema = new Schema(
  {
    atdString: {
      type: String,
      required: true,
      unique: true
    }
  },
  { timestamps: true }
);

const studentSchema = new Schema({
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
  },
  enrollNo: {
    type: Number,
    required: true
  },
  attendance: {
    type: [attendanceSchema]
  }
});

const Students = mongoose.model("Student", studentSchema);
module.exports = Students;

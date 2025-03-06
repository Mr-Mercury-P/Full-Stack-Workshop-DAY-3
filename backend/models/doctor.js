const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    designation: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, unique: true, trim: true },
    specialization: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;

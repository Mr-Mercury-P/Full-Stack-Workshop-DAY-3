const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema(
    {
        patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        doctorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Doctor",
            required: true,
            index: true,
        },
        date: {
            type: Date,
            required: true,
            validate: {
                validator: function (value) {
                    return value >= new Date();
                },
                message: "Appointment date must be in the future.",
            },
        },
        time: {
            type: String,
            required: true,
            match: [/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)"],
        },
        status: {
            type: String,
            enum: ["Pending", "Confirmed", "Cancelled", "Completed"],
            default: "Pending",
        },
        notes: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

appointmentSchema.virtual("formattedDateTime").get(function () {
    return `${this.date.toDateString()} at ${this.time}`;
});

appointmentSchema.pre("save", function (next) {
    next();
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;

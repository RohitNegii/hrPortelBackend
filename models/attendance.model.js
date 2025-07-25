import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    date: {
      type: Date,
      default: () => new Date().setHours(0, 0, 0, 0), // Ensure daily unique
    },
    status: {
      type: String,
      enum: ["Present", "Absent", "Medical Leave", "Work From Home"],
      default: "Present",
    },
  },
  { timestamps: true }
);

attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;

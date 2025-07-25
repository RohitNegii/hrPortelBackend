import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    department: String,
    position: {
      type: String,
      enum: ["Intern", "Full Time", "Junior", "Senior", "Team Lead"],
    },
    experience: String,
    dateOfJoining: Date,
    resumeUrl: String,
    status: { type: String, default: "present" },
    role: { type: String, default: "employee" },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;

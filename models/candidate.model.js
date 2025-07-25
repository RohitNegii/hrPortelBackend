import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  position: String,
  experience: String,
  resumeUrl: String,
  status: { type: String, default: "pending" }, 
});

const Candidate = mongoose.model("Candidate", candidateSchema);
export default Candidate;

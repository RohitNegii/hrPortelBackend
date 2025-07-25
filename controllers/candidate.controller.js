import Candidate from "../models/candidate.model.js";
import multer from "multer";
import path from "path";
import Employee from "../models/employee.model.js";

export const createCandidate = async (req, res) => {
  try {
    const { name, email, phone, position, experience } = req.body;
    const resumeUrl = req.file?.path; 
    const candidate = await Candidate.create({
      name,
      email,
      phone,
      position,
      experience,
      resumeUrl,
    });
    res.status(201).json(candidate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCandidates = async (req, res) => {
  try {
    const { search = "", position = "", status = "" } = req.query;
    const filter = {
      name: { $regex: search, $options: "i" },
      ...(position && { position }),
      ...(status && { status }),
    };
    const candidates = await Candidate.find(filter);
    res.json(candidates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const downloadResume = async (req, res) => {
  const { resumeUrl } = req.query;
  res.download(resumeUrl);
};


export const selectCandidate = async (req, res) => {
  try {
    const { id } = req.params;

    const candidate = await Candidate.findById(id);

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    if (candidate.status === "selected") {
      return res
        .status(400)
        .json({ message: "Candidate already selected as employee" });
    }

    const existingEmployee = await Employee.findOne({ email: candidate.email });

    if (existingEmployee) {
      return res
        .status(400)
        .json({ message: "Employee with this email already exists" });
    }

    candidate.status = "selected";
    await candidate.save();

    const newEmployee = new Employee({
      name: candidate.name,
      email: candidate.email,
      phone: candidate.phone,
      position: candidate.position,
      experience: candidate.experience,
      resumeUrl: candidate.resumeUrl,
      status: "present",
      role: "employee",
    });

    await newEmployee.save();

    res.status(200).json({
      message: "Candidate selected and moved to employee list",
      candidate,
      employee: newEmployee,
    });
  } catch (err) {
    console.error("Error selecting candidate:", err);
    res.status(500).json({ error: err.message });
  }
};

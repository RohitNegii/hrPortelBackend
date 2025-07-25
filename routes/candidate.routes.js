import express from "express";
import {
  createCandidate,
  getCandidates,
  downloadResume,
  selectCandidate,
} from "../controllers/candidate.controller.js"
import upload from "../middleware/upload.js";

const candidateRoutes = express.Router();

candidateRoutes.post("/", upload.single("resume"), createCandidate);
candidateRoutes.get("/", getCandidates);
candidateRoutes.get("/download", downloadResume);
candidateRoutes.patch("/select/:id", selectCandidate);

export default candidateRoutes;

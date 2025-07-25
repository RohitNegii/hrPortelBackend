import express from "express";
import {
  getLeaves,
  addLeave,
  updateLeaveStatus,
  getApprovedLeaves,
  getPresentEmployees,
} from "../controllers/leave.controller.js"
import upload from "../middleware/upload.js";

const leaveRoutes = express.Router();

leaveRoutes.get("/", getLeaves);
leaveRoutes.post("/", upload.single("doc"), addLeave);
leaveRoutes.patch("/:id", updateLeaveStatus);
leaveRoutes.get("/approved", getApprovedLeaves);
leaveRoutes.get("/employee", getPresentEmployees);


export default leaveRoutes;

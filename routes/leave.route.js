import express from "express";
import {
  getLeaves,
  addLeave,
  updateLeaveStatus,
  getApprovedLeaves,
  getPresentEmployees,
} from "../controllers/leave.controller.js"

const leaveRoutes = express.Router();

leaveRoutes.get("/", getLeaves);
leaveRoutes.post("/", addLeave);
leaveRoutes.put("/:id", updateLeaveStatus);
leaveRoutes.get("/approved", getApprovedLeaves);
leaveRoutes.get("/employee", getPresentEmployees);


export default leaveRoutes;

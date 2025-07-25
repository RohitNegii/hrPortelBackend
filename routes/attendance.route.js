import express from "express";
import {
  getAttendance,
  updateAttendance,
} from "../controllers/attendance.controller.js"

const attendanceRoutes = express.Router();

attendanceRoutes.get("/", getAttendance);
attendanceRoutes.put("/:id", updateAttendance);

export default attendanceRoutes;

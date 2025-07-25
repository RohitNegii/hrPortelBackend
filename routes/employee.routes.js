import express from "express";
import {
  getEmployees,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller.js"

const employeeRoutes = express.Router();

employeeRoutes.get("/", getEmployees);
employeeRoutes.put("/:id", updateEmployee);
employeeRoutes.delete("/:id", deleteEmployee);

export default employeeRoutes;

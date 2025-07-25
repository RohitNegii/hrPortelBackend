import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import candidateRoutes from "./routes/candidate.routes.js"
import employeeRoutes from "./routes/employee.routes.js";
import attendanceRoutes from "./routes/attendance.route.js";
import leaveRoutes from "./routes/leave.route.js"

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);





export default app;

import Attendance from "../models/attendance.model.js"
import Employee from "../models/employee.model.js"



export const getAttendance = async (req, res) => {
  try {
    const { search = "", status = "" } = req.query;
    const dateToday = new Date().setHours(0, 0, 0, 0);

    const employees = await Employee.find({
      status: "present",
      $or: [
        { name: { $regex: search, $options: "i" } },
        { position: { $regex: search, $options: "i" } },
      ],
    });

    if (!employees.length) return res.json([]);

    const employeeIds = employees.map((e) => e._id);

    const attendanceRecords = await Attendance.find({
      employeeId: { $in: employeeIds },
      date: dateToday,
      ...(status ? { status } : {}),
    });

    const attendanceMap = new Map();
    attendanceRecords.forEach((record) => {
      attendanceMap.set(record.employeeId.toString(), record.status);
    });

    const result = employees
      .map((emp) => {
        const attendanceStatus = attendanceMap.get(emp._id.toString());

        if (status && attendanceStatus !== status) return null;

        return {
          _id: emp._id,
          name: emp.name,
          email: emp.email,
          phone: emp.phone,
          position: emp.position,
          department: emp.department || "--",
          task: emp.task || "--",
          status: attendanceStatus || "Present",
        };
      })
      .filter(Boolean); // Remove null entries

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching attendance:", error);
    res.status(500).json({ error: error.message });
  }
};



export const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const dateToday = new Date().setHours(0, 0, 0, 0);

    const updated = await Attendance.findOneAndUpdate(
      { employeeId: id, date: dateToday },
      { status },
      { upsert: true, new: true }
    );

    res.json({ message: "Attendance updated", attendance: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

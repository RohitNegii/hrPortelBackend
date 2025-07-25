import Leave from "../models/leave.modal.js"
import Employee from "../models/employee.model.js"

export const getLeaves = async (req, res) => {
  try {
    const { search = "", status = "" } = req.query;

    const employees = await Employee.find({
      status: "present",
      name: { $regex: search, $options: "i" },
    });

    const employeeIds = employees.map((e) => e._id);

    const leaves = await Leave.find({
      employeeId: { $in: employeeIds },
      ...(status && { status }),
    })
      .populate("employeeId")
      .sort({ date: -1 });

    res.json(leaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addLeave = async (req, res) => {
  try {
    const { employeeId, date, reason, docUrl } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee || employee.status !== "present") {
      return res
        .status(400)
        .json({ message: "Employee not eligible for leave" });
    }

    const newLeave = new Leave({ employeeId, date, reason, docUrl });
    await newLeave.save();

    res.status(201).json({ message: "Leave applied", leave: newLeave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const leave = await Leave.findByIdAndUpdate(id, { status }, { new: true });
    if (!leave) return res.status(404).json({ message: "Leave not found" });

    res.json({ message: "Leave status updated", leave });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getApprovedLeaves = async (req, res) => {
  try {
    const approved = await Leave.find({ status: "Approved" }).populate(
      "employeeId"
    );
    res.json(approved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getPresentEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({ status: "present" }).select(
      "name _id"
    );
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};
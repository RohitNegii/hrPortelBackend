import Employee from "../models/employee.model.js";

export const getEmployees = async (req, res) => {
  try {
    const { search = "", status } = req.query;


    const query = search?{
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { position: { $regex: search, $options: "i" } },
      ],
    }:{};

    if (status) {
      query.position = status;
    }

    console.log(query);
    const employees = await Employee.find(query).sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error });
  }
};



export const updateEmployee = async (req, res) => {
    console.log(req.body)
  try {
    const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Employee not found" });

    res.json({ message: "Employee updated", employee: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error });
  }
};

// DELETE
export const deleteEmployee = async (req, res) => {
  try {
    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Employee not found" });

    res.json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error });
  }
};

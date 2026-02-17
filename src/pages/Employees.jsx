import { useState } from "react";

export const Employees = () => {
  const [employees, setEmployees] = useState([
    {
      name: "Shrenik khule",
      designation: "Web Application Developer",
      empId: "00395",
      mobile: "7378507919",
      bloodGroup: "AB+",
      address: "At Post Aurangabad",
    },
    {
      name: "Rahul Gandhi",
      designation: "Indain Congress Party",
      empId: "9203",
      mobile: "7378507919",
      bloodGroup: "AB+",
      address: "At Post Mumbai",
    },
    {
      name: "Narendra Modi",
      designation: "Prime Minister of India",
      empId: "00012",
      mobile: "7378507919",
      bloodGroup: "zz+",
      address: "At Post Gujrat",
    },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const [formData, setFormData] = useState({
    name: "Shrenik khule",
    designation: "Web Application Developer",
    empId: "00395",
    mobile: "7378507919",
    bloodGroup: "AB+",
    address: "At Post Aurangabad",
    photo: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        photo: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.designation) return;

    if (editIndex !== null) {
      const updated = [...employees];
      updated[editIndex] = formData;
      setEmployees(updated);
      setEditIndex(null);
    } else {
      setEmployees([...employees, formData]);
    }

    setFormData({
      name: "Shrenik khule",
      designation: "Web Application Developer",
      empId: "00395",
      mobile: "7378507919",
      bloodGroup: "AB+",
      address: "At Post Aurangabad",
      photo: "",
    });

    setShowAddModal(false);
  };

  const handleEdit = (emp, index) => {
    setFormData(emp);
    setEditIndex(index);
    setShowAddModal(true);
  };

  const handleDelete = (index) => {
    const updated = employees.filter((_, i) => i !== index);
    setEmployees(updated);
  };

  const openProfile = (emp) => {
    setSelectedEmployee(emp);
    setShowProfileModal(true);
  };

  return (
    <div className="p-6">
   
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Employees</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700"
        >
          + Add Employee
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Photo</th>
              <th>Name</th>
              <th>Designation</th>
              <th>Employee ID</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp, index) => (
              <tr
                key={index}
                className="border-b hover:bg-gray-50 cursor-pointer"
                onClick={() => openProfile(emp)}
              >
                <td className="py-2">
                  <img
                    src={emp.photo || "https://via.placeholder.com/40"}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td>{emp.name}</td>
                <td>{emp.designation}</td>
                <td>{emp.empId}</td>

                <td onClick={(e) => e.stopPropagation()} className="space-x-2">
                  <button
                    onClick={() => handleEdit(emp, index)}
                    className="bg-yellow-400 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-4">
              {editIndex !== null ? "Edit Employee" : "Add Employee"}
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                name="name"
                placeholder="Employee Name"
                value={formData.name}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <input
                name="designation"
                placeholder="Designation"
                value={formData.designation}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <input
                name="empId"
                placeholder="Employee ID"
                value={formData.empId}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <input
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <input
                name="bloodGroup"
                placeholder="Blood Group"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <input
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="border p-2 rounded"
              />

              <input type="file" onChange={handlePhoto} />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showProfileModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl text-center">
            <img
              src={selectedEmployee.photo || "https://via.placeholder.com/100"}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />

            <h2 className="text-xl font-bold">{selectedEmployee.name}</h2>
            <p className="text-gray-500 mb-4">{selectedEmployee.designation}</p>

            <div className="text-left space-y-2">
              <p>
                <b>Employee ID:</b> {selectedEmployee.empId}
              </p>
              <p>
                <b>Mobile:</b> {selectedEmployee.mobile}
              </p>
              <p>
                <b>Blood Group:</b> {selectedEmployee.bloodGroup}
              </p>
              <p>
                <b>Address:</b> {selectedEmployee.address}
              </p>
            </div>

            <button
              onClick={() => setShowProfileModal(false)}
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

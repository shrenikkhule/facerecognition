import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
export const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editId, setEditId] = useState(null);
  let isSubmitting = false;
  const [formData, setFormData] = useState({});
  const getEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/employees", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setEmployees(data.data);
    } catch (error) {
      console.log(error, "Check if the token is actually there!");
    }
  };
  useEffect(() => {
    getEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData({
        ...formData,
        profilePhoto: file,
        preview: URL.createObjectURL(file),
      });
    }
  };

  const openProfile = (emp) => {
    setSelectedEmployee(emp);
    setShowProfileModal(true);
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.designation) {
      toast.error("Name and Designation are required ⚠️");
      return;
    }

    const data = new FormData();

    data.append("employeeName", formData.name);
    data.append("designation", formData.designation);
    data.append("employeeId", formData.empId);
    data.append("mobileNumber", formData.mobile);
    data.append("bloodGroup", formData.bloodGroup);
    data.append("address", formData.address);

    if (formData.profilePhoto) {
      data.append("profilePhoto", formData.profilePhoto);
    }

    const loadingToast = toast.loading(
      editId ? "Updating Employee..." : "Adding Employee...",
    );

    try {
      const url = editId
        ? `http://localhost:5000/api/employees/${editId}`
        : "http://localhost:5000/api/employees";

      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: data,
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Something went wrong");
      }
      toast.dismiss(loadingToast);
      toast.success(
        editId
          ? "Employee Updated Successfully 🎉"
          : "Employee Added Successfully 🎉",
      );
      getEmployees();
      setEditId(null);
      setShowAddModal(false);

      setFormData({
        name: "",
        designation: "",
        empId: "",
        mobile: "",
        bloodGroup: "",
        address: "",
        profilePhoto: null,
      });
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error(err.message || "Operation Failed ❌");
    }
  };
  const handleEdit = (emp) => {
    setFormData({
      name: emp.employeeName,
      designation: emp.designation,
      empId: emp.employeeId,
      mobile: emp.mobileNumber,
      bloodGroup: emp.bloodGroup,
      address: emp.address,
      profilePhoto: null,
    });

    setEditId(emp._id);
    setShowAddModal(true);
  };
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Employee?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it",
      backdrop: `
      rgba(0,0,0,0.7)
      left top
      no-repeat`,
      showClass: { popup: "animate__animated animate__zoomIn" },
      hideClass: { popup: "animate__animated animate__zoomOut" },
    });
    if (result.isConfirmed) {
      try {
        Swal.fire({
          title: "Deleting...",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const res = await fetch(`http://localhost:5000/api/employees/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Employee removed successfully.",
          timer: 1500,
          showConfirmButton: false,
        });

        setEmployees((prev) => prev.filter((emp) => emp._id !== id));
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message || "Something went wrong!",
        });
      }
    }
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
                    src={`http://localhost:5000/uploads/employees/${emp.profilePhoto}`}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td>{emp.employeeName}</td>
                <td>{emp.designation}</td>
                <td>{emp.employeeId}</td>

                <td onClick={(e) => e.stopPropagation()} className="space-x-2">
                  <button
                    onClick={() => handleEdit(emp, index)}
                    className="bg-yellow-400 px-3 py-1 rounded cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(emp._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
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
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-white w-full max-w-xl p-8 rounded-3xl shadow-2xl transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {editId ? "Edit Employee" : "Add Employee"}
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-red-500 text-xl"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="name"
                placeholder="Employee Name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl outline-none transition"
              />
              <input
                name="designation"
                placeholder="Designation"
                value={formData.designation}
                onChange={handleChange}
                className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl outline-none transition"
              />
              <input
                name="empId"
                placeholder="Employee ID"
                value={formData.empId}
                onChange={handleChange}
                className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl outline-none transition"
              />
              <input
                name="mobile"
                placeholder="Mobile Number"
                value={formData.mobile}
                onChange={handleChange}
                className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl outline-none transition"
              />
              <input
                name="bloodGroup"
                placeholder="Blood Group"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl outline-none transition"
              />
              <input
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 p-3 rounded-xl outline-none transition"
              />
              <div className="col-span-1 md:col-span-2">
                <input
                  type="file"
                  name="profilePhoto"
                  accept="image/*"
                  onChange={handlePhoto}
                  className="w-full border border-gray-300 p-3 rounded-xl cursor-pointer"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-xl text-white font-semibold transition ${
                  isSubmitting
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isSubmitting
                  ? "Processing..."
                  : editId
                    ? "Update Employee"
                    : "Add Employee"}
              </button>
            </div>
          </div>
        </div>
      )}
      {showProfileModal && selectedEmployee && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-6 rounded-2xl text-center">
            <img
              src={`http://localhost:5000/uploads/employees/${selectedEmployee.profilePhoto}`}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h2 className="text-xl font-bold">
              {selectedEmployee.employeeName}
            </h2>
            <p className="text-gray-500 mb-4">{selectedEmployee.designation}</p>

            <div className="text-left space-y-2">
              <p>
                <b>Employee ID:</b> {selectedEmployee.employeeId}
              </p>
              <p>
                <b>Mobile:</b> {selectedEmployee.mobileNumber}
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

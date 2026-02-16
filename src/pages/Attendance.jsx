import React from "react";

export const Attendance = () => {
  const attendanceData = [
    {
      id: 1,
      name: "Rahul Sharma",
      date: "16 Feb 2026",
      checkIn: "09:10 AM",
      checkOut: "06:05 PM",
      status: "Present",
    },
    {
      id: 2,
      name: "Priya Patel",
      date: "16 Feb 2026",
      checkIn: "09:45 AM",
      checkOut: "06:00 PM",
      status: "Late",
    },
    {
      id: 3,
      name: "Amit Verma",
      date: "16 Feb 2026",
      checkIn: "--",
      checkOut: "--",
      status: "Absent",
    },
  ];

  const getStatusStyle = (status) => {
    if (status === "Present") return "bg-green-100 text-green-700";
    if (status === "Late") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Attendance Management
        </h1>

        <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition">
          Export Report
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-4">
        <input type="date" className="border rounded-lg px-4 py-2" />

        <select className="border rounded-lg px-4 py-2">
          <option>All Status</option>
          <option>Present</option>
          <option>Late</option>
          <option>Absent</option>
        </select>

        <input
          type="text"
          placeholder="Search Employee..."
          className="border rounded-lg px-4 py-2 flex-1"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold">Employee</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Check In</th>
              <th className="p-4 font-semibold">Check Out</th>
              <th className="p-4 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody>
            {attendanceData.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium text-gray-700">{item.name}</td>

                <td className="p-4 text-gray-600">{item.date}</td>

                <td className="p-4 text-gray-600">{item.checkIn}</td>

                <td className="p-4 text-gray-600">{item.checkOut}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyle(
                      item.status,
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

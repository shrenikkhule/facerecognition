import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Camera,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Employees",
      path: "/employees",
      icon: <Users size={20} />,
    },
    {
      name: "Attendance",
      path: "/attendance",
      icon: <ClipboardList size={20} />,
    },
    {
      name: "Cameras",
      path: "/cameras",
      icon: <Camera size={20} />,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 bg-linear-to-b from-indigo-600 to-indigo-800 text-white flex flex-col shadow-xl">
      {/* Logo / App Name */}
      <div className="p-6 text-2xl font-bold border-b border-indigo-500">
        FaceTrack AI
      </div>

      {/* Menu Items */}
      <div className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-white text-indigo-700 font-semibold shadow"
                  : "hover:bg-indigo-500"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-indigo-500">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-500 transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

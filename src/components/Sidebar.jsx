import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Camera,
  LogOut,
  ScanFace,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
  Zap,
  Circle,
} from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeOrb, setActiveOrb] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const orbTimer = setInterval(() => {
      setActiveOrb((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(orbTimer);
  }, []);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
      badge: null,
      color: "from-violet-500 to-purple-600",
      glow: "violet",
    },
    {
      name: "Employees",
      path: "/employees",
      icon: Users,
      badge: "245",
      color: "from-cyan-500 to-blue-600",
      glow: "cyan",
    },
    {
      name: "Attendance",
      path: "/attendance",
      icon: ClipboardList,
      badge: "12",
      color: "from-emerald-500 to-teal-600",
      glow: "emerald",
    },
    {
      name: "Live Cameras",
      path: "/cameras",
      icon: Camera,
      badge: "8",
      color: "from-orange-500 to-rose-600",
      glow: "orange",
    },
  ];

  const bottomMenuItems = [
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
      color: "from-slate-500 to-gray-600",
      glow: "slate",
    },
    {
      name: "Security",
      path: "/security",
      icon: Shield,
      color: "from-amber-500 to-yellow-600",
      glow: "amber",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const sidebarWidth = collapsed ? "w-20" : "w-72";

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-white/60 backdrop-blur-md z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen z-40 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${
          isOpen ? sidebarWidth : "-translate-x-full lg:translate-x-0"
        } lg:${sidebarWidth}`}
        style={{
          background:
            "linear-gradient(180deg, #f8f9ff 0%, #f0f2ff 30%, #e8ecff 70%, #f5f0ff 100%)",
        }}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className={`absolute -top-20 -right-20 w-40 h-40 rounded-full transition-all duration-[2000ms] ${
              activeOrb === 0 ? "opacity-30 scale-110" : "opacity-10 scale-100"
            }`}
            style={{
              background:
                "radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)",
            }}
          />
          <div
            className={`absolute top-1/3 -left-10 w-32 h-32 rounded-full transition-all duration-[2000ms] ${
              activeOrb === 1 ? "opacity-30 scale-110" : "opacity-10 scale-100"
            }`}
            style={{
              background:
                "radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)",
            }}
          />
          <div
            className={`absolute bottom-20 -right-10 w-36 h-36 rounded-full transition-all duration-[2000ms] ${
              activeOrb === 2 ? "opacity-30 scale-110" : "opacity-10 scale-100"
            }`}
            style={{
              background:
                "radial-gradient(circle, rgba(244,114,182,0.3) 0%, transparent 70%)",
            }}
          />

          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        {/* Glass border on right */}
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-violet-200/50 via-blue-200/50 to-purple-200/50" />

        {/* Logo Section */}
        <div className="relative h-20 flex items-center justify-between px-4">
          <div
            className={`flex items-center gap-3 transition-all duration-500 ${
              collapsed ? "justify-center w-full" : ""
            }`}
          >
            <div className="relative group cursor-pointer">
              {/* Animated ring */}
              <div className="absolute -inset-1">
                <div
                  className="w-full h-full rounded-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #8b5cf6, #06b6d4, #8b5cf6)",
                    animation: "spin 4s linear infinite",
                  }}
                />
              </div>
              <div className="relative bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 p-2.5 rounded-2xl shadow-lg shadow-violet-500/20">
                <ScanFace className="text-white w-6 h-6" strokeWidth={2} />
              </div>
              {/* Pulse dot */}
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3">
                <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-75" />
                <div className="relative bg-emerald-400 w-3 h-3 rounded-full border-2 border-white" />
              </div>
            </div>
            {!collapsed && (
              <div className="overflow-hidden">
                <h2
                  className="text-lg font-bold tracking-tight"
                  style={{
                    background:
                      "linear-gradient(135deg, #6d28d9 0%, #4f46e5 50%, #0ea5e9 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  FaceTrack
                </h2>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3 h-3 text-amber-500" fill="currentColor" />
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                    AI Powered
                  </span>
                </div>
              </div>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="hidden lg:flex items-center justify-center w-7 h-7 rounded-lg bg-white/80 hover:bg-white border border-gray-200/60 text-gray-400 hover:text-violet-500 transition-all duration-300 shadow-sm hover:shadow"
            >
              <ChevronLeft size={14} strokeWidth={2.5} />
            </button>
          )}
          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 items-center justify-center w-6 h-6 rounded-full bg-white border border-gray-200 text-gray-400 hover:text-violet-500 transition-all duration-300 shadow-md hover:shadow-lg z-50"
            >
              <ChevronRight size={12} strokeWidth={2.5} />
            </button>
          )}
        </div>

        {/* Time Display */}
        {!collapsed && (
          <div className="mx-4 mb-3 px-4 py-3 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/80 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                  Current Time
                </p>
                <p className="text-lg font-bold text-gray-700 tabular-nums">
                  {currentTime.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </div>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ${
                      activeOrb === i
                        ? "bg-violet-500 scale-125"
                        : "bg-gray-300 scale-100"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 space-y-1 relative">
          {!collapsed && (
            <div className="px-3 pt-2 pb-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                Navigation
              </p>
            </div>
          )}

          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={index}
                to={item.path}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                className={({ isActive }) =>
                  `relative flex items-center gap-3 rounded-2xl transition-all duration-300 group ${
                    collapsed ? "px-0 py-3 justify-center" : "px-4 py-3"
                  } ${
                    isActive
                      ? "bg-white shadow-lg shadow-gray-200/50 border border-white"
                      : "hover:bg-white/50 border border-transparent"
                  }`
                }
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {({ isActive }) => (
                  <>
                    {/* Active indicator line */}
                    {isActive && (
                      <div
                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-gradient-to-b ${item.color}`}
                        style={{
                          animation: "slideIn 0.3s ease-out",
                        }}
                      />
                    )}

                    {/* Icon container */}
                    <div className="relative">
                      <div
                        className={`relative p-2 rounded-xl transition-all duration-300 ${
                          isActive
                            ? `bg-gradient-to-br ${item.color} shadow-md`
                            : hoveredItem === index
                              ? "bg-gray-100"
                              : "bg-transparent"
                        }`}
                      >
                        <Icon
                          size={18}
                          className={`transition-all duration-300 ${
                            isActive
                              ? "text-white"
                              : "text-gray-500 group-hover:text-gray-700"
                          }`}
                          strokeWidth={isActive ? 2.5 : 2}
                        />
                      </div>
                      {/* Glow effect for active */}
                      {isActive && (
                        <div
                          className={`absolute inset-0 rounded-xl bg-gradient-to-br ${item.color} blur-lg opacity-30`}
                        />
                      )}
                    </div>

                    {!collapsed && (
                      <>
                        <div className="flex-1 min-w-0">
                          <span
                            className={`text-sm font-semibold transition-colors duration-300 ${
                              isActive ? "text-gray-800" : "text-gray-600"
                            }`}
                          >
                            {item.name}
                          </span>
                        </div>

                        {item.badge && (
                          <span
                            className={`px-2.5 py-1 text-[10px] font-bold rounded-full transition-all duration-300 ${
                              isActive
                                ? `bg-gradient-to-r ${item.color} text-white shadow-sm`
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}

                    {/* Tooltip for collapsed state */}
                    {collapsed && hoveredItem === index && (
                      <div className="absolute left-full ml-3 px-3 py-2 bg-gray-800 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap z-50">
                        {item.name}
                        {item.badge && (
                          <span className="ml-2 px-1.5 py-0.5 bg-white/20 rounded text-[10px]">
                            {item.badge}
                          </span>
                        )}
                        <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}

          {/* Divider */}
          <div className="py-3 px-3">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent" />
          </div>

          {!collapsed && (
            <div className="px-3 pb-3">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                System
              </p>
            </div>
          )}

          {bottomMenuItems.map((item, index) => {
            const Icon = item.icon;
            const itemIndex = menuItems.length + index;
            return (
              <NavLink
                key={`bottom-${index}`}
                to={item.path}
                onMouseEnter={() => setHoveredItem(itemIndex)}
                onMouseLeave={() => setHoveredItem(null)}
                className={({ isActive }) =>
                  `relative flex items-center gap-3 rounded-2xl transition-all duration-300 group ${
                    collapsed ? "px-0 py-3 justify-center" : "px-4 py-3"
                  } ${
                    isActive
                      ? "bg-white shadow-lg shadow-gray-200/50 border border-white"
                      : "hover:bg-white/50 border border-transparent"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <div
                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-gradient-to-b ${item.color}`}
                      />
                    )}
                    <div className="relative">
                      <div
                        className={`relative p-2 rounded-xl transition-all duration-300 ${
                          isActive
                            ? `bg-gradient-to-br ${item.color} shadow-md`
                            : hoveredItem === itemIndex
                              ? "bg-gray-100"
                              : "bg-transparent"
                        }`}
                      >
                        <Icon
                          size={18}
                          className={`transition-all duration-300 ${
                            isActive
                              ? "text-white"
                              : "text-gray-500 group-hover:text-gray-700"
                          } ${
                            item.name === "Settings" &&
                            hoveredItem === itemIndex
                              ? "animate-[spin_2s_linear_infinite]"
                              : ""
                          }`}
                          strokeWidth={isActive ? 2.5 : 2}
                        />
                      </div>
                      {isActive && (
                        <div
                          className={`absolute inset-0 rounded-xl bg-gradient-to-br ${item.color} blur-lg opacity-30`}
                        />
                      )}
                    </div>
                    {!collapsed && (
                      <span
                        className={`flex-1 text-sm font-semibold transition-colors duration-300 ${
                          isActive ? "text-gray-800" : "text-gray-600"
                        }`}
                      >
                        {item.name}
                      </span>
                    )}
                    {collapsed && hoveredItem === itemIndex && (
                      <div className="absolute left-full ml-3 px-3 py-2 bg-gray-800 text-white text-xs font-medium rounded-lg shadow-xl whitespace-nowrap z-50">
                        {item.name}
                        <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-800 rotate-45" />
                      </div>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Status Card */}

        {/* Logout Section */}
        <div className="p-3 relative">
          <div className="absolute top-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-gray-300/50 to-transparent" />
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full rounded-2xl transition-all duration-300 group hover:bg-red-50 border border-transparent hover:border-red-100 ${
              collapsed ? "px-0 py-3 justify-center" : "px-4 py-3"
            }`}
          >
            <div className="p-2 rounded-xl transition-all duration-300 group-hover:bg-red-100">
              <LogOut
                size={18}
                className="text-gray-400 group-hover:text-red-500 transition-all duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </div>
            {!collapsed && (
              <span className="font-semibold text-sm text-gray-400 group-hover:text-red-500 transition-colors duration-300">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>

      {/* Spacer */}
      <div
        className={`hidden lg:block transition-all duration-500 ${
          collapsed ? "w-20" : "w-72"
        }`}
      />

      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            height: 0;
          }
          to {
            opacity: 1;
            height: 2rem;
          }
        }

        @keyframes progressPulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        nav::-webkit-scrollbar {
          width: 3px;
        }

        nav::-webkit-scrollbar-track {
          background: transparent;
        }

        nav::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.2);
          border-radius: 10px;
        }

        nav::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.4);
        }
      `}</style>
    </>
  );
};

export default Sidebar;

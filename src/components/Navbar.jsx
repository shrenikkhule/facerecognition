import { useState, useEffect, useRef } from "react";
import {
  Bell,
  User,
  LogOut,
  X,
  Settings,
  Search,
  ChevronDown,
  Shield,
  Activity,
  Check,
  Clock,
  AlertTriangle,
  Info,
  Sparkles,
  Command,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifRead, setNotifRead] = useState([]);
  const [activeOrb, setActiveOrb] = useState(0);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const orbTimer = setInterval(() => setActiveOrb((p) => (p + 1) % 3), 3000);
    return () => clearInterval(orbTimer);
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === "Escape") {
        setSearchFocused(false);
        setShowNotifications(false);
        setShowUserMenu(false);
        searchRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const notifications = [
    {
      id: 1,
      text: "New face registered successfully",
      desc: "Employee #1247 — John Doe added to database",
      time: "Just now",
      type: "success",
      icon: Check,
    },
    {
      id: 2,
      text: "Unrecognized face detected",
      desc: "Gate B — Camera #3 flagged unknown individual",
      time: "5 min ago",
      type: "warning",
      icon: AlertTriangle,
    },
    {
      id: 3,
      text: "System health check completed",
      desc: "All 24 cameras operational, 99.8% uptime",
      time: "1 hour ago",
      type: "info",
      icon: Info,
    },
    {
      id: 4,
      text: "AI Model updated to v3.2",
      desc: "Recognition accuracy improved by 2.3%",
      time: "3 hours ago",
      type: "success",
      icon: Sparkles,
    },
  ];

  const unreadCount = notifications.length - notifRead.length;

  const markAsRead = (id) => {
    setNotifRead((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const getNotifColor = (type) => {
    switch (type) {
      case "success":
        return {
          bg: "bg-emerald-50",
          icon: "bg-emerald-100 text-emerald-600",
          dot: "bg-emerald-500",
        };
      case "warning":
        return {
          bg: "bg-amber-50",
          icon: "bg-amber-100 text-amber-600",
          dot: "bg-amber-500",
        };
      case "info":
        return {
          bg: "bg-blue-50",
          icon: "bg-blue-100 text-blue-600",
          dot: "bg-blue-500",
        };
      default:
        return {
          bg: "bg-gray-50",
          icon: "bg-gray-100 text-gray-600",
          dot: "bg-gray-500",
        };
    }
  };

  return (
    <>
      {searchFocused && (
        <div
          className="fixed inset-0 bg-black/5 backdrop-blur-[2px] z-40"
          onClick={() => {
            setSearchFocused(false);
            searchRef.current?.blur();
          }}
        />
      )}

      <nav
        className={`top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "shadow-lg shadow-gray-200/40"
            : "shadow-sm shadow-gray-100/40"
        }`}
        style={{
          background: scrolled
            ? "rgba(255,255,255,0.85)"
            : "rgba(255,255,255,0.95)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
      >
        {/* Decorative top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden">
          <div
            className="h-full w-full"
            style={{
              background:
                "linear-gradient(90deg, #8b5cf6, #06b6d4, #8b5cf6, #f472b6, #8b5cf6)",
              backgroundSize: "200% 100%",
              animation: "gradientSlide 4s linear infinite",
            }}
          />
        </div>

        <div className="relative px-4 lg:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                  toggleSidebar && toggleSidebar();
                }}
                className="lg:hidden relative p-2.5 rounded-xl hover:bg-gray-100/80 text-gray-500 transition-all duration-300 group"
              >
                <div className="relative w-5 h-5">
                  <span
                    className={`absolute left-0 w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                      mobileMenuOpen ? "top-[9px] rotate-45" : "top-1 rotate-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-[9px] w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                      mobileMenuOpen ? "opacity-0 scale-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute left-0 w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                      mobileMenuOpen
                        ? "top-[9px] -rotate-45"
                        : "top-[17px] rotate-0"
                    }`}
                  />
                </div>
              </button>{" "}
            </div>

            {/* Center - Search */}
            <div
              className={`hidden md:flex flex-1 max-w-lg mx-8 transition-all duration-500 ${
                searchFocused ? "max-w-xl scale-[1.02]" : ""
              }`}
            >
              <div className="relative w-full group z-50">
                <div
                  className={`absolute -inset-0.5 rounded-2xl transition-all duration-500 ${
                    searchFocused
                      ? "opacity-100 bg-gradient-to-r from-violet-400/20 via-blue-400/20 to-cyan-400/20 blur-sm"
                      : "opacity-0"
                  }`}
                />
                <div className="relative">
                  <Search
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-300 ${
                      searchFocused ? "text-violet-500" : "text-gray-400"
                    }`}
                  />
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    placeholder="Search faces, employees, logs..."
                    className={`w-full pl-11 pr-24 py-2.5 rounded-xl text-sm text-gray-700 placeholder-gray-400 transition-all duration-300 outline-none ${
                      searchFocused
                        ? "bg-white border-violet-300/60 ring-4 ring-violet-100/50 shadow-lg shadow-violet-100/30"
                        : "bg-gray-50/80 border-gray-200/60 hover:bg-gray-100/60 hover:border-gray-300/60"
                    } border`}
                  />
                  {!searchFocused && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none">
                      <kbd className="px-1.5 py-0.5 text-[10px] font-medium text-gray-400 bg-gray-100 border border-gray-200 rounded-md flex items-center gap-0.5">
                        <Command size={10} />K
                      </kbd>
                    </div>
                  )}
                  {searchQuery && searchFocused && (
                    <button
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setSearchQuery("");
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-1.5">
              {/* Live Status Pill */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50/80 border border-emerald-200/50 mr-2">
                <div className="relative">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                  <div className="absolute inset-0 w-2 h-2 bg-emerald-500 rounded-full animate-ping opacity-40" />
                </div>
                <span className="text-[11px] font-semibold text-emerald-700 tracking-wide">
                  LIVE
                </span>
                <Activity className="w-3 h-3 text-emerald-600" />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowUserMenu(false);
                  }}
                  className={`relative p-2.5 rounded-xl transition-all duration-300 group ${
                    showNotifications
                      ? "bg-violet-50 text-violet-600"
                      : "hover:bg-gray-100/80 text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Bell
                    size={20}
                    className="transition-transform duration-300 group-hover:rotate-12"
                    strokeWidth={showNotifications ? 2.5 : 2}
                  />
                  {unreadCount > 0 && (
                    <>
                      <span className="absolute top-1 right-1 w-5 h-5 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <span className="text-[10px] font-bold text-white">
                          {unreadCount}
                        </span>
                      </span>
                      <span className="absolute top-1 right-1 w-5 h-5 bg-violet-500 rounded-full animate-ping opacity-20" />
                    </>
                  )}
                </button>

                {showNotifications && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowNotifications(false)}
                    />
                    <div
                      className="absolute right-0 mt-3 w-96 bg-white/95 backdrop-blur-xl border border-gray-200/60 rounded-2xl shadow-2xl shadow-gray-200/50 overflow-hidden z-50"
                      style={{ animation: "dropIn 0.3s ease-out" }}
                    >
                      {/* Header */}
                      <div className="p-5 pb-4 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-base font-bold text-gray-800">
                              Notifications
                            </h3>
                            <p className="text-xs text-gray-400 mt-0.5">
                              Stay updated with your system
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {unreadCount > 0 && (
                              <span className="px-2.5 py-1 text-[10px] font-bold bg-gradient-to-r from-violet-500 to-indigo-600 text-white rounded-full shadow-sm">
                                {unreadCount} new
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Notification List */}
                      <div className="max-h-[380px] overflow-y-auto">
                        {notifications.map((notif, index) => {
                          const colors = getNotifColor(notif.type);
                          const isRead = notifRead.includes(notif.id);
                          const NotifIcon = notif.icon;
                          return (
                            <div
                              key={notif.id}
                              onClick={() => markAsRead(notif.id)}
                              className={`relative px-5 py-4 cursor-pointer transition-all duration-300 group hover:bg-gray-50/80 ${
                                index !== notifications.length - 1
                                  ? "border-b border-gray-100/80"
                                  : ""
                              }`}
                              style={{
                                animation: `slideUp 0.3s ease-out ${index * 0.05}s both`,
                              }}
                            >
                              {!isRead && (
                                <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-violet-500 to-indigo-500 rounded-full" />
                              )}
                              <div className="flex gap-3.5">
                                <div
                                  className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${colors.icon} group-hover:scale-110`}
                                >
                                  <NotifIcon size={18} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p
                                    className={`text-sm font-semibold transition-colors ${
                                      isRead ? "text-gray-500" : "text-gray-800"
                                    }`}
                                  >
                                    {notif.text}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-0.5 truncate">
                                    {notif.desc}
                                  </p>
                                  <div className="flex items-center gap-1.5 mt-2">
                                    <Clock className="w-3 h-3 text-gray-300" />
                                    <span className="text-[11px] text-gray-400">
                                      {notif.time}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Footer */}
                      <div className="p-3 border-t border-gray-100 bg-gray-50/50">
                        <button className="w-full py-2.5 text-sm font-semibold text-violet-600 hover:text-violet-700 hover:bg-violet-50 rounded-xl transition-all duration-300">
                          View All Notifications
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Settings */}
              <button className="hidden md:flex p-2.5 rounded-xl hover:bg-gray-100/80 text-gray-500 hover:text-gray-700 transition-all duration-300 group">
                <Settings
                  size={20}
                  className="group-hover:rotate-180 transition-transform duration-700"
                />
              </button>

              {/* Separator */}
              <div className="hidden md:block w-px h-8 bg-gradient-to-b from-transparent via-gray-200 to-transparent mx-1" />

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowUserMenu(!showUserMenu);
                    setShowNotifications(false);
                  }}
                  className={`flex items-center gap-2.5 px-2 py-1.5 rounded-xl transition-all duration-300 group ${
                    showUserMenu ? "bg-violet-50" : "hover:bg-gray-100/80"
                  }`}
                >
                  <div className="relative">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 flex items-center justify-center shadow-md shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow duration-300">
                      <span className="text-white text-sm font-bold">A</span>
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors leading-tight">
                      Admin
                    </p>
                    <p className="text-[10px] text-gray-400 leading-tight">
                      Super Admin
                    </p>
                  </div>
                  <ChevronDown
                    size={14}
                    className={`hidden md:block text-gray-400 transition-all duration-300 ${
                      showUserMenu ? "rotate-180 text-violet-500" : ""
                    }`}
                  />
                </button>

                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div
                      className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-xl border border-gray-200/60 rounded-2xl shadow-2xl shadow-gray-200/50 overflow-hidden z-50"
                      style={{ animation: "dropIn 0.3s ease-out" }}
                    >
                      {/* User Header */}
                      <div className="p-5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50/50 to-indigo-50" />
                        <div
                          className="absolute inset-0 opacity-[0.03]"
                          style={{
                            backgroundImage:
                              "radial-gradient(circle, #6366f1 1px, transparent 1px)",
                            backgroundSize: "16px 16px",
                          }}
                        />
                        <div className="relative flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                            <span className="text-white text-lg font-bold">
                              A
                            </span>
                          </div>
                          <div>
                            <p className="font-bold text-gray-800">
                              Admin User
                            </p>
                            <p className="text-xs text-gray-500">
                              admin@facetrack.ai
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <Shield className="w-3 h-3 text-violet-500" />
                              <span className="text-[10px] font-semibold text-violet-600">
                                Super Admin
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="p-2">
                        <button className="w-full text-left px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 flex items-center gap-3 group">
                          <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-violet-100 transition-colors">
                            <User
                              size={14}
                              className="text-gray-500 group-hover:text-violet-600 transition-colors"
                            />
                          </div>
                          <div>
                            <span className="font-medium">
                              Profile Settings
                            </span>
                            <p className="text-[10px] text-gray-400">
                              Manage your account
                            </p>
                          </div>
                        </button>
                        <button className="w-full text-left px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-xl transition-all duration-200 flex items-center gap-3 group">
                          <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors">
                            <Settings
                              size={14}
                              className="text-gray-500 group-hover:text-blue-600 transition-colors"
                            />
                          </div>
                          <div>
                            <span className="font-medium">Preferences</span>
                            <p className="text-[10px] text-gray-400">
                              Customize your experience
                            </p>
                          </div>
                        </button>
                      </div>

                      <div className="p-2 border-t border-gray-100">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 flex items-center gap-3 group"
                        >
                          <div className="p-1.5 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
                            <LogOut size={14} className="text-red-500" />
                          </div>
                          <span className="font-semibold">Logout</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom border gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200/60 to-transparent" />
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-white/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className="absolute top-16 left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200/60 shadow-2xl"
            style={{ animation: "mobileSlide 0.4s ease-out" }}
          >
            <div className="p-5 space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-11 pr-4 py-3 bg-gray-50/80 border border-gray-200/60 rounded-xl text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-violet-300 focus:ring-4 focus:ring-violet-100/50 transition-all"
                />
              </div>

              {/* Mobile User Info */}
              <div className="relative overflow-hidden p-4 rounded-2xl border border-gray-200/60">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50/30 to-indigo-50" />
                <div className="relative flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 via-purple-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                    <span className="text-white text-xl font-bold">A</span>
                  </div>
                  <div>
                    <p className="text-gray-800 font-bold text-base">
                      Admin User
                    </p>
                    <p className="text-xs text-gray-500">admin@facetrack.ai</p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                      <span className="text-[11px] font-medium text-emerald-600">
                        Online
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Items */}
              <div className="space-y-1">
                <button className="w-full text-left px-4 py-3.5 text-gray-700 hover:bg-gray-50 rounded-xl transition-all flex items-center gap-3 group">
                  <div className="p-2 rounded-xl bg-gray-100 group-hover:bg-violet-100 transition-colors">
                    <User
                      size={18}
                      className="text-gray-500 group-hover:text-violet-600 transition-colors"
                    />
                  </div>
                  <span className="font-medium">Profile</span>
                </button>
                <button className="w-full text-left px-4 py-3.5 text-gray-700 hover:bg-gray-50 rounded-xl transition-all flex items-center gap-3 group">
                  <div className="p-2 rounded-xl bg-gray-100 group-hover:bg-blue-100 transition-colors">
                    <Settings
                      size={18}
                      className="text-gray-500 group-hover:text-blue-600 transition-colors"
                    />
                  </div>
                  <span className="font-medium">Settings</span>
                </button>
                <div className="py-2">
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3.5 text-red-600 hover:bg-red-50 rounded-xl transition-all flex items-center gap-3 group"
                >
                  <div className="p-2 rounded-xl bg-red-50 group-hover:bg-red-100 transition-colors">
                    <LogOut size={18} className="text-red-500" />
                  </div>
                  <span className="font-semibold">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes gradientSlide {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        @keyframes dropIn {
          0% {
            opacity: 0;
            transform: translateY(-8px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes mobileSlide {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default Navbar;

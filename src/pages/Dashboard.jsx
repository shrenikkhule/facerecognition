import { useState, useEffect, useRef } from "react";
import {
  Users,
  Camera,
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Eye,
  Activity,
  Zap,
  Globe,
  CheckCircle2,
  XCircle,
  BarChart3,
  PieChart,
  Layers,
  RefreshCw,
  ChevronRight,
  Sparkles,
  ScanFace,
  MapPin,
  Wifi,
  WifiOff,
  UserCheck,
  UserX,
  CalendarDays,
  Timer,
  Signal,
  CircleDot,
  Play,
  MoreHorizontal,
  ExternalLink,
  Filter,
  Download,
  Sun,
  Bell,
  Search,
  ChevronDown,
  Shield,
  Server,
  Database,
  Cpu,
} from "lucide-react";

const useAnimatedCounter = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const countRef = useRef(start);
  const startTimeRef = useRef(null);

  useEffect(() => {
    startTimeRef.current = null;
    countRef.current = start;

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = Math.min(
        (timestamp - startTimeRef.current) / duration,
        1,
      );
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(start + (end - start) * eased);

      if (current !== countRef.current) {
        countRef.current = current;
        setCount(current);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, start]);

  return count;
};

const ProgressRing = ({ progress, size = 80, strokeWidth = 6, color }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(circumference - (progress / 100) * circumference);
    }, 500);
    return () => clearTimeout(timer);
  }, [progress, circumference]);

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        className="text-gray-100"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-2000 ease-out"
        style={{ filter: `drop-shadow(0 0 6px ${color}40)` }}
      />
    </svg>
  );
};

const Sparkline = ({ data, color = "#6366f1", height = 40 }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 140;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / range) * (height - 8) - 4;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPoints = `0,${height} ${points} ${width},${height}`;
  const gradId = `spark-grad-${color.replace("#", "")}`;

  return (
    <svg
      width={width}
      height={height}
      className="overflow-visible"
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color} stopOpacity="0.15" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={areaPoints}
        fill={`url(#${gradId})`}
        className="animate-fadeIn"
      />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="animate-drawLine"
      />
      {data.length > 0 && (
        <>
          <circle
            cx={width}
            cy={
              height -
              ((data[data.length - 1] - min) / range) * (height - 8) -
              4
            }
            r="4"
            fill="white"
            stroke={color}
            strokeWidth="2.5"
            className="animate-pulse"
          />
        </>
      )}
    </svg>
  );
};

const BarChart = ({ data, labels, colors }) => {
  const max = Math.max(...data);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex items-end gap-3 h-40 px-2">
      {data.map((value, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
          <span
            className="text-[11px] font-bold text-gray-500 transition-all duration-500"
            style={{ opacity: animated ? 1 : 0 }}
          >
            {animated ? value : 0}
          </span>
          <div className="w-full bg-linear-to-t from-gray-50 to-gray-100/50 rounded-xl relative overflow-hidden h-28 border border-gray-100">
            <div
              className="absolute bottom-0 left-1 right-1 rounded-xl transition-all duration-1400 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
              style={{
                height: animated ? `${(value / max) * 100}%` : "0%",
                background: colors[i],
                transitionDelay: `${i * 80}ms`,
              }}
            />
          </div>
          <span className="text-[11px] font-semibold text-gray-400">
            {labels[i]}
          </span>
        </div>
      ))}
    </div>
  );
};

const ActivityItem = ({ item, index }) => {
  const colors = {
    success: {
      icon: "bg-emerald-100 text-emerald-600",
      dot: "bg-emerald-400",
    },
    warning: {
      icon: "bg-amber-100 text-amber-600",
      dot: "bg-amber-400",
    },
    info: {
      icon: "bg-sky-100 text-sky-600",
      dot: "bg-sky-400",
    },
    danger: {
      icon: "bg-rose-100 text-rose-600",
      dot: "bg-rose-400",
    },
  };

  const c = colors[item.type] || colors.info;
  const Icon = item.icon;

  return (
    <div
      className="flex gap-3 p-3.5 rounded-2xl hover:bg-linear-to-r hover:from-gray-50/80 hover:to-white transition-all duration-300 cursor-pointer group relative"
      style={{ animation: `slideUp 0.4s ease-out ${index * 0.06}s both` }}
    >
      {/* Timeline connector */}
      {index < 7 && (
        <div className="absolute left-7.25 top-13 w-0.5 h-4 bg-gray-100 rounded-full" />
      )}

      <div
        className={`shrink-0 p-2.5 rounded-2xl ${c.icon} transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}
      >
        <Icon size={15} strokeWidth={2.5} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-semibold text-gray-700 truncate group-hover:text-gray-900 transition-colors">
          {item.text}
        </p>
        <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
          <Clock size={10} />
          {item.time}
        </p>
      </div>
      <ChevronRight
        size={14}
        className="text-gray-200 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all self-center shrink-0"
      />
    </div>
  );
};

const CameraCard = ({ camera, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-3xl overflow-hidden group cursor-pointer bg-white border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-1.5"
      style={{ animation: `fadeInScale 0.5s ease-out ${index * 0.08}s both` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Camera Preview */}
      <div
        className="h-40 relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${camera.gradient[0]}dd, ${camera.gradient[1]}dd)`,
        }}
      >
        {/* Animated scan line */}
        {camera.online && (
          <div
            className="absolute left-0 right-0 h-0.5 bg-white/20"
            style={{
              animation: "scanLine 4s ease-in-out infinite",
              top: "0%",
            }}
          />
        )}

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Camera icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Camera
            size={44}
            className={`text-white/10 transition-all duration-700 ${hovered ? "scale-125 text-white/20 rotate-6" : ""}`}
          />
        </div>

        {/* Status badge */}
        <div className="absolute top-3.5 left-3.5">
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold backdrop-blur-xl ${
              camera.online
                ? "bg-emerald-500/25 text-white border border-emerald-300/30"
                : "bg-red-500/25 text-white border border-red-300/30"
            }`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${camera.online ? "bg-emerald-300 animate-pulse" : "bg-red-300"}`}
            />
            {camera.online ? "LIVE" : "OFFLINE"}
          </div>
        </div>

        {/* Face count */}
        {camera.online && camera.faces > 0 && (
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-black/20 backdrop-blur-xl text-white text-[10px] font-bold border border-white/10">
            <ScanFace size={12} />
            {camera.faces}
          </div>
        )}

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center transition-all duration-500 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/20 backdrop-blur-xl text-white text-sm font-semibold border border-white/20 transition-transform duration-300 hover:scale-105">
            <Play size={14} fill="white" />
            View Feed
          </div>
        </div>
      </div>

      {/* Camera Info */}
      <div className="p-4 bg-white">
        <div className="flex items-center justify-between mb-1.5">
          <h4 className="text-sm font-bold text-gray-800 group-hover:text-indigo-700 transition-colors">
            {camera.name}
          </h4>
          <button className="p-1.5 rounded-xl hover:bg-gray-100 text-gray-300 opacity-0 group-hover:opacity-100 transition-all">
            <MoreHorizontal size={14} />
          </button>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-gray-400">
          <MapPin size={11} />
          {camera.location}
        </div>
        {camera.online && (
          <div className="flex items-center gap-4 mt-3.5 pt-3.5 border-t border-gray-50">
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
              <Signal size={11} className="text-emerald-500" />
              {camera.fps} FPS
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
              <Eye size={11} className="text-indigo-500" />
              {camera.resolution}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [refreshing, setRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const totalEmployees = useAnimatedCounter(1247, 2000);
  const presentToday = useAnimatedCounter(1189, 2200);
  const activeCameras = useAnimatedCounter(24, 1500);
  const alertsCount = useAnimatedCounter(3, 1000);
  const recognitionRate = useAnimatedCounter(98, 2500);
  const avgResponseTime = useAnimatedCounter(45, 1800);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };

  const statCards = [
    {
      title: "Total Employees",
      value: totalEmployees,
      suffix: "",
      change: "+12",
      changeType: "up",
      icon: Users,
      gradient: "from-indigo-500 to-blue-600",
      shadow: "shadow-indigo-200",
      lightBg: "bg-indigo-50",
      accentColor: "#6366f1",
      sparkData: [30, 45, 35, 50, 40, 60, 55, 70, 65, 80, 75, 85],
      sparkColor: "#6366f1",
    },
    {
      title: "Present Today",
      value: presentToday,
      suffix: "",
      change: "95.3%",
      changeType: "up",
      icon: UserCheck,
      gradient: "from-emerald-500 to-green-600",
      shadow: "shadow-emerald-200",
      lightBg: "bg-emerald-50",
      accentColor: "#10b981",
      sparkData: [60, 70, 65, 80, 75, 90, 85, 88, 92, 90, 94, 95],
      sparkColor: "#10b981",
    },
    {
      title: "Active Cameras",
      value: activeCameras,
      suffix: "/28",
      change: "85.7%",
      changeType: "neutral",
      icon: Camera,
      gradient: "from-sky-500 to-cyan-600",
      shadow: "shadow-sky-200",
      lightBg: "bg-sky-50",
      accentColor: "#0ea5e9",
      sparkData: [20, 22, 21, 24, 23, 24, 22, 24, 24, 23, 24, 24],
      sparkColor: "#0ea5e9",
    },
    {
      title: "Active Alerts",
      value: alertsCount,
      suffix: "",
      change: "-2",
      changeType: "down",
      icon: AlertTriangle,
      gradient: "from-amber-500 to-orange-500",
      shadow: "shadow-amber-200",
      lightBg: "bg-amber-50",
      accentColor: "#f59e0b",
      sparkData: [8, 6, 7, 5, 6, 4, 5, 3, 4, 3, 2, 3],
      sparkColor: "#f59e0b",
    },
  ];

  const activityFeed = [
    {
      text: "John Doe checked in via Gate A",
      time: "Just now",
      type: "success",
      icon: UserCheck,
    },
    {
      text: "Unknown face detected at Parking Lot",
      time: "2 min ago",
      type: "warning",
      icon: AlertTriangle,
    },
    {
      text: "Camera #7 reconnected successfully",
      time: "5 min ago",
      type: "info",
      icon: Wifi,
    },
    {
      text: "Sarah Wilson checked out via Gate B",
      time: "8 min ago",
      type: "success",
      icon: UserCheck,
    },
    {
      text: "Camera #12 went offline",
      time: "15 min ago",
      type: "danger",
      icon: WifiOff,
    },
    {
      text: "AI model accuracy report generated",
      time: "30 min ago",
      type: "info",
      icon: BarChart3,
    },
    {
      text: "Mike Johnson checked in via Gate C",
      time: "45 min ago",
      type: "success",
      icon: UserCheck,
    },
    {
      text: "System backup completed",
      time: "1 hour ago",
      type: "info",
      icon: CheckCircle2,
    },
  ];

  const cameras = [
    {
      name: "Main Entrance",
      location: "Building A, Floor 1",
      online: true,
      faces: 5,
      fps: 30,
      resolution: "4K",
      gradient: ["#6366f1", "#818cf8"],
    },
    {
      name: "Parking Lot",
      location: "Outdoor, Zone B",
      online: true,
      faces: 2,
      fps: 25,
      resolution: "1080p",
      gradient: ["#0ea5e9", "#38bdf8"],
    },
    {
      name: "Server Room",
      location: "Building C, Basement",
      online: true,
      faces: 0,
      fps: 30,
      resolution: "4K",
      gradient: ["#10b981", "#34d399"],
    },
    {
      name: "Conference Hall",
      location: "Building A, Floor 3",
      online: false,
      faces: 0,
      fps: 0,
      resolution: "1080p",
      gradient: ["#94a3b8", "#64748b"],
    },
    {
      name: "Cafeteria",
      location: "Building B, Floor 1",
      online: true,
      faces: 18,
      fps: 25,
      resolution: "1080p",
      gradient: ["#f59e0b", "#fbbf24"],
    },
    {
      name: "Back Exit",
      location: "Building A, Ground",
      online: true,
      faces: 1,
      fps: 30,
      resolution: "4K",
      gradient: ["#ec4899", "#f472b6"],
    },
  ];

  const weeklyData = [85, 92, 78, 95, 88, 72, 90];
  const weeklyLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weeklyColors = [
    "linear-gradient(180deg, #818cf8, #6366f1)",
    "linear-gradient(180deg, #818cf8, #6366f1)",
    "linear-gradient(180deg, #818cf8, #6366f1)",
    "linear-gradient(180deg, #818cf8, #6366f1)",
    "linear-gradient(180deg, #818cf8, #6366f1)",
    "linear-gradient(180deg, #a5b4fc, #818cf8)",
    "linear-gradient(180deg, #a5b4fc, #818cf8)",
  ];

  const departments = [
    { name: "Engineering", count: 342, percentage: 96, color: "#6366f1" },
    { name: "Marketing", count: 156, percentage: 92, color: "#0ea5e9" },
    { name: "Sales", count: 234, percentage: 89, color: "#10b981" },
    { name: "HR", count: 89, percentage: 98, color: "#f59e0b" },
    { name: "Finance", count: 67, percentage: 94, color: "#ec4899" },
  ];

  return (
    <div className="min-h-screen relative bg-[#f7f8fc]">
      {/* ──── Soft Background Decorations ──── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-150 h-150 rounded-full opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, #6366f1 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-125 h-125 rounded-full opacity-[0.04]"
          style={{
            background: "radial-gradient(circle, #0ea5e9 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-100 h-100 rounded-full opacity-[0.025]"
          style={{
            background: "radial-gradient(circle, #f59e0b 0%, transparent 70%)",
          }}
        />
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #6366f1 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative p-5 lg:p-8 space-y-7 max-w-400 mx-auto">
        {/* ═══════ Header Section ═══════ */}
        <div
          className="flex flex-col lg:flex-row lg:items-end justify-between"
          style={{ animation: "fadeInDown 0.7s ease-out" }}
        >
          <div>
            <div className="flex items-center gap-2.5 mb-3"></div>
            <h1 className="text-3xl lg:text-[2.5rem] font-extrabold text-gray-800 tracking-tight leading-tight">
              Welcome back,{" "}
              <span
                className="relative"
                style={{
                  background:
                    "linear-gradient(135deg, #6366f1 0%, #3b82f6 50%, #0ea5e9 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Shrenik Jain
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  height="6"
                  viewBox="0 0 100 6"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0,5 Q25,0 50,4 T100,2"
                    fill="none"
                    stroke="url(#underline-grad)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="animate-drawLine"
                  />
                  <defs>
                    <linearGradient id="underline-grad" x1="0" x2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#0ea5e9" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h1>
            <p className="text-gray-400 mt-2 text-sm lg:text-[15px] font-medium">
              Here's what's happening with your face recognition system today.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Time Display */}
            <div className=" items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-gray-100 shadow-sm shadow-gray-100">
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-indigo-500" />
                <span className="text-sm font-bold text-gray-700 tabular-nums tracking-wide">
                  {currentTime.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                  })}
                </span>
              </div>
              <div className="w-px h-5 bg-gray-100" />
              <div className="flex items-center gap-2">
                <CalendarDays size={14} className="text-gray-400" />
                <span className="text-sm text-gray-500 font-medium">
                  {currentTime.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Refresh */}
            <button
              onClick={handleRefresh}
              className="p-3 rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-indigo-600 hover:border-indigo-100 hover:bg-indigo-50/30 transition-all duration-300 shadow-sm shadow-gray-100 hover:shadow-md"
            >
              <RefreshCw
                size={16}
                className={`transition-transform duration-700 ${refreshing ? "animate-spin" : ""}`}
              />
            </button>
          </div>
        </div>
        <div className="my-10 flex justify-center items-center bg-white rounded-2xl border border-gray-100 p-1.5 shadow-sm shadow-gray-100">
          {["today", "week", "month"].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-400 capitalize ${
                selectedPeriod === period
                  ? "bg-linear-to-r from-indigo-500 to-blue-600 text-white shadow-lg shadow-indigo-200"
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
        {/* ═══════ Stats Cards ═══════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-3xl border border-gray-100 p-6 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-500 hover:-translate-y-2 hover:border-gray-200 cursor-pointer overflow-hidden"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 transition-all duration-700 blur-3xl"
                  style={{ backgroundColor: card.accentColor }}
                />

                {/* Accent line top */}
                <div
                  className="absolute top-0 left-6 right-6 h-0.75 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${card.accentColor}, transparent)`,
                  }}
                />

                <div className="relative">
                  {/* Top Row */}
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.08em] mb-2">
                        {card.title}
                      </p>
                      <div className="flex items-baseline gap-1.5">
                        <h3 className="text-[2rem] font-extrabold text-gray-800 tabular-nums leading-none">
                          {card.value.toLocaleString()}
                        </h3>
                        {card.suffix && (
                          <span className="text-lg font-bold text-gray-300">
                            {card.suffix}
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      className={`p-3.5 rounded-2xl bg-linear-to-br ${card.gradient} ${card.shadow} shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <Icon
                        size={20}
                        className="text-white"
                        strokeWidth={2.5}
                      />
                    </div>
                  </div>

                  {/* Sparkline */}
                  <div className="mb-4">
                    <Sparkline
                      data={card.sparkData}
                      color={card.sparkColor}
                      height={35}
                    />
                  </div>

                  {/* Change */}
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[11px] font-bold ${
                        card.changeType === "up"
                          ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                          : card.changeType === "down"
                            ? "bg-rose-50 text-rose-600 border border-rose-100"
                            : "bg-sky-50 text-sky-600 border border-sky-100"
                      }`}
                    >
                      {card.changeType === "up" ? (
                        <ArrowUpRight size={12} strokeWidth={3} />
                      ) : card.changeType === "down" ? (
                        <ArrowDownRight size={12} strokeWidth={3} />
                      ) : (
                        <Activity size={12} />
                      )}
                      {card.change}
                    </div>
                    <span className="text-[11px] text-gray-400 font-medium">
                      vs last {selectedPeriod}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ═══════ Main Content Grid ═══════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recognition Performance */}
          <div
            className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-500"
            style={{ animation: "fadeInUp 0.6s ease-out 0.4s both" }}
          >
            <div className="p-7 pb-0">
              <div className="flex items-center justify-between mb-7">
                <div>
                  <h3 className="text-xl font-extrabold text-gray-800">
                    Recognition Performance
                  </h3>
                  <p className="text-sm text-gray-400 mt-1 font-medium">
                    Weekly attendance overview
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2.5 rounded-xl hover:bg-gray-50 text-gray-300 hover:text-gray-500 transition-all border border-transparent hover:border-gray-100">
                    <Filter size={14} />
                  </button>
                  <button className="p-2.5 rounded-xl hover:bg-gray-50 text-gray-300 hover:text-gray-500 transition-all border border-transparent hover:border-gray-100">
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-3 gap-4 mb-7">
                {[
                  {
                    label: "Accuracy",
                    value: `${recognitionRate}%`,
                    gradient: "from-indigo-50 to-violet-50",
                    border: "border-indigo-100/60",
                    labelColor: "text-indigo-400",
                    valueColor: "text-indigo-700",
                    decorColor: "bg-indigo-100/40",
                    icon: ShieldCheck,
                    iconColor: "text-indigo-300",
                  },
                  {
                    label: "Avg Response",
                    value: `${avgResponseTime}ms`,
                    gradient: "from-sky-50 to-cyan-50",
                    border: "border-sky-100/60",
                    labelColor: "text-sky-400",
                    valueColor: "text-sky-700",
                    decorColor: "bg-sky-100/40",
                    icon: Zap,
                    iconColor: "text-sky-300",
                  },
                  {
                    label: "Processed",
                    value: "12.4K",
                    gradient: "from-emerald-50 to-teal-50",
                    border: "border-emerald-100/60",
                    labelColor: "text-emerald-400",
                    valueColor: "text-emerald-700",
                    decorColor: "bg-emerald-100/40",
                    icon: Activity,
                    iconColor: "text-emerald-300",
                  },
                ].map((item, i) => {
                  const SummaryIcon = item.icon;
                  return (
                    <div
                      key={i}
                      className={`relative overflow-hidden p-5 rounded-2xl bg-linear-to-br ${item.gradient} border ${item.border} group hover:shadow-md transition-all duration-300 cursor-pointer`}
                    >
                      <div
                        className={`absolute -top-3 -right-3 w-14 h-14 rounded-full ${item.decorColor} group-hover:scale-150 transition-transform duration-500`}
                      />
                      <SummaryIcon
                        size={20}
                        className={`absolute top-3 right-3 ${item.iconColor} opacity-50`}
                      />
                      <div className="relative">
                        <p
                          className={`text-[10px] font-extrabold ${item.labelColor} uppercase tracking-widest`}
                        >
                          {item.label}
                        </p>
                        <p
                          className={`text-2xl font-extrabold ${item.valueColor} mt-1.5`}
                        >
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bar Chart */}
            <div className="px-7 pb-7">
              <BarChart
                data={weeklyData}
                labels={weeklyLabels}
                colors={weeklyColors}
              />
            </div>
          </div>

          {/* Activity Feed */}
          <div
            className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-500"
            style={{ animation: "fadeInUp 0.6s ease-out 0.5s both" }}
          >
            <div className="p-6 border-b border-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-gray-800">
                    Live Activity
                  </h3>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600">
                      Real-time feed
                    </span>
                  </div>
                </div>
                <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 px-4 py-2 rounded-xl hover:bg-indigo-50 transition-all border border-transparent hover:border-indigo-100">
                  View All
                </button>
              </div>
            </div>
            <div className="p-3 max-h-120 overflow-y-auto space-y-0.5 custom-scrollbar">
              {activityFeed.map((item, index) => (
                <ActivityItem key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* ═══════ Department & Cameras Row ═══════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Department Attendance */}
          <div
            className="bg-white rounded-3xl border border-gray-100 p-7 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-500"
            style={{ animation: "fadeInUp 0.6s ease-out 0.6s both" }}
          >
            <div className="flex items-center justify-between mb-7">
              <div>
                <h3 className="text-xl font-extrabold text-gray-800">
                  Departments
                </h3>
                <p className="text-sm text-gray-400 mt-1 font-medium">
                  Attendance by department
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-linear-to-br from-indigo-500 to-blue-600 shadow-xl shadow-indigo-200">
                <PieChart size={16} className="text-white" strokeWidth={2.5} />
              </div>
            </div>

            <div className="space-y-5">
              {departments.map((dept, index) => (
                <div
                  key={index}
                  className="group cursor-pointer"
                  style={{
                    animation: `slideRight 0.5s ease-out ${0.7 + index * 0.08}s both`,
                  }}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-lg transition-all duration-300 group-hover:scale-125 group-hover:rounded-full"
                        style={{ backgroundColor: dept.color }}
                      />
                      <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">
                        {dept.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400 font-medium">
                        {dept.count}
                      </span>
                      <span className="text-xs font-extrabold text-gray-700 bg-gray-50 px-2 py-1 rounded-lg">
                        {dept.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2.5 bg-gray-50 rounded-full overflow-hidden border border-gray-100/50">
                    <div
                      className="h-full rounded-full transition-all duration-1500 ease-out relative overflow-hidden"
                      style={{
                        width: `${dept.percentage}%`,
                        backgroundColor: dept.color,
                        transitionDelay: `${0.7 + index * 0.1}s`,
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{
                          background:
                            "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                          animation: "shimmer 2s ease-in-out infinite",
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-7 pt-5 border-t border-gray-50 flex items-center justify-between">
              <span className="text-sm font-bold text-gray-600">
                Overall Attendance
              </span>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ProgressRing
                    progress={95.3}
                    size={52}
                    strokeWidth={5}
                    color="#6366f1"
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-[11px] font-extrabold text-indigo-600">
                    95%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Camera Grid */}
          <div
            className="lg:col-span-2"
            style={{ animation: "fadeInUp 0.6s ease-out 0.7s both" }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-extrabold text-gray-800">
                  Live Camera Feeds
                </h3>
                <p className="text-sm text-gray-400 mt-1 font-medium">
                  Monitor all connected cameras
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700">
                    {cameras.filter((c) => c.online).length} Online
                  </span>
                </div>
                <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 px-4 py-2 rounded-xl hover:bg-indigo-50 transition-all flex items-center gap-1 border border-transparent hover:border-indigo-100">
                  View All
                  <ChevronRight size={12} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cameras.map((camera, index) => (
                <CameraCard key={index} camera={camera} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* ═══════ System Health Bar ═══════ */}
        <div
          className="relative overflow-hidden bg-white rounded-3xl border border-gray-100 p-7 hover:shadow-xl hover:shadow-gray-100/50 transition-all duration-500"
          style={{ animation: "fadeInUp 0.6s ease-out 0.8s both" }}
        >
          {/* Subtle gradient bg */}
          <div className="absolute inset-0 bg-linear-to-r from-indigo-50/20 via-white to-sky-50/20 rounded-3xl" />

          <div className="relative">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-7">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-600 shadow-xl shadow-emerald-200">
                  <Activity
                    size={20}
                    className="text-white"
                    strokeWidth={2.5}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-gray-800">
                    System Health
                  </h3>
                  <p className="text-sm text-gray-400 font-medium">
                    All systems operational
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-emerald-50 border border-emerald-100">
                <CheckCircle2
                  size={16}
                  className="text-emerald-500"
                  fill="currentColor"
                  strokeWidth={0}
                />
                <span className="text-sm font-bold text-emerald-700">
                  99.9% Uptime
                </span>
                <div className="w-px h-4 bg-emerald-200" />
                <span className="text-xs text-emerald-500 font-medium">
                  Last 30 days
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                {
                  label: "CPU Usage",
                  value: "34%",
                  status: "good",
                  icon: Cpu,
                  color: "#10b981",
                },
                {
                  label: "Memory",
                  value: "62%",
                  status: "good",
                  icon: Database,
                  color: "#6366f1",
                },
                {
                  label: "GPU Load",
                  value: "78%",
                  status: "warning",
                  icon: Zap,
                  color: "#f59e0b",
                },
                {
                  label: "Network",
                  value: "12ms",
                  status: "good",
                  icon: Globe,
                  color: "#0ea5e9",
                },
                {
                  label: "Storage",
                  value: "45%",
                  status: "good",
                  icon: Server,
                  color: "#8b5cf6",
                },
                {
                  label: "API Latency",
                  value: "23ms",
                  status: "good",
                  icon: Timer,
                  color: "#ec4899",
                },
              ].map((metric, index) => {
                const MetricIcon = metric.icon;
                return (
                  <div
                    key={index}
                    className="relative text-center p-5 rounded-2xl bg-gray-50/60 border border-gray-100/80 hover:bg-white hover:shadow-xl hover:shadow-gray-100/50 hover:border-gray-200 transition-all duration-400 group cursor-pointer hover:-translate-y-1 overflow-hidden"
                    style={{
                      animation: `fadeInUp 0.5s ease-out ${0.9 + index * 0.06}s both`,
                    }}
                  >
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"
                      style={{ backgroundColor: metric.color }}
                    />

                    <div className="relative">
                      <div
                        className="mx-auto mb-3 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${metric.color}15`,
                        }}
                      >
                        <MetricIcon
                          size={18}
                          style={{ color: metric.color }}
                          strokeWidth={2.5}
                        />
                      </div>
                      <p className="text-xl font-extrabold text-gray-800">
                        {metric.value}
                      </p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.08em] mt-1.5">
                        {metric.label}
                      </p>

                      {/* Status indicator */}
                      <div className="flex justify-center mt-2.5">
                        <div
                          className={`w-8 h-1 rounded-full ${
                            metric.status === "good"
                              ? "bg-emerald-300"
                              : "bg-amber-300"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ═══════ Footer ═══════ */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 pb-2"
          style={{ animation: "fadeInUp 0.6s ease-out 1s both" }}
        >
          <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
            <Shield size={12} className="text-indigo-400" />
            <span>FaceTrack AI Dashboard v2.0 — Secured & Encrypted</span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400 font-medium">
            <span className="hover:text-indigo-500 cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-indigo-500 cursor-pointer transition-colors">
              Documentation
            </span>
            <span className="hover:text-indigo-500 cursor-pointer transition-colors">
              Support
            </span>
          </div>
        </div>
      </div>

      {/* ═══════ Styles ═══════ */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-24px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scanLine {
          0%, 100% { top: 0%; }
          50% { top: 100%; }
        }

        @keyframes drawLine {
          from {
            stroke-dasharray: 400;
            stroke-dashoffset: 400;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .animate-drawLine {
          animation: drawLine 2s ease-out forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 1.5s ease-out forwards;
        }

        /* Custom scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(99, 102, 241, 0.15);
          border-radius: 12px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(99, 102, 241, 0.3);
        }

        /* Smooth transition utility */
        .transition-all {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Selection color */
        ::selection {
          background: rgba(99, 102, 241, 0.15);
          color: #4338ca;
        }
      `}</style>
    </div>
  );
};

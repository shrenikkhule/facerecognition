import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ScanFace,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Shield,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate loading
    setTimeout(() => {
      if (form.email === "shrenik@gmail.com" && form.password === "123") {
        localStorage.setItem("token", "demo-token");
        navigate("/dashboard");
      } else {
        setError("Invalid Email or Password");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden flex items-center justify-center p-4">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Circles */}
        <div className="absolute top-0 -left-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-r from-indigo-400 to-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

        {/* Dot Pattern */}
        <div className="absolute inset-0 bg-dot-pattern opacity-30"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-6">
          {/* Logo */}
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-lg border border-white/50">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-xl blur opacity-40 group-hover:opacity-60 transition"></div>
              <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl">
                <ScanFace className="text-white w-8 h-8" strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                FaceTrack AI
              </h1>
            </div>
          </div>

          {/* Hero Text */}
          <div className="space-y-4">
            <h2 className="text-5xl font-bold text-gray-800 leading-tight">
              Welcome to the
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Future of Recognition
              </span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Advanced AI-powered facial recognition system for seamless
              employee management and secure access control.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            {[
              "Real-time face detection & recognition",
              "Advanced security protocols",
              "Comprehensive analytics dashboard",
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/50"
              >
                <CheckCircle2 className="text-green-500 w-5 h-5 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-2xl blur opacity-40 group-hover:opacity-60 transition"></div>
                <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl">
                  <ScanFace
                    className="text-white w-10 h-10"
                    strokeWidth={2.5}
                  />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                FaceTrack AI
              </span>
            </h1>
            <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              Advanced Recognition System
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-8">
            {/* Welcome Text */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
                Welcome Back
                <Sparkles className="w-5 h-5 text-indigo-500" />
              </h2>
              <p className="text-gray-600 text-sm">
                Sign in to access your dashboard
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg animate-shake">
                <p className="text-red-600 text-sm flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  {error}
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full pl-11 pr-12 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 cursor-pointer"
                  />
                  <span className="text-gray-600 group-hover:text-gray-800 transition-colors">
                    Remember me
                  </span>
                </label>
                <button
                  type="button"
                  className="text-blue-600 hover:text-blue-700 transition-colors font-semibold"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full group overflow-hidden rounded-lg"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/50"></div>
                <div className="relative flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </div>
              </button>
            </form>

            {/* Demo Credentials Card */}
            {/* <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Email:</span>
                  <span className="text-blue-600 font-mono font-semibold">shrenik@gmail.com</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 font-medium">Password:</span>
                  <span className="text-blue-600 font-mono font-semibold">123</span>
                </div>
              </div>
            </div> */}
          </div>

          {/* Footer */}
          {/* <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <button className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                Contact Administrator
              </button>
            </p>
          </div> */}
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-4px);
          }
          75% {
            transform: translateX(4px);
          }
        }

        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .bg-dot-pattern {
          background-image: radial-gradient(
            rgba(99, 102, 241, 0.15) 1px,
            transparent 1px
          );
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
};

export default Login;

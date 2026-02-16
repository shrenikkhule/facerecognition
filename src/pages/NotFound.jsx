import { useState, useEffect } from "react";

export const NotFound = () => {
  const [bounce, setBounce] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const bounceInterval = setInterval(() => {
      setBounce(true);
      setTimeout(() => setBounce(false), 500);
    }, 3000);

    return () => clearInterval(bounceInterval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="overflow-hidden relative min-h-screen bg-linear-to-br from-pink-100 via-blue-100 to-purple-100 flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full animate-float-slow opacity-60" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-300 rounded-full animate-float-medium opacity-60" />
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-blue-300 rounded-full animate-float-fast opacity-60" />
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-purple-300 rounded-full animate-float-slow opacity-60" />
        <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-green-300 rounded-full animate-float-medium opacity-60" />
      </div>

      <div className="absolute top-20 left-20 w-72 h-72 bg-linear-to-br from-pink-300 to-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" />
      <div className="absolute top-40 right-20 w-72 h-72 bg-linear-to-br from-blue-300 to-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000" />
      <div className="absolute bottom-20 left-40 w-72 h-72 bg-linear-to-br from-green-300 to-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000" />
      <div
        className="relative z-10 text-center px-4"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
          transition: "transform 0.2s ease-out",
        }}
      >
        <div className="relative mb-8">
          <h1
            className={`text-9xl md:text-[200px] font-black bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent select-none ${
              bounce ? "animate-bounce-big" : ""
            }`}
          >
            <span className="inline-block hover:animate-spin-slow">4</span>
            <span className="inline-block hover:animate-wiggle">0</span>
            <span className="inline-block hover:animate-spin-slow">4</span>
          </h1>

          <div className="absolute inset-0 -z-10 blur-2xl opacity-50">
            <h1 className="text-9xl md:text-[200px] font-black bg-linear-to-r from-pink-300 via-purple-300 to-blue-300 bg-clip-text text-transparent">
              404
            </h1>
          </div>
        </div>

        <div className="space-y-4 mb-12">
          <p className="text-xl md:text-2xl text-gray-700 font-medium">
            Looks like you've wandered off the map
          </p>
          <p className="text-lg text-gray-600">
            The page you're looking for doesn't exist
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => window.history.back()}
            className="group relative px-8 py-4 bg-linear-to-r from-pink-500 to-purple-500 text-white font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-300/50 hover:rotate-2"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg
                className="w-5 h-5 group-hover:-translate-x-2 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Go Back
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="group relative px-8 py-4 bg-white border-4 border-purple-500 text-purple-600 font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-pink-300/50 hover:-rotate-2"
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg
                className="w-5 h-5 group-hover:rotate-180 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9) rotate(240deg);
          }
        }
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-20px) translateX(10px);
          }
        }
        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-30px) translateX(-15px);
          }
        }
        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-40px) translateX(20px);
          }
        }
        @keyframes confetti {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes wave {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-10deg);
          }
          75% {
            transform: rotate(10deg);
          }
        }
        @keyframes swing {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(15deg);
          }
          75% {
            transform: rotate(-15deg);
          }
        }
        @keyframes bounce-big {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-30px) scale(1.05);
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 5s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 4s ease-in-out infinite;
        }
        .animate-confetti {
          animation: confetti linear infinite;
        }
        .animate-wave {
          animation: wave 1s ease-in-out infinite;
        }
        .animate-wiggle {
          animation: wiggle 1s ease-in-out infinite;
        }
        .animate-swing {
          animation: swing 2s ease-in-out infinite;
        }
        .animate-bounce-big {
          animation: bounce-big 0.5s ease-in-out;
        }
        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
        .animation-delay-0 {
          animation-delay: 0s;
        }
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-300 {
          animation-delay: 0.3s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

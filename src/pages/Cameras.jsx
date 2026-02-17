import React, { useEffect, useState } from "react";
import { FakeCCTVPlayer } from "../components/FakeCCTVPlayer";
import { getFakeCameras } from "../components/fakeCameraApi";

export const Cameras = () => {
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCam, setActiveCam] = useState(null);

  useEffect(() => {
    getFakeCameras().then((data) => {
      setCameras(data);
      setLoading(false);
    });
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050a18] text-white">
        Loading CCTV Feeds...
      </div>
    );

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 tracking-widest">
        CCTV MONITORING SYSTEM
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cameras.map((cam) => (
          <div
            key={cam.id}
            onClick={() => setActiveCam(cam)}
            className="
              border border-cyan-500/20
              rounded-xl overflow-hidden
              cursor-pointer
              hover:border-cyan-400
              hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]
              transition
            "
          >
            <div className="h-48">
              <FakeCCTVPlayer video={cam.video} name={cam.name} />
            </div>

            <div className="p-2 bg-black/70 text-xs">
              {cam.name} • {cam.location}
            </div>
          </div>
        ))}
      </div>

      {activeCam && (
        <div
          className="fixed inset-0 bg-black/95 flex items-center justify-center z-50"
          onClick={() => setActiveCam(null)}
        >
          <div className="w-[90%] max-w-6xl h-[80vh]">
            <FakeCCTVPlayer video={activeCam.video} name={activeCam.name} />
          </div>
        </div>
      )}
    </div>
  );
};

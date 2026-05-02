import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VipulBirthday() {
  const [stage, setStage] = useState(0);
  const [started, setStarted] = useState(false);
  const [playMusic, setPlayMusic] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [flash, setFlash] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const target = new Date("2026-05-06T00:00:00");
    const now = new Date();
    const diff = target - now;
    return diff > 0
      ? {
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60),
      }
      : null;
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const move = (e) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {!started ? (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center space-y-8 w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[70vh]">
            <h1 className="text-4xl md:text-6xl font-extrabold text-red-500 animate-pulse tracking-wide">
              👁️ Are You Ready?
            </h1>
            <p className="text-gray-400 mt-4">
              A new era begins… once you step forward.
            </p>
            <button
              onClick={() => {
                setStarted(true);
                setPlayMusic(true);
              }}
              className="px-10 py-5 text-xl w-full max-w-xs bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-2xl font-bold shadow-lg shadow-red-500/30"
            >
              Enter the World
            </button>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">

          {/* BACKGROUND */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute w-[800px] h-[800px] bg-red-600 opacity-20 blur-[150px] rounded-full animate-pulse"></div>
            <div className="absolute right-0 w-[600px] h-[600px] bg-purple-600 opacity-20 blur-[120px] rounded-full animate-pulse"></div>
          </div>
          {flash && (
            <div className="fixed inset-0 bg-black z-50"></div>
          )}
          <div
            className="pointer-events-none fixed w-40 h-40 rounded-full bg-red-600 opacity-20 blur-3xl"
            style={{
              left: cursor.x - 80,
              top: cursor.y - 80,
            }}
          />
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white opacity-30 rounded-full animate-pulse"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>

          {/* Background Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute w-[800px] h-[800px] bg-red-600 opacity-20 blur-[150px] rounded-full animate-pulse"></div>
            <div className="absolute right-0 w-[600px] h-[600px] bg-purple-600 opacity-20 blur-[120px] rounded-full animate-pulse"></div>
          </div>

          {/* MUSIC */}
          {playMusic && (
            <audio autoPlay loop>
              <source src="/bairan.mp3" type="audio/mpeg" />
            </audio>
          )}

          <AnimatePresence mode="wait">
            {stage === 0 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }} className="text-center space-y-8 w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[70vh]">
                <h1 className="text-4xl md:text-6xl font-extrabold text-purple-400 tracking-wide">⏳ The Awakening Begins</h1>
                {timeLeft ? (
                  <div className="text-2xl">
                    {timeLeft.d}d {timeLeft.h}h {timeLeft.m}m {timeLeft.s}s
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      console.log("clicked");
                      setStage(1);
                    }}
                    className="px-10 py-5 text-xl w-full max-w-xs bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-2xl font-bold shadow-lg shadow-red-500/30"
                  >
                    Begin the Story
                  </button>
                )}
              </motion.div>
            )}

            {stage === 1 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }} className="text-center space-y-8 w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[70vh]">
                <h1 className="text-4xl md:text-6xl font-extrabold text-pink-400">🎬 Episode 1</h1>
                <p>The world doesn’t change… unless someone dares to command it.</p>
                <button onClick={() => {
                  setFlash(true);
                  setTimeout(() => {
                    setFlash(false);
                    setStage(2);
                  }, 300);
                }} className="px-10 py-5 text-xl w-full max-w-xs bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-2xl font-bold shadow-lg shadow-red-500/30">
                  Continue ▶
                </button>
              </motion.div>
            )}

            {stage === 2 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }} className="text-center space-y-8 w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[70vh]">
                <div className="text-4xl md:text-6xl animate-pulse">👁️</div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-red-500 drop-shadow-lg">
                  🔥 Happy Birthday Vipul 🔥
                </h1>
                <button onClick={() => {
                  setStage(3);
                }} className="px-10 py-5 text-xl w-full max-w-xs bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-2xl font-bold shadow-lg shadow-red-500/30">
                  Unlock Power
                </button>
              </motion.div>
            )}

            {stage === 3 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }} className="text-center space-y-8 w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[70vh]">
                <button
                  onClick={() => setTimeout(() => {
                    setStage(4);
                  }, 800)}
                  className="px-10 py-5 text-xl w-full max-w-xs bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-2xl font-bold shadow-lg shadow-red-500/30"
                >
                  Final Message
                </button>
              </motion.div>
            )}

            {stage === 4 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }} className="text-center space-y-8 w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[70vh]">
                <h1 className="text-4xl md:text-6xl font-extrabold text-yellow-400">👑 Message from your Brother</h1>
                <p className="max-w-2xl mx-auto text-lg text-gray-300 leading-relaxed">
                  From all the chaos we’ve been through…
                  to the memories we built without even realizing…
                  you were never ordinary.
                </p>

                <p className="text-xl text-gray-400 mt-3">
                  You were always meant to stand above the rest.
                </p>

                <p className="text-red-500 text-3xl font-bold animate-pulse drop-shadow-lg mt-6">
                  ⚡ ALL HAIL VIPUL ⚡
                </p>
              </motion.div>
            )}
          </AnimatePresence>

        </div >
      )
      }
    </>
  );
}
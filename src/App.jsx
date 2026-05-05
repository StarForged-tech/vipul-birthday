import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VipulBirthday() {
  const [showLine2, setShowLine2] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const [secret, setSecret] = useState(false);
  const [stage, setStage] = useState(0);
  const [started, setStarted] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const [pulse, setPulse] = useState(false);
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
  useEffect(() => {
    if (stage === 4) {
      const fullText = "Jan 6 ko meine server join kiya tha... thoda bhi nervous tha but then aapko VC me dekha and everything just become memory";
      let i = 0;

      const interval = setInterval(() => {
        setTypedText(fullText.slice(0, i));
        setIsTyping(true); // NEW
        i++;

        if (i > fullText.length) {
          clearInterval(interval);
          setIsTyping(false);
          setTypingDone(true);

          setTimeout(() => setShowLine2(true), 600);
          setTimeout(() => setShowFinal(true), 1400);
        }
      }, 35); // slightly faster = better feel

      return () => clearInterval(interval);
    }
  }, [stage]);

  return (
    <>
      {!started ? (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="relavtive z-10 text-center space-y-8 w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[70vh]">
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
        <div
          className="min-h-screen text-white flex items-center justify-center p-6 relative overflow-hidden"
          style={{
            backgroundImage: "url('/bg.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/80 mix-blend-overlay pointer-events-none"></div>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute w-[600px] h-[600px] bg-red-600 opacity-20 blur-[120px] rounded-full animate-pulse"></div>
          </div>

          {/* BACKGROUND */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute w-[300px] h-[300px] bg-red-600 opacity-5 blur-[80px] rounded-full"></div>
            <div className="absolute right-0 w-[250px] h-[250px] bg-purple-600 opacity-5 blur-[70px] rounded-full"></div>
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
                {false ? (
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
                <div className="flex items-center justify-center gap-15 mb-6">

                  {/* LEFT EYE */}
                  <img
                    src="/eye.png"
                    alt="eye"
                    className="w-20 md:w-28 animate-[pulse_1.5s_ease-in-out_infinite] drop-shadow-[0_0_10px_rgba(255,0,0,0.6)] scale-x-[-1]"
                  />

                  {/* LELOUCH */}
                  <img
                    src="/lelouch-1.png"
                    alt="Lelouch"
                    className="w-40 md:w-64 relative z-10 drop-shadow-[0_0_18px_rgba(255,0,0,0.35)]"
                    style={{ transform: "translateY(20px)" }}
                  />

                  {/* RIGHT EYE */}
                  <img
                    src="/eye.png"
                    alt="eye"
                    className="w-20 md:w-28 animate-[pulse_1.5s_ease-in-out_infinite] drop-shadow-[0_0_10px_rgba(255,0,0,0.6)]"
                  />

                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-red-500 drop-shadow-lg">
                  🔥 Happy Birthday Vipul 🔥
                </h1>
                <button onClick={() => {
                  // 🔴 FLASH
                  const flash = document.createElement("div");
                  flash.style.position = "fixed";
                  flash.style.inset = "0";
                  flash.style.background = "red";
                  flash.style.opacity = "0.9";
                  flash.style.zIndex = "9999";
                  document.body.appendChild(flash);

                  // fade out
                  setTimeout(() => {
                    flash.style.opacity = "0";
                  }, 100);

                  // remove flash
                  setTimeout(() => {
                    flash.remove();
                  }, 300);

                  // 🔊 SAFE AUDIO SYNC (no crash)
                  try {
                    if (audioRef.current) {
                      audioRef.current.currentTime = 0;
                      audioRef.current.play();
                    }
                  } catch (e) {
                    console.log("audio error ignored");
                  }

                  // 🎬 IMPORTANT: stage change (guaranteed)
                  setTimeout(() => {
                    setStage(3);
                  }, 300);
                }} className="px-10 py-5 text-xl w-full max-w-xs bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-2xl font-bold shadow-lg shadow-red-500/30">
                  Unlock Power
                </button>
              </motion.div>
            )}

            {stage === 3 && (
              <motion.div initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6 }} className="text-center space-y-8 w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[70vh]">
                <button
                  onClick={() => setTimeout(() => {
                    setTimeout(() => {
                      setStage(4);
                    }, 700);
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
                <h1 className="text-orange-400 text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-[0_0_15px_rgba(0,0,0,0.9)]">👑 Message from your Brother</h1>
                <p
                  className={`text-white text-lg md:text-xl font-semibold drop-shadow-[0_0_10px_rgba(0,0,0,1)] transition-all duration-500 
                    ${isTyping ? "tracking-wide scale-[1.02]" : ""}
                    ${typingDone ? "scale-105 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]" : ""}
                    `}
                >
                  {typedText}
                  {isTyping && <span className="animate-pulse ml-1">▌</span>}
                </p>
                <p className="text-cyan-200 text-sm md:text-base font-semibold opacity-0 animate-[fadeIn_1s_ease_forwards]">
                  Jan 6 ko server join kiya tha, honestly thoda nervous tha ki kaise connect karunga sabse…
                  phir VC me aapko dekha 👀 aur laga jab Owner hi itna chill hai, toh baat karna banta hai.
                </p>
                <p className="text-cyan-300 text-sm md:text-base mt-2 font-semibold opacity-0 animate-[fadeIn_1s_ease_forwards]">
                  Beech me college ke chakkar me inactive ho gaya tha… par jab wapas aaya,
                  new username aur pfp ke saath lekin tab bhi aapne pehchaan liya aur same trash talks and games...
                </p>

                <p className="text-cyan-300 text-sm md:text-base mt-2 font-semibold opacity-0 animate-[fadeIn_1s_ease_forwards]">
                  Brawlhalla khelne bola… aur phir jo trolling kari aapne 😒😂
                  par honestly bohot mazza aaya and maybe me hamesha Brawlhalla khelunga 🎮
                </p>
                <p className="text-amber-300 text-base md:text-lg mt-4 font-bold drop-shadow-[0_0_10px_rgba(0,0,0,1)]">
                  Finally Happiest Birthday Vipul Bhaiya 🎉🔥
                </p>

                <p className="text-fuchsia-300 text-sm md:text-base mt-2 font-semibold drop-shadow-[0_0_12px_rgba(0,0,0,1)]">
                  Aur sun lo… Brawlhalla me hara ke rahunga 👾⚔️
                </p>

                <p
                  onClick={() => {
                    if (!secret) {
                      setSecret(true);
                      setPulse(true);

                      setTimeout(() => {
                        setPulse(false);
                      }, 400);
                    }
                  }}
                  className={`cursor-pointer text-red-400 text-2xl md:text-3xl font-bold tracking-widest drop-shadow-[0_0_12px_rgba(0,0,0,1)] transition-all duration-300
                    style={{ letterSpacing: "2px" }}
                    ${pulse ? "scale-110 drop-shadow-[0_0_20px_rgba(255,0,0,0.6)]" : "hover:scale-105"}
                  `}
                >
                  ⚡ ALL HAIL VIPUL ⚡
                </p>
                {showFinal && secret && (
                  <div className="mt-4 bg-black/40 px-5 py-3 rounded-xl inline-block backdrop-blur-md animate-fadeIn">

                    <p className="text-gray-200 text-sm md:text-base italic drop-shadow-[0_0_10px_rgba(0,0,0,1)]">
                      You found the hidden message…
                    </p>

                    <p className="text-gray-100 text-sm md:text-base mt-1 font-medium drop-shadow-[0_0_12px_rgba(0,0,0,1)]">
                      😁 Now give me Welkin 😜
                    </p>

                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

        </div >
      )
      }
    </>
  );
}
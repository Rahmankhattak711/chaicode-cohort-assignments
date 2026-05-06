import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Joke {
  id: number;
  content: string;
}

export default function JokesViewer() {
  const [jokes, setJokes] = React.useState<Joke[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  // Super crazy gradients
  const crazyGradients = [
    "from-pink-400 via-purple-500 to-cyan-400",
    "from-yellow-400 via-orange-500 to-red-500",
    "from-emerald-400 via-teal-500 to-cyan-500",
    "from-violet-400 via-fuchsia-500 to-pink-500",
    "from-rose-400 via-amber-500 to-yellow-400",
    "from-blue-400 via-indigo-500 to-purple-500",
  ];

  const innerColors = [
    "bg-white/90",
    "bg-yellow-50/95",
    "bg-pink-50/95",
    "bg-cyan-50/95",
    "bg-violet-50/95",
  ];

  const fetchJokes = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const response = await fetch(
        "https://api.freeapi.app/api/v1/public/randomjokes?limit=6"
      );
      if (response.ok) {
        const data = await response.json();
        setJokes(data.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching jokes:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  // Confetti explosion function
  const triggerConfetti = () => {
    // const colors = ["#ff0080", "#00ffff", "#ffff00", "#ff00ff", "#00ff00"];
    for (let i = 0; i < 80; i++) {
      setTimeout(() => {
        const confetto = document.createElement("div");
        confetto.className = "fixed pointer-events-none z-50 text-2xl";
        confetto.style.left = Math.random() * 100 + "vw";
        confetto.style.top = "-50px";
        confetto.textContent = ["😂", "🤣", "💥", "🔥", "✨", "🚀"][Math.floor(Math.random() * 6)];
        document.body.appendChild(confetto);

        const duration = Math.random() * 3 + 2;
        confetto.animate(
          [
            { transform: "translateY(0) rotate(0deg)", opacity: 1 },
            { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 800 - 400}deg)`, opacity: 0 }
          ],
          { duration: duration * 1000, easing: "cubic-bezier(0.25, 0.1, 0.25, 1)" }
        );

        setTimeout(() => confetto.remove(), duration * 1000 + 100);
      }, i * 8);
    }
  };

  const handleRefresh = () => {
    triggerConfetti();
    fetchJokes(true);
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-purple-950 via-black to-fuchsia-950 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:40px_40px]" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          className="h-24 w-24 rounded-full border-8 border-transparent border-t-pink-500 border-r-cyan-500 shadow-[0_0_60px_#ff00ff]"
        />
        <div className="absolute text-4xl font-black tracking-[0.5em] text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-cyan-400 animate-pulse">
          LOADING CHAOS...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-hidden relative">
      {/* Crazy animated background */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:50px_50px]" />
      <div className="absolute inset-0 opacity-30">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl"
            initial={{
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -800],
              x: [0, Math.random() * 200 - 100],
              rotate: [0, Math.random() * 720 - 360],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 15 + 12,
              repeat: Infinity,
              delay: Math.random() * -20,
            }}
          >
            {["😂", "🤣", "💀", "🔥", "🚀", "🌈", "💥"][i % 7]}
          </motion.div>
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <motion.span
              animate={{ rotate: [-15, 15, -15] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-7xl inline-block"
            >
              🤯
            </motion.span>
          </div>
          <h1 className="text-7xl md:text-8xl font-black tracking-[-0.05em] bg-gradient-to-r from-pink-400 via-yellow-300 via-purple-400 to-cyan-400 bg-clip-text text-transparent leading-none">
            TOTAL<br />CHAOS JOKES
          </h1>
          <p className="mt-4 text-xl text-purple-300 font-mono tracking-widest">WARNING: MAY CAUSE UNCONTROLLABLE LAUGHTER</p>
        </motion.div>

        {/* Jokes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {jokes.map((joke, index) => (
              <motion.div
                key={joke.id || index}
                layout
                initial={{ opacity: 0, scale: 0.6, rotate: -15 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 15 }}
                whileHover={{
                  scale: 1.08,
                  rotate: Math.random() * 4 - 2,
                  transition: { type: "spring", stiffness: 300 }
                }}
                transition={{ delay: Math.min(index * 0.08, 0.6) }}
                className="relative group"
              >
                <div
                  className={`relative overflow-hidden rounded-3xl p-1 shadow-2xl shadow-purple-500/30 bg-gradient-to-br ${crazyGradients[index % crazyGradients.length]}`}
                >
                  <div className={`relative h-full rounded-3xl p-8 ${innerColors[index % innerColors.length]} text-gray-900 backdrop-blur-xl`}>
                    {/* Decorative elements */}
                    <div className="absolute -top-6 -right-6 text-8xl opacity-20 group-hover:opacity-40 transition-all group-hover:rotate-12">💥</div>
                    <div className="absolute -bottom-8 -left-8 text-7xl opacity-20 group-hover:opacity-40 transition-all group-hover:-rotate-12">🤡</div>

                    <div className="mb-4 flex justify-between">
                      <div className="px-4 py-1 rounded-full bg-black/10 text-xs font-mono tracking-widest flex items-center gap-2">
                        <span className="text-red-500">●</span> JOKE #{index + 1}
                      </div>
                      <motion.span
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ repeat: Infinity, duration: 2.5 }}
                        className="text-3xl"
                      >
                        🔥
                      </motion.span>
                    </div>

                    <p className="text-2xl leading-tight font-medium tracking-tight">
                      “{joke.content}”
                    </p>

                    <div className="mt-10 flex items-center justify-between border-t border-black/10 pt-6">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => triggerConfetti()}
                        className="flex items-center gap-2 text-sm font-bold hover:text-pink-600 transition-colors"
                      >
                        <span>LAUGH</span> <span className="text-xl">😂</span>
                      </motion.button>
                      <div className="text-4xl">🤣</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Epic Refresh Button */}
        <div className="mt-16 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
            disabled={refreshing}
            className="group relative flex items-center gap-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 px-12 py-6 text-2xl font-black tracking-wider shadow-[0_0_60px_-10px] shadow-pink-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />

            <span className="relative z-10 flex items-center gap-3">
              {refreshing ? "UNLEASHING MORE CHAOS..." : "MORE MAYHEM PLEASE"}
              <motion.span
                animate={{ rotate: refreshing ? 360 : 0 }}
                transition={{ duration: 0.8, repeat: refreshing ? Infinity : 0 }}
              >
                🌪️
              </motion.span>
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

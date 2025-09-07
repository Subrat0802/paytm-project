import { useState, useEffect, useRef } from "react";

// Simple Whack-a-Mole style game (single-file React component)
// - Uses Tailwind classes for styling
// - Features: timer, score, high score (localStorage), difficulty selector, responsive layout
// - Exported as default React component; drop into a Create React App / Vite + React project

export default function WhackAMole() {
  const GRID_SIZE = 9; // 3x3
  const [activeIndex, setActiveIndex] = useState(null);
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [highScore, setHighScore] = useState(() => {
    try {
      return Number(localStorage.getItem("wam_highscore")) || 0;
    } catch {return 0}
  });
  const [difficulty, setDifficulty] = useState("normal");
  const spawnTimer = useRef(null);
  const tickTimer = useRef(null);

  // Difficulty config: interval (ms) between mole moves
  const DIFF = {
    easy: 900,
    normal: 600,
    hard: 350,
  };

  useEffect(() => {
    // cleanup on unmount
    return () => {
      clearInterval(spawnTimer.current);
      clearInterval(tickTimer.current);
    };
  }, []);

  useEffect(() => {
    // adjust spawn timer when difficulty changes while running
    if (running) {
      startSpawn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  useEffect(() => {
    if (timeLeft === 0 && running) {
      endGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  function startSpawn() {
    clearInterval(spawnTimer.current);
    const interval = DIFF[difficulty] || DIFF['normal'];
    spawnTimer.current = setInterval(() => {
      setActiveIndex((prev) => {
        // pick a different random index
        const idx = Math.floor(Math.random() * GRID_SIZE);
        return idx === prev ? (idx + 1) % GRID_SIZE : idx;
      });
    }, interval);
  }

  function startTick() {
    clearInterval(tickTimer.current);
    tickTimer.current = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);
  }

  function startGame() {
    setScore(0);
    setTimeLeft(30);
    setRunning(true);
    startSpawn();
    startTick();
  }

  function pauseGame() {
    setRunning(false);
    clearInterval(spawnTimer.current);
    clearInterval(tickTimer.current);
  }

  function endGame() {
    setRunning(false);
    setActiveIndex(null);
    clearInterval(spawnTimer.current);
    clearInterval(tickTimer.current);
    // update high score
    setHighScore((prev) => {
      const newHigh = Math.max(prev, score);
      try { localStorage.setItem("wam_highscore", String(newHigh)); } catch(error){console.log(error)}
      return newHigh;
    });
  }

  function handleHit(index) {
    if (!running) return;
    if (index === activeIndex) {
      // success
      setScore((s) => s + 1);
      // immediately hide mole and spawn elsewhere
      setActiveIndex(null);
      // small chance to immediately respawn to keep pace
      setTimeout(() => {
        setActiveIndex(Math.floor(Math.random() * GRID_SIZE));
      }, 140);
    } else {
      // penalty for wrong click
      setScore((s) => Math.max(0, s - 1));
    }
  }

  function resetGame() {
    pauseGame();
    setScore(0);
    setTimeLeft(30);
    setActiveIndex(null);
  }

  // small helper for accessibility label
  function cellLabel(i) {
    return `Hole ${i + 1}`;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-white p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-extrabold">Whack-a-Mole</h1>
          <div className="text-sm text-gray-600">Made with React + Tailwind</div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Left: Game board */}
          <section className="md:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-xs text-gray-500">Time</div>
                <div className="px-3 py-1 rounded-lg bg-gray-100 font-mono">{timeLeft}s</div>
                <div className="text-xs text-gray-500">Score</div>
                <div className="px-3 py-1 rounded-lg bg-gray-100 font-mono">{score}</div>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="px-3 py-1 rounded border"
                  aria-label="Difficulty selector"
                >
                  <option value="easy">Easy</option>
                  <option value="normal">Normal</option>
                  <option value="hard">Hard</option>
                </select>

                {!running ? (
                  <button
                    onClick={startGame}
                    className="px-3 py-1 rounded bg-green-500 text-white font-semibold"
                  >
                    Start
                  </button>
                ) : (
                  <button
                    onClick={pauseGame}
                    className="px-3 py-1 rounded bg-yellow-400 text-black font-semibold"
                  >
                    Pause
                  </button>
                )}

                <button onClick={resetGame} className="px-3 py-1 rounded border">
                  Reset
                </button>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg shadow-inner">
              <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: GRID_SIZE }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleHit(i)}
                    aria-label={cellLabel(i)}
                    className={`relative aspect-square rounded-lg flex items-center justify-center transition-transform transform active:scale-95 focus:outline-none 
                      ${activeIndex === i ? 'bg-amber-100 ring-2 ring-amber-300' : 'bg-white'}
                      shadow
                    `}
                  >
                    {/* hole */}
                    <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
                      <div className="w-3/4 h-1/3 rounded-b-lg bg-slate-200"></div>
                    </div>

                    {/* mole */}
                    <div className={`transition-all duration-200 ${activeIndex === i ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'} pointer-events-none`}>
                      <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">🐹</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Right: Info panel */}
          <aside className="md:col-span-1">
            <div className="p-4 border rounded-lg mb-4">
              <h2 className="font-semibold">Game Info</h2>
              <p className="text-sm text-gray-600">Click the mole as it pops up. Wrong clicks subtract 1 point.</p>

              <div className="mt-3">
                <div className="text-xs text-gray-500">High Score</div>
                <div className="text-2xl font-extrabold">{highScore}</div>
              </div>

              <div className="mt-4">
                <div className="text-xs text-gray-500">Current Difficulty</div>
                <div className="font-medium">{difficulty}</div>
              </div>

              <div className="mt-4 flex gap-2">
                <button onClick={() => { setScore((s)=>s+5) }} className="px-3 py-1 rounded border text-sm">Cheat +5</button>
                <button onClick={() => { setScore(0); localStorage.removeItem('wam_highscore'); setHighScore(0); }} className="px-3 py-1 rounded border text-sm">Reset Scores</button>
              </div>
            </div>

            <div className="p-4 border rounded-lg text-sm text-gray-600">
              <h3 className="font-semibold mb-2">Tips</h3>
              <ul className="list-disc list-inside">
                <li>Start on <strong>easy</strong> to warm up.</li>
                <li>Use short taps — hitting the mole quickly increases score.</li>
                <li>Higher difficulty = faster mole spawns.</li>
              </ul>
            </div>
          </aside>
        </main>

        <footer className="mt-6 text-xs text-gray-500 text-center">
          Tip: place this component in a page and ensure Tailwind CSS is enabled in your project.
        </footer>
      </div>
    </div>
  );
}

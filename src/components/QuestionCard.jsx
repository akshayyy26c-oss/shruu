
import { useState } from "react";

export default function QuestionCard({
  question,
  questionNumber,
  onYes,
  saving = false,
}) {
  const [noVisible, setNoVisible] = useState(true);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(1);
  const [particles, setParticles] = useState(false);
  const [noClicks, setNoClicks] = useState(0);

  const moveNoButton = () => {
    setNoPosition({
      x: Math.random() * 220 - 110,
      y: Math.random() * 100 - 50,
    });
  };

  const handleNo = () => {
    if (questionNumber === 0) {
      moveNoButton();
      return;
    }

    if (questionNumber === 1) {
      setParticles(true);

      setTimeout(() => {
        setNoVisible(false);
      }, 500);

      return;
    }

    if (questionNumber === 2) {
      const clicks = noClicks + 1;
      setNoClicks(clicks);
      setOpacity(Math.max(0, 1 - clicks * 0.3));

      if (clicks >= 5) {
        setTimeout(() => setNoVisible(false), 300);
      }
    }
  };

  return (
    <div className="question-card relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.055] p-7 shadow-2xl backdrop-blur-2xl sm:p-11">

      <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-purple-600/20 blur-[90px]" />

      <div className="relative z-10">

        <div className="mb-8 flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-[0.3em] text-pink-300">
            QUESTION 0{questionNumber + 1}
          </span>

          <span className="text-xs text-white/30">
            Be honest.
          </span>
        </div>

        <h2 className="min-h-28 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          {question.question}
        </h2>

        <p className="mt-4 text-sm text-white/45">
          Your answer matters... but friendship matters more.
        </p>

        <div className="relative mt-12 flex min-h-16 flex-wrap items-center justify-center gap-5">

          <button
            onClick={onYes}
            disabled={saving}
            className="rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-12 py-4 text-sm font-bold shadow-lg shadow-pink-500/20 transition duration-300 hover:-translate-y-1 hover:shadow-pink-500/40 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "SAVING..." : "YES"}
          </button>

          {noVisible && (
            <button
              onClick={handleNo}
              onMouseEnter={
                questionNumber === 0 ? moveNoButton : undefined
              }
              onTouchStart={
                questionNumber === 0 ? moveNoButton : undefined
              }
              style={{
                opacity,
                transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
                transition: "all 0.3s ease",
              }}
              className={`relative rounded-full backdrop-blur-[500px] border border-white/30 bg-white/[0.06] px-12 py-4 text-sm font-bold text-white/75 transition-all hover:backdrop-blur-[20px] hover:bg-white/20 ${
                particles ? "particle-explode" : ""
              }`}
            >
              NO
            </button>
          )}

        </div>

        {questionNumber === 1 && particles && (
          <div className="mt-5 text-center text-sm text-pink-300 animate-pulse">
            BOOM! The NO button has left the friendship group.
          </div>
        )}

        {questionNumber === 2 && noClicks > 0 && noVisible && (
          <p className="mt-5 text-center text-xs text-white/40">
            NO button power: {Math.round(opacity * 100)}%
          </p>
        )}

      </div>
    </div>
  );
}

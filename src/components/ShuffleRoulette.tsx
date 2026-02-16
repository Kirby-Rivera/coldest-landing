import { useRef } from "react";

interface ShuffleRouletteProps {
  children: string;
  speed?: number;
  chars?: string;
}

function ShuffleRoulette({
  children,
  speed = 50,
  chars = "abcdefghijklmnopqrstuvwxyz",
}: ShuffleRouletteProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const originalText = children;

  const shuffle = () => {
    if (!textRef.current) return;

    let iteration = 0;
    const maxIterations = originalText.length;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (!textRef.current) return;

      textRef.current.textContent = originalText
        .split("")
        .map((letter, index) => {
          // Already revealed
          if (index < iteration) {
            return originalText[index];
          }

          // Keep spaces
          if (letter === " ") return " ";

          // Random character
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 3; // Slower reveal
    }, speed);
  };

  const reset = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (textRef.current) {
      textRef.current.textContent = originalText;
    }
  };

  return (
    <span
      ref={textRef}
      onMouseEnter={shuffle}
      onMouseLeave={reset}
      className="cursor-pointer inline-block font-mono tracking-wide font-semibold w-[52px] text-center"
    >
      {children}
    </span>
  );
}

export default ShuffleRoulette;

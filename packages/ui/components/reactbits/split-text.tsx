"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { cn } from "@repo/ui/lib/utils";

interface SplitTextProps {
  text?: string;
  className?: string;
  delay?: number;
  animationFrom?: { opacity: number; y: number };
  animationTo?: { opacity: number; y: number };
  transition?: { duration: number; ease: number[] };
  threshold?: number;
  rootMargin?: string;
  textAlign?: "left" | "right" | "center" | "justify" | "start" | "end";
  onLetterAnimationComplete?: () => void;
}

type Word = string[];
type Words = Word[];

export const SplitText = ({
  text = "",
  className = "",
  delay = 0.1,
  animationFrom = { opacity: 0, y: 40 },
  animationTo = { opacity: 1, y: 0 },
  transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
}: SplitTextProps) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const animatedCount = useRef(0);

  // 优化文本处理
  const words: Words = useMemo(() => 
    text.split(" ").map(word => word.split("")), 
    [text]
  );
  
  const letters: string[] = useMemo(() => 
    words.flat(),
    [words]
  );

  // 优化动画完成处理函数
  const handleAnimationComplete = useCallback(() => {
    animatedCount.current += 1;
    if (animatedCount.current === letters.length && onLetterAnimationComplete) {
      onLetterAnimationComplete();
    }
  }, [letters.length, onLetterAnimationComplete]);

  // 优化 Intersection Observer
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  // 优化字母索引计算
  const getLetterIndex = useCallback((wordIndex: number, letterIndex: number): number => 
    words.slice(0, wordIndex).reduce((acc: number, w: string[]) => acc + w.length, 0) + letterIndex,
    [words]
  );

  return (
    <p
      ref={ref}
      className={cn("split-parent overflow-hidden inline", className)}
      style={{ textAlign, whiteSpace: "normal", wordWrap: "break-word" }}
      aria-label={text}
    >
      {words.map((word: string[], wordIndex: number) => (
        <span
          key={`word-${wordIndex}`}
          className="inline-block whitespace-nowrap"
        >
          {word.map((letter: string, letterIndex: number) => {
            const index = getLetterIndex(wordIndex, letterIndex);

            return (
              <motion.span
                key={`letter-${index}`}
                initial={animationFrom}
                animate={inView ? animationTo : animationFrom}
                transition={{
                  ...transition,
                  delay: index * delay,
                }}
                onAnimationComplete={handleAnimationComplete}
                className="inline-block transform transition-opacity will-change-transform"
                aria-hidden="true"
              >
                {letter}
              </motion.span>
            );
          })}
          <span className="inline-block w-[0.3em]">&nbsp;</span>
        </span>
      ))}
    </p>
  );
};

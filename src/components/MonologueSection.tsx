import { memo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface MonologueSectionProps {
  lines: string[];
  className?: string;
  variant?: 'dark' | 'purple' | 'bright-purple' | 'deep-purple' | 'default';
}

export const MonologueSection = memo(function MonologueSection({ lines, className = '', variant = 'default' }: MonologueSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // 원본 사이트의 다양한 배경 스타일
  const variantStyles: Record<string, string> = {
    'default': 'bg-background',
    'dark': 'bg-[hsl(270,20%,8%)]',
    'purple': 'bg-[hsl(270,60%,55%)]',
    'bright-purple': 'bg-[hsl(275,70%,60%)]',
    'deep-purple': 'bg-[hsl(265,40%,12%)]',
  };

  const textColorClass = variant === 'purple' || variant === 'bright-purple'
    ? 'text-white text-shadow'
    : 'text-text-body';

  return (
    <section
      ref={ref}
      className={`relative flex min-h-[60vh] flex-col items-center justify-center px-4 py-12 md:min-h-[80vh] md:py-24 lg:min-h-screen lg:py-32 ${variantStyles[variant]} ${className}`}
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsla(var(--primary)/0.03)_0%,transparent_70%)]" />

      <div className="monologue-text relative z-10">
        {lines.map((line, index) => {
          const start = 0.1 + index * 0.12;
          // 각 줄이 등장한 후 0.5만큼의 구간 동안 보여지고 사라지도록 수정
          const end = start + 0.5;

          return (
            <MonologueLine
              key={index}
              line={line}
              scrollProgress={scrollYProgress}
              start={start}
              end={end}
              index={index}
              textColorClass={textColorClass}
            />
          );
        })}
      </div>
    </section>
  );
});

interface MonologueLineProps {
  line: string;
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'];
  start: number;
  end: number;
  index: number;
  textColorClass?: string;
}

const MonologueLine = ({ line, scrollProgress, start, end, textColorClass = 'text-text-body' }: MonologueLineProps) => {
  const opacity = useTransform(
    scrollProgress,
    [start, start + 0.08, end - 0.08, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollProgress,
    [start, start + 0.08, end - 0.08, end],
    [25, 0, 0, -25]
  );
  const scale = useTransform(
    scrollProgress,
    [start, start + 0.08, end - 0.08, end],
    [0.98, 1, 1, 0.98]
  );
  // Blur effect
  const filter = useTransform(
    scrollProgress,
    [start, start + 0.08, end - 0.08, end],
    ['blur(4px)', 'blur(0px)', 'blur(0px)', 'blur(4px)']
  );

  return (
    <motion.p
      className={`text-fluid-base font-light leading-relaxed md:text-fluid-lg lg:text-fluid-xl ${textColorClass}`}
      style={{ opacity, y, scale, filter }}
    >
      {line}
    </motion.p>
  );
};

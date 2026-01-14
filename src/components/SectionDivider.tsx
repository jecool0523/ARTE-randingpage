import { memo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SectionDividerProps {
  type?: 'line' | 'gradient' | 'fade';
  fromColor?: string;
  toColor?: string;
  showLine?: boolean;
}

export const SectionDivider = memo(function SectionDivider({
  type = 'line',
  fromColor = 'hsl(var(--background))',
  toColor = 'hsl(var(--background))',
  showLine = true,
}: SectionDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineWidth = useTransform(scrollYProgress, [0.2, 0.5], ['0%', '60%']);
  const lineOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);

  if (type === 'gradient') {
    return (
      <div
        ref={containerRef}
        className="relative h-[30vh] w-full"
        style={{
          background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
        }}
      />
    );
  }

  if (type === 'fade') {
    return (
      <motion.div
        ref={containerRef}
        className="relative h-[20vh] w-full"
        style={{
          background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
        }}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative flex h-[15vh] w-full items-center justify-center py-12 md:h-[20vh] md:py-20"
    >
      {showLine && (
        <motion.div
          className="h-px bg-gradient-to-r from-transparent via-muted-foreground/30 to-transparent"
          style={{
            width: lineWidth,
            opacity: lineOpacity,
          }}
        />
      )}
    </div>
  );
});

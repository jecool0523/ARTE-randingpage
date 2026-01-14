import { memo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxTextSectionProps {
  heading?: string;
  lines: string[];
  alignment?: 'left' | 'center' | 'right';
  variant?: 'default' | 'dark' | 'purple' | 'bright-purple' | 'deep-purple' | 'gradient-purple';
}

export const ParallaxTextSection = memo(function ParallaxTextSection({
  heading,
  lines,
  alignment = 'center',
  variant = 'default',
}: ParallaxTextSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const containerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  };

  // 원본 사이트의 다양한 배경 스타일
  const variantStyles: Record<string, { bg: string; text: string }> = {
    'default': { bg: 'bg-background', text: 'text-text-body' },
    'dark': { bg: 'bg-[hsl(270,20%,8%)]', text: 'text-text-body' },
    'purple': { bg: 'bg-[hsl(270,60%,55%)]', text: 'text-white text-shadow' },
    'bright-purple': { bg: 'bg-[hsl(275,70%,60%)]', text: 'text-white text-shadow' },
    'deep-purple': { bg: 'bg-[hsl(265,40%,12%)]', text: 'text-text-body' },
    'gradient-purple': { bg: '', text: 'text-white text-shadow-lg' },
  };

  const { text: textClass } = variantStyles[variant];

  const bgStyle = variant === 'gradient-purple' 
    ? { background: 'linear-gradient(180deg, hsl(275 60% 50%) 0%, hsl(280 70% 55%) 50%, hsl(275 60% 50%) 100%)' }
    : {};

  return (
    <section
      ref={containerRef}
      className={`relative flex min-h-[80vh] flex-col items-center justify-center px-4 py-12 md:min-h-screen md:py-32 ${variantStyles[variant].bg}`}
      style={bgStyle}
    >
      <motion.div
        className={`flex max-w-4xl flex-col gap-4 md:gap-6 ${alignmentClasses[alignment]}`}
        style={{ opacity: containerOpacity }}
      >
        {heading && (
          <motion.h3
            className="font-body text-fluid-xs font-medium uppercase tracking-widest text-primary md:text-fluid-sm"
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {heading}
          </motion.h3>
        )}
        
        {lines.map((line, index) => (
          <motion.p
            key={index}
            className={`font-body text-fluid-lg font-light leading-relaxed md:text-fluid-xl lg:text-fluid-2xl ${textClass}`}
            initial={{ opacity: 0, y: 40, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ 
              duration: 0.8, 
              delay: index * 0.15,
              ease: [0.22, 1, 0.36, 1]
            }}
            viewport={{ once: true, margin: '-10%' }}
          >
            {line}
          </motion.p>
        ))}
      </motion.div>
    </section>
  );
});

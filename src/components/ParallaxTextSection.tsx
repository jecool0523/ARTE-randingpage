import { memo, useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

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

  // 전체 컨테이너 투명도 및 스케일 효과 (등퇴장 시 자연스럽게)
  const containerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const containerScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  const alignmentClasses = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  };

  // 스타일 설정
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
      className={`relative flex min-h-[90vh] flex-col items-center justify-center px-4 py-20 overflow-hidden md:min-h-screen ${variantStyles[variant].bg}`}
      style={bgStyle}
    >
      <motion.div
        className={`relative z-10 flex max-w-5xl flex-col gap-8 md:gap-12 ${alignmentClasses[alignment]}`}
        style={{ 
          opacity: containerOpacity,
          scale: containerScale 
        }}
      >
        {heading && (
          <motion.h3
            className="font-display text-fluid-sm font-bold uppercase tracking-widest text-primary/80 mb-4"
            initial={{ opacity: 0, y: 30, letterSpacing: '0.1em' }}
            whileInView={{ opacity: 1, y: 0, letterSpacing: '0.2em' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            {heading}
          </motion.h3>
        )}
        
        <div className={`flex flex-col gap-6 md:gap-8 ${alignmentClasses[alignment]}`}>
          {lines.map((line, index) => (
            <ParallaxLine 
              key={index} 
              line={line} 
              index={index} 
              textClass={textClass}
              scrollYProgress={scrollYProgress}
              totalLines={lines.length}
            />
          ))}
        </div>
      </motion.div>

      {/* 배경 장식 요소 (옵션) - 더 깊은 공간감 */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] blur-[100px]" />
    </section>
  );
});

// 개별 라인 컴포넌트: 스크롤 속도 차이(Parallax) 적용
const ParallaxLine = ({ 
  line, 
  index, 
  textClass, 
  scrollYProgress,
  totalLines 
}: { 
  line: string; 
  index: number; 
  textClass: string; 
  scrollYProgress: MotionValue<number>;
  totalLines: number;
}) => {
  // Parallax 효과: 줄마다 이동 속도와 방향을 다르게 설정
  // 중앙(0.5)을 기준으로 교차하거나 퍼지는 효과
  const speed = (index - totalLines / 2) * 40; // 인덱스에 따라 -값 ~ +값 분산
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  
  // 3D 회전 효과 (스크롤에 따라 아주 살짝 기울어짐)
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [5, 0, -5]);

  return (
    <motion.p
      className={`font-body text-fluid-lg font-light leading-relaxed md:text-fluid-xl lg:text-fluid-2xl ${textClass}`}
      style={{ y, rotateX, transformPerspective: 1000 }}
      initial={{ 
        opacity: 0, 
        y: 60 + (index * 20), // 아래에서 위로
        filter: 'blur(10px)',
        scale: 0.95
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        filter: 'blur(0px)',
        scale: 1
      }}
      transition={{ 
        duration: 1.2, 
        delay: index * 0.15, // 순차적 등장
        ease: [0.22, 1, 0.36, 1] // 부드러운 감속
      }}
      viewport={{ once: true, margin: '-10%' }}
    >
      {line}
    </motion.p>
  );
};
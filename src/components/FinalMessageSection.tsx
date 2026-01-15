import { memo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface FinalMessageSectionProps {
  backgroundImage?: string;
  lines: string[];
}

export const FinalMessageSection = memo(function FinalMessageSection({ backgroundImage, lines }: FinalMessageSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // 섹션 전체의 스크롤 진행률 추적
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'], // 섹션 시작부터 끝까지
  });

  // 배경 효과: 스크롤에 따라 약간 확대되거나 투명도 조절
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0.8]);

  return (
    <section
      ref={sectionRef}
      // 텍스트가 순차적으로 나올 수 있도록 섹션 높이를 충분히 확보 (최소 200vh)
      className="relative flex min-h-[200vh] flex-col items-center justify-start overflow-hidden"
    >
      {/* Dynamic purple gradient background */}
      <motion.div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ scale: bgScale, opacity: bgOpacity }}
      >
        {/* Base purple gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, hsl(265 50% 8%) 0%, hsl(275 60% 15%) 20%, hsl(280 70% 45%) 50%, hsl(285 65% 55%) 70%, hsl(275 55% 40%) 100%)',
          }}
        />
        
        {/* Purple glow effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[120vw] h-[80vh] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.4),transparent_60%)]" />
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[100vw] h-[60vh] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.3),transparent_50%)]" />
        </div>

        {/* Silhouette overlay */}
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt="Background"
            className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-30"
            loading="lazy"
          />
        )}

        {/* Top and bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(270,40%,8%)]/80 via-transparent to-[hsl(270,40%,8%)]/60" />
      </motion.div>

      {/* Text content container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="flex flex-col items-center px-4 text-center pb-[20vh]">
          {lines.map((line, index) => (
            <MessageLine
              key={index}
              line={line}
              index={index}
              totalLines={lines.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

// 개별 텍스트 라인 컴포넌트
interface MessageLineProps {
  line: string;
  index: number;
  totalLines: number;
  scrollYProgress: any;
}

const MessageLine = ({ line, index, totalLines, scrollYProgress }: MessageLineProps) => {
  // 스크롤 진행률에 따라 각 줄이 등장할 타이밍 계산
  // 0.2(20%) 지점부터 시작해서 0.8(80%) 지점까지 순차적으로 등장
  const step = 0.6 / totalLines;
  const start = 0.2 + (index * step);
  const end = start + 0.15; // 각 줄이 완전히 나타나는 데 걸리는 스크롤 구간

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [40, 0]);
  const filter = useTransform(scrollYProgress, [start, end], ['blur(10px)', 'blur(0px)']);

  return (
    <motion.h3
      className="mb-6 font-display text-xl leading-relaxed text-white md:mb-8 md:text-2xl lg:text-3xl text-shadow-lg"
      style={{ 
        opacity, 
        y, 
        filter 
      }}
    >
      {line}
    </motion.h3>
  );
};
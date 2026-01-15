import { memo, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import type { FinalMessageSlide } from '@/data/siteData';

interface FinalMessageSectionProps {
  slides: FinalMessageSlide[];
}

export const FinalMessageSection = memo(function FinalMessageSection({ slides }: FinalMessageSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const totalSlides = slides.length;
  
  // 전체 섹션 스크롤 진행률 추적
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // 현재 활성화된 슬라이드 인덱스를 스크롤 진행률에 따라 계산
  const activeSlideIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, totalSlides - 0.01]
  );

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${totalSlides * 100}vh` }}
    >
      {/* Sticky container for the viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background images with crossfade */}
        <BackgroundLayers 
          slides={slides} 
          scrollYProgress={scrollYProgress}
          totalSlides={totalSlides}
        />
        
        {/* Purple gradient overlay for mood */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 opacity-60"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, hsl(270 40% 8% / 0.7) 100%)',
            }}
          />
        </div>

        {/* Text content layers */}
        <TextLayers 
          slides={slides}
          scrollYProgress={scrollYProgress}
          totalSlides={totalSlides}
        />

        {/* Scroll progress indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {slides.map((_, index) => (
            <SlideIndicator 
              key={index} 
              index={index} 
              activeIndex={activeSlideIndex}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
});

// Background layers with crossfade effect
interface BackgroundLayersProps {
  slides: FinalMessageSlide[];
  scrollYProgress: any;
  totalSlides: number;
}

const BackgroundLayers = memo(function BackgroundLayers({ 
  slides, 
  scrollYProgress, 
  totalSlides 
}: BackgroundLayersProps) {
  return (
    <>
      {slides.map((slide, index) => (
        <BackgroundSlide
          key={index}
          slide={slide}
          index={index}
          scrollYProgress={scrollYProgress}
          totalSlides={totalSlides}
        />
      ))}
    </>
  );
});

interface BackgroundSlideProps {
  slide: FinalMessageSlide;
  index: number;
  scrollYProgress: any;
  totalSlides: number;
}

const BackgroundSlide = memo(function BackgroundSlide({ 
  slide, 
  index, 
  scrollYProgress, 
  totalSlides 
}: BackgroundSlideProps) {
  // 각 슬라이드의 시작점과 끝점 계산
  const slideStart = index / totalSlides;
  const slideEnd = (index + 1) / totalSlides;
  const transitionDuration = 0.15 / totalSlides; // 부드러운 전환을 위한 구간
  
  // 슬라이드 opacity: 해당 구간에서만 보이도록
  const opacity = useTransform(
    scrollYProgress,
    [
      Math.max(0, slideStart - transitionDuration),
      slideStart,
      slideEnd - transitionDuration,
      slideEnd,
    ],
    [0, 1, 1, 0]
  );

  // 배경 이미지 scale 효과 (Ken Burns)
  const scale = useTransform(
    scrollYProgress,
    [slideStart, slideEnd],
    [1.05, 1.15]
  );

  return (
    <motion.div
      className="absolute inset-0"
      style={{ opacity }}
    >
      {/* Gradient background */}
      <div 
        className="absolute inset-0"
        style={{ background: slide.backgroundColor }}
      />
      
      {/* Image with Ken Burns effect */}
      <motion.div
        className="absolute inset-0"
        style={{ scale }}
      >
        <img
          src={slide.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-40"
          loading={index < 2 ? 'eager' : 'lazy'}
        />
      </motion.div>

      {/* Purple glow effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.2),transparent_70%)]" />
      
      {/* Top and bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/50" />
    </motion.div>
  );
});

// Text layers with fade transitions
interface TextLayersProps {
  slides: FinalMessageSlide[];
  scrollYProgress: any;
  totalSlides: number;
}

const TextLayers = memo(function TextLayers({ 
  slides, 
  scrollYProgress, 
  totalSlides 
}: TextLayersProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {slides.map((slide, index) => (
        <TextSlide
          key={index}
          text={slide.text}
          index={index}
          scrollYProgress={scrollYProgress}
          totalSlides={totalSlides}
        />
      ))}
    </div>
  );
});

interface TextSlideProps {
  text: string;
  index: number;
  scrollYProgress: any;
  totalSlides: number;
}

const TextSlide = memo(function TextSlide({ 
  text, 
  index, 
  scrollYProgress, 
  totalSlides 
}: TextSlideProps) {
  const slideStart = index / totalSlides;
  const slideEnd = (index + 1) / totalSlides;
  const midPoint = (slideStart + slideEnd) / 2;
  const fadeInEnd = slideStart + (slideEnd - slideStart) * 0.25;
  const fadeOutStart = slideEnd - (slideEnd - slideStart) * 0.25;

  // 텍스트 애니메이션: 등장 → 유지 → 퇴장
  const opacity = useTransform(
    scrollYProgress,
    [slideStart, fadeInEnd, fadeOutStart, slideEnd],
    [0, 1, 1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [slideStart, fadeInEnd, fadeOutStart, slideEnd],
    [60, 0, 0, -40]
  );

  const blur = useTransform(
    scrollYProgress,
    [slideStart, fadeInEnd, fadeOutStart, slideEnd],
    ['blur(12px)', 'blur(0px)', 'blur(0px)', 'blur(8px)']
  );

  // 텍스트에 줄바꿈이 있으면 분리해서 렌더링
  const lines = text.split('\n');

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-6 md:px-12"
      style={{ opacity, y, filter: blur }}
    >
      <div className="max-w-4xl text-center">
        {lines.map((line, lineIndex) => (
          <h3
            key={lineIndex}
            className="font-display text-xl leading-relaxed text-white md:text-2xl lg:text-3xl xl:text-4xl text-shadow-lg"
            style={{
              textShadow: '0 2px 20px rgba(0,0,0,0.5), 0 4px 40px rgba(168,85,247,0.3)',
            }}
          >
            {line}
          </h3>
        ))}
      </div>
    </motion.div>
  );
});

// Slide indicator dot
interface SlideIndicatorProps {
  index: number;
  activeIndex: any;
}

const SlideIndicator = memo(function SlideIndicator({ index, activeIndex }: SlideIndicatorProps) {
  const isActive = useTransform(
    activeIndex,
    (value: number) => Math.floor(value) === index
  );

  const scale = useTransform(isActive, (active) => active ? 1.5 : 1);
  const opacity = useTransform(isActive, (active) => active ? 1 : 0.4);
  const backgroundColor = useTransform(
    isActive, 
    (active) => active ? 'rgb(168, 85, 247)' : 'rgba(255, 255, 255, 0.5)'
  );

  return (
    <motion.div
      className="h-2 w-2 rounded-full transition-colors duration-300"
      style={{ scale, opacity, backgroundColor }}
    />
  );
});
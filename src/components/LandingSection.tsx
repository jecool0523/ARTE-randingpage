import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useRef } from 'react';

interface LandingSectionProps {
  onStart: () => void;
}

export const LandingSection = ({ onStart }: LandingSectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);

  return (
    <section
      ref={ref}
      className="relative h-[100dvh] w-full overflow-hidden"
    >
      {/* Background Image with enhanced parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ scale }}
      >
        <motion.img
          src="https://static-assets.everpurple.kr/history/ine_history_landing_background.png?1"
          alt="Landing background"
          className="h-full w-full object-cover object-center"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/95" />
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-8"
        style={{ opacity, y }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 md:mb-8"
        >
          <img
            src="https://static-assets.everpurple.kr/history/ine_history_title_c.png"
            alt="INE History"
            className="h-auto w-[200px] drop-shadow-2xl sm:w-[280px] md:w-[400px] lg:w-[500px]"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mb-6 text-center font-body text-base text-text-body md:mb-8 md:text-lg lg:text-xl"
        >
          히스토리 페이지에 오신 것을 환영합니다.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          onClick={onStart}
          className="hero-button group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="text-sm md:text-base">관람 시작하기</span>
          <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-8 max-w-xs text-center font-body text-xs text-muted-foreground md:mt-16 md:max-w-none md:text-sm"
        >
          아이네에 대한 이야기를 몰입형 전시와 함께 감상해보세요.
        </motion.p>
      </motion.div>

      {/* Scroll indicator at bottom - enhanced animation */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <motion.div 
          className="flex flex-col items-center gap-1 text-muted-foreground md:gap-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-[10px] uppercase tracking-widest md:text-xs">Scroll</span>
          <ChevronDown className="h-4 w-4 md:h-5 md:w-5" />
        </motion.div>
      </motion.div>
    </section>
  );
};

import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useRef } from 'react';

export const DisclaimerSection = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0.2, 0.4, 0.6, 0.8], [60, 0, 0, -60]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center px-4 py-32"
      style={{ background: 'transparent' }}
    >
      <motion.div
        className="text-center"
        style={{ opacity, y }}
      >
        <h3 className="mb-4 font-body text-lg font-medium text-foreground md:text-xl">
          히스토리 관람 소요 시간은 약 3 ~ 5분입니다.
        </h3>
        <p className="font-body text-base text-muted-foreground md:text-lg">
          원활한 관람을 위해 PC 환경과 이어폰 착용을 권장드립니다.
        </p>
      </motion.div>

      <motion.div
        className="absolute bottom-16 flex flex-col items-center gap-2 text-muted-foreground"
        style={{ opacity }}
      >
        <p className="font-body text-sm">
          아래로 스크롤하여, 아이네의 여정에 함께해주세요.
        </p>
        <ChevronRight className="h-4 w-4 scroll-indicator" />
      </motion.div>
    </section>
  );
};

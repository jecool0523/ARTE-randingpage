import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface FinalMessageSectionProps {
  backgroundImage?: string;
  lines: string[];
}

export const FinalMessageSection = ({ backgroundImage, lines }: FinalMessageSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[150vh] flex-col items-center justify-center overflow-hidden"
    >
      {/* Dynamic purple gradient background with silhouette effect */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: bgScale }}
      >
        {/* Base purple gradient - matches original site */}
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

        {/* Silhouette overlay from original if provided */}
        {backgroundImage && (
          <>
            <img
              src={backgroundImage}
              alt="Background"
              className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-30"
              loading="lazy"
            />
          </>
        )}

        {/* Top and bottom fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(270,40%,8%)]/80 via-transparent to-[hsl(270,40%,8%)]/60" />
      </motion.div>

      {/* Text content */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-4 py-32 text-center"
        style={{ opacity }}
      >
        {lines.map((line, index) => (
          <motion.h3
            key={index}
            className="mb-4 font-display text-xl leading-relaxed text-white md:mb-6 md:text-2xl lg:text-3xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: index * 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true, margin: '-10%' }}
          >
            {line}
          </motion.h3>
        ))}
      </motion.div>
    </section>
  );
};
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface FinalMessageSectionProps {
  backgroundImage: string;
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
      {/* Background image */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: bgScale }}
      >
        <img
          src={backgroundImage}
          alt="Background"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </motion.div>

      {/* Text content */}
      <motion.div
        className="relative z-10 flex flex-col items-center px-4 py-32 text-center"
        style={{ opacity }}
      >
        {lines.map((line, index) => (
          <motion.h3
            key={index}
            className="mb-4 font-display text-xl leading-relaxed text-foreground md:mb-6 md:text-2xl lg:text-3xl"
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

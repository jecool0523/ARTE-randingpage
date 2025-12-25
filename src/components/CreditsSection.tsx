import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const CreditsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-32"
    >
      {/* Subtle background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent"
        style={{ opacity: bgOpacity }}
      />

      <motion.div
        className="relative z-10 text-center"
        style={{ scale }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      >
        <motion.div
          className="mb-12"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          viewport={{ once: true }}
        >
          <img
            src="https://static-assets.everpurple.kr/history/ine_history_title_c.png"
            alt="INE History"
            className="mx-auto h-auto w-56 opacity-80 md:w-72"
          />
        </motion.div>

        <motion.div
          className="mb-8 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-foreground/30 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        />

        <motion.p
          className="mb-4 font-display text-2xl text-foreground md:text-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
        >
          감사합니다
        </motion.p>

        <motion.p
          className="font-body text-base text-muted-foreground md:text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Thank you for experiencing INE History
        </motion.p>

        <motion.div
          className="mt-20 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-xs text-muted-foreground/60">
            Clone coding project
          </p>
          <p className="text-xs text-muted-foreground/60">
            Original: everpurple.kr/ine
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

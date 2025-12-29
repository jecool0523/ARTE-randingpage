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
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-32"
      style={{
        background: 'linear-gradient(180deg, hsl(270 40% 12%) 0%, hsl(275 50% 18%) 30%, hsl(280 55% 25%) 60%, hsl(275 45% 20%) 100%)',
      }}
    >
      {/* Subtle background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent"
        style={{ opacity: bgOpacity }}
      />

      {/* Purple glow effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vh] bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.15),transparent_60%)]" />
        <div className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vh] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.1),transparent_60%)]" />
      </div>

      <motion.div
        className="relative z-10 flex w-full max-w-6xl items-center justify-between px-8"
        style={{ scale }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
      >
        {/* Left side - EVER PURPLE logo */}
        <motion.div
          className="flex flex-col items-start"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="font-display text-4xl md:text-5xl lg:text-6xl tracking-wider text-foreground/90">
            <span className="block italic font-light">EVER</span>
            <span className="block italic font-light text-primary">PURPLE</span>
          </div>
        </motion.div>

        {/* Decorative line */}
        <motion.div
          className="hidden md:block h-px flex-1 mx-12 bg-gradient-to-r from-transparent via-foreground/20 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
        />

        {/* Right side - INE History */}
        <motion.div
          className="flex flex-col items-end"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="font-display text-4xl md:text-5xl lg:text-6xl tracking-wider text-foreground/90">
            <span className="block text-right">INE History</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom credits text */}
      <motion.div
        className="absolute bottom-12 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="text-xs text-muted-foreground/60 mb-2">
          © 에버퍼플 All rights reserved.
        </p>
        <p className="text-xs text-muted-foreground/40">
          Clone coding project • Original: everpurple.kr/ine
        </p>
      </motion.div>
    </section>
  );
};
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface FanStorySectionProps {
  images: { src: string; alt: string }[];
  topText?: string;
  bottomText?: string;
}

export const FanStorySection = ({ images, topText, bottomText }: FanStorySectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-24 md:py-32"
    >
      {topText && (
        <motion.p
          className="mb-12 max-w-2xl text-center font-body text-lg leading-relaxed text-foreground/90 md:mb-16 md:text-xl"
          style={{ opacity, y: y2 }}
        >
          {topText}
        </motion.p>
      )}

      <motion.div
        className="grid w-full max-w-5xl grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
        style={{ y: y1 }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="group relative aspect-square overflow-hidden rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true, margin: '-10%' }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </motion.div>
        ))}
      </motion.div>

      {bottomText && (
        <motion.p
          className="mt-12 max-w-2xl text-center font-body text-lg leading-relaxed text-foreground/90 md:mt-16 md:text-xl"
          style={{ opacity, y: y2 }}
        >
          {bottomText}
        </motion.p>
      )}
    </section>
  );
};

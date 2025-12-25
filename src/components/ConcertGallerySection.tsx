import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ConcertGallerySectionProps {
  images: { src: string; alt: string }[];
  topText?: string[];
}

export const ConcertGallerySection = ({ images, topText }: ConcertGallerySectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 py-24 md:py-32"
    >
      {topText && topText.length > 0 && (
        <motion.div
          className="mb-12 max-w-3xl text-center md:mb-16"
          style={{ opacity, y }}
        >
          {topText.map((line, index) => (
            <motion.p
              key={index}
              className="mb-2 font-body text-lg leading-relaxed text-foreground/90 md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>
      )}

      <div className="grid w-full max-w-6xl grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="group relative aspect-[4/3] overflow-hidden rounded-lg"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true, margin: '-5%' }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

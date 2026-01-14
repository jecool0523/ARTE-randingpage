import { memo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface TripleImageSectionProps {
  images: Array<{
    src: string;
    alt: string;
  }>;
  topText?: string;
  bottomText?: string;
  title?: string;
}

export const TripleImageSection = memo(function TripleImageSection({
  images,
  topText,
  bottomText,
  title,
}: TripleImageSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Individual image animations
  const y1 = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const y2 = useTransform(scrollYProgress, [0, 0.5], [150, 0]);
  const y3 = useTransform(scrollYProgress, [0, 0.5], [120, 0]);

  const scale1 = useTransform(scrollYProgress, [0.3, 0.6], [0.95, 1]);
  const scale2 = useTransform(scrollYProgress, [0.35, 0.65], [0.95, 1]);
  const scale3 = useTransform(scrollYProgress, [0.32, 0.62], [0.95, 1]);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12 md:py-32"
      style={{ background: 'transparent' }}
    >
      {topText && (
        <motion.p
          className="mb-6 max-w-2xl text-center font-body text-fluid-base text-text-body md:mb-8 md:text-fluid-lg"
          style={{ opacity }}
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
        >
          {topText}
        </motion.p>
      )}

      <motion.div
        className="grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 md:flex md:flex-row md:items-center md:justify-center md:gap-6"
        style={{ opacity }}
      >
        {images.slice(0, 3).map((image, index) => {
          const yTransforms = [y1, y2, y3];
          const scaleTransforms = [scale1, scale2, scale3];
          
          return (
            <motion.div
              key={index}
              className={cn(
                "group relative overflow-hidden rounded-lg",
                // First item full width on mobile, others side by side
                index === 0 ? "col-span-1 sm:col-span-2 md:col-span-1" : "",
                "h-48 w-full sm:h-56 md:h-64 md:w-80 lg:h-80 lg:w-96"
              )}
              style={{
                y: yTransforms[index],
                scale: scaleTransforms[index],
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
            </motion.div>
          );
        })}
      </motion.div>

      {bottomText && (
        <motion.p
          className="mt-6 max-w-2xl text-center font-body text-fluid-base text-text-body md:mt-8 md:text-fluid-lg"
          style={{ opacity }}
          initial={{ y: -20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
        >
          {bottomText}
        </motion.p>
      )}

      {title && (
        <motion.h3
          className="mt-4 font-display text-fluid-xl italic text-primary md:text-fluid-2xl"
          style={{ opacity }}
        >
          {title}
        </motion.h3>
      )}
    </section>
  );
});

// Helper function
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

import { memo, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ImageRevealSectionProps {
  images: Array<{
    src: string;
    alt: string;
    title?: string;
  }>;
  layout?: 'grid' | 'stacked' | 'row';
}

export const ImageRevealSection = memo(function ImageRevealSection({
  images,
  layout = 'row',
}: ImageRevealSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const containerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  if (layout === 'row') {
    return (
      <section
        ref={containerRef}
        className="relative flex min-h-screen items-center justify-center px-4 py-32"
        style={{ background: 'transparent' }}
      >
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4 md:gap-8"
          style={{ opacity: containerOpacity }}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg"
              initial={{ opacity: 0, scale: 0.8, y: 60 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, margin: '-10%' }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-48 w-auto object-cover md:h-64 lg:h-80"
                loading="lazy"
              />
              {image.title && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/80 to-transparent p-4">
                  <p className="font-display text-sm text-foreground md:text-base">
                    {image.title}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>
    );
  }

  if (layout === 'stacked') {
    return (
      <section
        ref={containerRef}
        className="relative min-h-screen py-32"
        style={{ background: 'transparent' }}
      >
        <motion.div
          className="flex flex-col items-center gap-16"
          style={{ opacity: containerOpacity }}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="relative w-full max-w-4xl overflow-hidden px-4"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true, margin: '-20%' }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-auto w-full rounded-lg object-cover"
                loading="lazy"
              />
              {image.title && (
                <motion.p
                  className="mt-4 text-center font-body text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  {image.title}
                </motion.p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>
    );
  }

  // Grid layout
  return (
    <section
      ref={containerRef}
      className="relative min-h-screen px-4 py-32"
      style={{ background: 'transparent' }}
    >
      <motion.div
        className="mx-auto grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-3 lg:gap-8"
        style={{ opacity: containerOpacity }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative aspect-square overflow-hidden rounded-lg"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: index * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true, margin: '-10%' }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              loading="lazy"
            />
            {image.title && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                <p className="font-body text-xs text-foreground md:text-sm">
                  {image.title}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
});

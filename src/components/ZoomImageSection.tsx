import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface ZoomImageSectionProps {
  imageSrc: string;
  imageAlt: string;
  overlayText?: string;
  subText?: string;
}

export const ZoomImageSection = ({
  imageSrc,
  imageAlt,
  overlayText,
  subText,
}: ZoomImageSectionProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Image is fixed in center via sticky, scales from tiny to full size
  // offset 'start start' means animation starts when section top hits viewport top
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6, 0.85], [0.03, 0.3, 1, 1.1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [0, 0.6, 1, 1, 0]);

  // Text appears after image is scaled up
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.6, 0.75, 0.9], [0, 1, 1, 0]);
  const textScale = useTransform(scrollYProgress, [0.5, 0.65], [0.9, 1]);

  return (
    <section
      ref={containerRef}
      className="relative h-[300vh] bg-background"
    >
      {/* Sticky container - image stays fixed at center while user scrolls */}
      <div className="sticky top-0 flex h-[100dvh] w-full items-center justify-center overflow-hidden">
        {/* Image container - only scales, no vertical movement */}
        <motion.div
          className="absolute flex items-center justify-center"
          style={{ 
            scale, 
            opacity: imageOpacity,
            willChange: 'transform, opacity',
          }}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-auto max-h-[60vh] w-auto max-w-[90vw] rounded-lg object-contain shadow-2xl sm:max-h-[65vh] sm:max-w-[85vw] md:max-h-[70vh] md:max-w-[75vw]"
            loading="lazy"
          />
        </motion.div>

        {/* Overlay text - appears after image is fully scaled */}
        {overlayText && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center sm:px-6"
            style={{ opacity: textOpacity, scale: textScale }}
          >
            <div className="rounded-xl bg-background/70 px-5 py-4 backdrop-blur-md sm:px-8 sm:py-6 md:px-12 md:py-8">
              <p className="mx-auto max-w-xs font-body text-base font-medium leading-relaxed text-foreground sm:max-w-lg sm:text-lg md:max-w-2xl md:text-xl lg:text-2xl">
                {overlayText}
              </p>
              {subText && (
                <p className="mt-3 font-body text-xs text-muted-foreground sm:mt-4 sm:text-sm md:mt-5 md:text-base lg:text-lg">
                  {subText}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

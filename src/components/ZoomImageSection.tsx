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
    offset: ['start end', 'end start'],
  });

  // Zoom effect with smoother transitions
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.15, 1.4]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.2, 1, 1, 0.2]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]);

  // Text parallax with enhanced motion
  const textY = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [80, 0, -80]);
  const textOpacity = useTransform(scrollYProgress, [0.25, 0.4, 0.6, 0.75], [0, 1, 1, 0]);
  const textScale = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0.95, 1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative h-[150vh] bg-background md:h-[200vh]"
    >
      <div className="sticky top-0 flex h-[100dvh] items-center justify-center overflow-hidden">
        {/* Zooming image with subtle rotation */}
        <motion.div
          className="zoom-image-container"
          style={{ scale, opacity: imageOpacity, rotate }}
        >
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-[45vh] w-auto max-w-[85vw] rounded-lg object-contain shadow-2xl md:h-[60vh] md:max-w-[80vw] lg:h-[70vh]"
            loading="lazy"
          />
        </motion.div>

        {/* Overlay text with enhanced styling */}
        {overlayText && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            style={{ y: textY, opacity: textOpacity, scale: textScale }}
          >
            <p className="mx-auto max-w-lg font-body text-base font-medium leading-relaxed text-foreground drop-shadow-lg md:max-w-2xl md:text-xl lg:text-2xl">
              {overlayText}
            </p>
            {subText && (
              <p className="mt-3 font-body text-xs text-muted-foreground md:mt-4 md:text-sm lg:text-base">
                {subText}
              </p>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface GalleryImage {
  src: string;
  alt: string;
  ratio?: number; // width/height ratio
}

interface HorizontalGallerySectionProps {
  images: GalleryImage[];
  description?: string;
  title?: string;
  linkText?: string;
  height?: string;
}

export const HorizontalGallerySection = ({
  images,
  description,
  title,
  linkText,
  height = '400vh',
}: HorizontalGallerySectionProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Mobile: smaller images, desktop: larger
  const imageWidth = isMobile ? 280 : 450;
  const imageHeight = isMobile ? '35vh' : '50vh';
  const gap = isMobile ? 16 : 32;
  
  const totalWidth = images.length * imageWidth + (images.length - 1) * gap;
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  
  const translateX = useTransform(
    scrollYProgress,
    [0, 1],
    [isMobile ? '5vw' : '10vw', `-${totalWidth - windowWidth + (isMobile ? 100 : 200)}px`]
  );

  const textOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative bg-background"
      style={{ height: isMobile ? '300vh' : height }}
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* Gallery */}
        <motion.div
          className="flex items-center"
          style={{ x: translateX, gap: gap }}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="gallery-image-wrapper flex-shrink-0 overflow-hidden rounded-lg"
              style={{
                width: image.ratio ? `calc(${imageHeight} * ${image.ratio})` : `${imageWidth}px`,
                height: imageHeight,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.03 }}
              viewport={{ once: true, margin: '-5%' }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Text overlay */}
        {(description || title) && (
          <motion.div
            className="absolute bottom-8 left-0 right-0 px-4 text-center md:bottom-16 md:px-8"
            style={{ opacity: textOpacity }}
          >
            {description && (
              <p className="mx-auto max-w-xl font-body text-sm leading-relaxed text-text-body md:max-w-2xl md:text-base lg:text-lg">
                {description}
              </p>
            )}
            {linkText && (
              <button className="mt-3 font-body text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground md:mt-4 md:text-sm">
                {linkText}
              </button>
            )}
            {title && (
              <p className="mt-3 font-display text-sm italic text-primary md:mt-4 md:text-lg lg:text-xl">
                {title}
              </p>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

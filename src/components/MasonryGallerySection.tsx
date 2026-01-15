import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MediaItemData } from './MediaItem';

interface MasonryGallerySectionProps {
  images: MediaItemData[];
  title?: string;
  subtitle?: string;
}

export const MasonryGallerySection = ({ images, title, subtitle }: MasonryGallerySectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // 3개의 컬럼으로 분리
  const column1 = images.filter((_, i) => i % 3 === 0);
  const column2 = images.filter((_, i) => i % 3 === 1);
  const column3 = images.filter((_, i) => i % 3 === 2);

  // 패럴랙스 효과: 컬럼마다 스크롤 속도를 다르게 설정 (y값 이동)
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]); // 가운데가 더 빨리 올라감
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-background py-20 overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsla(var(--primary)/0.05),transparent_50%)]" />

      <div className="container mx-auto px-4">
        {/* 헤더 섹션 */}
        {(title || subtitle) && (
          <div className="mb-16 text-center">
            {title && (
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="font-display text-3xl md:text-5xl font-bold mb-4"
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
            )}
          </div>
        )}

        {/* 매이슨리 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 h-[150vh] overflow-hidden">
          <Column images={column1} y={y1} className="md:-mt-20" />
          <Column images={column2} y={y2} />
          <Column images={column3} y={y3} className="md:-mt-20" />
        </div>
      </div>
      
      {/* 하단 페이드 아웃 (자연스러운 연결) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

// 개별 컬럼 컴포넌트
const Column = ({ images, y, className = '' }: { images: MediaItemData[], y: any, className?: string }) => {
  return (
    <motion.div style={{ y }} className={`flex flex-col gap-6 md:gap-8 ${className}`}>
      {images.map((img, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: idx * 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="group relative overflow-hidden rounded-xl shadow-2xl bg-muted aspect-[3/4]"
        >
          <img
            src={img.src}
            alt={img.alt}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* 호버 시 나타나는 오버레이 정보 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <p className="text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              {img.title || img.alt}
            </p>
          </div>
          
          {/* 테두리 광원 효과 */}
          <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none" />
        </motion.div>
      ))}
    </motion.div>
  );
};
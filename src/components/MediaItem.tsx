import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface MediaItemData {
  src: string;
  alt: string;
  type?: 'image' | 'video';
  ratio?: number;
  title?: string;
}

interface MediaItemProps {
  media: MediaItemData;
  className?: string;
  containerClassName?: string;
  loading?: 'lazy' | 'eager';
  showHoverEffect?: boolean;
  showOverlay?: boolean;
}

/**
 * MediaItem - 이미지 또는 비디오를 렌더링하는 통합 컴포넌트
 * 
 * - type: 'video'인 경우 자동 재생 비디오로 렌더링
 * - 로딩 중 shimmer 애니메이션 적용
 * - framer-motion을 통한 부드러운 페이드인
 * - 호버 시 scale-110 + 오버레이 효과
 */
export const MediaItem = memo(function MediaItem({
  media,
  className,
  containerClassName,
  loading = 'lazy',
  showHoverEffect = true,
  showOverlay = false,
}: MediaItemProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const isVideo = media.type === 'video';

  return (
    <div 
      className={cn(
        "group relative overflow-hidden bg-black",
        containerClassName
      )}
    >
      {/* Shimmer loading placeholder */}
      <motion.div
        className={cn(
          "absolute inset-0 z-10",
          isLoaded ? "opacity-0" : "shimmer"
        )}
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      />

      {isVideo ? (
        <motion.video
          src={media.src}
          className={cn(
            "size-full object-cover",
            showHoverEffect && "transition-transform duration-700 ease-out group-hover:scale-110",
            className
          )}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsLoaded(true)}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 1.1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      ) : (
        <motion.img
          src={media.src}
          alt={media.alt}
          className={cn(
            "size-full object-cover",
            showHoverEffect && "transition-transform duration-700 ease-out group-hover:scale-110",
            className
          )}
          loading={loading}
          onLoad={() => setIsLoaded(true)}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 1.05 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      )}

      {/* Hover overlay */}
      {showOverlay && (
        <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
      )}
    </div>
  );
});

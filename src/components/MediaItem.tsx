import { useState } from 'react';
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
}

/**
 * MediaItem - 이미지 또는 비디오를 렌더링하는 통합 컴포넌트
 * 
 * - type: 'video'인 경우 자동 재생 비디오로 렌더링
 * - 로딩 중 깜빡임 방지를 위한 배경색 적용
 * - framer-motion을 통한 부드러운 페이드인
 */
export const MediaItem = ({
  media,
  className,
  containerClassName,
  loading = 'lazy',
  showHoverEffect = true,
}: MediaItemProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const isVideo = media.type === 'video';

  return (
    <div 
      className={cn(
        "relative overflow-hidden bg-black",
        containerClassName
      )}
    >
      {/* Loading placeholder */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoaded ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      />

      {isVideo ? (
        <motion.video
          src={media.src}
          className={cn(
            "size-full object-cover",
            showHoverEffect && "transition-transform duration-700 hover:scale-105",
            className
          )}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setIsLoaded(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
      ) : (
        <motion.img
          src={media.src}
          alt={media.alt}
          className={cn(
            "size-full object-cover",
            showHoverEffect && "transition-transform duration-700 hover:scale-105",
            className
          )}
          loading={loading}
          onLoad={() => setIsLoaded(true)}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </div>
  );
};
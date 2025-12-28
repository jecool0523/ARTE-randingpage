import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo } from 'react';

/**
 * DynamicBackground - 원본 everpurple.kr/ine 사이트의 배경 효과 재현
 * 
 * 스크롤 위치에 따라 5단계로 배경이 변화:
 * 1. 초반 (0-15%): 따뜻한 오케스트라 조명 (갈색/주황)
 * 2. 초중반 (15-35%): 차분한 보라색으로 전환
 * 3. 중반 (35-60%): 깊은 남보라색
 * 4. 후반 (60-85%): 밤하늘/우주 느낌의 진보라
 * 5. 마무리 (85-100%): 마지막 이미지와 함께 페이드
 */
export const DynamicBackground = () => {
  const { scrollYProgress } = useScroll();

  // ========================================
  // Layer Opacities - 각 레이어의 투명도 제어
  // ========================================

  // Layer 1: 초반 따뜻한 조명 (오케스트라 무대)
  const warmLayerOpacity = useTransform(
    scrollYProgress, 
    [0, 0.05, 0.15, 0.25], 
    [1, 1, 0.5, 0]
  );

  // Layer 2: 중간 보라색 분위기 전환
  const purpleLayerOpacity = useTransform(
    scrollYProgress, 
    [0.1, 0.25, 0.5, 0.7], 
    [0, 0.8, 1, 0.4]
  );

  // Layer 3: 깊은 남보라색 (콘텐츠 메인)
  const deepPurpleLayerOpacity = useTransform(
    scrollYProgress, 
    [0.35, 0.5, 0.75, 0.9], 
    [0, 0.9, 1, 0.5]
  );

  // Layer 4: 우주/밤하늘 느낌
  const cosmicLayerOpacity = useTransform(
    scrollYProgress, 
    [0.6, 0.8, 0.95], 
    [0, 0.7, 1]
  );

  // Layer 5: 마지막 이미지
  const finalImageOpacity = useTransform(
    scrollYProgress, 
    [0.85, 0.95, 1], 
    [0, 0.6, 1]
  );

  // 별 효과를 위한 랜덤 위치 (메모이제이션)
  const stars = useMemo(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
      duration: Math.random() * 2 + 2,
    })), 
  []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      {/* ========================================
          Base Layer: 검정 배경
      ======================================== */}
      <div className="absolute inset-0 bg-black" />

      {/* ========================================
          Layer 1: 초반 따뜻한 오케스트라 조명
          - 원본의 랜딩 페이지 갈색/주황색 분위기
      ======================================== */}
      <motion.div
        style={{ opacity: warmLayerOpacity }}
        className="absolute inset-0"
      >
        {/* 상단에서 내려오는 따뜻한 조명 - 더 깊고 풍부한 색감 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_60%_at_50%_-10%,rgba(139,69,19,0.35),rgba(101,67,33,0.2)_40%,transparent_70%)]" />
        {/* 중앙 스포트라이트 효과 - 세피아 톤 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(160,82,45,0.12),transparent_60%)]" />
        {/* 바닥 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </motion.div>

      {/* ========================================
          Layer 2: 중간 보라색 분위기
          - 이야기가 시작되며 분위기 전환
      ======================================== */}
      <motion.div
        style={{ opacity: purpleLayerOpacity }}
        className="absolute inset-0"
      >
        {/* 은은한 보라색 그라데이션 - 더 깊은 톤 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_50%_10%,rgba(88,28,135,0.25),rgba(59,7,100,0.15)_50%,transparent_80%)]" />
        {/* 하단 보라색 - 더 어둡게 */}
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(270,50%,5%)]/60 via-transparent to-transparent" />
        {/* 측면 비네팅 */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.3)_0%,transparent_20%,transparent_80%,rgba(0,0,0,0.3)_100%)]" />
      </motion.div>

      {/* ========================================
          Layer 3: 깊은 남보라색
          - 콘텐츠의 메인 분위기
      ======================================== */}
      <motion.div
        style={{ opacity: deepPurpleLayerOpacity }}
        className="absolute inset-0"
      >
        {/* 깊은 보라색 오버레이 - 더 진한 네이비-퍼플 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_140%_100%_at_50%_20%,rgba(59,7,100,0.35),rgba(25,4,60,0.5)_50%,rgba(10,2,30,0.7)_100%)]" />
        {/* 비네트 효과 - 더 강하게 */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_20%,rgba(0,0,0,0.5)_100%)]" />
        {/* 미묘한 노이즈 텍스처 효과 */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
      </motion.div>

      {/* ========================================
          Layer 4: 우주/밤하늘 느낌
          - 후반부 몽환적인 분위기
      ======================================== */}
      <motion.div
        style={{ opacity: cosmicLayerOpacity }}
        className="absolute inset-0"
      >
        {/* 우주적 그라데이션 - 더 깊고 신비로운 느낌 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_180%_120%_at_50%_0%,rgba(49,10,89,0.5),rgba(20,3,45,0.7)_40%,rgba(5,0,12,0.9)_100%)]" />
        {/* 별빛 효과 - 더 미묘하게 */}
        <div className="absolute inset-0">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: star.size,
                height: star.size,
              }}
              animate={{
                opacity: [0.1, 0.5, 0.1],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: star.duration,
                delay: star.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        {/* 은하수 느낌의 대각선 빛 - 더 넓고 은은하게 */}
        <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(88,28,135,0.08)_50%,transparent_70%)]" />
        {/* 상단 하이라이트 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_30%_at_50%_0%,rgba(139,92,246,0.08),transparent_60%)]" />
      </motion.div>

      {/* ========================================
          Layer 5: 마지막 이미지
          - 피날레 배경 이미지
      ======================================== */}
      <motion.div
        style={{ opacity: finalImageOpacity }}
        className="absolute inset-0"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('https://static-assets.everpurple.kr/history/images/10/Mashup_img_08.png')" 
          }}
        />
        {/* 이미지 위 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black/50" />
        {/* 보라색 틴트 */}
        <div className="absolute inset-0 bg-purple-950/30 mix-blend-overlay" />
      </motion.div>

      {/* ========================================
          Global Overlay: 부드러운 비네트 효과
      ======================================== */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_50%,rgba(0,0,0,0.3)_100%)]" />
    </div>
  );
};
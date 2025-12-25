import { useCallback, useEffect } from 'react';
import { useLenis } from '@/hooks/useLenis';
import { LandingSection } from '@/components/LandingSection';
import { DisclaimerSection } from '@/components/DisclaimerSection';
import { MonologueSection } from '@/components/MonologueSection';
import { HorizontalGallerySection } from '@/components/HorizontalGallerySection';
import { ZoomImageSection } from '@/components/ZoomImageSection';
import { ParallaxTextSection } from '@/components/ParallaxTextSection';
import { TripleImageSection } from '@/components/TripleImageSection';
import { ImageRevealSection } from '@/components/ImageRevealSection';
import { CreditsSection } from '@/components/CreditsSection';
import { BackgroundMusic } from '@/components/BackgroundMusic';
import { ScrollProgress } from '@/components/ScrollProgress';
import { Navigation } from '@/components/Navigation';

// Image data from the original site
const galleryImages1 = [
  { src: 'https://static-assets.everpurple.kr/history/images/04/God_knows_img_01.png', alt: 'INE history', ratio: 0.8 },
  { src: 'https://static-assets.everpurple.kr/history/images/04/God_knows_img_02.png', alt: 'INE history', ratio: 0.8 },
  { src: 'https://static-assets.everpurple.kr/history/images/04/God_knows_img_03.png', alt: 'INE history', ratio: 0.8 },
  { src: 'https://static-assets.everpurple.kr/history/images/04/Popular_img_04.png', alt: 'INE history', ratio: 0.8 },
  { src: 'https://static-assets.everpurple.kr/history/images/04/Popular_img_05.png', alt: 'INE history', ratio: 0.8 },
  { src: 'https://static-assets.everpurple.kr/history/images/04/Popular_img_06.png', alt: 'INE history', ratio: 0.8 },
  { src: 'https://static-assets.everpurple.kr/history/images/05/Owl_img_01.png', alt: 'INE history', ratio: 1.7 },
  { src: 'https://static-assets.everpurple.kr/history/images/05/Owl_img_03.png', alt: 'INE history', ratio: 1.7 },
];

const galleryImages2 = [
  { src: 'https://static-assets.everpurple.kr/history/images/06/Winter_spring_img_01.png', alt: 'INE history', ratio: 0.8 },
  { src: 'https://static-assets.everpurple.kr/history/images/06/Kidding_img_02.png', alt: 'INE history', ratio: 0.8 },
  { src: 'https://static-assets.everpurple.kr/history/images/06/Another_world_img_03.png', alt: 'INE history', ratio: 0.8 },
  { src: 'https://static-assets.everpurple.kr/history/images/06/Lockdown_img_04.png', alt: 'INE history', ratio: 0.8 },
  { src: 'https://static-assets.everpurple.kr/history/images/06/Rewind_img_05.png', alt: 'INE history', ratio: 0.8 },
  { src: 'https://static-assets.everpurple.kr/history/images/06/Mashup_img_06.png', alt: 'INE history', ratio: 0.8 },
  { src: 'https://static-assets.everpurple.kr/history/images/06/Isedol_webtoon_img_07.png', alt: 'INE history', ratio: 0.8 },
  { src: 'https://static-assets.everpurple.kr/history/images/06/Showdown_img_09.png', alt: 'INE history', ratio: 0.8 },
];

const anotherWorldImages = [
  { src: 'https://static-assets.everpurple.kr/history/images/09/Another_world_img_01.png', alt: 'Another World' },
  { src: 'https://static-assets.everpurple.kr/history/images/09/Another_world_img_02.png', alt: 'Another World' },
  { src: 'https://static-assets.everpurple.kr/history/images/09/Another_world_img_03.png', alt: 'Another World' },
];

const showdownImages = [
  { src: 'https://static-assets.everpurple.kr/history/images/09/Showdown_img_07.png', alt: 'ShowDown' },
  { src: 'https://static-assets.everpurple.kr/history/images/09/Showdown_img_08.png', alt: 'ShowDown' },
  { src: 'https://static-assets.everpurple.kr/history/images/09/Showdown_img_09.png', alt: 'ShowDown' },
];

const lockdownImages = [
  { src: 'https://static-assets.everpurple.kr/history/images/09/Lockdown_img_04.png', alt: 'LOCKDOWN' },
  { src: 'https://static-assets.everpurple.kr/history/images/09/Lockdown_img_05.png', alt: 'LOCKDOWN' },
  { src: 'https://static-assets.everpurple.kr/history/images/09/Lockdown_img_06.png', alt: 'LOCKDOWN' },
];

const festivalImages = [
  { src: 'https://static-assets.everpurple.kr/history/images/12/isegye_festival_over_img_01_cropped.png', alt: 'OVER', title: 'OVER' },
  { src: 'https://static-assets.everpurple.kr/history/images/12/isegye_festival_rewind_img_02_cropped.png', alt: 'RE:WIND', title: 'RE:WIND' },
  { src: 'https://static-assets.everpurple.kr/history/images/12/isegye_festival_superhero_img_03_cropped.png', alt: 'Superhero', title: 'Superhero' },
  { src: 'https://static-assets.everpurple.kr/history/images/12/isegye_festival_winterspring_img_04_cropped.png', alt: '겨울봄', title: '겨울봄' },
];

const Index = () => {
  const lenisRef = useLenis();

  const handleStart = useCallback(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(window.innerHeight, {
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  }, [lenisRef]);

  useEffect(() => {
    // Add lenis class to html element
    document.documentElement.classList.add('lenis', 'lenis-smooth');
    return () => {
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
    };
  }, []);

  return (
    <main className="bg-background">
      {/* Global UI elements */}
      <ScrollProgress />
      <BackgroundMusic />
      <Navigation />

      {/* Landing */}
      <LandingSection onStart={handleStart} />

      {/* Disclaimer */}
      <DisclaimerSection />

      {/* Opening monologue */}
      <MonologueSection
        lines={[
          '살아가며 마주하는 헤아릴 수도 없이 많은 상황과 경험,',
          '그 중 기억으로 남는 특별한 순간들...',
          '제게는 항상 노래가 그 중심에 있었습니다.',
        ]}
      />

      <MonologueSection
        lines={[
          '지금부터 시작하는 저의 이야기에는 노래가 저에게 가진 의미부터 여러분과의 만남까지,',
          '무엇과도 바꿀 수 없는 소중한 순간들을 담았습니다.',
        ]}
      />

      {/* First horizontal gallery */}
      <HorizontalGallerySection
        images={galleryImages1}
        description="노래를 부르는 것은, 저에게는 눈을 뜨고 숨을 쉬는 것처럼 너무나 당연한 것이었습니다. 아주 어렸을 때부터 디즈니 영화와 뮤지컬을 보고 들으며, 멜로디와 함께 노래에 담긴 감정들을 느끼고 이해하는 과정이 정말 즐거웠어요."
        linkText="뮤직비디오 시청하기"
        title="「God knows...」 스즈미야 하루히의 우울 OST (Cover by 아이네 INE)"
        height="500vh"
      />

      {/* Second horizontal gallery */}
      <HorizontalGallerySection
        images={galleryImages2}
        height="500vh"
      />

      {/* Zoom image with text */}
      <ZoomImageSection
        imageSrc="https://static-assets.everpurple.kr/history/images/07/Rewind_img_01.png"
        imageAlt="Rewind"
        overlayText="그러다 '이세계아이돌'이라는 기회를 만나게 되었습니다."
        subText="노래로 만나게 된 새로운 세상이었습니다."
      />

      {/* Text section */}
      <ParallaxTextSection
        heading="이세계 아이돌을 만난 첫번째 기적"
        lines={[
          '어느새 저는 "내가 느꼈던 노래에 대한 모든 것과 노래를 통해 경험한 행복을 다른 사람과 함께 할 수 있다면 정말 좋겠다"고 생각하게 되었습니다.',
          '그전까지 제게 노래는 그저 "들려주는 것"이었는데,',
          '이세돌 활동을 하며 노래가 사람을 "잇는다는 것"을 실감하게 되었어요.',
        ]}
      />

      <ParallaxTextSection
        lines={[
          '어렸을 적의 제가 디즈니와 뮤지컬을 통해 위로와 즐거움을 느꼈던 것처럼,',
          '아이네와 이세돌의 노래 역시 누군가에게는 재미있는 이야기가,',
          '누군가에게는 위로가 된다는 점이 감사하고 기뻤습니다.',
        ]}
      />

      {/* Singles zoom */}
      <ZoomImageSection
        imageSrc="https://static-assets.everpurple.kr/history/images/08/singles.png"
        imageAlt="Singles"
      />

      {/* Triple image sections */}
      <TripleImageSection
        images={anotherWorldImages}
        topText="저와 멤버들의 목소리뿐만 아니라 노래와 조화를 이루는 뮤비,"
        title="Another World"
      />

      <TripleImageSection
        images={showdownImages}
        topText="여러 작업자분들의 노력까지..."
        title="ShowDown"
      />

      <TripleImageSection
        images={lockdownImages}
        topText="이세돌과 함께 쌓아간 노래에는, 혼자서는 상상조차 못했던 많은 것들이 담겨 있었어요."
        title="LOCKDOWN"
      />

      {/* Another World zoom */}
      <ZoomImageSection
        imageSrc="https://static-assets.everpurple.kr/history/images/10/Another_world_img_01.png"
        imageAlt="Another World"
        overlayText="온전히 저만의 것이 아닌, 모두의 노력이 맺은 결실이기에"
        subText="더 소중하게 느껴졌습니다."
      />

      {/* Text with heading */}
      <ParallaxTextSection
        heading="차원을 넘어 이세계아이돌, 마법소녀 이세계 아이돌"
        lines={[
          '누군가가 저를 노래로 만났듯이,',
          '저 역시 노래로 많은 사람과 인연이 닿아 만날 수 있었어요.',
        ]}
      />

      {/* Webtoon images */}
      <ImageRevealSection
        images={[
          { src: 'https://static-assets.everpurple.kr/history/images/10/Isedol_webtoon_img_02.png', alt: 'Isedol webtoon' },
          { src: 'https://static-assets.everpurple.kr/history/images/10/Isedol_webtoon_img_03.png', alt: 'Isedol webtoon' },
          { src: 'https://static-assets.everpurple.kr/history/images/10/Isedol_webtoon_img_04.png', alt: 'Isedol webtoon' },
        ]}
        layout="row"
      />

      {/* Traffic light section */}
      <ParallaxTextSection
        heading="신호등(Traffic light) Cover by 아이네"
        lines={[
          '그리고 사람들과의 이야기는,',
          '새로운 영감으로 제게 다가와 다시 음악이 되었습니다.',
        ]}
      />

      <ImageRevealSection
        images={[
          { src: 'https://static-assets.everpurple.kr/history/images/10/Traffic_light_img_05.png', alt: 'Traffic light' },
          { src: 'https://static-assets.everpurple.kr/history/images/10/Traffic_light_img_06.png', alt: 'Traffic light' },
        ]}
        layout="row"
      />

      {/* Mashup section */}
      <ParallaxTextSection
        heading="고멤가요제 MASHUP - 아이네 INE"
        lines={[
          '왁타버스에서 새로운 이야기로, 함께하는 유대로,',
          '다시 노래로 이어지며 점차 저의, "아이네"의 세계를 넓혀갔습니다.',
        ]}
      />

      <ImageRevealSection
        images={[
          { src: 'https://static-assets.everpurple.kr/history/images/10/Mashup_img_07.png', alt: 'Mashup' },
          { src: 'https://static-assets.everpurple.kr/history/images/10/Mashup_img_08.png', alt: 'Mashup' },
        ]}
        layout="row"
      />

      {/* Festival zoom */}
      <ZoomImageSection
        imageSrc="https://static-assets.everpurple.kr/history/images/11/Isegye_festival_img_01.png"
        imageAlt="Isegye Festival"
        overlayText="그렇게 더 많은 사람들에게 노래를 들려줄 수 있도록 열심히 달렸습니다."
        subText="뒤를 돌아보니, 노래를 들은 수많은 사람들의 미소를 볼 수 있었어요."
      />

      {/* Festival images grid */}
      <ImageRevealSection
        images={festivalImages}
        layout="grid"
      />

      {/* Rewind zoom */}
      <ZoomImageSection
        imageSrc="https://static-assets.everpurple.kr/history/images/13/Rewind_img_01_min.png"
        imageAlt="Rewind"
      />

      {/* Credits */}
      <CreditsSection />
    </main>
  );
};

export default Index;

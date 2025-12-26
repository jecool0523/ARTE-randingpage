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
import { FanStorySection } from '@/components/FanStorySection';
import { StreamingSection } from '@/components/StreamingSection';
import { ConcertGallerySection } from '@/components/ConcertGallerySection';
import { PhotoGallerySection } from '@/components/PhotoGallerySection';
import { FinalMessageSection } from '@/components/FinalMessageSection';
import { SectionDivider } from '@/components/SectionDivider';
import { DynamicBackground } from '@/components/DynamicBackground'; // [추가] 동적 배경 컴포넌트

// [참고] 데이터 분리 적용 시 아래 주석을 해제하고 하단의 하드코딩된 배열들을 대체하세요.
// import { portfolioData } from '@/data/portfolio';

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
    // [수정] bg-background 클래스 제거 (DynamicBackground가 배경 역할 수행)
    <main>
      {/* [추가] 동적 배경 컴포넌트 (가장 뒤에 배치됨) */}
      <DynamicBackground />

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
        // [데이터 적용 예시]: lines={portfolioData.openingMonologue}
      />

      <SectionDivider type="line" />

      <MonologueSection
        lines={[
          '지금부터 시작하는 저의 이야기에는 노래가 저에게 가진 의미부터 여러분과의 만남까지,',
          '무엇과도 바꿀 수 없는 소중한 순간들을 담았습니다.',
        ]}
      />

      <SectionDivider type="gradient" fromColor="hsl(20, 10%, 8%)" toColor="transparent" />

      {/* First horizontal gallery */}
      <HorizontalGallerySection
        images={galleryImages1}
        description="노래를 부르는 것은, 저에게는 눈을 뜨고 숨을 쉬는 것처럼 너무나 당연한 것이었습니다. 아주 어렸을 때부터 디즈니 영화와 뮤지컬을 보고 들으며, 멜로디와 함께 노래에 담긴 감정들을 느끼고 이해하는 과정이 정말 즐거웠어요."
        linkText="뮤직비디오 시청하기"
        title="「God knows...」 스즈미야 하루히의 우울 OST (Cover by 아이네 INE)"
        height="500vh"
      />

      <SectionDivider type="gradient" fromColor="transparent" toColor="transparent" />

      {/* Second horizontal gallery */}
      <HorizontalGallerySection
        images={galleryImages2}
        height="500vh"
      />

      <SectionDivider type="line" />

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

      <SectionDivider type="gradient" fromColor="transparent" toColor="hsl(260, 15%, 6%)" />

      {/* Singles zoom */}
      <ZoomImageSection
        imageSrc="https://static-assets.everpurple.kr/history/images/08/singles.png"
        imageAlt="Singles"
      />

      <SectionDivider type="line" />

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

      <SectionDivider type="gradient" fromColor="hsl(260, 15%, 6%)" toColor="transparent" />

      {/* Another World zoom */}
      <ZoomImageSection
        imageSrc="https://static-assets.everpurple.kr/history/images/10/Another_world_img_01.png"
        imageAlt="Another World"
        overlayText="온전히 저만의 것이 아닌, 모두의 노력이 맺은 결실이기에"
        subText="더 소중하게 느껴졌습니다."
      />

      <SectionDivider type="line" />

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

      <SectionDivider type="gradient" fromColor="transparent" toColor="hsl(280, 20%, 5%)" />

      {/* Festival zoom */}
      <ZoomImageSection
        imageSrc="https://static-assets.everpurple.kr/history/images/11/Isegye_festival_img_01.png"
        imageAlt="Isegye Festival"
        overlayText="그렇게 더 많은 사람들에게 노래를 들려줄 수 있도록 열심히 달렸습니다."
        subText="뒤를 돌아보니, 노래를 들은 수많은 사람들의 미소를 볼 수 있었어요."
      />

      <SectionDivider type="line" />

      {/* Festival images grid */}
      <ImageRevealSection
        images={festivalImages}
        layout="grid"
      />

      <SectionDivider type="gradient" fromColor="hsl(280, 20%, 5%)" toColor="transparent" />

      {/* Rewind zoom */}
      <ZoomImageSection
        imageSrc="https://static-assets.everpurple.kr/history/images/13/Rewind_img_01_min.png"
        imageAlt="Rewind"
      />

      <SectionDivider type="line" />

      {/* Fan story section */}
      <MonologueSection
        lines={[
          '노래뿐만이 아니라, 아이네의 이야기를,',
          '더 나아가 \'아이네\' 자체를 좋아하는 사람들이 생겼습니다.',
        ]}
      />

      <FanStorySection
        images={fanImages}
        topText="나를 찾아오고 기다리는 사람이 있다는 것은 굉장히 특별한 감정으로 다가왔어요."
      />

      <SectionDivider type="gradient" fromColor="transparent" toColor="hsl(220, 15%, 6%)" />

      {/* Streaming/Broadcasting section */}
      <StreamingSection
        images={streamingImages}
        text="시작은 '노래하는 아이네'였지만 시청자들과 소통하는 방송인으로서의 모습 역시 저의 정체성이자 또 다른 즐거움이 되었습니다."
      />

      <SectionDivider type="gradient" fromColor="hsl(220, 15%, 6%)" toColor="transparent" />

      {/* Concert section intro */}
      <ImageRevealSection
        images={concertImages1}
        layout="stacked"
      />

      <SectionDivider type="line" />

      <MonologueSection
        lines={[
          '한결같이 수많은 응원과 사랑을 보내주는 팬분들께 어떻게 보답할 수 있을까 고민한 끝에,',
          '\'지친 하루에 잠깐의 쉼과 위로를 나눌 수 있는 아이돌이자 방송인\'이 되자고 결심했어요.',
        ]}
      />

      {/* Concert images */}
      <ImageRevealSection
        images={concertImages2}
        layout="stacked"
      />

      <ConcertGallerySection
        images={concertImages3}
        topText={[
          '때로는 말로, 때로는 노래로,',
          '그리고 때로는 색다른 시도로 방송을 진행했지만,',
          '언제나 \'고된 일상 가운데 즐거운 시간을 함께 만들어가고 싶다\'는',
          '마음만큼은 변하지 않았습니다.',
        ]}
      />

      <ConcertGallerySection
        images={concertImages4}
      />

      <SectionDivider type="gradient" fromColor="transparent" toColor="hsl(270, 25%, 4%)" />

      {/* Photo gallery */}
      <PhotoGallerySection
        images={photoGalleryImages}
        topText={[
          '3년 동안 쌓아온 소중한 추억들을 돌이켜보면서,',
          '제가 사람들에게 들려주고 싶은 말은 무엇일지 곰곰이 생각해 보았어요.',
          '고심 끝에, \'사람들이 좋아하는 나의 이야기이자 나의 진심\' 그 자체를 전하기로 했습니다.',
        ]}
      />

      <SectionDivider type="gradient" fromColor="hsl(270, 25%, 4%)" toColor="transparent" />

      {/* Final message */}
      <FinalMessageSection
        backgroundImage="https://static-assets.everpurple.kr/history/images/ine_background.png"
        lines={[
          '그래서 저는 노래하려 합니다.',
          '변하지 않는 언제나의 보라색으로,',
          '여러분에게 아이네의 이야기를 전하는 콘서트에서',
          '지금까지 쌓아온 추억부터 앞으로 여러분과 함께 만들어 갈 이야기까지',
          '찾아오는 사람들에게 위로와 쉼을 주고픈 마음을 담아 콘서트를 준비했습니다.',
          '아이네의 EVER PURPLE, 많은 기대와 사랑 부탁드립니다.',
        ]}
      />

      {/* Credits */}
      <CreditsSection />
    </main>
  );
};

// --- Data Arrays (아래 데이터들을 src/data/portfolio.ts 로 이동시키는 것을 권장합니다) ---

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

const fanImages = [
  { src: 'https://static-assets.everpurple.kr/history/images/15/dulgi_img_01.png', alt: 'Dulgi' },
  { src: 'https://static-assets.everpurple.kr/history/images/14/dulgi_img_04.png', alt: 'Dulgi' },
  { src: 'https://static-assets.everpurple.kr/history/images/14/Fandom_img_02.png', alt: 'Fandom' },
  { src: 'https://static-assets.everpurple.kr/history/images/14/Fandom_img_03.png', alt: 'Fandom' },
];

const streamingImages = [
  'https://static-assets.everpurple.kr/history/images/16/Streaming_wallpaper_img_01.png',
  'https://static-assets.everpurple.kr/history/images/16/Streaming_wallpaper_img_02.png',
  'https://static-assets.everpurple.kr/history/images/16/Streaming_wallpaper_img_03.png',
];

const concertImages1 = [
  { src: 'https://static-assets.everpurple.kr/history/images/18/Concert_img_01.png', alt: 'Concert' },
];

const concertImages2 = [
  { src: 'https://static-assets.everpurple.kr/history/images/19_1/Concert_img_01.png', alt: 'Concert' },
];

const concertImages3 = [
  { src: 'https://static-assets.everpurple.kr/history/images/19_2/Hamine_party_img_01.png', alt: 'Hamine Party' },
  { src: 'https://static-assets.everpurple.kr/history/images/19_2/Concert_img_02.png', alt: 'Concert' },
  { src: 'https://static-assets.everpurple.kr/history/images/19_2/Concert_img_03.png', alt: 'Concert' },
];

const concertImages4 = [
  { src: 'https://static-assets.everpurple.kr/history/images/19_3/Concert_img_01.png', alt: 'Concert' },
  { src: 'https://static-assets.everpurple.kr/history/images/19_3/Hamine_party_img_02.png', alt: 'Hamine Party' },
  { src: 'https://static-assets.everpurple.kr/history/images/19_3/Let_it_snow_img_03.png', alt: 'Let it snow' },
  { src: 'https://static-assets.everpurple.kr/history/images/19_3/Concert_img_04.png', alt: 'Concert' },
  { src: 'https://static-assets.everpurple.kr/history/images/19_3/Concert_img_05.png', alt: 'Concert' },
  { src: 'https://static-assets.everpurple.kr/history/images/19_3/Hamine_party_img_06.png', alt: 'Hamine Party' },
];

const photoGalleryImages = Array.from({ length: 23 }, (_, i) => ({
  src: `https://static-assets.everpurple.kr/history/images/20/ine_photo_img_${i + 1}.png`,
  alt: `INE photo ${i + 1}`,
}));

export default Index;

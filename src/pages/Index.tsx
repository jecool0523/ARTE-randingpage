import { useCallback, useEffect, lazy, Suspense } from 'react';
import { useLenis } from '@/hooks/useLenis';

// Critical above-the-fold components (loaded immediately)
import { LandingSection } from '@/components/LandingSection';
import { DisclaimerSection } from '@/components/DisclaimerSection';
import { DynamicBackground } from '@/components/DynamicBackground';
import { ScrollProgress } from '@/components/ScrollProgress';
import { BackgroundMusic } from '@/components/BackgroundMusic';
import { Navigation } from '@/components/Navigation';
import { SectionWrapper, DIVIDERS } from '@/components/SectionWrapper';
import { SectionDivider } from '@/components/SectionDivider';

// Lazy-loaded components (below-the-fold)
const MonologueSection = lazy(() => import('@/components/MonologueSection').then(m => ({ default: m.MonologueSection })));
const HorizontalGallerySection = lazy(() => import('@/components/HorizontalGallerySection').then(m => ({ default: m.HorizontalGallerySection })));
const ZoomImageSection = lazy(() => import('@/components/ZoomImageSection').then(m => ({ default: m.ZoomImageSection })));
const ParallaxTextSection = lazy(() => import('@/components/ParallaxTextSection').then(m => ({ default: m.ParallaxTextSection })));
const TripleImageSection = lazy(() => import('@/components/TripleImageSection').then(m => ({ default: m.TripleImageSection })));
const ImageRevealSection = lazy(() => import('@/components/ImageRevealSection').then(m => ({ default: m.ImageRevealSection })));
const FanStorySection = lazy(() => import('@/components/FanStorySection').then(m => ({ default: m.FanStorySection })));
const StreamingSection = lazy(() => import('@/components/StreamingSection').then(m => ({ default: m.StreamingSection })));
const ConcertGallerySection = lazy(() => import('@/components/ConcertGallerySection').then(m => ({ default: m.ConcertGallerySection })));
const PhotoGallerySection = lazy(() => import('@/components/PhotoGallerySection').then(m => ({ default: m.PhotoGallerySection })));
const FinalMessageSection = lazy(() => import('@/components/FinalMessageSection').then(m => ({ default: m.FinalMessageSection })));
const CreditsSection = lazy(() => import('@/components/CreditsSection').then(m => ({ default: m.CreditsSection })));

// Data imports from centralized siteData
import {
  galleryImages1,
  galleryImages2,
  anotherWorldImages,
  showdownImages,
  lockdownImages,
  festivalImages,
  fanImages,
  streamingImages,
  concertImages1,
  concertImages2,
  concertImages3,
  concertImages4,
  photoGalleryImages,
  webtoonImages,
  trafficLightImages,
  mashupImages,
  monologueTexts,
  parallaxTexts,
  zoomImageData,
  horizontalGalleryData,
  tripleImageData,
  fanStorySectionData,
  streamingSectionData,
  concertGallerySectionData,
  photoGallerySectionData,
  finalMessageData,
} from '@/data/siteData';

// Loading fallback for lazy components
const SectionLoader = () => (
  <div className="flex min-h-[50vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
  </div>
);

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
    document.documentElement.classList.add('lenis', 'lenis-smooth');
    return () => {
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
    };
  }, []);

  return (
    <main>
      {/* Dynamic Background */}
      <DynamicBackground />

      {/* Global UI elements */}
      <ScrollProgress />
      <BackgroundMusic />
      <Navigation />

      {/* Landing (Critical - Above the fold) */}
      <LandingSection onStart={handleStart} />

      {/* Disclaimer */}
      <DisclaimerSection />

      {/* Lazy-loaded content sections */}
      <Suspense fallback={<SectionLoader />}>
        {/* Opening Sequence */}
        <MonologueSection lines={monologueTexts.opening} />
        
        <SectionWrapper dividerBefore={DIVIDERS.line}>
          <MonologueSection lines={monologueTexts.openingContinue} />
        </SectionWrapper>

        {/* Gallery Sequence */}
        <SectionDivider type="gradient" fromColor="hsl(20, 10%, 8%)" toColor="transparent" />
        
        <HorizontalGallerySection
          images={galleryImages1}
          description={horizontalGalleryData.first.description}
          linkText={horizontalGalleryData.first.linkText}
          title={horizontalGalleryData.first.title}
          height="500vh"
        />

        <SectionWrapper dividerBefore={DIVIDERS.transparent}>
          <HorizontalGallerySection images={galleryImages2} height="500vh" />
        </SectionWrapper>

        {/* Rewind Sequence */}
        <SectionWrapper dividerBefore={DIVIDERS.line}>
          <ZoomImageSection
            imageSrc={zoomImageData.rewind.src}
            imageAlt={zoomImageData.rewind.alt}
            overlayText={zoomImageData.rewind.overlayText}
            subText={zoomImageData.rewind.subText}
          />
        </SectionWrapper>

        {/* First Miracle Text */}
        <ParallaxTextSection
          heading={parallaxTexts.firstMiracle.heading}
          lines={parallaxTexts.firstMiracle.lines}
          variant="purple"
        />

        <ParallaxTextSection
          lines={parallaxTexts.firstMiracleContinue.lines}
          variant="bright-purple"
        />

        {/* Singles Zoom */}
        <SectionWrapper 
          dividerBefore={DIVIDERS.gradientToDark('hsl(260, 15%, 6%)')}
          dividerAfter={DIVIDERS.line}
        >
          <ZoomImageSection
            imageSrc={zoomImageData.singles.src}
            imageAlt={zoomImageData.singles.alt}
          />
        </SectionWrapper>

        {/* Triple Image Sequence */}
        <TripleImageSection
          images={anotherWorldImages}
          topText={tripleImageData.anotherWorld.topText}
          title={tripleImageData.anotherWorld.title}
        />

        <TripleImageSection
          images={showdownImages}
          topText={tripleImageData.showdown.topText}
          title={tripleImageData.showdown.title}
        />

        <TripleImageSection
          images={lockdownImages}
          topText={tripleImageData.lockdown.topText}
          title={tripleImageData.lockdown.title}
        />

        {/* Another World Zoom */}
        <SectionWrapper 
          dividerBefore={DIVIDERS.gradientFromDark('hsl(260, 15%, 6%)')}
          dividerAfter={DIVIDERS.line}
        >
          <ZoomImageSection
            imageSrc={zoomImageData.anotherWorld.src}
            imageAlt={zoomImageData.anotherWorld.alt}
            overlayText={zoomImageData.anotherWorld.overlayText}
            subText={zoomImageData.anotherWorld.subText}
          />
        </SectionWrapper>

        {/* Dimension Text + Images */}
        <ParallaxTextSection
          heading={parallaxTexts.dimension.heading}
          lines={parallaxTexts.dimension.lines}
          variant="purple"
        />

        <ImageRevealSection images={webtoonImages} layout="row" />

        <ParallaxTextSection
          heading={parallaxTexts.trafficLight.heading}
          lines={parallaxTexts.trafficLight.lines}
          variant="bright-purple"
        />

        <ImageRevealSection images={trafficLightImages} layout="row" />

        <ParallaxTextSection
          heading={parallaxTexts.mashup.heading}
          lines={parallaxTexts.mashup.lines}
          variant="purple"
        />

        <ImageRevealSection images={mashupImages} layout="row" />

        {/* Festival Sequence */}
        <SectionWrapper 
          dividerBefore={DIVIDERS.gradientToDark('hsl(280, 20%, 5%)')}
          dividerAfter={DIVIDERS.line}
        >
          <ZoomImageSection
            imageSrc={zoomImageData.festival.src}
            imageAlt={zoomImageData.festival.alt}
            overlayText={zoomImageData.festival.overlayText}
            subText={zoomImageData.festival.subText}
          />
        </SectionWrapper>

        <ImageRevealSection images={festivalImages} layout="grid" />

        {/* Fan Story Sequence */}
        <SectionWrapper 
          dividerBefore={DIVIDERS.gradientFromDark('hsl(280, 20%, 5%)')}
          dividerAfter={DIVIDERS.line}
        >
          <ZoomImageSection
            imageSrc={zoomImageData.rewindMin.src}
            imageAlt={zoomImageData.rewindMin.alt}
          />
        </SectionWrapper>

        <MonologueSection lines={monologueTexts.fanStory} variant="deep-purple" />

        <FanStorySection
          images={fanImages}
          topText={fanStorySectionData.topText}
        />

        {/* Streaming Section */}
        <SectionWrapper 
          dividerBefore={DIVIDERS.gradientToDark('hsl(220, 15%, 6%)')}
          dividerAfter={DIVIDERS.gradientFromDark('hsl(220, 15%, 6%)')}
        >
          <StreamingSection
            images={streamingImages}
            text={streamingSectionData.text}
          />
        </SectionWrapper>

        {/* Concert Sequence */}
        <SectionWrapper dividerAfter={DIVIDERS.line}>
          <ImageRevealSection images={concertImages1} layout="stacked" />
        </SectionWrapper>

        <MonologueSection lines={monologueTexts.concert} variant="dark" />

        <ImageRevealSection images={concertImages2} layout="stacked" />

        <ConcertGallerySection
          images={concertImages3}
          topText={concertGallerySectionData.first.topText}
        />

        <ConcertGallerySection images={concertImages4} />

        {/* Photo Gallery */}
        <SectionWrapper 
          dividerBefore={DIVIDERS.gradientToDark('hsl(270, 25%, 4%)')}
          dividerAfter={DIVIDERS.gradientFromDark('hsl(270, 25%, 4%)')}
        >
          <PhotoGallerySection
            images={photoGalleryImages}
            topText={photoGallerySectionData.topText}
          />
        </SectionWrapper>

        {/* Final Message */}
        <FinalMessageSection
          backgroundImage={finalMessageData.backgroundImage}
          lines={finalMessageData.lines}
        />

        {/* Credits */}
        <CreditsSection />
      </Suspense>
    </main>
  );
};

export default Index;

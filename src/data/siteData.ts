// ============================
// Site Data - Centralized content management
// ============================

// ============================
// Import Assets
// ============================
export const backgroundMusicUrl = 'https://static-assets.everpurple.kr/history/ine_history_bgm.mp3';
// 또는 로컬 파일 사용 시: import bgm from '@/assets/bgm.mp3';
import arteStage01 from '@/assets/arte_stage_01.jpg';
import arteCurtainCall from '@/assets/arte_curtain_call.jpg';
import arteTheaterSeats from '@/assets/arte_theater_seats.jpg';
import arteScript from '@/assets/arte_script.jpg';
import arteAudience from '@/assets/arte_audience.jpg';
import arteFinalBow from '@/assets/arte_final_bow.jpg';
import arteSceneHanbok from '@/assets/arte_scene_hanbok.jpg';
import arteSoloReading from '@/assets/arte_solo_reading.jpg';
import arteGroupScene from '@/assets/arte_group_scene.jpg';
import arteClassroom from '@/assets/arte_classroom.jpg';
import Background from '@/assets/rent/CurtainCall.jpg';
import titletxt from '@/assets/main_txt.png';
import laVieBoheme1 from '@/assets/rent/LaVieBoheme_1.mp4';
import laVieBoheme2 from '@/assets/rent/LaVieBoheme_2.mp4';


// ============================
// Type Definitions (Media supports both image and video)
// ============================
export interface MediaItemData {
  src: string;
  alt: string;
  type?: 'image' | 'video';
  ratio?: number;
  title?: string;
}

// Final Message Slide Type
export interface FinalMessageSlide {
  text: string;
  image: string;
  backgroundColor?: string;
}

// ============================
// Site Metadata
// ============================
// ============================
export const siteMetadata = {
  title: 'ARTE | 디미고 아르떼의 여정들',
  description: '아르떼의 이야기를 몰입형 전시와 함께 감상해보세요.',
  author: 'ARTE',
  themeColor: '#fffd6fff',
  url: 'https://arte-randingpage.vercel.app',
  ogImage: arteStage01,
  twitterCard: 'summary_large_image' as const,
  keywords: ['아르떼', 'ARTE', '디미고', 'dimigo', 'dimi', '연극', '뮤지컬', '동아리', '공연'],
  locale: 'ko_KR',
};

// ============================
// Navigation Chapters
// ============================
export interface NavigationChapter {
  id: string;
  title: string;
  offset: number;
}

export const navigationChapters: NavigationChapter[] = [
  { id: 'landing', title: '시작', offset: 0 },
  { id: 'story', title: '이야기', offset: 0.1 },
  { id: 'gallery', title: '노래', offset: 0.25 },
  { id: 'journey', title: '여정', offset: 0.5 },
  { id: 'festival', title: '무대', offset: 0.75 },
  { id: 'credits', title: '경험', offset: 0.95 },
];

export const navigationLabels = {
  menuTitle: 'Chapters',
  backToTop: '맨 위로',
};

// ============================
// Gallery Images
// ============================
export const galleryImages1 = [
  { src: arteStage01, alt: 'ARTE 공연 장면', ratio: 0.8 },
  { src: arteCurtainCall, alt: 'ARTE 커튼콜', ratio: 0.8 },
  { src: arteTheaterSeats, alt: '공연장 객석', ratio: 0.8 },
  { src: arteScript, alt: '대본 연습', ratio: 0.8 },
  { src: arteAudience, alt: '관객석', ratio: 0.8 },
  { src: arteFinalBow, alt: '마지막 인사', ratio: 0.8 },
  { src: arteSceneHanbok, alt: '한복 장면', ratio: 1.7 },
  { src: arteSoloReading, alt: '낭독 장면', ratio: 1.7 },
];

export const galleryImages2 = [
  { src: arteGroupScene, alt: 'ARTE 그룹 장면', ratio: 0.8 },
  { src: arteClassroom, alt: '교실 장면', ratio: 0.8 },
  { src: arteStage01, alt: 'ARTE 무대', ratio: 0.8 },
  { src: arteCurtainCall, alt: '커튼콜', ratio: 0.8 },
  { src: arteFinalBow, alt: '공연 마무리', ratio: 0.8 },
  { src: arteAudience, alt: '공연 관람', ratio: 0.8 },
  { src: arteSceneHanbok, alt: '무대 장면', ratio: 0.8 },
  { src: arteScript, alt: '연습 장면', ratio: 0.8 },
];

// Triple Image Sections
export const anotherWorldImages = [
  { src: arteGroupScene, alt: '연극 장면' },
  { src: arteSoloReading, alt: '독백 장면' },
  { src: arteClassroom, alt: '무대 장면' },
];

export const showdownImages = [
  { src: arteFinalBow, alt: '공연' },
  { src: arteCurtainCall, alt: '공연' },
  { src: arteStage01, alt: '공연' },
];

export const lockdownImages = [
  { src: arteSceneHanbok, alt: '뮤지컬 장면' },
  { src: arteTheaterSeats, alt: '공연장' },
  { src: arteAudience, alt: '관객' },
];

// Festival Images
export const festivalImages = [
  { src: arteStage01, alt: '죽은 시인의 사회', title: '죽은 시인의 사회' },
  { src: arteFinalBow, alt: '정기 공연', title: '정기 공연' },
  { src: arteSceneHanbok, alt: '전통극', title: '전통극' },
  { src: arteGroupScene, alt: '앙상블', title: '앙상블' },
];

// Fan Story Images
export const fanImages = [
  { src: arteAudience, alt: '관객' },
  { src: arteTheaterSeats, alt: '공연장' },
  { src: arteCurtainCall, alt: '커튼콜' },
  { src: arteScript, alt: '대본' },
];

// Streaming Background Images
export const streamingImages = [
  arteTheaterSeats,
  arteAudience,
  arteStage01,
];

// Concert Images
export const concertImages1 = [
  { src: arteStage01, alt: '공연' },
];

export const concertImages2 = [
  { src: arteFinalBow, alt: '공연' },
];

export const concertImages3 = [
  { src: arteCurtainCall, alt: '커튼콜' },
  { src: arteSceneHanbok, alt: '장면' },
  { src: arteGroupScene, alt: '앙상블' },
];

export const concertImages4 = [
  { src: arteStage01, alt: '무대' },
  { src: arteFinalBow, alt: '마무리' },
  { src: arteSoloReading, alt: '독백' },
  { src: arteClassroom, alt: '장면' },
  { src: arteAudience, alt: '관객' },
  { src: arteCurtainCall, alt: '커튼콜' },
];

// Photo Gallery Images
export const photoGalleryImages = [
  { src: arteStage01, alt: 'ARTE 사진 1' },
  { src: arteCurtainCall, alt: 'ARTE 사진 2' },
  { src: arteTheaterSeats, alt: 'ARTE 사진 3' },
  { src: arteScript, alt: 'ARTE 사진 4' },
  { src: arteAudience, alt: 'ARTE 사진 5' },
  { src: arteFinalBow, alt: 'ARTE 사진 6' },
  { src: arteSceneHanbok, alt: 'ARTE 사진 7' },
  { src: arteSoloReading, alt: 'ARTE 사진 8' },
  { src: arteGroupScene, alt: 'ARTE 사진 9' },
  { src: arteClassroom, alt: 'ARTE 사진 10' },
];

// Webtoon Images
export const webtoonImages = [
  { src: arteScript, alt: '대본' },
  { src: arteSoloReading, alt: '연습' },
  { src: arteClassroom, alt: '리허설' },
];

// Traffic Light Images
export const trafficLightImages = [
  { src: arteGroupScene, alt: '앙상블' },
  { src: arteSceneHanbok, alt: '장면' },
];

// Mashup Images
export const mashupImages = [
  { src: arteFinalBow, alt: '공연' },
  { src: arteCurtainCall, alt: '커튼콜' },
];

// ============================
// Landing Section Data (메인 화면)
// ============================
export const landingData = {
  // 배경 이미지 (URL 또는 import한 로컬 이미지 변수 사용)
  backgroundImage: Background,

  // 타이틀 이미지 (=ARTE Story 로고)
  titleImage: titletxt,

  // 환영 문구
  welcomeText: '히스토리 페이지에 오신 것을 환영합니다.',

  // 버튼 텍스트
  buttonText: '관람 시작하기',

  // 하단 설명 문구
  subText: '아르떼의 여정을 같이 체험해보세요'
};

// ============================
// Dynamic Background Data
// ============================
export const dynamicBackgroundData = {
  finalImage: arteFinalBow, // 마지막 구간 배경 이미지
};

// ============================
// Video Data
// ============================
export const videoData = {
  laVieBoheme1,
  laVieBoheme2,
};

// ============================
// Masonry Gallery Section Data
// ============================
export const masonryGalleryData = {
  title: "Captured Moments",
  subtitle: "무대 뒤편의 땀방울부터 화려한 조명 아래의 환희까지, 아르떼가 걸어온 빛나는 여정의 기록들입니다.",
  // Masonry 레이아웃을 위해 이미지를 충분히 배치합니다 (3열 그리드 권장)
  images: [
    {
      src: arteStage01,
      alt: "Opening Scene",
      title: "설렘의 시작",
      ratio: 1.5
    },
    {
      src: arteSoloReading,
      alt: "Solo Performance",
      title: "독백의 순간",
      ratio: 0.8
    },
    {
      src: arteAudience,
      alt: "Audience View",
      title: "꽉 찬 객석",
      ratio: 1.2
    },
    {
      src: arteCurtainCall,
      alt: "Curtain Call",
      title: "커튼콜의 환호",
      ratio: 1.0
    },
    {
      src: arteScript,
      alt: "Script Reading",
      title: "치열했던 연습",
      ratio: 0.7
    },
    {
      src: arteGroupScene,
      alt: "Group Acting",
      title: "함께 만드는 호흡",
      ratio: 1.4
    },
    {
      src: arteSceneHanbok,
      alt: "Traditional Play",
      title: "전통의 울림",
      ratio: 0.9
    },
    {
      src: arteTheaterSeats,
      alt: "Empty Theater",
      title: "무대의 정적",
      ratio: 1.1
    },
    {
      src: arteFinalBow,
      alt: "Final Bow",
      title: "마지막 인사",
      ratio: 1.3
    },
  ]
};

// ============================
// Text Content
// ============================

export const monologueTexts = {
  opening: [
    '디미고에서 마주하는 헤아릴 수도 없이 많은 상황과 경험,',
    '그 중 기억에 남는 특별한 순간들...',
    '저희 아르떼에게는 항상 무대가 그 중심에 있었습니다.',
  ],
  openingContinue: [
    '지금부터 시작하는 아르떼의 이야기에는 디미고 생활 속 아르떼가 저희에게 가진 의미부터 2026 신입생 분들과의 만남까지,',
    '무엇과도 바꿀 수 없는 소중한 순간들을 담았고, 담아갈 것입니다.',
  ],
  fanStory: [
    '공연과 함께하는, 아르떼의 이야기를,',
    "'아르떼' 자체를 사랑하는 사람들과 함께.",
  ],
  concert: [
    '한결같이 수많은 응원과 사랑을 보내주는 관객분들께 어떻게 보답할 수 있을까 고민한 끝에,',
    "'진심을 담은 무대로 감동을 전하는 동아리'가 되자고 결심했어요.",
  ],
};

export const parallaxTexts = {
  firstMiracle: {
    heading: '아르떼와 함께한 첫 번째 무대',
    lines: [
      '뮤지컬을 정말 좋아하던 "뮤덕" 친구부터, 연극에 대해 문외한이던 친구까지.',
      '각자 다 다르던 친구들이 "공연"으로 하나가 되었습니다.',
      '어느새 저희는 "모두에게 좋은 공연을 보여주고 싶다"라는 생각으로 가득찼어요',
    ],
  },
  firstMiracleContinue: {
    lines: [
      '어렸을 적 연극과 뮤지컬을 보며 위로와 즐거움을 느꼈던 것처럼,',
      '아르떼의 공연 역시 누군가에게는 재미있는 이야기가,',
      '누군가에게는 위로가 된다는 점이 저희 활동의 크나큰 원동력이 되었습니다.',
    ],
  },
  dimension: {
    heading: '무대를 넘어 아르떼, 새로운 만남으로',
    lines: [
      '지금까지 저희가 무대를 통해 많은 사람과 만났듯이,',
      '앞으로도 아르떼를 통해 더 많은 인연이 시작되기를 바랍니다.',
    ],
  },
  trafficLight: {
    heading: '2026 아르떼 신입생 모집',
    lines: [
      '너무나 새롭고, 또 두근거리는 디미고 생활',
      '일요일 저녁, 아르떼가 디미고의 또 다른 "로망"으로',
    ],
  },
  mashup: {
    heading: '아르떼 - 3rd',
    lines: [
      '앞으로의 무대를 같이 만들어나가요.',
      '2026 아르떼 신입생 여러분 모두를 환영합니다!',
    ],
  },
};

export const zoomImageData = {
  rewind: {
    src: arteScript,
    alt: '대본',
    overlayText: "그러다 '아르떼'라는 동아리를 만나게 되었습니다.",
    subText: '무대로 만나게 된 새로운 세상이었습니다.',
  },
  singles: {
    src: arteSoloReading,
    alt: '독백',
  },
  anotherWorld: {
    src: arteGroupScene,
    alt: '앙상블',
    overlayText: "모두의 노력이 모여 맺은 최고의 결실이기에",
    subText: '더 소중하게 느껴졌습니다.',
  },
  festival: {
    src: arteStage01,
    alt: '공연',
    overlayText: '이제는 또 다른 멤버들과 함께 열심히 달리겠습니다.',
    subText: '공연을 본 수많은 사람들의 미소를 지키기 위해서.',
  },
  rewindMin: {
    src: arteTheaterSeats,
    alt: '공연장',
  },
};

export const horizontalGalleryData = {
  first: {
    description: '연극을 하는 것은, 저희에게는 너무나 새롭고 어색한 것들이었습니다. 하지만, 각자 표현에 대한 자신만의 열정을 가지고 있었어요.',
    linkText: '공연 영상 보기',
    linkUrl: 'https://youtu.be/chq9oiuEIG4?si=oQtToLFvKeFrZDmY',
    title: '「죽은 시인의 사회」 정기공연 by 아르떼 ARTE',
  },
};

export const tripleImageData = {
  anotherWorld: {
    topText: '비록 공연은 못했지만 한글자씩 대본을 써내려가던 그 행복,',
    title: '오늘 밤, 거짓말의 세계에서 잊을 수 없는 사랑을',
  },
  showdown: {
    topText: '새로운 부원들과 하는 첫 번째 공연...',
    title: '죽은 시인의 사회',
  },
  lockdown: {
    topText: '도전적 뮤지컬까지 모두 쌓아간 무대에는, 혼자서는 상상조차 못했던 많은 것들이 담겨 있었어요.',
    title: '렌트 : RENT',
  },
};

export const fanStorySectionData = {
  topText: '저희를 찾아오고 기다리는 관객이 있다는 것은 굉장히 특별한 감정으로 다가왔어요.',
};

export const streamingSectionData = {
  text: "시작은 '뮤지컬을 좋아하는 사람들의 모임'이었지만, 공연을 보여드리는 것이 저희의 정체성이자 또 다른 즐거움이 되었습니다.",
};

export const concertGallerySectionData = {
  first: {
    topText: [
      '때로는 대사로, 때로는 노래로,',
      '그리고 때로는 색다른 시도로 무대를 꾸몄지만,',
      "'언제나 '바쁜 일상 가운데 잠시나마 감동의 시간을 함께 만들어가고 싶다'는",
      '마음만큼은 변하지 않았습니다.',
    ],
  },
};

export const photoGallerySectionData = {
  topText: [
    '지금까지 쌓아온 소중한 추억들을 돌이켜보면서,',
    '저희가 관객들에게 전하고 싶은 이야기는 무엇일지 곰곰이 생각해 보았어요.',
    "'고심 끝에, '사람들이 공감하는 저희의 이야기이자 진심' 그 자체를 전하기로 했습니다.",
  ],
};

// ============================
// Final Message Section - Scrollytelling Slides
// ============================
export const finalMessageData = {
  slides: [
    {
      text: '그래서 저희는 무대에 오르려 합니다.',
      image: arteAudience,
      backgroundColor: 'linear-gradient(180deg, hsl(270 35% 12%) 0%, hsl(270 40% 20%) 100%)',
    },
    {
      text: '변하지 않는 열정과 진심으로,',
      image: arteStage01,
      backgroundColor: 'linear-gradient(180deg, hsl(280 70% 50%) 0%, hsl(280 60% 45%) 100%)',
    },
    {
      text: '여러분에게 아르떼의 이야기를 전하는 무대에서',
      image: arteCurtainCall,
      backgroundColor: 'linear-gradient(180deg, hsl(275 65% 55%) 0%, hsl(280 70% 45%) 100%)',
    },
    {
      text: '지금까지 쌓아온 추억부터\n앞으로 여러분과 함께 만들어 갈 이야기까지',
      image: arteFinalBow,
      backgroundColor: 'linear-gradient(180deg, hsl(270 50% 15%) 0%, hsl(280 45% 25%) 100%)',
    },
    {
      text: '찾아오는 관객들에게 감동과 여운을 주고픈\n마음을 담아 공연을 준비했습니다.',
      image: arteGroupScene,
      backgroundColor: 'linear-gradient(180deg, hsl(275 40% 20%) 0%, hsl(285 55% 35%) 100%)',
    },
    {
      text: '2026 아르떼의 무대,\n많은 기대와 사랑 부탁드립니다.',
      image: arteSceneHanbok,
      backgroundColor: 'linear-gradient(180deg, hsl(280 60% 45%) 0%, hsl(275 50% 40%) 100%)',
    },
  ] as FinalMessageSlide[],
};

// ============================
// Credits Data
// ============================
export const creditsData = {
  title: {
    first: 'DIMI',
    second: 'ARTE',
  },
  subtitle: 'ARTE History',
  copyright: '© ARTE All rights reserved.',
  cloneMessage: '아르떼 동아리 많은 지원 부탁드립니다.',
};
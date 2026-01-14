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

// ============================
// Site Metadata
// ============================
// ============================
export const siteMetadata = {
  title: 'ARTE | 아르떼 디미고 연극/뮤지컬 동아리',
  description: '아르떼의 이야기를 몰입형 전시와 함께 감상해보세요.',
  author: 'ARTE',
  themeColor: '#0a0a0a',
  url: 'https://arte-randingpage.vercel.app',
  ogImage: arteStage01,
  twitterCard: 'summary_large_image' as const,
  keywords: ['아르떼', 'ARTE', '디미고', 'dimigo','dimi', '연극', '뮤지컬', '동아리', '공연'],
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
// Text Content
// ============================

export const monologueTexts = {
  opening: [
    '살아가며 마주하는 헤아릴 수도 없이 많은 상황과 경험,',
    '그 중 기억으로 남는 특별한 순간들...',
    '저희 아르떼에게는 항상 무대가 그 중심에 있었습니다.',
  ],
  openingContinue: [
    '지금부터 시작하는 아르떼의 이야기에는 연극과 뮤지컬이 저희에게 가진 의미부터 관객 여러분과의 만남까지,',
    '무엇과도 바꿀 수 없는 소중한 순간들을 담았습니다.',
  ],
  fanStory: [
    '공연뿐만이 아니라, 아르떼의 이야기를,',
    "'아르떼' 자체를 좋아하는 사람들이 생겼습니다.",
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
      '어느새 저희는 "무대 위에서 느꼈던 모든 감정과 공연을 통해 경험한 행복을 관객과 함께 나눌 수 있다면 정말 좋겠다"고 생각하게 되었습니다.',
      '그전까지 연극은 그저 "보여주는 것"이었는데,',
      '아르떼 활동을 하며 무대가 사람을 "잇는다는 것"을 실감하게 되었어요.',
    ],
  },
  firstMiracleContinue: {
    lines: [
      '어렸을 적 연극과 뮤지컬을 보며 위로와 즐거움을 느꼈던 것처럼,',
      '아르떼의 공연 역시 누군가에게는 재미있는 이야기가,',
      '누군가에게는 위로가 된다는 점이 감사하고 기뻤습니다.',
    ],
  },
  dimension: {
    heading: '무대를 넘어 아르떼, 열정의 무대',
    lines: [
      '누군가가 저희를 공연으로 만났듯이,',
      '저희 역시 무대를 통해 많은 사람과 인연이 닿아 만날 수 있었어요.',
    ],
  },
  trafficLight: {
    heading: '「죽은 시인의 사회」 by 아르떼',
    lines: [
      '그리고 사람들과의 이야기는,',
      '새로운 영감으로 저희에게 다가와 다시 무대가 되었습니다.',
    ],
  },
  mashup: {
    heading: '정기공연 앙상블 - 아르떼 ARTE',
    lines: [
      '동아리에서 새로운 이야기로, 함께하는 유대로,',
      '다시 무대로 이어지며 점차 저희의, "아르떼"의 세계를 넓혀갔습니다.',
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
    overlayText: "온전히 저희만의 것이 아닌, 모두의 노력이 맺은 결실이기에",
    subText: '더 소중하게 느껴졌습니다.',
  },
  festival: {
    src: arteStage01,
    alt: '공연',
    overlayText: '그렇게 더 많은 사람들에게 무대를 보여줄 수 있도록 열심히 달렸습니다.',
    subText: '뒤를 돌아보니, 공연을 본 수많은 사람들의 미소를 볼 수 있었어요.',
  },
  rewindMin: {
    src: arteTheaterSeats,
    alt: '공연장',
  },
};

export const horizontalGalleryData = {
  first: {
    description: '연극을 하는 것은, 저희에게는 눈을 뜨고 숨을 쉬는 것처럼 너무나 당연한 것이었습니다. 아주 어렸을 때부터 연극과 뮤지컬을 보고 들으며, 대사와 함께 캐릭터에 담긴 감정들을 느끼고 표현하는 과정이 정말 즐거웠어요.',
    linkText: '공연 영상 보기',
    title: '「죽은 시인의 사회」 정기공연 by 아르떼 ARTE',
  },
};

export const tripleImageData = {
  anotherWorld: {
    topText: '저희와 부원들의 연기뿐만 아니라 무대와 조화를 이루는 연출,',
    title: '앙상블',
  },
  showdown: {
    topText: '여러 스태프분들의 노력까지...',
    title: '정기공연',
  },
  lockdown: {
    topText: '아르떼와 함께 쌓아간 무대에는, 혼자서는 상상조차 못했던 많은 것들이 담겨 있었어요.',
    title: '전통극',
  },
};

export const fanStorySectionData = {
  topText: '저희를 찾아오고 기다리는 관객이 있다는 것은 굉장히 특별한 감정으로 다가왔어요.',
};

export const streamingSectionData = {
  text: "시작은 '연기하는 동아리'였지만 관객들과 소통하는 배우로서의 모습 역시 저희의 정체성이자 또 다른 즐거움이 되었습니다.",
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

export const finalMessageData = {
  backgroundImage: arteAudience,
  lines: [
    '그래서 저희는 무대에 오르려 합니다.',
    '변하지 않는 열정과 진심으로,',
    '여러분에게 아르떼의 이야기를 전하는 무대에서',
    '지금까지 쌓아온 추억부터 앞으로 여러분과 함께 만들어 갈 이야기까지',
    '찾아오는 관객들에게 감동과 여운을 주고픈 마음을 담아 공연을 준비했습니다.',
    '2026 아르떼의 무대, 많은 기대와 사랑 부탁드립니다.',
  ],
};

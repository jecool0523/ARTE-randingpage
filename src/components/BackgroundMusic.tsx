import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface BackgroundMusicProps {
  src?: string;
}

export const BackgroundMusic = ({ 
  src = 'https://static-assets.everpurple.kr/history/ine_history_bgm.mp3'
}: BackgroundMusicProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [volume, setVolume] = useState(0.3);
  const [isHovered, setIsHovered] = useState(false);

  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
      setShowPrompt(false);
    }
  }, [isPlaying]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
    }
  }, []);

  // Auto-hide prompt after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" />
      
      {/* Music control button */}
      <motion.div
        className="fixed bottom-4 right-4 z-50 flex items-center gap-3 md:bottom-8 md:right-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Volume slider - shows on hover */}
        <AnimatePresence>
          {isHovered && isPlaying && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="hidden items-center gap-2 overflow-hidden rounded-full bg-card/80 px-3 py-2 backdrop-blur-md md:flex"
            >
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="h-1 w-20 cursor-pointer appearance-none rounded-full bg-muted accent-primary"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Play/Pause button */}
        <motion.button
          onClick={togglePlay}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-card/80 backdrop-blur-md transition-all hover:bg-card md:h-14 md:w-14"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? (
            <Volume2 className="h-5 w-5 text-foreground md:h-6 md:w-6" />
          ) : (
            <VolumeX className="h-5 w-5 text-muted-foreground md:h-6 md:w-6" />
          )}
          
          {/* Playing indicator */}
          {isPlaying && (
            <motion.div
              className="absolute -inset-1 rounded-full border border-primary/30"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.button>
      </motion.div>

      {/* Initial prompt */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="fixed bottom-20 right-4 z-50 md:bottom-24 md:right-8"
          >
            <motion.button
              onClick={togglePlay}
              className="flex items-center gap-2 rounded-full bg-card/90 px-4 py-2 backdrop-blur-md transition-all hover:bg-card md:px-6 md:py-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Music className="h-4 w-4 text-primary md:h-5 md:w-5" />
              <span className="font-body text-xs text-foreground md:text-sm">
                배경음악 재생하기
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
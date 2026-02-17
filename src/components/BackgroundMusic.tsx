import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Music, Mic2 } from 'lucide-react';

export const BackgroundMusic = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const [volume, setVolume] = useState(0.3);
  const [isHovered, setIsHovered] = useState(false);
  const [isVocal, setIsVocal] = useState(false);

  // Audio sources
  const mrSource = '/S_of_L_mr.mp3';
  const vocalSource = '/S_of_L.mp3';

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

  const toggleTrack = useCallback(() => {
    setIsVocal((prev) => !prev);
    // When track changes, we want to maintain play state but it will likely restart unless we sync time. 
    // For simplicity and to avoid issues with different partial lengths, restarting or just switching source is fine.
    // However, switching source while playing requires calling play() again after source change if it was playing.
    if (audioRef.current) {
      const wasPlaying = !audioRef.current.paused;
      const currentTime = audioRef.current.currentTime;

      // We need to wait for source to update. effectively done by render, 
      // but we can manually manage the play state in a useEffect dependent on source/isVocal if needed.
      // A simple way is to let the effect handle the source change.
    }
  }, []);

  // Update audio source when isVocal changes
  useEffect(() => {
    if (audioRef.current) {
      const wasPlaying = isPlaying;
      const currentTime = audioRef.current.currentTime;

      audioRef.current.src = isVocal ? vocalSource : mrSource;
      audioRef.current.currentTime = currentTime; // Try to keep sync

      if (wasPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [isVocal]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = true;
    }
  }, []);

  // Auto-hide prompt after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPrompt(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <audio ref={audioRef} preload="auto" />

      {/* Music control button */}
      <motion.div
        className="fixed bottom-4 right-4 z-50 flex items-center gap-3 md:bottom-8 md:right-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Controls Panel - Volume & Track Toggle */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, width: 0, padding: 0 }}
              animate={{ opacity: 1, width: 'auto', padding: '0.5rem 0.75rem' }}
              exit={{ opacity: 0, width: 0, padding: 0 }}
              className="hidden items-center gap-4 overflow-hidden rounded-full bg-black/40 px-3 py-2 backdrop-blur-md md:flex border border-white/10"
            >
              {/* Volume Slider */}
              <div className="flex items-center gap-2">
                <Volume2 className="h-3 w-3 text-white/70" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="h-1 w-16 cursor-pointer appearance-none rounded-full bg-white/20 accent-primary"
                />
              </div>

              <div className="h-3 w-[1px] bg-white/20" />

              {/* MR/Vocal Toggle */}
              <button
                onClick={toggleTrack}
                className="flex items-center gap-1.5 text-xs text-white/90 hover:text-white transition-colors min-w-[60px]"
              >
                {isVocal ? (
                  <>
                    <Mic2 className="h-3 w-3 text-primary" />
                    <span>VOCAL</span>
                  </>
                ) : (
                  <>
                    <Music className="h-3 w-3 text-primary" />
                    <span>MR</span>
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Play/Pause button */}
        <motion.button
          onClick={togglePlay}
          className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-black/40 border border-white/10 backdrop-blur-md transition-all hover:bg-black/60 md:h-14 md:w-14"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? (
            <Volume2 className="h-5 w-5 text-white md:h-6 md:w-6" />
          ) : (
            <VolumeX className="h-5 w-5 text-white/50 md:h-6 md:w-6" />
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
              className="flex items-center gap-2 rounded-full bg-black/60 border border-primary/20 px-4 py-2 backdrop-blur-md transition-all hover:bg-black/80 md:px-6 md:py-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Music className="h-4 w-4 text-primary md:h-5 md:w-5" />
              <span className="font-body text-xs text-white md:text-sm">
                Play Seasons of Love
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
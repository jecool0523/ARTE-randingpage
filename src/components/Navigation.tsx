import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronUp } from 'lucide-react';
import { navigationChapters, navigationLabels, NavigationChapter } from '@/data/siteData';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Show back to top button after scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const scrollToSection = useCallback((offset: number) => {
    const target = document.documentElement.scrollHeight * offset;
    window.scrollTo({ top: target, behavior: 'smooth' });
    setIsOpen(false);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
  }, []);

  return (
    <>
      {/* Navigation toggle */}
      <motion.button
        className="fixed left-4 top-4 z-50 flex h-10 w-10 touch-manipulation items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-sm transition-all active:scale-95 hover:bg-black/60 md:left-8 md:top-8 md:h-11 md:w-11"
        onClick={() => setIsOpen(!isOpen)}
        onTouchStart={handleTouchStart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        aria-label={isOpen ? '메뉴 닫기' : '메뉴 열기'}
        aria-expanded={isOpen}
      >
        {isOpen ? (
          <X className="h-4 w-4 text-white/90" />
        ) : (
          <Menu className="h-4 w-4 text-white/90" />
        )}
      </motion.button>

      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            className="fixed bottom-4 left-4 z-50 flex h-10 w-10 touch-manipulation items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-sm transition-all active:scale-95 hover:bg-black/60 md:bottom-8 md:left-8 md:h-11 md:w-11"
            onClick={scrollToTop}
            onTouchStart={handleTouchStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            aria-label={navigationLabels.backToTop}
          >
            <ChevronUp className="h-4 w-4 text-white/90" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chapter menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              onTouchEnd={() => setIsOpen(false)}
            />

            {/* Menu panel */}
            <motion.nav
              className="fixed left-0 top-0 z-40 flex h-full w-64 touch-pan-y flex-col border-r border-white/5 bg-gradient-to-b from-[hsl(270,30%,8%)] via-[hsl(270,25%,6%)] to-black p-6 pt-20 md:w-72 md:p-10 md:pt-24"
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onTouchStart={handleTouchStart}
              role="navigation"
              aria-label="챕터 네비게이션"
            >
              <h2 className="mb-8 font-display text-xs font-light uppercase tracking-[0.3em] text-white/40 md:mb-10 md:text-sm">
                {navigationLabels.menuTitle}
              </h2>
              <ul className="space-y-1 md:space-y-2">
                {navigationChapters.map((chapter: NavigationChapter, index: number) => (
                  <motion.li
                    key={chapter.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <button
                      onClick={() => scrollToSection(chapter.offset)}
                      onTouchEnd={(e) => {
                        e.preventDefault();
                        scrollToSection(chapter.offset);
                      }}
                      className="group flex min-h-[44px] w-full touch-manipulation items-center gap-4 py-2 font-body text-sm font-light tracking-wide text-white/70 transition-all duration-300 active:text-white hover:text-white md:text-base"
                    >
                      <span className="inline-block h-px w-4 bg-white/20 transition-all duration-300 group-hover:w-8 group-hover:bg-white/60 group-active:w-8 group-active:bg-white/60 md:w-5 md:group-hover:w-10" />
                      {chapter.title}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

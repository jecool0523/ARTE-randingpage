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
        className="fixed left-4 top-4 z-50 flex h-12 w-12 touch-manipulation items-center justify-center rounded-full bg-card/80 backdrop-blur-md transition-all active:scale-95 hover:bg-card md:left-8 md:top-8"
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
          <X className="h-5 w-5 text-foreground" />
        ) : (
          <Menu className="h-5 w-5 text-foreground" />
        )}
      </motion.button>

      {/* Back to top button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            className="fixed bottom-4 left-4 z-50 flex h-12 w-12 touch-manipulation items-center justify-center rounded-full bg-card/80 backdrop-blur-md transition-all active:scale-95 hover:bg-card md:bottom-8 md:left-8"
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
            <ChevronUp className="h-5 w-5 text-foreground" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chapter menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              onTouchEnd={() => setIsOpen(false)}
            />

            {/* Menu panel */}
            <motion.nav
              className="fixed left-0 top-0 z-40 flex h-full w-72 touch-pan-y flex-col bg-card/95 p-6 pt-20 backdrop-blur-md md:w-80 md:p-12 md:pt-24"
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              onTouchStart={handleTouchStart}
              role="navigation"
              aria-label="챕터 네비게이션"
            >
              <h2 className="mb-6 font-display text-lg text-primary md:mb-8 md:text-xl">
                {navigationLabels.menuTitle}
              </h2>
              <ul className="space-y-2 md:space-y-4">
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
                      className="group flex min-h-[44px] w-full touch-manipulation items-center gap-3 py-2 font-body text-base text-foreground transition-colors active:text-primary hover:text-primary md:text-lg"
                    >
                      <span className="inline-block h-px w-6 bg-muted-foreground transition-all group-hover:w-10 group-hover:bg-primary group-active:w-10 group-active:bg-primary md:w-8 md:group-hover:w-12" />
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

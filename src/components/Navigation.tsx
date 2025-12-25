import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronUp } from 'lucide-react';

interface Chapter {
  id: string;
  title: string;
  offset: number;
}

const chapters: Chapter[] = [
  { id: 'landing', title: '시작', offset: 0 },
  { id: 'story', title: '이야기', offset: 0.1 },
  { id: 'gallery', title: '갤러리', offset: 0.25 },
  { id: 'journey', title: '여정', offset: 0.5 },
  { id: 'festival', title: '축제', offset: 0.75 },
  { id: 'credits', title: '마무리', offset: 0.95 },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = useCallback((offset: number) => {
    const target = document.documentElement.scrollHeight * offset;
    window.scrollTo({ top: target, behavior: 'smooth' });
    setIsOpen(false);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* Navigation toggle */}
      <motion.button
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 backdrop-blur-md transition-all hover:bg-card md:left-8 md:top-8 md:h-12 md:w-12"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {isOpen ? (
          <X className="h-4 w-4 text-foreground md:h-5 md:w-5" />
        ) : (
          <Menu className="h-4 w-4 text-foreground md:h-5 md:w-5" />
        )}
      </motion.button>

      {/* Back to top button */}
      <motion.button
        className="fixed bottom-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-card/80 backdrop-blur-md transition-all hover:bg-card md:bottom-8 md:left-8 md:h-12 md:w-12"
        onClick={scrollToTop}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <ChevronUp className="h-4 w-4 text-foreground md:h-5 md:w-5" />
      </motion.button>

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
            />

            {/* Menu panel */}
            <motion.nav
              className="fixed left-0 top-0 z-40 flex h-full w-64 flex-col bg-card/95 p-8 pt-20 backdrop-blur-md md:w-80 md:p-12 md:pt-24"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <h2 className="mb-6 font-display text-lg text-primary md:mb-8 md:text-xl">
                Chapters
              </h2>
              <ul className="space-y-3 md:space-y-4">
                {chapters.map((chapter, index) => (
                  <motion.li
                    key={chapter.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <button
                      onClick={() => scrollToSection(chapter.offset)}
                      className="group flex items-center gap-3 font-body text-base text-foreground transition-colors hover:text-primary md:text-lg"
                    >
                      <span className="inline-block h-px w-4 bg-muted-foreground transition-all group-hover:w-8 group-hover:bg-primary md:w-6 md:group-hover:w-12" />
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
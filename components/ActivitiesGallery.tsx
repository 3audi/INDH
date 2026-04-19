import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useContent } from './ContentContext';

export const ActivitiesGallery: React.FC = () => {
  const { t, dir } = useLanguage();
  const { galleryItems } = useContent(); // Read from Content Context
  const scrollRef = useRef<HTMLDivElement>(null);
  const targetScroll = useRef(0);
  const isScrolling = useRef(false);
  const animationFrameId = useRef<number>(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const smoothScrollLoop = () => {
      if (!el) return;

      const current = el.scrollLeft;
      const target = targetScroll.current;
      const diff = target - current;

      if (Math.abs(diff) < 0.5) {
        isScrolling.current = false;
        return;
      }

      const ease = 0.08;

      el.scrollLeft = current + diff * ease;

      animationFrameId.current = requestAnimationFrame(smoothScrollLoop);
    };

    const startSmoothScroll = () => {
      if (!isScrolling.current) {
        isScrolling.current = true;
        animationFrameId.current = requestAnimationFrame(smoothScrollLoop);
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();

        if (!isScrolling.current) {
          targetScroll.current = el.scrollLeft;
        }

        const speed = 2.5;

        targetScroll.current -= e.deltaY * speed;

        const current = el.scrollLeft;
        const maxLead = 400;

        if (targetScroll.current < current - maxLead) targetScroll.current = current - maxLead;
        if (targetScroll.current > current + maxLead) targetScroll.current = current + maxLead;

        startSmoothScroll();
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      el.removeEventListener('wheel', onWheel);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = window.innerWidth < 768 ? window.innerWidth : 600;

      if (direction === 'left') {
        targetScroll.current = current.scrollLeft - scrollAmount;
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        targetScroll.current = current.scrollLeft + scrollAmount;
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative w-full h-[600px] bg-white dark:bg-m-green border-t border-black/5 dark:border-white/5 overflow-hidden group transition-colors duration-500" dir={dir}>

      {/* Navigation Buttons */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:px-8 z-50 pointer-events-none">

        {/* Right Button (Visually on Right) */}
        <button
          onClick={() => scroll(dir === 'rtl' ? 'left' : 'right')}
          className="pointer-events-auto w-14 h-14 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-md border border-black/5 dark:border-white/10 flex items-center justify-center text-void dark:text-white hover:bg-m-green hover:border-m-green hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 shadow-lg"
          aria-label="Next"
        >
          {dir === 'rtl' ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
        </button>

        {/* Left Button (Visually on Left) */}
        <button
          onClick={() => scroll(dir === 'rtl' ? 'right' : 'left')}
          className="pointer-events-auto w-14 h-14 rounded-full bg-white/30 dark:bg-black/30 backdrop-blur-md border border-black/5 dark:border-white/10 flex items-center justify-center text-void dark:text-white hover:bg-m-green hover:border-m-green hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 shadow-lg"
          aria-label="Previous"
        >
          {dir === 'rtl' ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex h-full w-full overflow-x-auto scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {galleryItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative flex-shrink-0 w-full md:w-[600px] h-full p-6"
          >
            <div className="relative w-full h-full group/card overflow-hidden rounded-[2.5rem] shadow-2xl bg-white dark:bg-void">
              <img
                src={item.src}
                alt={t(item.titleKey)}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
              />

              {/* Gradient for text visibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 z-20" />

              {/* Video play icon overlay */}
              {item.videoUrl && (
                <div className="absolute inset-0 z-25 flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg group-hover/card:bg-m-red/80 group-hover/card:scale-110 transition-all duration-300">
                    <Play size={28} className="text-white fill-white ml-0.5" />
                  </div>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 z-30 flex flex-col items-start justify-end h-full">
                <div className="transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-m-green mb-4 shadow-lg">
                    {t(item.categoryLabelKey)}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-3 leading-tight drop-shadow-lg">
                    {t(item.titleKey)}
                  </h3>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, Search, X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { AmbientBackground } from './ui/AmbientBackground';
import { PageHero } from './ui/PageHero';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useLanguage } from './LanguageContext';
import { useContent } from './ContentContext';
import { GalleryItem } from '../data/galleryData';

const POSTS_PER_PAGE = 30;

interface GalleryPageProps {
  onNavigate: (page: string) => void;
  onPostClick: (post: GalleryItem) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate, onPostClick }) => {
  const { t, dir, language } = useLanguage();
  const { galleryItems, siteImages } = useContent();

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page to 1 whenever the search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Filter posts based on search query (title + date + text)
  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return galleryItems;
    return galleryItems.filter((item) => {
      const title = t(item.titleKey)?.toLowerCase() ?? '';
      const date = item.date?.toLowerCase() ?? '';
      const category = t(item.categoryLabelKey)?.toLowerCase() ?? '';
      const desc = t(item.descriptionKey)?.toLowerCase() ?? '';
      const details = t(item.detailsKey)?.toLowerCase() ?? '';
      return title.includes(q) || date.includes(q) || category.includes(q) || desc.includes(q) || details.includes(q);
    });
  }, [galleryItems, searchQuery, language, t]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredItems.length / POSTS_PER_PAGE));
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Labels
  const isRtl = dir === 'rtl';
  const searchPlaceholder = isRtl
    ? 'البحث في النشاطات...'
    : language === 'fr'
      ? 'Rechercher des activités...'
      : 'Search activities...';
  const noResults = isRtl
    ? 'لا توجد نتائج مطابقة'
    : language === 'fr'
      ? 'Aucun résultat trouvé'
      : 'No results found';
  const pageLabel = isRtl ? 'صفحة' : language === 'fr' ? 'Page' : 'Page';
  const ofLabel = isRtl ? 'من' : language === 'fr' ? 'sur' : 'of';
  const prevLabel = isRtl ? 'السابق' : language === 'fr' ? 'Précédent' : 'Previous';
  const nextLabel = isRtl ? 'التالي' : language === 'fr' ? 'Suivant' : 'Next';
  const resultsLabel = isRtl
    ? `${filteredItems.length} نتيجة`
    : language === 'fr'
      ? `${filteredItems.length} résultat(s)`
      : `${filteredItems.length} result(s)`;

  return (
    <div
      className="min-h-screen w-full bg-cream dark:bg-void text-void dark:text-white font-sans selection:bg-m-red selection:text-white overflow-x-hidden transition-colors duration-500"
      dir={dir}
    >
      <AmbientBackground opacity={0.3} />
      <Navbar onNavigate={onNavigate} />

      <PageHero
        badge={t('nav.gallery')}
        title={t('gallery.title')}
        description={t('gallery.desc')}
        bgImage={siteImages.gallery_hero}
      />

      {/* Gallery Grid Section */}
      <section className="relative w-full py-16 bg-cream dark:bg-void transition-colors duration-500">
        <div className="max-w-[82%] 2xl:max-w-[1280px] mx-auto relative z-10">

          {/* ── Search Bar ── */}
          <div className="mb-10">
            <div className="relative max-w-xl mx-auto">
              <Search
                size={18}
                className={`absolute top-1/2 -translate-y-1/2 text-void/40 dark:text-white/40 pointer-events-none ${isRtl ? 'right-4' : 'left-4'
                  }`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                className={`w-full bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-3.5 text-sm text-void dark:text-white placeholder:text-void/40 dark:placeholder:text-white/40 focus:outline-none focus:border-m-green dark:focus:border-m-green transition-colors shadow-sm ${isRtl ? 'pr-11 pl-10' : 'pl-11 pr-10'
                  }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute top-1/2 -translate-y-1/2 p-1 rounded-full text-void/40 dark:text-white/40 hover:text-m-red transition-colors ${isRtl ? 'left-3' : 'right-3'
                    }`}
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Results count */}
            {searchQuery && (
              <p className="text-center text-xs text-void/50 dark:text-white/40 mt-3">
                {resultsLabel}
              </p>
            )}
          </div>

          {/* ── Post Cards Grid ── */}
          {paginatedItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-void/50 dark:text-white/40 gap-4">
              <Search size={40} className="opacity-30" />
              <p className="text-lg font-medium">{noResults}</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {paginatedItems.map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="group bg-white dark:bg-[#00241B] border border-black/5 dark:border-white/5 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-m-green/30 dark:hover:border-white/20 transition-all duration-500 cursor-pointer flex flex-col h-full"
                    onClick={() => onPostClick(item)}
                  >
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={item.src}
                        alt={t(item.titleKey)}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                      {/* Video play icon overlay */}
                      {item.videoUrl && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-lg group-hover:bg-m-red/80 group-hover:scale-110 transition-all duration-300">
                            <Play size={24} className="text-white fill-white ml-0.5" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-void dark:text-white mb-3 leading-snug group-hover:text-m-red transition-colors">
                          {t(item.titleKey)}
                        </h3>
                      </div>
                      <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-void/40 dark:text-white/40 text-xs">
                          <Calendar size={14} />
                          <span>{item.date}</span>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-void/60 dark:text-white/60 group-hover:bg-m-red group-hover:text-white transition-all">
                          {isRtl ? (
                            <ArrowRight size={14} className="rotate-180" />
                          ) : (
                            <ArrowRight size={14} />
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-14 flex-wrap">
              {/* Previous */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 text-void dark:text-white text-sm font-semibold hover:border-m-green hover:text-m-green transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {isRtl ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                {prevLabel}
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (p) =>
                      p === 1 ||
                      p === totalPages ||
                      Math.abs(p - currentPage) <= 1
                  )
                  .reduce<(number | '...')[]>((acc, p, idx, arr) => {
                    if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) {
                      acc.push('...');
                    }
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, idx) =>
                    p === '...' ? (
                      <span
                        key={`ellipsis-${idx}`}
                        className="w-9 h-9 flex items-center justify-center text-void/40 dark:text-white/40 text-sm"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => goToPage(p as number)}
                        className={`w-9 h-9 rounded-full text-sm font-bold transition-all ${currentPage === p
                          ? 'bg-m-red text-white shadow-lg shadow-m-red/30'
                          : 'bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 text-void dark:text-white hover:border-m-green hover:text-m-green'
                          }`}
                      >
                        {p}
                      </button>
                    )
                  )}
              </div>

              {/* Next */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 text-void dark:text-white text-sm font-semibold hover:border-m-green hover:text-m-green transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {nextLabel}
                {isRtl ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
              </button>
            </div>
          )}

          {/* Page indicator */}
          {totalPages > 1 && (
            <p className="text-center text-xs text-void/40 dark:text-white/40 mt-4">
              {pageLabel} {currentPage} {ofLabel} {totalPages}
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

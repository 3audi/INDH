import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, X, ZoomIn, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { AmbientBackground } from './ui/AmbientBackground';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useLanguage } from './LanguageContext';
import { useContent } from './ContentContext';
import { GalleryItem } from '../data/galleryData';

interface GalleryPostPageProps {
   post: GalleryItem;
   onNavigate: (page: string) => void;
   onBack: () => void;
   onPostClick: (post: GalleryItem) => void;
}

// ── Video URL helpers ──
const getEmbedUrl = (url: string): string | null => {
   if (!url) return null;
   // YouTube
   const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
   if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0&rel=0`;
   // Google Drive
   const driveMatch = url.match(/drive\.google\.com\/file\/d\/([\w-]+)/);
   if (driveMatch) return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
   // Facebook
   if (url.includes('facebook.com')) {
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0&width=560`;
   }
   return null;
};

const isDirectVideo = (url: string): boolean => {
   if (!url) return false;
   return /\.(mp4|mov|webm)(\?|$)/i.test(url);
};

export const GalleryPostPage: React.FC<GalleryPostPageProps> = ({ post, onNavigate, onBack, onPostClick }) => {
   const { t, dir } = useLanguage();
   const { galleryItems } = useContent();

   // Lightbox state
   const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

   // Build the images array for the lightbox (hero + content images)
   const allImages: string[] = [
      post.src,
      ...(post.contentImages ?? []),
   ];

   const openLightbox = (index: number) => setLightboxIndex(index);
   const closeLightbox = () => setLightboxIndex(null);

   const goPrev = useCallback(() => {
      setLightboxIndex(i => (i !== null ? (i - 1 + allImages.length) % allImages.length : null));
   }, [allImages.length]);

   const goNext = useCallback(() => {
      setLightboxIndex(i => (i !== null ? (i + 1) % allImages.length : null));
   }, [allImages.length]);

   // Keyboard navigation
   useEffect(() => {
      if (lightboxIndex === null) return;
      const handle = (e: KeyboardEvent) => {
         if (e.key === 'Escape') closeLightbox();
         if (e.key === 'ArrowLeft') goPrev();
         if (e.key === 'ArrowRight') goNext();
      };
      window.addEventListener('keydown', handle);
      return () => window.removeEventListener('keydown', handle);
   }, [lightboxIndex, goPrev, goNext]);

   // Prevent body scroll when lightbox is open
   useEffect(() => {
      document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
      return () => { document.body.style.overflow = ''; };
   }, [lightboxIndex]);

   useEffect(() => {
      window.scrollTo(0, 0);
   }, [post]);

   // Logic to find related posts from dynamic data
   let relatedPosts = galleryItems
      .filter(item => item.id !== post.id && item.category === post.category)
      .slice(0, 3);

   if (relatedPosts.length < 3) {
      const others = galleryItems
         .filter(item => item.id !== post.id && item.category !== post.category)
         .slice(0, 3 - relatedPosts.length);
      relatedPosts = [...relatedPosts, ...others];
   }

   return (
      <div className="min-h-screen w-full bg-cream dark:bg-void text-void dark:text-white font-sans selection:bg-m-red selection:text-white overflow-x-hidden transition-colors duration-500" dir={dir}>
         <AmbientBackground opacity={0.3} />
         <Navbar onNavigate={onNavigate} />

         {/* ───── LIGHTBOX ───── */}
         <AnimatePresence>
            {lightboxIndex !== null && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="fixed inset-0 z-[999] flex items-center justify-center bg-black/95 backdrop-blur-md"
                  onClick={closeLightbox}
               >
                  {/* Close button */}
                  <button
                     onClick={closeLightbox}
                     className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-m-red text-white transition-all border border-white/10"
                  >
                     <X size={20} />
                  </button>

                  {/* Counter */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white text-sm font-bold border border-white/10">
                     {lightboxIndex + 1} / {allImages.length}
                  </div>

                  {/* Prev button */}
                  <button
                     onClick={e => { e.stopPropagation(); goPrev(); }}
                     className="absolute left-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-m-red text-white transition-all border border-white/10 backdrop-blur-md"
                  >
                     <ChevronLeft size={24} />
                  </button>

                  {/* Image */}
                  <motion.img
                     key={lightboxIndex}
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.95 }}
                     transition={{ duration: 0.2 }}
                     src={allImages[lightboxIndex]}
                     alt={`${t(post.titleKey)} - ${lightboxIndex + 1}`}
                     className="max-h-[90vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl select-none"
                     onClick={e => e.stopPropagation()}
                  />

                  {/* Next button */}
                  <button
                     onClick={e => { e.stopPropagation(); goNext(); }}
                     className="absolute right-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-m-red text-white transition-all border border-white/10 backdrop-blur-md"
                  >
                     <ChevronRight size={24} />
                  </button>

                  {/* Thumbnail strip */}
                  {allImages.length > 1 && (
                     <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 max-w-[90vw] overflow-x-auto">
                        {allImages.map((img, i) => (
                           <button
                              key={i}
                              onClick={e => { e.stopPropagation(); setLightboxIndex(i); }}
                              className={`w-14 h-10 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${i === lightboxIndex ? 'border-m-red scale-110' : 'border-white/20 opacity-60 hover:opacity-100'}`}
                           >
                              <img src={img} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                           </button>
                        ))}
                     </div>
                  )}
               </motion.div>
            )}
         </AnimatePresence>

         {/* Hero Image */}
         <div className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
               <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 10, ease: "easeOut" }}
                  src={post.src}
                  alt={t(post.titleKey)}
                  className="w-full h-full object-cover cursor-zoom-in"
                  onClick={() => openLightbox(0)}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-cream via-cream/40 to-black/30 dark:from-void dark:via-void/40 dark:to-black/50" />
            </div>

            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
               >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md mb-6">
                     <span className="w-1.5 h-1.5 rounded-full bg-m-red animate-pulse"></span>
                     <span className="text-xs font-bold text-white uppercase tracking-widest">{t(post.categoryLabelKey)}</span>
                  </div>

                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-void dark:text-white mb-6 tracking-tighter drop-shadow-2xl font-cairo leading-tight">
                     {t(post.titleKey)}
                  </h1>

                  <div className="flex flex-wrap items-center justify-center gap-6 text-white/90 text-sm md:text-base font-medium">
                     <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full">
                        <Calendar size={16} className="text-m-green" />
                        {post.date}
                     </div>
                  </div>
               </motion.div>
            </div>
         </div>

         {/* Content Section */}
         <section className="relative max-w-7xl mx-auto px-6 md:px-12 py-12 z-20">
            <div className="bg-white dark:bg-[#00241B] rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-black/5 dark:border-white/5">
               <div className="flex flex-col gap-12">

                  {/* Text Section */}
                  <div dir={dir} className={`space-y-6 leading-[2.2] text-xl md:text-2xl font-light font-cairo whitespace-pre-wrap max-w-4xl mx-auto ${dir === 'rtl' ? 'text-right' : 'text-left'} text-void/85 dark:text-white/85`}>
                     {t(post.detailsKey).split('\n').map((paragraph, index) => {
                        let text = paragraph;
                        if (index === 0 && text.trim().startsWith('#')) {
                           text = text.replace(/#/g, '').replace(/_/g, ' ').replace(/([a-z])([A-ZÀ-Ö])/g, '$1 $2').replace(/([A-ZÀ-Ö])([A-ZÀ-Ö][a-z])/g, '$1 $2').replace(/\s+/g, ' ').trim();
                        }
                        return text.trim() ? (
                           <p key={index} className={index === 0 ? "font-bold text-3xl md:text-4xl text-m-red mb-8" : ""}>
                              {text}
                           </p>
                        ) : <br key={index} />;
                     })}
                  </div>

                  {/* Video Player (if post has a video) */}
                  {post.videoUrl && (
                     <div className="w-full max-w-4xl mx-auto">
                        {isDirectVideo(post.videoUrl) ? (
                           <video
                              src={post.videoUrl}
                              controls
                              preload="metadata"
                              poster={post.src}
                              className="w-full rounded-2xl shadow-lg border border-black/5 dark:border-white/10 aspect-video bg-black"
                           />
                        ) : getEmbedUrl(post.videoUrl) ? (
                           <iframe
                              src={getEmbedUrl(post.videoUrl)!}
                              title={t(post.titleKey)}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="w-full rounded-2xl shadow-lg border border-black/5 dark:border-white/10 aspect-video bg-black"
                           />
                        ) : (
                           <a href={post.videoUrl} target="_blank" rel="noopener noreferrer" className="block">
                              <div className="relative rounded-2xl overflow-hidden aspect-video">
                                 <img src={post.src} alt={t(post.titleKey)} className="w-full h-full object-cover" />
                                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <div className="w-20 h-20 rounded-full bg-m-red/90 flex items-center justify-center shadow-2xl">
                                       <Play size={36} className="text-white fill-white ml-1" />
                                    </div>
                                 </div>
                              </div>
                           </a>
                        )}
                     </div>
                  )}

                  {/* Photos Grid */}
                  <div className="w-full">
                     {post.contentImages && post.contentImages.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                           {post.contentImages.map((img, index) => (
                              <motion.div
                                 key={index}
                                 initial={{ opacity: 0, y: 20 }}
                                 whileInView={{ opacity: 1, y: 0 }}
                                 transition={{ delay: index * 0.1 }}
                                 className="rounded-3xl overflow-hidden shadow-lg border border-black/5 dark:border-white/5 aspect-[4/3] group relative cursor-zoom-in"
                                 onClick={() => openLightbox(index + 1) /* +1 because index 0 is the hero */}
                              >
                                 <img
                                    src={img}
                                    alt={`${t(post.titleKey)} - ${index + 1}`}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                 />
                                 {/* Hover overlay with zoom icon */}
                                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                    <ZoomIn size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                                 </div>
                              </motion.div>
                           ))}
                        </div>
                     ) : (
                        <div
                           className="rounded-3xl overflow-hidden shadow-lg border border-black/5 dark:border-white/5 aspect-video w-full max-w-4xl mx-auto group relative cursor-zoom-in"
                           onClick={() => openLightbox(0)}
                        >
                           <img src={post.src} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                              <ZoomIn size={32} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                           </div>
                        </div>
                     )}
                  </div>

               </div>
            </div>
         </section>

         {/* Recommendations Section */}
         <section className="relative w-full py-16 px-6 md:px-12 bg-white/50 dark:bg-[#00150F] border-t border-black/5 dark:border-white/5 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
               <h3 className="text-2xl font-bold text-void dark:text-white mb-10 flex items-center gap-3">
                  <span className="w-1 h-8 bg-m-red rounded-full"></span>
                  {t('gallery.related')}
               </h3>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedPosts.map((item) => (
                     <motion.div
                        key={item.id}
                        whileHover={{ y: -10 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="group bg-white dark:bg-[#002E24] border border-black/5 dark:border-white/5 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-m-green/30 dark:hover:border-white/20 transition-all cursor-pointer flex flex-col h-full"
                        onClick={() => onPostClick(item)}
                     >
                        <div className="relative aspect-video overflow-hidden">
                           <img
                              src={item.src}
                              alt={t(item.titleKey)}
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                           />
                           <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                           <div className={`absolute top-4 ${dir === 'rtl' ? 'right-4' : 'left-4'} bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold border border-white/10`}>
                              {t(item.categoryLabelKey)}
                           </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col justify-between">
                           <div>
                              <h3 className="text-xl font-bold text-void dark:text-white mb-3 leading-snug group-hover:text-m-red transition-colors line-clamp-2">
                                 {t(item.titleKey)}
                              </h3>
                           </div>

                           <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                              <div className="flex items-center gap-2 text-void/40 dark:text-white/40 text-xs">
                                 <Calendar size={14} />
                                 <span>{item.date}</span>
                              </div>
                              <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-void/60 dark:text-white/60 group-hover:bg-m-red group-hover:text-white transition-all">
                                 {dir === 'rtl' ? <ArrowRight size={14} className="rotate-180" /> : <ArrowRight size={14} />}
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         <Footer />
      </div>
   );
};
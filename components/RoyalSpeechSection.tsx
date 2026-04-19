import React from 'react';
import { Quote } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useContent } from './ContentContext';

interface RoyalSpeechSectionProps {
   onReadMore?: () => void;
}

export const RoyalSpeechSection: React.FC<RoyalSpeechSectionProps> = ({ onReadMore }) => {
   const { t } = useLanguage();
   const { siteImages } = useContent();

   return (
      <section className="relative w-full py-24 px-6 md:px-12 bg-cream dark:bg-void z-20 overflow-hidden transition-colors duration-500">
         {/* Background Decor */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-m-green/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-m-red/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center relative z-10">

            {/* Right Column (RTL: First Child) - Image */}
            <div className="relative group perspective-1000">
               {/* Decorative frame elements */}
               <div className="absolute -inset-4 border border-m-red/20 rounded-[2rem] translate-x-4 translate-y-4 z-0 transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
               <div className="absolute -inset-4 border border-m-green/20 rounded-[2rem] -translate-x-4 -translate-y-4 z-0 transition-transform group-hover:-translate-x-2 group-hover:-translate-y-2" />

               <div className="relative rounded-[1.5rem] overflow-hidden shadow-2xl shadow-black/50 aspect-[3/4] md:aspect-[4/5] bg-neutral-900 border border-white/10">
                  <img
                     src={siteImages.royal_portrait}
                     alt="King Mohammed VI"
                     className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-1000 ease-in-out"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                     <h3 className="font-bold text-xl md:text-2xl tracking-wide text-white mb-2 font-serif">{t('king.name')}</h3>
                     <div className="flex items-center justify-center gap-3">
                        <div className="h-[1px] w-8 bg-m-green" />
                        <p className="text-m-green text-sm font-bold tracking-widest uppercase">{t('king.title')}</p>
                        <div className="h-[1px] w-8 bg-m-green" />
                     </div>
                  </div>
               </div>
            </div>

            {/* Left Column (RTL: Second Child) - Speech Text */}
            <div className="relative space-y-10">
               <div className="absolute -top-12 -right-12 opacity-10 text-void dark:text-white">
                  <Quote size={120} strokeWidth={1} className="rotate-180" />
               </div>

               <div>
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-void/10 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm mb-6">
                     <span className="w-1.5 h-1.5 rounded-full bg-m-red animate-pulse"></span>
                     <span className="text-xs font-bold text-void/80 dark:text-white/80 uppercase tracking-wider">{t('speech.tag')}</span>
                  </div>

                  <h2 className="text-4xl md:text-6xl font-bold leading-[1.1] text-void dark:text-white tracking-tight font-cairo">
                     {t('speech.title.prefix')} <br />
                     <span className="text-transparent bg-clip-text bg-gradient-to-l from-m-red to-void dark:to-white">{t('speech.title.suffix')}</span>
                  </h2>
               </div>

               <div className="relative">
                  <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-m-green via-m-red to-transparent opacity-50 rounded-full" />
                  <blockquote className="pr-8 text-xl md:text-2xl leading-relaxed text-void/90 dark:text-white/90 font-light text-justify font-cairo">
                     {t('speech.excerpt')}
                  </blockquote>
               </div>

               <div className="flex items-center gap-4 pt-4">
                  <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center">
                     <Quote size={20} className="text-m-red" />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-void dark:text-white font-bold text-sm">{t('speech.citation')}</span>
                     <span className="text-void/40 dark:text-white/40 text-xs font-mono mt-1">{t('speech.date')}</span>
                  </div>
               </div>

               <button
                  onClick={onReadMore}
                  className="mt-8 px-8 py-3 bg-m-red/10 border border-m-red text-m-red hover:bg-m-red hover:text-white rounded-full transition-all duration-300 font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(193,39,45,0.2)] hover:shadow-[0_0_30px_rgba(193,39,45,0.5)]"
               >
                  {t('speech.read_more')}
               </button>
            </div>

         </div>
      </section>
   );
};
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Users, Coins, BarChart3, Lightbulb, Award, HeartHandshake, ShieldCheck, Scale, RefreshCw, Landmark, Building2, Map, LayoutGrid, FileText } from 'lucide-react';
import { AmbientBackground } from './ui/AmbientBackground';
import { PageHero } from './ui/PageHero';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useLanguage } from './LanguageContext';
import { useContent } from './ContentContext';

interface HistoryPageProps {
   onNavigate: (page: string) => void;
   onSpeechClick?: (id: string) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ onNavigate, onSpeechClick }) => {
   const { t, dir } = useLanguage();
   const { siteImages, speeches } = useContent();

   const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
   };

   const ecosystemItems = [
      {
         icon: Users,
         title: t('history.eco.1.title'),
         desc: t('history.eco.1.desc'),
         color: "text-blue-500"
      },
      {
         icon: HeartHandshake,
         title: t('history.eco.2.title'),
         desc: t('history.eco.2.desc'),
         color: "text-m-red"
      },
      {
         icon: Coins,
         title: t('history.eco.3.title'),
         desc: t('history.eco.3.desc'),
         color: "text-amber-500"
      },
      {
         icon: BarChart3,
         title: t('history.eco.4.title'),
         desc: t('history.eco.4.desc'),
         color: "text-emerald-500"
      },
      {
         icon: Lightbulb,
         title: t('history.eco.5.title'),
         desc: t('history.eco.5.desc'),
         color: "text-purple-500"
      },
      {
         icon: Award,
         title: t('history.eco.6.title'),
         desc: t('history.eco.6.desc'),
         color: "text-m-green"
      }
   ];

   const values = [
      {
         title: t('history.val.participation'),
         desc: t('history.values.desc'), // Shortening desc usage here for brevity or creating specific keys if needed, using general desc as placeholder or adding specific keys in translations.ts is better. For now using general desc for consistency with previous pattern.
         icon: Users
      },
      {
         title: t('history.val.trust'),
         desc: t('history.values.desc'),
         icon: ShieldCheck
      },
      {
         title: t('history.val.dignity'),
         desc: t('history.values.desc'),
         icon: Scale
      },
      {
         title: t('history.val.sustainability'),
         desc: t('history.values.desc'),
         icon: RefreshCw
      },
      {
         title: t('history.val.good_gov'),
         desc: t('history.values.desc'),
         icon: Landmark
      }
   ];

   const speechesList = speeches.filter(s => s.type === 'speech');
   const lettersList = speeches.filter(s => s.type === 'letter');

   return (
      <div className="min-h-screen w-full bg-cream dark:bg-void text-void dark:text-white font-sans selection:bg-m-red selection:text-white overflow-x-hidden transition-colors duration-500" dir={dir}>
         <AmbientBackground opacity={0.3} />
         <Navbar onNavigate={onNavigate} />

         <PageHero
            badge={t('history.since2005')}
            title={t('history.title')}
            description={t('history.slogan')}
            bgImage={siteImages.history_hero}
         />

         {/* 2. Royal Speeches and Letters Section */}
         <section className="relative w-full py-24 bg-white dark:bg-[#00150F] border-t border-black/5 dark:border-white/5 transition-colors duration-500">
            <div className="max-w-[82%] 2xl:max-w-[1280px] mx-auto">

               {/* Main Header */}
               <div className={`mb-12 ${dir === 'rtl' ? 'border-r-4 pr-6' : 'border-l-4 pl-6'} border-m-green`}>
                  <h2 className="text-3xl md:text-4xl font-bold text-void dark:text-white mb-2">{t('history.speeches.title')}</h2>
                  <p className="text-void/50 dark:text-white/50 text-base md:text-lg">{t('history.speeches.desc')}</p>
               </div>

               {/* Speeches Subsection */}
               <div className="mb-20">
                  <h3 className="text-2xl font-bold text-void dark:text-white mb-10 flex items-center gap-3">
                     <span className="text-m-green font-serif text-3xl">|</span>
                     {t('history.speeches.royal_speeches')}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {speechesList.map((speech, index) => (
                        <motion.div
                           key={index}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: index * 0.1 }}
                           className="bg-cream dark:bg-[#002E24] border border-black/5 dark:border-white/10 rounded-[2rem] p-8 flex flex-col justify-between min-h-[300px] group hover:border-m-red/30 transition-all hover:-translate-y-1 hover:shadow-2xl shadow-sm dark:shadow-none"
                        >
                           <div>
                              <div className={`${dir === 'rtl' ? 'text-right' : 'text-left'} mb-6`}>
                                 <span className="text-sm font-mono text-void/40 dark:text-white/40">{t(`speech.${speech.id}.date`) || speech.date}</span>
                              </div>
                              <h4 className="text-xl font-bold text-void dark:text-white leading-relaxed mb-8">
                                 {t(`speech.${speech.id}.title`) || speech.title}
                              </h4>
                           </div>
                           <div className="flex justify-center">
                              <button
                                 onClick={() => onSpeechClick && onSpeechClick(speech.id)}
                                 className="flex items-center gap-2 px-6 py-3 rounded-full border border-m-red/30 text-m-red hover:bg-m-red hover:text-white transition-all text-sm font-bold group-hover:shadow-[0_0_20px_rgba(193,39,45,0.3)]"
                              >
                                 <span>{t('history.speeches.read_full')}</span>
                                 {dir === 'rtl' ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                              </button>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>

               {/* Letters Subsection */}
               <div>
                  <h3 className="text-2xl font-bold text-void dark:text-white mb-10 flex items-center gap-3">
                     <span className="text-m-green font-serif text-3xl">|</span>
                     {t('history.speeches.royal_letters')}
                  </h3>

                  <div className="grid grid-cols-1">
                     {lettersList.map((letter, index) => (
                        <motion.div
                           key={index}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           className="bg-cream dark:bg-[#002E24] border border-black/5 dark:border-white/10 rounded-[2rem] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-m-red/30 transition-all hover:shadow-2xl shadow-sm dark:shadow-none"
                        >
                           <div className={`flex-1 text-center ${dir === 'rtl' ? 'md:text-right' : 'md:text-left'}`}>
                              <div className="mb-4">
                                 <span className="text-sm font-mono text-void/40 dark:text-white/40">{t(`speech.${letter.id}.date`) || letter.date}</span>
                              </div>
                              <h4 className="text-2xl md:text-3xl font-bold text-void dark:text-white leading-relaxed">
                                 {t(`speech.${letter.id}.title`) || letter.title}
                              </h4>
                           </div>
                           <div className="shrink-0">
                              <button
                                 onClick={() => onSpeechClick && onSpeechClick(letter.id)}
                                 className="flex items-center gap-2 px-8 py-4 rounded-full border border-m-red/30 text-m-red hover:bg-m-red hover:text-white transition-all text-sm font-bold group-hover:shadow-[0_0_20px_rgba(193,39,45,0.3)]"
                              >
                                 <span>{t('history.speeches.read_full')}</span>
                                 {dir === 'rtl' ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                              </button>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* 3. Sustainable Ecosystem Grid */}
         <section className="relative w-full py-24 border-t border-black/5 dark:border-white/5">
            <div className="max-w-[82%] 2xl:max-w-[1280px] mx-auto px-6 md:px-16">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
               >
                  <h2 className="text-3xl md:text-4xl font-bold text-void dark:text-white mb-6">{t('history.eco.title')}</h2>
                  <p className="text-void/60 dark:text-white/60 max-w-2xl mx-auto text-base md:text-lg">
                     {t('history.eco.desc')}
                  </p>
               </motion.div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ecosystemItems.map((item, idx) => (
                     <motion.div
                        key={idx}
                        variants={itemVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white dark:bg-[#002E24] border border-black/5 dark:border-white/10 p-8 rounded-[2rem] hover:bg-black/5 dark:hover:bg-white/5 transition-colors group shadow-md dark:shadow-none"
                     >
                        <div className={`w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${item.color}`}>
                           <item.icon size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-void dark:text-white mb-3 group-hover:text-m-green dark:group-hover:text-white transition-colors">{item.title}</h3>
                        <p className="text-void/50 dark:text-white/50 text-sm leading-relaxed">{item.desc}</p>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* 4. Governance Structure Section */}
         <section className="relative w-full py-24 bg-cream dark:bg-void border-t border-black/5 dark:border-white/5 transition-colors duration-500 overflow-hidden">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-m-green/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-[82%] 2xl:max-w-[1280px] mx-auto px-6 md:px-16 relative z-10">
               <div className="text-center mb-24">
                  <h2 className="text-3xl md:text-4xl font-bold text-void dark:text-white mb-6">{t('history.gov.title')}</h2>
                  <p className="text-void/60 dark:text-white/60 max-w-2xl mx-auto text-base md:text-lg">
                     {t('history.gov.desc')}
                  </p>
               </div>

               {/* Level 1: National Bodies */}
               <div className="mb-24 relative">
                  <div className="flex items-center gap-4 mb-12">
                     <div className="h-px flex-1 bg-gradient-to-l from-transparent to-m-green/30"></div>
                     <h3 className="text-2xl font-bold text-m-green flex items-center gap-3">
                        <Landmark className="w-6 h-6" />
                        {t('history.gov.national')}
                     </h3>
                     <div className="h-px flex-1 bg-gradient-to-r from-transparent to-m-green/30"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {/* Card 1: Strategic */}
                     <div className="bg-white dark:bg-[#002E24] rounded-[2rem] p-8 border border-black/5 dark:border-white/10 hover:border-m-green transition-all group shadow-sm hover:shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                           <div className="w-14 h-14 rounded-2xl bg-m-green/10 text-m-green flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                              <Award size={28} />
                           </div>
                           <h4 className="text-xl font-bold text-void dark:text-white mb-3">{t('history.gov.strategic')}</h4>
                           <div className="inline-block px-3 py-1 bg-black/5 dark:bg-white/5 rounded-full text-xs font-bold text-void/60 dark:text-white/60 mb-6 border border-black/5 dark:border-white/5">
                              {t('history.gov.head_govt')}
                           </div>
                        </div>
                     </div>

                     {/* Card 2: Steering */}
                     <div className="bg-white dark:bg-[#002E24] rounded-[2rem] p-8 border border-black/5 dark:border-white/10 hover:border-m-green transition-all group shadow-sm hover:shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                           <div className="w-14 h-14 rounded-2xl bg-m-green/10 text-m-green flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                              <ShieldCheck size={28} />
                           </div>
                           <h4 className="text-xl font-bold text-void dark:text-white mb-3">{t('history.gov.steering')}</h4>
                           <div className="inline-block px-3 py-1 bg-black/5 dark:bg-white/5 rounded-full text-xs font-bold text-void/60 dark:text-white/60 mb-6 border border-black/5 dark:border-white/5">
                              {t('history.gov.interior')}
                           </div>
                        </div>
                     </div>

                     {/* Card 3: Coordination */}
                     <div className="bg-white dark:bg-[#002E24] rounded-[2rem] p-8 border border-black/5 dark:border-white/10 hover:border-m-green transition-all group shadow-sm hover:shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                           <div className="w-14 h-14 rounded-2xl bg-m-green/10 text-m-green flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                              <LayoutGrid size={28} />
                           </div>
                           <h4 className="text-xl font-bold text-void dark:text-white mb-3">{t('history.gov.coord')}</h4>
                           <div className="inline-block px-3 py-1 bg-black/5 dark:bg-white/5 rounded-full text-xs font-bold text-void/60 dark:text-white/60 mb-6 border border-black/5 dark:border-white/5">
                              {t('history.gov.wali')}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Level 2: Territorial Bodies */}
               <div className="relative">
                  <div className="flex items-center gap-4 mb-12">
                     <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-500/30"></div>
                     <h3 className="text-2xl font-bold text-amber-500 flex items-center gap-3">
                        <Map className="w-6 h-6" />
                        {t('history.gov.territorial')}
                     </h3>
                     <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-500/30"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {/* Card 1: Regional */}
                     <div className="bg-white dark:bg-[#002E24] rounded-[2rem] p-8 border border-black/5 dark:border-white/10 hover:border-amber-500 transition-all group shadow-sm hover:shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                           <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                              <Building2 size={28} />
                           </div>
                           <h4 className="text-xl font-bold text-void dark:text-white mb-3">{t('history.gov.regional')}</h4>
                           <div className="inline-block px-3 py-1 bg-black/5 dark:bg-white/5 rounded-full text-xs font-bold text-void/60 dark:text-white/60 mb-6 border border-black/5 dark:border-white/5">
                              {t('history.gov.wali_region')}
                           </div>
                        </div>
                     </div>

                     {/* Card 2: Provincial */}
                     <div className="bg-white dark:bg-[#002E24] rounded-[2rem] p-8 border border-black/5 dark:border-white/10 hover:border-amber-500 transition-all group shadow-sm hover:shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                           <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                              <FileText size={28} />
                           </div>
                           <h4 className="text-xl font-bold text-void dark:text-white mb-3">{t('history.gov.provincial')}</h4>
                           <div className="inline-block px-3 py-1 bg-black/5 dark:bg-white/5 rounded-full text-xs font-bold text-void/60 dark:text-white/60 mb-6 border border-black/5 dark:border-white/5">
                              {t('history.gov.governor')}
                           </div>
                        </div>
                     </div>

                     {/* Card 3: Local */}
                     <div className="bg-white dark:bg-[#002E24] rounded-[2rem] p-8 border border-black/5 dark:border-white/10 hover:border-amber-500 transition-all group shadow-sm hover:shadow-xl relative overflow-hidden">
                        <div className="relative z-10">
                           <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                              <Users size={28} />
                           </div>
                           <h4 className="text-xl font-bold text-void dark:text-white mb-3">{t('history.gov.local')}</h4>
                           <div className="inline-block px-3 py-1 bg-black/5 dark:bg-white/5 rounded-full text-xs font-bold text-void/60 dark:text-white/60 mb-6 border border-black/5 dark:border-white/5">
                              {t('history.gov.authority')}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

            </div>
         </section>

         {/* 5. Principles and Values Section */}
         <section className="relative w-full py-24 bg-gradient-to-b from-white to-cream dark:from-[#00150F] dark:to-[#001E15] border-t border-black/5 dark:border-white/5 transition-colors duration-500 overflow-hidden">
            <div className="max-w-[82%] 2xl:max-w-[1280px] mx-auto px-6 md:px-16 relative z-10">

               <div className="text-center mb-20">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-6">
                     <ShieldCheck size={14} />
                     <span className="text-xs font-bold uppercase tracking-widest">{t('history.values.tag')}</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-void dark:text-white mb-6 font-cairo">
                     {t('history.values.title')}
                  </h2>
                  <p className="text-void/60 dark:text-white/60 text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-light">
                     {t('history.values.desc')}
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 w-full">
                  {values.map((item, index) => (
                     <div
                        key={index}
                        className={`
                     ${index < 3 ? 'lg:col-span-2' : 'lg:col-span-3'} 
                     ${index === 4 ? 'md:col-span-2' : 'md:col-span-1'}
                     bg-white dark:bg-[#002E24] border border-black/5 dark:border-white/10 rounded-[2.5rem] p-8 md:p-10 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden flex flex-col items-center text-center
                   `}
                     >
                        <div className="relative z-10 flex flex-col h-full items-center">
                           <div className="w-20 h-20 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-500 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all duration-500 shadow-lg shadow-amber-500/10">
                              <item.icon size={36} />
                           </div>

                           <h3 className="text-2xl font-bold text-void dark:text-white mb-4 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors font-cairo">
                              {item.title}
                           </h3>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         <Footer />
      </div>
   );
};

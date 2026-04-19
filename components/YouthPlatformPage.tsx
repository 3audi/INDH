import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Headphones, Briefcase, Rocket, Users, Target, CheckCircle2, ArrowRight, ArrowLeft, Send } from 'lucide-react';
import { AmbientBackground } from './ui/AmbientBackground';
import { PageHero } from './ui/PageHero';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useLanguage } from './LanguageContext';
import { useContent } from './ContentContext';

interface YouthPlatformPageProps {
   onNavigate: (page: string) => void;
}

export const YouthPlatformPage: React.FC<YouthPlatformPageProps> = ({ onNavigate }) => {
   const { t, dir } = useLanguage();
   const { siteStats, siteImages } = useContent();

   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            staggerChildren: 0.1
         }
      }
   };

   const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
   };

   const spaces = [
      {
         title: t('youth.space.listen.title'),
         desc: t('youth.space.listen.desc'),
         icon: Headphones,
         color: "text-blue-500",
         bg: "bg-blue-500/10"
      },
      {
         title: t('youth.space.support.title'),
         desc: t('youth.space.support.desc'),
         icon: Rocket,
         color: "text-m-red",
         bg: "bg-m-red/10"
      },
      {
         title: t('youth.space.employ.title'),
         desc: t('youth.space.employ.desc'),
         icon: Briefcase,
         color: "text-emerald-500",
         bg: "bg-emerald-500/10"
      }
   ];

   const employSteps = [
      { title: t('youth.path.employ.s1.title'), icon: Users, desc: t('youth.path.employ.s1.desc') },
      { title: t('youth.path.employ.s2.title'), icon: Headphones, desc: t('youth.path.employ.s2.desc') },
      { title: t('youth.path.employ.s3.title'), icon: Lightbulb, desc: t('youth.path.employ.s3.desc') },
      { title: t('youth.path.employ.s4.title'), icon: Target, desc: t('youth.path.employ.s4.desc') },
      { title: t('youth.path.employ.s5.title'), icon: Briefcase, desc: t('youth.path.employ.s5.desc') },
      { title: t('youth.path.employ.s6.title'), icon: CheckCircle2, desc: t('youth.path.employ.s6.desc') },
   ];

   const entreSteps = [
      { title: t('youth.path.entre.s1.title'), icon: Users, desc: t('youth.path.entre.s1.desc') },
      { title: t('youth.path.entre.s2.title'), icon: Headphones, desc: t('youth.path.entre.s2.desc') },
      { title: t('youth.path.entre.s3.title'), icon: Lightbulb, desc: t('youth.path.entre.s3.desc') },
      { title: t('youth.path.entre.s4.title'), icon: Target, desc: t('youth.path.entre.s4.desc') },
      { title: t('youth.path.entre.s5.title'), icon: Rocket, desc: t('youth.path.entre.s5.desc') },
      { title: t('youth.path.entre.s6.title'), icon: ArrowRight, desc: t('youth.path.entre.s6.desc') },
   ];

   return (
      <div className="min-h-screen w-full bg-cream dark:bg-void text-void dark:text-white font-sans selection:bg-m-red selection:text-white overflow-x-hidden transition-colors duration-500" dir={dir}>
         <AmbientBackground opacity={0.3} />
         <Navbar onNavigate={onNavigate} />

         <PageHero
            badge={t('nav.youth_platform')}
            title={t('youth.hero.title')}
            subtitle={t('youth.hero.subtitle')}
            description={t('youth.hero.desc')}
            bgImage={siteImages.youth_hero}
         />

         {/* Spaces Grid */}
         <section className="relative w-full py-24 bg-white dark:bg-[#00150F] border-t border-black/5 dark:border-white/5 transition-colors duration-500">
            <div className="max-w-[82%] 2xl:max-w-[1280px] mx-auto">
               <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-void dark:text-white mb-4">{t('youth.spaces.title')}</h2>
                  <div className="h-1 w-24 bg-blue-500 mx-auto rounded-full opacity-50" />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {spaces.map((space, index) => (
                     <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-cream dark:bg-[#002E24] border border-black/5 dark:border-white/10 rounded-[2.5rem] p-8 hover:shadow-2xl transition-all hover:-translate-y-2 group"
                     >
                        <div className={`w-16 h-16 rounded-2xl ${space.bg} ${space.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                           <space.icon size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-void dark:text-white mb-4">{space.title}</h3>
                        <p className="text-void/60 dark:text-white/60 leading-relaxed text-lg">
                           {space.desc}
                        </p>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* Employability Path */}
         <section className="relative w-full py-48 bg-cream dark:bg-void border-t border-black/5 dark:border-white/5 overflow-hidden transition-colors duration-500">
            <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-6 md:px-16 relative z-10">
               <div className="text-center mb-40">
                  <h2 className="text-3xl md:text-5xl font-bold text-void dark:text-white mb-6">{t('youth.path.employ.title')}</h2>
                  <div className="h-1 w-32 bg-emerald-500 mx-auto rounded-full opacity-50" />
               </div>

               <div className="relative mt-24 md:mt-40 mb-32 w-full h-auto md:h-[28rem]">
                  {/* Mobile Vertical Line */}
                  <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-black/10 dark:bg-white/10" />

                  {/* Desktop Horizontal Line */}
                  <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-black/10 dark:bg-white/10 -translate-y-1/2 rounded-full z-0" />

                  {/* Desktop Arrow at end of line */}
                  <div className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 w-4 h-4 border-emerald-500 z-0 transition-transform duration-300 ${dir === 'rtl'
                     ? 'left-0 -translate-x-1/2 border-t-2 border-l-2 -rotate-45'
                     : 'right-0 translate-x-1/2 border-t-2 border-r-2 rotate-45'
                     }`} />

                  <div className="flex flex-col md:flex-row justify-between h-full relative z-10 w-full">
                     {employSteps.map((step, index) => {
                        const isTop = index % 2 === 0;

                        return (
                           <motion.div
                              key={index}
                              initial={{ opacity: 0, y: isTop ? -30 : 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              className="relative w-full md:flex-1 pl-16 py-8 md:p-0 flex flex-col justify-center items-center group min-h-[12rem] md:min-h-0"
                           >
                              {/* Mobile Step Node */}
                              <div className="md:hidden absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-emerald-500 text-white text-xs font-bold flex items-center justify-center shadow-md z-20">
                                 {index + 1}
                              </div>

                              {/* Desktop Node (Dot on the main line) */}
                              <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-emerald-500 border-4 border-cream dark:border-void shadow-md z-20 group-hover:scale-125 transition-transform duration-300" />

                              {/* Desktop Vertical Connector Line */}
                              <div className={`hidden md:block absolute left-1/2 w-0.5 bg-emerald-500/30 -translate-x-1/2 z-10 ${isTop ? 'bottom-1/2 h-24 group-hover:bg-emerald-500 transition-colors' : 'top-1/2 h-24 group-hover:bg-emerald-500 transition-colors'
                                 }`} />

                              {/* Content Container */}
                              <div className={`flex flex-col md:items-center text-left md:text-center w-full px-2 md:px-4 md:absolute ${isTop ? 'md:bottom-[calc(50%+6rem)]' : 'md:top-[calc(50%+6rem)]'
                                 }`}>
                                 <div className="bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-lg mb-3 inline-block md:block self-start md:self-auto shadow-sm border border-emerald-100 dark:border-emerald-800/50 group-hover:shadow-md transition-shadow w-fit md:w-full min-w-max">
                                    <h4 className="text-sm md:text-base font-bold whitespace-normal">{step.title}</h4>
                                 </div>
                                 <p className="text-sm text-void/60 dark:text-white/60 leading-relaxed md:w-[150%] md:-ml-[25%] break-words">
                                    {step.desc}
                                 </p>
                              </div>

                           </motion.div>
                        );
                     })}
                  </div>
               </div>
            </div>
         </section>

         {/* Entrepreneurship Path */}
         <section className="relative w-full py-48 bg-white dark:bg-[#00150F] border-t border-black/5 dark:border-white/5 overflow-hidden transition-colors duration-500">
            <div className="max-w-[90%] 2xl:max-w-[1400px] mx-auto px-6 md:px-16 relative z-10">
               <div className="text-center mb-40">
                  <h2 className="text-3xl md:text-5xl font-bold text-void dark:text-white mb-6">{t('youth.path.entre.title')}</h2>
                  <div className="h-1 w-32 bg-m-red mx-auto rounded-full opacity-50" />
               </div>

               <div className="relative mt-24 md:mt-40 mb-32 w-full h-auto md:h-[28rem]">
                  {/* Mobile Vertical Line */}
                  <div className="md:hidden absolute left-8 top-0 bottom-0 w-0.5 bg-black/10 dark:bg-white/10" />

                  {/* Desktop Horizontal Line */}
                  <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-black/10 dark:bg-white/10 -translate-y-1/2 rounded-full z-0" />

                  {/* Desktop Arrow at end of line */}
                  <div className={`hidden md:block absolute top-1/2 transform -translate-y-1/2 w-4 h-4 border-m-red z-0 transition-transform duration-300 ${dir === 'rtl'
                     ? 'left-0 -translate-x-1/2 border-t-2 border-l-2 -rotate-45'
                     : 'right-0 translate-x-1/2 border-t-2 border-r-2 rotate-45'
                     }`} />

                  <div className="flex flex-col md:flex-row justify-between h-full relative z-10 w-full">
                     {entreSteps.map((step, index) => {
                        const isTop = index % 2 === 0;

                        return (
                           <motion.div
                              key={index}
                              initial={{ opacity: 0, y: isTop ? -30 : 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              className="relative w-full md:flex-1 pl-16 py-8 md:p-0 flex flex-col justify-center items-center group min-h-[12rem] md:min-h-0"
                           >
                              {/* Mobile Step Node */}
                              <div className="md:hidden absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-m-red text-white text-xs font-bold flex items-center justify-center shadow-md z-20">
                                 {index + 1}
                              </div>

                              {/* Desktop Node (Dot on the main line) */}
                              <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-m-red border-4 border-white dark:border-[#00150F] shadow-md z-20 group-hover:scale-125 transition-transform duration-300" />

                              {/* Desktop Vertical Connector Line */}
                              <div className={`hidden md:block absolute left-1/2 w-0.5 bg-m-red/30 -translate-x-1/2 z-10 ${isTop ? 'bottom-1/2 h-24 group-hover:bg-m-red transition-colors' : 'top-1/2 h-24 group-hover:bg-m-red transition-colors'
                                 }`} />

                              {/* Content Container */}
                              <div className={`flex flex-col md:items-center text-left md:text-center w-full px-2 md:px-4 md:absolute ${isTop ? 'md:bottom-[calc(50%+6rem)]' : 'md:top-[calc(50%+6rem)]'
                                 }`}>
                                 <div className="bg-red-50 dark:bg-m-red/10 text-m-red px-4 py-2 rounded-lg mb-3 inline-block md:block self-start md:self-auto shadow-sm border border-red-100 dark:border-m-red/30 group-hover:shadow-md transition-shadow w-fit md:w-full min-w-max">
                                    <h4 className="text-sm md:text-base font-bold whitespace-normal">{step.title}</h4>
                                 </div>
                                 <p className="text-sm text-void/60 dark:text-white/60 leading-relaxed md:w-[150%] md:-ml-[25%] break-words">
                                    {step.desc}
                                 </p>
                              </div>

                           </motion.div>
                        );
                     })}
                  </div>
               </div>
            </div>
         </section>

         {/* Stats Section */}
         <section className="py-20 bg-white dark:bg-[#00150F] border-t border-black/5 dark:border-white/5 transition-colors duration-500">
            <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
               {[
                  { label: t('youth.stats.visitors'), value: siteStats.youth_visitors },
                  { label: t('youth.stats.trained'), value: siteStats.youth_trained },
                  { label: t('youth.stats.funded'), value: siteStats.youth_funded },
               ].map((stat, i) => (
                  <div key={i} className="p-8">
                     <div className="text-6xl md:text-8xl font-black text-m-red font-cairo mb-4 drop-shadow-xl">
                        {stat.value}
                     </div>
                     <div className="text-void/80 dark:text-white/80 font-bold text-xl md:text-2xl uppercase tracking-widest">
                        {stat.label}
                     </div>
                  </div>
               ))}
            </div>
         </section>

         {/* CTA */}
         <section className="py-24 bg-m-red text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
               <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                  {t('youth.cta.title')}
               </h2>
               <button className="px-10 py-4 bg-white text-m-red rounded-full font-bold text-xl hover:bg-black/10 hover:text-white transition-all shadow-xl flex items-center gap-3 mx-auto group">
                  {t('youth.cta.btn')}
                  <Send size={20} className={`transform transition-transform group-hover:-translate-y-1 ${dir === 'rtl' ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
               </button>
            </div>
         </section>

         <Footer />
      </div>
   );
};

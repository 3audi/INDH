import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Target, TrendingUp, Users, CheckCircle2, ArrowRight, ArrowLeft, Wallet, Lightbulb } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { AmbientBackground } from './ui/AmbientBackground';
import { PageHero } from './ui/PageHero';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useLanguage } from './LanguageContext';
import { useContent } from './ContentContext';

interface PhasesPageProps {
    onNavigate: (page: string) => void;
}

const PhaseStatDetails = ({ phaseId }: { phaseId: 'p1' | 'p2' | 'p3' }) => {
    const { t } = useLanguage();

    return (
        <div className="space-y-6 pt-4 w-full">
            {/* Projects & Beneficiaries */}
            <div className="bg-white border border-black/5 dark:bg-[#001D16] dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <h3 className="flex items-center gap-3 text-xl font-bold text-void dark:text-white mb-6">
                    <Users className="text-m-green w-6 h-6" />
                    <span>{t('phases.stats.title_projects')}</span>
                </h3>
                <ul className="space-y-4">
                    <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/5 dark:border-white/5 pb-3">
                        <span className="text-void/60 dark:text-white/60 text-sm lg:text-base font-medium">{t('phases.stats.projects_count')}</span>
                        <span className="font-black text-lg md:text-xl text-void dark:text-white font-mono">{t(`phases.${phaseId}.projects_count`)}</span>
                    </li>
                    <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/5 dark:border-white/5 pb-3">
                        <span className="text-void/60 dark:text-white/60 text-sm lg:text-base font-medium">{t('phases.stats.total_beneficiaries')}</span>
                        <span className="font-black text-lg md:text-xl text-void dark:text-white font-mono">{t(`phases.${phaseId}.total_beneficiaries`)}</span>
                    </li>
                    <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-void/60 dark:text-white/60 text-sm lg:text-base font-medium">{t('phases.stats.yearly_beneficiaries')}</span>
                        <span className="font-black text-lg md:text-xl text-void dark:text-white font-mono">{t(`phases.${phaseId}.yearly_beneficiaries`)}</span>
                    </li>
                </ul>
            </div>

            {/* Cost & Contributions */}
            <div className="bg-white border border-black/5 dark:bg-[#001D16] dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <h3 className="flex items-center gap-3 text-xl font-bold text-void dark:text-white mb-6">
                    <Wallet className="text-m-red w-6 h-6" />
                    <span>{t('phases.stats.title_cost')}</span>
                </h3>
                <ul className="space-y-4">
                    <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/5 dark:border-white/5 pb-3">
                        <span className="text-void/60 dark:text-white/60 text-sm lg:text-base font-medium">{t('phases.stats.total_cost')}</span>
                        <span className="font-black text-lg md:text-xl text-void dark:text-white font-mono">{t(`phases.${phaseId}.total_cost`)}</span>
                    </li>
                    <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/5 dark:border-white/5 pb-3">
                        <span className="text-void/60 dark:text-white/60 text-sm lg:text-base font-medium">{t('phases.stats.indh_contribution')}</span>
                        <span className="font-black text-lg md:text-xl text-m-green font-mono">{t(`phases.${phaseId}.indh_contribution`)}</span>
                    </li>
                    <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/5 dark:border-white/5 pb-3">
                        <span className="text-void/60 dark:text-white/60 text-sm lg:text-base font-medium">{t('phases.stats.partners_contribution')}</span>
                        <span className="font-black text-lg md:text-xl text-m-red font-mono">{t(`phases.${phaseId}.partners_contribution`)}</span>
                    </li>
                    <li className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="text-void/60 dark:text-white/60 text-sm lg:text-base font-medium">{t('phases.stats.leverage')}</span>
                        <span className="font-black text-lg md:text-xl text-amber-500 font-mono">{t(`phases.${phaseId}.leverage`)}</span>
                    </li>
                </ul>
            </div>

            {/* Key Projects */}
            <div className={`border rounded-2xl p-6 md:p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${phaseId === 'p1' ? 'bg-m-green/5 border-m-green/20' : phaseId === 'p2' ? 'bg-m-red/5 border-m-red/20' : 'bg-amber-500/5 border-amber-500/20'}`}>
                <h3 className="flex items-center gap-3 text-xl font-bold text-void dark:text-white mb-4">
                    <Lightbulb className={phaseId === 'p1' ? 'text-m-green' : phaseId === 'p2' ? 'text-m-red' : 'text-amber-500'} size={24} />
                    <span>{t('phases.stats.title_key_projects')}</span>
                </h3>
                <div className="flex items-start gap-4">
                    <CheckCircle2 className={`shrink-0 mt-1 ${phaseId === 'p1' ? 'text-m-green' : phaseId === 'p2' ? 'text-m-red' : 'text-amber-500'}`} size={20} />
                    <p className="text-void/80 dark:text-white/80 font-medium text-lg md:text-xl leading-relaxed">
                        {t(`phases.${phaseId}.key_projects`)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export const PhasesPage: React.FC<PhasesPageProps> = ({ onNavigate }) => {
    const { t, dir } = useLanguage();
    const { siteImages } = useContent();
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const id = location.hash.replace('#', '');
            const element = document.getElementById(id);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            }
        }
    }, [location]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen w-full bg-cream dark:bg-void text-void dark:text-white font-sans selection:bg-m-red selection:text-white overflow-x-hidden transition-colors duration-500" dir={dir}>
            <AmbientBackground opacity={0.3} />
            <Navbar onNavigate={onNavigate} />

            <PageHero
                badge={t('phases.hero.subtitle')}
                title={t('phases.hero.title')}
                description={t('phases.hero.desc')}
                bgImage={siteImages.phases_hero}
            />

            {/* Phase 1 (2005-2010) */}
            <section id="phase1" className="relative z-20 w-full bg-cream/50 dark:bg-[#00241B] py-20 px-6 lg:px-0 md:py-32 border-t border-black/5 dark:border-white/5 transition-colors duration-500 scroll-mt-24">
                <div className="w-full max-w-[82%] 2xl:max-w-[1280px] mx-auto">
                    <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                        {/* Title & Subtitle on top */}
                        <motion.div variants={itemVariants} className="space-y-4 mb-12">
                            <div className="inline-flex items-baseline gap-3">
                                <h2 className="text-4xl md:text-5xl font-black text-void dark:text-white font-cairo">{t('phases.p1.title')}</h2>
                                <span className="text-2xl text-m-green font-bold font-mono">{t('phases.p1.years')}</span>
                            </div>
                            <p className="text-void/70 dark:text-white/70 text-lg md:text-xl leading-relaxed pt-2">
                                {t('phases.p1.desc')}
                            </p>
                        </motion.div>

                        {/* Image & Cards side by side */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
                            <div className="relative h-full min-h-[500px]">
                                <motion.div variants={itemVariants} className="relative h-full rounded-[3rem] overflow-hidden border border-black/5 dark:border-white/10 shadow-2xl group">
                                    <img src={siteImages.timeline_p1} alt="Phase 1" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-m-green/20 mix-blend-multiply pointer-events-none" />
                                </motion.div>
                            </div>

                            <motion.div variants={itemVariants}>
                                <PhaseStatDetails phaseId="p1" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Phase 2 (2011-2018) */}
            <section id="phase2" className="relative z-20 w-full bg-white dark:bg-void py-20 px-6 lg:px-0 md:py-32 border-t border-black/5 dark:border-white/5 transition-colors duration-500 scroll-mt-24">
                <div className="w-full max-w-[82%] 2xl:max-w-[1280px] mx-auto">
                    <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                        {/* Title & Subtitle on top */}
                        <motion.div variants={itemVariants} className="space-y-4 mb-12">
                            <div className="inline-flex items-baseline gap-3">
                                <h2 className="text-4xl md:text-5xl font-black text-void dark:text-white font-cairo">{t('phases.p2.title')}</h2>
                                <span className="text-2xl text-m-red keep-red font-bold font-mono">{t('phases.p2.years')}</span>
                            </div>
                            <p className="text-void/70 dark:text-white/70 text-lg md:text-xl leading-relaxed pt-2">
                                {t('phases.p2.desc')}
                            </p>
                        </motion.div>

                        {/* Image & Cards side by side - Cards first, Image second */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
                            <motion.div variants={itemVariants}>
                                <PhaseStatDetails phaseId="p2" />
                            </motion.div>

                            <div className="relative h-full min-h-[500px]">
                                <motion.div variants={itemVariants} className="relative h-full rounded-[3rem] overflow-hidden border border-black/5 dark:border-white/10 shadow-2xl group">
                                    <img src={siteImages.timeline_p2} alt="Phase 2" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-m-red/20 mix-blend-multiply pointer-events-none" />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Phase 3 (2019 - 2025) */}
            <section id="phase3" className="relative z-20 w-full bg-cream/50 dark:bg-gradient-to-b dark:from-[#00241B] dark:to-void py-20 px-6 lg:px-0 md:py-32 border-t border-black/5 dark:border-white/5 transition-colors duration-500 scroll-mt-24">
                <div className="w-full max-w-[82%] 2xl:max-w-[1280px] mx-auto">
                    <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
                        {/* Title & Subtitle on top */}
                        <motion.div variants={itemVariants} className="space-y-4 mb-12">
                            <div className="inline-flex items-baseline gap-3">
                                <h2 className="text-4xl md:text-5xl font-black text-void dark:text-white font-cairo">{t('phases.p3.title')}</h2>
                                <span className="text-2xl text-amber-500 font-bold font-mono">{t('phases.p3.years')}</span>
                            </div>
                            <p className="text-void/70 dark:text-white/70 text-lg md:text-xl leading-relaxed pt-2">
                                {t('phases.p3.desc')}
                            </p>
                        </motion.div>

                        {/* Image & Cards side by side */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
                            <div className="relative h-full min-h-[500px]">
                                <motion.div variants={itemVariants} className="relative h-full rounded-[3rem] overflow-hidden border border-black/5 dark:border-white/10 shadow-2xl group">
                                    <img src={siteImages.timeline_p3} alt="Phase 3" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-amber-500/20 mix-blend-multiply pointer-events-none" />
                                </motion.div>
                            </div>

                            <div className="flex flex-col gap-6">
                                <motion.div variants={itemVariants}>
                                    <PhaseStatDetails phaseId="p3" />
                                </motion.div>

                                <motion.div variants={itemVariants} className="pt-2">
                                    <button
                                        onClick={() => onNavigate('programs')}
                                        className="group flex items-center gap-3 px-8 py-4 bg-void dark:bg-white text-white dark:text-black rounded-xl hover:scale-105 hover:shadow-xl transition-all w-fit"
                                    >
                                        <span className="font-bold text-lg">{t('hero.btn.discover')}</span>
                                        {dir === 'rtl' ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <Footer onLoginClick={() => onNavigate('login')} />
        </div>
    );
};

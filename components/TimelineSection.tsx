import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sprout, Building2, Users, TrendingUp } from 'lucide-react';
import { useLanguage } from './LanguageContext';
import { useContent } from './ContentContext';
import { Link } from 'react-router-dom';

export const TimelineSection: React.FC = () => {
    const { t, dir } = useLanguage();
    const { siteImages, siteStats } = useContent();

    const phases = [
        {
            id: 1,
            period: siteStats.timeline_p1_period,
            title: t('timeline.p1.title'),
            subtitle: t('timeline.p1.sub'),
            description: t('timeline.p1.desc'),
            stats: { label: t('phases.stats.total_beneficiaries'), value: t('phases.p1.total_beneficiaries') },
            icon: Sprout,
            image: siteImages.timeline_p1,
            anchor: 'phase1'
        },
        {
            id: 2,
            period: siteStats.timeline_p2_period,
            title: t('timeline.p2.title'),
            subtitle: t('timeline.p2.sub'),
            description: t('timeline.p2.desc'),
            stats: { label: t('phases.stats.total_beneficiaries'), value: t('phases.p2.total_beneficiaries') },
            icon: Building2,
            image: siteImages.timeline_p2,
            anchor: 'phase2'
        },
        {
            id: 3,
            period: siteStats.timeline_p3_period,
            title: t('timeline.p3.title'),
            subtitle: t('timeline.p3.sub'),
            description: t('timeline.p3.desc'),
            stats: { label: t('phases.stats.total_beneficiaries'), value: t('phases.p3.total_beneficiaries') },
            icon: Users,
            image: siteImages.timeline_p3,
            anchor: 'phase3'
        }
    ];

    return (
        <section className="relative w-full py-24 md:py-40 bg-cream dark:bg-void overflow-hidden transition-colors duration-500" dir={dir}>

            {/* Dynamic Background */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/5 dark:via-white/10 to-transparent" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            {/* Floating Orbs */}
            <div className="absolute right-0 top-[10%] w-[600px] h-[600px] bg-m-green/5 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />
            <div className="absolute left-0 bottom-[10%] w-[600px] h-[600px] bg-m-red/5 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

                {/* Header */}
                <div className="text-center mb-32 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="inline-block relative"
                    >
                        <span className="absolute -inset-8 bg-m-green/20 blur-2xl rounded-full opacity-20" />
                        <h2 className="relative text-5xl md:text-7xl font-bold text-void dark:text-white tracking-tighter mb-4">
                            {t('timeline.title')}
                        </h2>
                    </motion.div>
                    <p className="text-void/60 dark:text-white/50 text-xl font-light max-w-2xl mx-auto mt-6 leading-relaxed">
                        {t('timeline.subtitle')}
                    </p>
                </div>

                {/* Timeline Container */}
                <div className="relative pb-20">

                    {/* The Central Line */}
                    <div className={`absolute top-0 bottom-0 ${dir === 'rtl' ? 'right-8 md:right-1/2 md:translate-x-1/2' : 'left-8 md:left-1/2 md:-translate-x-1/2'} w-[2px] overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/5 dark:bg-white/5" />
                        <motion.div
                            initial={{ height: "0%" }}
                            whileInView={{ height: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 2, ease: "linear" }}
                            className="absolute top-0 inset-x-0 bg-gradient-to-b from-m-green via-emerald-400 to-m-green/20 shadow-[0_0_20px_rgba(0,255,100,0.5)]"
                        />
                    </div>

                    <div className="space-y-24 md:space-y-48">
                        {phases.map((phase, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={phase.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-10%" }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                    className={`relative flex flex-col items-center ${dir === 'rtl'
                                        ? (isEven ? 'md:flex-row' : 'md:flex-row-reverse')
                                        : (isEven ? 'md:flex-row-reverse' : 'md:flex-row')
                                        }`}
                                >

                                    {/* Text Display for Desktop */}
                                    <div className={`hidden md:flex w-1/2 ${dir === 'rtl'
                                        ? (isEven ? 'pl-36 justify-end' : 'pr-36 justify-start')
                                        : (isEven ? 'pl-36 justify-start' : 'pr-36 justify-end')
                                        }`}>
                                        <div className={`flex flex-row items-center gap-6 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>

                                            {/* Number */}
                                            <h2 className="text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-void/20 via-void/10 to-transparent dark:from-white dark:via-white/80 dark:to-white/20 tracking-tighter select-none drop-shadow-sm dark:drop-shadow-2xl leading-[0.8]">
                                                0{phase.id}
                                            </h2>

                                            {/* Vertical Separator */}
                                            <div className="h-24 w-[2px] bg-gradient-to-b from-black/10 via-black/5 to-transparent dark:from-white/20 dark:via-white/10 dark:to-transparent rounded-full"></div>

                                            {/* Details Stack */}
                                            <div className="flex flex-col items-start gap-2">
                                                <span className="px-3 py-1 bg-m-green/10 border border-m-green/30 rounded-full text-m-green text-xs font-bold tracking-wider uppercase">
                                                    {phase.title}
                                                </span>
                                                <h3 className="text-3xl font-bold text-void dark:text-white leading-tight max-w-[250px]">
                                                    {phase.subtitle}
                                                </h3>
                                                <div className="text-xl font-bold text-void/50 dark:text-white/50 font-mono tracking-wider">
                                                    {phase.period}
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                    {/* Center Node */}
                                    <div className={`absolute ${dir === 'rtl' ? 'right-8 md:right-1/2 translate-x-1/2' : 'left-8 md:left-1/2 -translate-x-1/2'} z-20 flex items-center justify-center`}>
                                        <div className="relative w-16 h-16 rounded-full bg-white dark:bg-void border-4 border-white dark:border-void flex items-center justify-center group shadow-2xl">
                                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-black/5 to-transparent dark:from-white/10 dark:to-white/5 blur-sm" />
                                            <div className="relative w-full h-full rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center group-hover:bg-m-green group-hover:border-m-green transition-all duration-500">
                                                <phase.icon className="w-6 h-6 text-void dark:text-white group-hover:text-white group-hover:scale-110 transition-transform duration-300" />
                                            </div>

                                            {/* Glowing Ring */}
                                            <div className="absolute -inset-2 rounded-full border border-m-green/30 opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-100 transition-all duration-700" />
                                        </div>
                                    </div>

                                    {/* Mobile Date Header */}
                                    <div className={`md:hidden w-full ${dir === 'rtl' ? 'pl-6 pr-24 text-right' : 'pr-6 pl-24 text-left'} mb-10 relative`}>
                                        <div className="flex flex-row items-center justify-start gap-4 relative z-10">
                                            <span className="text-6xl font-black text-void dark:text-white leading-none">
                                                0{phase.id}
                                            </span>
                                            <div className="w-[1px] h-16 bg-black/10 dark:bg-white/20"></div>
                                            <div className="flex flex-col items-start gap-1">
                                                <span className="text-xs font-bold text-m-green uppercase tracking-wider">
                                                    {phase.title}
                                                </span>
                                                <h3 className="text-xl font-bold text-void dark:text-white leading-tight">
                                                    {phase.subtitle}
                                                </h3>
                                                <span className="text-sm font-mono text-void/50 dark:text-white/50">{phase.period}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Card Side */}
                                    <div className={`w-full md:w-1/2 relative 
                                ${dir === 'rtl'
                                            ? (isEven ? 'md:pr-36 pr-24 pl-6 md:pl-0' : 'md:pl-36 pr-24 pl-6 md:pr-0')
                                            : (isEven ? 'md:pr-36 pl-24 pr-6 md:pl-0' : 'md:pl-36 pl-24 pr-6 md:pr-0')
                                        }
                            `}>
                                        <div className="group relative">
                                            {/* Connector Line */}
                                            <div className={`hidden md:block absolute top-24 w-36 h-[1px] bg-gradient-to-r from-m-green/50 to-transparent transition-all duration-500
                                        ${dir === 'rtl'
                                                    ? (isEven ? '-right-36 origin-right group-hover:scale-x-110' : '-left-36 origin-left group-hover:scale-x-110 rotate-180')
                                                    : (isEven ? '-right-36 origin-right group-hover:scale-x-110' : '-left-36 origin-left group-hover:scale-x-110 rotate-180')
                                                }`}
                                            />

                                            {/* The Card */}
                                            <div className="relative bg-white dark:bg-[#002E24] rounded-2xl overflow-hidden border border-black/5 dark:border-white/10 group-hover:border-m-green/50 transition-colors duration-500 shadow-md dark:shadow-none">

                                                {/* Image Header */}
                                                <div className="relative h-48 w-full overflow-hidden">
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 dark:from-[#002E24]" />
                                                    <img
                                                        src={phase.image}
                                                        alt={phase.title}
                                                        className="w-full h-full object-cover opacity-90 dark:opacity-60 group-hover:scale-110 transition-transform duration-700 ease-out"
                                                    />
                                                    <div className={`absolute bottom-4 ${dir === 'rtl' ? 'right-4' : 'left-4'} z-20`}>
                                                        <h3 className="text-2xl font-bold text-white drop-shadow-md">{phase.title}</h3>
                                                    </div>
                                                </div>

                                                {/* Content Body */}
                                                <div className="p-8 relative">
                                                    <p className={`text-void/70 dark:text-white/70 leading-relaxed font-light mb-8 text-lg ${dir === 'rtl' ? 'border-r-2 pr-4' : 'border-l-2 pl-4'} border-black/10 dark:border-white/10 group-hover:border-m-green transition-colors duration-300`}>
                                                        {phase.description}
                                                    </p>

                                                    <div className="flex items-end justify-between border-t border-black/5 dark:border-white/5 pt-6">
                                                        <div className="flex flex-col gap-1">
                                                            <div className="flex items-center gap-2 text-void/40 dark:text-white/40 text-xs uppercase tracking-wider">
                                                                <TrendingUp className="w-3 h-3" />
                                                                <span>{phase.stats.label}</span>
                                                            </div>
                                                            <span className="text-2xl font-bold text-void dark:text-white font-mono">{phase.stats.value}</span>
                                                        </div>

                                                        <Link to={`/phases#${phase.anchor}`} className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-void dark:hover:bg-white hover:text-white dark:hover:text-black transition-all text-sm font-bold group/btn">
                                                            <span>{t('timeline.explore')}</span>
                                                            {dir === 'rtl'
                                                                ? <ArrowLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
                                                                : <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                                            }
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Hover Glow Effect */}
                                            <div className="absolute -inset-1 bg-gradient-to-r from-m-green/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                                        </div>
                                    </div>

                                </motion.div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
};
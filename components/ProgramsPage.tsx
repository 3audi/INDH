import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Wallet, Zap, Droplets, Map, CheckCircle2, Activity, TrendingUp, LayoutGrid, HeartHandshake, Building2, Heart, GraduationCap, ArrowRight, ArrowLeft, Briefcase, Lightbulb, Baby, Smile, History } from 'lucide-react';
import { AmbientBackground } from './ui/AmbientBackground';
import { PageHero } from './ui/PageHero';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useLanguage } from './LanguageContext';
import { useContent } from './ContentContext';

interface ProgramsPageProps {
  onNavigate: (page: string) => void;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({ onNavigate }) => {
  const { t, dir } = useLanguage();
  const { siteImages, siteStats } = useContent();

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

  const targetGroups = [
    t('programs.p2.target.1'),
    t('programs.p2.target.2'),
    t('programs.p2.target.3'),
    t('programs.p2.target.4'),
  ];

  const services = [
    t('programs.p2.service.1'),
    t('programs.p2.service.2'),
    t('programs.p2.service.3'),
    t('programs.p2.service.4'),
  ];

  const youthTargetGroups = [
    t('programs.p3.t1'),
    t('programs.p3.t2'),
    t('programs.p3.t3'),
  ];

  const youthStrategy = [
    t('programs.p3.s1'),
    t('programs.p3.s2'),
    t('programs.p3.s3'),
  ];

  const p4TargetGroups = [
    t('activity.1.cat'),
    t('programs.p4.preschool'),
    t('programs.p4.health_mother')
  ];

  const p4Impact = [
    t('programs.p4.i1'),
    t('programs.p4.i2'),
    t('programs.p4.i3')
  ];

  return (
    <div className="min-h-screen w-full bg-cream dark:bg-void text-void dark:text-white font-sans selection:bg-m-red selection:text-white overflow-x-hidden transition-colors duration-500" dir={dir}>
      <AmbientBackground opacity={0.4} />

      {/* Navigation Bar */}
      <Navbar onNavigate={onNavigate} />

      <PageHero
        badge={t('programs.pillars_tag')}
        title={t('programs.title')}
        description={t('programs.desc')}
        bgImage={siteImages.programs_hero}
      />

      {/* ─── Program 1 ─────────────────────────────────────────────── */}
      <section className="relative z-20 w-full bg-white dark:bg-[#00241B] py-20 border-t border-black/5 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-[82%] 2xl:max-w-[1280px] mx-auto">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>

            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-m-green/10 border border-m-green/20 rounded-full text-m-green text-sm font-semibold tracking-wide mb-4">
                <Target size={15} />
                <span>{t('programs.p1.tag')}</span>
              </div>
              <h2 className="font-cairo text-3xl md:text-4xl font-black text-void dark:text-white leading-tight tracking-tight mb-4">
                {t('programs.p1.title')}
              </h2>
              <p className="text-void/60 dark:text-white/60 text-base leading-relaxed max-w-2xl mx-auto">
                {t('programs.p1.desc')}
              </p>
            </motion.div>

            {/* Content: Image | Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

              {/* Image */}
              <motion.div variants={itemVariants} className="relative h-full w-full rounded-3xl min-h-[400px] overflow-hidden border border-black/5 dark:border-white/10 group shadow-xl">
                <img src={siteImages.programs_p1} alt="Infrastructure" className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className={`absolute bottom-6 ${dir === 'rtl' ? 'right-6' : 'left-6'}`}>
                  <div className="flex items-center gap-2 text-white/80 text-sm font-medium mb-1">
                    <Map size={14} /><span>{t('programs.p1.intervention')}</span>
                  </div>
                  <p className="text-white font-bold text-2xl">{t('programs.p1.intervention_val')}</p>
                </div>
              </motion.div>

              {/* Stats Cards */}
              <div className="space-y-5">
                {/* Budget Card */}
                <motion.div variants={itemVariants} className="bg-cream dark:bg-[#002E24] border border-black/5 dark:border-white/10 rounded-2xl p-6 relative overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="absolute top-0 left-0 w-64 h-64 bg-m-green/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
                  <div className="relative z-10 flex items-start justify-between">
                    <div>
                      <p className="text-void/40 dark:text-white/40 text-xs font-bold uppercase tracking-widest mb-1">{t('programs.p1.budget')}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-void dark:text-white font-cairo">{siteStats.p1_budget}</span>
                        <span className="text-lg text-void/40 dark:text-white/40 font-bold">{t('ui.mdh')}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-m-green/10 rounded-xl">
                      <Wallet className="text-m-green" size={26} />
                    </div>
                  </div>
                  <div className="mt-4 h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full bg-m-green rounded-full" />
                  </div>
                  <p className="text-xs text-void/40 dark:text-white/40 mt-2 flex items-center gap-1"><Activity size={12} />{t('programs.p1.full_funding')}</p>
                </motion.div>

                {/* Projects + Beneficiaries */}
                <div className="grid grid-cols-2 gap-5">
                  <motion.div variants={itemVariants} className="bg-cream dark:bg-[#002E24] border border-black/5 dark:border-white/10 rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-void/40 dark:text-white/40 text-xs font-bold uppercase tracking-wide">{t('ui.projects')}</span>
                      <LayoutGrid className="text-void/20 dark:text-white/20" size={18} />
                    </div>
                    <div className="text-4xl font-black text-void dark:text-white font-cairo mb-1">{siteStats.p1_projects}</div>
                    <div className="text-sm text-void/60 dark:text-white/60">{t('programs.p1.projects_label')}</div>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-m-green bg-m-green/10 w-fit px-2.5 py-1 rounded-lg">
                      <CheckCircle2 size={12} /><span>{t('programs.p1.projects_done')}</span>
                    </div>
                  </motion.div>
                  <motion.div variants={itemVariants} className="bg-cream dark:bg-[#002E24] border border-black/5 dark:border-white/10 rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-void/40 dark:text-white/40 text-xs font-bold uppercase tracking-wide">{t('ui.beneficiaries')}</span>
                      <Users className="text-void/20 dark:text-white/20" size={18} />
                    </div>
                    <div className="text-4xl font-black text-void dark:text-white font-cairo mb-1">{siteStats.p1_beneficiaries}</div>
                    <div className="text-sm text-void/60 dark:text-white/60">{t('programs.p1.beneficiaries_label')}</div>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-blue-500 bg-blue-500/10 w-fit px-2.5 py-1 rounded-lg">
                      <TrendingUp size={12} /><span>{t('programs.p1.direct_impact')}</span>
                    </div>
                  </motion.div>
                </div>

                {/* Domains */}
                <motion.div variants={itemVariants} className="bg-cream dark:bg-[#002E24] border border-black/5 dark:border-white/10 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <h3 className="text-void dark:text-white font-bold text-base mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-m-green" />{t('programs.p1.domains')}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { label: t('programs.p1.d1.title'), sub: t('programs.p1.d1.desc'), Icon: Droplets, color: 'text-blue-500 bg-blue-500/10' },
                      { label: t('programs.p1.d2.title'), sub: t('programs.p1.d2.desc'), Icon: Map, color: 'text-amber-500 bg-amber-500/10' },
                    ].map(({ label, sub, Icon, color }, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                        <div className={`p-2 rounded-lg shrink-0 ${color}`}><Icon size={18} /></div>
                        <div>
                          <div className="font-semibold text-void dark:text-white text-sm">{label}</div>
                          <div className="text-xs text-void/40 dark:text-white/40">{sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {[t('programs.p1.scope1'), t('programs.p1.scope2'), t('programs.p1.scope3')].map((s, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-xs text-void/60 dark:text-white/60">{s}</span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Program 2 ─────────────────────────────────────────────── */}
      <section className="relative z-20 w-full bg-cream dark:bg-[#001D16] py-20 border-t border-black/5 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-[82%] 2xl:max-w-[1280px] mx-auto">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>

            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-m-red/10 border border-m-red/20 rounded-full text-m-red text-sm font-semibold tracking-wide mb-4">
                <HeartHandshake size={15} />
                <span>{t('programs.p2.tag')}</span>
              </div>
              <h2 className="font-cairo text-3xl md:text-4xl font-black text-void dark:text-white leading-tight tracking-tight mb-4">
                {t('programs.p2.title')}
              </h2>
              <p className="text-void/60 dark:text-white/60 text-base leading-relaxed max-w-2xl mx-auto">
                {t('programs.p2.desc')}
              </p>
            </motion.div>

            {/* Content: Cards | Image (reversed) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

              {/* Stats Cards */}
              <div className="space-y-5">
                {/* Projects + Beneficiaries */}
                <div className="grid grid-cols-2 gap-5">
                  <motion.div variants={itemVariants} className="bg-white dark:bg-[#002E24] border border-black/5 dark:border-white/10 rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-void/40 dark:text-white/40 text-xs font-bold uppercase tracking-wide">{t('programs.p2.projects_label')}</span>
                      <div className="p-2 bg-m-green/10 rounded-lg text-m-green"><LayoutGrid size={16} /></div>
                    </div>
                    <div className="text-4xl font-black text-void dark:text-white font-cairo mb-2">{siteStats.p2_projects}</div>
                    <div className="flex items-center gap-1.5 text-xs text-m-green bg-m-green/10 w-fit px-2.5 py-1 rounded-lg">
                      <CheckCircle2 size={12} /><span>{t('programs.p1.projects_done')}</span>
                    </div>
                  </motion.div>
                  <motion.div variants={itemVariants} className="bg-white dark:bg-[#002E24] border border-black/5 dark:border-white/10 rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-void/40 dark:text-white/40 text-xs font-bold uppercase tracking-wide">{t('programs.p2.beneficiaries_label')}</span>
                      <div className="p-2 bg-m-red rounded-lg text-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"><Users size={16} /></div>
                    </div>
                    <div className="text-4xl font-black text-void dark:text-white font-cairo mb-2">{siteStats.p2_beneficiaries}</div>
                    <div className="text-sm text-void/50 dark:text-white/50">{t('programs.p2.person_fragile')}</div>
                  </motion.div>
                </div>

                {/* Financial Data */}
                <motion.div variants={itemVariants} className="bg-white dark:bg-[#002E24] border border-black/5 dark:border-white/10 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
                        <Wallet size={20} className="text-void dark:text-white" />
                      </div>
                      <h3 className="font-bold text-void dark:text-white text-base">{t('programs.p2.financial_data')}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-black text-void dark:text-white font-cairo">{siteStats.p2_budget}</div>
                      <div className="text-xs font-bold text-void/40 dark:text-white/40 uppercase tracking-widest">{t('ui.mdh')}</div>
                    </div>
                  </div>
                  <p className="text-sm text-void/40 dark:text-white/40 leading-relaxed">{t('programs.p2.financial_desc')}</p>
                </motion.div>

                {/* Services */}
                <motion.div variants={itemVariants} className="bg-white dark:bg-[#002E24] border border-black/5 dark:border-white/10 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <h3 className="font-bold text-void dark:text-white text-base mb-4 flex items-center gap-2 border-b border-black/5 dark:border-white/5 pb-3">
                    <Activity size={18} className="text-m-red" />{t('programs.p2.services')}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    {services.map((service, i) => (
                      <div key={i} className="flex items-start gap-2 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-m-red/50 shrink-0" />
                        <span className="text-sm text-void/70 dark:text-white/70 leading-relaxed">{service}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Target Groups - in a card */}
                <motion.div variants={itemVariants} className="bg-white dark:bg-[#002E24] border border-black/5 dark:border-white/10 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <h3 className="font-bold text-void dark:text-white text-base mb-4 flex items-center gap-2 border-b border-black/5 dark:border-white/5 pb-3">
                    <Users size={18} className="text-m-red" />{t('programs.p2.targets')}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {targetGroups.map((tag, i) => (
                      <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                        <div className="w-2 h-2 rounded-full bg-m-red/60 shrink-0" />
                        <span className="text-sm font-medium text-void/80 dark:text-white/80">{tag}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Image */}
              <motion.div variants={itemVariants} className="relative min-h-[400px] h-full rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 group shadow-xl">
                <img src={siteImages.programs_p2} alt="Social Support" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-m-red/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-wider mb-2">
                    <Building2 size={14} /><span>{t('programs.p2.reception')}</span>
                  </div>
                  <div className="text-white font-black text-2xl leading-tight">{t('programs.p2.slogan')}</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Program 3 ─────────────────────────────────────────────── */}
      <section className="relative z-20 w-full bg-white dark:bg-[#00150F] py-20 border-t border-black/5 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-[82%] 2xl:max-w-[1280px] mx-auto">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>

            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-500 text-sm font-semibold tracking-wide mb-4">
                <Briefcase size={15} />
                <span>{t('programs.p3.tag')}</span>
              </div>
              <h2 className="font-cairo text-3xl md:text-4xl font-black text-void dark:text-white leading-tight tracking-tight mb-4">
                {t('programs.p3.title')}
              </h2>
              <p className="text-void/60 dark:text-white/60 text-base leading-relaxed max-w-2xl mx-auto">
                {t('programs.p3.desc')}
              </p>
            </motion.div>

            {/* Content: Image | Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

              {/* Image */}
              <motion.div variants={itemVariants} className="relative h-full w-full rounded-3xl min-h-[400px] overflow-hidden border border-black/5 dark:border-white/10 group shadow-xl">
                <img src={siteImages.programs_p3} alt="Youth Entrepreneurship" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-wider mb-2">
                    <Lightbulb size={14} /><span>{t('programs.p3.initiative')}</span>
                  </div>
                  <div className="text-white font-black text-2xl leading-tight">{t('programs.p3.slogan')}</div>
                </div>
              </motion.div>

              {/* Stats Cards */}
              <div className="space-y-5">
                {/* Budget */}
                <motion.div variants={itemVariants} className="bg-cream dark:bg-[#002E24] border border-black/5 dark:border-white/10 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-blue-500 font-bold text-sm mb-1">{t('ui.budget')}</p>
                      <div className="text-5xl font-black text-void dark:text-white font-cairo">{siteStats.p3_budget}</div>
                      <div className="text-void/40 dark:text-white/40 font-bold text-base">{t('ui.mdh')}</div>
                    </div>
                    <div className="p-3 bg-blue-500/10 rounded-xl"><Wallet className="text-blue-500" size={24} /></div>
                  </div>
                </motion.div>

                {/* 4-stat grid */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: t('ui.projects'), val: siteStats.p3_projects, sub: t('programs.p3.youth_projects'), Icon: LayoutGrid, color: 'text-blue-500 bg-blue-500/10' },
                    { label: t('ui.beneficiaries'), val: siteStats.p3_beneficiaries, sub: t('programs.p3.young_person'), Icon: Users, color: 'text-blue-500 bg-blue-500/10' },
                    { label: t('activity.3.cat'), val: siteStats.p3_startups, sub: t('programs.p3.startups'), Icon: Lightbulb, color: 'text-amber-500 bg-amber-500/10' },
                    { label: t('achievements.pillar.3.title'), val: siteStats.p3_coops, sub: t('programs.p3.coops'), Icon: HeartHandshake, color: 'text-emerald-500 bg-emerald-500/10' },
                  ].map(({ label, val, sub, Icon, color }, i) => (
                    <motion.div key={i} variants={itemVariants} className="bg-cream dark:bg-[#002E24] border border-black/5 dark:border-white/10 rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <div className={`p-2 rounded-lg ${color}`}><Icon size={16} /></div>
                        <span className="text-xs text-void/40 dark:text-white/40 font-bold uppercase tracking-wide text-right max-w-[80px] leading-tight">{label}</span>
                      </div>
                      <div className="text-3xl font-black text-void dark:text-white font-cairo mb-1">{val}</div>
                      <div className="text-xs text-void/60 dark:text-white/60">{sub}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Strategy & Targets */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants} className="bg-cream dark:bg-[#002E24] border border-black/5 dark:border-white/10 rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <h3 className="text-void dark:text-white font-bold text-sm mb-3 flex items-center gap-2">
                      <Zap className="text-blue-500" size={16} />{t('programs.p3.strategy')}
                    </h3>
                    <ul className="space-y-2">
                      {youthStrategy.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-void/70 dark:text-white/70">
                          <CheckCircle2 className="text-blue-500 shrink-0 mt-0.5" size={14} />{item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                  <motion.div variants={itemVariants} className="bg-cream dark:bg-[#002E24] border border-black/5 dark:border-white/10 rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <h3 className="text-void dark:text-white font-bold text-sm mb-3 flex items-center gap-2">
                      <Target className="text-m-red" size={16} />{t('programs.p2.targets')}
                    </h3>
                    <ul className="space-y-2">
                      {youthTargetGroups.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-void/70 dark:text-white/70">
                          <Users className="text-m-red shrink-0 mt-0.5" size={14} />{item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Program 4 ─────────────────────────────────────────────── */}
      <section className="relative z-20 w-full bg-cream dark:bg-[#00120B] py-20 border-t border-black/5 dark:border-white/5 transition-colors duration-500">
        <div className="max-w-[82%] 2xl:max-w-[1280px] mx-auto">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>

            {/* Section Header */}
            <motion.div variants={itemVariants} className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 text-sm font-semibold tracking-wide mb-4">
                <Baby size={15} />
                <span>{t('programs.p4.tag')}</span>
              </div>
              <h2 className="font-cairo text-3xl md:text-4xl font-black text-void dark:text-white leading-tight tracking-tight mb-4">
                {t('programs.p4.title')}
              </h2>
              <p className="text-void/60 dark:text-white/60 text-base leading-relaxed max-w-2xl mx-auto">
                {t('programs.p4.desc')}
              </p>
            </motion.div>

            {/* Content: Cards | Image (reversed) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">

              {/* Stats Cards */}
              <div className="space-y-5">
                {/* Budget */}
                <motion.div variants={itemVariants} className="bg-white dark:bg-[#002E24] border border-black/5 dark:border-white/10 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-amber-500 font-bold text-sm mb-1">{t('ui.budget')}</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-black text-void dark:text-white font-cairo">{siteStats.p4_budget}</span>
                        <span className="text-sm text-void/40 dark:text-white/40 font-bold">{t('ui.mdh')}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500"><Wallet size={24} /></div>
                  </div>
                </motion.div>

                {/* Projects + Beneficiaries */}
                <motion.div variants={itemVariants} className="bg-white dark:bg-[#002E24] border border-black/5 dark:border-white/10 rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-xs text-void/40 dark:text-white/40 font-bold uppercase mb-1">{t('ui.projects')}</p>
                      <div className="text-4xl font-black text-void dark:text-white font-cairo">{siteStats.p4_projects}</div>
                      <p className="text-xs text-amber-500 mt-1">{t('achievements.stat.projects_done')}</p>
                    </div>
                    <div className="w-px h-14 bg-black/10 dark:bg-white/10" />
                    <div>
                      <p className="text-xs text-void/40 dark:text-white/40 font-bold uppercase mb-1">{t('ui.beneficiaries')}</p>
                      <div className="text-4xl font-black text-void dark:text-white font-cairo">{siteStats.p4_beneficiaries}</div>
                      <p className="text-xs text-void/50 dark:text-white/50 mt-1">~10.6 {t('achievements.stat.yearly_avg')}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Detailed Breakdown */}
                <motion.div variants={itemVariants} className="bg-white dark:bg-[#002E24] border border-black/5 dark:border-white/10 rounded-2xl p-6 space-y-3 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  {[
                    { Icon: GraduationCap, label: t('programs.p4.school_support'), val: siteStats.p4_school_support },
                    { Icon: Heart, label: t('programs.p4.health_mother'), val: siteStats.p4_health },
                    { Icon: Baby, label: t('programs.p4.preschool'), val: siteStats.p4_preschool },
                  ].map(({ Icon, label, val }, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500"><Icon size={16} /></div>
                        <span className="text-void dark:text-white font-semibold text-sm">{label}</span>
                      </div>
                      <span className="font-bold text-void dark:text-white font-mono text-base">{val}</span>
                    </div>
                  ))}
                </motion.div>

                {/* Targets & Impact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants} className="bg-white dark:bg-[#002E24] border border-black/5 dark:border-white/10 rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <h3 className="text-void dark:text-white font-bold text-sm mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500" />{t('programs.p2.targets')}
                    </h3>
                    <ul className="space-y-2">
                      {p4TargetGroups.map((g, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-void/70 dark:text-white/70">
                          <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500/50 shrink-0" />{g}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                  <motion.div variants={itemVariants} className="bg-white dark:bg-[#002E24] border border-black/5 dark:border-white/10 rounded-2xl p-5 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <h3 className="text-void dark:text-white font-bold text-sm mb-3 flex items-center gap-2">
                      <Smile className="text-amber-500" size={16} />{t('programs.p4.impact')}
                    </h3>
                    <ul className="space-y-2">
                      {p4Impact.map((impact, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-void/70 dark:text-white/70">
                          <CheckCircle2 className="text-amber-500 shrink-0 mt-0.5" size={14} />{impact}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>

              {/* Image */}
              <motion.div variants={itemVariants} className="relative min-h-[400px] h-full rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 group shadow-xl">
                <img src={siteImages.programs_p4} alt="Education and Child Care" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="inline-block px-4 py-2 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 text-white font-bold mb-2 text-sm">
                    {t('programs.p4.care')}
                  </div>
                  <p className="text-white/90 text-base font-light">{t('programs.p4.slogan')}</p>
                </div>
              </motion.div>
            </div>

            {/* Navigate to Governance - properly centered and wider */}
            <div className="mt-14 flex justify-center w-full">
              <button onClick={() => onNavigate('governance')} className="group relative px-12 py-5 bg-transparent border-2 border-black/20 dark:border-white/20 rounded-full overflow-hidden hover:border-m-red hover:bg-m-red/5 transition-all">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center gap-3">
                  <span className="text-lg font-bold text-void dark:text-white group-hover:text-m-red transition-colors">{t('nav.history')}</span>
                  <div className="w-8 h-8 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center group-hover:bg-m-red group-hover:text-white transition-all">
                    <History size={16} />
                  </div>
                </div>
              </button>
            </div>

          </motion.div>
        </div>
      </section>
      <Footer />
    </div >
  );
};

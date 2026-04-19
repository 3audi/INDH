import React from 'react';
import { motion } from 'framer-motion';
import { Star, Target, Users, TrendingUp, CheckCircle2, BookOpen } from 'lucide-react';
import { AmbientBackground } from './ui/AmbientBackground';
import { PageHero } from './ui/PageHero';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useLanguage } from './LanguageContext';
import { useContent } from './ContentContext';
import { useNavigate } from 'react-router-dom';

export const AboutPage: React.FC = () => {
    const { t, dir, language } = useLanguage();
    const navigate = useNavigate();
    const { siteImages } = useContent();

    // Multilingual phases data
    const phases = [
        {
            title: language === 'ar' ? 'المرحلة الأولى' : language === 'fr' ? 'Phase I' : 'Phase I',
            years: '2005 - 2010',
            color: 'text-m-green',
            border: 'border-m-green/30',
            bg: 'bg-m-green/5 dark:bg-m-green/10',
            items: language === 'ar'
                ? ['محاربة الفقر في الوسط القروي', 'محاربة الإقصاء الاجتماعي بالوسط الحضري', 'محاربة الهشاشة', 'البرنامج الأفقي', 'التأهيل الترابي']
                : language === 'fr'
                    ? ['Lutte contre la pauvreté en milieu rural', 'Lutte contre l\'exclusion sociale en milieu urbain', 'Lutte contre la précarité', 'Programme transversal', 'Mise à niveau territoriale']
                    : ['Fight against rural poverty', 'Fight against urban social exclusion', 'Fight against precariousness', 'Transversal program', 'Territorial upgrading'],
        },
        {
            title: language === 'ar' ? 'المرحلة الثانية' : language === 'fr' ? 'Phase II' : 'Phase II',
            years: '2011 - 2018',
            color: 'text-m-red keep-red',
            border: 'border-m-red/30',
            bg: 'bg-m-red/5 dark:bg-m-red/10',
            items: language === 'ar'
                ? ['محاربة الفقر في الوسط القروي', 'محاربة الإقصاء الاجتماعي بالوسط الحضري', 'محاربة الهشاشة', 'البرنامج الأفقي', 'التأهيل الترابي']
                : language === 'fr'
                    ? ['Lutte contre la pauvreté en milieu rural', 'Lutte contre l\'exclusion sociale en milieu urbain', 'Lutte contre la précarité', 'Programme transversal', 'Mise à niveau territoriale']
                    : ['Fight against rural poverty', 'Fight against urban social exclusion', 'Fight against precariousness', 'Transversal program', 'Territorial upgrading'],
        },
        {
            title: language === 'ar' ? 'المرحلة الثالثة' : language === 'fr' ? 'Phase III' : 'Phase III',
            years: '2019 - 2025',
            color: 'text-amber-500',
            border: 'border-amber-500/30',
            bg: 'bg-amber-500/5 dark:bg-amber-500/10',
            items: language === 'ar'
                ? ['تدارك الخصاص على مستوى البنيات التحتية والخدمات الأساسية الاجتماعية', 'مواكبة الأشخاص في وضعية هشاشة', 'تحسين الدخل والادماج الاقتصادي للشباب', 'الدفع بالتنمية البشرية للأجيال الصاعدة']
                : language === 'fr'
                    ? ['Rattrapage des déficits en infrastructures et services sociaux de base', 'Accompagnement des personnes en situation de précarité', 'Amélioration du revenu et inclusion économique des jeunes', 'Impulsion du capital humain des générations montantes']
                    : ['Addressing infrastructure and basic social service deficits', 'Supporting persons in vulnerable situations', 'Improving income and economic integration of youth', 'Boosting human capital of rising generations'],
        },
    ];

    const goals = language === 'ar'
        ? [
            { icon: Users, color: 'text-m-green bg-m-green/10', title: 'تحسين الولوج للخدمات والبنيات التحتية الأساسية', desc: 'تسهيل استفادة الساكنة، خاصة في المناطق الأقل تجهيزاً، من الخدمات الضرورية كالتعليم والصحة والماء الصالح للشرب والكهرباء والطرق.' },
            { icon: Target, color: 'text-m-red bg-m-red/10', title: 'محاربة الفقر والاقصاء الاجتماعي', desc: 'العمل على تقليص نسب الفقر والتهميش في مختلف مناطق المغرب، سواء في الوسط القروي أو الحضري.' },
            { icon: TrendingUp, color: 'text-amber-500 bg-amber-500/10', title: 'تقوية القدرات', desc: 'تمكين الفاعلين المحليين والمستفيدين من خلال برامج التكوين والتأطير لضمان استدامة المشاريع وتحقيق التنمية الذاتية.' },
            { icon: BookOpen, color: 'text-blue-500 bg-blue-500/10', title: 'دعم الأنشطة المدرة للدخل', desc: 'تشجيع ومساندة المشاريع الصغرى والمتوسطة التي تساهم في خلق فرص الشغل وتحسين مداخيل الأفراد والأسر.' },
            { icon: CheckCircle2, color: 'text-purple-500 bg-purple-500/10', title: 'دعم الأشخاص في وضعية هشاشة', desc: 'تقديم المساعدة اللازمة للفئات الأكثر احتياجاً في المجتمع، كالأشخاص ذوي الإعاقة، والنساء في وضعية صعبة، والأطفال، وكبار السن.' },
        ]
        : language === 'fr'
            ? [
                { icon: Users, color: 'text-m-green bg-m-green/10', title: 'Améliorer l\'accès aux services et infrastructures de base', desc: 'Faciliter l\'accès de la population, principalement dans les zones les moins équipées, aux services essentiels : éducation, santé, eau potable, électricité et routes.' },
                { icon: Target, color: 'text-m-red bg-m-red/10', title: 'Lutter contre la pauvreté et l\'exclusion sociale', desc: 'Réduire les taux de pauvreté et de marginalisation dans les différentes régions du Maroc, rural comme urbain.' },
                { icon: TrendingUp, color: 'text-amber-500 bg-amber-500/10', title: 'Renforcer les capacités', desc: 'Autonomiser les acteurs locaux et les bénéficiaires à travers des programmes de formation pour assurer la durabilité des projets.' },
                { icon: BookOpen, color: 'text-blue-500 bg-blue-500/10', title: 'Soutenir les activités génératrices de revenus', desc: 'Encourager et accompagner les petites et moyennes entreprises qui contribuent à créer des emplois et améliorer les revenus.' },
                { icon: CheckCircle2, color: 'text-purple-500 bg-purple-500/10', title: 'Soutenir les personnes en situation de précarité', desc: 'Apporter l\'aide nécessaire aux catégories les plus vulnérables : personnes handicapées, femmes en difficulté, enfants et personnes âgées.' },
            ]
            : [
                { icon: Users, color: 'text-m-green bg-m-green/10', title: 'Improve Access to Basic Services and Infrastructure', desc: 'Facilitate access for the population, especially in less equipped areas, to essential services such as education, health, drinking water, electricity and roads.' },
                { icon: Target, color: 'text-m-red bg-m-red/10', title: 'Fight Poverty and Social Exclusion', desc: 'Work to reduce poverty and marginalization rates in different regions of Morocco, both rural and urban.' },
                { icon: TrendingUp, color: 'text-amber-500 bg-amber-500/10', title: 'Strengthen Capacities', desc: 'Empower local actors and beneficiaries through training and support programs to ensure project sustainability and self-driven development.' },
                { icon: BookOpen, color: 'text-blue-500 bg-blue-500/10', title: 'Support Income-Generating Activities', desc: 'Encourage and support small and medium-sized projects that contribute to job creation and improving household incomes.' },
                { icon: CheckCircle2, color: 'text-purple-500 bg-purple-500/10', title: 'Support Vulnerable Persons', desc: 'Provide necessary assistance to the most needy groups: persons with disabilities, women in difficult situations, children and the elderly.' },
            ];

    const introParagraph1 = language === 'ar'
        ? <>المبادرة الوطنية للتنمية البشرية المعروفة اختصاراً بـ <span className="font-black text-m-green font-cairo">INDH</span> هي مشروع تنموي ملكي انطلق رسمياً بعد الخطاب الملكي في 18 ماي 2005، ويستهدف تحسين الأوضاع الاقتصادية والاجتماعية للفئات الفقيرة وجعل المواطن المغربي أساس الرهان التنموي، وذلك عبر تبني منهج تنظيمي خاص قوامه الاندماج والمشاركة.</>
        : language === 'fr'
            ? <>L\'Initiative Nationale pour le Développement Humain, connue sous l\'acronyme <span className="font-black text-m-green font-cairo">INDH</span>, est un projet royal de développement lancé officiellement après le Discours Royal du 18 mai 2005. Elle vise à améliorer les conditions économiques et sociales des catégories défavorisées et à faire du citoyen marocain le cœur du pari développemental.</>
            : <>The National Initiative for Human Development, known by the acronym <span className="font-black text-m-green font-cairo">INDH</span>, is a royal development project officially launched following the Royal Speech of May 18, 2005. It aims to improve the economic and social conditions of disadvantaged categories and to make the Moroccan citizen the core of the development challenge.</>;

    const introParagraph2 = language === 'ar'
        ? 'تهدف المبادرة الوطنية للتنمية البشرية، إلى محاربة الفقر والهشاشة والإقصاء الاجتماعي، ومساهمة المواطنين المعنيين في تشخيص حاجياتهم ومطالبهم وتحقيقها، إضافة إلى الحكامة الجيدة مع إشراك كل الفاعلين في التنمية وفي اتخاذ القرار.'
        : language === 'fr'
            ? 'L\'Initiative Nationale pour le Développement Humain vise à lutter contre la pauvreté, la précarité et l\'exclusion sociale, à encourager la participation des citoyens concernés dans le diagnostic de leurs besoins et aspirations, et à promouvoir une bonne gouvernance avec l\'implication de tous les acteurs dans le développement et la prise de décision.'
            : 'The National Initiative for Human Development aims to combat poverty, precariousness and social exclusion, to encourage the participation of concerned citizens in diagnosing their needs and aspirations, and to promote good governance with the involvement of all actors in development and decision-making.';

    const labelsMap = {
        goals_tag: { ar: 'الأهداف', fr: 'Objectifs', en: 'Goals' },
        goals_title: { ar: 'أهداف المبادرة الوطنية للتنمية البشرية', fr: 'Objectifs de l\'INDH', en: 'INDH Objectives' },
        phases_tag: { ar: 'التطور', fr: 'Évolution', en: 'Evolution' },
        phases_title: { ar: 'مراحل تطور المبادرة الوطنية للتنمية البشرية', fr: 'Phases de développement de l\'INDH', en: 'INDH Development Phases' },
    };
    const lbl = (key: keyof typeof labelsMap) => labelsMap[key][language as 'ar' | 'fr' | 'en'] || labelsMap[key].ar;

    const heroData = {
        badge: { ar: 'INDH | منذ 2005', fr: 'INDH | Depuis 2005', en: 'INDH | Since 2005' },
        title: { ar: 'المبادرة الوطنية للتنمية البشرية', fr: 'Initiative Nationale pour le Développement Humain', en: 'National Initiative for Human Development' },
        desc: { ar: 'مشروع تنموي ملكي انطلق رسمياً بعد الخطاب الملكي في 18 ماي 2005، يستهدف تحسين الأوضاع الاقتصادية والاجتماعية للفئات الفقيرة.', fr: 'Un projet royal de développement lancé officiellement le 18 mai 2005, visant à améliorer les conditions économiques et sociales des catégories défavorisées.', en: 'A royal development project officially launched on May 18, 2005, aimed at improving the economic and social conditions of disadvantaged categories.' },
    };

    return (
        <div className="min-h-screen w-full bg-cream dark:bg-void text-void dark:text-white font-sans selection:bg-m-red selection:text-white overflow-x-hidden transition-colors duration-500" dir={dir}>
            <AmbientBackground opacity={0.3} />
            <Navbar />

            <PageHero
                badge={heroData.badge[language as 'ar' | 'fr' | 'en'] || heroData.badge.ar}
                title={heroData.title[language as 'ar' | 'fr' | 'en'] || heroData.title.ar}
                description={heroData.desc[language as 'ar' | 'fr' | 'en'] || heroData.desc.ar}
                bgImage={siteImages.about_hero}
            />

            {/* Summary Intro */}
            <section className="relative z-20 w-full bg-white dark:bg-[#00241B] py-16 md:py-24 border-t border-black/5 dark:border-white/5">
                <div className="max-w-[82%] 2xl:max-w-[1280px] mx-auto">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                        <div className="max-w-4xl mx-auto space-y-6 text-center">
                            <p className="text-void/80 dark:text-white/80 text-lg md:text-xl leading-loose font-sans">
                                {introParagraph1}
                            </p>
                            <p className="text-void/70 dark:text-white/70 text-base md:text-lg leading-loose font-sans">
                                {introParagraph2}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Goals */}
            <section className="relative z-20 w-full bg-cream dark:bg-void py-16 md:py-24 border-t border-black/5 dark:border-white/5">
                <div className="max-w-[82%] 2xl:max-w-[1280px] mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <span className="text-xs font-bold text-m-red uppercase tracking-widest font-sans">{lbl('goals_tag')}</span>
                        <h2 className="font-cairo text-4xl md:text-5xl font-black text-void dark:text-white mt-3">
                            {lbl('goals_title')}
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-m-red to-m-green rounded-full mx-auto mt-4" />
                    </motion.div>
                    <div className="flex flex-col gap-6">
                        {/* First Row: 3 Items */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {goals.slice(0, 3).map((goal, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="bg-white dark:bg-[#00241B] border border-black/5 dark:border-white/10 rounded-3xl p-6 hover:shadow-xl dark:hover:border-white/20 transition-all group"
                                >
                                    <div className={`w-12 h-12 rounded-2xl ${goal.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                        <goal.icon size={22} />
                                    </div>
                                    <h3 className="font-cairo text-lg font-bold text-void dark:text-white mb-3 leading-tight">{goal.title}</h3>
                                    <p className="text-void/60 dark:text-white/60 text-sm leading-relaxed font-sans">{goal.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                        {/* Second Row: 2 Items Centered */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:w-2/3 lg:mx-auto">
                            {goals.slice(3).map((goal, i) => (
                                <motion.div
                                    key={i + 3}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: (i + 3) * 0.1 }}
                                    className="bg-white dark:bg-[#00241B] border border-black/5 dark:border-white/10 rounded-3xl p-6 hover:shadow-xl dark:hover:border-white/20 transition-all group"
                                >
                                    <div className={`w-12 h-12 rounded-2xl ${goal.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                        <goal.icon size={22} />
                                    </div>
                                    <h3 className="font-cairo text-lg font-bold text-void dark:text-white mb-3 leading-tight">{goal.title}</h3>
                                    <p className="text-void/60 dark:text-white/60 text-sm leading-relaxed font-sans">{goal.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Phases */}
            <section className="relative z-20 w-full bg-white dark:bg-[#00241B] py-16 md:py-24 border-t border-black/5 dark:border-white/5">
                <div className="max-w-[82%] 2xl:max-w-[1280px] mx-auto">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
                        <span className="text-xs font-bold text-m-green uppercase tracking-widest font-sans">{lbl('phases_tag')}</span>
                        <h2 className="font-cairo text-4xl md:text-5xl font-black text-void dark:text-white mt-3">
                            {lbl('phases_title')}
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-m-red to-m-green rounded-full mx-auto mt-4" />
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {phases.map((phase, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className={`border ${phase.border} ${phase.bg} rounded-3xl p-8`}
                            >
                                <div className="flex items-baseline gap-3 mb-6">
                                    <h3 className={`font-cairo text-2xl font-black ${phase.color}`}>{phase.title}</h3>
                                    <span className={`text-sm font-mono font-bold ${phase.color} opacity-70`}>{phase.years}</span>
                                </div>
                                <ul className="space-y-3">
                                    {phase.items.map((item, j) => (
                                        <li key={j} className="flex items-start gap-3 text-void/80 dark:text-white/80 text-sm font-sans leading-relaxed">
                                            <CheckCircle2 className={`${phase.color} shrink-0 mt-0.5`} size={15} />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer onLoginClick={() => navigate('/login')} />
        </div>
    );
};

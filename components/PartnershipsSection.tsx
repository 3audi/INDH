import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from './LanguageContext';
import { Building2, Users, Handshake, Target, Shield } from 'lucide-react';

export const PartnershipsSection: React.FC = () => {
    const { t, dir } = useLanguage();

    const partners = [
        {
            id: 1,
            label: t('partners.c1'),
            icon: Building2,
            color: 'bg-m-green',
        },
        {
            id: 2,
            label: t('partners.c2'),
            icon: Users,
            color: 'bg-m-red',
        },
        {
            id: 3,
            label: t('partners.c3'),
            icon: Handshake,
            color: 'bg-m-green',
        },
        {
            id: 4,
            label: t('partners.c4'),
            icon: Target,
            color: 'bg-m-red',
        }
    ];

    return (
        <section id="partnerships" className="relative py-24 overflow-hidden bg-slate-50 dark:bg-[#00241B] transition-colors duration-500" dir={dir}>
            <div className="relative max-w-7xl mx-auto px-6">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-m-green/20 border border-m-green/30 mb-6"
                    >
                        <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">{t('partners.badge')}</span>
                        <Shield size={16} className="text-emerald-500" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-5xl font-black text-void dark:text-white mb-4 font-cairo"
                    >
                        {t('partners.title')}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg text-void/60 dark:text-white/60 max-w-2xl mx-auto font-sans"
                    >
                        {t('partners.subtitle')}
                    </motion.p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {partners.map((partner, index) => (
                        <motion.div
                            key={partner.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="flex flex-col items-center justify-center p-10 rounded-2xl bg-white dark:bg-[#1a2622] border border-black/5 dark:border-white/5 hover:border-m-green/30 transition-all duration-300 hover:shadow-xl group shadow-sm dark:shadow-none"
                        >
                            <div className={`w-16 h-16 rounded-full ${partner.color} flex items-center justify-center mb-6 text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                <partner.icon size={28} strokeWidth={2} />
                            </div>
                            <h3 className="text-base font-bold text-void dark:text-white text-center font-cairo">
                                {partner.label}
                            </h3>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};

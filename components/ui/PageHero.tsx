import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface PageHeroProps {
    /** Short uppercase badge text e.g. "المرحلة الثالثة" */
    badge: string;
    /** Main h1 title */
    title: string;
    /** Subtitle / secondary title */
    subtitle?: string;
    /** Subtitle / description paragraph */
    description: string;
    /**
     * Optional background image URL.
     * If omitted, a green→red gradient is used instead.
     */
    bgImage?: string;
}

/**
 * Unified hero section used by every inner page.
 * Layout: Full screen (h-screen) | badge pill → h1 (Cairo Black) → gradient line → description.
 */
export const PageHero: React.FC<PageHeroProps> = ({ badge, title, subtitle, description, bgImage }) => (
    <header className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden pt-20 group">
        {/* ── Background ─────────────────────────────────────────────── */}
        <div className="absolute inset-0 z-0">
            {bgImage ? (
                <>
                    <img
                        src={bgImage}
                        alt=""
                        className="w-full h-full object-cover opacity-40 contrast-125 select-none pointer-events-none group-hover:scale-110 transition-transform duration-1000"
                    />
                    {/* Light-mode fade to page bg */}
                    <div className="absolute inset-0 bg-gradient-to-b from-cream/60 via-cream/80 to-cream dark:hidden" />
                    {/* Dark-mode fade to page bg */}
                    <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-void/80 to-void hidden dark:block" />
                </>
            ) : (
                <>
                    {/* Gradient fallback when no image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-m-green/20 via-void to-m-red/20 dark:from-m-green/30 dark:via-void dark:to-m-red/30" />
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-m-green/10 rounded-full blur-[120px] animate-pulse" />
                    <div
                        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-m-red/10 rounded-full blur-[120px] animate-pulse"
                        style={{ animationDelay: '2s' }}
                    />
                    {/* Fade to page bg */}
                    <div className="absolute inset-0 bg-gradient-to-b from-cream/0 to-cream dark:from-void/0 dark:to-void" />
                </>
            )}
        </div>

        {/* ── Content ────────────────────────────────────────────────── */}
        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto w-full">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center"
            >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-void/10 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-md mb-6">
                    <Star className="w-3.5 h-3.5 text-m-red fill-m-red animate-pulse" />
                    <span className="text-xs font-bold text-void/80 dark:text-white/80 uppercase tracking-widest font-sans">
                        {badge}
                    </span>
                </div>

                {/* Title */}
                <h1 className="font-cairo font-black text-5xl md:text-7xl tracking-tight text-void dark:text-white mb-5 leading-tight drop-shadow-2xl">
                    {title}
                </h1>

                {subtitle && (
                    <h2 className="text-2xl md:text-3xl font-cairo font-bold text-void/90 dark:text-white/90 mb-4 leading-relaxed max-w-4xl mx-auto">
                        {subtitle}
                    </h2>
                )}

                {/* Gradient underline */}
                <div className="w-24 h-1.5 bg-gradient-to-r from-m-red to-m-green rounded-full mb-6" />

                {/* Description */}
                <p className="text-void/70 dark:text-white/70 text-lg md:text-xl font-sans font-light max-w-3xl mx-auto leading-relaxed">
                    {description}
                </p>
            </motion.div>
        </div>
    </header>
);

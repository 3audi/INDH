import React, { useState } from 'react';
import { Menu, X, Moon, Sun, Globe, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { useLanguage } from './LanguageContext';

interface NavbarProps {
  onNavigate?: (page: string) => void; // kept for backwards compat, unused
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t, dir } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: t('nav.home'), path: '/' },
    { label: t('nav.about'), path: '/about' },
    { label: t('nav.phases'), path: '/phases' },
    { label: t('nav.programs'), path: '/programs' },
    { label: t('nav.gallery'), path: '/activities' },
    { label: t('nav.history'), path: '/governance' },
    { label: t('nav.youth_platform'), path: '/youth-platform' },
    { label: t('nav.contact'), path: '/contact' },
  ];

  const languages = [
    { code: 'ar', label: 'العربية' },
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none" dir={dir}>
        <div className="pointer-events-auto bg-white/60 dark:bg-void/60 backdrop-blur-xl border border-black/5 dark:border-glass-border rounded-full px-10 py-4 md:py-5 flex items-center justify-between gap-6 md:gap-14 shadow-2xl shadow-black/10 dark:shadow-black/50 transition-colors duration-500">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <img
              src="/img/logo-light.png"
              alt="INDH Logo"
              className="h-10 w-auto block dark:hidden object-contain"
            />
            <img
              src="/img/logo-dark.png"
              alt="INDH Logo"
              className="h-10 w-auto hidden dark:block object-contain"
            />
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-bold transition-all text-[13px] md:text-[15px] ${language === 'ar' ? 'uppercase tracking-widest' : 'tracking-wide'} ${isActive
                    ? 'text-m-red'
                    : 'text-void/80 dark:text-white/80 hover:text-m-red hover:scale-105'
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="h-10 px-3 rounded-full flex items-center justify-center gap-2 bg-black/5 dark:bg-white/5 text-void dark:text-white hover:bg-m-green/10 dark:hover:bg-white/10 transition-colors"
                aria-label="Switch Language"
              >
                <Globe size={16} />
                <span className="font-mono text-xs font-bold uppercase hidden sm:block">{language}</span>
                <ChevronDown size={12} className={`transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className={`absolute top-full mt-2 ${dir === 'rtl' ? 'left-0' : 'right-0'} min-w-[160px] bg-white/90 dark:bg-void/90 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden p-2 flex flex-col gap-1 z-50`}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code as any);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 rounded-xl flex items-center justify-between text-sm transition-all group
                           ${language === lang.code
                            ? 'bg-m-green/10 text-m-green font-bold'
                            : 'text-void/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 hover:text-void dark:hover:text-white'
                          }`}
                      >
                        <span>{lang.label}</span>
                        {language === lang.code && <Check size={14} />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 text-void dark:text-white hover:bg-m-green/10 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              className="md:hidden text-void/80 dark:text-white/80 hover:text-void dark:hover:text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-cream dark:bg-void pt-32 px-6 md:hidden transition-colors duration-500"
            dir={dir}
          >
            <div className="flex flex-col gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-light tracking-tighter text-void/80 dark:text-white/80 hover:text-m-red transition-colors border-b border-black/10 dark:border-white/10 pb-4"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
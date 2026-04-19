import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone, Heart } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface FooterProps {
  onLoginClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onLoginClick }) => {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-white dark:bg-[#00150F] border-t border-black/5 dark:border-white/5 pt-20 pb-10 px-6 md:px-12 overflow-hidden transition-colors duration-500">
      {/* Decorative Gradients */}
      <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-m-red/50 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-m-green/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[82%] 2xl:max-w-[1280px] mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img
                src="/img/logo-light.png"
                alt="INDH Logo"
                className="h-12 w-auto block dark:hidden object-contain"
              />
              <img
                src="/img/logo-dark.png"
                alt="INDH Logo"
                className="h-12 w-auto hidden dark:block object-contain"
              />
              <div className="flex flex-col">
                <span className="font-bold text-void dark:text-white leading-none mb-1">{t('hero.title.prefix')}</span>
                <span className="text-xs text-void/50 dark:text-white/50">{t('hero.title.suffix')}</span>
              </div>
            </div>
            <p className="text-void/40 dark:text-white/40 text-sm leading-relaxed max-w-xs">
              {t('footer.desc')}
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Facebook, url: 'https://www.facebook.com/INDH.ProvinceBoujdour' },
                { Icon: Instagram, url: 'https://www.instagram.com/pjboujdour.ma' },
                { Icon: Youtube, url: 'https://www.youtube.com/@indh.boujdourt' }
              ].map(({ Icon, url }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center text-void/40 dark:text-white/40 hover:bg-m-red hover:text-white hover:border-m-red transition-all duration-300"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="text-void dark:text-white font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-m-red rounded-full"></span>
              {t('footer.quick_links')}
            </h4>
            <ul className="space-y-3">
              {[
                { label: t('nav.programs'), to: '/programs' },
                { label: t('nav.phases'), to: '/phases' },
                { label: t('nav.history'), to: '/history' },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-void/40 dark:text-white/40 hover:text-m-green transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-void/20 dark:bg-white/20 rounded-full group-hover:w-2 transition-all" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="text-void dark:text-white font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-m-green rounded-full"></span>
              {t('footer.platforms')}
            </h4>
            <ul className="space-y-3">
              {[
                { label: t('nav.youth_platform'), to: '/youth-platform' },
                { label: t('nav.gallery'), to: '/activities' },
                { label: t('nav.about'), to: '/about' },
                { label: t('nav.contact'), to: '/contact' },
              ].map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-sm text-void/40 dark:text-white/40 hover:text-m-red transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-void/20 dark:bg-white/20 rounded-full group-hover:w-2 transition-all" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-void dark:text-white font-bold mb-6 flex items-center gap-2">
              <span className="w-1 h-4 bg-black/20 dark:bg-white/20 rounded-full"></span>
              {t('footer.contact')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-m-red mt-1 shrink-0" />
                <span className="text-sm text-void/50 dark:text-white/50">Province de Boujdour,<br />Division Action Sociale, 71200</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-m-green shrink-0" />
                <span className="text-sm text-void/50 dark:text-white/50" dir="ltr">+212 528 89 23 45</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-amber-500 shrink-0" />
                <span className="text-sm text-void/50 dark:text-white/50 font-mono">contact@indh-boujdour.ma</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-void/30 dark:text-white/30 text-center md:text-right">
            {t('footer.rights')}
          </p>
          <div className="flex items-center gap-4 text-xs text-void/20 dark:text-white/20">
            <div className="flex items-center gap-1">
              <span>{t('footer.designed_by')}</span>
              <Heart size={10} className="text-m-red fill-m-red animate-pulse" />
              <span>{t('footer.dev_for')}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

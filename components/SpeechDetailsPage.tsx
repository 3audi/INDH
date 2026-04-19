import React, { useEffect } from 'react';
import { ArrowRight, ArrowLeft, Calendar } from 'lucide-react';
import { AmbientBackground } from './ui/AmbientBackground';
import { Navbar } from './Navbar';
import { Speech } from '../data/speechesData';
import { useLanguage } from './LanguageContext';

interface SpeechDetailsPageProps {
  speech: Speech;
  onBack: () => void;
}

export const SpeechDetailsPage: React.FC<SpeechDetailsPageProps> = ({ speech, onBack }) => {
  const { t, dir } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [speech]);

  return (
    <div className="min-h-screen w-full bg-void text-white font-sans selection:bg-m-red selection:text-white pb-20" dir={dir}>
      <AmbientBackground opacity={0.3} />

      {/* Site Navbar */}
      <Navbar />

      {/* Back Button - Removed per request */}

      {/* Hero Section with Image */}
      <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://lh3.googleusercontent.com/d/1xe1wxz3oZ7NmHn-Yy8iQ0n3C3ZUShARr"
            alt={speech.title}
            className="w-full h-full object-cover object-top opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-black/40" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-8 animate-fade-in-up">
            <Calendar className="w-3 h-3 text-m-red" />
            <span className="text-xs font-bold text-white/90 uppercase tracking-widest" dir="rtl">{speech.date}</span>
          </div>

          {/* Title always in Arabic RTL */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-void dark:text-white mb-8 drop-shadow-2xl font-cairo leading-tight" dir="rtl">
            {speech.title}
          </h1>

          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-m-green to-transparent mx-auto mb-8 opacity-60"></div>
        </div>
      </div>

      {/* Speech Text Content - Always Arabic RTL, simple and professional */}
      <div className="relative max-w-3xl mx-auto px-6 sm:px-10 z-20 mt-16 mb-20" dir="rtl">
        <div className="space-y-6 text-right leading-[2.2] text-white/85 text-lg font-light font-cairo">

          {speech.content.map((paragraph, idx) => {
            const isOpeningLine = paragraph.includes("الحمد لله") || paragraph.includes("بسم الله");
            const isGreeting =
              paragraph.trim() === "شعبي العزيز،" ||
              paragraph.trim() === "شعبي العزيز٬" ||
              paragraph.trim() === "شعبي العزيز:" ||
              paragraph.trim() === "شعبـي العزيز،" ||
              paragraph.includes("حضرات السيدات والسادة");
            const isClosing = paragraph.includes("والسلام عليكم") || paragraph.includes("صدق الله العظيم");

            if (isOpeningLine) {
              return (
                <p key={idx} className="font-bold text-white text-xl text-center py-2 font-cairo">
                  {paragraph}
                </p>
              );
            }

            if (isGreeting) {
              return (
                <p key={idx} className="font-bold text-m-green text-xl py-2 font-cairo">
                  {paragraph}
                </p>
              );
            }

            if (isClosing) {
              return (
                <p key={idx} className="font-semibold text-white/90 text-center py-4 border-t border-white/10 mt-8 font-cairo">
                  {paragraph}
                </p>
              );
            }

            return (
              <p key={idx} className="text-white/80">
                {paragraph}
              </p>
            );
          })}

          <div className="mt-16 pt-10 border-t border-white/10 text-center">
            <div className="font-cairo text-2xl font-bold text-white mb-1">{t('king.name')}</div>
            <div className="text-m-red text-sm uppercase tracking-[0.3em] font-bold">{t('king.title')}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
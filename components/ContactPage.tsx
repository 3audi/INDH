import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock, CheckCircle2 } from 'lucide-react';
import { AmbientBackground } from './ui/AmbientBackground';
import { PageHero } from './ui/PageHero';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useLanguage } from './LanguageContext';
import { useContent } from './ContentContext';
import { useNavigate } from 'react-router-dom';

export const ContactPage: React.FC = () => {
    const { dir, language } = useLanguage();
    const navigate = useNavigate();
    const { siteImages } = useContent();
    const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    // All labels by language
    const labels = {
        ar: {
            badge: 'تواصل معنا',
            heroTitle: 'اتصل بنا',
            heroDesc: 'نحن هنا للإجابة على استفساراتكم ومساعدتكم في كل ما يتعلق بالمبادرة الوطنية للتنمية البشرية ببوجدور.',
            contactInfo: 'معلومات الاتصال',
            contactSubtitle: 'يسعدنا التواصل معكم في أي وقت خلال ساعات العمل الرسمية.',
            formTitle: 'أرسل لنا رسالة',
            formSubtitle: 'سيتم الرد خلال 24-48 ساعة عمل.',
            fullName: 'الاسم الكامل',
            namePlaceholder: 'محمد العلوي',
            email: 'البريد الإلكتروني',
            subject: 'الموضوع',
            subjectPlaceholder: 'موضوع رسالتك...',
            message: 'الرسالة',
            messagePlaceholder: 'اكتب رسالتك هنا...',
            send: 'إرسال الرسالة',
            successTitle: 'تم إرسال رسالتك!',
            successDesc: 'شكراً على تواصلك معنا. سنرد عليك في أقرب وقت ممكن خلال ساعات العمل.',
            sendAnother: 'إرسال رسالة أخرى',
            address: 'العنوان',
            addressVal: 'شارع الحسن الثاني، بوجدور، المملكة المغربية',
            phone: 'الهاتف',
            emailLabel: 'البريد الإلكتروني',
            hours: 'أوقات العمل',
            hoursVal: 'الاثنين – الجمعة، 8:30 – 16:30',
            mapLabel: 'بوجدور، المملكة المغربية',
        },
        fr: {
            badge: 'Contactez-nous',
            heroTitle: 'Contactez-nous',
            heroDesc: 'Nous sommes disponibles pour répondre à vos questions et vous aider dans tout ce qui concerne l\'Initiative Nationale pour le Développement Humain à Boujdour.',
            contactInfo: 'Informations de contact',
            contactSubtitle: 'Nous sommes ravis de vous contacter à tout moment pendant les heures de travail officielles.',
            formTitle: 'Envoyez-nous un message',
            formSubtitle: 'Nous répondrons dans les 24 à 48 heures ouvrables.',
            fullName: 'Nom complet',
            namePlaceholder: 'Mohammed Al-Alawi',
            email: 'E-mail',
            subject: 'Sujet',
            subjectPlaceholder: 'Objet de votre message...',
            message: 'Message',
            messagePlaceholder: 'Écrivez votre message ici...',
            send: 'Envoyer le message',
            successTitle: 'Message envoyé !',
            successDesc: 'Merci de nous avoir contactés. Nous vous répondrons dans les plus brefs délais pendant les heures de travail.',
            sendAnother: 'Envoyer un autre message',
            address: 'Adresse',
            addressVal: 'Avenue Hassan II, Boujdour, Royaume du Maroc',
            phone: 'Téléphone',
            emailLabel: 'E-mail',
            hours: 'Heures de travail',
            hoursVal: 'Lundi – Vendredi, 8h30 – 16h30',
            mapLabel: 'Boujdour, Royaume du Maroc',
        },
        en: {
            badge: 'Get in Touch',
            heroTitle: 'Contact Us',
            heroDesc: 'We are here to answer your questions and assist you with everything related to the National Initiative for Human Development in Boujdour.',
            contactInfo: 'Contact Information',
            contactSubtitle: 'We are happy to be contacted at any time during official working hours.',
            formTitle: 'Send Us a Message',
            formSubtitle: 'We will respond within 24-48 working hours.',
            fullName: 'Full Name',
            namePlaceholder: 'Mohamed Al-Alawi',
            email: 'Email',
            subject: 'Subject',
            subjectPlaceholder: 'Subject of your message...',
            message: 'Message',
            messagePlaceholder: 'Write your message here...',
            send: 'Send Message',
            successTitle: 'Message Sent!',
            successDesc: 'Thank you for contacting us. We will reply as soon as possible during working hours.',
            sendAnother: 'Send Another Message',
            address: 'Address',
            addressVal: 'Hassan II Avenue, Boujdour, Kingdom of Morocco',
            phone: 'Phone',
            emailLabel: 'Email',
            hours: 'Working Hours',
            hoursVal: 'Monday – Friday, 8:30 AM – 4:30 PM',
            mapLabel: 'Boujdour, Kingdom of Morocco',
        },
    };

    const L = labels[language as 'ar' | 'fr' | 'en'] || labels.ar;

    const infoItems = [
        { icon: MapPin, color: 'text-m-red bg-m-red/10', label: L.address, value: L.addressVal },
        { icon: Phone, color: 'text-m-green bg-m-green/10', label: L.phone, value: '+212 528 765 000' },
        { icon: Mail, color: 'text-amber-500 bg-amber-500/10', label: L.emailLabel, value: 'contact@indh-boujdour.ma' },
        { icon: Clock, color: 'text-blue-500 bg-blue-500/10', label: L.hours, value: L.hoursVal },
    ];

    return (
        <div className="min-h-screen w-full bg-cream dark:bg-void text-void dark:text-white font-sans selection:bg-m-red selection:text-white overflow-x-hidden transition-colors duration-500" dir={dir}>
            <AmbientBackground opacity={0.3} />
            <Navbar />

            <PageHero
                badge={L.badge}
                title={L.heroTitle}
                description={L.heroDesc}
                bgImage={siteImages.contact_hero}
            />

            <section className="relative z-20 w-full bg-cream dark:bg-void py-16 md:py-24">
                <div className="max-w-[82%] 2xl:max-w-[1280px] mx-auto space-y-12">
                    {/* Title & Subtitle Spanning the Top */}
                    <div className="text-center md:text-start max-w-3xl">
                        <h2 className="font-cairo text-3xl font-black text-void dark:text-white mb-4">{L.contactInfo}</h2>
                        <p className="text-void/70 dark:text-white/70 font-sans text-base leading-relaxed">
                            {L.contactSubtitle}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-stretch">

                        {/* Contact Info Left Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2 flex flex-col gap-6"
                        >

                            <div className="space-y-4">
                                {infoItems.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-start gap-4 p-4 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center shrink-0`}>
                                            <item.icon size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-void/50 dark:text-white/50 uppercase tracking-widest mb-1 font-sans">{item.label}</p>
                                            <p className="text-void dark:text-white font-medium font-sans text-sm">{item.value}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            {/* Map embed placeholder -> Replaced with real map */}
                            <div className="rounded-3xl overflow-hidden border border-black/5 dark:border-white/10 h-64 bg-black/5 dark:bg-white/5 relative flex-1 min-h-[250px] group">
                                <iframe
                                    src="https://maps.google.com/maps?q=26.12284,-14.48512+(Boujdour%20Province)&t=m&z=16&output=embed&iwloc="
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                                ></iframe>
                            </div>
                        </motion.div>

                        {/* Contact Form Right Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-3 h-full flex flex-col"
                        >
                            {submitted ? (
                                <div className="h-full flex-1 flex flex-col items-center justify-center text-center gap-6 bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-12">
                                    <div className="w-20 h-20 rounded-full bg-m-green/10 flex items-center justify-center">
                                        <CheckCircle2 className="text-m-green" size={40} />
                                    </div>
                                    <h3 className="font-cairo text-3xl font-black text-void dark:text-white">{L.successTitle}</h3>
                                    <p className="text-void/60 dark:text-white/60 font-sans max-w-sm leading-relaxed">
                                        {L.successDesc}
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="px-8 py-3 bg-m-red text-white rounded-full font-bold font-sans hover:bg-red-700 transition-colors"
                                    >
                                        {L.sendAnother}
                                    </button>
                                </div>
                            ) : (
                                <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-3xl p-8 md:p-10 flex-1 flex flex-col justify-center">
                                    <h2 className="font-cairo text-2xl font-black text-void dark:text-white mb-2">{L.formTitle}</h2>
                                    <p className="text-void/50 dark:text-white/50 text-sm mb-8 font-sans">{L.formSubtitle}</p>

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div>
                                                <label className="block text-xs font-bold text-void/50 dark:text-white/50 uppercase tracking-widest mb-2 font-sans">{L.fullName}</label>
                                                <input
                                                    type="text" required
                                                    value={formState.name}
                                                    onChange={e => setFormState(p => ({ ...p, name: e.target.value }))}
                                                    placeholder={L.namePlaceholder}
                                                    className="w-full bg-cream dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-sans focus:border-m-green focus:ring-1 focus:ring-m-green outline-none transition-all text-void dark:text-white placeholder:text-void/30 dark:placeholder:text-white/30"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-void/50 dark:text-white/50 uppercase tracking-widest mb-2 font-sans">{L.email}</label>
                                                <input
                                                    type="email" required
                                                    value={formState.email}
                                                    onChange={e => setFormState(p => ({ ...p, email: e.target.value }))}
                                                    placeholder="email@example.com"
                                                    className="w-full bg-cream dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-sans focus:border-m-green focus:ring-1 focus:ring-m-green outline-none transition-all text-void dark:text-white placeholder:text-void/30 dark:placeholder:text-white/30"
                                                    dir="ltr"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-void/50 dark:text-white/50 uppercase tracking-widest mb-2 font-sans">{L.subject}</label>
                                            <input
                                                type="text" required
                                                value={formState.subject}
                                                onChange={e => setFormState(p => ({ ...p, subject: e.target.value }))}
                                                placeholder={L.subjectPlaceholder}
                                                className="w-full bg-cream dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-sans focus:border-m-green focus:ring-1 focus:ring-m-green outline-none transition-all text-void dark:text-white placeholder:text-void/30 dark:placeholder:text-white/30"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-void/50 dark:text-white/50 uppercase tracking-widest mb-2 font-sans">{L.message}</label>
                                            <textarea
                                                required rows={6}
                                                value={formState.message}
                                                onChange={e => setFormState(p => ({ ...p, message: e.target.value }))}
                                                placeholder={L.messagePlaceholder}
                                                className="w-full bg-cream dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-sans focus:border-m-green focus:ring-1 focus:ring-m-green outline-none transition-all text-void dark:text-white placeholder:text-void/30 dark:placeholder:text-white/30 resize-y"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="group w-full py-4 bg-m-red text-white rounded-xl font-bold font-sans hover:bg-red-700 transition-all hover:shadow-lg hover:shadow-m-red/20 flex items-center justify-center gap-3"
                                        >
                                            <Send size={18} className="group-hover:-translate-y-0.5 transition-transform" />
                                            {L.send}
                                        </button>
                                    </form>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer onLoginClick={() => navigate('/login')} />
        </div>
    );
};

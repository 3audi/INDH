import React, { useState } from 'react';
import { useContent } from './ContentContext';
import {
   Save, RefreshCw, LogOut, Image as ImageIcon, Type, Layout,
   BookOpen, History, Users, Grid, FileText, Globe, Hash,
   Monitor, Layers, Plus, Trash2, Settings, PieChart, Activity,
   ExternalLink, Mic, Moon, Sun
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageUploadField } from './ui/ImageUploadField';
import { RichTextEditor } from './ui/RichTextEditor';
import { SettingsPage } from './admin/SettingsPage';
import { useTheme } from './ThemeContext';

interface AdminDashboardProps {
   onLogout: () => void;
}

// --- Icons & Config ---
const PAGES_CONFIG = [
   {
      id: 'images',
      title: 'Images',
      icon: ImageIcon,
      color: 'text-sky-500',
      description: 'All site images in one place',
      tabs: []
   },
   {
      id: 'phase3',
      title: 'Phase III',
      icon: PieChart,
      color: 'text-m-green',
      description: 'Phase III stats & program numbers',
      tabs: []
   },
   {
      id: 'media',
      title: 'Media Library',
      icon: Grid,
      color: 'text-purple-500',
      description: 'Gallery posts editor',
      tabs: []
   },
   {
      id: 'speeches_mgr',
      title: 'Speeches',
      icon: Mic,
      color: 'text-amber-500',
      description: 'Royal speeches & letters',
      tabs: []
   },
   {
      id: 'admin_settings',
      title: 'Settings',
      icon: Settings,
      color: 'text-gray-400',
      description: 'Admin credentials',
      tabs: []
   }
];

// --- Reusable UI Components ---

const SectionHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
   <div className="mb-8">
      <h2 className="text-2xl font-bold text-void dark:text-white tracking-tight">{title}</h2>
      {subtitle && <p className="text-void/50 dark:text-white/50 text-sm mt-1">{subtitle}</p>}
   </div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
   <div className={`bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden ${className}`}>
      {children}
   </div>
);

const CardHeader: React.FC<{ title: string; icon?: any }> = ({ title, icon: Icon }) => (
   <div className="px-6 py-4 border-b border-black/5 dark:border-white/5 bg-gray-50/50 dark:bg-black/20 flex items-center gap-3">
      {Icon && <Icon size={16} className="text-void/60 dark:text-white/60" />}
      <h3 className="font-bold text-sm uppercase tracking-wider text-void/80 dark:text-white/80">{title}</h3>
   </div>
);

const FieldGroup: React.FC<{ label: string; children: React.ReactNode; className?: string }> = ({ label, children, className = "mb-4" }) => (
   <div className={className}>
      <label className="block text-xs font-bold text-void/50 dark:text-white/50 uppercase tracking-wider mb-2">{label}</label>
      {children}
   </div>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
   <input
      {...props}
      className="w-full bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-m-green focus:ring-1 focus:ring-m-green outline-none transition-all text-void dark:text-white placeholder:text-void/20 dark:placeholder:text-white/20"
   />
);

const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
   <textarea
      {...props}
      className={`w-full bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-m-green focus:ring-1 focus:ring-m-green outline-none transition-all text-void dark:text-white resize-y ${props.className || 'min-h-[100px]'}`}
   />
);

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
   const {
      translations, galleryItems, speeches, siteImages, siteStats,
      updateTranslation, updateGalleryItem, addGalleryItem, deleteGalleryItem,
      updateSpeech, addSpeech, deleteSpeech, updateSiteImage, updateSiteStat,
      saveChanges, resetToDefaults
   } = useContent();

   const [activePageId, setActivePageId] = useState('images');
   const [activeTabId, setActiveTabId] = useState('');
   const [selectedLang, setSelectedLang] = useState<'ar' | 'fr' | 'en'>('ar');
   const [showSaveConfirm, setShowSaveConfirm] = useState(false);
   const [showResetConfirm, setShowResetConfirm] = useState(false);
   const { theme, toggleTheme } = useTheme();

   const activePage = PAGES_CONFIG.find(p => p.id === activePageId) || PAGES_CONFIG[0];

   const handlePageChange = (id: string) => {
      setActivePageId(id);
      const page = PAGES_CONFIG.find(p => p.id === id);
      if (page && page.tabs.length > 0) setActiveTabId(page.tabs[0].id);
   };

   const handleSave = () => {
      saveChanges();
      setShowSaveConfirm(false);
   };

   const handleReset = () => {
      resetToDefaults();
      setShowResetConfirm(false);
   };

   const getTrans = (key: string) => {
      // @ts-ignore
      return translations[selectedLang][key] || "";
   }

   // --- Render Sections ---

   const renderRoyalSpeechSection = () => (
      <Card>
         <CardHeader title="Royal Speech Section" icon={Type} />
         <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-4">
                  <FieldGroup label="Excerpt Text">
                     <TextArea value={getTrans('speech.excerpt')} onChange={(e) => updateTranslation(selectedLang, 'speech.excerpt', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                  </FieldGroup>
                  <FieldGroup label="Button Label">
                     <Input value={getTrans('speech.read_more')} onChange={(e) => updateTranslation(selectedLang, 'speech.read_more', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                  </FieldGroup>
               </div>
               <div className="space-y-4">
                  <FieldGroup label="Portrait Image URL">
                     <Input className="font-mono text-xs" value={siteImages.royal_portrait} onChange={(e) => updateSiteImage('royal_portrait', e.target.value)} />
                  </FieldGroup>
                  <div className="aspect-[3/4] bg-black/10 rounded-lg overflow-hidden w-1/2 mx-auto">
                     <img src={siteImages.royal_portrait} className="w-full h-full object-cover" />
                  </div>
               </div>
            </div>
         </div>
      </Card>
   );

   const renderProgramsHero = () => (
      <Card>
         <CardHeader title="Programs Main Hero" icon={Layout} />
         <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-4">
                  <FieldGroup label="Title">
                     <Input value={getTrans('programs.title')} onChange={(e) => updateTranslation(selectedLang, 'programs.title', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                  </FieldGroup>
                  <FieldGroup label="Description">
                     <TextArea value={getTrans('programs.desc')} onChange={(e) => updateTranslation(selectedLang, 'programs.desc', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                  </FieldGroup>
                  <FieldGroup label="Tag">
                     <Input value={getTrans('programs.pillars_tag')} onChange={(e) => updateTranslation(selectedLang, 'programs.pillars_tag', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                  </FieldGroup>
               </div>
               <div className="space-y-4">
                  <FieldGroup label="Hero Image URL">
                     <Input className="font-mono text-xs" value={siteImages.programs_hero} onChange={(e) => updateSiteImage('programs_hero', e.target.value)} />
                  </FieldGroup>
                  <div className="aspect-video bg-black/10 rounded-lg overflow-hidden">
                     <img src={siteImages.programs_hero} className="w-full h-full object-cover" />
                  </div>
               </div>
            </div>
         </div>
      </Card>
   );

   const renderAchievementsPillars = () => (
      <Card>
         <CardHeader title="Achievements Pillars" icon={Grid} />
         <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
               <div key={i} className="p-4 border border-black/5 dark:border-white/5 rounded-xl">
                  <h4 className="font-bold mb-4">Pillar {i}</h4>
                  <FieldGroup label="Title">
                     <Input value={getTrans(`achievements.pillar.${i}.title`)} onChange={(e) => updateTranslation(selectedLang, `achievements.pillar.${i}.title`, e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                  </FieldGroup>
                  <FieldGroup label="Description">
                     <TextArea value={getTrans(`achievements.pillar.${i}.desc`)} onChange={(e) => updateTranslation(selectedLang, `achievements.pillar.${i}.desc`, e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                  </FieldGroup>
               </div>
            ))}
         </div>
      </Card>
   );

   const renderAchievementsLabels = () => (
      <Card>
         <CardHeader title="Static Labels" icon={Type} />
         <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <FieldGroup label="Beneficiaries Label">
               <Input value={getTrans('achievements.stat.beneficiaries')} onChange={(e) => updateTranslation(selectedLang, 'achievements.stat.beneficiaries', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
            </FieldGroup>
            <FieldGroup label="Cost Label">
               <Input value={getTrans('achievements.stat.cost')} onChange={(e) => updateTranslation(selectedLang, 'achievements.stat.cost', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
            </FieldGroup>
            <FieldGroup label="Projects Label">
               <Input value={getTrans('achievements.stat.projects')} onChange={(e) => updateTranslation(selectedLang, 'achievements.stat.projects', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
            </FieldGroup>
            <FieldGroup label="Projects Done Label">
               <Input value={getTrans('achievements.stat.projects_done')} onChange={(e) => updateTranslation(selectedLang, 'achievements.stat.projects_done', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
            </FieldGroup>
            <FieldGroup label="Leverage Label">
               <Input value={getTrans('achievements.stat.leverage')} onChange={(e) => updateTranslation(selectedLang, 'achievements.stat.leverage', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
            </FieldGroup>
            <FieldGroup label="Yearly Avg Label">
               <Input value={getTrans('achievements.stat.yearly_avg')} onChange={(e) => updateTranslation(selectedLang, 'achievements.stat.yearly_avg', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
            </FieldGroup>
            <FieldGroup label="Pillars Section Title">
               <Input value={getTrans('achievements.pillars')} onChange={(e) => updateTranslation(selectedLang, 'achievements.pillars', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
            </FieldGroup>
         </div>
      </Card>
   );

   const renderYouthSections = () => (
      <div className="space-y-8">
         <Card>
            <CardHeader title="Platform Spaces" icon={Layout} />
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
               {['listen', 'support', 'employ'].map(space => (
                  <div key={space} className="space-y-4">
                     <h4 className="font-bold capitalize">{space}</h4>
                     <FieldGroup label="Title">
                        <Input value={getTrans(`youth.space.${space}.title`)} onChange={(e) => updateTranslation(selectedLang, `youth.space.${space}.title`, e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                     </FieldGroup>
                     <FieldGroup label="Description">
                        <TextArea value={getTrans(`youth.space.${space}.desc`)} onChange={(e) => updateTranslation(selectedLang, `youth.space.${space}.desc`, e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                     </FieldGroup>
                  </div>
               ))}
            </div>
         </Card>
         <Card>
            <CardHeader title="Process Steps" icon={Grid} />
            <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-6">
               {[1, 2, 3, 4, 5, 6].map(i => (
                  <FieldGroup key={i} label={`Step ${i}`}>
                     <Input value={getTrans(`youth.process.step${i}`)} onChange={(e) => updateTranslation(selectedLang, `youth.process.step${i}`, e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                  </FieldGroup>
               ))}
            </div>
         </Card>
         <Card>
            <CardHeader title="Call to Action" icon={Layout} />
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
               <FieldGroup label="CTA Title">
                  <Input value={getTrans('youth.cta.title')} onChange={(e) => updateTranslation(selectedLang, 'youth.cta.title', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
               </FieldGroup>
               <FieldGroup label="CTA Button">
                  <Input value={getTrans('youth.cta.btn')} onChange={(e) => updateTranslation(selectedLang, 'youth.cta.btn', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
               </FieldGroup>
            </div>
         </Card>
      </div>
   );

   const renderHistorySections = () => (
      <div className="space-y-8">
         <Card>
            <CardHeader title="Ecosystem" icon={Grid} />
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="space-y-2">
                     <FieldGroup label={`Item ${i} Title`}>
                        <Input value={getTrans(`history.eco.${i}.title`)} onChange={(e) => updateTranslation(selectedLang, `history.eco.${i}.title`, e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                     </FieldGroup>
                     <FieldGroup label={`Item ${i} Desc`}>
                        <Input value={getTrans(`history.eco.${i}.desc`)} onChange={(e) => updateTranslation(selectedLang, `history.eco.${i}.desc`, e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                     </FieldGroup>
                  </div>
               ))}
            </div>
         </Card>
         <Card>
            <CardHeader title="Values" icon={Grid} />
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
               {['participation', 'trust', 'dignity', 'sustainability', 'good_gov'].map(val => (
                  <FieldGroup key={val} label={val}>
                     <Input value={getTrans(`history.val.${val}`)} onChange={(e) => updateTranslation(selectedLang, `history.val.${val}`, e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                  </FieldGroup>
               ))}
            </div>
         </Card>
      </div>
   );

   const renderGalleryHero = () => (
      <Card>
         <CardHeader title="Gallery Hero" icon={ImageIcon} />
         <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-4">
                  <FieldGroup label="Title">
                     <Input value={getTrans('gallery.title')} onChange={(e) => updateTranslation(selectedLang, 'gallery.title', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                  </FieldGroup>
                  <FieldGroup label="Description">
                     <TextArea value={getTrans('gallery.desc')} onChange={(e) => updateTranslation(selectedLang, 'gallery.desc', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                  </FieldGroup>
               </div>
               <div className="space-y-4">
                  <FieldGroup label="Hero Image URL">
                     <Input className="font-mono text-xs" value={siteImages.gallery_hero} onChange={(e) => updateSiteImage('gallery_hero', e.target.value)} />
                  </FieldGroup>
                  <div className="aspect-video bg-black/10 rounded-lg overflow-hidden">
                     <img src={siteImages.gallery_hero} className="w-full h-full object-cover" />
                  </div>
               </div>
            </div>
         </div>
      </Card>
   );

   const renderHomeHero = () => (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <Card>
            <CardHeader title="Visuals" icon={ImageIcon} />
            <div className="p-6 space-y-6">
               <FieldGroup label="Background Image URL">
                  <Input value={siteImages.home_hero} onChange={(e) => updateSiteImage('home_hero', e.target.value)} />
               </FieldGroup>
               <div className="aspect-video rounded-xl overflow-hidden bg-black/10 border border-black/5 relative group">
                  <img src={siteImages.home_hero} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs">Preview</div>
               </div>
            </div>
         </Card>
         <Card>
            <CardHeader title="Text Content" icon={Type} />
            <div className="p-6 space-y-6">
               <div className="grid grid-cols-2 gap-4">
                  <FieldGroup label="Title Prefix">
                     <Input value={getTrans('hero.title.prefix')} onChange={(e) => updateTranslation(selectedLang, 'hero.title.prefix', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                  </FieldGroup>
                  <FieldGroup label="Title Suffix">
                     <Input value={getTrans('hero.title.suffix')} onChange={(e) => updateTranslation(selectedLang, 'hero.title.suffix', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                  </FieldGroup>
               </div>
               <FieldGroup label="Description">
                  <TextArea value={getTrans('hero.description')} onChange={(e) => updateTranslation(selectedLang, 'hero.description', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
               </FieldGroup>
               <FieldGroup label="CTA Button">
                  <Input value={getTrans('hero.btn.discover')} onChange={(e) => updateTranslation(selectedLang, 'hero.btn.discover', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
               </FieldGroup>
            </div>
         </Card>
      </div>
   );

   const renderHomeTimeline = () => (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {[1, 2, 3].map(phase => (
            <Card key={phase} className="h-full">
               <CardHeader title={`Phase ${phase}`} icon={History} />
               <div className="p-6 space-y-6">
                  <div className="aspect-video bg-black/10 rounded-lg overflow-hidden relative mb-4">
                     <img
                        // @ts-ignore
                        src={siteImages[`timeline_p${phase}`]}
                        className="w-full h-full object-cover"
                     />
                  </div>
                  <FieldGroup label="Image URL">
                     <Input
                        className="w-full text-xs font-mono"
                        // @ts-ignore
                        value={siteImages[`timeline_p${phase}`]}
                        // @ts-ignore
                        onChange={(e) => updateSiteImage(`timeline_p${phase}`, e.target.value)}
                     />
                  </FieldGroup>

                  <div className="border-t border-black/5 dark:border-white/5 pt-4">
                     <FieldGroup label="Period (Years)">
                        <Input
                           className="font-bold text-m-green"
                           // @ts-ignore
                           value={siteStats[`timeline_p${phase}_period`]}
                           // @ts-ignore
                           onChange={(e) => updateSiteStat(`timeline_p${phase}_period`, e.target.value)}
                        />
                     </FieldGroup>
                     <FieldGroup label="Title">
                        <Input value={getTrans(`timeline.p${phase}.title`)} onChange={(e) => updateTranslation(selectedLang, `timeline.p${phase}.title`, e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                     </FieldGroup>

                     {/* Stats vary per phase */}
                     {phase === 1 && (
                        <FieldGroup label="Stat: Beneficiaries">
                           <Input value={siteStats.timeline_p1_beneficiaries} onChange={(e) => updateSiteStat('timeline_p1_beneficiaries', e.target.value)} />
                        </FieldGroup>
                     )}
                     {phase === 2 && (
                        <FieldGroup label="Stat: Projects">
                           <Input value={siteStats.timeline_p2_projects} onChange={(e) => updateSiteStat('timeline_p2_projects', e.target.value)} />
                        </FieldGroup>
                     )}
                  </div>
               </div>
            </Card>
         ))}
      </div>
   );

   const renderHomeStats = () => (
      <Card>
         <CardHeader title="Key Indicators (Bento Grid)" icon={Hash} />
         <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FieldGroup label="Total Projects">
               <Input className="text-xl font-bold" value={siteStats.home_projects} onChange={(e) => updateSiteStat('home_projects', e.target.value)} />
            </FieldGroup>
            <FieldGroup label="Hero Card Title 1">
               <Input value={getTrans('card.hero.title1')} onChange={(e) => updateTranslation(selectedLang, 'card.hero.title1', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
            </FieldGroup>
            <FieldGroup label="Hero Card Title 2">
               <Input value={getTrans('card.hero.title2')} onChange={(e) => updateTranslation(selectedLang, 'card.hero.title2', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
            </FieldGroup>
            <FieldGroup label="Connect Card Title">
               <Input value={getTrans('card.connect.join')} onChange={(e) => updateTranslation(selectedLang, 'card.connect.join', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
            </FieldGroup>
         </div>
      </Card>
   );

   const renderProgram = (id: number) => (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Visuals & Text */}
         <div className="lg:col-span-2 space-y-6">
            <Card>
               <CardHeader title="Content & Imagery" icon={Layout} />
               <div className="p-6 space-y-6">
                  <FieldGroup label="Main Title">
                     <Input className="font-bold text-lg" value={getTrans(`programs.p${id}.title`)} onChange={(e) => updateTranslation(selectedLang, `programs.p${id}.title`, e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                  </FieldGroup>
                  <FieldGroup label="Description">
                     <TextArea value={getTrans(`programs.p${id}.desc`)} onChange={(e) => updateTranslation(selectedLang, `programs.p${id}.desc`, e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                  </FieldGroup>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <FieldGroup label="Main Image URL">
                        {/* @ts-ignore */}
                        <Input className="font-mono text-xs" value={siteImages[`programs_p${id}`]} onChange={(e) => updateSiteImage(`programs_p${id}`, e.target.value)} />
                     </FieldGroup>
                     <div className="h-24 bg-black/5 rounded-lg overflow-hidden">
                        {/* @ts-ignore */}
                        <img src={siteImages[`programs_p${id}`]} className="w-full h-full object-cover" />
                     </div>
                  </div>
               </div>
            </Card>
         </div>

         {/* Stats Column */}
         <div>
            <Card className="h-full border-t-4 border-t-m-green">
               <CardHeader title="Program Statistics" icon={Hash} />
               <div className="p-6 space-y-6">
                  <FieldGroup label="Budget (MDH)">
                     {/* @ts-ignore */}
                     <Input className="text-2xl font-black text-m-green" value={siteStats[`p${id}_budget`]} onChange={(e) => updateSiteStat(`p${id}_budget`, e.target.value)} />
                  </FieldGroup>
                  <div className="grid grid-cols-2 gap-4">
                     <FieldGroup label="Projects">
                        {/* @ts-ignore */}
                        <Input className="font-bold" value={siteStats[`p${id}_projects`]} onChange={(e) => updateSiteStat(`p${id}_projects`, e.target.value)} />
                     </FieldGroup>
                     <FieldGroup label="Beneficiaries">
                        {/* @ts-ignore */}
                        <Input className="font-bold" value={siteStats[`p${id}_beneficiaries`]} onChange={(e) => updateSiteStat(`p${id}_beneficiaries`, e.target.value)} />
                     </FieldGroup>
                  </div>

                  {id === 3 && (
                     <div className="pt-4 border-t border-black/5 dark:border-white/5 space-y-4">
                        <FieldGroup label="Startups Created"><Input value={siteStats.p3_startups} onChange={(e) => updateSiteStat('p3_startups', e.target.value)} /></FieldGroup>
                        <FieldGroup label="Cooperatives"><Input value={siteStats.p3_coops} onChange={(e) => updateSiteStat('p3_coops', e.target.value)} /></FieldGroup>
                        <FieldGroup label="Sustainability Rate"><Input value={siteStats.p3_sustainability} onChange={(e) => updateSiteStat('p3_sustainability', e.target.value)} /></FieldGroup>
                        <FieldGroup label="Women %"><Input value={siteStats.p3_women} onChange={(e) => updateSiteStat('p3_women', e.target.value)} /></FieldGroup>
                     </div>
                  )}
                  {id === 4 && (
                     <div className="pt-4 border-t border-black/5 dark:border-white/5 space-y-4">
                        <FieldGroup label="School Support"><Input value={siteStats.p4_school_support} onChange={(e) => updateSiteStat('p4_school_support', e.target.value)} /></FieldGroup>
                        <FieldGroup label="Health Beneficiaries"><Input value={siteStats.p4_health} onChange={(e) => updateSiteStat('p4_health', e.target.value)} /></FieldGroup>
                        <FieldGroup label="Preschool Units"><Input value={siteStats.p4_preschool} onChange={(e) => updateSiteStat('p4_preschool', e.target.value)} /></FieldGroup>
                     </div>
                  )}
               </div>
            </Card>
         </div>
      </div>
   );

   const renderAchievementsHero = () => (
      <Card>
         <CardHeader title="Achievements Hero" icon={ImageIcon} />
         <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-4">
                  <FieldGroup label="Hero Image URL">
                     <Input className="font-mono text-xs" value={siteImages.achievements_hero} onChange={(e) => updateSiteImage('achievements_hero', e.target.value)} />
                  </FieldGroup>
                  <div className="aspect-video bg-black/10 rounded-lg overflow-hidden">
                     <img src={siteImages.achievements_hero} className="w-full h-full object-cover" />
                  </div>
               </div>
            </div>
         </div>
      </Card>
   );

   const renderAchievementsStats = () => (
      <Card>
         <CardHeader title="Dashboard Metrics" icon={Grid} />
         <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FieldGroup label="Total Beneficiaries">
               <Input className="text-2xl font-black text-void dark:text-white" value={siteStats.achievements_beneficiaries} onChange={(e) => updateSiteStat('achievements_beneficiaries', e.target.value)} />
            </FieldGroup>
            <FieldGroup label="Beneficiaries Description">
               <Input value={getTrans('achievements.stat.beneficiaries_desc')} onChange={(e) => updateTranslation(selectedLang, 'achievements.stat.beneficiaries_desc', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
            </FieldGroup>
            <FieldGroup label="Total Budget (MDH)">
               <Input className="text-2xl font-black text-void dark:text-white" value={siteStats.achievements_budget} onChange={(e) => updateSiteStat('achievements_budget', e.target.value)} />
            </FieldGroup>
            <FieldGroup label="Completed Projects">
               <Input className="text-2xl font-black text-void dark:text-white" value={siteStats.achievements_projects} onChange={(e) => updateSiteStat('achievements_projects', e.target.value)} />
            </FieldGroup>
            <FieldGroup label="Leverage (%)">
               <Input className="text-2xl font-black text-void dark:text-white" value={siteStats.achievements_leverage} onChange={(e) => updateSiteStat('achievements_leverage', e.target.value)} />
            </FieldGroup>
            <FieldGroup label="Leverage Description">
               <TextArea value={getTrans('achievements.stat.leverage_desc')} onChange={(e) => updateTranslation(selectedLang, 'achievements.stat.leverage_desc', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
            </FieldGroup>
            <FieldGroup label="Yearly Avg Beneficiaries">
               <Input className="font-bold" value={siteStats.achievements_yearly_avg} onChange={(e) => updateSiteStat('achievements_yearly_avg', e.target.value)} />
            </FieldGroup>
            <FieldGroup label="INDH Share (MDH)">
               <Input className="font-bold text-m-red" value={siteStats.achievements_indh_share} onChange={(e) => updateSiteStat('achievements_indh_share', e.target.value)} />
            </FieldGroup>
            <FieldGroup label="Partners Share (MDH)">
               <Input className="font-bold text-m-green" value={siteStats.achievements_partner_share} onChange={(e) => updateSiteStat('achievements_partner_share', e.target.value)} />
            </FieldGroup>
         </div>
      </Card>
   );

   const renderYouthHero = () => (
      <Card>
         <CardHeader title="Hero Section" icon={Layout} />
         <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-4">
                  <FieldGroup label="Title">
                     <Input value={getTrans('youth.hero.title')} onChange={(e) => updateTranslation(selectedLang, 'youth.hero.title', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                  </FieldGroup>
                  <FieldGroup label="Subtitle">
                     <Input value={getTrans('youth.hero.subtitle')} onChange={(e) => updateTranslation(selectedLang, 'youth.hero.subtitle', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                  </FieldGroup>
                  <FieldGroup label="Description">
                     <TextArea value={getTrans('youth.hero.desc')} onChange={(e) => updateTranslation(selectedLang, 'youth.hero.desc', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                  </FieldGroup>
               </div>
               <div className="space-y-4">
                  <FieldGroup label="Hero Image URL">
                     <Input className="font-mono text-xs" value={siteImages.youth_hero} onChange={(e) => updateSiteImage('youth_hero', e.target.value)} />
                  </FieldGroup>
                  <div className="aspect-video bg-black/10 rounded-lg overflow-hidden">
                     <img src={siteImages.youth_hero} className="w-full h-full object-cover" />
                  </div>
               </div>
            </div>
         </div>
      </Card>
   );

   const renderHistoryText = () => (
      <Card>
         <CardHeader title="Governance Content" icon={Type} />
         <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-4">
                  <FieldGroup label="Page Title">
                     <Input value={getTrans('history.title')} onChange={(e) => updateTranslation(selectedLang, 'history.title', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                  </FieldGroup>
                  <FieldGroup label="Slogan">
                     <Input value={getTrans('history.slogan')} onChange={(e) => updateTranslation(selectedLang, 'history.slogan', e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                  </FieldGroup>
               </div>
               <div className="space-y-4">
                  <FieldGroup label="Hero Image URL">
                     <Input className="font-mono text-xs" value={siteImages.history_hero} onChange={(e) => updateSiteImage('history_hero', e.target.value)} />
                  </FieldGroup>
                  <div className="aspect-video bg-black/10 rounded-lg overflow-hidden">
                     <img src={siteImages.history_hero} className="w-full h-full object-cover" />
                  </div>
               </div>
            </div>
         </div>
      </Card>
   );

   const renderGallery = () => (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Manage Posts</h3>
            <button onClick={addGalleryItem} className="flex items-center gap-2 px-6 py-2.5 bg-m-green text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
               <Plus size={18} /> New Post
            </button>
         </div>

         <div className="grid grid-cols-1 gap-6">
            {galleryItems.map(item => (
               <Card key={item.id} className="group relative transition-all hover:shadow-md">
                  <button onClick={() => deleteGalleryItem(item.id)} className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-500 hover:text-white">
                     <Trash2 size={18} />
                  </button>
                  <div className="p-6 flex flex-col md:flex-row gap-6">
                     <div className="w-full md:w-64 shrink-0 space-y-3">
                        <div className="aspect-video bg-black/10 rounded-lg overflow-hidden">
                           <img src={item.src} className="w-full h-full object-cover" />
                        </div>
                        <Input className="text-[10px] font-mono" value={item.src} onChange={(e) => updateGalleryItem(item.id, { src: e.target.value })} placeholder="Image URL" />
                     </div>

                     <div className="flex-1 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                           <FieldGroup label="Title (Auto-Translated Key)">
                              <Input className="font-bold" value={getTrans(item.titleKey as string)} onChange={(e) => updateTranslation(selectedLang, item.titleKey as string, e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                           </FieldGroup>
                           <FieldGroup label="Category Label">
                              <Input value={getTrans(item.categoryLabelKey as string)} onChange={(e) => updateTranslation(selectedLang, item.categoryLabelKey as string, e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                           </FieldGroup>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                           <FieldGroup label="Date">
                              <Input value={item.date} onChange={(e) => updateGalleryItem(item.id, { date: e.target.value })} />
                           </FieldGroup>
                           <FieldGroup label="Category">
                              <select
                                 className="w-full bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none"
                                 value={item.category}
                                 onChange={(e) => updateGalleryItem(item.id, { category: e.target.value })}
                              >
                                 <option value="social">Social</option>
                                 <option value="infra">Infrastructure</option>
                                 <option value="youth">Youth</option>
                                 <option value="events">Events</option>
                              </select>
                           </FieldGroup>
                           <FieldGroup label="Location">
                              <Input value={getTrans(item.subtitleKey as string)} onChange={(e) => updateTranslation(selectedLang, item.subtitleKey as string, e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                           </FieldGroup>
                        </div>
                        <FieldGroup label="Full Description">
                           <TextArea value={getTrans(item.detailsKey as string)} onChange={(e) => updateTranslation(selectedLang, item.detailsKey as string, e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                        </FieldGroup>
                     </div>
                  </div>
               </Card>
            ))}
         </div>
      </div>
   );

   const renderSpeeches = () => (
      <div className="space-y-6">
         {speeches.map(speech => (
            <Card key={speech.id}>
               <CardHeader title={speech.type === 'speech' ? 'Royal Speech' : 'Royal Letter'} icon={FileText} />
               <div className="p-6 flex flex-col gap-6">

                  {/* Header Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                     <div className="md:col-span-3 space-y-4">
                        <div className="aspect-[3/4] bg-black/10 rounded-xl overflow-hidden">
                           <img src={speech.image} className="w-full h-full object-cover" />
                        </div>
                     </div>
                     <div className="md:col-span-9 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                           <FieldGroup label="Date">
                              <Input value={speech.date} onChange={(e) => updateSpeech(speech.id, 'date', e.target.value)} />
                           </FieldGroup>
                           <FieldGroup label="Type">
                              <select
                                 className="w-full bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none transition-all text-void dark:text-white"
                                 value={speech.type}
                                 onChange={(e) => updateSpeech(speech.id, 'type', e.target.value)}
                              >
                                 <option value="speech">Royal Speech</option>
                                 <option value="letter">Royal Letter</option>
                              </select>
                           </FieldGroup>
                        </div>
                        <FieldGroup label="Title">
                           <Input className="font-bold text-lg" value={speech.title} onChange={(e) => updateSpeech(speech.id, 'title', e.target.value)} />
                        </FieldGroup>
                        <FieldGroup label="Image URL">
                           <Input className="text-[10px] font-mono" value={speech.image} onChange={(e) => updateSpeech(speech.id, 'image', e.target.value)} />
                        </FieldGroup>
                     </div>
                  </div>

                  {/* Content Editor */}
                  <div className="pt-4 border-t border-black/5 dark:border-white/5">
                     <FieldGroup label="Full Content (Paragraphs separated by new lines)">
                        <TextArea
                           className="text-xs leading-relaxed min-h-[500px] font-serif"
                           value={speech.content.join('\n')}
                           onChange={(e) => {
                              const newContent = e.target.value.split('\n');
                              updateSpeech(speech.id, 'content', newContent);
                           }}
                        />
                     </FieldGroup>
                  </div>

               </div>
            </Card>
         ))}
      </div>
   );

   // ─── IMAGES PAGE ──────────────────────────────────────────────────────────
   const ALL_SITE_IMAGES: { key: keyof typeof siteImages; page: string; section: string }[] = [
      // Home
      { key: 'home_hero', page: 'Home', section: 'Hero Background' },
      { key: 'royal_portrait', page: 'Home', section: 'Royal Speech - Portrait' },
      // Phases of the initiative
      { key: 'phases_hero', page: 'Phases', section: 'Hero Background' },
      { key: 'timeline_p1', page: 'Phases', section: 'Phase I section image' },
      { key: 'timeline_p2', page: 'Phases', section: 'Phase II section image' },
      { key: 'timeline_p3', page: 'Phases', section: 'Phase III section image' },
      // Programs
      { key: 'programs_hero', page: 'Programs', section: 'Hero Background' },
      { key: 'programs_p1', page: 'Programs', section: 'Programme 1 - Infrastructure image' },
      { key: 'programs_p2', page: 'Programs', section: 'Programme 2 - Vulnerability image' },
      { key: 'programs_p3', page: 'Programs', section: 'Programme 3 - Economic Dev image' },
      { key: 'programs_p4', page: 'Programs', section: 'Programme 4 - Human Capital image' },
      // Governance
      { key: 'history_hero', page: 'Governance', section: 'Hero Background' },
      // Youth Platform
      { key: 'youth_hero', page: 'Youth Platform', section: 'Hero Background' },
      // Media Library
      { key: 'gallery_hero', page: 'Media Library', section: 'Hero Background' },
      // About Us
      { key: 'about_hero', page: 'About Us', section: 'Hero Background' },
      // Contact Us
      { key: 'contact_hero', page: 'Contact Us', section: 'Hero Background' },
   ];

   const renderImagesPage = () => (
      <div className="space-y-4">
         <div className="flex items-center justify-between mb-6">
            <div>
               <h3 className="text-xl font-bold text-void dark:text-white">All Site Images</h3>
               <p className="text-void/50 dark:text-white/50 text-sm mt-1">{ALL_SITE_IMAGES.length} images across all pages — click URL to edit</p>
            </div>
         </div>

         {/* Group by page */}
         {['Home', 'Phases', 'Programs', 'Governance', 'Youth Platform', 'Media Library', 'About Us', 'Contact Us'].map(page => {
            const imgs = ALL_SITE_IMAGES.filter(i => i.page === page);
            if (imgs.length === 0) return null;
            return (
               <div key={page} className="mb-8">
                  <h4 className="text-xs font-black uppercase tracking-widest text-void/40 dark:text-white/40 mb-4 flex items-center gap-2">
                     <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
                     {page}
                     <span className="h-px flex-1 bg-black/10 dark:bg-white/10" />
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                     {imgs.map(({ key, section }) => (
                        <Card key={key} className="group overflow-hidden">
                           {/* Preview */}
                           <div className="relative aspect-video bg-black/10 overflow-hidden">
                              <img src={siteImages[key]} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                              <a
                                 href={siteImages[key]}
                                 target="_blank"
                                 rel="noopener noreferrer"
                                 className="absolute bottom-3 right-3 p-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
                                 onClick={e => e.stopPropagation()}
                              >
                                 <ExternalLink size={14} />
                              </a>
                           </div>
                           {/* Info & Edit */}
                           <div className="p-4">
                              <div className="flex items-start justify-between gap-2 mb-3">
                                 <div>
                                    <p className="font-bold text-sm text-void dark:text-white leading-tight">{section}</p>
                                    <p className="text-xs text-void/40 dark:text-white/40 font-mono mt-0.5">{key}</p>
                                 </div>
                                 <span className="shrink-0 px-2 py-0.5 bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold rounded-full">{page}</span>
                              </div>
                              <ImageUploadField
                                 value={siteImages[key]}
                                 onChange={val => updateSiteImage(key, val)}
                              />
                           </div>
                        </Card>
                     ))}
                  </div>
               </div>
            );
         })}
      </div>
   );

   // ─── PHASE III PAGE ───────────────────────────────────────────────────────
   const renderPhase3Page = () => (
      <div className="space-y-8">
         <div className="mb-2">
            <h3 className="text-xl font-bold text-void dark:text-white">Phase III — All Statistics</h3>
            <p className="text-void/50 dark:text-white/50 text-sm mt-1">Edit numbers for Phase III (2019–2023) and each programme</p>
         </div>

         {/* Phase III Header Stats */}
         <Card>
            <CardHeader title="Phase III — Global Figures" icon={Layers} />
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
               <FieldGroup label="Total Projects"><Input className="text-2xl font-black text-m-green" value={siteStats.achievements_projects} onChange={e => updateSiteStat('achievements_projects', e.target.value)} /></FieldGroup>
               <FieldGroup label="Total Beneficiaries"><Input className="text-2xl font-black text-void dark:text-white" value={siteStats.achievements_beneficiaries} onChange={e => updateSiteStat('achievements_beneficiaries', e.target.value)} /></FieldGroup>
               <FieldGroup label="Total Budget (MDH)"><Input className="text-2xl font-black text-m-green" value={siteStats.achievements_budget} onChange={e => updateSiteStat('achievements_budget', e.target.value)} /></FieldGroup>
               <FieldGroup label="Leverage Ratio (%)"><Input className="text-2xl font-black" value={siteStats.achievements_leverage} onChange={e => updateSiteStat('achievements_leverage', e.target.value)} /></FieldGroup>
               <FieldGroup label="INDH Share (MDH)"><Input className="font-bold text-m-red" value={siteStats.achievements_indh_share} onChange={e => updateSiteStat('achievements_indh_share', e.target.value)} /></FieldGroup>
               <FieldGroup label="Partners Share (MDH)"><Input className="font-bold text-m-green" value={siteStats.achievements_partner_share} onChange={e => updateSiteStat('achievements_partner_share', e.target.value)} /></FieldGroup>
               <FieldGroup label="Yearly Avg Beneficiaries"><Input className="font-bold" value={siteStats.achievements_yearly_avg} onChange={e => updateSiteStat('achievements_yearly_avg', e.target.value)} /></FieldGroup>
               <FieldGroup label="Timeline Period"><Input className="font-mono text-m-green font-bold" value={siteStats.timeline_p3_period} onChange={e => updateSiteStat('timeline_p3_period', e.target.value)} /></FieldGroup>
            </div>
         </Card>

         {/* Programme 1 */}
         <Card className="border-l-4 border-l-blue-500">
            <CardHeader title="Programme 1 — Infrastructure & Basic Services" icon={BookOpen} />
            <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-6">
               <FieldGroup label="Budget (MDH)"><Input className="text-2xl font-black text-m-green" value={siteStats.p1_budget} onChange={e => updateSiteStat('p1_budget', e.target.value)} /></FieldGroup>
               <FieldGroup label="N° Projects"><Input className="font-bold text-2xl" value={siteStats.p1_projects} onChange={e => updateSiteStat('p1_projects', e.target.value)} /></FieldGroup>
               <FieldGroup label="Beneficiaries"><Input className="font-bold text-2xl" value={siteStats.p1_beneficiaries} onChange={e => updateSiteStat('p1_beneficiaries', e.target.value)} /></FieldGroup>
            </div>
         </Card>

         {/* Programme 2 */}
         <Card className="border-l-4 border-l-m-red">
            <CardHeader title="Programme 2 — Social Vulnerability" icon={Users} />
            <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-6">
               <FieldGroup label="Budget (MDH)"><Input className="text-2xl font-black text-m-green" value={siteStats.p2_budget} onChange={e => updateSiteStat('p2_budget', e.target.value)} /></FieldGroup>
               <FieldGroup label="N° Projects"><Input className="font-bold text-2xl" value={siteStats.p2_projects} onChange={e => updateSiteStat('p2_projects', e.target.value)} /></FieldGroup>
               <FieldGroup label="Beneficiaries"><Input className="font-bold text-2xl" value={siteStats.p2_beneficiaries} onChange={e => updateSiteStat('p2_beneficiaries', e.target.value)} /></FieldGroup>
            </div>
         </Card>

         {/* Programme 3 */}
         <Card className="border-l-4 border-l-amber-500">
            <CardHeader title="Programme 3 — Economic Empowerment (Youth)" icon={Activity} />
            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
               <FieldGroup label="Budget (MDH)"><Input className="text-2xl font-black text-m-green" value={siteStats.p3_budget} onChange={e => updateSiteStat('p3_budget', e.target.value)} /></FieldGroup>
               <FieldGroup label="N° Projects"><Input className="font-bold text-2xl" value={siteStats.p3_projects} onChange={e => updateSiteStat('p3_projects', e.target.value)} /></FieldGroup>
               <FieldGroup label="Beneficiaries"><Input className="font-bold text-2xl" value={siteStats.p3_beneficiaries} onChange={e => updateSiteStat('p3_beneficiaries', e.target.value)} /></FieldGroup>
               <FieldGroup label="Startups Created"><Input className="font-bold" value={siteStats.p3_startups} onChange={e => updateSiteStat('p3_startups', e.target.value)} /></FieldGroup>
               <FieldGroup label="Cooperatives"><Input className="font-bold" value={siteStats.p3_coops} onChange={e => updateSiteStat('p3_coops', e.target.value)} /></FieldGroup>
               <FieldGroup label="Sustainability Rate"><Input className="font-bold text-m-green" value={siteStats.p3_sustainability} onChange={e => updateSiteStat('p3_sustainability', e.target.value)} /></FieldGroup>
               <FieldGroup label="Women %"><Input className="font-bold text-m-red" value={siteStats.p3_women} onChange={e => updateSiteStat('p3_women', e.target.value)} /></FieldGroup>
            </div>
         </Card>

         {/* Programme 4 */}
         <Card className="border-l-4 border-l-m-green">
            <CardHeader title="Programme 4 — Human Capital (Education & Health)" icon={Globe} />
            <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-6">
               <FieldGroup label="Budget (MDH)"><Input className="text-2xl font-black text-m-green" value={siteStats.p4_budget} onChange={e => updateSiteStat('p4_budget', e.target.value)} /></FieldGroup>
               <FieldGroup label="N° Projects"><Input className="font-bold text-2xl" value={siteStats.p4_projects} onChange={e => updateSiteStat('p4_projects', e.target.value)} /></FieldGroup>
               <FieldGroup label="Beneficiaries"><Input className="font-bold text-2xl" value={siteStats.p4_beneficiaries} onChange={e => updateSiteStat('p4_beneficiaries', e.target.value)} /></FieldGroup>
               <FieldGroup label="School Support"><Input className="font-bold" value={siteStats.p4_school_support} onChange={e => updateSiteStat('p4_school_support', e.target.value)} /></FieldGroup>
               <FieldGroup label="Health Beneficiaries"><Input className="font-bold" value={siteStats.p4_health} onChange={e => updateSiteStat('p4_health', e.target.value)} /></FieldGroup>
               <FieldGroup label="Preschool Units"><Input className="font-bold" value={siteStats.p4_preschool} onChange={e => updateSiteStat('p4_preschool', e.target.value)} /></FieldGroup>
            </div>
         </Card>
      </div>
   );

   // ─── MEDIA LIBRARY PAGE ───────────────────────────────────────────────────
   const renderMediaLibraryPage = () => (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <div>
               <h3 className="text-xl font-bold">Media Library</h3>
               <p className="text-void/50 dark:text-white/50 text-sm mt-1">{galleryItems.length} posts — click anywhere to edit</p>
            </div>
            <button onClick={addGalleryItem} className="flex items-center gap-2 px-6 py-2.5 bg-m-green text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
               <Plus size={18} /> New Post
            </button>
         </div>

         <div className="grid grid-cols-1 gap-6">
            {galleryItems.map(item => (
               <Card key={item.id} className="group relative transition-all hover:shadow-md">
                  <button onClick={() => deleteGalleryItem(item.id)} className="absolute top-4 right-4 p-2 bg-red-500/10 text-red-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-500 hover:text-white" title="Delete post">
                     <Trash2 size={18} />
                  </button>
                  <div className="p-6 flex flex-col md:flex-row gap-6">
                     <div className="w-full lg:w-64 shrink-0 space-y-6">
                        {/* Main Image */}
                        <div className="space-y-3">
                           <p className="font-bold text-sm">Cover Image</p>
                           <div className="aspect-video bg-black/10 rounded-xl overflow-hidden border border-black/5 dark:border-white/5 relative">
                              <img src={item.src} className="w-full h-full object-cover" />
                           </div>
                           <ImageUploadField
                              value={item.src}
                              onChange={val => updateGalleryItem(item.id, { src: val })}
                              placeholder="Cover image URL..."
                           />
                        </div>

                     </div>
                     <div className="flex-1 space-y-6 min-w-0">
                        <div className="grid grid-cols-2 gap-4">
                           <FieldGroup label="Title" className="mb-0">
                              <Input className="font-bold" value={getTrans(item.titleKey as string)} onChange={e => updateTranslation(selectedLang, item.titleKey as string, e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                           </FieldGroup>
                           <FieldGroup label="Category Label" className="mb-0">
                              <Input value={getTrans(item.categoryLabelKey as string)} onChange={e => updateTranslation(selectedLang, item.categoryLabelKey as string, e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                           </FieldGroup>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                           <FieldGroup label="Date" className="mb-0">
                              <Input value={item.date} onChange={e => updateGalleryItem(item.id, { date: e.target.value })} />
                           </FieldGroup>
                           <FieldGroup label="Category" className="mb-0">
                              <select
                                 className="w-full bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none text-void dark:text-white"
                                 value={item.category}
                                 onChange={e => updateGalleryItem(item.id, { category: e.target.value })}
                              >
                                 <option value="social">Social</option>
                                 <option value="infra">Infrastructure</option>
                                 <option value="youth">Youth</option>
                                 <option value="events">Events</option>
                              </select>
                           </FieldGroup>
                           <FieldGroup label="Location" className="mb-0">
                              <Input value={getTrans(item.subtitleKey as string)} onChange={e => updateTranslation(selectedLang, item.subtitleKey as string, e.target.value)} dir={selectedLang === 'ar' ? 'rtl' : 'ltr'} />
                           </FieldGroup>
                        </div>

                        {/* Additional Images (Album) */}
                        <div className="border border-black/10 dark:border-white/10 rounded-xl p-4 space-y-4">
                           <div className="flex justify-between items-center">
                              <p className="font-bold text-sm">Album Images</p>
                              <button
                                 onClick={() => {
                                    const imgs = item.contentImages ? [...item.contentImages] : [];
                                    imgs.push('');
                                    updateGalleryItem(item.id, { contentImages: imgs });
                                 }}
                                 className="text-xs font-bold text-m-green bg-m-green/10 px-2 py-1 rounded hover:bg-m-green hover:text-white transition-colors"
                              >
                                 + Add Image
                              </button>
                           </div>
                           <div className="space-y-3">
                              {(item.contentImages || []).map((imgUrl, idx) => (
                                 <div key={idx} className="flex gap-2">
                                    <div className="w-12 h-12 shrink-0 bg-black/10 rounded border border-black/5 dark:border-white/5 overflow-hidden">
                                       {imgUrl && <img src={imgUrl} className="w-full h-full object-cover" />}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                       <ImageUploadField
                                          value={imgUrl}
                                          onChange={val => {
                                             const newImgs = [...item.contentImages!];
                                             newImgs[idx] = val;
                                             updateGalleryItem(item.id, { contentImages: newImgs });
                                          }}
                                          placeholder={`Image ${idx + 1} URL...`}
                                       />
                                       <button
                                          onClick={() => {
                                             const newImgs = item.contentImages!.filter((_, i) => i !== idx);
                                             updateGalleryItem(item.id, { contentImages: newImgs });
                                          }}
                                          className="text-[10px] text-red-500 hover:underline"
                                       >
                                          Remove
                                       </button>
                                    </div>
                                 </div>
                              ))}
                              {(!item.contentImages || item.contentImages.length === 0) && (
                                 <p className="text-xs text-void/40 dark:text-white/40 italic">No additional images.</p>
                              )}
                           </div>
                        </div>

                        <FieldGroup label="Full Description (displayed on post page)" className="mb-0">
                           <RichTextEditor
                              value={getTrans(item.detailsKey as string)}
                              onChange={html => updateTranslation(selectedLang, item.detailsKey as string, html)}
                              dir={selectedLang === 'ar' ? 'rtl' : 'ltr'}
                           />
                        </FieldGroup>
                     </div>
                  </div>
               </Card>
            ))}
         </div>
      </div>
   );

   // ─── SPEECHES PAGE ────────────────────────────────────────────────────────
   const renderSpeechesPage = () => (
      <div className="space-y-6">
         <div className="flex justify-between items-center">
            <div>
               <h3 className="text-xl font-bold">Royal Speeches & Letters</h3>
               <p className="text-void/50 dark:text-white/50 text-sm mt-1">{speeches.length} documents — click to expand and edit</p>
            </div>
            <button onClick={addSpeech} className="flex items-center gap-2 px-6 py-2.5 bg-amber-500 text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
               <Plus size={18} /> New Speech
            </button>
         </div>

         <div className="space-y-6">
            {speeches.map(speech => (
               <Card key={speech.id}>
                  <CardHeader
                     title={speech.type === 'speech' ? '📜 Royal Speech' : '✉️ Royal Letter'}
                     icon={FileText}
                  />
                  <div className="p-6 flex flex-col gap-6">
                     {/* Top Row: Image + Fields */}
                     <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {/* Image Preview */}
                        <div className="md:col-span-3 space-y-3">
                           <div className="aspect-[3/4] bg-black/10 rounded-xl overflow-hidden border border-black/5 dark:border-white/5">
                              <img src={speech.image} className="w-full h-full object-cover" />
                           </div>
                           <ImageUploadField
                              value={speech.image}
                              onChange={val => updateSpeech(speech.id, 'image', val)}
                              placeholder="Image URL or upload..."
                           />
                        </div>

                        {/* Editable Fields */}
                        <div className="md:col-span-9 space-y-4">
                           <div className="grid grid-cols-2 gap-4">
                              <FieldGroup label="Date">
                                 <Input value={speech.date} onChange={e => updateSpeech(speech.id, 'date', e.target.value)} dir="rtl" />
                              </FieldGroup>
                              <FieldGroup label="Type">
                                 <select
                                    className="w-full bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none transition-all text-void dark:text-white"
                                    value={speech.type}
                                    onChange={e => updateSpeech(speech.id, 'type', e.target.value)}
                                 >
                                    <option value="speech">Royal Speech</option>
                                    <option value="letter">Royal Letter</option>
                                 </select>
                              </FieldGroup>
                           </div>
                           <FieldGroup label="Title (Arabic)">
                              <Input className="font-bold text-lg" value={speech.title} onChange={e => updateSpeech(speech.id, 'title', e.target.value)} dir="rtl" />
                           </FieldGroup>
                           <FieldGroup label="Speech URL ID (used in /speech/:id links)">
                              <Input className="font-mono text-xs text-void/60 dark:text-white/60" value={speech.id} disabled readOnly />
                           </FieldGroup>
                        </div>
                     </div>

                     {/* Content Editor */}
                     <div className="border-t border-black/5 dark:border-white/5 pt-6">
                        <FieldGroup label="Full Speech Content in Arabic — one paragraph per line">
                           <TextArea
                              className="font-cairo leading-[2] text-sm min-h-[400px] text-right"
                              value={speech.content.join('\n')}
                              onChange={e => updateSpeech(speech.id, 'content', e.target.value.split('\n'))}
                              dir="rtl"
                           />
                        </FieldGroup>
                     </div>

                     {/* Delete */}
                     <div className="flex justify-end border-t border-black/5 dark:border-white/5 pt-4">
                        <button
                           onClick={() => deleteSpeech(speech.id)}
                           className="flex items-center gap-2 px-5 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500 hover:text-white transition-all text-sm font-bold"
                        >
                           <Trash2 size={16} /> Delete Speech
                        </button>
                     </div>
                  </div>
               </Card>
            ))}
         </div>
      </div>
   );

   return (
      <div className="flex h-screen bg-gray-50 dark:bg-[#002E24] font-sans selection:bg-m-green/30 text-void dark:text-white relative overflow-hidden transition-colors duration-500">
         {/* Animated Background Mesh */}
         <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
            <div className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-sky-500/10 dark:bg-sky-900/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob" />
            <div className="absolute top-1/3 -right-1/4 w-[60vw] h-[60vw] bg-emerald-500/10 dark:bg-emerald-900/40 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob animation-delay-2000" />
            <div className="absolute -bottom-1/4 left-1/3 w-[40vw] h-[40vw] bg-red-500/10 dark:bg-red-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[90px] animate-blob animation-delay-4000" />
         </div>

         {/* Floating Sidebar */}
         <aside className="w-[280px] m-4 mr-0 rounded-2xl bg-white dark:bg-black/20 backdrop-blur-2xl border border-black/5 dark:border-white/10 flex flex-col shrink-0 z-20 shadow-xl relative overflow-hidden transition-colors duration-500">
            {/* Gloss reflection overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/50 dark:from-white/5 to-transparent pointer-events-none" />

            {/* Logo Area */}
            <div className="h-24 flex items-center px-6 border-b border-black/5 dark:border-white/5 relative z-10 transition-colors duration-500">
               <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                     <div className="absolute inset-0 bg-white/20 rounded-xl rounded-tr-3xl" />
                     <Monitor size={22} className="text-white relative z-10" />
                  </div>
                  <div>
                     <h1 className="font-bold text-[19px] tracking-tight text-void dark:text-white leading-tight transition-colors duration-500">INDH Admin</h1>
                     <span className="text-[10px] uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold opacity-80 transition-colors duration-500">Command Center</span>
                  </div>
               </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar relative z-10">
               {PAGES_CONFIG.map(page => (
                  <button
                     key={page.id}
                     onClick={() => handlePageChange(page.id)}
                     className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all group relative overflow-hidden ${activePageId === page.id
                        ? 'bg-m-green/10 dark:bg-white/15 text-m-green dark:text-white shadow-sm border border-m-green/20 dark:border-white/10 font-bold'
                        : 'text-void/60 hover:bg-black/5 dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white'
                        }`}
                  >
                     {/* Glow behind icon when active */}
                     {activePageId === page.id && (
                        <div className="absolute left-4 w-5 h-5 bg-m-green/20 dark:bg-white/40 blur-md rounded-full transition-colors duration-500" />
                     )}
                     <page.icon size={18} className={`${activePageId === page.id ? 'text-m-green dark:text-white' : page.color} relative z-10 transition-colors duration-500`} />
                     <span className="text-sm tracking-wide relative z-10">{page.title}</span>
                  </button>
               ))}
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-black/5 dark:border-white/5 relative z-10 bg-black/[0.02] dark:bg-black/20 transition-colors duration-500">
               <button onClick={onLogout} className="flex items-center gap-3 px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl w-full transition-all font-bold text-sm tracking-wide shadow-sm">
                  <LogOut size={16} />
                  Secure Logout
               </button>
            </div>
         </aside>

         {/* Main Content Area */}
         <main className="flex-1 flex flex-col min-w-0 z-10 relative">
            {/* Top Bar (Floating Glassmorphism) */}
            <div className="p-4 pb-0 z-30">
               <header className="h-20 rounded-2xl border border-black/5 dark:border-white/10 bg-white/70 dark:bg-black/20 backdrop-blur-3xl px-6 lg:px-8 flex items-center justify-between shadow-sm dark:shadow-2xl relative overflow-hidden transition-colors duration-500">
                  {/* Gloss line */}
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/20 to-transparent" />

                  {/* Title */}
                  <div className="flex items-center gap-4 relative z-10 transition-colors duration-500">
                     <div className="w-1 h-8 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                     <h2 className="text-xl lg:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-void to-void/70 dark:from-white dark:to-white/70 transition-colors duration-500">
                        {activePage.title}
                     </h2>
                  </div>

                  <div className="flex items-center gap-2 sm:gap-4 transition-colors duration-500">
                     {/* Theme Toggle */}
                     <button
                        onClick={toggleTheme}
                        className="p-2 rounded-xl text-void/40 hover:text-void hover:bg-black/5 dark:text-white/40 dark:hover:text-white dark:hover:bg-white/5 transition-all border border-transparent dark:hover:border-white/5 hover:border-black/5"
                        title="Toggle Dark Mode"
                     >
                        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                     </button>

                     {/* Language Switcher */}
                     <div className="hidden sm:flex bg-black/5 dark:bg-black/40 p-1 rounded-xl border border-black/5 dark:border-white/5 transition-colors duration-500">
                        {(['ar', 'fr', 'en'] as const).map(lang => (
                           <button
                              key={lang}
                              onClick={() => setSelectedLang(lang)}
                              className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${selectedLang === lang
                                 ? 'bg-white dark:bg-white/20 text-void dark:text-white shadow-sm dark:shadow-md'
                                 : 'text-void/40 hover:text-void/80 hover:bg-black/5 dark:text-white/40 dark:hover:text-white/80 dark:hover:bg-white/5'
                                 }`}
                           >
                              {lang}
                           </button>
                        ))}
                     </div>

                     <div className="hidden sm:block h-8 w-px bg-black/10 dark:bg-white/10 mx-1 transition-colors duration-500" />

                     {/* Action Buttons */}
                     <button onClick={() => setShowResetConfirm(true)} className="p-2.5 text-red-600 hover:text-red-700 bg-red-50 dark:bg-black/40 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-xl transition-all border border-red-100 dark:border-white/5 dark:hover:border-red-500/30" title="Reset All Defaults">
                        <RefreshCw size={18} />
                     </button>
                     <button onClick={() => setShowSaveConfirm(true)} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white rounded-xl font-bold border border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all transform hover:-translate-y-0.5">
                        <Save size={16} />
                        <span className="hidden sm:inline tracking-wide">Publish Changes</span>
                        <span className="sm:hidden tracking-wide">Save</span>
                     </button>
                  </div>
               </header>
            </div>

            {/* Sub Navigation (Tabs) */}
            {activePage.tabs.length > 0 && (
               <div className="px-8 pt-6 pb-0 bg-white/50 dark:bg-void/50 border-b border-black/5 dark:border-white/5">
                  <div className="flex gap-6 overflow-x-auto scrollbar-hide">
                     {activePage.tabs.map(tab => (
                        <button
                           key={tab.id}
                           onClick={() => setActiveTabId(tab.id)}
                           className={`pb-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${activeTabId === tab.id
                              ? 'border-m-red text-m-red'
                              : 'border-transparent text-void/40 dark:text-white/40 hover:text-void dark:hover:text-white'
                              }`}
                        >
                           {tab.label}
                        </button>
                     ))}
                  </div>
               </div>
            )}

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
               <div className="max-w-7xl mx-auto pb-20">
                  <AnimatePresence mode="wait">
                     <motion.div
                        key={activePageId + activeTabId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                     >
                        {activePageId === 'home' && activeTabId === 'hero' && renderHomeHero()}
                        {activePageId === 'home' && activeTabId === 'speech' && renderRoyalSpeechSection()}
                        {activePageId === 'home' && activeTabId === 'timeline' && renderHomeTimeline()}
                        {activePageId === 'home' && activeTabId === 'stats' && renderHomeStats()}
                        {activePageId === 'programs' && activeTabId === 'hero' && renderProgramsHero()}
                        {activePageId === 'programs' && activeTabId.startsWith('p') && renderProgram(parseInt(activeTabId.replace('p', '')))}
                        {activePageId === 'achievements' && activeTabId === 'hero' && renderAchievementsHero()}
                        {activePageId === 'achievements' && activeTabId === 'main' && renderAchievementsStats()}
                        {activePageId === 'achievements' && activeTabId === 'text' && (
                           <Card><CardHeader title="Page Text" icon={Type} />
                              <div className="p-6 space-y-4">
                                 <FieldGroup label="Title"><Input value={getTrans('achievements.title')} onChange={(e) => updateTranslation(selectedLang, 'achievements.title', e.target.value)} /></FieldGroup>
                                 <FieldGroup label="Subtitle"><Input value={getTrans('achievements.subtitle')} onChange={(e) => updateTranslation(selectedLang, 'achievements.subtitle', e.target.value)} /></FieldGroup>
                                 <FieldGroup label="Description"><TextArea value={getTrans('achievements.desc')} onChange={(e) => updateTranslation(selectedLang, 'achievements.desc', e.target.value)} /></FieldGroup>
                              </div>
                           </Card>
                        )}
                        {activePageId === 'achievements' && activeTabId === 'pillars' && renderAchievementsPillars()}
                        {activePageId === 'achievements' && activeTabId === 'labels' && renderAchievementsLabels()}
                        {activePageId === 'youth' && activeTabId === 'hero' && renderYouthHero()}
                        {activePageId === 'youth' && activeTabId === 'stats' && (
                           <Card><CardHeader title="Key Stats" icon={Hash} />
                              <div className="p-6 grid grid-cols-3 gap-6">
                                 <FieldGroup label="Visitors"><Input className="font-bold text-xl" value={siteStats.youth_visitors} onChange={(e) => updateSiteStat('youth_visitors', e.target.value)} /></FieldGroup>
                                 <FieldGroup label="Trained"><Input className="font-bold text-xl" value={siteStats.youth_trained} onChange={(e) => updateSiteStat('youth_trained', e.target.value)} /></FieldGroup>
                                 <FieldGroup label="Funded"><Input className="font-bold text-xl" value={siteStats.youth_funded} onChange={(e) => updateSiteStat('youth_funded', e.target.value)} /></FieldGroup>
                              </div>
                           </Card>
                        )}
                        {activePageId === 'youth' && activeTabId === 'content' && renderYouthSections()}
                        {activePageId === 'gallery' && activeTabId === 'hero' && renderGalleryHero()}
                        {activePageId === 'gallery' && activeTabId === 'posts' && renderGallery()}
                        {activePageId === 'history' && activeTabId === 'hero' && renderHistoryText()}
                        {activePageId === 'history' && activeTabId === 'speeches' && renderSpeeches()}
                        {activePageId === 'history' && activeTabId === 'sections' && renderHistorySections()}
                        {activePageId === 'settings' && (
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                              <Card><CardHeader title="Footer" icon={Layout} />
                                 <div className="p-6 space-y-4">
                                    <FieldGroup label="About Text"><TextArea value={getTrans('footer.desc')} onChange={(e) => updateTranslation(selectedLang, 'footer.desc', e.target.value)} /></FieldGroup>
                                    <FieldGroup label="Copyright"><Input value={getTrans('footer.rights')} onChange={(e) => updateTranslation(selectedLang, 'footer.rights', e.target.value)} /></FieldGroup>
                                 </div>
                              </Card>
                           </div>
                        )}
                        {/* ? NEW DEDICATED PAGES  */}
                        {activePageId === 'images' && renderImagesPage()}
                        {activePageId === 'phase3' && renderPhase3Page()}
                        {activePageId === 'media' && renderMediaLibraryPage()}
                        {activePageId === 'speeches_mgr' && renderSpeechesPage()}
                        {activePageId === 'admin_settings' && <SettingsPage />}
                     </motion.div>
                  </AnimatePresence>
               </div>
            </div>
         </main>

         {/* Confirmation Modals */}
         <AnimatePresence>
            {showSaveConfirm && (
               <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                  <motion.div
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.9 }}
                     className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-black/10 dark:border-white/10"
                  >
                     <div className="flex flex-col items-center text-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-m-green/10 flex items-center justify-center text-m-green">
                           <Save size={24} />
                        </div>
                        <div>
                           <h3 className="text-lg font-bold text-void dark:text-white mb-1">Save Changes?</h3>
                           <p className="text-sm text-void/60 dark:text-white/60">Are you sure you want to save all changes to local storage?</p>
                        </div>
                        <div className="flex gap-3 w-full mt-2">
                           <button onClick={() => setShowSaveConfirm(false)} className="flex-1 py-2.5 rounded-xl border border-black/10 dark:border-white/10 font-bold text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                              Cancel
                           </button>
                           <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl bg-m-green text-white font-bold text-sm hover:bg-emerald-600 transition-colors shadow-lg shadow-m-green/20">
                              Confirm
                           </button>
                        </div>
                     </div>
                  </motion.div>
               </div>
            )}

            {showResetConfirm && (
               <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                  <motion.div
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.9 }}
                     className="bg-white dark:bg-[#1a1a1a] rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-black/10 dark:border-white/10"
                  >
                     <div className="flex flex-col items-center text-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                           <Trash2 size={24} />
                        </div>
                        <div>
                           <h3 className="text-lg font-bold text-void dark:text-white mb-1">Reset All Data?</h3>
                           <p className="text-sm text-void/60 dark:text-white/60">This will revert all content to default values. This action cannot be undone.</p>
                        </div>
                        <div className="flex gap-3 w-full mt-2">
                           <button onClick={() => setShowResetConfirm(false)} className="flex-1 py-2.5 rounded-xl border border-black/10 dark:border-white/10 font-bold text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                              Cancel
                           </button>
                           <button onClick={handleReset} className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20">
                              Reset
                           </button>
                        </div>
                     </div>
                  </motion.div>
               </div>
            )}
         </AnimatePresence>
      </div>
   );
};

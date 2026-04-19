import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations as initialTranslations } from '../data/translations';
import { galleryItems as initialGallery } from '../data/galleryData';
import { speechesData as initialSpeeches, Speech } from '../data/speechesData';

// Initial Dynamic Data
const initialSiteImages = {
  home_hero: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?q=80&w=2600&auto=format&fit=crop",
  programs_hero: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2069&auto=format&fit=crop",
  history_hero: "https://lh3.googleusercontent.com/d/1xe1wxz3oZ7NmHn-Yy8iQ0n3C3ZUShARr",
  youth_hero: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2000&auto=format&fit=crop",
  gallery_hero: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2000&auto=format&fit=crop",
  achievements_hero: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
  royal_portrait: "https://lh3.googleusercontent.com/d/1XFCgslkZ8g-SnrEnKR0KFNxNWQ6nvZKU",
  // Programs Images
  programs_p1: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=1000&auto=format&fit=crop",
  programs_p2: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=1000&auto=format&fit=crop",
  programs_p3: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop",
  programs_p4: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop",
  // Timeline Images
  timeline_p1: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=500&auto=format&fit=crop",
  timeline_p2: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=500&auto=format&fit=crop",
  timeline_p3: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=500&auto=format&fit=crop",
  // Phases Page
  phases_hero: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
  // About Page
  about_hero: "https://lh3.googleusercontent.com/d/1xe1wxz3oZ7NmHn-Yy8iQ0n3C3ZUShARr",
  // Contact Page
  contact_hero: "https://images.unsplash.com/photo-1423592707957-763e7d22ce62?q=80&w=2000&auto=format&fit=crop",
};

const initialSiteStats = {
  // Home
  home_projects: "+44K",

  // Timeline
  timeline_p1_period: "2005 - 2010",
  timeline_p2_period: "2011 - 2018",
  timeline_p3_period: "2019 - 2023",
  timeline_p1_beneficiaries: "10M+",
  timeline_p2_projects: "4000+",

  // Achievements Dashboard
  achievements_beneficiaries: "88K",
  achievements_budget: "96.8",
  achievements_projects: "397",
  achievements_leverage: "46",
  achievements_yearly_avg: "10.6K",
  achievements_indh_share: "53.5",
  achievements_partner_share: "43.3",

  // Program 1
  p1_budget: "1.42",
  p1_projects: "12",
  p1_beneficiaries: "1167",

  // Program 2
  p2_projects: "108",
  p2_beneficiaries: "8106",
  p2_budget: "39.65",

  // Program 3
  p3_budget: "34.03",
  p3_projects: "187",
  p3_beneficiaries: "4105",
  p3_startups: "141",
  p3_coops: "46",
  p3_sustainability: "100%",
  p3_women: "61%",

  // Program 4
  p4_budget: "21.70",
  p4_projects: "90",
  p4_beneficiaries: "74K",
  p4_school_support: "61.6K",
  p4_health: "11.9K",
  p4_preschool: "622",

  // Youth Platform
  youth_visitors: "4105",
  youth_trained: "3236",
  youth_funded: "187",
};

// Define types
type TranslationsType = typeof initialTranslations;
type GalleryType = typeof initialGallery;
type SpeechesType = typeof initialSpeeches;
type SiteImagesType = typeof initialSiteImages;
type SiteStatsType = typeof initialSiteStats;

interface ContentContextType {
  translations: TranslationsType;
  galleryItems: GalleryType;
  speeches: SpeechesType;
  siteImages: SiteImagesType;
  siteStats: SiteStatsType;
  updateTranslation: (lang: keyof TranslationsType, key: string, value: string) => void;
  updateGalleryItem: (id: number, updatedItem: any) => void;
  addGalleryItem: () => void;
  deleteGalleryItem: (id: number) => void;
  updateSpeech: (id: string, field: keyof Speech, value: any) => void;
  addSpeech: () => void;
  deleteSpeech: (id: string) => void;
  updateSiteImage: (key: keyof SiteImagesType, value: string) => void;
  updateSiteStat: (key: keyof SiteStatsType, value: string) => void;
  saveChanges: () => void;
  resetToDefaults: () => void;
  loadMoreFacebookPosts: () => Promise<void>;
  hasMoreFacebookPosts: boolean;
  isLoadingFbPosts: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from API or fall back to initial data
  const [translations, setTranslations] = useState<TranslationsType>(initialTranslations);
  const [galleryItems, setGalleryItems] = useState<GalleryType>(initialGallery);
  const [speeches, setSpeeches] = useState<SpeechesType>(initialSpeeches);
  const [siteImages, setSiteImages] = useState<SiteImagesType>(initialSiteImages);
  const [siteStats, setSiteStats] = useState<SiteStatsType>(initialSiteStats);
  const [isLoadingFbPosts, setIsLoadingFbPosts] = useState<boolean>(false);

  // Route all Google-hosted images through the backend proxy.
  // Direct browser requests to lh3.googleusercontent.com get 429 rate-limited.
  // The proxy fetches with proper browser headers on the server side, bypassing this.
  const resolveGDriveUrl = (url: string): string => {
    if (!url) return url;

    // Already going through our proxy — leave it alone
    if (url.includes('/api/proxy-image')) return url;

    // Route lh3 URLs through the proxy to avoid 429 rate limit from browser requests
    if (url.includes('lh3.googleusercontent.com')) {
      return `/api/proxy-image?url=${encodeURIComponent(url)}`;
    }

    if (!url.includes('drive.google.com')) return url;

    let fileId: string | null = null;

    // /file/d/ID/ — most common "Copy link" format
    const fileMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileMatch) fileId = fileMatch[1];

    // ?id=ID or &id=ID — covers uc?id=, uc?export=view&id=, open?id=
    if (!fileId) {
      const idMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      if (idMatch) fileId = idMatch[1];
    }

    if (fileId) {
      const targetUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
      return `/api/proxy-image?url=${encodeURIComponent(targetUrl)}`;
    }

    return url;
  };

  const parseFbDataToGalleryItem = (post: any) => {
    const fDate = new Date(post.created_time).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    let title = 'INDH Activity';
    if (post.message) {
      const firstLine = post.message.split('\n')[0].trim();
      if (firstLine.startsWith('#')) {
        title = firstLine.replace(/#/g, '').replace(/_/g, ' ').replace(/([a-z])([A-ZÀ-Ö])/g, '$1 $2').replace(/([A-ZÀ-Ö])([A-ZÀ-Ö][a-z])/g, '$1 $2').replace(/\s+/g, ' ').trim();
      } else {
        title = firstLine.length > 50 ? firstLine.slice(0, 50) + '...' : firstLine;
      }
    }

    let titleFr = title;
    let titleEn = title;
    let descFr = post.message || 'No description provided.';
    let descEn = post.message || 'No description provided.';

    if (post.translations) {
      if (post.translations.fr) {
        let firstLine = post.translations.fr.split('\n')[0].trim();
        if (firstLine.startsWith('#')) {
          firstLine = firstLine.replace(/#/g, '').replace(/_/g, ' ').replace(/([a-z])([A-ZÀ-Ö])/g, '$1 $2').replace(/([A-ZÀ-Ö])([A-ZÀ-Ö][a-z])/g, '$1 $2').replace(/\s+/g, ' ').trim();
        } else if (firstLine.length > 50) {
          firstLine = firstLine.slice(0, 50) + '...';
        }
        titleFr = firstLine;
        descFr = post.translations.fr;
      }
      if (post.translations.en) {
        let firstLine = post.translations.en.split('\n')[0].trim();
        if (firstLine.startsWith('#')) {
          firstLine = firstLine.replace(/#/g, '').replace(/_/g, ' ').replace(/([a-z])([A-ZÀ-Ö])/g, '$1 $2').replace(/([A-ZÀ-Ö])([A-ZÀ-Ö][a-z])/g, '$1 $2').replace(/\s+/g, ' ').trim();
        } else if (firstLine.length > 50) {
          firstLine = firstLine.slice(0, 50) + '...';
        }
        titleEn = firstLine;
        descEn = post.translations.en;
      }
    }

    let images: string[] = [];
    if (post.attachments && post.attachments.data && post.attachments.data.length > 0) {
      const attachment = post.attachments.data[0];
      if (attachment.subattachments && attachment.subattachments.data) {
        attachment.subattachments.data.forEach((sub: any) => {
          if (sub.media && sub.media.image && sub.media.image.src) images.push(sub.media.image.src);
        });
      } else if (attachment.media && attachment.media.image && attachment.media.image.src) {
        images.push(attachment.media.image.src);
      }
    }
    if (images.length === 0 && post.full_picture) images.push(post.full_picture);
    images = [...new Set(images)];

    const titleKey = `fb.${post.id}.title`;
    const descKey = `fb.${post.id}.desc`;

    return {
      id: post.id,
      src: images.length > 0 ? images[0] : "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop",
      category: 'events',
      titleKey: titleKey,
      categoryLabelKey: 'activity.cat.facebook',
      subtitleKey: 'loc.center',
      date: fDate,
      descriptionKey: descKey,
      detailsKey: descKey,
      contentImages: images,
      videoUrl: post.videoUrl || undefined,
      _dynamicTrans: {
        [titleKey]: { ar: title, fr: titleFr, en: titleEn },
        [descKey]: { ar: post.message || 'No description provided.', fr: descFr, en: descEn }
      }
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/content?t=${Date.now()}`);
        let fetchedGallery = initialGallery; // Store reference to mutate later
        if (res.ok) {
          const data = await res.json();
          if (data) {
            if (data.translations) {
              // Merge JSON data with our static Dictionary to always pick up new code-level translation keys
              const mergedTranslations = { ...initialTranslations };

              if (data.translations.ar) mergedTranslations.ar = { ...initialTranslations.ar, ...data.translations.ar, 'activity.cat.facebook': initialTranslations.ar['activity.cat.facebook'] };
              if (data.translations.fr) mergedTranslations.fr = { ...initialTranslations.fr, ...data.translations.fr, 'activity.cat.facebook': initialTranslations.fr['activity.cat.facebook'] };
              if (data.translations.en) mergedTranslations.en = { ...initialTranslations.en, ...data.translations.en, 'activity.cat.facebook': initialTranslations.en['activity.cat.facebook'] };

              setTranslations(mergedTranslations);
            }
            if (data.galleryItems) {
              // Resolve any saved Drive links on load
              const fixedGallery = data.galleryItems.map((item: any) => ({
                ...item,
                src: resolveGDriveUrl(item.src),
                contentImages: (item.contentImages || []).map(resolveGDriveUrl),
              }));
              setGalleryItems(fixedGallery);
              fetchedGallery = fixedGallery;
            }
            if (data.speeches) {
              // Resolve Drive links in speech images on load
              setSpeeches(data.speeches.map((s: any) => ({ ...s, image: resolveGDriveUrl(s.image) })));
            }
            if (data.siteImages) {
              // Resolve Drive links in all site images on load
              const fixedImages: any = {};
              for (const k of Object.keys(data.siteImages)) {
                fixedImages[k] = resolveGDriveUrl(data.siteImages[k]);
              }
              setSiteImages({ ...initialSiteImages, ...fixedImages });
            }
            if (data.siteStats) setSiteStats(data.siteStats);
          }
        }

        // Load Facebook Feed from pre-built static JSON (zero latency, baked in at build time)
        try {
          const fbRes = await fetch('/posts.json');
          if (fbRes.ok) {
            const fbData = await fbRes.json();
            if (fbData && fbData.data) {
              const fbGalleryItems = fbData.data.map(parseFbDataToGalleryItem);

              setTranslations(prev => {
                const newTrans: any = { ...prev };
                fbGalleryItems.forEach((item: any) => {
                  if (item._dynamicTrans) {
                    Object.keys(item._dynamicTrans).forEach(k => {
                      newTrans.ar[k] = item._dynamicTrans[k].ar;
                      newTrans.fr[k] = item._dynamicTrans[k].fr;
                      newTrans.en[k] = item._dynamicTrans[k].en;
                    });
                  }
                });
                return newTrans;
              });

              setGalleryItems([...fbGalleryItems, ...fetchedGallery]);
            }
          }
        } catch (fbError) {
          console.error("Could not fetch Facebook feed from Google Apps Script:", fbError);
        }

      } catch (error) {
        console.error('Failed to fetch content:', error);
      }
    };
    fetchData();
  }, []);

  // All posts are loaded at once from Google Sheets — no pagination needed
  const loadMoreFacebookPosts = async () => {
    // No-op: Google Sheets serves all posts in a single request
  };

  const updateTranslation = (lang: keyof TranslationsType, key: string, value: string) => {
    setTranslations(prev => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [key]: value
      }
    }));
  };

  const updateGalleryItem = (id: number, updatedItem: any) => {
    if (updatedItem.src) updatedItem = { ...updatedItem, src: resolveGDriveUrl(updatedItem.src) };
    setGalleryItems(prev => prev.map(item => item.id === id ? { ...item, ...updatedItem } : item));
  };

  const addGalleryItem = () => {
    const newId = Date.now();
    const newKeyBase = `custom.gallery.${newId}`;

    // Create new entries in translations for the new item
    const newTranslations = { ...translations };
    (['ar', 'fr', 'en'] as const).forEach(lang => {
      if (lang === 'ar') {
        // @ts-ignore
        newTranslations[lang][`${newKeyBase}.title`] = "عنوان جديد";
        // @ts-ignore
        newTranslations[lang][`${newKeyBase}.cat`] = "فئة";
        // @ts-ignore
        newTranslations[lang][`${newKeyBase}.loc`] = "موقع";
        // @ts-ignore
        newTranslations[lang][`${newKeyBase}.desc`] = "وصف مختصر...";
        // @ts-ignore
        newTranslations[lang][`${newKeyBase}.details`] = "التفاصيل الكاملة...";
      } else if (lang === 'fr') {
        // @ts-ignore
        newTranslations[lang][`${newKeyBase}.title`] = "Nouveau Titre";
        // @ts-ignore
        newTranslations[lang][`${newKeyBase}.cat`] = "Catégorie";
        // @ts-ignore
        newTranslations[lang][`${newKeyBase}.loc`] = "Lieu";
        // @ts-ignore
        newTranslations[lang][`${newKeyBase}.desc`] = "Brève description...";
        // @ts-ignore
        newTranslations[lang][`${newKeyBase}.details`] = "Détails complets...";
      } else {
        // @ts-ignore
        newTranslations[lang][`${newKeyBase}.title`] = "New Title";
        // @ts-ignore
        newTranslations[lang][`${newKeyBase}.cat`] = "Category";
        // @ts-ignore
        newTranslations[lang][`${newKeyBase}.loc`] = "Location";
        // @ts-ignore
        newTranslations[lang][`${newKeyBase}.desc`] = "Short description...";
        // @ts-ignore
        newTranslations[lang][`${newKeyBase}.details`] = "Full details...";
      }
    });
    setTranslations(newTranslations);

    const newItem = {
      id: newId,
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000&auto=format&fit=crop", // Placeholder
      category: 'social',
      titleKey: `${newKeyBase}.title`,
      categoryLabelKey: `${newKeyBase}.cat`,
      subtitleKey: `${newKeyBase}.loc`,
      date: new Date().getFullYear().toString(),
      descriptionKey: `${newKeyBase}.desc`,
      detailsKey: `${newKeyBase}.details`,
      contentImages: []
    };

    // @ts-ignore
    setGalleryItems(prev => [newItem, ...prev]);
  };

  const deleteGalleryItem = (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setGalleryItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const updateSpeech = (id: string, field: keyof Speech, value: any) => {
    // Auto-resolve Google Drive links in image field
    if (field === 'image' && typeof value === 'string') value = resolveGDriveUrl(value);
    setSpeeches(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addSpeech = () => {
    const newId = `speech-${Date.now()}`;
    const newSpeech: Speech = {
      id: newId,
      type: 'speech',
      date: new Date().toLocaleDateString('ar-MA'),
      title: 'خطاب ملكي جديد',
      image: "https://lh3.googleusercontent.com/d/1xe1wxz3oZ7NmHn-Yy8iQ0n3C3ZUShARr",
      content: ['أدخل نص الخطاب هنا...']
    };
    setSpeeches(prev => [newSpeech, ...prev]);
  };

  const deleteSpeech = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الخطاب؟')) {
      setSpeeches(prev => prev.filter(s => s.id !== id));
    }
  };

  const updateSiteImage = (key: keyof SiteImagesType, value: string) => {
    setSiteImages(prev => ({ ...prev, [key]: resolveGDriveUrl(value) }));
  };

  const updateSiteStat = (key: keyof SiteStatsType, value: string) => {
    setSiteStats(prev => ({ ...prev, [key]: value }));
  };

  const saveChanges = async () => {
    try {
      const data = {
        translations,
        galleryItems: galleryItems.filter(item => typeof item.id === 'number'),
        speeches,
        siteImages,
        siteStats
      };
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        alert('تم حفظ التغييرات بنجاح على الخادم!');
      } else {
        alert('حدث خطأ أثناء الحفظ.');
      }
    } catch (error) {
      console.error('Save failed:', error);
      alert('حدث خطأ أثناء الحفظ.');
    }
  };

  const resetToDefaults = async () => {
    if (confirm('هل أنت متأكد؟ سيتم مسح جميع تعديلاتك والعودة إلى البيانات الافتراضية.')) {
      setTranslations(initialTranslations);
      setGalleryItems(initialGallery);
      setSpeeches(initialSpeeches);
      setSiteImages(initialSiteImages);
      setSiteStats(initialSiteStats);

      // Save the defaults to the server to overwrite current data
      try {
        await fetch('/api/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            translations: initialTranslations,
            galleryItems: initialGallery,
            speeches: initialSpeeches,
            siteImages: initialSiteImages,
            siteStats: initialSiteStats
          })
        });
        window.location.reload();
      } catch (error) {
        console.error('Reset failed:', error);
      }
    }
  };

  return (
    <ContentContext.Provider value={{
      translations,
      galleryItems,
      speeches,
      siteImages,
      siteStats,
      updateTranslation,
      updateGalleryItem,
      addGalleryItem,
      deleteGalleryItem,
      updateSpeech,
      addSpeech,
      deleteSpeech,
      updateSiteImage,
      updateSiteStat,
      saveChanges,
      resetToDefaults,
      loadMoreFacebookPosts,
      hasMoreFacebookPosts: false,
      isLoadingFbPosts
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
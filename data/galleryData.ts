import { translations } from './translations';

export interface GalleryItem {
  id: number;
  src: string;
  category: 'infra' | 'social' | 'youth' | 'events';
  titleKey: keyof typeof translations['ar'];
  categoryLabelKey: keyof typeof translations['ar'];
  subtitleKey: keyof typeof translations['ar'];
  date: string;
  descriptionKey: keyof typeof translations['ar'];
  detailsKey: keyof typeof translations['ar'];
  contentImages?: string[];
  videoUrl?: string;
}

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
    category: 'social',
    titleKey: 'activity.1.title',
    categoryLabelKey: 'activity.1.cat',
    subtitleKey: 'loc.rural',
    date: '2023',
    descriptionKey: 'activity.1.desc',
    detailsKey: 'activity.1.details',
    contentImages: [
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571210862729-78a52d3779a2?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1576091160550-2187d80a1b95?q=80&w=800&auto=format&fit=crop",
    category: 'social',
    titleKey: 'activity.2.title',
    categoryLabelKey: 'activity.2.cat',
    subtitleKey: 'loc.center',
    date: '2023',
    descriptionKey: 'activity.2.desc',
    detailsKey: 'activity.2.details',
    contentImages: [
      "https://images.unsplash.com/photo-1576091160550-2187d80a1b95?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
    category: 'youth',
    titleKey: 'activity.3.title',
    categoryLabelKey: 'activity.3.cat',
    subtitleKey: 'loc.platform',
    date: '2023',
    descriptionKey: 'activity.3.desc',
    detailsKey: 'activity.3.details',
    contentImages: [
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop",
    category: 'infra',
    titleKey: 'activity.4.title',
    categoryLabelKey: 'activity.4.cat',
    subtitleKey: 'loc.transport',
    date: '2022',
    descriptionKey: 'activity.4.desc',
    detailsKey: 'activity.4.details',
    contentImages: [
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=800&auto=format&fit=crop",
    category: 'youth',
    titleKey: 'activity.5.title',
    categoryLabelKey: 'activity.5.cat',
    subtitleKey: 'loc.sports',
    date: '2022',
    descriptionKey: 'activity.5.desc',
    detailsKey: 'activity.5.details',
    contentImages: [
      "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518611507436-f9221403cca2?q=80&w=800&auto=format&fit=crop"
    ]
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop",
    category: 'social',
    titleKey: 'activity.6.title',
    categoryLabelKey: 'activity.6.cat',
    subtitleKey: 'loc.dialysis',
    date: '2022',
    descriptionKey: 'activity.6.desc',
    detailsKey: 'activity.6.details',
    contentImages: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=800&auto=format&fit=crop"
    ]
  }
];
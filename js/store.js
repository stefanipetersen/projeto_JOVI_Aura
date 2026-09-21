/**
 * JOVI Aura - Central Data Store & LocalStorage Handler
 */

const STORAGE_KEYS = {
  PHOTOS: 'jovi_aura_photos',
  FILTERS: 'jovi_aura_filters',
  TAGS: 'jovi_aura_tags',
  EVENTS: 'jovi_aura_events',
  SETTINGS: 'jovi_aura_settings'
};

// Initial Demo Seed Data
const DEMO_PHOTOS = [
  {
    id: 'photo_1',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    title: 'Ana no Café de Tarde',
    category: 'Pessoa',
    tags: ['Ana', 'Restaurante', 'Momentos'],
    filterId: 'filter_warm',
    date: '2026-09-15T14:30:00.000Z',
    favorite: true
  },
  {
    id: 'photo_2',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    title: 'Pôr do sol na Praia do Rosa',
    category: 'Viagem',
    tags: ['Viagem', 'Praia', 'Momentos'],
    filterId: 'filter_vintage',
    date: '2026-09-12T18:15:00.000Z',
    favorite: true
  },
  {
    id: 'photo_3',
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    title: 'Jantar no Bistrô Gourmet',
    category: 'Comida',
    tags: ['Restaurante', 'Comida', 'Amigos'],
    filterId: 'filter_clean',
    date: '2026-09-10T20:45:00.000Z',
    favorite: false
  },
  {
    id: 'photo_4',
    url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    title: 'Aniversário surpresa da Ana',
    category: 'Evento',
    tags: ['Ana', 'Aniversário', 'Amigos', 'Evento'],
    filterId: 'filter_warm',
    date: '2026-09-05T21:00:00.000Z',
    favorite: true
  },
  {
    id: 'photo_5',
    url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    title: 'Retrato Ana com sorriso',
    category: 'Pessoa',
    tags: ['Ana', 'Momentos'],
    filterId: 'filter_cyber',
    date: '2026-08-28T16:20:00.000Z',
    favorite: false
  },
  {
    id: 'photo_6',
    url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    title: 'Trilha nas Montanhas',
    category: 'Viagem',
    tags: ['Viagem', 'Momentos'],
    filterId: 'filter_clean',
    date: '2026-08-15T11:00:00.000Z',
    favorite: false
  }
];

const DEMO_FILTERS = [
  {
    id: 'filter_warm',
    name: 'Aura Warm Glow',
    settings: { brightness: 105, contrast: 110, saturation: 125, sepia: 20, hue: 350, blur: 0 },
    cssFilter: 'brightness(1.05) contrast(1.1) saturate(1.25) sepia(0.2) hue-rotate(350deg)'
  },
  {
    id: 'filter_vintage',
    name: 'Retro Film 90s',
    settings: { brightness: 98, contrast: 115, saturation: 90, sepia: 40, hue: 15, blur: 0 },
    cssFilter: 'brightness(0.98) contrast(1.15) saturate(0.9) sepia(0.4) hue-rotate(15deg)'
  },
  {
    id: 'filter_cyber',
    name: 'Cyber Teal',
    settings: { brightness: 102, contrast: 120, saturation: 140, sepia: 0, hue: 180, blur: 0 },
    cssFilter: 'brightness(1.02) contrast(1.2) saturate(1.4) hue-rotate(180deg)'
  },
  {
    id: 'filter_clean',
    name: 'Crisp Natural',
    settings: { brightness: 108, contrast: 105, saturation: 110, sepia: 0, hue: 0, blur: 0 },
    cssFilter: 'brightness(1.08) contrast(1.05) saturate(1.1)'
  }
];

const DEMO_TAGS = [
  { id: 'tag_1', name: 'Ana', color: 'bg-rose-500' },
  { id: 'tag_2', name: 'Viagem', color: 'bg-emerald-500' },
  { id: 'tag_3', name: 'Praia', color: 'bg-amber-500' },
  { id: 'tag_4', name: 'Restaurante', color: 'bg-purple-500' },
  { id: 'tag_5', name: 'Amigos', color: 'bg-blue-500' },
  { id: 'tag_6', name: 'Aniversário', color: 'bg-pink-500' },
  { id: 'tag_7', name: 'Comida', color: 'bg-orange-500' },
  { id: 'tag_8', name: 'Momentos', color: 'bg-indigo-500' }
];

const DEMO_EVENTS = [
  {
    id: 'event_1',
    title: 'Aniversário da Ana',
    date: '2026-09-18',
    person: 'Ana',
    location: 'Bistrô Floral',
    icon: 'cake',
    description: 'Comemoração dos 25 anos da Ana! Não esqueça de criar a montagem de memórias.'
  },
  {
    id: 'event_2',
    title: 'Viagem de Fim de Semana',
    date: '2026-09-25',
    person: 'Amigos',
    location: 'Serra Gaúcha',
    icon: 'compass',
    description: 'Viagem com a galera para tirar fotos com o filtro Retro Film.'
  },
  {
    id: 'event_3',
    title: 'Jantar de Memórias JOVI',
    date: '2026-10-02',
    person: 'Ana',
    location: 'Restaurante Lumière',
    icon: 'utensils',
    description: 'Encontro com amigos para celebrar novos momentos.'
  }
];

class Store {
  constructor() {
    this.init();
  }

  init() {
    if (!localStorage.getItem(STORAGE_KEYS.PHOTOS)) {
      localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(DEMO_PHOTOS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.FILTERS)) {
      localStorage.setItem(STORAGE_KEYS.FILTERS, JSON.stringify(DEMO_FILTERS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.TAGS)) {
      localStorage.setItem(STORAGE_KEYS.TAGS, JSON.stringify(DEMO_TAGS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.EVENTS)) {
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(DEMO_EVENTS));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({ theme: 'dark' }));
    }
  }

  // --- PHOTOS ---
  getPhotos() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PHOTOS) || '[]');
  }

  getPhotoById(id) {
    return this.getPhotos().find(p => p.id === id);
  }

  savePhoto(photo) {
    const photos = this.getPhotos();
    photos.unshift(photo); // Add to top
    localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(photos));
    return photo;
  }

  updatePhoto(id, updates) {
    let photos = this.getPhotos();
    photos = photos.map(p => p.id === id ? { ...p, ...updates } : p);
    localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(photos));
    return photos.find(p => p.id === id);
  }

  deletePhoto(id) {
    let photos = this.getPhotos();
    photos = photos.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PHOTOS, JSON.stringify(photos));
  }

  // --- FILTERS ---
  getFilters() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.FILTERS) || '[]');
  }

  saveFilter(filter) {
    const filters = this.getFilters();
    filters.push(filter);
    localStorage.setItem(STORAGE_KEYS.FILTERS, JSON.stringify(filters));
    return filter;
  }

  // --- TAGS ---
  getTags() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.TAGS) || '[]');
  }

  saveTag(tag) {
    const tags = this.getTags();
    if (!tags.some(t => t.name.toLowerCase() === tag.name.toLowerCase())) {
      tags.push(tag);
      localStorage.setItem(STORAGE_KEYS.TAGS, JSON.stringify(tags));
    }
    return tag;
  }

  // --- EVENTS ---
  getEvents() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.EVENTS) || '[]');
  }

  // --- SETTINGS ---
  getSettings() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || '{"theme":"dark"}');
  }

  updateSettings(updates) {
    const current = this.getSettings();
    const updated = { ...current, ...updates };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    return updated;
  }
}

window.joviStore = new Store();

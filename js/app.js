/**
 * JOVI Aura - Main Application Controller & Rerouting
 */

class AppController {
  constructor() {
    this.currentTab = 'camera';
    this.theme = 'dark';
  }

  init() {
    // 1. Initialize Lucide Icons
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // 2. Load Saved Theme
    const settings = window.joviStore.getSettings();
    this.setTheme(settings.theme || 'dark');

    // 3. Splash Screen Transition
    setTimeout(() => {
      const splash = document.getElementById('splash-screen');
      const appContainer = document.getElementById('app-main-container');
      if (splash && appContainer) {
        splash.classList.add('opacity-0', 'transition-opacity', 'duration-500');
        setTimeout(() => {
          splash.classList.add('hidden');
          appContainer.classList.remove('hidden');
          this.switchTab('camera');
        }, 500);
      }
    }, 1200);

    // 4. Bind Search Input listener
    const searchInput = document.getElementById('gallery-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        if (window.joviGallery) window.joviGallery.setSearchQuery(e.target.value);
      });
    }
  }

  setTheme(themeName) {
    this.theme = themeName;
    const htmlEl = document.documentElement;
    const themeIcon = document.getElementById('theme-toggle-icon');

    if (themeName === 'dark') {
      htmlEl.classList.add('dark');
      if (themeIcon) themeIcon.className = 'lucide-sun w-5 h-5 text-amber-400';
    } else {
      htmlEl.classList.remove('dark');
      if (themeIcon) themeIcon.className = 'lucide-moon w-5 h-5 text-indigo-600';
    }

    window.joviStore.updateSettings({ theme: themeName });
  }

  toggleTheme() {
    const nextTheme = this.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
    this.showToast(`Modo ${nextTheme === 'dark' ? 'Escuro' : 'Claro'} ativado`, 'info');
  }

  switchTab(tabId) {
    this.currentTab = tabId;

    // Hide all view sections
    const views = document.querySelectorAll('.tab-view');
    views.forEach(v => v.classList.add('hidden'));

    // Show target view section
    const targetView = document.getElementById(`view-${tabId}`);
    if (targetView) {
      targetView.classList.remove('hidden');
      targetView.classList.add('animate-fade-in');
    }

    // Update Bottom Navigation Active States
    const navItems = document.querySelectorAll('.nav-tab-item');
    navItems.forEach(item => {
      const itemTab = item.dataset.tab;
      if (itemTab === tabId) {
        item.className = 'nav-tab-item flex flex-col items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold transition transform scale-105';
      } else {
        item.className = 'nav-tab-item flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition font-medium';
      }
    });

    // Handle view-specific initializers
    if (tabId === 'camera') {
      const videoEl = document.getElementById('camera-video');
      if (window.joviCamera && videoEl) {
        window.joviCamera.startCamera(videoEl);
      }
    } else {
      if (window.joviCamera) window.joviCamera.stopCamera();
    }

    if (tabId === 'gallery') {
      if (window.joviGallery) window.joviGallery.render();
    }

    if (tabId === 'memories') {
      if (window.joviMemories) window.joviMemories.renderMemoriesTab();
    }

    if (tabId === 'filters') {
      if (window.joviFilters) window.joviFilters.renderFiltersTab();
    }

    if (tabId === 'profile') {
      this.renderProfileStats();
    }

    // Re-initialize Lucide Icons if dynamic content rendered
    if (window.lucide) {
      setTimeout(() => window.lucide.createIcons(), 50);
    }
  }

  renderProfileStats() {
    const photosCount = window.joviStore.getPhotos().length;
    const filtersCount = window.joviStore.getFilters().length;
    const eventsCount = window.joviStore.getEvents().length;

    const elPhotos = document.getElementById('profile-stat-photos');
    const elFilters = document.getElementById('profile-stat-filters');
    const elEvents = document.getElementById('profile-stat-events');

    if (elPhotos) elPhotos.innerText = photosCount;
    if (elFilters) elFilters.innerText = filtersCount;
    if (elEvents) elEvents.innerText = eventsCount;
  }

  showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    
    let bgColors = 'bg-slate-900 text-white border-slate-700';
    let icon = 'lucide-info text-indigo-400';

    if (type === 'success') {
      bgColors = 'bg-slate-900 text-white border-emerald-500/40';
      icon = 'lucide-check-circle-2 text-emerald-400';
    } else if (type === 'warning') {
      bgColors = 'bg-slate-900 text-white border-amber-500/40';
      icon = 'lucide-alert-triangle text-amber-400';
    } else if (type === 'error') {
      bgColors = 'bg-slate-900 text-white border-rose-500/40';
      icon = 'lucide-x-circle text-rose-400';
    }

    toast.className = `glass-panel px-4 py-3 rounded-2xl shadow-xl border ${bgColors} flex items-center gap-3 animate-slide-up text-xs font-semibold max-w-xs w-full pointer-events-auto`;
    toast.innerHTML = `
      <i class="${icon} w-4 h-4 shrink-0"></i>
      <span class="flex-1">${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('opacity-0', 'transition-opacity', 'duration-300');
      setTimeout(() => toast.remove(), 300);
    }, 2800);

    if (window.lucide) window.lucide.createIcons();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.joviApp = new AppController();
  window.joviApp.init();
});

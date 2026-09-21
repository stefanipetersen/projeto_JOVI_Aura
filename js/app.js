/**
 * JOVI Aura - Main Application Controller & Mobile Navigation Stack
 */

class AppController {
  constructor() {
    this.currentTab = 'camera';
    this.tabHistory = ['camera'];
    this.activeModals = [];
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
          this.switchTab('camera', false);
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

    // 5. Hardware / Browser Back Button Listener (popstate)
    window.addEventListener('popstate', (e) => {
      if (this.activeModals.length > 0) {
        const topModalId = this.activeModals.pop();
        const modal = document.getElementById(topModalId);
        if (modal) modal.classList.add('hidden');
        this.updateHeaderBackButton();
        return;
      }

      if (this.tabHistory.length > 1) {
        this.tabHistory.pop();
        const prevTab = this.tabHistory[this.tabHistory.length - 1];
        this.switchTab(prevTab, false);
      }
    });
  }

  setTheme(themeName) {
    this.theme = themeName;
    const htmlEl = document.documentElement;
    const themeIcon = document.getElementById('theme-toggle-icon');

    if (themeName === 'dark') {
      htmlEl.classList.add('dark');
    } else {
      htmlEl.classList.remove('dark');
    }

    if (themeIcon) {
      const iconName = themeName === 'dark' ? 'sun' : 'moon';
      const colorClass = themeName === 'dark' ? 'text-amber-400' : 'text-indigo-600';
      themeIcon.outerHTML = `<i id="theme-toggle-icon" data-lucide="${iconName}" class="w-5 h-5 ${colorClass}"></i>`;
      if (window.lucide) window.lucide.createIcons();
    }

    window.joviStore.updateSettings({ theme: themeName });
  }

  toggleTheme() {
    const nextTheme = this.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
    this.showToast(`Modo ${nextTheme === 'dark' ? 'Escuro' : 'Claro'} ativado`, 'info');
  }

  switchTab(tabId, pushHistory = true) {
    if (this.currentTab === tabId && !pushHistory) return;

    if (pushHistory && this.currentTab !== tabId) {
      this.tabHistory.push(tabId);
      window.history.pushState({ tabId }, '');
    }

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

    this.updateHeaderBackButton();

    // Re-initialize Lucide Icons if dynamic content rendered
    if (window.lucide) {
      setTimeout(() => window.lucide.createIcons(), 50);
    }
  }

  // --- MODAL & BACK BUTTON MANAGERS ---
  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.remove('hidden');
    if (!this.activeModals.includes(modalId)) {
      this.activeModals.push(modalId);
      window.history.pushState({ modalId }, '');
    }
    this.updateHeaderBackButton();

    if (window.lucide) setTimeout(() => window.lucide.createIcons(), 50);
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('hidden');

    const index = this.activeModals.indexOf(modalId);
    if (index !== -1) {
      this.activeModals.splice(index, 1);
    }
    this.updateHeaderBackButton();
  }

  goBack() {
    if (this.activeModals.length > 0) {
      const topModalId = this.activeModals[this.activeModals.length - 1];
      this.closeModal(topModalId);
    } else if (this.tabHistory.length > 1) {
      this.tabHistory.pop();
      const prevTab = this.tabHistory[this.tabHistory.length - 1];
      this.switchTab(prevTab, false);
    }
  }

  updateHeaderBackButton() {
    const backBtn = document.getElementById('app-header-back-btn');
    if (!backBtn) return;

    if (this.activeModals.length > 0 || this.tabHistory.length > 1) {
      backBtn.classList.remove('hidden');
    } else {
      backBtn.classList.add('hidden');
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
    let icon = 'info';
    let iconClass = 'text-indigo-400';

    if (type === 'success') {
      bgColors = 'bg-slate-900 text-white border-emerald-500/40';
      icon = 'check-circle-2';
      iconClass = 'text-emerald-400';
    } else if (type === 'warning') {
      bgColors = 'bg-slate-900 text-white border-amber-500/40';
      icon = 'alert-triangle';
      iconClass = 'text-amber-400';
    } else if (type === 'error') {
      bgColors = 'bg-slate-900 text-white border-rose-500/40';
      icon = 'x-circle';
      iconClass = 'text-rose-400';
    }

    toast.className = `glass-panel px-4 py-3 rounded-2xl shadow-xl border ${bgColors} flex items-center gap-3 animate-slide-up text-xs font-semibold max-w-xs w-full pointer-events-auto`;
    toast.innerHTML = `
      <i data-lucide="${icon}" class="${iconClass} w-4 h-4 shrink-0"></i>
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

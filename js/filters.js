/**
 * JOVI Aura - Custom Filters Creator & Preset Manager Module
 */

class FilterManager {
  constructor() {
    this.currentCustomSettings = {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      sepia: 0,
      hue: 0,
      warmth: 0,
      blur: 0
    };
  }

  generateCssFilterString(settings) {
    const s = settings || this.currentCustomSettings;
    const parts = [];

    if (s.brightness !== 100) parts.push(`brightness(${s.brightness}%)`);
    if (s.contrast !== 100) parts.push(`contrast(${s.contrast}%)`);
    if (s.saturation !== 100) parts.push(`saturate(${s.saturation}%)`);
    if (s.sepia && s.sepia > 0) parts.push(`sepia(${s.sepia}%)`);
    if (s.hue && s.hue !== 0) parts.push(`hue-rotate(${s.hue}deg)`);
    if (s.warmth && s.warmth !== 0) {
      // Warmth shift simulated with sepia & hue
      parts.push(`sepia(${Math.abs(s.warmth)}%)`);
      parts.push(`hue-rotate(${s.warmth > 0 ? 10 : 200}deg)`);
    }
    if (s.blur && s.blur > 0) parts.push(`blur(${s.blur}px)`);

    return parts.join(' ') || 'none';
  }

  updateLivePreview() {
    const previewImg = document.getElementById('filter-creator-preview-img');
    if (!previewImg) return;

    const cssFilter = this.generateCssFilterString(this.currentCustomSettings);
    previewImg.style.filter = cssFilter;

    // Update CSS string badge
    const codeBadge = document.getElementById('filter-css-code');
    if (codeBadge) {
      codeBadge.innerText = cssFilter === 'none' ? 'Normal (Sem alterações)' : cssFilter;
    }
  }

  setSetting(key, value) {
    this.currentCustomSettings[key] = parseFloat(value);
    this.updateLivePreview();
  }

  resetSliders() {
    this.currentCustomSettings = {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      sepia: 0,
      hue: 0,
      warmth: 0,
      blur: 0
    };
    
    // Reset range input values in DOM
    const sliderIds = ['brightness', 'contrast', 'saturation', 'sepia', 'hue', 'warmth', 'blur'];
    sliderIds.forEach(id => {
      const el = document.getElementById(`slider-${id}`);
      if (el) {
        if (id === 'brightness' || id === 'contrast' || id === 'saturation') el.value = 100;
        else el.value = 0;
      }
    });

    this.updateLivePreview();
  }

  saveCurrentFilter(filterName) {
    if (!filterName || !filterName.trim()) {
      if (window.joviApp) window.joviApp.showToast('Digite um nome para seu filtro!', 'warning');
      return null;
    }

    const cssFilter = this.generateCssFilterString(this.currentCustomSettings);
    const newFilter = {
      id: 'filter_' + Date.now(),
      name: filterName.trim(),
      settings: { ...this.currentCustomSettings },
      cssFilter: cssFilter
    };

    window.joviStore.saveFilter(newFilter);
    if (window.joviApp) window.joviApp.showToast(`Filtro "${newFilter.name}" salvo com sucesso!`, 'success');
    
    this.renderFiltersTab();
    return newFilter;
  }

  renderFiltersTab() {
    const gridEl = document.getElementById('filters-grid');
    if (!gridEl) return;

    const filters = window.joviStore.getFilters();
    const sampleImg = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';

    gridEl.innerHTML = filters.map(filter => `
      <div class="glass-panel rounded-2xl overflow-hidden shadow-lg border border-slate-200/60 dark:border-slate-800/80 transition-all duration-300 hover:scale-[1.02] flex flex-col">
        <div class="relative h-44 overflow-hidden bg-slate-900">
          <img src="${sampleImg}" alt="${filter.name}" class="w-full h-full object-cover transition-all" style="filter: ${filter.cssFilter};" />
          <div class="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs text-white font-medium flex items-center gap-1.5">
            <i data-lucide="sparkles" class="text-amber-400 w-3.5 h-3.5"></i>
            Preset Salvo
          </div>
        </div>
        <div class="p-4 flex-1 flex flex-col justify-between bg-white dark:bg-slate-900">
          <div>
            <h4 class="font-bold text-slate-800 dark:text-white text-base">${filter.name}</h4>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono truncate" title="${filter.cssFilter}">
              ${filter.cssFilter}
            </p>
          </div>
          <div class="mt-4 flex gap-2">
            <button onclick="window.joviFilters.applyFilterToCamera('${filter.id}')" 
              class="flex-1 py-2 px-3 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl text-xs font-semibold shadow-md shadow-indigo-500/20 hover:opacity-95 transition flex items-center justify-center gap-1">
              <i data-lucide="camera" class="w-3.5 h-3.5"></i> Usar na Câmera
            </button>
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  applyFilterToCamera(filterId) {
    window.joviCamera.selectedFilterId = filterId;
    const filterObj = window.joviStore.getFilters().find(f => f.id === filterId);
    if (filterObj) {
      window.joviCamera.applyFilterToPreview(filterObj.cssFilter);
      if (window.joviApp) {
        window.joviApp.showToast(`Filtro "${filterObj.name}" ativado na Câmera!`, 'success');
        window.joviApp.switchTab('camera');
      }
    }
  }
}

window.joviFilters = new FilterManager();

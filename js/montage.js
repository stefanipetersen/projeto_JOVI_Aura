/**
 * JOVI Aura - Simulated AI Post Builder & Layout Generator
 */

class MontageManager {
  constructor() {
    this.selectedPhotoIds = [];
    this.currentLayout = 'grid'; // 'grid', 'story', 'split', 'masonry'
    this.layouts = [
      { id: 'grid', name: 'Grid Duplo 2x2', icon: 'layout-grid' },
      { id: 'story', name: 'Story Vertical', icon: 'smartphone' },
      { id: 'split', name: 'Destaque Split', icon: 'columns-2' },
      { id: 'masonry', name: 'Estilo Mosaico', icon: 'layout-dashboard' }
    ];
  }

  startMontageFlow(photoIds) {
    if (!photoIds || !photoIds.length) {
      // Pick 3 latest photos if none selected
      const photos = window.joviStore.getPhotos();
      this.selectedPhotoIds = photos.slice(0, 3).map(p => p.id);
    } else {
      this.selectedPhotoIds = [...photoIds];
    }

    const modal = document.getElementById('montage-modal');
    if (!modal) return;

    modal.classList.remove('hidden');
    this.showAiSkeletonLoading();
  }

  closeMontageModal() {
    const modal = document.getElementById('montage-modal');
    if (modal) modal.classList.add('hidden');
  }

  showAiSkeletonLoading() {
    const loadingScreen = document.getElementById('montage-ai-loading');
    const editorScreen = document.getElementById('montage-editor');
    const statusText = document.getElementById('montage-ai-status');

    if (loadingScreen && editorScreen) {
      loadingScreen.classList.remove('hidden');
      editorScreen.classList.add('hidden');

      const messages = [
        'Analisando harmonia de cores e iluminação...',
        'Identificando pessoas e expressões principais...',
        'Calculando enquadramentos estéticos perfeitos...',
        'Gerando opções exclusivas de post!'
      ];

      let msgIndex = 0;
      if (statusText) statusText.innerText = messages[0];

      const interval = setInterval(() => {
        msgIndex++;
        if (msgIndex < messages.length) {
          if (statusText) statusText.innerText = messages[msgIndex];
        } else {
          clearInterval(interval);
          loadingScreen.classList.add('hidden');
          editorScreen.classList.remove('hidden');
          this.renderMontagePreview();
        }
      }, 350);
    }
  }

  changeLayout(layoutId) {
    this.currentLayout = layoutId;
    this.renderMontagePreview();
  }

  renderMontagePreview() {
    const previewContainer = document.getElementById('montage-preview-canvas');
    const layoutTabsContainer = document.getElementById('montage-layout-options');
    if (!previewContainer || !layoutTabsContainer) return;

    // Render Layout Selector Buttons
    layoutTabsContainer.innerHTML = this.layouts.map(l => `
      <button onclick="window.joviMontage.changeLayout('${l.id}')" 
        class="flex-1 py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
          this.currentLayout === l.id 
            ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md' 
            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
        }">
        <i class="lucide-${l.icon} w-3.5 h-3.5"></i> ${l.name}
      </button>
    `).join('');

    // Fetch selected photo objects
    const photos = this.selectedPhotoIds
      .map(id => window.joviStore.getPhotoById(id))
      .filter(Boolean);

    if (!photos.length) {
      previewContainer.innerHTML = '<div class="p-8 text-center text-slate-500">Nenhuma foto selecionada.</div>';
      return;
    }

    // Render layout container based on currentLayout
    let layoutHtml = '';

    if (this.currentLayout === 'grid') {
      layoutHtml = `
        <div class="grid grid-cols-2 gap-2 p-3 bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 aspect-square">
          ${photos.slice(0, 4).map((p, idx) => `
            <div class="relative overflow-hidden rounded-xl bg-slate-800 group">
              <img src="${p.url}" alt="${p.title}" class="w-full h-full object-cover" />
              <span class="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/50 text-white backdrop-blur">#${idx + 1}</span>
            </div>
          `).join('')}
        </div>
      `;
    } else if (this.currentLayout === 'story') {
      layoutHtml = `
        <div class="flex flex-col gap-2 p-3 bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 aspect-[9/16] max-h-[420px] mx-auto overflow-hidden">
          <div class="h-2/3 rounded-2xl overflow-hidden relative">
            <img src="${photos[0].url}" class="w-full h-full object-cover" />
            <div class="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs font-bold">
              ${photos[0].title}
            </div>
          </div>
          <div class="h-1/3 grid grid-cols-2 gap-2">
            ${photos.slice(1, 3).map(p => `
              <div class="rounded-xl overflow-hidden bg-slate-800">
                <img src="${p.url}" class="w-full h-full object-cover" />
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else if (this.currentLayout === 'split') {
      layoutHtml = `
        <div class="grid grid-cols-3 gap-2 p-3 bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 aspect-[4/3]">
          <div class="col-span-2 rounded-xl overflow-hidden">
            <img src="${photos[0].url}" class="w-full h-full object-cover" />
          </div>
          <div class="flex flex-col gap-2">
            ${photos.slice(1, 3).map(p => `
              <div class="flex-1 rounded-xl overflow-hidden bg-slate-800">
                <img src="${p.url}" class="w-full h-full object-cover" />
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      // Masonry
      layoutHtml = `
        <div class="grid grid-cols-2 gap-2 p-3 bg-slate-900 rounded-2xl shadow-2xl border border-slate-700">
          ${photos.map((p, idx) => `
            <div class="${idx % 3 === 0 ? 'col-span-2 h-44' : 'h-32'} rounded-xl overflow-hidden">
              <img src="${p.url}" class="w-full h-full object-cover" />
            </div>
          `).join('')}
        </div>
      `;
    }

    previewContainer.innerHTML = layoutHtml;
  }

  shareMontage() {
    if (window.joviSharing) {
      window.joviSharing.triggerShare({
        title: 'Minha Montagem JOVI Aura IA',
        text: 'Confira esta montagem incrível de memórias criada com JOVI Aura!',
        url: window.location.href
      });
    }
  }
}

window.joviMontage = new MontageManager();

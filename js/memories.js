/**
 * JOVI Aura - Calendar Events & Emotional Memories Module
 */

class MemoriesManager {
  constructor() {}

  getEvents() {
    return window.joviStore.getEvents();
  }

  renderMemoriesTab() {
    const eventsContainer = document.getElementById('memories-events-list');
    const widgetsContainer = document.getElementById('memories-widgets-container');
    if (!eventsContainer || !widgetsContainer) return;

    const events = this.getEvents();
    const photos = window.joviStore.getPhotos();

    // Render Emotional Highlight Widget
    const highlightedPerson = 'Ana';
    const anaPhotos = photos.filter(p => p.tags.includes('Ana'));

    widgetsContainer.innerHTML = `
      <div class="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 p-6 text-white border border-purple-500/30 mb-6">
        <div class="absolute -right-10 -bottom-10 w-44 h-44 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div class="flex items-center justify-between mb-4">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
            <i data-lucide="heart" class="text-rose-400 w-3.5 h-3.5 fill-rose-400"></i> Memória Especial Emocional
          </span>
          <span class="text-xs text-slate-300">Hoje</span>
        </div>

        <h3 class="text-xl font-extrabold text-white tracking-tight">Aniversário da Ana está chegando! 🎉</h3>
        <p class="text-sm text-slate-300 mt-1">Você tem ${anaPhotos.length} fotos memoráveis registradas com Ana.</p>

        <div class="mt-4 grid grid-cols-3 gap-2">
          ${anaPhotos.slice(0, 3).map(p => `
            <div class="h-24 rounded-xl overflow-hidden shadow-md border border-white/20">
              <img src="${p.url}" alt="${p.title}" class="w-full h-full object-cover" />
            </div>
          `).join('')}
        </div>

        <button onclick="window.joviMemories.triggerAiCollageForPerson('${highlightedPerson}')" 
          class="mt-5 w-full py-3 px-4 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-bold rounded-2xl shadow-lg shadow-orange-500/20 transition transform active:scale-95 flex items-center justify-center gap-2">
          <i data-lucide="sparkles" class="w-4 h-4"></i> Gerar Montagem de Aniversário com IA
        </button>
      </div>
    `;

    // Render Events List
    eventsContainer.innerHTML = events.map(evt => {
      const matchedPhotos = photos.filter(p => p.tags.includes(evt.person) || p.tags.includes('Evento'));
      return `
        <div class="glass-panel rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-md transition-all hover:border-indigo-500/50 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div class="flex items-start gap-3.5">
            <div class="w-12 h-12 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-lg shrink-0">
              <i data-lucide="calendar-days" class="w-6 h-6"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-slate-800 dark:text-white text-base">${evt.title}</h4>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 dark:bg-indigo-900/60 text-indigo-600 dark:text-indigo-300">
                  ${evt.date}
                </span>
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">${evt.description}</p>
              <div class="mt-2 flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300">
                <span class="flex items-center gap-1"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-rose-500"></i> ${evt.location}</span>
                <span>•</span>
                <span class="flex items-center gap-1"><i data-lucide="user" class="w-3.5 h-3.5 text-indigo-500"></i> ${evt.person}</span>
              </div>
            </div>
          </div>

          <button onclick="window.joviMemories.triggerAiCollageForEvent('${evt.id}')" 
            class="self-end md:self-center py-2 px-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold shadow hover:opacity-90 transition flex items-center gap-1.5 shrink-0">
            <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i> Criar Montagem (${matchedPhotos.length} fotos)
          </button>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  triggerAiCollageForPerson(personName) {
    const photos = window.joviStore.getPhotos().filter(p => p.tags.includes(personName));
    const photoIds = photos.map(p => p.id);
    if (window.joviMontage) {
      window.joviMontage.startMontageFlow(photoIds);
    }
  }

  triggerAiCollageForEvent(eventId) {
    const evt = this.getEvents().find(e => e.id === eventId);
    if (!evt) return;
    const photos = window.joviStore.getPhotos().filter(p => p.tags.includes(evt.person) || p.tags.includes('Evento'));
    const photoIds = photos.map(p => p.id);
    if (window.joviMontage) {
      window.joviMontage.startMontageFlow(photoIds);
    }
  }
}

window.joviMemories = new MemoriesManager();

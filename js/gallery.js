/**
 * JOVI Aura - Smart Gallery & Photo Details Module
 */

class GalleryManager {
  constructor() {
    this.currentCategory = 'Todas';
    this.searchQuery = '';
    this.selectedPhotoIds = new Set();
    this.isMultiSelectActive = false;
  }

  render() {
    const gridEl = document.getElementById('gallery-grid');
    const countEl = document.getElementById('gallery-photo-count');
    if (!gridEl) return;

    let photos = window.joviStore.getPhotos();

    // Filter by Category
    if (this.currentCategory !== 'Todas') {
      photos = photos.filter(p => p.category === this.currentCategory || p.tags.includes(this.currentCategory));
    }

    // Filter by Search Query
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      photos = photos.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (countEl) {
      countEl.innerText = `${photos.length} ${photos.length === 1 ? 'foto' : 'fotos'}`;
    }

    if (!photos.length) {
      gridEl.innerHTML = `
        <div class="col-span-full py-16 text-center text-slate-400 dark:text-slate-500">
          <i data-lucide="image-off" class="w-12 h-12 mx-auto mb-3 opacity-50"></i>
          <p class="font-semibold text-base">Nenhuma foto encontrada</p>
          <p class="text-xs mt-1">Tente mudar o termo da busca ou selecione outra categoria.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    // Fetch filters to map cssFilter
    const filters = window.joviStore.getFilters();

    gridEl.innerHTML = photos.map((photo, index) => {
      const filterObj = filters.find(f => f.id === photo.filterId);
      const cssFilter = filterObj ? filterObj.cssFilter : 'none';
      const isSelected = this.selectedPhotoIds.has(photo.id);

      return `
        <div class="group relative rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-800 aspect-square shadow-md border border-slate-200/50 dark:border-slate-800 transition-all duration-300 hover:scale-[1.03] cursor-pointer"
             onclick="window.joviGallery.handlePhotoClick('${photo.id}')">
          
          <img src="${photo.url}" 
               alt="${photo.title}" 
               loading="lazy"
               class="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
               style="filter: ${cssFilter};" />

          <!-- Gradient Overlay -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-3 flex flex-col justify-between">
            <div class="flex justify-between items-start">
              <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/30 backdrop-blur text-white">
                ${photo.category}
              </span>
              ${photo.favorite ? '<i data-lucide="heart" class="w-4 h-4 text-rose-500 fill-rose-500"></i>' : ''}
            </div>
            <div>
              <p class="text-xs font-bold text-white truncate">${photo.title}</p>
              <div class="mt-1 flex flex-wrap gap-1">
                ${(photo.tags || []).slice(0, 2).map(t => `<span class="text-[9px] text-slate-300">#${t}</span>`).join(' ')}
              </div>
            </div>
          </div>

          <!-- Multi-select Checkbox Badge -->
          ${this.isMultiSelectActive ? `
            <div class="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center border-2 ${
              isSelected ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-black/40 border-white text-transparent'
            }">
              <i data-lucide="check" class="w-3.5 h-3.5"></i>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  setCategory(category) {
    this.currentCategory = category;
    
    // Update category pill active states in DOM
    const pills = document.querySelectorAll('.gallery-category-pill');
    pills.forEach(pill => {
      if (pill.dataset.category === category) {
        pill.className = 'gallery-category-pill px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-indigo-500/20 whitespace-nowrap transition';
      } else {
        pill.className = 'gallery-category-pill px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 whitespace-nowrap transition';
      }
    });

    this.render();
  }

  setSearchQuery(query) {
    this.searchQuery = query;
    this.render();
  }

  toggleMultiSelect() {
    this.isMultiSelectActive = !this.isMultiSelectActive;
    if (!this.isMultiSelectActive) {
      this.selectedPhotoIds.clear();
    }
    
    const btn = document.getElementById('gallery-multi-select-btn');
    const actionToolbar = document.getElementById('gallery-multi-action-toolbar');

    if (btn) {
      btn.innerText = this.isMultiSelectActive ? 'Cancelar Seleção' : 'Selecionar Várias';
      btn.className = this.isMultiSelectActive 
        ? 'py-1.5 px-3 rounded-xl text-xs font-bold bg-rose-500/10 text-rose-500 border border-rose-500/30' 
        : 'py-1.5 px-3 rounded-xl text-xs font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20';
    }

    if (actionToolbar) {
      if (this.isMultiSelectActive) actionToolbar.classList.remove('hidden');
      else actionToolbar.classList.add('hidden');
    }

    this.render();
  }

  handlePhotoClick(photoId) {
    if (this.isMultiSelectActive) {
      if (this.selectedPhotoIds.has(photoId)) {
        this.selectedPhotoIds.delete(photoId);
      } else {
        this.selectedPhotoIds.add(photoId);
      }
      
      const countLabel = document.getElementById('multi-selected-count');
      if (countLabel) countLabel.innerText = `${this.selectedPhotoIds.size} selecionadas`;

      this.render();
    } else {
      this.renderDetailModal(photoId);
    }
  }

  renderDetailModal(photoId) {
    const photo = window.joviStore.getPhotoById(photoId);
    if (!photo) return;

    const filters = window.joviStore.getFilters();
    const currentFilter = filters.find(f => f.id === photo.filterId);
    const cssFilter = currentFilter ? currentFilter.cssFilter : 'none';

    // Populate modal elements
    document.getElementById('detail-photo-img').src = photo.url;
    document.getElementById('detail-photo-img').style.filter = cssFilter;
    document.getElementById('detail-photo-title-input').value = photo.title;
    document.getElementById('detail-photo-category').innerText = photo.category;
    document.getElementById('detail-photo-date').innerText = new Date(photo.date).toLocaleDateString('pt-BR');

    // Tags rendering
    const tagsContainer = document.getElementById('detail-photo-tags-container');
    tagsContainer.innerHTML = window.joviTags.renderTagBadges(photo.tags, {
      editable: true,
      photoId: photo.id
    });

    // Filters Dropdown Options
    const filterSelect = document.getElementById('detail-photo-filter-select');
    if (filterSelect) {
      filterSelect.innerHTML = filters.map(f => `
        <option value="${f.id}" ${f.id === photo.filterId ? 'selected' : ''}>${f.name}</option>
      `).join('');
      filterSelect.onchange = (e) => this.updatePhotoFilter(photo.id, e.target.value);
    }

    // Save Title Button
    const saveTitleBtn = document.getElementById('detail-save-title-btn');
    if (saveTitleBtn) {
      saveTitleBtn.onclick = () => {
        const newTitle = document.getElementById('detail-photo-title-input').value;
        window.joviStore.updatePhoto(photo.id, { title: newTitle });
        if (window.joviApp) window.joviApp.showToast('Título atualizado!', 'success');
        this.render();
      };
    }

    // Delete Button
    const deleteBtn = document.getElementById('detail-delete-btn');
    if (deleteBtn) {
      deleteBtn.onclick = () => {
        window.joviStore.deletePhoto(photo.id);
        this.closeDetailModal();
        if (window.joviApp) window.joviApp.showToast('Foto excluída', 'info');
        this.render();
      };
    }

    // Share Button
    const shareBtn = document.getElementById('detail-share-btn');
    if (shareBtn) {
      shareBtn.onclick = () => {
        window.joviSharing.triggerShare({
          title: photo.title,
          text: `Confira minha foto "${photo.title}" no JOVI Aura!`,
          url: photo.url
        });
      };
    }

    // Add Tag Form Handler
    const addTagBtn = document.getElementById('detail-add-tag-btn');
    const tagInput = document.getElementById('detail-new-tag-input');
    if (addTagBtn && tagInput) {
      addTagBtn.onclick = () => {
        if (tagInput.value.trim()) {
          window.joviTags.addTagToPhoto(photo.id, tagInput.value.trim());
          tagInput.value = '';
        }
      };
    }

    if (window.joviApp) {
      window.joviApp.openModal('photo-detail-modal');
    }
  }

  updatePhotoFilter(photoId, filterId) {
    window.joviStore.updatePhoto(photoId, { filterId });
    const filters = window.joviStore.getFilters();
    const currentFilter = filters.find(f => f.id === filterId);
    if (currentFilter) {
      document.getElementById('detail-photo-img').style.filter = currentFilter.cssFilter;
    }
    if (window.joviApp) window.joviApp.showToast('Filtro aplicado à foto!', 'success');
    this.render();
  }

  closeDetailModal() {
    if (window.joviApp) {
      window.joviApp.closeModal('photo-detail-modal');
    }
  }

  triggerMultiAiMontage() {
    if (!this.selectedPhotoIds.size) {
      if (window.joviApp) window.joviApp.showToast('Selecione ao menos 1 foto!', 'warning');
      return;
    }
    const photoIds = Array.from(this.selectedPhotoIds);
    this.toggleMultiSelect();
    window.joviMontage.startMontageFlow(photoIds);
  }
}

window.joviGallery = new GalleryManager();

/**
 * JOVI Aura - Tags Management Module
 */

class TagsManager {
  constructor() {
    this.badgeColors = [
      'bg-rose-500', 'bg-emerald-500', 'bg-amber-500', 'bg-purple-500', 
      'bg-blue-500', 'bg-pink-500', 'bg-orange-500', 'bg-indigo-500', 'bg-teal-500'
    ];
  }

  getTags() {
    return window.joviStore.getTags();
  }

  createTag(tagName, colorClass) {
    if (!tagName || !tagName.trim()) return null;
    const cleanName = tagName.trim();
    const existing = this.getTags().find(t => t.name.toLowerCase() === cleanName.toLowerCase());
    if (existing) return existing;

    const newTag = {
      id: 'tag_' + Date.now(),
      name: cleanName,
      color: colorClass || this.badgeColors[Math.floor(Math.random() * this.badgeColors.length)]
    };

    window.joviStore.saveTag(newTag);
    return newTag;
  }

  renderTagBadges(tagsArray, options = {}) {
    if (!tagsArray || !tagsArray.length) return '';
    const allTags = this.getTags();

    return tagsArray.map(tagName => {
      const tagObj = allTags.find(t => t.name.toLowerCase() === tagName.toLowerCase());
      const color = tagObj ? tagObj.color : 'bg-slate-500';
      
      const onRemoveClick = options.editable 
        ? `onclick="event.stopPropagation(); window.joviTags.removeTagFromPhoto('${options.photoId}', '${tagName}')"`
        : '';
        
      const removeBtnHtml = options.editable
        ? `<button ${onRemoveClick} class="ml-1 hover:opacity-75 font-bold">&times;</button>`
        : '';

      return `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${color} shadow-sm transition-all duration-150 transform hover:scale-105">
        #${tagName} ${removeBtnHtml}
      </span>`;
    }).join(' ');
  }

  addTagToPhoto(photoId, tagName) {
    const photo = window.joviStore.getPhotoById(photoId);
    if (!photo) return;

    if (!photo.tags.includes(tagName)) {
      photo.tags.push(tagName);
      window.joviStore.updatePhoto(photoId, { tags: photo.tags });
      // Create tag globally if not existing
      this.createTag(tagName);
      if (window.joviApp) window.joviApp.showToast(`Tag #${tagName} adicionada!`, 'info');
      if (window.joviGallery) window.joviGallery.renderDetailModal(photoId);
    }
  }

  removeTagFromPhoto(photoId, tagName) {
    const photo = window.joviStore.getPhotoById(photoId);
    if (!photo) return;

    const updatedTags = photo.tags.filter(t => t !== tagName);
    window.joviStore.updatePhoto(photoId, { tags: updatedTags });
    if (window.joviApp) window.joviApp.showToast(`Tag #${tagName} removida`, 'info');
    if (window.joviGallery) window.joviGallery.renderDetailModal(photoId);
  }
}

window.joviTags = new TagsManager();

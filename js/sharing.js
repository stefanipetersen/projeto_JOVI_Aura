/**
 * JOVI Aura - Web Share API & Fallback Sharing Handler
 */

class SharingManager {
  constructor() {}

  async triggerShare(data = {}) {
    const shareData = {
      title: data.title || 'JOVI Aura — Memórias Digitais',
      text: data.text || 'Confira minha memória registrada com o JOVI Aura!',
      url: data.url || window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        if (window.joviApp) window.joviApp.showToast('Conteúdo compartilhado com sucesso!', 'success');
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.warn('Web Share failed, showing fallback modal:', err);
          this.openShareFallbackModal(shareData);
        }
      }
    } else {
      this.openShareFallbackModal(shareData);
    }
  }

  openShareFallbackModal(shareData) {
    const modal = document.getElementById('share-modal');
    if (!modal) return;

    const titleEl = document.getElementById('share-modal-title');
    const textEl = document.getElementById('share-modal-text');

    if (titleEl) titleEl.innerText = shareData.title;
    if (textEl) textEl.innerText = shareData.text;

    modal.classList.remove('hidden');
  }

  closeShareModal() {
    const modal = document.getElementById('share-modal');
    if (modal) modal.classList.add('hidden');
  }

  copyLinkToClipboard() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      if (window.joviApp) window.joviApp.showToast('Link copiado para a área de transferência!', 'success');
      this.closeShareModal();
    }).catch(() => {
      if (window.joviApp) window.joviApp.showToast('Erro ao copiar link', 'error');
    });
  }

  simulatedSocialShare(platform) {
    if (window.joviApp) {
      window.joviApp.showToast(`Redirecionando para compartilhar no ${platform}...`, 'info');
    }
    this.closeShareModal();
  }
}

window.joviSharing = new SharingManager();

/**
 * JOVI Aura - Web Camera Module with getUserMedia & Simulated Capture Fallback
 */

class CameraManager {
  constructor() {
    this.stream = null;
    this.facingMode = 'environment'; // 'user' or 'environment'
    this.selectedFilterId = null;
    this.isCameraActive = false;
    
    // Fallback sample photos when real camera permission is denied or unavailable
    this.simulatedPhotos = [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'
    ];
    this.simulatedIndex = 0;
  }

  async startCamera(videoElement) {
    if (!videoElement) return;
    this.videoElement = videoElement;

    // Try starting real camera
    try {
      if (this.stream) {
        this.stopCamera();
      }

      const constraints = {
        video: {
          facingMode: this.facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.videoElement.srcObject = this.stream;
      await this.videoElement.play();
      this.isCameraActive = true;
      this.hideCameraFallback();
    } catch (err) {
      console.warn('Real camera not available or permission denied. Using simulated camera mode.', err);
      this.isCameraActive = false;
      this.showCameraFallback();
    }
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.isCameraActive = false;
  }

  toggleCameraFacing(videoElement) {
    this.facingMode = this.facingMode === 'user' ? 'environment' : 'user';
    this.startCamera(videoElement);
  }

  showCameraFallback() {
    const fallbackEl = document.getElementById('camera-simulated-fallback');
    const videoEl = document.getElementById('camera-video');
    if (fallbackEl && videoEl) {
      fallbackEl.classList.remove('hidden');
      videoEl.classList.add('hidden');
    }
  }

  hideCameraFallback() {
    const fallbackEl = document.getElementById('camera-simulated-fallback');
    const videoEl = document.getElementById('camera-video');
    if (fallbackEl && videoEl) {
      fallbackEl.classList.add('hidden');
      videoEl.classList.remove('hidden');
    }
  }

  applyFilterToPreview(filterCss) {
    const videoEl = document.getElementById('camera-video');
    const fallbackImg = document.getElementById('simulated-camera-img');
    
    if (videoEl) videoEl.style.filter = filterCss || 'none';
    if (fallbackImg) fallbackImg.style.filter = filterCss || 'none';
  }

  async capturePhoto() {
    // Flash effect
    const flashEl = document.getElementById('camera-flash-overlay');
    if (flashEl) {
      flashEl.classList.remove('camera-flash-active');
      void flashEl.offsetWidth; // trigger reflow
      flashEl.classList.add('camera-flash-active');
    }

    let photoDataUrl = '';
    const activeFilter = window.joviStore.getFilters().find(f => f.id === this.selectedFilterId);
    const filterCss = activeFilter ? activeFilter.cssFilter : '';

    if (this.isCameraActive && this.videoElement) {
      // Draw canvas from live video
      const canvas = document.createElement('canvas');
      canvas.width = this.videoElement.videoWidth || 640;
      canvas.height = this.videoElement.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (filterCss) {
        ctx.filter = filterCss;
      }
      ctx.drawImage(this.videoElement, 0, 0, canvas.width, canvas.height);
      photoDataUrl = canvas.toDataURL('image/jpeg', 0.85);
    } else {
      // Pick simulated photo
      photoDataUrl = this.simulatedPhotos[this.simulatedIndex];
      this.simulatedIndex = (this.simulatedIndex + 1) % this.simulatedPhotos.length;
    }

    // Save photo to store
    const newPhoto = {
      id: 'photo_' + Date.now(),
      url: photoDataUrl,
      title: 'Nova Captura Aura',
      category: 'Momentos',
      tags: ['Momentos'],
      filterId: this.selectedFilterId || 'filter_clean',
      date: new Date().toISOString(),
      favorite: false
    };

    window.joviStore.savePhoto(newPhoto);

    // Refresh gallery thumbnail shortcut
    const lastThumb = document.getElementById('camera-last-photo-thumb');
    if (lastThumb) {
      lastThumb.src = newPhoto.url;
      lastThumb.classList.remove('hidden');
    }

    if (window.joviApp) {
      window.joviApp.showToast('Foto capturada e salva na Galeria!', 'success');
      // If gallery is visible or initialized, update it
      if (window.joviGallery) window.joviGallery.render();
    }

    return newPhoto;
  }
}

window.joviCamera = new CameraManager();

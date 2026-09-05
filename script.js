document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('hero-video');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (video) {
    // Configuración estricta para iOS WebKit autoplay
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('muted', '');

    const playVideoSafely = () => {
      if (!prefersReducedMotion.matches) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Autoplay silencioso fallback
          });
        }
      }
    };

    // Intentos inmediatos y en eventos de carga de medios
    playVideoSafely();
    video.addEventListener('loadedmetadata', playVideoSafely);
    video.addEventListener('canplay', playVideoSafely);
    video.addEventListener('loadeddata', playVideoSafely);

    // Desbloqueo garantizado en el primer toque o scroll del usuario (políticas estrictas de Safari/Brave)
    const unlockAutoplay = () => {
      playVideoSafely();
      window.removeEventListener('touchstart', unlockAutoplay);
      window.removeEventListener('scroll', unlockAutoplay);
      window.removeEventListener('click', unlockAutoplay);
    };
    window.addEventListener('touchstart', unlockAutoplay, { passive: true });
    window.addEventListener('scroll', unlockAutoplay, { passive: true });
    window.addEventListener('click', unlockAutoplay, { passive: true });

    // Loop sin fisuras
    video.addEventListener('ended', () => {
      video.currentTime = 0;
      playVideoSafely();
    });

    // Pausar solo cuando se sale completamente de la pantalla para ahorrar batería
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !prefersReducedMotion.matches) {
              playVideoSafely();
            } else if (!entry.isIntersecting) {
              video.pause();
            }
          });
        },
        { threshold: 0.05 }
      );
      const heroScreen = document.querySelector('.hero-screen');
      if (heroScreen) observer.observe(heroScreen);
    }

    prefersReducedMotion.addEventListener('change', () => {
      if (prefersReducedMotion.matches) {
        video.pause();
      } else {
        playVideoSafely();
      }
    });
  }
});

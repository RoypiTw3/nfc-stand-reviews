/**
 * STAND·REVIEW - Main Controller
 * Reproducción continua nativa 100% silenciosa y sin cambios de opacidad
 */

document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('hero-video');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (video) {
    // Asegurar silencio total para permitir autoplay instantáneo continuo
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;

    const handlePlay = () => {
      if (!prefersReducedMotion.matches) {
        video.play().catch(() => {});
      }
    };

    handlePlay();

    // Pausar solo cuando se sale del viewport para optimizar rendimiento de GPU/CPU
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !prefersReducedMotion.matches) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(document.querySelector('.hero-screen'));
    }

    prefersReducedMotion.addEventListener('change', () => {
      if (prefersReducedMotion.matches) {
        video.pause();
      } else {
        video.play().catch(() => {});
      }
    });
  }
});

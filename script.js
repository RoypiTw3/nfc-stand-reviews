document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. GESTOR DE VIDEO HERO (Rendimiento & Autoplay)
  // =========================================================================
  const video = document.getElementById('hero-video');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (video) {
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('muted', '');

    const tryPlay = () => {
      if (!prefersReducedMotion.matches) {
        const p = video.play();
        if (p !== undefined) {
          p.catch(() => {});
        }
      }
    };

    // Intentos de reproducción inmediata
    tryPlay();
    video.addEventListener('loadedmetadata', tryPlay, { once: true });
    video.addEventListener('canplay', tryPlay, { once: true });

    // Desbloqueo ante cualquier toque inicial en iOS / Android
    const unlockOnTouch = () => {
      tryPlay();
      ['touchstart', 'touchend', 'scroll', 'click'].forEach(evt => {
        window.removeEventListener(evt, unlockOnTouch);
      });
    };
    ['touchstart', 'touchend', 'scroll', 'click'].forEach(evt => {
      window.addEventListener(evt, unlockOnTouch, { passive: true });
    });

    // Bucle continuo
    video.addEventListener('ended', () => {
      video.currentTime = 0;
      tryPlay();
    });

    // Pausar video cuando el usuario baja profundamente (Ahorro de batería y CPU)
    let isDeepScrolled = false;
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY || window.pageYOffset;
      const shouldPause = scrollPos > (window.innerHeight * 1.3);
      
      if (shouldPause && !isDeepScrolled) {
        isDeepScrolled = true;
        video.pause();
      } else if (!shouldPause && isDeepScrolled) {
        isDeepScrolled = false;
        tryPlay();
      }
    }, { passive: true });

    prefersReducedMotion.addEventListener('change', () => {
      if (prefersReducedMotion.matches) {
        video.pause();
      } else {
        tryPlay();
      }
    });
  }

  // =========================================================================
  // 2. FORMULARIO & ENLACE DE WHATSAPP (+57 315 185 6554)
  // =========================================================================
  const orderForm = document.getElementById('order-form');
  const googleSelect = document.getElementById('google-status');
  const googleNotice = document.getElementById('google-notice');

  // Mostrar / Ocultar aviso de alta en Google Maps
  if (googleSelect && googleNotice) {
    googleSelect.addEventListener('change', () => {
      if (googleSelect.value === 'no') {
        googleNotice.style.display = 'flex';
      } else {
        googleNotice.style.display = 'none';
      }
    });
  }

  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const localName = document.getElementById('local-name')?.value.trim() || '';
      const googleStatus = document.getElementById('google-status')?.value || 'si';
      const isNewGoogle = (googleStatus === 'no');
      const productType = document.getElementById('product-type')?.value || '';
      const quantity = document.getElementById('quantity')?.value.trim() || '1';
      const clientName = document.getElementById('client-name')?.value.trim() || '';

      const phone = '573151856554';
      const text = `Hola TapNFC, quiero solicitar una propuesta para mi negocio:\n\n` +
                   `• Local / Negocio: ${localName}\n` +
                   `• Ficha en Google Maps: ${isNewGoogle ? 'No (Deseo el servicio de creación de ficha)' : 'Sí, ya registrada'}\n` +
                   `• Modelo: ${productType}\n` +
                   `• Cantidad de soportes: ${quantity}\n` +
                   `• Nombre: ${clientName}\n\n` +
                   (isNewGoogle 
                     ? '¿Podrían incluir la cotización para crearnos la ficha en Google Maps y los soportes?' 
                     : '¿Podrían indicarme precios y tiempos de entrega?');

      const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
      window.open(whatsappURL, '_blank');
    });
  }

  // =========================================================================
  // 3. TARJETAS DE PRODUCTO -> AUTO SELECCIÓN EN FORMULARIO
  // =========================================================================
  const productCards = document.querySelectorAll('.editorial-card');
  const productSelect = document.getElementById('product-type');

  if (productCards.length && productSelect) {
    productCards.forEach((card) => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        const prod = card.getAttribute('data-product');
        if (prod) {
          productSelect.value = prod;
        }

        const checkout = document.getElementById('contacto');
        if (checkout) {
          checkout.scrollIntoView({ behavior: 'smooth' });
          const localInput = document.getElementById('local-name');
          if (localInput) {
            setTimeout(() => localInput.focus(), 500);
          }
        }
      });
    });
  }

  // =========================================================================
  // 4. BOTÓN FLOTANTE DE WHATSAPP (Aparece al hacer scroll)
  // =========================================================================
  const floatingWa = document.getElementById('floating-wa');
  if (floatingWa) {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY || window.pageYOffset;
      if (scrollPos > 300) {
        floatingWa.classList.add('visible');
      } else {
        floatingWa.classList.remove('visible');
      }
    }, { passive: true });
  }
});

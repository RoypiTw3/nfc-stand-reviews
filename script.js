document.addEventListener('DOMContentLoaded', () => {
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

    // Intentos inmediatos en carga
    tryPlay();
    video.addEventListener('loadedmetadata', tryPlay);
    video.addEventListener('loadeddata', tryPlay);
    video.addEventListener('canplay', tryPlay);

    // Desbloqueo universal con cualquier interacción de pantalla en iOS/Android
    const unlockOnTouch = () => {
      tryPlay();
      ['touchstart', 'touchend', 'scroll', 'click'].forEach(evt => {
        window.removeEventListener(evt, unlockOnTouch);
      });
    };
    ['touchstart', 'touchend', 'scroll', 'click'].forEach(evt => {
      window.addEventListener(evt, unlockOnTouch, { passive: true });
    });

    // Bucle continuo sin pausas
    video.addEventListener('ended', () => {
      video.currentTime = 0;
      tryPlay();
    });

    // Pausar solo si el usuario ha hecho scroll profundo fuera del hero
    let isDeepScrolled = false;
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY || window.pageYOffset;
      const shouldPause = scrollPos > (window.innerHeight * 1.5);
      
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
  // GESTOR DE PEDIDOS VÍA WHATSAPP (+57 300 185 6554)
  // =========================================================================
  const orderForm = document.getElementById('order-form');
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const localName = document.getElementById('local-name')?.value.trim() || '';
      const productType = document.getElementById('product-type')?.value || '';
      const quantity = document.getElementById('quantity')?.value.trim() || '1';
      const clientName = document.getElementById('client-name')?.value.trim() || '';

      const phone = '573001856554';
      const text = `¡Hola STAND·REVIEW! 👋 Quiero pedir una propuesta para mi negocio:\n\n` +
                   `📍 *Local / Negocio:* ${localName}\n` +
                   `📦 *Modelo:* ${productType}\n` +
                   `🔢 *Cantidad de mesas/soportes:* ${quantity}\n` +
                   `👤 *Mi Nombre:* ${clientName}\n\n` +
                   `¿Podrían indicarme precios y tiempos de entrega?`;

      const whatsappURL = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
      window.open(whatsappURL, '_blank');
    });
  }

  // =========================================================================
  // INTERACCIÓN DE TARJETAS DE PRODUCTO -> AUTO SELECCIÓN EN FORMULARIO
  // =========================================================================
  const productCards = document.querySelectorAll('.editorial-card');
  const productSelect = document.getElementById('product-type');

  if (productCards.length && productSelect) {
    productCards.forEach((card, index) => {
      card.style.cursor = 'pointer';
      card.addEventListener('click', () => {
        if (index === 0) productSelect.value = 'Stand de Mesa Acrílico';
        else if (index === 1) productSelect.value = 'Tótem Vanguard Roble & Metal';
        else if (index === 2) productSelect.value = 'Tarjeta Staff Contactless';

        const checkout = document.getElementById('contacto');
        if (checkout) {
          checkout.scrollIntoView({ behavior: 'smooth' });
          const localInput = document.getElementById('local-name');
          if (localInput) setTimeout(() => localInput.focus(), 600);
        }
      });
    });
  }
});

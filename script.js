document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. GESTOR DE VIDEO HERO (Autoplay & Optimización)
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
    video.addEventListener('loadedmetadata', tryPlay);
    video.addEventListener('loadeddata', tryPlay);
    video.addEventListener('canplay', tryPlay);

    // Desbloqueo universal ante cualquier interacción táctil
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

    // Pausar video cuando se hace scroll profundo para ahorrar recursos
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
  // 4. ACORDEÓN EXCLUSIVO (Cierra automáticamente las demás preguntas)
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length) {
    faqItems.forEach((item) => {
      item.addEventListener('toggle', () => {
        if (item.open) {
          faqItems.forEach((otherItem) => {
            if (otherItem !== item && otherItem.open) {
              otherItem.open = false;
            }
          });
        }
      });
    });
  }

  // =========================================================================
  // 5. DOCK FLOTANTE: VOLVER ARRIBA BLANCO + WHATSAPP ELEVADO
  // =========================================================================
  const floatingDock = document.getElementById('floating-dock');
  const floatingWa = document.getElementById('floating-wa');
  const floatingBackToTop = document.getElementById('floating-back-to-top');

  if (floatingDock || floatingWa || floatingBackToTop) {
    const handleFloatingVisibility = () => {
      const scrollPos = window.scrollY || window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      if (scrollPos > 280) {
        if (floatingWa) floatingWa.classList.add('visible');
        if (floatingBackToTop) floatingBackToTop.classList.add('visible');
      } else {
        if (floatingWa) floatingWa.classList.remove('visible');
        if (floatingBackToTop) floatingBackToTop.classList.remove('visible');
      }

      // Si está llegando al final de la página, elevar aún más el dock para despejar el footer
      if (floatingDock) {
        if (scrollPos + windowHeight >= docHeight - 250) {
          floatingDock.classList.add('footer-elevated');
        } else {
          floatingDock.classList.remove('footer-elevated');
        }
      }
    };

    window.addEventListener('scroll', handleFloatingVisibility, { passive: true });
    window.addEventListener('resize', handleFloatingVisibility, { passive: true });
    handleFloatingVisibility();

    if (floatingBackToTop) {
      floatingBackToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  }

  // =========================================================================
  // 6. ANIMACIÓN DE ENTRADA AL HACER SCROLL (INTERSECTION OBSERVER)
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealElements.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // =========================================================================
  // 7. SPOTLIGHT CARD GLOW (Seguimiento Dinámico de Puntero)
  // =========================================================================
  const glowElements = document.querySelectorAll('.editorial-card, .step-card, .form-box');
  glowElements.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }, { passive: true });
  });
});

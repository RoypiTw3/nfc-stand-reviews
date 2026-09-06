document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. RENDIMIENTO: DETECCIÓN DE REDUCED MOTION
  // =========================================================================
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // =========================================================================
  // 1.1 MENÚ DESPLEGABLE MÓVIL (CÓMO FUNCIONA / SECCIONES)
  // =========================================================================
  const mobileNavDropdown = document.getElementById('mobile-nav-dropdown');
  const mobileNavTrigger = document.getElementById('mobile-nav-trigger');
  const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');

  if (mobileNavDropdown && mobileNavTrigger) {
    mobileNavTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = mobileNavDropdown.classList.toggle('is-open');
      mobileNavTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    mobileMenuItems.forEach(item => {
      item.addEventListener('click', () => {
        mobileNavDropdown.classList.remove('is-open');
        mobileNavTrigger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', (e) => {
      if (!mobileNavDropdown.contains(e.target)) {
        mobileNavDropdown.classList.remove('is-open');
        mobileNavTrigger.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNavDropdown.classList.contains('is-open')) {
        mobileNavDropdown.classList.remove('is-open');
        mobileNavTrigger.setAttribute('aria-expanded', 'false');
        mobileNavTrigger.focus();
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
    let scrollTicking = false;
    const updateFloatingVisibility = () => {
      const scrollPos = window.scrollY || window.pageYOffset;
      if (scrollPos > 280) {
        if (floatingWa) floatingWa.classList.add('visible');
        if (floatingBackToTop) floatingBackToTop.classList.add('visible');
      } else {
        if (floatingWa) floatingWa.classList.remove('visible');
        if (floatingBackToTop) floatingBackToTop.classList.remove('visible');
      }
      scrollTicking = false;
    };

    const onScrollOrResize = () => {
      if (!scrollTicking) {
        window.requestAnimationFrame(updateFloatingVisibility);
        scrollTicking = true;
      }
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });
    updateFloatingVisibility();

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
      rootMargin: '120px 0px 80px 0px',
      threshold: 0.01
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-visible'));
  }

  // =========================================================================
  // 7. SPOTLIGHT CARD GLOW (Seguimiento Optimizado sin Layout Thrashing)
  // =========================================================================
  const glowElements = document.querySelectorAll('.editorial-card, .step-card, .form-box');
  glowElements.forEach(card => {
    let cardRect = null;
    let glowRAF = null;

    card.addEventListener('mouseenter', () => {
      cardRect = card.getBoundingClientRect();
    }, { passive: true });

    card.addEventListener('mousemove', (e) => {
      if (!cardRect) {
        cardRect = card.getBoundingClientRect();
      }
      const x = e.clientX - cardRect.left;
      const y = e.clientY - cardRect.top;

      if (!glowRAF) {
        glowRAF = window.requestAnimationFrame(() => {
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
          glowRAF = null;
        });
      }
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      cardRect = null;
      if (glowRAF) {
        window.cancelAnimationFrame(glowRAF);
        glowRAF = null;
      }
    }, { passive: true });
  });

  // =========================================================================
  // 8. CARRUSEL & SHOWCASE 3D INTERACTIVO DE PRODUCTOS (HERO)
  // =========================================================================
  const carouselStage = document.getElementById('carousel-stage');
  const carouselWrapper = document.getElementById('carousel-3d');
  if (carouselStage && carouselWrapper) {
    const items = Array.from(carouselStage.querySelectorAll('.product-3d-item'));
    const dots = Array.from(document.querySelectorAll('#carousel-dots .dot-btn'));
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const tiltToggleBtn = document.getElementById('btn-toggle-tilt');
    const total = items.length;
    let currentIndex = 0;
    let isTiltEnabled = true;

    // Actualizar estados espaciales 3D del carrusel
    const updateCarousel = (newIndex) => {
      currentIndex = ((newIndex % total) + total) % total;

      items.forEach((item, idx) => {
        item.classList.remove('is-active', 'is-next', 'is-prev', 'is-hidden', 'is-flipped');
        item.style.removeProperty('--card-rx');
        item.style.removeProperty('--card-ry');
        item.style.removeProperty('--shine-x');
        item.style.removeProperty('--shine-y');

        if (idx === currentIndex) {
          item.classList.add('is-active');
        } else if (idx === (currentIndex + 1) % total) {
          item.classList.add('is-next');
        } else if (idx === (currentIndex - 1 + total) % total) {
          item.classList.add('is-prev');
        } else {
          item.classList.add('is-hidden');
        }
      });

      // Actualizar puntos de paginación
      dots.forEach((dot, idx) => {
        const isActive = idx === currentIndex;
        dot.classList.toggle('is-active', isActive);
        dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
    };

    // Botones flechas
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateCarousel(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        updateCarousel(currentIndex + 1);
      });
    }

    // Puntos indicadores
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const targetIdx = parseInt(dot.getAttribute('data-index'), 10);
        if (!isNaN(targetIdx) && targetIdx !== currentIndex) {
          updateCarousel(targetIdx);
        }
      });
    });

    // Clic en tarjetas laterales para traerlas al frente, o en tarjeta activa para voltear (flip 3D)
    items.forEach((item, idx) => {
      item.addEventListener('click', (e) => {
        if (idx !== currentIndex) {
          e.preventDefault();
          updateCarousel(idx);
          return;
        }

        // Si se hizo clic en el enlace de pedido de la ficha trasera
        if (e.target.closest('.btn-card-order')) {
          return;
        }

        // Si se pulsa el botón para volver al frente
        if (e.target.closest('.btn-flip-back')) {
          e.preventDefault();
          item.classList.remove('is-flipped');
          return;
        }

        // Alternar volteo 3D de 180°
        e.preventDefault();
        item.classList.toggle('is-flipped');
      });
    });

    // Alternar modo 3D / Recto
    if (tiltToggleBtn) {
      const modeText = tiltToggleBtn.querySelector('.mode-text');
      tiltToggleBtn.addEventListener('click', () => {
        isTiltEnabled = !isTiltEnabled;
        tiltToggleBtn.classList.toggle('is-tilt-disabled', !isTiltEnabled);

        const activeItem = items[currentIndex];
        if (activeItem) {
          if (!isTiltEnabled) {
            targetRx = 0;
            targetRy = 0;
            currentRx = 0;
            currentRy = 0;
            activeItem.style.setProperty('--card-rx', '0deg');
            activeItem.style.setProperty('--card-ry', '0deg');
            if (modeText) modeText.textContent = 'Modo Recto';
          } else {
            if (modeText) modeText.textContent = '3D Activo';
          }
        }
      });
    }

    // FÍSICAS DE SEGUIMIENTO DE CURSOR (LERP DAMPING)
    let currentRx = 0;
    let currentRy = 0;
    let currentShineX = 50;
    let currentShineY = 50;
    let targetRx = 0;
    let targetRy = 0;
    let targetShineX = 50;
    let targetShineY = 50;
    let isTracking = false;
    let tiltRAF = null;
    let wrapperRect = null;

    const animateTilt = () => {
      const activeItem = items[currentIndex];
      if (!activeItem || !isTiltEnabled) {
        tiltRAF = null;
        return;
      }

      const ease = 0.12;
      currentRx += (targetRx - currentRx) * ease;
      currentRy += (targetRy - currentRy) * ease;
      currentShineX += (targetShineX - currentShineX) * ease;
      currentShineY += (targetShineY - currentShineY) * ease;

      activeItem.style.setProperty('--card-rx', `${currentRx.toFixed(2)}deg`);
      activeItem.style.setProperty('--card-ry', `${currentRy.toFixed(2)}deg`);
      activeItem.style.setProperty('--shine-x', `${currentShineX.toFixed(1)}%`);
      activeItem.style.setProperty('--shine-y', `${currentShineY.toFixed(1)}%`);

      const diff = Math.abs(targetRx - currentRx) + Math.abs(targetRy - currentRy);
      if (isTracking || diff > 0.05) {
        tiltRAF = window.requestAnimationFrame(animateTilt);
      } else {
        tiltRAF = null;
      }
    };

    const startTiltLoop = () => {
      if (!tiltRAF && isTiltEnabled) {
        tiltRAF = window.requestAnimationFrame(animateTilt);
      }
    };

    carouselWrapper.addEventListener('mouseenter', () => {
      wrapperRect = carouselWrapper.getBoundingClientRect();
      isTracking = true;
      startTiltLoop();
    }, { passive: true });

    carouselWrapper.addEventListener('mousemove', (e) => {
      if (!isTiltEnabled) return;
      if (!wrapperRect) wrapperRect = carouselWrapper.getBoundingClientRect();

      const x = (e.clientX - wrapperRect.left) / wrapperRect.width - 0.5;
      const y = (e.clientY - wrapperRect.top) / wrapperRect.height - 0.5;

      targetRx = -y * 18;
      targetRy = x * 22;
      targetShineX = (x + 0.5) * 100;
      targetShineY = (y + 0.5) * 100;

      startTiltLoop();
    }, { passive: true });

    carouselWrapper.addEventListener('mouseleave', () => {
      wrapperRect = null;
      isTracking = false;
      targetRx = 0;
      targetRy = 0;
      targetShineX = 50;
      targetShineY = 50;
      startTiltLoop();
    }, { passive: true });

    // GESTOS TÁCTILES EN MÓVIL (SWIPE)
    let touchStartX = 0;
    let touchStartY = 0;

    carouselWrapper.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches[0]) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    carouselWrapper.addEventListener('touchend', (e) => {
      if (!touchStartX) return;
      const touchEndX = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientX : touchStartX;
      const touchEndY = e.changedTouches && e.changedTouches[0] ? e.changedTouches[0].clientY : touchStartY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX < 0) {
          updateCarousel(currentIndex + 1);
        } else {
          updateCarousel(currentIndex - 1);
        }
      }
      touchStartX = 0;
      touchStartY = 0;
    }, { passive: true });

    // Navegación por teclado
    window.addEventListener('keydown', (e) => {
      const rect = carouselWrapper.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === 'ArrowLeft') {
        updateCarousel(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        updateCarousel(currentIndex + 1);
      }
    });

    // Iniciar con la primera tarjeta activa
    updateCarousel(0);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. MOTOR DE SCROLLYTELLING CANVAS (Frame-by-Frame Scrubbing)
  // =========================================================================
  const canvas = document.getElementById('hero-canvas');
  const heroTrack = document.getElementById('hero-track');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (canvas && heroTrack) {
    const ctx = canvas.getContext('2d', { alpha: false });
    const TOTAL_FRAMES = 120;
    const frames = new Array(TOTAL_FRAMES);
    let framesLoaded = 0;
    let targetFrame = 0;
    let currentRenderedFrame = 0;
    let isLoopRunning = false;

    // Formateador de ruta: media/frames/frame_0000.webp a frame_0119.webp
    const getFramePath = (index) => {
      const padded = String(index).padStart(4, '0');
      return `media/frames/frame_${padded}.webp`;
    };

    // Dibujar frame en el canvas preservando el ajuste óptimo
    const renderFrame = (img) => {
      if (!img || !img.complete || !img.naturalWidth) return;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    // 1. Cargar Frame 0 de inmediato para render inicial instantáneo
    const firstImg = new Image();
    firstImg.src = getFramePath(0);
    firstImg.onload = () => {
      frames[0] = firstImg;
      renderFrame(firstImg);
      // Comenzar precarga del resto en segundo plano sin bloquear
      preloadRemainingFrames();
    };

    // 2. Precarga asíncrona de todos los demás frames
    const preloadRemainingFrames = () => {
      for (let i = 1; i < TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = getFramePath(i);
        img.onload = () => {
          frames[i] = img;
          framesLoaded++;
        };
      }
    };

    // 3. Cálculo de progreso basado en el Scroll
    const updateProgress = () => {
      const rect = heroTrack.getBoundingClientRect();
      const maxScroll = heroTrack.offsetHeight - window.innerHeight;
      
      if (maxScroll <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / maxScroll));
      targetFrame = progress * (TOTAL_FRAMES - 1);

      if (!isLoopRunning) {
        isLoopRunning = true;
        requestAnimationFrame(tick);
      }
    };

    // 4. Bucle con interpolación suave (Lerp) para efecto sedoso de hardware
    const tick = () => {
      const diff = targetFrame - currentRenderedFrame;

      if (Math.abs(diff) > 0.01) {
        currentRenderedFrame += diff * 0.14; // Suavizado de inercia
        const frameIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(currentRenderedFrame)));
        
        const imgToDraw = frames[frameIndex] || frames[0];
        if (imgToDraw) {
          renderFrame(imgToDraw);
        }
        requestAnimationFrame(tick);
      } else {
        currentRenderedFrame = targetFrame;
        const frameIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(currentRenderedFrame)));
        const imgToDraw = frames[frameIndex] || frames[0];
        if (imgToDraw) {
          renderFrame(imgToDraw);
        }
        isLoopRunning = false;
      }
    };

    // Listeners de scroll optimizados
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
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

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // =========================================================================
  // 1. TIPOGRAFÍA DEL HERO: mostrar la palabra cuando Nunito esté lista
  // =========================================================================
  const markFontsReady = () => document.documentElement.classList.add('fonts-ready');
  if (document.fonts && document.fonts.load) {
    Promise.race([
      document.fonts.load('800 1em Nunito'),
      new Promise((resolve) => setTimeout(resolve, 3000))
    ]).then(markFontsReady, markFontsReady);
  } else {
    markFontsReady();
  }

  // =========================================================================
  // 2. NAVEGACIÓN MÓVIL
  // =========================================================================
  const navToggle = document.getElementById('nav-toggle');
  const navSheet = document.getElementById('nav-sheet');

  if (navToggle && navSheet) {
    const setNavOpen = (open) => {
      navSheet.hidden = !open;
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? 'Cerrar navegación' : 'Abrir navegación');
    };

    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      setNavOpen(navSheet.hidden);
    });

    navSheet.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setNavOpen(false));
    });

    document.addEventListener('click', (e) => {
      if (!navSheet.hidden && !navSheet.contains(e.target)) setNavOpen(false);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !navSheet.hidden) {
        setNavOpen(false);
        navToggle.focus();
      }
    });
  }

  // =========================================================================
  // 3. PLACAS 3D: inclinación suave siguiendo el mouse
  // =========================================================================
  const hero = document.getElementById('hero');
  const stage = document.getElementById('hero-stage');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  if (hero && stage && finePointer.matches && !reduceMotion.matches) {
    let targetY = 0;
    let targetX = 0;
    let currentY = 0;
    let currentX = 0;
    let tiltRAF = null;
    // El giro se escribe en cada placa (no en el escenario) para que el
    // navegador no tenga que recalcular todo lo que hay dentro.
    const heroBodies = Array.from(stage.querySelectorAll('.obj-body'));

    const tick = () => {
      currentY += (targetY - currentY) * 0.08;
      currentX += (targetX - currentX) * 0.08;
      heroBodies.forEach((body) => {
        body.style.setProperty('--ry', `${currentY.toFixed(2)}deg`);
        body.style.setProperty('--rx', `${currentX.toFixed(2)}deg`);
      });

      if (Math.abs(targetY - currentY) + Math.abs(targetX - currentX) > 0.02) {
        tiltRAF = window.requestAnimationFrame(tick);
      } else {
        tiltRAF = null;
      }
    };

    const startTick = () => {
      if (!tiltRAF) tiltRAF = window.requestAnimationFrame(tick);
    };

    hero.addEventListener('pointermove', (e) => {
      const rect = hero.getBoundingClientRect();
      targetY = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
      targetX = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
      startTick();
    }, { passive: true });

    hero.addEventListener('pointerleave', () => {
      targetY = 0;
      targetX = 0;
      startTick();
    }, { passive: true });
  }

  // =========================================================================
  // 3.1 VIDEO DEL FONDO DE LA PORTADA (restaurante en bucle)
  // - Mientras carga se ve la imagen fija (el <picture> de atrás).
  // - Se pide cuando la página ya cargó, para no frenar lo importante.
  // - Versión vertical en pantallas de pie; 720p o 1080p según la pantalla.
  // - No se carga con "reducir movimiento", ahorro de datos o red 2G,
  //   y se pausa cuando la portada no está en pantalla.
  // =========================================================================
  const heroVideo = document.querySelector('.hero-video');
  const connection = navigator.connection || {};
  const skipVideo = reduceMotion.matches || connection.saveData || /2g/.test(connection.effectiveType || '');

  if (heroVideo && !skipVideo) {
    let started = false;
    let heroVisible = true;

    const pickSource = () => {
      if (window.matchMedia('(max-aspect-ratio: 1/1)').matches) return 'media/video/restaurante-vertical-v1.mp4';
      // 1080p solo en pantallas anchas (computadores, iPad acostado); celulares acostados usan 720p
      return window.innerWidth >= 1000 && window.innerWidth * (window.devicePixelRatio || 1) > 1600
        ? 'media/video/restaurante-1080-v1.mp4'
        : 'media/video/restaurante-720-v1.mp4';
    };

    const playIfVisible = () => {
      if (heroVisible) heroVideo.play().catch(() => { /* sin autoplay: queda la imagen */ });
    };

    const startVideo = () => {
      if (started) return;
      started = true;
      heroVideo.muted = true;
      heroVideo.addEventListener('playing', () => heroVideo.classList.add('is-playing'), { once: true });
      heroVideo.src = pickSource();
      playIfVisible();
    };

    const startLater = () => {
      if ('requestIdleCallback' in window) window.requestIdleCallback(startVideo, { timeout: 2000 });
      else setTimeout(startVideo, 600);
    };

    if (document.readyState === 'complete') startLater();
    else window.addEventListener('load', startLater, { once: true });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        heroVisible = entries[0].isIntersecting;
        if (!started) return;
        if (heroVisible) playIfVisible();
        else heroVideo.pause();
      }).observe(heroVideo);
    }
  }

  // =========================================================================
  // 4. FORMULARIO CORTO → WHATSAPP (+57 315 185 6554)
  // =========================================================================
  const orderForm = document.getElementById('order-form');
  const solutionGroup = document.getElementById('solution-group');
  const solutionInputs = Array.from(document.querySelectorAll('input[name="solution"]'));
  const formPick = document.getElementById('form-pick');
  const formPickName = document.getElementById('form-pick-name');
  const formPickClear = document.getElementById('form-pick-clear');
  let pickedProduct = null; // { name, need }

  const getSolution = () => solutionInputs.find((input) => input.checked) || solutionInputs[0];

  const pulse = (el) => {
    if (!el) return;
    el.classList.remove('select-pulse');
    void el.offsetWidth;
    el.classList.add('select-pulse');
    setTimeout(() => el.classList.remove('select-pulse'), 1600);
  };

  const setPickedProduct = (product) => {
    pickedProduct = product;
    if (!formPick || !formPickName) return;
    formPick.hidden = !product;
    formPickName.textContent = product ? product.name : '';
  };

  // Un modelo de reseñas no aplica si se pide solo el menú
  const dropPickIfMismatch = () => {
    const solution = getSolution()?.value;
    if (pickedProduct && pickedProduct.need === 'resenas' && solution === 'menu') {
      setPickedProduct(null);
    }
  };

  const applyNeed = (need) => {
    const input = solutionInputs.find((item) => item.value === need);
    if (!input) return;
    input.checked = true;
    dropPickIfMismatch();
    pulse(solutionGroup && solutionGroup.querySelector('.choices'));
  };

  solutionInputs.forEach((input) => input.addEventListener('change', dropPickIfMismatch));
  if (formPickClear) formPickClear.addEventListener('click', () => setPickedProduct(null));

  // Enlaces con data-need preseleccionan la opción
  document.querySelectorAll('a[data-need]').forEach((link) => {
    link.addEventListener('click', () => applyNeed(link.getAttribute('data-need')));
  });

  // Nombre y precio de la colección → recordar el modelo y bajar al formulario
  // (el enlace va a #contacto; data-need ya preselecciona la opción)
  document.querySelectorAll('.lineup-caption').forEach((caption) => {
    caption.addEventListener('click', () => {
      const name = caption.getAttribute('data-name') || '';
      const need = caption.getAttribute('data-need') || '';
      setPickedProduct(name ? { name, need } : null);
      const firstInput = document.getElementById('local-name');
      if (firstInput) setTimeout(() => firstInput.focus({ preventScroll: true }), 700);
    });
  });

  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const localName = document.getElementById('local-name')?.value.trim() || '';
      const solutionLabel = getSolution()?.nextElementSibling?.textContent.trim() || '';
      const quantity = document.getElementById('quantity')?.value.trim() || '1';
      const clientName = document.getElementById('client-name')?.value.trim() || '';

      const text = `Hola TapNFC, quiero cotizar para mi negocio:\n\n` +
                   `• Negocio: ${localName}\n` +
                   `• Quiero: ${solutionLabel}\n` +
                   (pickedProduct ? `• Modelo: ${pickedProduct.name}\n` : '') +
                   `• Cantidad: ${quantity}\n` +
                   `• Nombre: ${clientName}\n\n` +
                   '¿Me pueden dar precios y tiempos de entrega?';

      window.open(`https://wa.me/573151856554?text=${encodeURIComponent(text)}`, '_blank');
    });
  }

  // =========================================================================
  // 5. PESTAÑAS "ASÍ FUNCIONA"
  // =========================================================================
  const tabs = Array.from(document.querySelectorAll('.tab'));
  if (tabs.length) {
    const selectTab = (tab) => {
      tabs.forEach((t) => {
        const isActive = t === tab;
        t.classList.toggle('is-active', isActive);
        t.setAttribute('aria-selected', isActive ? 'true' : 'false');
        t.tabIndex = isActive ? 0 : -1;
        const panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !isActive;
      });
      // La pantalla de ejemplo (reseña o menú) cambia con la pestaña
      document.querySelectorAll('[data-for]').forEach((visual) => {
        visual.hidden = visual.getAttribute('data-for') !== tab.id;
      });
    };

    tabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => selectTab(tab));
      tab.addEventListener('keydown', (e) => {
        if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
        e.preventDefault();
        const step = e.key === 'ArrowRight' ? 1 : -1;
        const next = tabs[(idx + step + tabs.length) % tabs.length];
        selectTab(next);
        next.focus();
      });
    });
  }

  // =========================================================================
  // 6. PREGUNTAS: solo una abierta a la vez
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      faqItems.forEach((other) => {
        if (other !== item && other.open) other.open = false;
      });
    });
  });

  // =========================================================================
  // 7. WHATSAPP FLOTANTE
  // Aparece apenas se empieza a bajar y se oculta en el formulario de
  // contacto, que ya tiene su propio botón de WhatsApp.
  // Sin escuchar el scroll: un marcador invisible a 24px del inicio avisa
  // cuándo se empezó a bajar (así el scroll no hace trabajo extra).
  // =========================================================================
  const floatingWa = document.getElementById('floating-wa');
  if (floatingWa && 'IntersectionObserver' in window) {
    let scrolled = false;
    let contactInView = false;

    const updateFloating = () => {
      floatingWa.classList.toggle('visible', scrolled && !contactInView);
    };

    const topMarker = document.createElement('div');
    topMarker.setAttribute('aria-hidden', 'true');
    topMarker.style.cssText = 'position:absolute;top:24px;left:0;width:1px;height:1px;pointer-events:none;';
    document.body.appendChild(topMarker);
    new IntersectionObserver((entries) => {
      const entry = entries[0];
      scrolled = !entry.isIntersecting && entry.boundingClientRect.top < 0;
      updateFloating();
    }).observe(topMarker);

    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      new IntersectionObserver((entries) => {
        contactInView = entries[0].isIntersecting;
        updateFloating();
      }, { rootMargin: '0px 0px -35% 0px' }).observe(contactSection);
    }
  } else if (floatingWa) {
    floatingWa.classList.add('visible');
  }

  // =========================================================================
  // 7.1 DEMO DE RESEÑA INTERACTIVA (no envía nada; solo para jugar)
  // =========================================================================
  const reviewDemo = document.getElementById('review-demo');

  const makeStarGroup = (group, onChange) => {
    const buttons = Array.from(group.querySelectorAll('button'));
    let value = 0;

    const paint = (count, className) => {
      buttons.forEach((btn, idx) => btn.classList.toggle(className, idx < count));
    };

    const set = (count, { pop = false } = {}) => {
      value = count;
      paint(count, 'is-on');
      buttons.forEach((btn, idx) => {
        btn.setAttribute('aria-checked', idx === count - 1 ? 'true' : 'false');
        btn.tabIndex = idx === Math.max(count, 1) - 1 ? 0 : -1;
      });
      if (pop && count > 0) {
        const btn = buttons[count - 1];
        btn.classList.remove('is-pop');
        void btn.offsetWidth;
        btn.classList.add('is-pop');
      }
      if (onChange) onChange(count);
    };

    buttons.forEach((btn, idx) => {
      btn.addEventListener('click', () => set(idx + 1, { pop: true }));
      btn.addEventListener('pointerenter', (e) => {
        if (e.pointerType !== 'mouse') return;
        group.classList.add('is-hovering');
        paint(idx + 1, 'is-hover');
      });
      btn.addEventListener('keydown', (e) => {
        if (!['ArrowRight', 'ArrowUp', 'ArrowLeft', 'ArrowDown'].includes(e.key)) return;
        e.preventDefault();
        const step = (e.key === 'ArrowRight' || e.key === 'ArrowUp') ? 1 : -1;
        const next = Math.min(buttons.length, Math.max(1, (value || idx + 1) + step));
        set(next, { pop: true });
        buttons[next - 1].focus();
      });
    });

    group.addEventListener('pointerleave', () => {
      group.classList.remove('is-hovering');
      paint(0, 'is-hover');
    });

    set(0);
    return { set, get: () => value };
  };

  if (reviewDemo) {
    const form = reviewDemo.querySelector('.ui-form');
    const done = reviewDemo.querySelector('.ui-done');
    const textarea = reviewDemo.querySelector('.ui-textarea');
    const publishBtn = reviewDemo.querySelector('[data-review-publish]');
    const cancelBtn = reviewDemo.querySelector('[data-review-cancel]');
    const resetBtn = reviewDemo.querySelector('[data-review-reset]');
    const mainGroupEl = reviewDemo.querySelector('.ui-stars--main');
    let touched = false;
    let mainGroup = null;

    const updatePublish = () => {
      if (publishBtn) publishBtn.disabled = !mainGroup || mainGroup.get() === 0;
    };

    const groups = Array.from(reviewDemo.querySelectorAll('[data-stars]')).map((el) => {
      const group = makeStarGroup(el, () => updatePublish());
      el.addEventListener('click', () => { touched = true; });
      return group;
    });
    mainGroup = groups[Array.from(reviewDemo.querySelectorAll('[data-stars]')).indexOf(mainGroupEl)];
    updatePublish();

    const clearAll = () => {
      groups.forEach((g) => g.set(0));
      if (textarea) textarea.value = '';
      updatePublish();
    };

    // Las 5 estrellas grandes se llenan solas al aparecer (como la placa real)
    if (mainGroupEl && 'IntersectionObserver' in window) {
      const introObserver = new IntersectionObserver((entries, observer) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        if (touched || mainGroup.get() > 0) return;
        mainGroupEl.classList.add('is-intro');
        mainGroup.set(5);
        setTimeout(() => mainGroupEl.classList.remove('is-intro'), 1200);
      }, { threshold: 0.6 });
      introObserver.observe(mainGroupEl);
    }

    if (cancelBtn) cancelBtn.addEventListener('click', () => { touched = true; clearAll(); });

    if (publishBtn) {
      publishBtn.addEventListener('click', () => {
        if (publishBtn.disabled) return;
        reviewDemo.classList.add('is-done');
        if (done) done.hidden = false;
        if (form) form.setAttribute('aria-hidden', 'true');
        if (resetBtn) resetBtn.focus({ preventScroll: true });
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        clearAll();
        reviewDemo.classList.remove('is-done');
        if (done) done.hidden = true;
        if (form) form.removeAttribute('aria-hidden');
        const firstStar = mainGroupEl && mainGroupEl.querySelector('button');
        if (firstStar) firstStar.focus({ preventScroll: true });
      });
    }
  }

  // =========================================================================
  // 7.2 COLECCIÓN · FILA SOBRE BLANCO
  // Los 5 productos en fila; cada uno se gira con física de resorte, como en iOS:
  // - arrastrando, el producto sigue al dedo o al mouse 1:1;
  // - al soltar conserva el impulso y se detiene de frente o de espaldas
  //   (se calcula a dónde llegaría con ese impulso y se elige la cara más cercana);
  // - se puede agarrar en cualquier momento, incluso mientras gira;
  // - tocarlo lo voltea; con mouse se inclina un poco siguiendo el cursor.
  // =========================================================================

  // Resorte con los dos parámetros de Apple: amortiguación (1 = sin rebote)
  // y respuesta en segundos (menos = más rápido)
  const springStep = (s, target, dt, damping, response) => {
    const k = (2 * Math.PI / response) ** 2;
    const c = (4 * Math.PI * damping) / response;
    s.v += (-k * (s.x - target) - c * s.v) * dt;
    s.x += s.v * dt;
  };

  // A dónde llegaría un giro lanzado (proyección de Apple, deceleración 0.998)
  const projectMomentum = (velocity) => ((velocity / 1000) * 0.998) / (1 - 0.998);

  const lineupStages = Array.from(document.querySelectorAll('.lineup-stage'));

  const lineupControls = lineupStages.map((stage) => {
    const body = stage.querySelector('.obj-body') || stage;
    const yaw = { x: 0, v: 0 };
    const pitch = { x: 0, v: 0 };
    let faceYaw = 0;      // 0, 180, 360… (de frente o de espaldas)
    let tiltYaw = 0;      // inclinación por el cursor
    let tiltPitch = 0;
    let spring = { damping: 1, response: 0.4 };
    let rafId = null;
    let lastTime = 0;
    let drag = null;
    let spinAnim = null;

    const render = () => {
      body.style.setProperty('--ry', `${yaw.x.toFixed(2)}deg`);
      body.style.setProperty('--rx', `${pitch.x.toFixed(2)}deg`);
    };

    const frame = (now) => {
      const dt = Math.min(0.032, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;
      if (!drag) {
        const ty = faceYaw + tiltYaw;
        springStep(yaw, ty, dt, spring.damping, spring.response);
        springStep(pitch, tiltPitch, dt, 1, 0.4);
        const resting = Math.abs(yaw.x - ty) < 0.05 && Math.abs(yaw.v) < 0.5
          && Math.abs(pitch.x - tiltPitch) < 0.05 && Math.abs(pitch.v) < 0.5;
        if (resting) {
          yaw.x = ty; yaw.v = 0;
          pitch.x = tiltPitch; pitch.v = 0;
          render();
          rafId = null;
          return;
        }
      }
      render();
      rafId = window.requestAnimationFrame(frame);
    };

    const run = (params) => {
      if (params) spring = params;
      if (reduceMotion.matches && !drag) {
        yaw.x = faceYaw + tiltYaw; yaw.v = 0;
        pitch.x = tiltPitch; pitch.v = 0;
        render();
        return;
      }
      if (!rafId) {
        lastTime = performance.now();
        rafId = window.requestAnimationFrame(frame);
      }
    };

    const flip = () => {
      faceYaw = Math.round((yaw.x - tiltYaw) / 180) * 180 + 180;
      run({ damping: 0.85, response: 0.45 });
    };

    // Presentación: la mueve el navegador (Web Animations), así no le quita
    // fluidez al scroll
    const spin = () => {
      if (reduceMotion.matches || drag || spinAnim || !body.animate) return;
      const css = getComputedStyle(body);
      const x = (parseFloat(css.getPropertyValue('--pitch')) || 0) + pitch.x;
      const y = (parseFloat(css.getPropertyValue('--yaw')) || 0) + yaw.x;
      // Un vistazo: gira un poco hacia un lado y vuelve de frente. Una vuelta
      // entera mostraba la parte de atrás justo mientras se baja por la página.
      spinAnim = body.animate([
        { transform: `rotateX(${x}deg) rotateY(${y}deg)`, easing: 'cubic-bezier(0.33, 0, 0.2, 1)' },
        { transform: `rotateX(${x}deg) rotateY(${y + 26}deg)`, offset: 0.4, easing: 'cubic-bezier(0.32, 0.72, 0, 1)' },
        { transform: `rotateX(${x}deg) rotateY(${y}deg)` }
      ], { duration: 1300 });
      spinAnim.onfinish = () => { spinAnim = null; };
    };

    // Si lo tocan mientras da la vuelta, sigue desde donde va (sin saltos)
    const stopSpin = () => {
      if (!spinAnim) return;
      // Seguir desde el ángulo exacto en que va el vistazo (sin saltos)
      const css = getComputedStyle(body).transform;
      spinAnim.cancel();
      spinAnim = null;
      const m = css && css !== 'none' ? new DOMMatrixReadOnly(css) : null;
      const baseYaw = parseFloat(getComputedStyle(body).getPropertyValue('--yaw')) || 0;
      if (m) yaw.x = (Math.atan2(-m.m13, m.m33) * 180) / Math.PI - baseYaw;
      yaw.v = 0;
      faceYaw = Math.round((yaw.x - tiltYaw) / 180) * 180;
      render();
    };

    // Evitar que el navegador "agarre" las imágenes del diseño como foto
    stage.addEventListener('dragstart', (e) => e.preventDefault());

    stage.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      if (e.pointerType === 'mouse') e.preventDefault();
      stopSpin();
      stage.classList.add('is-pressed');
      yaw.v = 0;
      drag = {
        x: e.clientX, y: e.clientY, yaw: yaw.x, pitch: pitch.x, moved: false,
        mouse: e.pointerType === 'mouse', history: [{ t: e.timeStamp, a: yaw.x }]
      };
      try { stage.setPointerCapture(e.pointerId); } catch (err) { /* sin captura */ }
      run();
    });

    stage.addEventListener('pointermove', (e) => {
      if (!drag) {
        // Inclinación suave siguiendo el mouse (no en táctil)
        if (e.pointerType !== 'mouse' || spinAnim) return;
        const rect = stage.getBoundingClientRect();
        tiltYaw = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
        tiltPitch = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
        run({ damping: 1, response: 0.4 });
        return;
      }
      const dx = e.clientX - drag.x;
      const dy = e.clientY - drag.y;
      if (!drag.moved && Math.abs(dx) + Math.abs(dy) > 8) {
        drag.moved = true;
        stage.classList.add('is-dragging');
      }
      if (!drag.moved) return;
      // Sigue al dedo 1:1 desde donde se agarró
      yaw.x = drag.yaw + dx * 0.6;
      // Con mouse también se inclina arriba/abajo; en táctil solo de lado
      // para no estorbar el scroll de la página.
      if (drag.mouse) pitch.x = Math.max(-40, Math.min(28, drag.pitch - dy * 0.4));
      drag.history.push({ t: e.timeStamp, a: yaw.x });
      while (drag.history.length > 2 && e.timeStamp - drag.history[0].t > 100) drag.history.shift();
    });

    const endDrag = (e) => {
      if (!drag) return;
      const { moved, history } = drag;
      drag = null;
      stage.classList.remove('is-dragging', 'is-pressed');
      try { stage.releasePointerCapture(e.pointerId); } catch (err) { /* ya liberado */ }
      if (moved) {
        // Velocidad de los últimos ~100 ms → impulso al soltar
        const first = history[0];
        const lastPoint = history[history.length - 1];
        const span = (lastPoint.t - first.t) / 1000;
        const velocity = span > 0.008 ? (lastPoint.a - first.a) / span : 0;
        const projected = yaw.x + projectMomentum(velocity);
        faceYaw = Math.round((projected - tiltYaw) / 180) * 180;
        yaw.v = velocity;
        run({ damping: 0.8, response: 0.4 });
      } else if (e.type === 'pointerup') {
        flip();
      } else {
        run();
      }
    };

    stage.addEventListener('pointerup', endDrag);
    stage.addEventListener('pointercancel', endDrag);

    stage.addEventListener('pointerleave', (e) => {
      if (drag || spinAnim || e.pointerType !== 'mouse') return;
      tiltYaw = 0;
      tiltPitch = 0;
      run({ damping: 1, response: 0.4 });
    });

    stage.addEventListener('keydown', (e) => {
      if (['Enter', ' ', 'ArrowLeft', 'ArrowRight'].includes(e.key)) stopSpin();
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        flip();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        faceYaw += e.key === 'ArrowRight' ? 45 : -45;
        run({ damping: 0.9, response: 0.4 });
      }
    });

    return { spin };
  });

  // Un vistazo de presentación, escalonado, la primera vez que aparece la fila
  const lineup = document.querySelector('.lineup');
  if (lineup && lineupControls.length && 'IntersectionObserver' in window && !reduceMotion.matches) {
    const introObserver = new IntersectionObserver((entries, observer) => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      lineupControls.forEach((control, i) => setTimeout(control.spin, 250 + i * 140));
    }, { threshold: 0.35 });
    introObserver.observe(lineup);
  }

  // =========================================================================
  // 7.3 PAUSAR LAS PLACAS QUE NO SE VEN
  // Las placas flotan y se mecen sin parar; fuera de pantalla se pausan
  // para que el celular no siga dibujándolas mientras se baja por la página.
  // =========================================================================
  const animatedStages = document.querySelectorAll('#hero-stage, .lineup, .contact-stage');
  if (animatedStages.length && 'IntersectionObserver' in window) {
    const pauseObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('is-paused', !entry.isIntersecting));
    }, { rootMargin: '120px 0px' });
    animatedStages.forEach((el) => pauseObserver.observe(el));
  }

  // =========================================================================
  // 8. APARICIÓN AL HACER SCROLL
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.01 });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }
});

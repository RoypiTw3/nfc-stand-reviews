---
name: tapnfc-design-system
description: Sistema de diseño vigente de TapNFC (landing de placas NFC para Google Reviews y menús digitales; estilo clásico, limpio y claro, con placas en 3D en el hero). Úsala antes de cambiar estilos, colores, tipografía, textos, imágenes o secciones de index.html, style.css o script.js en este proyecto. Tiene prioridad sobre las reglas genéricas de otras skills de diseño.
---

# TapNFC — Sistema de diseño (v115, clásico, limpio, cercano y con carácter)

Esta skill describe el diseño aprobado por el dueño. Si otra skill (impeccable, cro-landing-page, responsive-patterns, etc.) sugiere algo que la contradice, gana esta.

## Producto
- Placas NFC que abren la ficha de Google Reviews con 5 estrellas listas, o el menú digital del local.
- Precios (por producto de la colección): **Stand NFC Google Reviews $50.000** · **Sticker NFC $50.000** · **Tarjeta NFC con stand $40.000** · **Tarjeta NFC (menú, sin stand) $40.000** · **Tarjeta personalizada $40.000** (COP). Coincide con la regla anterior: con QR $50.000, solo NFC $40.000.
- Ventas por WhatsApp: +57 315 185 6554 → `https://wa.me/573151856554`. Mensajes en español natural, sin emojis.
- Instagram: `@tapnfcs`.

## Dirección visual
- Referencia del dueño: landing "MEASURED" — una palabra enorme detrás de un objeto protagonista, menú en cápsula centrado y casi nada de texto. Desde v106 la palabra va en **Nunito** (redondeada y amigable), no en serif: el dueño sintió que Gloock "no era tan amigable".
- Tono **claro** (papel crema). El tema oscuro se descartó en v67.
- **Sin marco ni rebordes**: la página va de borde a borde y el hero ocupa la primera pantalla completa (`100svh`). No volver a poner márgenes ni esquinas redondeadas al lienzo.
- Debe sentirse **clásico y hecho a mano, no "de IA"**. Por eso están prohibidos:
  - etiquetas pequeñas en mayúsculas monoespaciadas sobre los títulos ("DOS SOLUCIONES, UN MISMO TAP");
  - insignias y píldoras ("NUEVO", "RECOMENDADO", "★ MÁS VENDIDO", "5X MÁS EFICAZ");
  - filas de métricas ("+420%", "< 3 seg"), brillos que siguen al mouse, marquesinas, iconos decorativos;
  - títulos en MAYÚSCULAS con segunda línea en cursiva;
  - tarjetas con borde + sombra + degradado para todo. Preferir líneas finas (`--line`) y espacio.
- Pero **tampoco plano "tipo Zara"** (el dueño lo dijo en v73). El carácter viene de:
  - textura de papel sutil (`--grain`, SVG de ruido) en el lienzo, el hero y las secciones tintadas;
  - una **franja oscura** (`.section--dark`, `--night`) en "Así funciona", con números en dorado suave;
  - tarjetas de "Dos productos" **blancas e iguales**, elevadas con sombra sobre el crema, y una **pantalla limpia en modo oscuro** (`.ui-panel`) que **se asoma por encima del borde** (`clip-path` en `.use-visual` + `margin-top` negativo). Ninguna tarjeta en oscuro: el dueño no quiere que una le robe protagonismo a la otra;
    - Reseñas (`#review-demo.review-ui`): recreación **interactiva** de la ventana "escribir reseña" de Google, con **"Tu negocio"** como título y **"Tu cliente"** como autor (nunca nombres de personas reales). El visitante puede marcar las estrellas generales y las de Comida / Servicio / Ambiente (radiogroups con botones de ≥40px, vista previa al pasar el mouse, flechas del teclado), escribir en el cuadro y pulsar **Publicar**: **no se envía nada**, solo aparece "¡Gracias por tu reseña!" con "Calificar otra vez". Las 5 estrellas grandes se llenan solas al aparecer (como la placa real, "5 estrellas listas"); "Cancelar" limpia todo y "Publicar" se desactiva sin calificación general. La pantalla se ve completa dentro de la tarjeta (sin recorte abajo) para que se pueda usar.
    - Menú (`.menu-ui`): carta limpia con "Tu negocio", "Menú", "Actualizado hace 2 min" (muestra que el equipo la edita), pestañas y 4 platos con precio. Sin fotos ni celulares (el dueño pidió quitarlos en v78);
  - dorado de marca en interacciones: botones se llenan de `--gold` al pasar el mouse y los enlaces se subrayan en dorado.

## Tokens (`:root` en style.css — usar siempre las variables)
| Token | Valor | Uso |
|---|---|---|
| `--paper` | `#F5F1EA` | lienzo principal |
| `--tint` | `#EEE8DD` | secciones alternas y paneles |
| `--card` | `#FFFFFF` | formulario, cuerpo de paneles |
| `--ink` | `#16150F` | texto, botones, pestaña activa |
| `--muted` | `rgba(22, 21, 15, 0.64)` | texto secundario |
| `--subtle` | `rgba(22, 21, 15, 0.46)` | placeholders, notas |
| `--line` | `rgba(22, 21, 15, 0.14)` | divisores finos |
| `--gold` | `#F59E0B` | solo rellenos y foco |
| `--gold-text` | `#B45309` | acento de texto (contraste AA) |
| `--night` | `#17150F` | franja oscura y tarjeta del menú |
| `--night-text` / `--night-muted` / `--night-line` | `#F3EEE4` / 62% / 16% | texto y líneas sobre oscuro |
| `--gold-soft` | `#D9A54A` | números y acentos sobre oscuro |
| `--grain` | SVG de ruido | textura de papel |

- Nunca usar `#F59E0B` como color de texto sobre crema o blanco.
- Sombras cálidas y suaves: `rgba(41, 31, 13, 0.07–0.22)`.

## Tipografía (no cambiar sin pedido explícito)
- **Nunito 800** (`--font-display`, elegida por el dueño en v106 entre Fraunces suave, Bricolage Grotesque, Poppins y Nunito): la palabra "TAPNFCS" del hero (`letter-spacing: -0.025em`), los títulos de sección (`.title`, una línea, `-0.02em`) y los números de pasos. Archivo estático de 16 KB (`media/fonts/nunito-800-latin.woff2`, instancia wght=800 hecha con fontTools desde la variable de Google Fonts).
- **Instrument Sans** 400/500/600: todo lo demás (los precios también, nunca en la display).
- **Gloock** queda solo para el encabezado "Menú" de la carta de ejemplo (`--font-menu`, `.menu-ui-h`): representa la carta de un restaurante. No se precarga.
- No usar monoespaciadas ni Cormorant (se quitaron en v70).
- Las tipografías están en `media/fonts/` y se precargan (ver Rendimiento). La palabra del hero aparece cuando Nunito está lista (`.fonts-ready`, con 3 s de tope).

## Textos
- Muy poco texto. Títulos cortos: "Dos productos", "La colección", "Así funciona", "Preguntas", "Pide tus placas o tu menú".
- Sin párrafos de introducción. Tarjetas y pasos: una frase corta.
- No agregar secciones nuevas sin pedido, aunque un framework de CRO las sugiera.
- No inventar cifras, testimonios ni promesas de servicio; preguntar antes.

## Estructura de index.html
1. **Hero** `#hero`: logo (34px móvil / 42px escritorio, para que pese igual que la cápsula) · menú en cápsula (Productos, Cómo funciona, Preguntas) · botón "Pedir". Palabra "TAPNFCS" en Nunito 800 detrás de **dos placas 3D hechas en CSS** (reseñas: acrílico blanco sobre roble; menú: negro mate sobre nogal). Abajo **solo** el botón "Ver productos", centrado: el dueño pidió quitar la frase y el precio. El H1 existe pero oculto visualmente (`.sr-only`) para SEO y lectores de pantalla. En móvil la palabra va en dos líneas (TAP / NFCS).
2. **Productos** `#productos`: "Dos productos" — son **dos productos distintos** (reseñas en Google y menú digital); lo único que comparten es la tecnología NFC. No usar frases como "una placa, dos usos". Pantallas `.review-ui` / `.menu-ui` + "La colección".
   - **La colección es un visor "Míralo de cerca"** (v115, elegido por el dueño entre 3 propuestas siguiendo los principios de diseño de Apple; la cuadrícula de 5 estudios grafito "se veía genérica"). Un producto grande a la vez, de pie sobre el **mismo mesón de mármol del video de la portada** (`.viewer-bg` usa las imágenes de `media/video/`, ya en caché; vertical u horizontal según la forma del estudio con `@container viewer`). Debajo, dentro del estudio, un **selector en cápsula** (`role="tablist"`): Stand · Sticker · Tarjeta | Menú | Tu diseño (agrupado por uso). Abajo del estudio: nombre en Nunito 800, precio + uso ("Para reseñas en Google"), una frase y **un solo botón "Pedir este"** (`.viewer-cta`, va a `#contacto` y deja elegido el modelo).
     - Geometría: el estudio es contenedor (`container: viewer / size`); `--vs` = píxel de la foto en pantalla (cover); `--px = 100cqh / 420`; el producto se apoya a `max(205 × vs, --picker-top + 14px + 23 × px)` del pie (sobre el mesón y nunca encima del selector). Alto del estudio: `clamp(400px, 118vw, 500px)` → 520px (≥768) → 580px (≥1100).
     - Cambio de producto: los demás quedan a la izquierda (`.is-before`) o derecha (`.is-after`), con `inert`; el nuevo entra desde el lado de su botón (`translate` ±34% + opacidad, curva `--ease-spring`) y llega girado ±32° hacia ese lado, enderezándose con un resorte (amortiguación 0.8).
     - **Giro con física de resorte (Apple):** arrastrando sigue al dedo 1:1; al soltar conserva el impulso y se proyecta a dónde llegaría (`projectMomentum`, deceleración 0.998) para detenerse en la cara más cercana (0/180°) con un resorte (0.8, 0.4 s); se puede agarrar en cualquier momento; tocar voltea (0.85, 0.45 s); con mouse se inclina siguiendo el cursor. Al presionar, el producto se encoge un poco al instante (`.is-pressed`). La vuelta de presentación (Web Animation) ocurre una vez, cuando el visor aparece.
     - Medidas reales: el dueño aún no ha dado el alto × ancho de cada producto; cuando las dé, ajustar `--W/--H` para que se vean a escala real entre sí.
   - Los 5 productos, en este orden:
     1. **Stand NFC Google Reviews** — $50.000 (`.obj--acrylic`; nombre elegido por el dueño en v97; rechazó "Placa de acrílico", "Display de mesa" y "Soporte de reseñas Google"): una sola pieza en L, placa inclinada hacia atrás (`rotateX(11deg)` desde abajo) y base plana del mismo acrílico que va hacia atrás; **sin madera**. Diseño `tarjeta-resenas.webp`.
     2. **Sticker NFC** — $50.000 (`.obj--sticker`; "Adhesivo cuadrado para pegar en vitrinas, mesas, paredes o la caja"): cuadrado, delgado, **sin base**, adhesivo; atrás muestra el papel del adhesivo ("Adhesivo"). Diseño `sticker-cuadrado.webp` (azul "review us on Google", Tap your phone / Scan QR code; QR verificado).
     3. **Tarjeta NFC con stand** — $40.000 (`.obj--card`; "se usa sola o sobre su base de madera"): tamaño tarjeta de crédito, **de frente** (`--yaw: 0`) sobre roble. Diseño `tarjeta-review-us.webp`.
     4. **Tarjeta NFC** — $40.000 (`.obj--menucard`, `data-need="menu"`): la tarjeta negra del menú (`tarjeta-menu.webp`) **sin stand**, "Para tu menú digital. Sin stand, va directo en la mesa."
     5. **Tarjeta personalizada** — $40.000 (`.obj--blank`): blanca, con NFC, con una marca suave "Tu diseño aquí".
   - **Todos miran de frente** (`--yaw: 0deg; --pitch: -10deg`) cuando están en reposo.
   - Partes de atrás: acrílico muestra el diseño al revés y tenue (`.face-art--mirror`), sticker el papel del adhesivo, tarjeta de madera "TAP NFCS" pequeño, tarjeta blanca lisa.
   - **Sin pista de "Arrastra para girar"**: el dueño la quitó en v90 (la gente lo descubre al pasar el dedo).
   - El producto activo **flota** suave (`obj-levitate`, 5 s; se anima la propiedad `translate` de `.obj-body` para no pisar el `transform` del giro). Los inactivos tienen la animación pausada.
   - Cada producto tiene **su propia sombra sobre el mármol** (`.viewer-item .obj::after`) justo debajo de su base, que se achica cuando el producto sube. Nunca una sombra fija del estudio.
   - Se descartaron para el fondo de los productos: estudio grafito (v102), café oscuro, arena dorada, gris claro, blanco, azul Google, terracota, pastel y negro con dorado. Antes de cambiar colores, mostrar opciones al dueño en el chat.
   - Las imágenes de los diseños llevan `draggable="false"` y `.face-art { pointer-events: none; -webkit-user-drag: none }`; sin eso el navegador "agarra" la imagen y no deja girar el producto.
   - Todos tienen NFC; el acrílico y el sticker llevan además QR.
   - Fuentes editables de los diseños en `assets/` de esta skill (`tarjeta-resenas.html`, `sticker-cuadrado.html`, `tarjeta-review-us.html`); todos los QR apuntan al enlace de reseñas del dueño.
   - Menú digital: el menú es virtual y **el equipo del restaurante puede cambiar cualquier cosa** (platos, precios, descripciones) cuando quiera.
3. **Así funciona** `#proceso` (franja oscura): título + pestañas Reseñas / Menú digital; a la izquierda una **pantalla de ejemplo sobre fondo crema** (`.process-visual[data-for]`) que cambia con la pestaña: la ventana de reseña de Google ya calificada (5 estrellas, "¡Todo delicioso! Volveremos pronto.", versión fija `.review-ui--static`) o la carta del menú (ceviche, patacón, burrata, empanadas). A la derecha, los 3 pasos. **No usar la foto del tótem** (el dueño la sintió "muy corriente").
4. **Preguntas** `#faq`: 5 preguntas con líneas finas. Mantener sincronizado el JSON-LD `FAQPage` del `<head>`.
5. **Contacto** `#contacto`: a la izquierda un panel oscuro con **las dos placas 3D de la portada juntas** (reseñas + menú, `.contact-stage`, `--u` 0.6 / 0.66) en un estudio con foco de luz, y debajo el título "Pide tus placas o tu menú", una línea y el número directo (la foto anterior "no tenía nada que ver"); a la derecha un **formulario corto**: nombre del negocio, "¿Qué quieres?" (botones: Reseñas en Google / Menú digital / Ambos), cantidad y nombre. El modelo elegido en "La colección" se muestra como "Modelo: … · Quitar". Nada de selects largos ni preguntas de Google Maps o versión: eso se habla por WhatsApp. Los precios se muestran solo en "La colección" (`.product-head`: nombre y debajo el precio, **en Instrument Sans**; el dueño dijo que en Gloock "se ve feo y no se lee").
6. **Pie de página** `.footer`: elemento propio después de contacto, compacto; la página termina ahí, sin espacio sobrante.
- Fondos: productos (papel) · así funciona (oscuro) · preguntas (papel) · contacto y pie (tinte).
- **WhatsApp flotante**: aparece apenas se baja 24px desde el hero y se oculta mientras el formulario de contacto está en pantalla (ya tiene su botón de WhatsApp). Lleva un borde claro sutil para verse sobre la franja oscura.
- Se quitaron en v70–v73: carrusel 3D de tarjetas, tabla NFC vs QR, tarjeta destacada de menú, botón "volver arriba", marco del lienzo, frase y precio del hero, sección "Un precio por placa" y el enlace "Precios" del menú.

## Placas 3D del hero (CSS puro)
- Cada `.obj` define medidas sin unidad (`--W --H --D` placa, `--WB --HB --DB` base) que se multiplican por `--px`, un largo que vale `--u × 1px` (escala por breakpoint: 0.68 en móvil, 0.8 desde 640px). `--px` se define en `.hero`, `.viewer-item` (según el alto del estudio) y `.contact-stage`.
- **Portada en escritorio (≥960px, v106): crece con la altura de la pantalla.** El dueño vio en su monitor grande (≈2400×1125) mucho espacio vacío arriba. Ahora `--px = clamp(0.85px, min(0.1872vh − 0.333px, 0.125vw), 2.2px)`, la palabra mide `min(17vw, 189 × px)`, la perspectiva `1308 × px` (las placas se ven iguales a cualquier tamaño) y el piso `94px + 42 × px`. Queda ~9–11% libre bajo el menú en todo tamaño (1280×720 a 2560×1300). Si sobra espacio (pantallas altas y angostas), `--lift` sube placas y botón para centrar. No volver a tamaños fijos en px para la portada de escritorio.
- Caras: `.pf-front/back/left/right/top` y `.bf-*`, con `transform-style: preserve-3d`. La sombra (`.obj-shadow`) es un plano horizontal dentro de `.obj-body`.
- La inclinación con el mouse escribe `--ry`/`--rx` en `#hero-stage` (solo con puntero fino y sin movimiento reducido). Hay un vaivén suave (`obj-sway`).
- La palabra se ubica con `--floor` y `--word-lift` para que las placas tapen solo la parte baja de las letras.
- **Fondo de la portada (v109): video real del restaurante.** El dueño quería las placas "sobre el mesón donde la gente paga" y sintió falso un mármol hecho con CSS. Ahora `.hero-scene` (primer hijo de `#hero`) tiene un `<picture>` con la imagen fija y un `<video muted loop playsinline preload="none">` encima: mesón de mármol blanco enfocado y restaurante desenfocado con gente moviéndose (generado por el dueño en Google Flow, bucle de 10 s, **sin fundidos**: el dueño no los quiere).
  - Archivos en `media/video/` (no en `media/` raíz: `amplify.yml` borra `media/*.mp4`): `restaurante-1080-v1.mp4` (1 MB), `-720-v1.mp4` (465 KB), `-vertical-v1.mp4` (recorte central 810×1080, 423 KB), cada uno con su `.webp` del primer cuadro. H.264 CRF 25, sin audio, `faststart`. Si cambia el video, subir el sufijo `-v2` (caché de un año).
  - `script.js` 3.1 pide el video después del `load` (idle), elige vertical si la pantalla es de pie y 720p/1080p según ancho × DPR; no lo carga con reducir movimiento, ahorro de datos o 2G, y lo pausa fuera de pantalla. El video aparece con un fundido de opacidad sobre la imagen.
  - `object-fit: cover; object-position: 50% 100%` (anclado abajo). `--vs` = tamaño en pantalla de un píxel del video (`max(100vw / --scene-w, alto / 1080)`, `--scene-w` 1920 o 810 en pantallas verticales). En el video el borde trasero del mesón está a 338 px del pie y el delantero a 93 px: `--floor: 165 × vs + 20 × px` deja las bases entre los dos en todo tamaño. En escritorio `--px = (91vh − 68px − 165 × vs) / 464`, con tope por ancho.
  - Las sombras de contacto de las bases (`.hero-stage .obj-shadow` y `.obj-body::after`) son más marcadas para que pesen sobre la piedra.
  - **Celular acostado** (`orientation: landscape` y alto ≤ 500px, ancho < 960px): la portada mide la pantalla (`min-height: max(340px, 100svh)`), palabra en una línea a `24vh`, `--u: 0.5`, piso +6px y botón a 6px del pie, para que todo quepa sin que las bases toquen el botón.
  - **Menú sobre el video (v113):** logo de la portada en blanco (`media/tapnfcs-logo-blanco.webp` + `drop-shadow` suave) y botón "Pedir" con borde y texto blancos sobre un velo oscuro leve (al pasar el mouse se llena de blanco). El logo del pie sigue negro (`tapnfcs-logo.webp`) porque va sobre crema.
  - **Celular (v113):** las placas crecen hasta donde deja el ancho (`--px: clamp(0.62px, 0.19vw, 0.86px)`) y el piso es `clamp(165 × vs + 20 × px, 92% del alto − menú − --comp, 300 × vs)`: en celulares altos el escenario sube (sin salirse del mesón) para no dejar tanto espacio bajo el menú. En escritorio el mismo clamp usa 88% del alto, así que la portada aprobada no cambia (solo ayuda en pantallas altas y angostas como el iPad Pro).
  - La palabra "TAPNFCS" va en **blanco con sombra suave** (`text-shadow: 0 4px 34px rgba(0,0,0,.28)`): en negro no se leía sobre el video (el dueño eligió blanco entre blanco, crema, dorado y negro con velo).
- La placa del **menú** lleva el diseño real del dueño (`media/tarjeta-menu.webp`, exportado de `tarjeta-menu.pdf` a 240 dpi): `.pf-front.face-art-wrap > img.face-art` cubre toda la cara. Sus medidas siguen la tarjeta real, 54 × 85,7 mm (`--W: 176; --H: 279`), para que el diseño no se deforme.
- La placa **blanca de reseñas** lleva `media/tarjeta-resenas.webp` (54 × 85,7 mm, `--W: 189; --H: 300`): "Déjanos una reseña en Google", estrellas, barra de 4 colores, QR, íconos Toca / Escanea. **Sin** "Alimentado por ABC RFID" (el dueño pidió quitarlo).
  - El QR apunta a `https://search.google.com/local/writereview?placeid=ChIJ6_rtkoemMI4RSs9DFVEhNOE` y está verificado (se lee incluso desde la placa 3D).
  - Fuente editable: `assets/tarjeta-resenas.html` de esta skill (540 × 857 px = 10 px/mm). Para cambiar el enlace: generar el QR nuevo con `cv2.QRCodeEncoder` (nivel M), reemplazar el `<svg>` dentro de `.qr`, renderizar con Chrome headless a 2x (`--window-size=540,857 --force-device-scale-factor=2`), reducir a 511 × 811 y guardar en WebP; luego verificar con `cv2.QRCodeDetector`.
- Para poner otro diseño real: exportar el PDF/PNG a WebP (~500 px de ancho), ajustar `--W`/`--H` a la proporción del producto y usar el mismo patrón `face-art`.

## Rendimiento (v104 — no retroceder)
- Prohibido `backdrop-filter` y `filter: blur()`. Los glows se hacen solo con `radial-gradient`.
- **Tipografías propias** en `media/fonts/` (Nunito 800 estática, Instrument Sans variable 400–600 y Gloock, subconjunto latino) con `@font-face` al inicio de style.css y `<link rel="preload" as="font" crossorigin>`. No volver a Google Fonts: la palabra TAP NFCS (el LCP) espera a Nunito, que es la que se precarga.
- **Texturas de las placas** con `srcset` (`<nombre>-320.webp 320w` + original 511w; sticker `-400` + 600w) y `sizes` según la escala `--u`. Si se cambia un diseño, regenerar también la versión pequeña y verificar el QR con `cv2.QRCodeDetector` en las dos.
- **Logo**: `media/tapnfcs-logo.webp` (302 × 132, negro, para el pie) y `media/tapnfcs-logo-blanco.webp` (blanco, para la portada sobre el video). No usar el SVG viejo (es un PNG de 24 KB embebido) ni `filter: brightness(0)`.
- **Nada escucha el scroll.** El WhatsApp flotante usa un marcador invisible + IntersectionObserver. No agregar `addEventListener('scroll')` ni leer `scrollY` en cada cuadro.
- **Giro 3D**: `--ry`/`--rx` están registradas con `@property` (`inherits: false`) y el JS las escribe en cada `.obj-body`, no en el escenario (así no se recalculan las caras). El giro del visor usa un resorte propio en `requestAnimationFrame` (solo mientras se mueve); la vuelta de presentación es una Web Animation sobre `transform` (la mueve el compositor) y `stopSpin()` la convierte en estado sin saltos si la tocan.
- **Botones**: `.btn:active` y `.nav-cta:active` se encogen a 0.97 al instante (respuesta al presionar, no al soltar).
- Los escenarios que no se ven (`#hero-stage`, `.viewer-stage`, `.contact-stage`) llevan `.is-paused` (IntersectionObserver) y sus animaciones infinitas se pausan.
- Animaciones de 0.6 s o menos, solo `transform` y `opacity`; respetar `prefers-reduced-motion`.
- **Pruebas en Safari:** el WebKit de Playwright sirve para revisar video, textos, tamaños y errores, pero **no dibuja bien el 3D**: muestra las caras de atrás incluso en un cubo de manual con `backface-visibility: hidden`. Si ahí las placas salen al revés, no es un error de la página; el 3D se confirma en un iPhone o Safari real.
- Para medir el scroll: puppeteer-core con el Chrome instalado, viewport 390×844 @3x, CPU 4x, `--disable-gpu` e `Input.synthesizeScrollGesture`, leyendo `PipelineReporter`, `UpdateLayoutTree`, `Layerize` y `FunctionCall` del trace.

## Siempre en claro (v105)
- La página nunca cambia de colores con el modo oscuro del celular o del navegador: `<meta name="color-scheme" content="only light">`, `:root { color-scheme: only light; }` y `<meta name="darkreader-lock">` (extensión Dark Reader). Es la forma oficial de desactivar el "tema oscuro automático" de Chrome/Brave/Samsung. No agregar reglas `@media (prefers-color-scheme: dark)`.
- Para comprobarlo: Chrome con `--force-dark-mode --enable-features=WebContentsForceDark --blink-settings=forceDarkModeEnabled=true` y el fondo del hero debe seguir crema.

## Responsive
- style.css es **mobile-first** desde v70: base de 375px y `@media (min-width: …)` en 480, 640, 768, 900, 960 y 1440. La única excepción es `(min-width: 960px) and (max-height: 760px)` para pantallas bajas.
- Cero scroll horizontal y áreas táctiles de 44px como mínimo.

## Publicación
- Cada cambio de CSS o JS sube el cache-buster `?v=` en index.html (style.css y script.js juntos).
- Commit y push a `origin main` solo cuando el dueño apruebe lo que vio en local.

## Hosting (v103)
- Sitio oficial: **https://www.tapnfcs.com** (AWS Amplify, app `tapnfcs` / `d1rmv8smyyi7a1`, us-east-1, rama `main`). Cada push a `origin main` se publica solo.
- `amplify.yml` copia únicamente `index.html`, `style.css`, `script.js`, `favicon.ico` y `media/` (sin los .mp4) a `dist/`. Si se agrega un archivo nuevo en la raíz, hay que sumarlo ahí.
- `customHttp.yml` (raíz del repo, Amplify lo lee en cada build): CSS, JS, tipografías y `media/video/*` con caché de un año `immutable` (por eso **siempre** hay que subir el `?v=`, y el sufijo `-vN` de los videos), imágenes WebP de `media/` con un día + `stale-while-revalidate`, y cabeceras de seguridad básicas (HSTS, nosniff, Referrer-Policy, X-Frame-Options).
- El DNS está en **Spaceship** (no en Route 53): `www` es un CNAME a CloudFront; la raíz `@` es un CNAME que Spaceship convierte en ALIAS; además está el CNAME `_…acm-validations.aws` del certificado SSL (no borrarlo, renueva el certificado).
- `https://tapnfcs.com` redirige a `https://www.tapnfcs.com`. Canonical, `og:url`, `og:image`, `twitter:image` y el JSON-LD usan `https://www.tapnfcs.com/`.

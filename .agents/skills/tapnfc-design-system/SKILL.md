---
name: tapnfc-design-system
description: Sistema de diseño vigente de TapNFC (landing de placas NFC para Google Reviews y menús digitales; estilo clásico, limpio y claro, con placas en 3D en el hero). Úsala antes de cambiar estilos, colores, tipografía, textos, imágenes o secciones de index.html, style.css o script.js en este proyecto. Tiene prioridad sobre las reglas genéricas de otras skills de diseño.
---

# TapNFC — Sistema de diseño (v104, clásico, limpio y con carácter)

Esta skill describe el diseño aprobado por el dueño. Si otra skill (impeccable, cro-landing-page, responsive-patterns, etc.) sugiere algo que la contradice, gana esta.

## Producto
- Placas NFC que abren la ficha de Google Reviews con 5 estrellas listas, o el menú digital del local.
- Precios (por producto de la colección): **Stand NFC Google Reviews $50.000** · **Sticker NFC $50.000** · **Tarjeta NFC con stand $40.000** · **Tarjeta NFC (menú, sin stand) $40.000** · **Tarjeta personalizada $40.000** (COP). Coincide con la regla anterior: con QR $50.000, solo NFC $40.000.
- Ventas por WhatsApp: +57 315 185 6554 → `https://wa.me/573151856554`. Mensajes en español natural, sin emojis.
- Instagram: `@tapnfcs`.

## Dirección visual
- Referencia del dueño: landing "MEASURED" — una palabra enorme en serif clásica detrás de un objeto protagonista, menú en cápsula centrado y casi nada de texto.
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
- **Gloock** (serif clásica, un solo peso): la palabra "TAPNFCS" del hero, los títulos de sección (en minúsculas normales, una línea), precios y números de pasos.
- **Instrument Sans** 400/500/600: todo lo demás.
- No usar monoespaciadas ni Cormorant (se quitaron en v70).
- Las tipografías están en `media/fonts/` y se precargan (ver Rendimiento). La palabra del hero aparece cuando Gloock está lista (`.fonts-ready`, con 3 s de tope).

## Textos
- Muy poco texto. Títulos cortos: "Dos productos", "La colección", "Así funciona", "Preguntas", "Pide tus placas o tu menú".
- Sin párrafos de introducción. Tarjetas y pasos: una frase corta.
- No agregar secciones nuevas sin pedido, aunque un framework de CRO las sugiera.
- No inventar cifras, testimonios ni promesas de servicio; preguntar antes.

## Estructura de index.html
1. **Hero** `#hero`: logo (34px móvil / 42px escritorio, para que pese igual que la cápsula) · menú en cápsula (Productos, Cómo funciona, Preguntas) · botón "Pedir". Palabra "TAPNFCS" en Gloock detrás de **dos placas 3D hechas en CSS** (reseñas: acrílico blanco sobre roble; menú: negro mate sobre nogal). Abajo **solo** el botón "Ver productos", centrado: el dueño pidió quitar la frase y el precio. El H1 existe pero oculto visualmente (`.sr-only`) para SEO y lectores de pantalla. En móvil la palabra va en dos líneas (TAP / NFCS).
2. **Productos** `#productos`: "Dos productos" — son **dos productos distintos** (reseñas en Google y menú digital); lo único que comparten es la tecnología NFC. No usar frases como "una placa, dos usos". Pantallas `.review-ui` / `.menu-ui` + "La colección".
   - **La colección son 5 productos en 3D** (v99), cada uno en su "estudio" (`.product-stage`, con su propio `--u`). Distribución con flex: 1 por fila en móvil, 2 en tablet (la última centrada) y **los 5 en una sola fila en escritorio** (≥1100px, `flex-wrap: nowrap`, `--u` 0.76–0.82). El dueño no quiere la colección partida en dos renglones en escritorio. En celular no usar carrusel horizontal: chocaría con el gesto de girar cada producto. Orden:
     1. **Stand NFC Google Reviews** — $50.000 (`.obj--acrylic`; nombre elegido por el dueño en v97; rechazó "Placa de acrílico", "Display de mesa" y "Soporte de reseñas Google"): una sola pieza en L, placa inclinada hacia atrás (`rotateX(11deg)` desde abajo) y base plana del mismo acrílico que va hacia atrás; **sin madera**. Diseño `tarjeta-resenas.webp`.
     2. **Sticker NFC** — $50.000 (`.obj--sticker`; "Adhesivo cuadrado para pegar en vitrinas, mesas, paredes o la caja"): cuadrado, delgado, **sin base**, adhesivo; atrás muestra el papel del adhesivo ("Adhesivo"). Diseño `sticker-cuadrado.webp` (azul "review us on Google", Tap your phone / Scan QR code; QR verificado).
     3. **Tarjeta NFC con stand** — $40.000 (`.obj--card`; "se usa sola o sobre su base de madera"): tamaño tarjeta de crédito, **de frente** (`--yaw: 0`) sobre roble. Diseño `tarjeta-review-us.webp`.
     4. **Tarjeta NFC** — $40.000 (`.obj--menucard`, `data-need="menu"`): la tarjeta negra del menú (`tarjeta-menu.webp`) **sin stand**, "Para tu menú digital. Sin stand, va directo en la mesa."
     5. **Tarjeta personalizada** — $40.000 (`.obj--blank`): blanca, con NFC, con una marca suave "Tu diseño aquí".
   - **Todos miran de frente** con el mismo ángulo (`--yaw: 0deg; --pitch: -10deg`) y sin vaivén: el dueño quiere que se vean "en el mismo orden". No volver a ponerlos girados en ángulos distintos.
   - **Interacción** (`script.js` 7.2): arrastrar gira el producto (con mouse en cualquier dirección; en táctil solo de lado, `touch-action: pan-y`, para no bloquear el scroll); un toque/clic o Enter/espacio lo **voltea** 180°; flechas giran 45°. Al soltar, vuelve suave a quedar de frente o de espaldas (múltiplos de 180°). Tocar la imagen ya no lleva al formulario; para pedir están el texto y "Pedir este modelo".
   - Partes de atrás: acrílico muestra el diseño al revés y tenue (`.face-art--mirror`), sticker el papel del adhesivo, tarjeta de madera "TAP NFCS" pequeño, tarjeta blanca lisa.
   - **Sin pista de "Arrastra para girar"**: el dueño la quitó en v90 (la gente lo descubre al pasar el dedo).
   - Los productos van **centrados** en su estudio y **flotan** suave (`obj-levitate`, 5 s, todos al mismo ritmo; se anima la propiedad `translate` de `.obj-body` para no pisar el `transform` del giro).
   - Cada producto tiene **su propia sombra** (`.product-stage .obj::after`) justo debajo de su base (`top: h + hb + 16px`), que se achica cuando el producto sube. Nunca usar una sombra fija del estudio: quedaba encima de la base de madera.
   - Con mouse se inclinan un poco siguiendo el cursor (±15° / ±8°); cada producto da una vuelta de 360° la primera vez que **su propio estudio** entra en pantalla (observador por estudio; si se observa la colección entera, en celular nunca se activa). Todo se desactiva con `prefers-reduced-motion`.
   - **Estudio grafito neutro** (v102, elegido por el dueño en la vista previa del chat): `.product-stage` con `#2C2E33 → #17181B`, foco de luz blanca suave arriba y sombras negras bajo cada producto. Se descartaron: café oscuro (`#2B2722`), arena dorada, gris claro, blanco, azul Google, terracota, pastel por producto y negro con dorado. Antes de cambiar colores, mostrar opciones al dueño en el chat (widget) y aplicar solo la que elija.
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
- Cada `.obj` define medidas sin unidad (`--W --H --D` placa, `--WB --HB --DB` base) que se multiplican por `--u` (escala por breakpoint: 0.68 → 0.8 → 1.15 → 1.3; 0.92 en pantallas bajas).
- Caras: `.pf-front/back/left/right/top` y `.bf-*`, con `transform-style: preserve-3d`. La sombra (`.obj-shadow`) es un plano horizontal dentro de `.obj-body`.
- La inclinación con el mouse escribe `--ry`/`--rx` en `#hero-stage` (solo con puntero fino y sin movimiento reducido). Hay un vaivén suave (`obj-sway`).
- La palabra se ubica con `--floor` y `--word-lift` para que las placas tapen solo la parte baja de las letras.
- La placa del **menú** lleva el diseño real del dueño (`media/tarjeta-menu.webp`, exportado de `tarjeta-menu.pdf` a 240 dpi): `.pf-front.face-art-wrap > img.face-art` cubre toda la cara. Sus medidas siguen la tarjeta real, 54 × 85,7 mm (`--W: 176; --H: 279`), para que el diseño no se deforme.
- La placa **blanca de reseñas** lleva `media/tarjeta-resenas.webp` (54 × 85,7 mm, `--W: 189; --H: 300`): "Déjanos una reseña en Google", estrellas, barra de 4 colores, QR, íconos Toca / Escanea. **Sin** "Alimentado por ABC RFID" (el dueño pidió quitarlo).
  - El QR apunta a `https://search.google.com/local/writereview?placeid=ChIJ6_rtkoemMI4RSs9DFVEhNOE` y está verificado (se lee incluso desde la placa 3D).
  - Fuente editable: `assets/tarjeta-resenas.html` de esta skill (540 × 857 px = 10 px/mm). Para cambiar el enlace: generar el QR nuevo con `cv2.QRCodeEncoder` (nivel M), reemplazar el `<svg>` dentro de `.qr`, renderizar con Chrome headless a 2x (`--window-size=540,857 --force-device-scale-factor=2`), reducir a 511 × 811 y guardar en WebP; luego verificar con `cv2.QRCodeDetector`.
- Para poner otro diseño real: exportar el PDF/PNG a WebP (~500 px de ancho), ajustar `--W`/`--H` a la proporción del producto y usar el mismo patrón `face-art`.

## Rendimiento (v104 — no retroceder)
- Prohibido `backdrop-filter` y `filter: blur()`. Los glows se hacen solo con `radial-gradient`.
- **Tipografías propias** en `media/fonts/` (Gloock y Instrument Sans variable 400–600, subconjunto latino) con `@font-face` al inicio de style.css y `<link rel="preload" as="font" crossorigin>`. No volver a Google Fonts: la palabra TAP NFCS (el LCP) espera a Gloock.
- **Texturas de las placas** con `srcset` (`<nombre>-320.webp 320w` + original 511w; sticker `-400` + 600w) y `sizes` según la escala `--u`. Si se cambia un diseño, regenerar también la versión pequeña y verificar el QR con `cv2.QRCodeDetector` en las dos.
- **Logo**: `media/tapnfcs-logo.webp` (302 × 132, ya en negro). No usar el SVG viejo (es un PNG de 24 KB embebido) ni `filter: brightness(0)`.
- **Nada escucha el scroll.** El WhatsApp flotante usa un marcador invisible + IntersectionObserver. No agregar `addEventListener('scroll')` ni leer `scrollY` en cada cuadro.
- **Giro 3D**: `--ry`/`--rx` están registradas con `@property` (`inherits: false`) y el JS las escribe en cada `.obj-body`, no en el escenario (así no se recalculan las caras). La vuelta de presentación de la colección es una Web Animation sobre `transform` (la mueve el compositor); si el usuario toca a mitad del giro, `stopSpin()` la convierte en estado sin saltos.
- Las placas que no se ven llevan `.is-paused` (IntersectionObserver) y sus animaciones infinitas se pausan.
- Animaciones de 0.6 s o menos, solo `transform` y `opacity`; respetar `prefers-reduced-motion`.
- Para medir el scroll: puppeteer-core con el Chrome instalado, viewport 390×844 @3x, CPU 4x, `--disable-gpu` e `Input.synthesizeScrollGesture`, leyendo `PipelineReporter`, `UpdateLayoutTree`, `Layerize` y `FunctionCall` del trace.

## Responsive
- style.css es **mobile-first** desde v70: base de 375px y `@media (min-width: …)` en 480, 640, 768, 900, 960 y 1440. La única excepción es `(min-width: 960px) and (max-height: 760px)` para pantallas bajas.
- Cero scroll horizontal y áreas táctiles de 44px como mínimo.

## Publicación
- Cada cambio de CSS o JS sube el cache-buster `?v=` en index.html (style.css y script.js juntos).
- Commit y push a `origin main` solo cuando el dueño apruebe lo que vio en local.

## Hosting (v103)
- Sitio oficial: **https://www.tapnfcs.com** (AWS Amplify, app `tapnfcs` / `d1rmv8smyyi7a1`, us-east-1, rama `main`). Cada push a `origin main` se publica solo.
- `amplify.yml` copia únicamente `index.html`, `style.css`, `script.js`, `favicon.ico` y `media/` (sin los .mp4) a `dist/`. Si se agrega un archivo nuevo en la raíz, hay que sumarlo ahí.
- `customHttp.yml` (raíz del repo, Amplify lo lee en cada build): CSS, JS y tipografías con caché de un año `immutable` (por eso **siempre** hay que subir el `?v=`), imágenes WebP con un día + `stale-while-revalidate`, y cabeceras de seguridad básicas (HSTS, nosniff, Referrer-Policy, X-Frame-Options).
- El DNS está en **Spaceship** (no en Route 53): `www` es un CNAME a CloudFront; la raíz `@` es un CNAME que Spaceship convierte en ALIAS; además está el CNAME `_…acm-validations.aws` del certificado SSL (no borrarlo, renueva el certificado).
- `https://tapnfcs.com` redirige a `https://www.tapnfcs.com`. Canonical, `og:url`, `og:image`, `twitter:image` y el JSON-LD usan `https://www.tapnfcs.com/`.

// Al publicar (amplify.yml), mete style.css dentro de index.html.
//
//   node build/estilos-en-linea.mjs dist
//
// Con style.css aparte, el celular tenía que esperar ese archivo para dibujar la página, y en 4G llegaba tarde
// porque se descargaba al mismo tiempo que las letras y las imágenes: la pantalla quedaba en blanco casi un
// segundo más. Dentro de index.html la página se dibuja apenas llega. En el repositorio todo sigue igual
// (index.html enlaza style.css?v=...): esto solo cambia la copia que se publica.
// Si no encuentra el enlace, falla y Amplify no publica nada (queda la versión anterior).
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = process.argv[2] || 'dist';
const pagina = join(dist, 'index.html');
const html = readFileSync(pagina, 'utf8');
const enlace = /<link rel="stylesheet" href="style\.css(\?v=[\d.]+)?">/;
if (!enlace.test(html)) {
  console.error('No encontré <link rel="stylesheet" href="style.css?v=..."> en ' + pagina);
  process.exit(1);
}
const css = readFileSync(join(dist, 'style.css'), 'utf8')
  .replace(/\/\*[\s\S]*?\*\//g, '') // comentarios
  .replace(/\s+/g, ' ')             // espacios y saltos de línea seguidos, uno solo
  .replace(/ ?([{};]) ?/g, '$1')
  .trim();
if (css.includes('</style')) {
  console.error('style.css tiene "</style": no se puede meter dentro de la página.');
  process.exit(1);
}
writeFileSync(pagina, html.replace(enlace, () => '<style>' + css + '</style>'));
console.log('style.css dentro de index.html (' + Math.round(css.length / 1024) + ' KB)');

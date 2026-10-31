import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { routes } from "../src/content.mjs";

const root = new URL("..", import.meta.url).pathname;
const failures = [];
for (const [route] of routes) {
  const file = route === "/" ? join(root, "dist/index.html") : join(root, "dist", route, "index.html");
  try {
    await access(file);
    const html = await readFile(file, "utf8");
    if (!html.includes("<title>") || !html.includes("meta name=\"description\"")) failures.push(`${route}: SEO básico ausente`);
    if (/href=["']#["']/.test(html)) failures.push(`${route}: link vazio encontrado`);
  } catch { failures.push(`${route}: arquivo ausente`); }
}
for (const file of ["styles.css", "app.js", "assets/repitt-logo-color.png", "fonts/wave-bold.otf"]) {
  try { await access(join(root, "dist", file)); } catch { failures.push(`${file}: asset ausente`); }
}
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Verificação concluída: ${routes.length} rotas e assets essenciais válidos.`);

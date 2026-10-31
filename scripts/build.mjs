import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { routes, pages } from "../src/content.mjs";
import { renderPage } from "../src/template.mjs";

const root = new URL("..", import.meta.url).pathname;
const dist = join(root, "dist");
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(join(root, "public"), dist, { recursive: true });

for (const [route, key] of routes) {
  const target = route === "/" ? join(dist, "index.html") : join(dist, route, "index.html");
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, renderPage(pages[key], route));
}

await writeFile(join(dist, "404.html"), renderPage({
  title: "Página não encontrada | Repitt",
  description: "A página solicitada não foi encontrada.",
  body: `<section class="inner-hero section"><div class="container"><span class="eyebrow">Erro 404</span><h1>Essa volta não estava no roteiro.</h1><p>A página que você procura não existe ou mudou de endereço.</p><a class="button button-primary" href="/">Voltar para a página inicial</a></div></section>`
}, "/404/"));

const sitemap = routes.map(([route]) => `<url><loc>https://repitt.com.br${route}</loc></url>`).join("");
await writeFile(join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemap}</urlset>`);
await writeFile(join(dist, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://repitt.com.br/sitemap.xml\n");
console.log(`Build concluído: ${routes.length} rotas em dist/`);

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = join(new URL("..", import.meta.url).pathname, "dist");
const port = Number(process.env.PORT || 4173);
const types = { ".html":"text/html; charset=utf-8", ".css":"text/css", ".js":"text/javascript", ".png":"image/png", ".webp":"image/webp", ".otf":"font/otf", ".xml":"application/xml", ".txt":"text/plain" };
createServer(async (req, res) => {
  let path = normalize(decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname)).replace(/^\.{2,}/, "");
  let file = join(root, path);
  try { if ((await stat(file)).isDirectory()) file = join(file, "index.html"); }
  catch { file = join(root, "404.html"); res.statusCode = 404; }
  try { const data = await readFile(file); res.setHeader("Content-Type", types[extname(file)] || "application/octet-stream"); res.end(data); }
  catch { res.statusCode = 500; res.end("Erro interno"); }
}).listen(port, "0.0.0.0", () => console.log(`Repitt: http://localhost:${port}`));

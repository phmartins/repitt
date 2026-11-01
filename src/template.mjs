export function renderPage(page, route) {
  const canonical = `https://repitt.com.br${route}`;
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  <meta name="theme-color" content="#8409D5">
  <meta name="color-scheme" content="light">
  <link rel="canonical" href="${canonical}">
  <link rel="icon" type="image/png" href="/assets/repitt-symbol-violet.png">
  <link rel="manifest" href="/site.webmanifest">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:title" content="${page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="https://repitt.com.br/assets/og-repitt.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="preload" href="/fonts/wave-bold.otf" as="font" type="font/otf" crossorigin>
  <link rel="preload" href="/fonts/intrade-regular.otf" as="font" type="font/otf" crossorigin>
  <script>document.documentElement.classList.add('js')</script>
  <link rel="stylesheet" href="/styles.css">
  <script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"Repitt","url":"https://repitt.com.br"}</script>
</head>
<body data-route="${route}">
  <a class="skip-link" href="#conteudo">Pular para o conteúdo</a>
  ${header(route)}
  <main id="conteudo">${page.body}</main>
  ${footer()}
  <div class="cookie-banner" data-cookie-banner hidden><div><strong>Cookies sob seu controle</strong><p>Usamos apenas armazenamento essencial nesta versão. Você pode revisar sua escolha a qualquer momento.</p></div><div><button class="button button-ghost" data-cookie-reject>Somente essenciais</button><button class="button button-primary" data-cookie-accept>Aceitar</button></div></div>
  <div class="toast" role="status" aria-live="polite" hidden></div>
  <script src="/config.js"></script>
  <script src="/app.js" defer></script>
</body>
</html>`;
}

function header(route) {
  const active = p => route.startsWith(p) ? ' aria-current="page"' : '';
  const chevron = `<svg class="nav-chevron" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="m3 4.5 3 3 3-3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  return `<header class="site-header" data-header><div class="container header-inner"><a class="brand" href="/" aria-label="Repitt — página inicial"><img src="/assets/repitt-logo-black.png" alt="Repitt — sua volta vale mais" width="1000" height="430"></a><nav class="desktop-nav" aria-label="Navegação principal"><div class="nav-group"><button type="button" aria-expanded="false" data-menu-button>Produto ${chevron}</button><div class="mega-menu" hidden><span class="menu-label">Conheça a plataforma</span><a href="/produto/"><b>Visão geral</b><small>As duas experiências da Repitt</small></a><a href="/funcionalidades/"><b>Funcionalidades</b><small>Recursos por objetivo</small></a><a href="/funcionalidades/comprovante-inteligente/"><b>Comprovante Inteligente</b><small>Modalidades e validação</small></a></div></div><div class="nav-group"><button type="button" aria-expanded="false" data-menu-button>Soluções ${chevron}</button><div class="mega-menu" hidden><span class="menu-label">Para cada negócio</span><a href="/solucoes/"><b>Por segmento</b><small>Encontre seu contexto</small></a><a href="/para-estabelecimentos/"><b>Para estabelecimentos</b><small>Gestão e operação</small></a></div></div><a href="/como-funciona/"${active('/como-funciona/')}>Como funciona</a><a href="/planos/"${active('/planos/')}>Planos</a></nav><div class="header-actions"><a class="header-link" href="/contato/">Contato</a><a class="button button-primary compact-button" href="/como-funciona/">Conhecer a Repitt <span aria-hidden="true">→</span></a><button class="menu-toggle" type="button" aria-label="Abrir menu" aria-expanded="false" data-menu-toggle><i></i><i></i></button></div></div><div class="mobile-menu" data-mobile-menu hidden><div class="container"><a href="/produto/">Produto</a><a href="/funcionalidades/">Funcionalidades</a><a href="/funcionalidades/comprovante-inteligente/">Comprovante Inteligente</a><a href="/solucoes/">Soluções</a><a href="/como-funciona/">Como funciona</a><a href="/planos/">Planos</a><a href="/empresa/">Empresa</a><a href="/contato/">Contato</a></div></div></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="container footer-top"><div class="footer-brand"><img src="/assets/repitt-logo-white.png" alt="Repitt" width="720" height="244"><p>Fidelização simples para relações que continuam.</p><strong>SUA VOLTA VALE MAIS!</strong></div><div><h2>Produto</h2><a href="/produto/">Visão geral</a><a href="/funcionalidades/">Funcionalidades</a><a href="/funcionalidades/comprovante-inteligente/">Comprovante Inteligente</a><a href="/como-funciona/">Como funciona</a></div><div><h2>Soluções</h2><a href="/solucoes/">Segmentos</a><a href="/para-estabelecimentos/">Estabelecimentos</a><a href="/planos/">Planos</a></div><div><h2>Repitt</h2><a href="/empresa/">Empresa</a><a href="/perguntas-frequentes/">Perguntas frequentes</a><a href="/contato/">Contato</a></div><div><h2>Legal</h2><a href="/privacidade/">Privacidade</a><a href="/termos/">Termos</a><a href="/cookies/">Cookies</a><button type="button" data-cookie-settings>Preferências de cookies</button></div></div><div class="container footer-bottom"><span>© ${new Date().getFullYear()} Repitt. Informações empresariais pendentes de confirmação.</span><span>Site institucional · painel e experiência do consumidor são ambientes separados.</span></div></footer>`;
}

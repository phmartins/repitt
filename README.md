# Repitt — site institucional

Site institucional estático, responsivo e acessível da Repitt, construído a partir do prompt mestre, do `DESIGN.md`, da paleta oficial e dos ativos de marca.

## Executar

Requer Node.js 20 ou superior.

```bash
npm run build
npm run check
npm run dev
```

O servidor local usa `http://localhost:4173` por padrão. A pasta de publicação é `dist/`.

## Estrutura

- `src/content.mjs`: conteúdo e rotas públicas.
- `src/template.mjs`: layout compartilhado, navegação e SEO.
- `public/styles.css`: design system e responsividade.
- `public/app.js`: menus, tabs, FAQ, demonstração, cookies e formulário.
- `public/assets`: logos oficiais, símbolo, ícone especial e fotografia editorial.
- `public/fonts`: LT Wave (títulos) e Intrade (texto/interface).
- `scripts/build.mjs`: geração estática das rotas.
- `scripts/check.mjs`: verificações de integridade.

## Configuração pública

Edite `public/config.js` durante o deploy ou substitua-o pela configuração do ambiente:

```js
window.REPITT_CONFIG = {
  contactEndpoint: "https://endpoint-publico-do-formulario",
  loginUrl: "https://ambiente-publicado-de-login"
};
```

Não coloque chaves secretas, tokens ou credenciais no frontend.

## Conteúdo demonstrativo

As interfaces, números e jornadas exibidos estão identificados como exemplos. Não representam clientes, resultados ou disponibilidade contratual. O Comprovante Inteligente é explicado como modalidade projetada e depende da implementação real de validação.

## Pendências antes da publicação comercial definitiva

- Confirmar domínio canônico e URLs dos ambientes autenticados.
- Configurar o endpoint oficial do formulário comercial.
- Aprovar preços, limites, cobrança e cancelamento dos planos.
- Classificar cada funcionalidade como disponível, em validação ou planejada.
- Substituir minutas de Privacidade e Termos por documentos jurídicos aprovados.
- Adicionar razão social, CNPJ, endereço e canais oficiais.
- Confirmar licenças de uso das famílias Intrade e LT Wave para publicação web.
- Validar a implementação do Comprovante Inteligente antes de anunciar disponibilidade.

## Identidade

- Royal Violet: `#8409D5`
- Sky Aqua: `#00DDFC`
- Black: `#000000`
- Mauve: `#D8AAF1`
- White: `#FFFFFF`

O favicon e as aplicações de marca usam os arquivos oficiais; o símbolo não é redesenhado em CSS.

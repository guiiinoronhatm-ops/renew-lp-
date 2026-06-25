# PROMPT MESTRE — Construção da Landing Page Renew Estética

> COMO USAR: abra o Claude Code na pasta `Renew` (com o `CLAUDE.md` e a pasta
> `/assets` já dentro) e cole TODO o bloco abaixo (entre as linhas `=====`) como
> sua primeira mensagem. Ele vai ler o CLAUDE.md, acionar a skill e construir.

=====

Você é o design lead de um estúdio conhecido por dar a cada cliente uma identidade
visual impossível de confundir com a de qualquer outro. Este cliente já rejeitou
propostas com "cara de template/IA". Você vai construir uma Landing Page Hub para a
**Renew Estética Avançada** (Blumenau/SC) que converte tráfego pago em agendamentos.

## ETAPA 0 — Antes de codar (obrigatório, faça e me mostre)
1. Leia o `CLAUDE.md` inteiro deste projeto. Ele é a fonte da verdade.
2. Acione a skill `ui-ux-pro-max` e rode estas buscas, me resumindo o que retornou:
   - `python .claude/skills/ui-ux-pro-max/scripts/search.py "luxury beauty aesthetic clinic dark gold elegant" --design-system --persist -p "Renew Estetica"`
   - `python .claude/skills/ui-ux-pro-max/scripts/search.py "elegant serif display luxury" --domain typography`
   - `python .claude/skills/ui-ux-pro-max/scripts/search.py "dark luxury gold" --domain color`
   - `python .claude/skills/ui-ux-pro-max/scripts/search.py "beauty clinic" --domain landing`
3. Monte um PLANO compacto (paleta da seção 3 do CLAUDE.md, tipografia, wireframe
   ASCII de cada seção, e qual será o ELEMENTO ASSINATURA da página). Critique o
   plano contra a "Regra de Ouro" do CLAUDE.md. Só depois construa.

NÃO comece o código antes de me mostrar o plano + o elemento assinatura.

## ETAPA 1 — Stack e arquivo
- HTML único `index.html` + Tailwind (CDN no protótipo) + GSAP/ScrollTrigger (CDN)
  + lucide para ícones. Vanilla JS. Sem framework, sem build.
- Use as imagens reais já em `/assets`: `gleice.jpg`, `eliane.jpg`, `tatiana.jpg`,
  `fachada.jpg`, `fachada_vertical.jpg`.
- Mobile-first. Teste mentalmente em 380px primeiro.

## ETAPA 2 — Construa as seções NESTA ordem, com este conteúdo

### 1) HEADER (fixo, sticky, blur sutil, fundo --ink)
- Esquerda: wordmark "RENEW" em serifada + "ESTÉTICA AVANÇADA" pequeno embaixo, em
  tracking largo. Cor clara/ouro sobre escuro.
- Centro (desktop): menu âncora → "Terapias" (#terapias) · "Estética Facial"
  (#estetica) · "Saúde & Emagrecimento" (#nutrologia).
- Direita: botão dourado "WhatsApp" sempre visível.
- Mobile: wordmark + botão WhatsApp; menu vira ícone hambúrguer.
- Rolagem suave nas âncoras (scroll-behavior + offset do header fixo).

### 2) HERO (fundo --ink, ocupa ~100vh, é a tese da página)
- Fundo: foto da fachada/ambiente bem esmaecida + camada de gradiente dourado
  ANIMADO lento (luz quente que se move) + overlay de grão 2–3%.
- H1 (serifada display, grande): **"O segredo não é exagerar. É respeitar a sua
  essência."** — destaque em ouro nas palavras "exagerar" e "essência".
- Sub-headline (sans, --muted-claro): "Uma clínica multidisciplinar onde estética,
  saúde e acolhimento se encontram. Tratamentos seguros, naturais e sem afastá-la
  da sua rotina."
- CTA primário dourado: "Agendar minha avaliação" → abre WhatsApp (procedimento
  genérico "avaliação").
- Logo abaixo do CTA, selo discreto: **★ 5,0 · 55+ avaliações no Google**.
- Seta/botão "Ver tratamentos" que rola até o hub.
- Animação de entrada do H1 orquestrada (uma vez, no load), respeitando
  prefers-reduced-motion.

### 3) FAIXA INSTITUCIONAL (fundo claro --champagne, 2 colunas)
- Coluna texto: H2 serifada "Muito além da estética. Uma jornada de reencontro com
  você mesma." + parágrafo sobre clínica multidisciplinar, atendimento humanizado,
  não-linha-de-produção (ver CLAUDE.md seção 6). Pequeno filete dourado como detalhe.
- Coluna imagem: `fachada.jpg` ou `fachada_vertical.jpg` com moldura sutil e canto
  arredondado leve. Reveal no scroll (fade + leve translate), discreto.

### 4) HUB DE ESPECIALISTAS (o coração — 3 blocos achables em segundos)
Cada bloco é uma seção full com âncora própria, alternando fundo escuro/claro para
dar ritmo. Estrutura repetida, com diferenciador sutil por bloco:

**Bloco A — `#terapias` — Gleice Felipe (Terapeuta Integrativa e Massoterapeuta)**
- ATENÇÃO: nunca escrever "Dra." para a Gleice.
- Foto `gleice.jpg` (recorte elegante), nome, papel "Terapeuta Integrativa ·
  Massoterapeuta". Eyebrow: "Terapias Clínicas & Bem-estar".
- Texto curto de acolhimento (CLAUDE.md). 
- Cards de procedimento (cada um abre MODAL): "Terapias de Alívio & Equilíbrio"
  (acupuntura, auriculo, ventosa, laser, ILIB) · "Massoterapia Estética & Drenagem"
  (lipedema, celulite, gordura localizada, flacidez).
- CTA do bloco: "Agendar terapia com Gleice".

**Bloco B — `#estetica` — Dra. Eliane Brining (Biomédica Esteta · CRBM/SC 11688)**
- Foto `eliane.jpg` (recorte com leve destaque, é o bloco de maior tráfego).
- Eyebrow: "Estética Facial & Modulação".
- **CARD EM DESTAQUE FORTE (borda/realce dourado, maior):** "Otomodelação —
  Correção de Orelha de Abano". Esse card recebe tráfego direto de anúncio; tem que
  saltar aos olhos. Modal com copy de acolhimento (libertar-se de esconder o rosto,
  procedimento seguro, minimamente invasivo, recuperação rápida).
- Outros cards (modais): "Harmonização Facial Natural" (preenchimento labial/facial,
  botox com naturalidade) · "Pele & Vasinhos" (microagulhamento, limpeza de pele,
  secagem de vasinhos/PEIM).
- CTA do bloco: "Avaliação de estética facial".

**Bloco C — `#nutrologia` — Dra. Tatiana Toledo (Médica Nutróloga · CRM SC: 25019)**
- Foto `tatiana.jpg`. Eyebrow: "Saúde Integrativa & Emagrecimento".
- Cards (modais): "Emagrecimento com Bioimpedância" (fim do efeito sanfona,
  diagnóstico médico, plano individual) · "Terapias Injetáveis & Reposição
  Vitamínica" (vitaminas/minerais injetáveis, teste genético).
- CTA do bloco: "Iniciar avaliação com a Dra. Tatiana".

> MODAL: ao clicar num card, NÃO abrir nova aba. Abrir um `<dialog>`/modal central,
> fundo escurecido com blur, com: título, explicação (copy), 1 linha de reforço de
> segurança, e botão dourado de WhatsApp que chama `abrirWhatsApp("nome do
> procedimento")` (função com UTM da seção 7 do CLAUDE.md). Fechar no X, no backdrop
> e no ESC. Travar scroll do body enquanto aberto. Acessível (focus trap, aria).

### 5) PROVA SOCIAL (fundo --ink)
- Faixa com "★ 5,0 no Google · 55+ avaliações".
- 2–3 cards de depoimento. Se não houver texto real, deixe placeholders claros:
  `<!-- DEPOIMENTO REAL: substituir -->` com estrutura pronta.
- Espaço reservado, bonito, rotulado para galeria ANTES/DEPOIS (alta conversão) —
  deixar `<!-- ANTES/DEPOIS: inserir imagens reais -->`.

### 6) FAQ (acordeão, fundo claro)
- 4 itens (CLAUDE.md seção 6): dói? / parar rotina? / quanto custa? / é seguro?
- Pergunta em serifada, resposta em sans. Abre/fecha suave. Um aberto por vez ok.

### 7) LOCALIZAÇÃO (2 colunas ou full)
- Google Maps embed (iframe lazy) do endereço R. Mal. Deodoro, 544 - sala 02, Velha,
  Blumenau-SC. Endereço escrito ao lado + botão "Como chegar" (link maps que abre GPS).
- Título acolhedor: "Venha tomar um café e conversar sobre o seu bem-estar."

### 8) FOOTER (compliance, fundo --ink)
- Col 1: "Renew Estética Avançada" + endereço + Instagram @renewesteticablumenau.
- Col 2: "Responsável Técnico: [INSERIR NOME]" + registros + disclaimer:
  "As informações deste site têm caráter informativo e não substituem a consulta
  presencial."
- Col 3: selos LGPD / Ambiente Seguro (SSL). 
- Linha final discreta com crédito/ano.

### 9) BOTÃO WHATSAPP FLUTUANTE
- Canto inferior direito, fixo, dourado, com leve sombra e micro-pulse discreto.
- Sempre visível em mobile. Chama `abrirWhatsApp("avaliação")`.

## ETAPA 3 — Detalhes de execução obrigatórios
- ELEMENTO ASSINATURA: incorpore o grafismo dourado fluido (a silhueta/linha da
  marca vista na fachada) como elemento recorrente — divisor entre seções ou traço
  que acompanha o scroll. É o que a página será lembrada por. Gaste a ousadia AQUI e
  mantenha o resto quieto e disciplinado.
- Grão/noise nas seções escuras (2–3%). Gradiente animado só no hero.
- GSAP ScrollTrigger: reveals discretos (fade + 12–16px translate). Nada espalhado.
- Tipografia: escala clara, palavras-chave emocionais em serifada/ouro.
- Performance: `loading="lazy"` abaixo da dobra, fontes com `display=swap`,
  comentar onde trocar o Tailwind CDN por CSS minificado no deploy.
- Piso de qualidade: responsivo até 380px, foco de teclado visível,
  `prefers-reduced-motion`, contraste AA, `alt` descritivo nas imagens.

## ETAPA 4 — Ao terminar
- Rode uma autocrítica: liste 3 coisas que poderiam parecer "de IA" e como você as
  evitou. Remova um exagero (regra Chanel).
- Me diga como testar localmente (abrir index.html) e o passo de deploy na Vercel.

Construa agora. Mostre o PLANO + elemento assinatura primeiro, espere meu "pode ir",
depois gere o `index.html` completo.

=====

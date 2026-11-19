# PULPA — Correções e refinamento premium

Data: 18/11/2026.

## Escopo e arquivos

Refinamento da implementação existente em Next.js, React, TypeScript, Tailwind e GSAP. O scroll horizontal com pinning continua sendo a experiência desktop da coleção. O comportamento vertical existente em mobile e com movimento reduzido foi mantido. Não foram adicionadas dependências.

| Arquivo | Alteração |
| --- | --- |
| `src/components/layout/Preloader.tsx` | Timeline de entrada, espera animada, saída e entrega para a hero; início após os demais efeitos de layout; cleanup e finalização segura. |
| `src/components/layout/Footer.tsx` | Ciclo cromático automático por letra, com pausa e retomada pela visibilidade da palavra. |
| `src/components/sections/Collection.tsx` | Composições dos quatro perfumes, hierarquia editorial, parallax interno, miniaturas, navegação e estado ativo. |
| `src/components/sections/Hero.tsx` | Fotografias nos seletores e badge reutilizável. |
| `src/components/sections/Experience.tsx` | Tamanho mínimo do título ajustado para português em 320 px. |
| `src/components/ui/Logo.tsx` | Lockup proporcional entre símbolo e wordmark. |
| `src/components/ui/Decor.tsx` | Novo path da onda com extremidades arredondadas e margem inferior da gota; identificação das formas para auditoria. |
| `src/components/ui/Badge.tsx` | Componente comum para labels e tags. |
| `src/components/ui/FruitThumbnail.tsx` | Fotografias decorativas com dimensões explícitas e proporção consistente. |
| `src/components/ui/FragranceList.tsx` | Lista acessível e um único preview fotográfico compartilhado. |
| `src/data/assets.ts` | Registro tipado das quatro miniaturas. |
| `src/app/globals.css` | Direção de arte dos slides, proporções da marca, badges, lista, preview e ajustes por resolução/altura. |
| `public/images/fruits/thumbnails/*.webp` | Quatro derivados otimizados das fotografias existentes. |
| `README.md` | Documentação dos novos componentes, derivados e limites do preloader. |
| `docs/PREMIUM_REFINEMENT_REPORT.md` e `docs/PREMIUM_VALIDATION_RESULTS.json` | Relatório e evidências das verificações executadas. |

## Preloader: causa e correção

Foram identificados dois fatores concretos para a entrada parecer estática:

1. A timeline começava no efeito de layout. A preparação de outras animações e dos textos podia consumir parte relevante da entrada antes da primeira pintura. O primeiro frame visível já estava próximo do estado final.
2. Os pequenos deslocamentos das peças eram expressos nas unidades do SVG oficial, cujo viewBox tem 938 unidades de altura. Um deslocamento de 12 unidades correspondia a aproximadamente 2 px na apresentação final.

A timeline agora é criada pausada e começa em `requestAnimationFrame`, depois dos demais efeitos de layout. O símbolo entra com escala, opacidade, deslocamento vertical, pequena rotação e revelação por máscara. As cinco peças se montam com stagger perceptível, sem alteração dos paths oficiais.

As imagens críticas da hero e as fontes carregam simultaneamente à animação. Se ainda estiverem pendentes quando a montagem terminar, o símbolo continua respirando suavemente. A espera por recursos tem limite de 2,5 s; a saída não depende de todos os arquivos terminarem. Uma guarda de 6 s finaliza o fluxo e libera o scroll. A proteção CSS e a regra de `noscript` existentes continuam disponíveis.

A saída amplia e dissolve o símbolo, move as quatro cortinas e entrega a animação à hero durante a revelação. Guardas impedem dupla entrega/finalização. O cleanup cancela o frame agendado, aborta a espera, remove o timeout e destrói apenas as animações deste componente, incluindo a respiração. Com movimento reduzido, o fluxo usa fades curtos, sem escala ou rotação. O símbolo permanece branco e o preloader não exibe o wordmark PULPA.

## Ondas e formas

A onda anterior começava e terminava fora do seu próprio viewBox, produzindo extremidades retas onde o corte era interno à composição. O novo path mantém a curva e as duas pontas arredondadas inteiramente dentro de `0 0 400 160`, incluindo a espessura do traço de 40 unidades.

A gota chegava à coordenada vertical 102 em um viewBox que terminava em 100. O viewBox agora termina em 106, deixando margem equivalente acima e abaixo. Sparkles, blobs, folhas, flores, scallops, splash e squiggles também foram incluídos na auditoria geométrica. Os containers das seções continuam contendo a arte; não foi aplicado `overflow: visible` globalmente. Recortes intencionais nos limites externos da viewport foram preservados.

## Marca, cards e badges

O lockup utiliza uma unidade comum de tamanho, altura proporcional do símbolo, espaçamento em `em` e ajuste óptico vertical. O desenho e os paths oficiais não foram modificados. O wordmark continua escrito PULPA, sem ponto.

O componente `Badge` padroniza centralização, padding, altura mínima, borda e raio. Labels de frutas e tags têm variantes adequadas à sua função. Os textos podem crescer em português, sem largura fixa forçada. A label da hero agora é um elemento `inline-flex` transformável e centralizado. As notas dos perfumes usam três colunas com divisores sutis e cada nota em sua própria linha.

## Slides dos perfumes

Cada slide combina o frasco original, pedestal de pedra, sombra de contato, recortes de fruta em duas profundidades, macro fotográfica orgânica e um detalhe gráfico discreto. As composições alternam o lado do produto e do texto. O frasco permanece como protagonista.

| Fragrância | Direção de arte |
| --- | --- |
| SOLA — `#F2CC58` | Luz dourada, abacaxi em primeiro plano e textura luminosa. |
| RUBRA — `#BC4358` | Profundidade rosada, textura rica das framboesas e contraste em ivory. |
| MAREA — `#F2A16E` | Luz cremosa, mamão escultórico e formas assimétricas arredondadas. |
| VERA — `#A9C77D` | Verde fresco, maçã em primeiro plano e textura mais contida. |

A estrutura interna reúne label, nome, frase conceitual, descrição, notas, personalidade e CTA. O espaço inferior desktop reserva a área dos controles. Há ajustes específicos para desktops baixos, além das composições em fluxo no mobile.

A implementação original de `ScrollTrigger`, `pin`, `scrub` e deslocamento do track foi preservada. Animações internas utilizam o mesmo `containerAnimation`, coordenando frasco, frutas, nome, macro, forma e detalhes de texto. `invalidateOnRefresh` continua ativo. Ao mudar para movimento reduzido, os estilos de entrada são revertidos para que o texto permaneça legível.

## Miniaturas e hover das frutas

As quatro miniaturas foram derivadas das fotografias transparentes existentes, mantendo os 24 originais sem alterações. Cada WebP tem 256×256 px, canal alpha e enquadramento `contain`.

| Perfume | Fonte em `public/images/fruits/` | Miniatura em `public/images/fruits/thumbnails/` | Tamanho |
| --- | --- | --- | ---: |
| SOLA | `fruit-cutout-pineapple.webp` | `pineapple.webp` | 21.026 bytes |
| RUBRA | `fruit-cutout-berries.webp` | `berries.webp` | 22.172 bytes |
| MAREA | `fruit-cutout-papaya.webp` | `papaya.webp` | 19.110 bytes |
| VERA | `fruit-cutout-apple.webp` | `apple.webp` | 12.510 bytes |

Total adicional: 74.818 bytes, aproximadamente 73,1 KiB. Hero, lista, labels e controles da coleção usam o registro `FRUIT_THUMBNAILS`. Os controles fornecem os nomes acessíveis traduzidos; as imagens decorativas têm alt vazio para evitar leitura duplicada.

A lista possui um único container flutuante e quatro camadas de fotos, sem criar elementos a cada hover. `gsap.quickTo` suaviza posição e troca da foto; uma animação reutilizada controla a entrada/saída. O preview permanece no espaço ao lado da lista, fora do texto, e dentro da viewport. O foco por teclado também o apresenta. Scroll, resize, blur e saída do ponteiro o recolhem. No mobile, as fotografias ficam visíveis nas próprias linhas, com feedback de foco/seleção, sem preview dependente de hover.

## Footer e integração

Uma timeline GSAP automática muda cada letra individualmente entre SOLA, RUBRA, MAREA, VERA e Warm Ivory (`#F6F1E8`). As ordens são embaralhadas e cada destino exclui a cor atual, evitando trocas imperceptíveis para a mesma cor. As transições incluem pequenas pausas; o ciclo repete continuamente sem eventos de mouse.

O `ScrollTrigger` acompanha a palavra grande, inicia quando ela entra na viewport, pausa fora dela e retoma o mesmo ciclo ao retornar. Não existem transforms nas letras nem timers acumulados. Movimento reduzido mantém a palavra estática em ivory.

O sistema bilíngue permanece ativo, sem recarregar a página na troca manual. Todo documento novo continua começando em inglês, independentemente de idioma do navegador, query string ou armazenamento anterior. Nomes próprios permanecem inalterados. Os reveals de seção continuam reaparecendo ao retornar pelo scroll, sem reiniciar os seletores interativos.

## Validação executada

Os resultados estruturados estão em [PREMIUM_VALIDATION_RESULTS.json](PREMIUM_VALIDATION_RESULTS.json). Os testes de navegador foram executados com Playwright e Chromium disponíveis no ambiente, sem adicionar dependências ao projeto.

| Verificação | Resultado |
| --- | --- |
| `npm run lint` | Aprovado. |
| `npm run typecheck` | Aprovado. |
| `npm run build` | Aprovado; página principal e ícone gerados estaticamente. |
| `npm run assets:check` | 24/24 slots originais presentes, sem placeholders. |
| Integridade das fotografias | SHA-256 dos 24 originais idêntico ao manifesto anterior. |
| Miniaturas | 4/4 arquivos válidos, 256×256, WebP com alpha. |
| Símbolo oficial | Paths e componente comparados com a cópia anterior, sem alteração. |
| Responsividade | 28 combinações aprovadas: sete larguras × dois idiomas × duas preferências de movimento. |
| Coleção desktop | 24 visitas aos slides nos três tamanhos desktop e dois idiomas, mais oito visitas no build de produção. |
| SVGs decorativos | 45 instâncias verificadas em cada layout; geometria e espessura dos traços dentro dos viewBoxes. |
| Preloader | 16 cenários dedicados aprovados entre desenvolvimento e produção, além das aberturas dos testes de interação. |
| Interações | Preview, seleção de frutas, foco, menu mobile, CTAs, troca de idioma, replay e footer aprovados. |
| Erros de aplicação | Nenhum erro de JavaScript ou console inesperado nos cenários executados. |

### Larguras e alturas

Todos os tamanhos abaixo foram verificados em inglês e português, tanto com movimento normal quanto reduzido. Não foram encontrados overflow horizontal da página, títulos ou badges excedentes, nem imagens quebradas. Os deslocamentos intencionais de saída do título animado foram distinguidos da largura real do texto.

| Viewport | Resultado |
| --- | --- |
| 320×740 | Aprovado. |
| 375×812 | Aprovado. |
| 390×844 | Aprovado. |
| 768×1024 | Aprovado. |
| 1024×768 | Aprovado; os quatro CTAs permanecem acima dos controles. |
| 1440×900 | Aprovado; navegação pelos quatro slides nos dois idiomas. |
| 1920×1080 | Aprovado; navegação pelos quatro slides nos dois idiomas. |

As composições mobile e desktop, a lista com preview, seções editoriais e o footer também foram inspecionados em capturas reais do navegador.

### Carregamentos e movimento

Em cada ambiente foram testados: primeira entrada, dois recarregamentos completos equivalentes a F5/Ctrl+R pela API do navegador, retorno com documento novo, mobile, imagens críticas atrasadas em 4,2 s, falha simulada dessas imagens e movimento reduzido. O idioma inicial foi inglês mesmo com navegador, URL e armazenamento configurados para português.

Nos carregamentos normais, a amostragem registrou 117–118 frames visíveis do símbolo e variação perceptível de escala/rotação. Com recursos lentos, houve 167–168 frames visíveis e a fase de espera manteve a respiração. Com movimento reduzido, escala e rotação permaneceram constantes. Cada carregamento teve uma única passagem ao estado de saída, removeu o overlay e liberou o scroll. A navegação entre seções não recriou o preloader.

O teste do footer manteve o ponteiro parado, amostrou cinco momentos distintos, verificou mudanças de cor e confirmou que as posições e dimensões das letras não mudaram. As cores ficaram estáveis enquanto a palavra esteve fora da viewport e voltaram a mudar no retorno. Os reveals de seção também foram verificados na entrada, reset fora da tela e reapresentação ao voltar.

O teste de teclado verificou setas e foco no seletor da hero, abrir/fechar/reabrir o menu rapidamente, ciclo de Tab/Shift+Tab, Escape e retorno do foco. No mobile, a seleção de VERA pela lista atualizou o estado ativo e seu CTA retornou à hero com VERA selecionada, preservando o português escolhido manualmente.

## Pendências e limites

Não ficaram falhas funcionais reproduzidas nos cenários executados. A validação de navegador foi feita em Chromium com viewports emulados; Safari, Firefox e aparelhos físicos não foram testados. Os recarregamentos automatizados reproduzem a navegação completa, sem afirmar acionamento físico das teclas F5/Ctrl+R.

O build emitiu um aviso de ambiente sobre um `package-lock.json` fora do repositório, sem impedir a compilação. As falhas de rede dos testes de resiliência foram provocadas deliberadamente e separadas de erros inesperados. Nenhum commit ou push foi realizado.

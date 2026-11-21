**PULPA — correção da proporção da navbar e da troca de idioma**

Validação realizada em 19/11/2026, com Chromium via Playwright, sem adicionar dependências ao projeto.

| Arquivo alterado | Correção |
| --- | --- |
| `public/images/brand/pulpa-logo-horizontal.svg` | Imagem única com o símbolo oficial e o wordmark convertido em contornos vetoriais. |
| `src/components/ui/Logo.tsx` | Adiciona `NavbarLogo`, que apresenta a imagem única e preserva a logo existente do footer. |
| `src/components/layout/Navbar.tsx` | Usa `NavbarLogo` no link de retorno à hero. |
| `src/app/globals.css` | Dimensiona a imagem inteira proporcionalmente e mantém a mudança de cor sobre seções escuras. |
| `src/components/sections/Hero.tsx` | Define explicitamente o estado inicial dos cards na animação de saída pelo scroll. |
| `src/components/providers/LanguageProvider.tsx` | Centraliza o recálculo após a tradução e preserva o progresso das cenas fixadas. |
| `src/hooks/useScrollReveals.ts` | Retira o recálculo global executado durante a reconstrução de cada seção. |
| `docs/LOGO_LANGUAGE_FIX_REPORT.md` | Registra a causa, as alterações e os resultados. |

A navbar agora usa uma única imagem, `pulpa-logo-horizontal.svg`, com composição fixa em um `viewBox` de 150 × 36. O símbolo e o texto não são mais elementos separados no layout. Os cinco caminhos do abacaxi oficial foram copiados sem alterações, aplicando somente translação e escala uniforme, sem rotação. As letras foram extraídas da mesma fonte Syne, peso 800, com o kerning e o espaçamento existentes, e convertidas em contornos. Seu tamanho visual original foi mantido: a composição usa a escala correspondente a 20,8px da fonte, sem aumentar o texto.

O centro visual do corpo da fruta está alinhado ao centro dos contornos das letras; a coroa fica acima. Esse alinhamento e a proporção estão definidos dentro do próprio SVG. Em tamanho padrão, o símbolo mede aproximadamente 20,88 × 33,28px e o intervalo visual até as letras é de 8px. A imagem inteira é redimensionada em conjunto para telas estreitas. Uma máscara CSS permite que a imagem acompanhe a cor original da navbar sem criar versões diferentes do arquivo. O footer continua usando sua composição e animação originais.

| Largura da tela | Imagem completa na navbar (largura × altura) |
| --- | --- |
| 320px | 121,14 × 29,06px |
| 375px | 150 × 36px |
| 390px | 150 × 36px |
| 768px | 150 × 36px |
| 1024px | 150 × 36px |
| 1440px | 150 × 36px |

Nos seis tamanhos, a imagem cabe na área de 48px da navbar e não há overflow horizontal. A renderização foi conferida em fundos claros e escuros, antes e depois da troca de idioma, no build de produção e no preview de desenvolvimento. A navbar possui apenas um elemento visual para a imagem, sem filhos separados para símbolo e texto e sem transformações CSS.

A causa do desaparecimento era uma corrida entre a entrada da hero e sua animação de saída pelo scroll. As duas controlavam `y` e `autoAlpha` dos mesmos cards. Se a primeira rolagem ocorresse logo após o preloader liberar a página, a animação de saída criada com `.to()` capturava os cards ainda em `opacity: 0`, `visibility: hidden` e `y: 40`. Ao retornar à hero, restaurava esses valores. A troca de idioma e seus recálculos não corrigiam o estado inicial já capturado. Esperar a entrada terminar antes de rolar podia ocultar o problema.

Essa condição foi reproduzida no navegador: liberar o preloader, rolar enquanto os cards ainda estavam ocultos, chegar ao footer, traduzir e retornar. Antes da correção, ambos permaneciam com opacidade zero. Depois, voltaram com opacidade 1, visibilidade normal e `y: 0`.

A saída agora usa `.fromTo()` com origem explícita `{ y: 0, autoAlpha: 1 }` e `immediateRender: false`. Assim, preserva a entrada original e não captura seus valores intermediários. Nenhuma animação foi removida e os cards continuam desaparecendo gradualmente na saída da hero.

Também havia cinco chamadas globais de refresh por troca: quatro nos hooks de revelação e uma no provider. A chamada do provider agora é a única associada à tradução, executada no próximo frame, após os cleanups, a renderização React e a recriação dos textos com SplitText. A posição relativa da seção é restaurada; na coleção horizontal e em The Experience, preserva-se o progresso dentro da distância de scroll fixada. `ScrollTrigger.update()` sincroniza a posição restaurada. Os recálculos já existentes para fontes e fim do preloader foram mantidos.

| Validação | Resultado |
| --- | --- |
| `npm run lint` | Aprovado. |
| `npm run typecheck` | Aprovado. |
| `npm run build` | Aprovado; página gerada estaticamente. |
| Cenário A: EN → footer → PT → hero | Aprovado em desktop 1440×900 e mobile 390×844. Cards, textos, frasco e frutas visíveis ao retornar. |
| Cenário B: PT → coleção → EN → continuar navegando | Aprovado nos dois formatos. Quatro painéis percorridos; navegação horizontal e alinhamento preservados no desktop, revelação dos frascos preservada no mobile. |
| Cenário C: EN → PT → EN → PT e rolagem nos dois sentidos | Aprovado nos dois formatos. |
| Cenário D: traduzir nas diferentes seções e revisitar as anteriores | Aprovado nos dois formatos, incluindo hero, coleção, frutas, filosofia, Experience, CTA e footer. |
| Revelações e reentrada | 33 verificações concluídas por formato, totalizando 66, incluindo nova visita à filosofia. |
| Seletores da hero | Seleção de fragrância preservada após tradução; navegação por teclado funcionando. |
| Ciclo de vida GSAP | Contagem estável: 91 ScrollTriggers no desktop e 85 no mobile, sem alvos desconectados após 13 trocas por formato. |
| Recálculo durante tradução | Exatamente um refresh por troca nos cenários A–D. |
| Três trocas no mesmo frame | Aprovado: um refresh, mesmo progresso de 60% na coleção e mesma contagem de triggers. |
| Experience e frutas | Frasco, frutas e capítulo ativo presentes após tradução; as quatro máscaras das frutas abrem ao revisitar. |
| Footer animado | Ciclo de cores continua funcionando após a troca de idioma. |
| Movimento reduzido | Footer → PT → hero aprovado em 390px e 1440px. |
| Clique no seletor | Clique real no botão EN traduz o build de produção normalmente. |
| Console do build de produção | Nenhum erro JavaScript, de hidratação ou GSAP observado. |
| Logo | Imagem única, proporção fixa, alinhamento e ausência de overflow verificados em 320, 375, 390, 768, 1024 e 1440px. |

O primeiro build encontrou a restrição de sockets do sandbox no processamento de CSS do Turbopack. O build passou com a permissão local necessária e a renovação do cache que havia registrado essa falha, sem alterar a configuração do projeto.

Os testes usaram o Chromium já instalado e scripts temporários em `/tmp/pulpa-qa`. A validação também executou os cenários no build de produção em uma porta separada. Os ativos originais, caminhos do símbolo oficial, textos, preloader, footer e coreografias horizontais não foram modificados. A nova imagem composta é um arquivo adicional. Nenhum commit ou push foi realizado.

Após substituir a composição por uma imagem única, ESLint, TypeScript e build de produção passaram novamente. Foi validado que o SVG é XML válido, contém exatamente os cinco caminhos originais do símbolo e não depende de elementos de texto ou de fontes carregadas no navegador. O cache de CSS do preview foi renovado e o servidor foi reiniciado na porta 3000. Preview e build exibem a mesma imagem nos seis tamanhos de tela, preservam o clique de retorno à hero, a troca de idioma e a cor clara sobre The Experience. Nenhum erro JavaScript foi observado nessa verificação.

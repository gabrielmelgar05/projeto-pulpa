# PULPA — refinamento de UX e idiomas

Entrega de 18/11/2026.

## Regra de idioma

**Toda abertura começa em inglês.** A instrução expressa do usuário tem prioridade sobre a sugestão do anexo de restaurar a preferência entre visitas.

O seletor EN / PT fica no header, inclusive no celular. A troca usa contexto React e dicionários tipados, sem recarregar a página ou alterar a URL. A seção atual e o perfume selecionado são preservados; o atributo `html.lang`, os textos acessíveis, o título e a descrição do documento acompanham a escolha.

Português vale para a página aberta. Não existe leitura automática de localStorage, sessionStorage, cookies, parâmetros de URL ou idioma do navegador. Recarregar ou abrir novamente retorna ao inglês. Uma página restaurada pelo cache de navegação também volta ao inglês pelo evento `pageshow`.

## Entrada, interação e movimento

- O preloader mostra somente o símbolo oficial, centralizado, sobre as quatro cores da marca. Wordmark, tagline e contador visual foram removidos.
- A leitura das fontes e a decodificação das imagens da abertura começam junto com a animação. A antiga espera sequencial após a animação foi eliminada.
- A limpeza do efeito cancela a execução anterior, incluindo na montagem dupla do Strict Mode. A entrega para a hero ocorre durante a saída das cortinas, com limite de espera e proteção para liberar a página.
- As revelações voltam a executar ao reentrar pela parte superior ou inferior da viewport. O reset acontece depois que a seção inteira sai da tela; as cenas ligadas ao scroll continuam com sua própria semântica.
- Os elementos que usam SplitText recebem nós próprios por idioma. Isso permite limpar a animação anterior sem sobrescrever a tradução nova.
- As transições dos perfumes, o carrossel e suas contagens funcionais foram preservados. Os controles usam os SVGs de frutas existentes, sem círculos simples como único indicador nem emojis.
- As letras do grande PULPA no footer começam em Warm Ivory e ganham cores da coleção em ordens embaralhadas, com sobreposições suaves e pausas. A animação pausa fora da viewport e permanece estática em movimento reduzido.
- Listeners, timelines e matchMedia recebem limpeza. Mudanças de preferência de movimento durante a visita preservam a fragrância ativa.
- O menu mobile tem textos traduzidos, fechamento por Escape, retorno do foco e controle do ciclo de Tab.

## Identidade e composição

- A palavra PULPA aparece sem o ponto no header, footer, texto, marca vetorial, badges e acessibilidade.
- Os 24 arquivos de fotografia foram preservados byte a byte. Nos quatro packshots e na fotografia editorial, uma pequena composição SVG usa a textura adjacente do próprio vidro para ocultar somente o antigo ponto impresso. O frasco, o símbolo e os arquivos originais não foram redesenhados.
- Foram removidos os componentes de etiquetas editoriais, os rótulos Contemporary / Collection 01, os índices das listas e as numerações decorativas dos painéis. Nomes, notas, descrições e indicadores funcionais continuam disponíveis.
- A seção de filosofia mantém título, conteúdo, imagens e estrutura editorial, com uma base clara e detalhes equilibrados em amarelo, vermelho, laranja e verde.
- O viewBox da onda foi ampliado e o traço se estende além das bordas, eliminando o corte inferior e as terminações retas visíveis. Blobs e sparkles receberam margens de desenho adequadas; o recorte dos containers foi mantido de forma localizada.
- As escalas dos títulos foram ajustadas para caber em inglês e português, incluindo 320 px e 1920 px.
- Em movimento reduzido, os quatro painéis da coleção são verticais também no desktop. No mobile, a experiência organiza o frasco e os três capítulos no fluxo da página, com todas as descrições visíveis e sem sobreposição.
- O favicon principal é o símbolo branco transparente. Há uma variante com fundo escuro para abas claras.

## Arquivos

| Área | Arquivos |
| --- | --- |
| Idiomas | `src/i18n/messages.ts`, `src/components/providers/LanguageProvider.tsx`, `src/components/providers/SiteProviders.tsx`, `src/components/ui/LanguageSelector.tsx` |
| Layout e navegação | `src/components/layout/Navbar.tsx`, `MobileMenu.tsx`, `Preloader.tsx`, `Footer.tsx` |
| Seções | `src/components/sections/Hero.tsx`, `Collection.tsx`, `Marquee.tsx`, `FruitUniverse.tsx`, `Philosophy.tsx`, `Experience.tsx`, `FinalCta.tsx` |
| Marca, imagens e decoração | `src/components/ui/Logo.tsx`, `RotatingBadge.tsx`, `BottleArt.tsx`, `ImageSlot.tsx`, `BrandLabel.tsx`, `Decor.tsx`, `Button.tsx` |
| Etiquetas removidas | `src/components/ui/Eyebrow.tsx` |
| Movimento | `src/hooks/useScrollReveals.ts`, `src/lib/gsap.ts` |
| Dados e estilos | `src/data/site.ts`, `src/data/assets.ts`, `src/app/globals.css` |
| Documento e favicon | `src/app/layout.tsx`, `src/app/icon.svg`, `public/images/brand/pulpa-icon-dark.svg` |
| Documentação | `README.md`, `docs/IMAGE_GENERATION_GUIDE.md`, este relatório |

Os caminhos e o desenho do símbolo oficial, os SVGs das frutas, as fotografias, as fontes, as dependências e a configuração Git foram mantidos. Nenhum commit ou push foi realizado.

## Verificação

- `npm run lint`: passou, sem avisos do ESLint.
- `npm run typecheck`: passou.
- `npm run build`: passou; página principal e favicon gerados.
- `npm run assets:check`: 24/24 imagens presentes.
- Conferência SHA-256 contra o manifesto das imagens: 24/24 originais preservados.
- Chromium: 320, 375, 390, 768, 1024, 1440 e 1920 px nos dois idiomas — 14 cenários, sem overflow horizontal, títulos excedentes, placeholders ou imagens quebradas.
- Abertura em inglês testada com navegador, URL e armazenamento configurados para português; recarregamento após PT volta a EN.
- Restauração de página: tratamento de `pageshow` persistido verificado por evento simulado.
- Seletor sem recarregamento, preservação da seção e da fragrância, menu mobile e Escape, transições de perfumes e troca de preferência de movimento: passaram.
- Setas do seletor com transferência de foco, ciclo de Tab do menu e abertura/fechamento/reabertura rápidos: passaram. A timeline anterior é cancelada a cada mudança do menu.
- O HTML gerado pelo build foi conferido e contém `lang="en"` como estado inicial.
- Preloader: uma saída, sem reaparecimento ao navegar por scroll.
- Revelação: entrada, reset fora da tela e nova execução ao voltar pelo scroll verificados.
- Footer: cores individuais e pausa fora da viewport verificadas.
- Telas baixas adicionais: 320×568, 390×844 e 768×1024 sem sobreposição entre frasco e capítulos no modo estático; painel de perfume revisado em 1024×768.
- Nenhum erro de execução, erro de console ou resposta HTTP de falha registrado no teste final.

O cache de CSS antigo da prévia local foi preservado separadamente e recompilado. O site atualizado está disponível em `http://localhost:3000`. Não restou bloqueio funcional conhecido nas verificações executadas.

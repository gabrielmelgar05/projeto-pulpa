import type { AssetId, Fragrance, FragranceId } from "@/types";

export type Locale = "en" | "pt-BR";

const en = {
  nav: { home: "Home", fragrances: "Fragrances", story: "Our Story", experience: "The Experience" },
  ui: {
    explore: "Explore Collection", exploreAll: "Explore the collection", discover: "Discover", spotlight: "Spotlight",
    backToSpotlight: "Back to the spotlight", backToTop: "Back to top", chooseFruit: "Choose your fruit",
    scroll: "Scroll", openMenu: "Open menu", closeMenu: "Close menu", primary: "Primary navigation",
    mobile: "Mobile navigation", siteMenu: "Site menu", footer: "Footer navigation", personality: "Personality",
    language: "Language", loading: "Loading PULPA Parfums", navigate: "Navigate", follow: "Follow", credits: "Credits",
    concept: "Concept & Website by", disclaimer: "A fictional brand concept — no products are sold.",
    top: "Top", heart: "Heart", base: "Base", bottle: "eau de parfum bottle",
  },
  tagline: "Wear your wild side.",
  description: "PULPA is a contemporary fruit-inspired perfumery. Four bold eaux de parfum — SOLA, RUBRA, MAREA and VERA — that turn fruit into expressive, sensory scents.",
  hero: { lead: "Wear your", left: "Wild", right: "side." },
  collection: { first: "Four fruits.", second: "Four moods.", text: "One wild side. Every PULPA eau de parfum is built around a single hero fruit — then pushed somewhere unexpected, sensual and loud." },
  marquee: ["Fruit-fueled fragrances", "Wear your wild side"],
  universe: {
    text: "Every PULPA scent starts with real fruit — then we play with it until it surprises us.",
    lines: ["Straight from", "nature.", "Far from", "ordinary."],
    specimens: ["The sun’s favourite fruit. Bright, fizzy, golden.", "Glossy, crushed, a little dangerous.", "Warm flesh, black pearls, golden hour.", "Cold, crisp and full of surprises."],
    facts: ["hero fruit at the heart of every scent", "moods — sunny, intense, warm, crisp", "rules followed along the way"],
  },
  philosophy: {
    title: "We don’t follow the rules of fragrance.",
    paragraphs: ["Perfumery has spent centuries being polite. PULPA is the opposite: we take ingredients you could bite into — pineapple, raspberry, papaya, green apple — and turn them into scents with real personality.", "Every formula starts with a fruit accord at full volume, then gets a twist: pink pepper on pineapple, sea salt on papaya, mint on apple. Familiar enough to crave. Strange enough to remember."],
    principles: [
      { title: "Fruit first", text: "Each scent is built around one hero fruit, treated like a lead singer — never a background note." },
      { title: "Bold by design", text: "We overdose the juicy accords other houses play safe with, then balance them with warm, skin-like bases." },
      { title: "Made to be worn loud", text: "Fragrance is a mood you put on. Layer them, swap them, wear SOLA on a rainy Monday if you feel like it." },
    ],
    badge: "WEAR YOUR WILD SIDE • PULPA PARFUMS • ",
  },
  experience: {
    first: "A scent you", second: "can almost taste.", featuring: "Featuring RUBRA — Red Berries",
    chapters: [
      { title: "The first bite", text: "Crushed raspberry and pink pepper burst open — sharp, juicy, electric." },
      { title: "The heat", text: "Red currant melts into wild rose. Sweet, but never innocent." },
      { title: "The afterglow", text: "Vanilla and soft musk linger on skin for hours, like a secret." },
    ],
  },
  cta: { first: "Find your", second: "fruity side.", text: "Four fruits, four moods. Pick the one that matches yours tonight — or wear them all, one wild side at a time." },
  footer: "Fruit-inspired perfumery. Four eaux de parfum — SOLA, RUBRA, MAREA and VERA.",
};

export type Messages = typeof en;

const pt: Messages = {
  nav: { home: "Início", fragrances: "Fragrâncias", story: "Nossa História", experience: "A Experiência" },
  ui: {
    explore: "Explore a coleção", exploreAll: "Explore a coleção", discover: "Conheça", spotlight: "Em destaque:",
    backToSpotlight: "Voltar ao destaque", backToTop: "Voltar ao início", chooseFruit: "Escolha sua fruta",
    scroll: "Explore", openMenu: "Abrir menu", closeMenu: "Fechar menu", primary: "Navegação principal",
    mobile: "Navegação mobile", siteMenu: "Menu do site", footer: "Navegação do rodapé", personality: "Personalidade",
    language: "Idioma", loading: "Carregando PULPA Parfums", navigate: "Navegue", follow: "Acompanhe", credits: "Créditos",
    concept: "Conceito e site por", disclaimer: "Uma marca fictícia — nenhum produto é vendido.",
    top: "Saída", heart: "Coração", base: "Fundo", bottle: "frasco de eau de parfum",
  },
  tagline: "Vista seu lado livre.",
  description: "PULPA é uma perfumaria inspirada em frutas. Quatro eaux de parfum marcantes — SOLA, RUBRA, MAREA e VERA — que transformam frutas em fragrâncias expressivas e sensoriais.",
  hero: { lead: "Vista seu", left: "lado", right: "livre." },
  collection: { first: "Quatro frutas.", second: "Quatro jeitos.", text: "Um lado livre. Cada eau de parfum PULPA nasce de uma fruta protagonista — e vai além do esperado, com presença, sensualidade e personalidade." },
  marquee: ["Fragrâncias movidas a frutas", "Vista seu lado livre"],
  universe: {
    text: "Toda fragrância PULPA começa com uma fruta de verdade — e ganha um toque que surpreende.",
    lines: ["Direto da", "natureza.", "Longe do", "comum."],
    specimens: ["A fruta favorita do sol. Radiante, vibrante, dourada.", "Brilhantes, amassadas, um pouco perigosas.", "Polpa quente, pérolas negras, luz de fim de tarde.", "Gelada, crocante e cheia de surpresas."],
    facts: ["fruta protagonista no coração de cada fragrância", "sensações — solar, intensa, quente, fresca", "regras seguidas pelo caminho"],
  },
  philosophy: {
    title: "Não seguimos as regras da perfumaria.",
    paragraphs: ["A perfumaria passou séculos sendo comportada. A PULPA faz o contrário: escolhemos ingredientes que dão vontade de morder — abacaxi, framboesa, mamão, maçã verde — e criamos fragrâncias com personalidade de verdade.", "Cada fórmula começa com um acorde frutal em volume máximo e ganha um toque inesperado: pimenta rosa no abacaxi, sal marinho no mamão, hortelã na maçã. Familiar para despertar desejo. Diferente para ficar na memória."],
    principles: [
      { title: "A fruta vem primeiro", text: "Cada fragrância tem uma fruta protagonista, tratada como estrela principal — nunca como coadjuvante." },
      { title: "Ousadia por natureza", text: "Intensificamos os acordes suculentos e equilibramos tudo com fundos quentes, que se misturam à pele." },
      { title: "Feita para marcar presença", text: "Perfume é um estado de espírito. Misture, alterne, use SOLA numa segunda chuvosa se der vontade." },
    ],
    badge: "VISTA SEU LADO LIVRE • PULPA PARFUMS • ",
  },
  experience: {
    first: "Um perfume", second: "quase de provar.", featuring: "Com RUBRA — Frutas vermelhas",
    chapters: [
      { title: "A primeira mordida", text: "Framboesa amassada e pimenta rosa se revelam — intensas, suculentas, elétricas." },
      { title: "O calor", text: "Groselha vermelha encontra a rosa silvestre. Doce, mas nada inocente." },
      { title: "O que fica", text: "Baunilha e almíscar suave permanecem na pele por horas, como um segredo." },
    ],
  },
  cta: { first: "Encontre seu", second: "lado frutal.", text: "Quatro frutas, quatro sensações. Escolha a que combina com você esta noite — ou experimente todas, um lado livre de cada vez." },
  footer: "Perfumaria inspirada em frutas. Quatro eaux de parfum — SOLA, RUBRA, MAREA e VERA.",
};

export const MESSAGES: Record<Locale, Messages> = { en, "pt-BR": pt };

type FragranceCopy = Pick<Fragrance, "fruit" | "mood" | "personality" | "tagline" | "description" | "notes">;
export const PT_FRAGRANCES: Record<FragranceId, FragranceCopy> = {
  sola: {
    fruit: "Abacaxi", mood: "Solar e vibrante", personality: ["Vibrante", "Solar", "Energética", "Ousada"], tagline: "Luz do sol para vestir.",
    description: "Abacaxi dourado aberto sob o sol do meio-dia. Radiante, efervescente e impossível de ignorar — SOLA é pura energia na pele.",
    notes: { top: ["Abacaxi", "Bergamota", "Pimenta rosa"], heart: ["Água de coco", "Néroli"], base: ["Ambreta", "Madeiras aquecidas pelo sol"] },
  },
  rubra: {
    fruit: "Frutas vermelhas", mood: "Intensa e magnética", personality: ["Intensa", "Apaixonante", "Doce", "Expressiva"], tagline: "Frutas amassadas, coração acelerado.",
    description: "Um punhado de framboesas amassadas entre os dedos. Suculenta, profunda e um pouco perigosa — RUBRA é o perfume de uma paixão.",
    notes: { top: ["Framboesa", "Groselha vermelha", "Pimenta rosa"], heart: ["Rosa silvestre", "Folha de amora"], base: ["Absoluto de baunilha", "Almíscar suave"] },
  },
  marea: {
    fruit: "Mamão", mood: "Quente e sensual", personality: ["Tropical", "Quente", "Espontânea", "Sensual"], tagline: "O fim de tarde em um frasco.",
    description: "Mamão fatiado, sal na pele e um pôr do sol que não quer acabar. MAREA é calma, quente e deliciosamente espontânea.",
    notes: { top: ["Mamão", "Mandarina", "Sal marinho"], heart: ["Frangipani", "Damasco"], base: ["Fava tonka", "Madeira à deriva"] },
  },
  vera: {
    fruit: "Maçã verde", mood: "Fresca e inesperada", personality: ["Fresca", "Inesperada", "Leve", "Moderna"], tagline: "A primeira mordida, para sempre.",
    description: "Aquela mordida gelada e crocante de uma maçã verde — e depois uma surpresa. VERA é fresca, leve e discretamente rebelde.",
    notes: { top: ["Maçã verde", "Raspas de limão", "Hortelã"], heart: ["Folha de figueira", "Chá branco"], base: ["Vetiver", "Almíscar limpo"] },
  },
};

export const PT_ASSET_ALT: Partial<Record<AssetId, string>> = {
  "fruit-cutout-pineapple": "Abacaxi fresco com coroa verde", "fruit-cutout-berries": "Framboesas maduras",
  "fruit-cutout-papaya": "Mamão cortado ao meio com sementes negras", "fruit-cutout-apple": "Maçã verde fresca com uma folha",
  "fruit-universe-pineapple": "Macro da casca e da polpa dourada do abacaxi", "fruit-universe-berries": "Macro de framboesas suculentas",
  "fruit-universe-papaya": "Macro da polpa e das sementes do mamão", "fruit-universe-apple": "Macro de maçã verde com gotas de água",
  "philosophy-editorial": "Uma mão segura um perfume PULPA entre frutas tropicais cortadas", "philosophy-detail": "Detalhe de gotas de suco sobre o vidro de um perfume",
};

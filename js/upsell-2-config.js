/* ==========================================================================
   CONFIGURAÇÃO CENTRALIZADA DA PÁGINA DE UPSELL 2 (VERSÃO DIRETA & ENXUTA)
   ========================================================================== */

const upsellConfig = {
  // Informações do Produto
  product: {
    badge: "✦ EXPANSÃO EXCLUSIVA DE REPERTÓRIO",
    name: "REPERTÓRIO SUPREMO",
    subheadline: "Um conteúdo prático desenvolvido para ampliar suas opções e trazer mais variedade para a intimidade do casal.",
    priceRegular: "R$ 197",
    priceCurrent: "R$ 97",
    installmentsText: "ou 12x de R$ 9,74",
    checkoutUrl: "#checkout",
    declineUrl: "#decline"
  },

  // Hero / Abertura
  hero: {
    contextTag: "Você já deu o primeiro passo...",
    headline: "O PROBLEMA NÃO É SABER O QUE FAZER.<br><span class='highlight-gold'>É ACABAR FAZENDO SEMPRE AS MESMAS COISAS.</span>",
    subheadline: "Você já adquiriu os fundamentos. Agora imagine ter um catálogo completo de possibilidades para variar sempre que quiser e manter a intimidade longe da rotina."
  },

  // Conceito: Mais Repertório = Mais Variedade
  concept: {
    tag: "✦ CONCEITO CENTRAL",
    title: "Mais Repertório = Mais Variedade",
    subtitle: "O segredo para a intimidade não esfriar não é mudar quem você é, mas sim ter mais opções para alternar.",
    cards: [
      {
        step: "01",
        title: "Sua Base Atual",
        desc: "Você já possui os aprendizados e técnicas essenciais do primeiro produto."
      },
      {
        step: "02",
        title: "+ Variedade de Opções",
        desc: "Adicione mais de 50 novas possibilidades, abordagens e novidades práticas."
      },
      {
        step: "03",
        title: "= Liberdade Total",
        desc: "Alterne ideias conforme o momento e nunca mais caia no automático."
      }
    ],
    quote: "<span>\"Você não precisa substituir o que já aprendeu. Você simplesmente passa a ter mais opções.\"</span>"
  },

  // Conteúdo em Cards (4 Pilares)
  repertoire: {
    tag: "✦ CONTEÚDO EXCLUSIVO",
    title: "O Que Você Encontrará no Guia",
    subtitle: "Módulos práticos de rápida consulta para surpreender a qualquer momento.",
    cards: [
      {
        num: "01",
        title: "Novas Possibilidades",
        desc: "Estímulos inéditos e abordagens para quebrar o padrão e surpreender."
      },
      {
        num: "02",
        title: "Variação Prática",
        desc: "Técnicas simples para não depender sempre dos mesmos roteiros."
      },
      {
        num: "03",
        title: "Espontaneidade",
        desc: "Ideias prontas para se adaptar a diferentes momentos do casal."
      },
      {
        num: "04",
        title: "Catálogo de Repertório",
        desc: "Uma biblioteca completa de conhecimentos para consultar quando desejar."
      }
    ]
  },

  // Quebra de Objeções Direta (3 perguntas)
  objections: {
    tag: "✦ ESCLARECIMENTOS",
    title: "Dúvidas Frequentes",
    items: [
      {
        q: "Já comprei o primeiro produto. Preciso realmente deste?",
        a: "Não é para substituir. O primeiro produto é sua base sólida; o Repertório Supremo existe para multiplicar suas opções e evitar a rotina."
      },
      {
        q: "É apenas mais do mesmo?",
        a: "Não. É um conteúdo totalmente inédito focado em trazer variedade, novas técnicas e surpresas que não foram abordadas anteriormente."
      },
      {
        q: "É complicado de aplicar?",
        a: "Não. Tudo é direto ao ponto, simples de ler e fácil de colocar em prática no seu ritmo."
      }
    ]
  },

  // Oferta Premium
  offer: {
    headline: "VOCÊ JÁ TEM A BASE.<br><span class='section-headline-gold'>AGORA PODE AMPLIAR SEU REPERTÓRIO.</span>",
    benefits: [
      "Acesso imediato ao Guia Digital Repertório Supremo",
      "Mais de 50 variações práticas e inéditas de repertório",
      "Leitor Digital VIP e PDF para download imediato",
      "Acesso vitalício sem mensalidades",
      "Garantia Incondicional de Satisfação de 7 dias"
    ],
    ctaText: "SIM, QUERO AMPLIAR MEU REPERTÓRIO",
    declineText: "Não, obrigado. Prefiro continuar apenas com o conteúdo que já adquiri."
  },

  // FAQ Accordion
  faq: {
    tag: "✦ FAQ",
    title: "Perguntas Frequentes",
    items: [
      {
        q: "Isso substitui o produto que acabei de comprar?",
        a: "Não. O conteúdo foi pensado exclusivamente para complementar sua compra anterior e ampliar suas possibilidades."
      },
      {
        q: "Como recebo o acesso?",
        a: "O acesso é liberado imediatamente na sua Área de Membros VIP após a confirmação."
      },
      {
        q: "Tenho garantia?",
        a: "Sim. Você possui 7 dias de garantia incondicional de satisfação."
      }
    ]
  }
};

if (typeof window !== 'undefined') {
  window.upsellConfig = upsellConfig;
}

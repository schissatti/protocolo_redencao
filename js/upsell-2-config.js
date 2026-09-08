/* ==========================================================================
   CONFIGURAÇÃO CENTRALIZADA DA PÁGINA DE UPSELL 2
   Edite aqui facilmente todos os textos, preços, ofertas e links da página.
   ========================================================================== */

const upsellConfig = {
  // Informações do Produto
  product: {
    badge: "✦ CONTEÚDO EXCLUSIVO DE EXPANSÃO",
    name: "REPERTÓRIO SUPREMO",
    subheadline: "Um conteúdo criado para ampliar seu repertório e trazer mais variedade para a intimidade do casal.",
    priceRegular: "R$ 197",
    priceCurrent: "R$ 97",
    installmentsText: "ou 12x de R$ 9,74",
    checkoutUrl: "#checkout",
    declineUrl: "#decline"
  },

  // Seção 1 — Hero / Abertura
  hero: {
    contextTag: "Você já deu o primeiro passo...",
    headline: "O PROBLEMA NÃO É SABER O QUE FAZER.<br><span class='highlight-gold'>É ACABAR FAZENDO SEMPRE AS MESMAS COISAS.</span>",
    subheadline: "Você já tem uma base sólida. Agora imagine ter muito mais possibilidades para variar e manter a intimidade do casal longe da rotina."
  },

  // Seção 2 — Reconhecimento da Dor (4 Cards)
  pain: {
    tag: "✦ DINÂMICA DA INTIMIDADE",
    title: "Como o 'Automático' Acontece Naturalmente",
    subtitle: "No começo tudo é descoberta. Mas com o tempo, é fácil voltar para o que você já conhece. E quando as possibilidades diminuem, a intimidade fica previsível.",
    cards: [
      {
        step: "01",
        title: "Poucas Opções",
        description: "Você conta apenas com um conjunto limitado de ideias e momentos conhecidos."
      },
      {
        step: "02",
        title: "Repetição",
        description: "Sem perceber, os mesmos roteiros passam a ser repetidos com frequência."
      },
      {
        step: "03",
        title: "Previsibilidade",
        description: "O parceiro já sabe exatamente o que vai acontecer e como vai terminar."
      },
      {
        step: "04",
        title: "Mesmice",
        description: "A intimidade perde o fator surpresa e entra na zona de conforto."
      }
    ],
    note: "Isso acontece naturalmente em qualquer relacionamento. A solução não é mudar quem você é, mas ampliar suas opções."
  },

  // Seção 3 — A Nova Oportunidade (Fluxo de Comparação)
  opportunity: {
    tag: "✦ A LÓGICA DA VARIEDADE",
    title: "Mais Repertório = Mais Variedade",
    subtitle: "O problema não é falta de interesse ou química. Muitas vezes é apenas falta de opções para alternar no dia a dia.",
    step1: {
      tag: "O QUE VOCÊ JÁ TEM",
      title: "Uma Base de Técnicas e Conhecimentos",
      desc: "Você já adquiriu o aprendizado inicial e domina os fundamentos essenciais."
    },
    step2: {
      tag: "O QUE VOCÊ PODE ADICIONAR",
      title: "Um Repertório Maior de Possibilidades",
      desc: "Um catálogo completo de variações, abordagens e novidades para escolher a qualquer momento."
    },
    step3: {
      tag: "O RESULTADO NA PRÁTICA",
      title: "Liberdade para Nunca Depender da Mesma Opção",
      desc: "Uma experiência rica e espontânea, onde cada encontro traz uma energia renovada."
    }
  },

  // Seção 5 — O Que Você Vai Encontrar (5 Cards Premium)
  contents: {
    tag: "✦ CONTEÚDO EXCLUSIVO",
    title: "O Que Você Vai Encontrar Neste Guia",
    subtitle: "Estruturado em módulos práticos e objetivos para consulta rápida sempre que quiser surpreender.",
    cards: [
      {
        num: "01",
        title: "Novas Possibilidades",
        desc: "Descubra diferentes formas e estímulos para sair do automático e criar momentos memoráveis."
      },
      {
        num: "02",
        title: "Variação Prática",
        desc: "Amplie seu repertório de técnicas para nunca depender sempre das mesmas opções."
      },
      {
        num: "03",
        title: "Espontaneidade",
        desc: "Tenha um leque de possibilidades prontas para se adaptar a diferentes climas e intenções."
      },
      {
        num: "04",
        title: "Conexão Profunda",
        desc: "Entenda como tornar a experiência do casal visualmente, taticamente e emocionalmente mais envolvente."
      },
      {
        num: "05",
        title: "Catálogo de Repertório",
        desc: "Construa uma variedade maior de conhecimentos para consultar e escolher conforme o momento do casal."
      }
    ]
  },

  // Seção 6 — Mecanismo Visual (A Caixa de Ferramentas)
  mechanism: {
    tag: "✦ CONCEITO CENTRAL",
    title: "A Metáfora da Caixa de Ferramentas",
    beforeTitle: "ANTES (BASE LIMITADA)",
    beforeItems: [
      "⚠️ Depender das mesmas ideias",
      "⚠️ Clima previsível e repetitivo",
      "⚠️ Falta de alternativas no momento H"
    ],
    afterTitle: "DEPOIS (REPERTÓRIO COMPLETO)",
    afterItems: [
      "✨ Mais de 50 novas variações de repertório",
      "✨ Espontaneidade para qualquer ocasião",
      "✨ Domínio total sobre a variedade da intimidade"
    ],
    quote: "<span>\"Você não precisa substituir o que já aprendeu. Você simplesmente passa a ter mais opções.\"</span>"
  },

  // Seção 7 — Quebra de Objeções
  objections: {
    tag: "✦ ESCLARECIMENTOS",
    title: "Dúvidas Frequentes Sobre Esta Expansão",
    items: [
      {
        q: "Mas eu já comprei o primeiro conteúdo. Preciso realmente deste?",
        a: "Não é uma questão de substituir o que você adquiriu. O primeiro produto é sua base sólida. Este segundo conteúdo existe para complementar sua base e multiplicar suas opções."
      },
      {
        q: "Não quero mais do mesmo. É um conteúdo repetitivo?",
        a: "De forma alguma. O foco do Repertório Supremo é justamente apresentar abordagens inéditas e variações que não foram abordadas na etapa anterior."
      },
      {
        q: "Será que realmente vale a pena?",
        a: "Se você deseja evitar a rotina e ter sempre uma carta na manga para surpreender sem complicação, a variedade de repertório é o investimento mais inteligente."
      },
      {
        q: "Não quero nada complicado ou difícil de colocar em prática.",
        a: "Tudo é apresentado de forma direta, elegante e simples. Você pode aplicar o que desejar no seu próprio ritmo."
      }
    ]
  },

  // Seção 8 — Visualização do Benefício
  vision: {
    tag: "✦ VISÃO PRÁTICA",
    title: "Imagine Não Precisar Depender das Mesmas Ideias...",
    items: [
      "Em vez de repetir automaticamente aquilo que você já conhece, ter um acervo completo à sua disposição.",
      "Saber exatamente como criar um clima diferente para um final de semana especial ou para uma noite comum.",
      "Sentir a confiança de quem nunca fica sem alternativas ou surpresas.",
      "Manter o relacionamento em constante evolução com elegância e naturalidade."
    ]
  },

  // Seção 9 — Benefícios da Oferta
  offer: {
    title: "VOCÊ JÁ TEM A BASE.<br>AGORA PODE AMPLIAR SEU REPERTÓRIO.",
    benefits: [
      "Acesso imediato ao Guia Digital Repertório Supremo",
      "Mais de 50 variações práticas de estímulos e surpresas",
      "Formatos em Leitor Digital VIP e PDF para download",
      "Acesso vitalício sem mensalidades adicionais",
      "Garantia Incondicional de Satisfação de 7 dias"
    ],
    ctaText: "QUERO AMPLIAR MEU REPERTÓRIO"
  },

  // Seção 10 — Urgência Consciente
  decision: {
    tag: "✦ SUA DECISÃO CONSCIENTE",
    title: "Sua Oportunidade de Decisão",
    text: "Você já tomou a decisão inteligente de investir em melhorar sua intimidade. Agora, esta é a oportunidade única de adicionar a biblioteca completa de variações pela fração do valor normal antes de finalizar seu acesso."
  },

  // Seção 11 — FAQ Accordion
  faq: {
    tag: "✦ FAQ",
    title: "Perguntas Frequentes",
    items: [
      {
        q: "Isso substitui o produto que acabei de comprar?",
        a: "Não. O segundo conteúdo foi pensado para complementar o primeiro e ampliar seu repertório."
      },
      {
        q: "É apenas mais do mesmo?",
        a: "Não. A proposta é justamente adicionar variedade e novas possibilidades ao conhecimento que você já possui."
      },
      {
        q: "Preciso ter experiência para aproveitar o conteúdo?",
        a: "Não. O conteúdo é apresentado de forma totalmente acessível, prática e progressiva."
      },
      {
        q: "Posso adquirir depois?",
        a: "Esta oferta com valor promocional de expansão é oferecida exclusivamente nesta página de confirmação de pedido."
      },
      {
        q: "Como recebo o acesso?",
        a: "O acesso é liberado imediatamente na sua Área de Membros VIP assim que a confirmação for concluída."
      }
    ]
  },

  // Seção 12 — CTA Final
  final: {
    headline: "VOCÊ JÁ TEM A BASE.<br><span class='section-headline-gold'>AGORA, QUANTAS POSSIBILIDADES VOCÊ QUER TER?</span>",
    subheadline: "Amplie seu repertório e tenha mais opções para manter a intimidade do casal longe da mesmice.",
    ctaText: "SIM, QUERO AMPLIAR MEU REPERTÓRIO",
    declineText: "Não, obrigado. Prefiro continuar apenas com o conteúdo que já adquiri."
  }
};

// Export or make globally available
if (typeof window !== 'undefined') {
  window.upsellConfig = upsellConfig;
}

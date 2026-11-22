export interface PlanetData {
  id: string;
  index: number;
  code: string;
  name: string;
  orderLabel: string;
  inhabitant: string;
  accentHex: string;
  quote: string;
  philosophy: string;
  detailNote: string;
  ambientLabel: string;
}

export const PLANETS: PlanetData[] = [
  {
    id: 'b612',
    index: 0,
    code: 'B-612',
    name: 'Asteroide B-612',
    orderLabel: 'Origem',
    inhabitant: 'O Pequeno Príncipe e sua Rosa',
    accentHex: '#E57A77',
    quote: '“Foi o tempo que dedicaste à tua rosa que a fez tão importante.”',
    philosophy:
      'Do tamanho de uma casa, este pequeno astro ensina o valor do cuidado diário: desentupir os três vulcões pela manhã, arrancar os brotos de baobá antes que tomem conta do solo e zelar por uma flor vaidosa, porém única no mundo.',
    detailNote:
      'Uma questão de disciplina matinal: cuidar do próprio planeta é um ato silencioso de amor.',
    ambientLabel: 'Brisa espacial e suspiro da manhã',
  },
  {
    id: '325',
    index: 1,
    code: '325',
    name: 'Asteroide 325',
    orderLabel: '1º Planeta',
    inhabitant: 'O Rei',
    accentHex: '#D8A94E',
    quote: '“É preciso exigir de cada um o que cada um pode dar.”',
    philosophy:
      'Vestido com um manto de arminho que recobre quase todo o asteroide, o Rei acredita governar o universo inteiro. Para preservar sua ilusão de autoridade absoluta, ele só profere ordens razoáveis que obedecem ao curso natural das coisas.',
    detailNote:
      'Quando o poder não encontra súditos reais, resta mandar no que já aconteceria sozinho.',
    ambientLabel: 'Eco majestoso e vento cósmico grave',
  },
  {
    id: '326',
    index: 2,
    code: '326',
    name: 'Asteroide 326',
    orderLabel: '2º Planeta',
    inhabitant: 'O Homem Vaidoso',
    accentHex: '#C59CE0',
    quote: '“Os vaidosos só ouvem os elogios.”',
    philosophy:
      'Sozinho em seu pequeno mundo, ele usa um chapéu espalhafatoso apenas para poder tirá-lo em agradecimento quando o aclamam. Qualquer pergunta ou conversa que não seja admiração passa completamente despercebida por seus ouvidos.',
    detailNote:
      'Quem vive apenas para o aplauso transforma todo encontro em um espelho solitário.',
    ambientLabel: 'Brisa cintilante de palco solitário',
  },
  {
    id: '327',
    index: 3,
    code: '327',
    name: 'Asteroide 327',
    orderLabel: '3º Planeta',
    inhabitant: 'O Bêbado',
    accentHex: '#7395C9',
    quote: '“Bebo para esquecer que tenho vergonha de beber.”',
    philosophy:
      'Sentado em silêncio diante de uma coleção de garrafas vazias e cheias, o habitante deste asteroide habita um labirinto circular perfeito e melancólico: sua própria dor alimenta a fuga que renova a culpa.',
    detailNote:
      'Uma visita breve e silenciosa diante de um círculo lógico sem porta de saída.',
    ambientLabel: 'Vento noturno abafado e gotas lentas',
  },
  {
    id: '328',
    index: 4,
    code: '328',
    name: 'Asteroide 328',
    orderLabel: '4º Planeta',
    inhabitant: 'O Homem de Negócios',
    accentHex: '#E0B85C',
    quote: '“Eu sou um homem sério! Não me entretenho com futilidades!”',
    philosophy:
      'Mergulhado em somas intermináveis, ele anota a quantidade de estrelas no céu em um pedaço de papel e o guarda à chave numa gaveta. Possui milhões de astros no papel, embora nunca olhe para o céu nem faça bem algum a eles.',
    detailNote:
      'Ter um papel trancado não equivale a pertencer — nem a saber admirar o brilho de uma estrela.',
    ambientLabel: 'Tique-taque apressado de relógio',
  },
  {
    id: '329',
    index: 5,
    code: '329',
    name: 'Asteroide 329',
    orderLabel: '5º Planeta',
    inhabitant: 'O Acendedor de Lampiões',
    accentHex: '#F2B863',
    quote: '“A ordem é a ordem. Bom dia! Boa noite!”',
    philosophy:
      'O menor de todos os asteroides gira tão depressa que amanhece e anoitece a cada minuto. Exausto, o acendedor acende e apaga seu lampião sem descanso por fidelidade absoluta a uma regra antiga — o único adulto que não se ocupa apenas de si.',
    detailNote:
      'Seu trabalho guarda beleza porque acende uma estrela a mais no escuro, mesmo sem tempo para dormir.',
    ambientLabel: 'Compasso de minuto e brisa do lampião',
  },
  {
    id: '330',
    index: 6,
    code: '330',
    name: 'Asteroide 330',
    orderLabel: '6º Planeta',
    inhabitant: 'O Geógrafo',
    accentHex: '#7AB8A8',
    quote: '“Um geógrafo não sai contando cidades, rios ou montanhas. Ele é importante demais para passear.”',
    philosophy:
      'Cercado por livros gigantescos e tinteiros, ele cataloga oceanos e desertos ouvindo relatos alheios, sem jamais dar um passo fora de seu gabinete. Para sua ciência rígida, tudo que pode mudar — como uma flor — é efêmero e indigno de registro.',
    detailNote:
      'Foi aqui que o Pequeno Príncipe descobriu, com um aperto no peito, que sua rosa era efêmera.',
    ambientLabel: 'Silêncio de gabinete e folhas de pergaminho',
  },
  {
    id: 'terra',
    index: 7,
    code: 'Terra',
    name: 'Planeta Terra',
    orderLabel: 'Destino Final',
    inhabitant: 'O Aviador, a Raposa e a Serpente',
    accentHex: '#E8C468',
    quote: '“Só se vê bem com o coração. O essencial é invisível aos olhos.”',
    philosophy:
      'Entre as dunas do deserto onde um avião repousa avariado e os campos dourados de trigo ao vento, a Raposa revela o segredo dos laços verdadeiros: cativar é criar vínculos pacientes que tornam alguém único entre cem mil iguais.',
    detailNote:
      'Quando o trigo balançar ao sol dourado, lembrará para sempre a cor dos cabelos de quem nos cativou.',
    ambientLabel: 'Ondas suaves e vento nos campos de trigo',
  },
];

export const B612_ROSE_PHRASES: Record<'water' | 'dome_on' | 'dome_off', string[]> = {
  water: [
    '“Ah... estou quase acordando. Desculpa-me, ainda estou toda despenteada...”',
    '“Que frescor suave! Agora sinto que minhas quatro espinhas não precisam assustar nenhum tigre.”',
    '“Obrigado por cuidares de mim todas as manhãs, meu pequeno príncipe.”',
  ],
  dome_on: [
    '“Sob o vidro cristalino, a corrente de ar da noite já não me assusta.”',
    '“Guarda-me assim durante a noite; mas não te esqueças de mim quando amanhecer.”',
  ],
  dome_off: [
    '“É preciso que eu suporte duas ou três lagartas, se quiser conhecer as borboletas.”',
    '“Deixa o ar da manhã entrar... quero sentir o céu do nosso pequeno asteroide.”',
  ],
};

export const KING_ORDERS: { decree: string; effect: string }[] = [
  {
    decree: '“Ordeno que você respire fundo e sinta a calma desta noite estrelada.”',
    effect: 'O ar cósmico ao redor do asteroide parece acalmar-se obedientemente.',
  },
  {
    decree: '“Ordeno que todas as estrelas deste céu continuem a brilhar em silêncio.”',
    effect: 'As constelações cintilam como se respondessem prontamente ao cetro real.',
  },
  {
    decree: '“Ordeno que o tempo siga adiante, segundo após segundo, sem hesitar.”',
    effect: 'O pequeno trono real gira suavemente sob a luz serena do universo.',
  },
  {
    decree: '“Ordeno que seu coração bata em paz enquanto contempla esta jornada.”',
    effect: 'O Rei assente com gravidade, satisfeito por sua autoridade universal.',
  },
  {
    decree: '“Ordeno que o sol nasça e se ponha na hora exata determinada pelos astros.”',
    effect: 'Sua Majestade consulta o relógio imaginário com ar de absoluta sabedoria.',
  },
];

export const VAIN_MAN_RESPONSES: string[] = [
  '“Oh! Finalmente um admirador! Saúdo-te com meu chapéu!”',
  '“Mais alto! Admire bem como sou o homem mais belo, elegante e inteligente deste planeta!”',
  '“Sim, sim! Continue aplaudindo! É tão cansativo ser o único habitante extraordinário por aqui...”',
  '“Não ouço nada além de aplausos... Diga-me outra vez o quanto me admira!”',
  '“Magnífico! Meu chapéu quase não descansa com tanta devoção!”',
];

export const DRUNKARD_LOOP = [
  {
    question: 'Por que você bebe?',
    answer: '“Para esquecer...”',
    nextPrompt: 'Para esquecer o quê?',
  },
  {
    question: 'Para esquecer o quê?',
    answer: '“Para esquecer que tenho vergonha.”',
    nextPrompt: 'Vergonha de quê?',
  },
  {
    question: 'Vergonha de quê?',
    answer: '“Vergonha de beber!”',
    nextPrompt: 'Por que você bebe?',
  },
];

export const BUSINESSMAN_INTERRUPTIONS: string[] = [
  '“Três e dois são cinco. Cinco e sete são doze... Não me atrapalhe! Estou ocupado com coisas sérias!”',
  '“Quinhentos e um milhões de quê? Ah, dessas coisinhas douradas que fazem os ociosos sonharem! Eu as possuo!”',
  '“Não tenho tempo para devaneios. Em cinquenta e quatro anos só fui interrompido três vezes — e você acaba de ser a quarta!”',
  '“De que serve possuir estrelas? Serve para ser rico! E ser rico serve para comprar outras estrelas!”',
];

export interface GeographerObservation {
  id: string;
  label: string;
  fromPlanet: string;
  isEphemeral: boolean;
  geographerReply: string;
  ledgerEntry?: string;
}

export const GEOGRAPHER_OBSERVATIONS: GeographerObservation[] = [
  {
    id: 'volcanoes',
    label: 'Os três vulcões de B-612',
    fromPlanet: 'Asteroide B-612',
    isEphemeral: false,
    geographerReply:
      '“Excelente! Vulcões são eternos — mesmo quando estão extintos, jamais mudam de lugar. Vou anotá-los à tinta agora mesmo!”',
    ledgerEntry: 'Três vulcões (dois ativos, um extinto) — Asteroide B-612',
  },
  {
    id: 'rose',
    label: 'A Rosa única e perfumada',
    fromPlanet: 'Asteroide B-612',
    isEphemeral: true,
    geographerReply:
      '“Ah, não anotamos flores! Uma flor é efêmera — está ameaçada de desaparecer em breve. Os livros de geografia tratam apenas de coisas eternas.”',
  },
  {
    id: 'baobabs',
    label: 'As raízes gigantes dos baobás',
    fromPlanet: 'Asteroide B-612',
    isEphemeral: false,
    geographerReply:
      '“Interessante! Se uma árvore ameaça partir um planeta inteiro, merece uma nota à margem sobre acidentes geográficos.”',
    ledgerEntry: 'Perigo geológico de raízes de baobá — B-612',
  },
  {
    id: 'lamp',
    label: 'O lampião e a rotação de um minuto',
    fromPlanet: 'Asteroide 329',
    isEphemeral: false,
    geographerReply:
      '“Extraordinário fenômeno astronômico! Um planeta cuja rotação dura sessenta segundos merece um capítulo inteiro!”',
    ledgerEntry: 'Órbita de rotação rápida (1 min/dia) — Asteroide 329',
  },
];

export const FOX_TAMING_STEPS = [
  {
    step: 0,
    actionLabel: 'Aproximar-se em silêncio',
    foxText:
      '“Não posso brincar contigo. Ainda não fui cativada... Para mim, tu és apenas um menino igual a cem mil outros meninos.”',
    hint: 'Sente-se primeiro um pouco longe na relva dourada, sem dizer nada.',
  },
  {
    step: 1,
    actionLabel: 'Chegar um pouco mais perto',
    foxText:
      '“A cada dia te sentarás um pouco mais perto... A linguagem é fonte de mal-entendidos, mas o teu silêncio começa a tornar minhas horas diferentes das outras.”',
    hint: 'A raposa olha pelo canto dos olhos, menos assustada.',
  },
  {
    step: 2,
    actionLabel: 'Ouvir o segredo em silêncio',
    foxText:
      '“Se tu me cativas, minha vida será como que cheia de sol. Conhecerei um barulho de passos diferente de todos os outros... E o trigo dourado me fará lembrar de ti.”',
    hint: 'Falta apenas um passo para selar o laço.',
  },
  {
    step: 3,
    actionLabel: 'Laço eterno criado',
    foxText:
      '“Eis o meu segredo. É muito simples: só se vê bem com o coração. O essencial é invisível aos olhos. Tu te tornas eternamente responsável por aquilo que cativas.”',
    hint: 'Você cativou a Raposa.',
  },
];

// ===== dado.js: os textos longos do site ficam aqui e entram nas páginas pelo DOM =====
// Como funciona:
//  1. No HTML, o parágrafo fica vazio e recebe um nome:  <p data-texto="mineracao"></p>
//  2. Aqui embaixo, o objeto "textos" guarda o texto com esse mesmo nome.
//  3. A função preencherTextos() procura todo elemento com data-texto, coloca o texto dentro dele
//     e dá a ele o id "texto-nome" (a busca usa esse id para criar o link).
// Para mudar um texto do site, mude só aqui. Este arquivo precisa vir ANTES do script.js no HTML.

const textos = {
    // ----- Início -----
    "inicio-numero-1": "de lixo eletrônico gerado por ano no mundo",
    "inicio-numero-2": "do lixo eletrônico é reciclado corretamente",
    "inicio-numero-3": "de lixo eletrônico por pessoa no Brasil por ano",
    "inicio-curiosidade": "existe mais ouro dentro de uma tonelada de lixo eletrônico do que em uma tonelada de rocha extraída de uma mina de ouro?",
    // ----- Sobre -----
    "sobre-objetivo": "Nosso objetivo é conscientizar a população sobre os problemas causados pelo descarte inadequado do lixo eletrônico e apresentar a logística reversa como uma solução para esse problema. Queremos mostrar como celulares, computadores, pilhas, baterias e outros equipamentos eletrônicos podem causar impactos ambientais quando descartados incorretamente, além de ensinar como realizar o descarte adequado e contribuir para um futuro mais sustentável.",
    "sobre-justificativa": "Escolhemos esse tema porque os aparelhos eletrônicos fazem parte do nosso cotidiano e são constantemente substituídos por modelos mais novos ou descartados quando deixam de funcionar. Entretanto, muitas pessoas não sabem onde ou como descartar esses equipamentos corretamente. O lixo eletrônico pode conter substâncias prejudiciais ao meio ambiente, capazes de contaminar o solo e a água quando não recebe o tratamento adequado. Além disso, a fabricação desses aparelhos depende da extração de minérios, que também provoca impactos ambientais. Por isso, consideramos importante abordar a logística reversa, um processo que permite que produtos e componentes eletrônicos retornem aos fabricantes ou locais responsáveis para serem reaproveitados, reciclados ou receberem uma destinação ambientalmente adequada. Nosso projeto busca mostrar que o descarte correto é uma responsabilidade de todos e que pequenas atitudes podem ajudar a reduzir os impactos ambientais causados pelo avanço tecnológico.",
    // ----- Pesquisas -----
    "pesquisas-numero-1": "de lixo eletrônico previstos para 2030, contra 62 mi t em 2022",
    "pesquisas-numero-2": "em recursos recuperáveis do lixo eletrônico não aproveitados em 2022",
    "pesquisas-numero-3": "do lixo eletrônico brasileiro é reciclado formalmente",
    "mineracao": "Celulares e baterias dependem de minérios como lítio, cobalto, níquel e grafite, e a demanda cresce rápido. Segundo a Agência Internacional de Energia (IEA), o consumo de lítio deve ser cerca de cinco vezes maior em 2040 do que hoje, o de grafite e níquel deve dobrar e o de cobalto e terras raras deve subir de 50% a 60%. A extração também é concentrada: em 2024, três países responderam por 77% do lítio extraído no mundo.",
    "lixo-eletronico": "O mundo gerou 62 milhões de toneladas de lixo eletrônico em 2022, 82% a mais do que em 2010. Só 22,3% dessa massa foi documentada como coletada e reciclada de forma adequada. A previsão é chegar a 82 milhões de toneladas em 2030, e a taxa de reciclagem pode cair para 20%, porque o lixo eletrônico cresce cerca de cinco vezes mais rápido que a reciclagem.",
    "brasil": "O Brasil gerou cerca de 2,4 milhões de toneladas de lixo eletrônico em 2022. É o segundo maior gerador das Américas, atrás só dos Estados Unidos, e estimativas o colocam em quinto lugar no mundo. Apesar do volume, apenas cerca de 3% desse total é reciclado formalmente.",
    "pesquisas-curiosidade": "Em 2022, a reciclagem formal de lixo eletrônico evitou a extração de cerca de 900 milhões de toneladas de minério.",
    // ----- Problema -----
    "etapa-extracao": "Celulares e baterias dependem de minérios como lítio, cobalto, níquel e cobre, e tirá-los da terra pesa sobre a água e sobre as comunidades vizinhas. No Salar de Atacama, no Chile, a mineração de lítio responde por até 65% do uso regional de água e disputa esse recurso com agricultores e moradores. Na República Democrática do Congo (RDC), que produz mais de 60% do cobalto do mundo, há rios tão ácidos (pH abaixo de 4,5) que a água fica imprópria para beber e irrigar. Em minas artesanais de cobalto do país, estima-se que milhares de crianças trabalhem expostas à poeira do metal, quase sem proteção.",
    "etapa-fabricacao": "Um smartphone já chega às nossas mãos com uma grande “dívida” ambiental. Segundo a Deloitte, um aparelho novo gera em média 85 kg de CO₂ equivalente no primeiro ano de vida, e 95% disso vem da fabricação, o que inclui extrair as matérias-primas e transportar as peças. Dentro do aparelho, os circuitos integrados (chips e memórias) são o item mais pesado: respondem por 72% a 77% das emissões de fabricação de modelos recentes, como o iPhone 17 e o Pixel 10.",
    "etapa-uso": "Os celulares são os aparelhos de vida mais curta dentro de casa. Pesquisa do Idec com a Market Analysis mostrou que 54% dos brasileiros usam o celular por menos de 3 anos (o tempo médio de posse é de 2,6 anos) e que 81% trocam de aparelho sem antes levá-lo à assistência técnica para saber se tem conserto. Parte da troca vem de defeitos e do que o Idec chama de obsolescência programada, quando o produto é planejado para durar menos. Outra parte vem da obsolescência psicológica: a pessoa troca um aparelho que ainda funciona só porque surgiu um modelo novo. Os dados são de 2014, mas ajudam a entender como esse ciclo curto alimenta a pilha de lixo eletrônico.",
    "etapa-descarte": "O lixo eletrônico contém substâncias tóxicas, como chumbo, cádmio e mercúrio. Quando ele é queimado a céu aberto ou tratado com ácidos em reciclagem informal para recuperar metais valiosos, a OMS aponta que mais de 1.000 substâncias nocivas podem ser liberadas no ar, no solo e na água. O chumbo e o mercúrio são neurotóxicos e podem prejudicar o desenvolvimento do sistema nervoso, principalmente de crianças e gestantes. E isso é comum: em 2022, só 22,3% do lixo eletrônico do mundo foi documentado como reciclado formalmente.",
    "problema-curiosidade": "Em 2024, a produção mundial de lítio (sem contar os Estados Unidos), cerca de 240 mil toneladas, consumiu uma estimativa de 456 bilhões de litros de água. Isso equivale ao consumo doméstico anual de cerca de 62 milhões de pessoas na África Subsaariana.",
    // ----- Logística reversa -----
    "logistica-como-funciona": "Logística reversa é o caminho de volta: um conjunto de ações que leva o produto usado do consumidor de volta ao setor empresarial, para ser reaproveitado, reciclado ou ter um destino ambientalmente adequado.",
    "logistica-lei": "A Política Nacional de Resíduos Sólidos (Lei 12.305/2010) obriga fabricantes, importadores, distribuidores e comerciantes a estruturar e financiar a coleta e a destinação dos eletroeletrônicos. O Decreto 10.240/2020 regulamenta o sistema e define que o consumidor deve descartar os produtos desligados, em pontos de recebimento.",
    "logistica-empresa": "A Green Eletron é a gestora de logística reversa criada pela Abinee (indústria elétrica e eletrônica) para as empresas associadas. Ela organiza os pontos de coleta, recolhe os aparelhos e os envia à reciclagem. Em 2023, reciclou mais de 4,2 mil toneladas de eletrônicos.",
    "logistica-ponto": "Em São Paulo, 14 estações do Metrô receberam coletores para eletroeletrônicos de pequeno e médio porte, pilhas e baterias portáteis, a partir de 4 de novembro de 2026.",
    "logistica-ambientais": "Menos poluição e menos extração de minérios: em 2022, a reciclagem formal de lixo eletrônico evitou a extração de cerca de 900 milhões de toneladas de minério.",
    "logistica-economicos": "Materiais recuperados, empregos e economia circular: US$ 62 bilhões em recursos recuperáveis do lixo eletrônico não foram aproveitados em 2022.",
    "logistica-curiosidade": "Segundo pesquisa da Green Eletron, 87% dos brasileiros guardam em casa, por mais de dois meses, eletrônicos que não usam mais, e 25% nunca descartaram esse tipo de lixo em um ponto de coleta.",
};

// ===== Quiz (final da página Pesquisas) =====
// perguntasQuiz: vetor com o texto de cada pergunta
const perguntasQuiz = [
    "Que porcentagem do lixo eletrônico do mundo foi documentada como reciclada formalmente em 2022?",
    "Quantos milhões de toneladas de lixo eletrônico o mundo gerou em 2022?"
];

// alternativasQuiz: MATRIZ REGULAR 2x4 (2 linhas, uma por pergunta; 4 colunas, uma por alternativa)
const alternativasQuiz = [
    ["3%", "22,3%", "50%", "77,7%"],
    ["34", "82", "62", "120"]
];

// gabaritoQuiz: posição da resposta certa de cada pergunta (0 é a primeira, 1 é a segunda...)
const gabaritoQuiz = [1, 2];

// ===== Busca (bloco na página Início) =====
// nomesPaginas e arquivosPaginas andam juntos: a posição 0 é o Início, a 1 é o Sobre, e assim por diante
const nomesPaginas = ["Início", "Sobre", "Pesquisas", "Problema", "Logística reversa"];
const arquivosPaginas = ["index.html", "sobre.html", "pesquisas.html", "problema.html", "logistica_reversa.html"];

// indiceBusca: MATRIZ IRREGULAR. Cada linha é uma página, e cada página tem uma quantidade
// diferente de itens (4, 2, 7, 5 e 7). "titulo" aparece no resultado e "texto" é o nome do texto em "textos".
const indiceBusca = [
    [
        { titulo: "62 mi t", texto: "inicio-numero-1" },
        { titulo: "22,3%", texto: "inicio-numero-2" },
        { titulo: "11,4 kg", texto: "inicio-numero-3" },
        { titulo: "Você sabia?", texto: "inicio-curiosidade" }
    ],
    [
        { titulo: "Objetivo", texto: "sobre-objetivo" },
        { titulo: "Por que esse tema?", texto: "sobre-justificativa" }
    ],
    [
        { titulo: "82 mi t", texto: "pesquisas-numero-1" },
        { titulo: "US$ 62 bi", texto: "pesquisas-numero-2" },
        { titulo: "3%", texto: "pesquisas-numero-3" },
        { titulo: "Mineração", texto: "mineracao" },
        { titulo: "Lixo eletrônico", texto: "lixo-eletronico" },
        { titulo: "E no Brasil?", texto: "brasil" },
        { titulo: "Você sabia?", texto: "pesquisas-curiosidade" }
    ],
    [
        { titulo: "1. Extração", texto: "etapa-extracao" },
        { titulo: "2. Fabricação", texto: "etapa-fabricacao" },
        { titulo: "3. Uso e troca", texto: "etapa-uso" },
        { titulo: "4. Descarte", texto: "etapa-descarte" },
        { titulo: "Você sabia?", texto: "problema-curiosidade" }
    ],
    [
        { titulo: "O que é e como funciona", texto: "logistica-como-funciona" },
        { titulo: "Lei", texto: "logistica-lei" },
        { titulo: "Empresa", texto: "logistica-empresa" },
        { titulo: "Ponto de coleta", texto: "logistica-ponto" },
        { titulo: "Ambientais", texto: "logistica-ambientais" },
        { titulo: "Econômicos", texto: "logistica-economicos" },
        { titulo: "Você sabia?", texto: "logistica-curiosidade" }
    ]
];

// ===== Coloca cada texto no elemento que tem o mesmo nome em data-texto =====
function preencherTextos() {
    const elementos = document.querySelectorAll("[data-texto]");
    elementos.forEach(elemento => {
        const nome = elemento.dataset.texto;
        if (textos[nome]) {
            elemento.textContent = textos[nome];
            elemento.id = "texto-" + nome; // o resultado da busca usa esse id para levar até o parágrafo
        }
    });
}

preencherTextos();

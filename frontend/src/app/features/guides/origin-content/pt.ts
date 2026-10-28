import { OriginDeep } from './types';

export const ORIGIN_DEEP: OriginDeep = {
  USA: [
    {
      id: "market",
      title: "O mercado automóvel dos EUA – o que vale a pena importar",
      paras: [
        "Os Estados Unidos são o maior mercado de usados do mundo: cerca de 40 milhões de veículos mudam de dono todos os anos e vários milhões passam por leilões de seguradoras. Por isso, muitos modelos – sobretudo os danificados – são claramente mais baratos do que na Europa e a escolha de versões é enorme.",
        "Normalmente compensa importar carros raros ou caros na Europa: muscle cars com grandes motores V8 (Mustang, Camaro, Challenger), SUV e pickups de grande porte, versões premium bem equipadas e elétricos, que nos EUA desvalorizam depressa. Nos compactos mais baratos, o transporte e os impostos costumam anular a poupança.",
        "Lembre-se de que o preço do leilão é só o começo. Somam-se as taxas do leilão, o transporte até ao porto, o frete marítimo, o seguro, o direito aduaneiro, o IVA, os impostos nacionais, a adaptação à UE e eventuais reparações. Só o total diz se a importação compensa – por isso faça as contas antes de licitar, não depois.",
      ],
    },
    {
      id: "auctions",
      title: "Leilões Copart e IAAI – como comprar",
      paras: [
        "A Copart e a IAAI (Insurance Auto Auctions) vendem sobretudo carros de seguradoras, rent-a-car e bancos – danificados, recuperados após roubo, inundados ou simplesmente retirados de frotas. A licitação é online, enquanto o carro está num dos várias centenas de parques espalhados pelo país. A localização importa: determina o custo e o tempo até ao porto.",
        "Um comprador europeu costuma licitar através de um broker (intermediário com licença de leilão), porque muitos carros – sobretudo com título salvage – só podem ser comprados por compradores licenciados. O broker cobra uma comissão e muitas vezes trata também do transporte e dos documentos de exportação.",
        "Ao preço de martelo somam-se as taxas do leilão: a taxa de comprador, que sobe por escalões com o preço, a taxa de licitação online, a taxa de saída do parque (gate fee), a taxa ambiental e a taxa de tratamento do título. Para um carro de alguns milhares de dólares, isto dá normalmente de várias centenas a mais de mil dólares.",
        "O pagamento tem de ser feito num prazo curto – geralmente alguns dias úteis – e o carro tem de ser levantado do parque antes de começarem as taxas de armazenamento. Pagar tarde significa multa e conta bloqueada, por isso tenha o dinheiro do carro e das taxas pronto antes de licitar.",
      ],
    },
    {
      id: "titles",
      title: "Tipos de título: clean, salvage, rebuilt",
      paras: [
        "Nos EUA, a propriedade prova-se com o title emitido pelo estado. O seu tipo conta a história do carro e é importante para a compra e a exportação:",
        [
          "Clean – sem perda total no historial; o mais caro, mas o menos arriscado.",
          "Salvage – a seguradora declarou perda total (o custo da reparação excedeu uma parte do valor do carro). É o título mais comum na Copart e na IAAI.",
          "Rebuilt / Reconstructed – antiga perda total que foi reparada e voltou a ser autorizada a circular nos EUA.",
          "Non-repairable, Certificate of Destruction, Parts only, Junk – apenas para peças. Não os compre para conduzir: a exportação e o registo na UE podem ser impossíveis ou muito difíceis.",
        ],
        "Na União Europeia, as marcas do título americano não passam para o documento de registo. Um carro salvage pode ser matriculado se passar na inspeção técnica após a reparação. Ainda assim, o título afeta o valor de revenda e, sobretudo, indica que o carro teve danos graves – que têm de ser reparados corretamente.",
      ],
    },
    {
      id: "inspection",
      title: "Como verificar um carro antes de licitar",
      paras: [
        "No leilão não pode ver o carro pessoalmente, por isso cada pormenor do anúncio conta. Antes de licitar:",
        [
          "Verifique o historial pelo VIN (p. ex. Carfax, AutoCheck, base NMVTIS): danos, quilometragem, número de donos, roubo e inundação.",
          "Analise as fotos e a descrição dos danos (primary / secondary damage). “Front end” pode significar desde um para-choques até longarinas dobradas e airbags disparados.",
          "Leia com atenção as etiquetas de estado: “Run and Drive” significa que o carro andou ao chegar ao parque, não que está apto a circular; “Engine Starts” significa apenas que o motor pegou.",
          "Cuidado com carros de zonas de furacões e cheias (Florida, Texas, Louisiana). Marcas de água debaixo da alcatifa, lodo e conectores elétricos corroídos são motivo para desistir.",
          "A quilometragem está em milhas (1 milha = 1,61 km) e pode estar marcada como “not actual” ou “exempt” – nesse caso o conta-quilómetros não é fiável.",
        ],
        "É sensato guardar uma reserva para danos ocultos – até 20–30% do custo estimado da reparação. Peça orçamentos de peças na Europa ou nos EUA antes de fixar a sua licitação máxima.",
      ],
    },
    {
      id: "shipping",
      title: "Exportação e frete marítimo",
      paras: [
        "Depois da compra, um camião porta-automóveis leva o carro do parque ao porto de exportação. Os portos mais comuns são New Jersey/Nova Iorque, Savannah (Geórgia), Baltimore, Houston e Los Angeles/Long Beach. Da costa leste, a viagem até aos portos do Mar do Norte demora normalmente 2–3 semanas; da Califórnia, pelo Canal do Panamá, até 5–6 semanas.",
        "A exportação exige o título original (ou cópia certificada) e a fatura. O exportador submete a Electronic Export Information (EEI) no sistema AES – obrigatória para veículos usados independentemente do valor – e o carro e os documentos têm de ser apresentados à alfândega americana (CBP) pelo menos 72 horas antes da partida do navio.",
        "Há três formas de envio:",
        [
          "Contentor partilhado (normalmente 3–4 carros num contentor de 40 pés) – a mais popular, adequada para carros danificados e que não andam.",
          "Contentor exclusivo – mais caro, mas o carro viaja sozinho e pode juntar peças.",
          "RoRo (navio roll-on/roll-off) – muitas vezes o mais barato, mas só para carros que andam e com menos proteção contra danos.",
        ],
        "Vale a pena fazer seguro de carga – normalmente 1,5–2% do valor do carro. No porto da UE o contentor é descarregado e um despachante trata do desalfandegamento. As taxas de descarga, de terminal e de agência pagam-se no porto de destino.",
      ],
    },
    {
      id: "duty",
      title: "Direito aduaneiro, origem e desalfandegamento na UE",
      paras: [
        "O direito aduaneiro normal da UE sobre automóveis de passageiros é de 10% do valor aduaneiro. O valor aduaneiro é o preço do carro com as taxas do leilão mais o transporte e o seguro até à fronteira da UE (valor CIF). As pickups podem ser classificadas como veículos de mercadorias – então o direito é de 22% – e os motociclos pagam 6–8%.",
        "De 1 de julho de 2026 até ao final de 2029, os carros fabricados nos EUA podem entrar na UE com direito de 0% (Regulamento (UE) 2026/1455). A condição: tem de provar à alfândega a origem americana do carro e o carro tem de ser enviado diretamente dos EUA. Uma fatura ou uma etiqueta “Made in USA” não chegam – é preciso prova de origem. O VIN dá uma pista: os carros construídos nos EUA têm um VIN começado por 1, 4 ou 5. Uma marca japonesa ou alemã montada na América também pode qualificar-se, mas um BMW fabricado na Europa e comprado nos EUA não.",
        "O IVA de importação é cobrado à taxa do país onde o carro é desalfandegado. A base do IVA é o valor aduaneiro mais o direito e os custos de transporte até ao destino na UE. As empresas podem usar o regime aduaneiro 4200: desalfandegar o carro num país e liquidar o IVA no país de matrícula.",
        "Após o desalfandegamento vêm os impostos nacionais – consoante o país, um imposto especial (p. ex. 3,1% ou 18,6% na Polónia, conforme a cilindrada), um imposto de registo baseado no CO₂, na potência ou no valor (como o ISV em Portugal), ou nada. São muitas vezes eles que decidem se a importação compensa.",
      ],
    },
    {
      id: "adaptation",
      title: "Adaptação à UE e matrícula",
      paras: [
        "Os carros feitos para o mercado americano não cumprem algumas regras técnicas europeias, por isso precisam de alterações antes da inspeção:",
        [
          "Os piscas traseiros têm de ser âmbar – em muitos carros americanos piscam as luzes de travão vermelhas.",
          "É obrigatória uma luz de nevoeiro traseira.",
          "Os faróis têm de ter o padrão europeu de médios e estar bem regulados.",
          "O velocímetro deve mostrar km/h (uma escala dupla costuma bastar).",
          "Os sensores de pressão dos pneus (TPMS) americanos funcionam a 315 MHz – na Europa é comum 433 MHz, o que importa quando troca de rodas.",
        ],
        "A conversão das luzes custa normalmente algumas centenas de euros. Em alguns países – p. ex. Alemanha ou França – um carro de fora da UE precisa ainda de homologação individual ou de um relatório pericial antes da matrícula, o que custa tempo e dinheiro.",
        "Para a matrícula, prepare traduções certificadas do título e da fatura, o documento de desalfandegamento, o comprovativo do pagamento do imposto nacional e o certificado de inspeção. Muitos países fixam um prazo legal para matricular um carro importado – na Polónia, por exemplo, 30 dias.",
      ],
    },
    {
      id: "mistakes",
      title: "Os erros mais comuns ao importar dos EUA",
      paras: [
        [
          "Licitar sem calcular o custo total – taxas, transporte e impostos podem duplicar o preço do leilão.",
          "Comprar um carro com título “parts only” ou certificado de destruição, que não pode ser matriculado legalmente.",
          "Confiar no “Run and Drive” sem verificar o historial pelo VIN.",
          "Não ter reserva para danos ocultos e peças – reparar um carro acidentado custa quase sempre mais do que as fotos sugerem.",
          "Contar com direito de 0% sem prova de origem americana – sem ela paga 10%.",
          "Pagar o leilão tarde e acumular taxas de armazenamento no parque.",
          "Falhar o prazo da matrícula ou da declaração do imposto nacional após a chegada do carro.",
        ],
      ],
    },
  ],
  CANADA: [
    {
      id: "market",
      title: "O mercado automóvel do Canadá – em que difere dos EUA",
      paras: [
        "O Canadá é um mercado mais pequeno do que os EUA, mas oferece praticamente o mesmo: as mesmas marcas, modelos e versões, muitas vezes a preços um pouco mais baixos do que na Europa. Muitos compradores veem-no como alternativa aos EUA, sobretudo para carros de fábricas canadianas, que podem beneficiar do acordo CETA.",
        "Os carros canadianos têm algumas vantagens: conta-quilómetros em quilómetros, luzes diurnas de fábrica e equipamento preparado para o inverno (bancos aquecidos, por vezes aquecedor do bloco do motor). A desvantagem pode ser a corrosão – no inverno as estradas levam muito sal e o fundo de um carro do Ontário ou do Quebeque pode estar pior do que o de um carro do sul dos EUA.",
        "As importações mais comuns do Canadá são SUV e pickups, carros fabricados localmente (p. ex. Toyota RAV4, Lexus RX, Honda CR-V e Civic, Chrysler Pacifica) e carros de fim de leasing com pouca quilometragem.",
      ],
    },
    {
      id: "auctions",
      title: "Onde comprar um carro no Canadá",
      paras: [
        "Os carros danificados são vendidos no Canadá pela Copart Canada e pela IAA (antiga Impact Auto Auctions); os não danificados em leilões de comerciantes como a ADESA e por concessionários. Tal como nos EUA, muitos leilões só são acessíveis através de um broker licenciado.",
        "Também é popular comprar a concessionários e particulares através de sites de anúncios. Numa compra a particular tem de tratar sozinho dos documentos de exportação e do transporte até ao porto, por isso a maioria dos compradores europeus recorre a uma empresa de exportação que recolhe o carro, verifica os documentos e o envia.",
        "Some ao preço as taxas do leilão ou do concessionário e – na compra a um concessionário – os impostos canadianos sobre vendas (GST/HST/PST). Alguns podem ser reembolsados ou não cobrados quando o concessionário vende diretamente para exportação – pergunte antes de comprar.",
      ],
    },
    {
      id: "titles",
      title: "Documentos de propriedade e estados de dano",
      paras: [
        "O Canadá não tem um “title” ao estilo americano – o documento é o registo emitido pela província (no Ontário, a “ownership”). O estado de dano fica inscrito no registo provincial:",
        [
          "Ontário e a maioria das províncias: Normal, Salvage (perda total não autorizada a circular), Rebuilt (reparado e aprovado após inspeção) e Irreparable – apenas para peças.",
          "Quebeque: veículos gravemente acidentados (VGA – véhicule gravement accidenté) marcados como “reconstruit” (reconstruído) ou “irrécupérable” (irrecuperável).",
        ],
        "Não compre para conduzir carros marcados como irreparable ou irrécupérable – não podem ser matriculados legalmente. Os outros estados não passam para o documento de registo da UE, mas afetam o valor e mostram que o carro teve danos graves.",
      ],
    },
    {
      id: "inspection",
      title: "Como verificar um carro do Canadá",
      paras: [
        [
          "Historial pelo VIN: um relatório CARFAX Canada mostra danos, registos provinciais e quilometragem; para carros vindos dos EUA, verifique também o historial americano.",
          "Ónus: no Canadá um carro pode servir de garantia de um empréstimo. Verifique no registo provincial de ónus (p. ex. PPSA) se o carro está livre de encargos – caso contrário a exportação pode ser bloqueada e pode até perder o carro.",
          "Corrosão: peça fotos do fundo, das embaladeiras, das cavas das rodas e dos tubos de travão – o sal da estrada deixa marcas.",
          "Versão de mercado: os carros canadianos são normalmente muito próximos dos americanos e precisam de alterações semelhantes nas luzes.",
        ],
        "Para carros de leilão aplicam-se as mesmas regras que nos EUA: fotos dos danos, o significado de “Run and Drive” e uma reserva para danos ocultos.",
      ],
    },
    {
      id: "shipping",
      title: "Exportação e envio a partir do Canadá",
      paras: [
        "Os portos mais usados são Halifax e Montreal, a leste, e Vancouver, a oeste. Da costa leste, o navio até aos portos do Mar do Norte demora normalmente cerca de 2 semanas – uma das rotas mais rápidas para a Europa. Os carros das províncias ocidentais seguem muitas vezes para leste por comboio ou partem de Vancouver pelo Canal do Panamá, o que demora mais.",
        "A exportação exige o documento de propriedade (registo provincial), o comprovativo de compra e uma declaração de exportação no sistema da CBSA (CERS), normalmente apresentada pelo exportador ou transitário. O carro tem de estar livre de ónus.",
        "As opções de envio são as mesmas que nos EUA: contentor partilhado, contentor exclusivo ou RoRo para carros que andam. No inverno, conte com possíveis atrasos no transporte terrestre até ao porto.",
      ],
    },
    {
      id: "duty",
      title: "Direito aduaneiro e o acordo CETA",
      paras: [
        "Graças ao acordo comercial UE–Canadá (CETA), os carros fabricados no Canadá podem entrar na UE com direito de 0%. A condição é a origem canadiana confirmada por uma declaração de origem do exportador. Comprar no Canadá não basta – muitos carros vendidos no Canadá foram fabricados nos EUA, no México ou no Japão e pagam os 10% completos.",
        "Um VIN começado por “2” significa que o carro foi fabricado no Canadá. É uma boa pista, mas não uma prova – na compra a um particular é muitas vezes difícil obter a declaração de origem e, sem ela, o direito é de 10% do valor aduaneiro (CIF). As pickups classificadas como veículos de mercadorias pagam 22%.",
        "Além do direito, cobra-se o IVA de importação do país de desalfandegamento e os impostos nacionais (imposto especial ou de registo) no país de matrícula. As empresas podem usar o regime 4200 e liquidar o IVA no país de destino.",
      ],
    },
    {
      id: "adaptation",
      title: "Adaptação à UE e matrícula",
      paras: [
        "Os carros canadianos são um pouco mais fáceis de matricular do que os americanos: têm velocímetro em km/h e luzes diurnas de fábrica. Normalmente ainda é preciso:",
        [
          "mudar os piscas traseiros para âmbar, se piscarem as luzes de travão,",
          "acrescentar uma luz de nevoeiro traseira,",
          "adaptar os faróis ao padrão europeu de médios.",
        ],
        "A matrícula exige traduções certificadas dos documentos, o documento de desalfandegamento, o comprovativo dos impostos nacionais e a inspeção técnica. Países como a Alemanha ou a França podem exigir homologação individual.",
      ],
    },
    {
      id: "mistakes",
      title: "Os erros mais comuns ao importar do Canadá",
      paras: [
        [
          "Partir do princípio de que qualquer carro do Canadá paga 0% – isso aplica-se apenas a carros fabricados no Canadá com declaração de origem.",
          "Não verificar se existe ónus antes de comprar.",
          "Ignorar a corrosão do fundo em carros de províncias com invernos rigorosos.",
          "Comprar um carro com estado irreparable ou irrécupérable.",
          "Subestimar o transporte terrestre das províncias ocidentais até aos portos do leste.",
        ],
      ],
    },
  ],
  JAPAN: [
    {
      id: "market",
      title: "O mercado automóvel japonês – porquê JDM",
      paras: [
        "O Japão é conhecido por carros em muito bom estado técnico e com pouca quilometragem. A razão é a exigente inspeção shaken, que fica mais cara à medida que o carro envelhece – por isso muitos japoneses vendem ao fim de poucos anos e os preços dos carros mais velhos caem depressa.",
        "A maioria das importações do Japão são carros JDM (Japanese Domestic Market) – lendas desportivas (Nissan Skyline GT-R, Toyota Supra, Mazda RX-7, Honda NSX), todo-o-terreno (Toyota Land Cruiser), monovolumes e híbridos mais recentes. Para colecionadores, os modelos-chave são os que nunca foram vendidos oficialmente na Europa.",
        "Todos os carros do mercado japonês têm volante à direita. Podem ser matriculados na UE, mas conduzi-los à direita é menos confortável e podem ser mais difíceis de revender – exceto modelos de coleção muito procurados.",
      ],
    },
    {
      id: "auctions",
      title: "Leilões no Japão – USS e outros",
      paras: [
        "A maioria dos carros usados no Japão passa por leilões de comerciantes. O maior é a rede USS e há ainda, entre outros, TAA, CAA, HAA, JU e Arai. Todas as semanas são oferecidas dezenas de milhares de carros.",
        "Um comprador estrangeiro não licita diretamente – fá-lo um exportador japonês (agente de leilão): tem acesso aos leilões, traduz a folha de leilão, compra o carro, cancela a matrícula para exportação e envia-o. Ao preço de martelo somam-se a taxa do leilão, a comissão do exportador, o transporte interno até ao porto e os documentos de exportação. O pagamento é normalmente em ienes.",
        "Também pode comprar do stock de um exportador – pode ser mais caro, mas o carro já foi verificado e muitas vezes espera no porto.",
      ],
    },
    {
      id: "titles",
      title: "Como ler uma folha de leilão japonesa",
      paras: [
        "A folha de leilão (auction sheet) é o relatório do inspetor do leilão – a fonte mais importante de informação sobre o carro. Contém uma nota global, uma nota do interior e um mapa de danos da carroçaria.",
        [
          "Nota global: S ou 6 – praticamente novo; 5 e 4,5 – estado muito bom; 4 – bom, com pequenos sinais de uso; 3,5 e 3 – defeitos visíveis ou quilometragem mais alta; R ou RA – acidente reparado (RA – reparação ligeira); 0 ou *** – danificado, inundado ou sem classificação.",
          "Nota do interior: de A (como novo) a E (muito gasto).",
          "Mapa de danos: A – risco, U – amolgadela, B – amolgadela com risco, W – ondulação ou sinais de reparação, S e C – ferrugem e corrosão, P – marcas de pintura, X – peça a substituir, XX – peça substituída, Y – fissura ou furo. O número junto à letra (1–3) indica a dimensão do dano.",
        ],
        "A folha mostra também a quilometragem verificada pelo leilão, o equipamento e as notas do inspetor em japonês – um bom exportador tradu-las antes de licitar.",
      ],
    },
    {
      id: "inspection",
      title: "Em que prestar atenção nos carros japoneses",
      paras: [
        [
          "Quilometragem: os carros japoneses têm normalmente quilometragem real e baixa, mas verifique o seu historial na folha de leilão e no certificado de exportação.",
          "Ferrugem: carros do norte (Hokkaido) e de zonas costeiras podem estar corroídos pelo sal – veja as fotos do fundo.",
          "Modificações: os desportivos têm muitas vezes suspensão, escape e motor modificados, o que pode dificultar a inspeção na UE.",
          "Limitadores de velocidade: muitos carros JDM têm um limitador de fábrica a 180 km/h.",
          "Eletrónica: os rádios japoneses usam a banda FM de 76–90 MHz, a navegação e os menus estão em japonês e o aparelho de portagens ETC não serve na Europa.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Exportação e envio a partir do Japão",
      paras: [
        "Depois da compra, o exportador cancela a matrícula do carro e obtém o Export Certificate – o documento que substitui o registo, com os dados do carro e a quilometragem. É necessário para o desalfandegamento e a matrícula na UE, juntamente com a fatura e o conhecimento de embarque (B/L).",
        "Os carros saem sobretudo de Yokohama, Nagoya, Kobe e Osaka. Os navios RoRo para a Europa demoram normalmente 5–7 semanas (pelo Canal do Suez ou à volta de África); os contentores, mais ou menos o mesmo ou um pouco mais. O contentor é uma boa escolha para carros valiosos ou que não andam.",
        "Os portos de destino mais comuns são Bremerhaven, Roterdão, Antuérpia e Zeebrugge. Vale a pena fazer seguro de carga – numa viagem longa o risco de danos é maior.",
      ],
    },
    {
      id: "duty",
      title: "Direito aduaneiro e o acordo UE–Japão",
      paras: [
        "O Acordo de Parceria Económica UE–Japão (APE) eliminou gradualmente o direito sobre automóveis – a partir de 2026, os carros de origem japonesa podem entrar na UE com direito de 0%. A origem prova-se com uma declaração de origem do exportador ou com o conhecimento do importador (documentos que mostram que o carro foi fabricado no Japão).",
        "Os carros JDM fabricados no Japão normalmente qualificam-se. Atenção às marcas japonesas fabricadas noutros países (p. ex. nos EUA ou na Tailândia) – estas pagam os 10% normais do valor aduaneiro. Sem prova de origem o direito também é de 10%.",
        "Carros com mais de 30 anos em estado original podem ser considerados veículos de coleção – então o direito é de 0% e alguns países cobram IVA reduzido. Após o desalfandegamento, aplicam-se no país de matrícula os impostos nacionais baseados no motor, nas emissões ou no valor.",
      ],
    },
    {
      id: "adaptation",
      title: "Volante à direita – matrícula na UE",
      paras: [
        "Os carros com volante à direita podem ser matriculados nos países da UE se cumprirem os requisitos técnicos. As principais alterações são:",
        [
          "faróis com padrão para circulação pela direita (regulação ou substituição das óticas),",
          "luz de nevoeiro traseira do lado correto e piscas âmbar (os carros japoneses normalmente já os têm),",
          "velocímetro em km/h – os carros japoneses têm-no de fábrica.",
        ],
        "Alguns países, p. ex. a Alemanha, exigem homologação individual ou relatório pericial. A matrícula requer traduções do certificado de exportação e da fatura, o documento de desalfandegamento, o comprovativo dos impostos nacionais e a inspeção técnica.",
      ],
    },
    {
      id: "mistakes",
      title: "Os erros mais comuns ao importar do Japão",
      paras: [
        [
          "Licitar sem a folha de leilão traduzida.",
          "Subestimar o tempo – da compra à matrícula passam muitas vezes 2–3 meses.",
          "Contar com direito de 0% para uma marca japonesa fabricada fora do Japão.",
          "Esquecer o custo da conversão das luzes e de uma eventual homologação individual.",
          "Comprar um carro muito modificado que não passa na inspeção.",
          "Não ter seguro para a longa viagem.",
        ],
      ],
    },
  ],
  UAE: [
    {
      id: "market",
      title: "O mercado automóvel dos Emirados Árabes Unidos",
      paras: [
        "O Dubai e os outros emirados estão entre os maiores mercados de carros de luxo do mundo. A forte procura por carros novos enche o mercado de usados com SUV, desportivos e berlinas premium de poucos anos – muitas vezes mais baratos do que na Europa.",
        "A maioria dos carros vendidos nos EAU são versões GCC (Conselho de Cooperação do Golfo), feitas para o calor: ar condicionado e arrefecimento reforçados, por vezes equipamento diferente do europeu. Há também muitos carros trazidos dos EUA – frequentemente danificados – e revendidos como “importados”.",
        "As importações mais comuns dos EAU são grandes SUV (Nissan Patrol, Toyota Land Cruiser, Lexus LX), carros de luxo e desportivos. Nos carros com mais quilómetros, tenha em conta os efeitos do clima.",
      ],
    },
    {
      id: "auctions",
      title: "Onde comprar um carro nos EAU",
      paras: [
        "Os carros compram-se a concessionários (incluindo programas de usados certificados das marcas), em leilões como o Emirates Auction e a Copart UAE e através de anúncios. O Dubai tem ainda um grande mercado de usados com muitas empresas de exportação que servem compradores estrangeiros.",
        "Ao comprar a partir do estrangeiro, o mais seguro é recorrer a um exportador de confiança: verifica o carro e os documentos, cancela a matrícula, obtém o certificado de exportação e envia o carro.",
      ],
    },
    {
      id: "titles",
      title: "Documentos: Mulkiya e certificado de exportação",
      paras: [
        "O documento de registo nos EAU é o cartão Mulkiya, emitido pela autoridade de trânsito (no Dubai, a RTA). Para exportar, a matrícula tem de ser cancelada e obtido um certificado de exportação (muitas vezes com chapas de exportação) – o documento-chave para o desalfandegamento na UE.",
        "O carro não pode ter multas por pagar nem ónus bancário. Muitos carros nos EAU são comprados a crédito – antes de comprar, verifique se o empréstimo está pago e se o banco libertou o carro para exportação.",
      ],
    },
    {
      id: "inspection",
      title: "Como verificar um carro dos EAU",
      paras: [
        [
          "Origem: verifique pelo VIN se o carro é uma versão GCC ou veio dos EUA. Um VIN começado por 1, 4 ou 5 indica um carro fabricado nos EUA – então verifique o historial americano (danos, título salvage).",
          "Inundação: após as tempestades de 2024 chegaram ao mercado muitos carros inundados. Procure marcas de água, lodo e corrosão no habitáculo e na eletrónica.",
          "Danos do clima: as altas temperaturas desgastam borrachas, plásticos, baterias, pneus e ar condicionado.",
          "Historial de manutenção: os carros de concessionário têm normalmente registos completos – uma grande vantagem na revenda.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Exportação e envio a partir dos EAU",
      paras: [
        "O principal porto é Jebel Ali, no Dubai. A viagem até aos portos europeus demora normalmente 3–5 semanas, consoante a rota (pelo Mar Vermelho e o Canal do Suez ou à volta de África) e o porto de destino. Os carros viajam em contentores ou em navios RoRo.",
        "O desalfandegamento na UE exige o certificado de exportação, a fatura e o conhecimento de embarque (B/L). Para carros que chegaram antes aos EAU vindos dos EUA, também são úteis os documentos do historial americano.",
      ],
    },
    {
      id: "duty",
      title: "Direito aduaneiro na importação dos EAU",
      paras: [
        "A UE não tem nenhum acordo com os EAU que reduza o direito sobre automóveis, por isso os carros dos Emirados pagam os 10% normais do valor aduaneiro (CIF) e as pickups classificadas como veículos de mercadorias 22%. O mesmo vale para carros fabricados nos EUA: o direito de 0% para carros americanos exige envio direto dos EUA.",
        "Além do direito, cobra-se o IVA de importação do país de desalfandegamento e os impostos nacionais no país de matrícula. Carros com mais de 30 anos em estado original podem ser considerados veículos de coleção, com direito de 0%.",
      ],
    },
    {
      id: "adaptation",
      title: "Adaptação à UE e matrícula",
      paras: [
        "Os carros em versão GCC têm volante à esquerda, velocímetro em km/h e normalmente iluminação próxima da especificação europeia, por isso as alterações costumam ser menores do que nos carros americanos. Ainda assim, verifique os piscas, a luz de nevoeiro traseira e os faróis.",
        "Os carros trazidos para os EAU a partir dos EUA têm especificação americana e precisam das mesmas alterações que os carros comprados diretamente na América. Alguns países da UE exigem homologação individual.",
      ],
    },
    {
      id: "mistakes",
      title: "Os erros mais comuns ao importar dos EAU",
      paras: [
        [
          "Comprar um carro americano vendido como “GCC” sem verificar o VIN e o historial.",
          "Um empréstimo ou multas por pagar que bloqueiam a exportação.",
          "Não detetar sinais de inundação e de danos causados pelo calor.",
          "Contar com direito de 0% – os carros dos EAU pagam os 10% normais.",
        ],
      ],
    },
  ],
  UK: [
    {
      id: "market",
      title: "O mercado automóvel britânico depois do Brexit",
      paras: [
        "O Reino Unido é um grande mercado de usados com uma enorme oferta de carros premium, desportivos e clássicos. Desde o Brexit é um país terceiro para a UE, por isso a importação exige desalfandegamento – mas, graças ao Acordo de Comércio e Cooperação UE–Reino Unido (TCA), os carros que cumprem as regras de origem podem entrar com direito de 0%.",
        "Todos os carros britânicos têm volante à direita. Por isso, as importações mais comuns são carros em que isso não importa ou que são excecionalmente vantajosos: clássicos, carros de coleção, versões raras e carros premium. Também é popular trazer de volta carros de marcas europeias que antes foram para o Reino Unido.",
      ],
    },
    {
      id: "auctions",
      title: "Onde comprar um carro no Reino Unido",
      paras: [
        "Os carros compram-se a concessionários, através de anúncios (p. ex. Auto Trader) e em leilões – de comerciantes (BCA, Manheim) e de salvados (Copart UK). Muitos carros têm historial de manutenção documentado.",
        "Nos leilões de salvados, os carros têm uma categoria de dano que precisa de compreender antes de comprar.",
      ],
    },
    {
      id: "titles",
      title: "Categorias de dano e o V5C",
      paras: [
        "O documento de registo é o V5C (logbook). Os carros com perda total no Reino Unido recebem uma categoria:",
        [
          "Cat S – danos estruturais (p. ex. longarinas, pilares); o carro pode ser reparado e voltar à estrada.",
          "Cat N – danos não estruturais (p. ex. eletrónica, painéis da carroçaria); o carro pode ser reparado.",
          "Cat B – apenas peças, a carroçaria tem de ser destruída.",
          "Cat A – apenas sucata.",
        ],
        "Não compre carros Cat A ou Cat B para conduzir. As categorias S e N indicam danos graves no passado – verifique a qualidade da reparação.",
      ],
    },
    {
      id: "inspection",
      title: "Como verificar um carro do Reino Unido",
      paras: [
        [
          "Historial MOT: no site do governo gov.uk pode consultar gratuitamente, pela matrícula, todas as inspeções MOT – com a quilometragem de cada ano e a lista de defeitos. É a melhor forma de detetar um conta-quilómetros adulterado.",
          "Verificação HPI (ou semelhante): mostra financiamento por pagar, roubo e se o carro foi registado como perda total.",
          "Historial de manutenção e número de donos no V5C.",
          "Quilometragem em milhas – para a matrícula na UE o velocímetro tem de mostrar também km/h.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Exportação e transporte a partir do Reino Unido",
      paras: [
        "A maioria dos carros atravessa o Canal da Mancha de ferry ou comboio (Dover–Calais, Eurotunnel), num camião porta-automóveis ou a conduzir. O transporte demora normalmente de alguns dias a uma semana. Carros da Escócia ou do norte de Inglaterra também podem seguir de navio RoRo para portos do Benelux e da Alemanha.",
        "Desde o Brexit são necessárias duas declarações aduaneiras: uma de exportação no Reino Unido e outra de importação na UE – mesmo que conduza o carro pessoalmente. Normalmente trata delas um despachante no terminal. O detentor comunica também à DVLA a exportação definitiva através da parte correspondente do V5C.",
        "Conduzir com matrícula britânica até ao país de matrícula exige seguro e MOT válidos – um camião porta-automóveis é muitas vezes mais simples.",
      ],
    },
    {
      id: "duty",
      title: "Direito aduaneiro, TCA e IVA",
      paras: [
        "O Acordo de Comércio e Cooperação UE–Reino Unido (TCA) permite direito de 0%, mas apenas para carros que cumprem as regras de origem – na prática, fabricados no Reino Unido ou na UE. A origem prova-se com uma declaração de origem do exportador ou com o conhecimento do importador. Um carro japonês ou americano comprado no Reino Unido paga os 10% normais do valor aduaneiro.",
        "O IVA de importação do país de desalfandegamento é devido independentemente do direito. Ao comprar a um concessionário britânico, pergunte se a venda para exportação pode ser feita sem o IVA britânico – caso contrário paga IVA duas vezes.",
        "No país de matrícula aplicam-se os impostos nacionais baseados no motor, nas emissões ou no valor.",
      ],
    },
    {
      id: "adaptation",
      title: "Volante à direita e matrícula na UE",
      paras: [
        "Os carros britânicos foram construídos segundo as regras europeias de homologação, por isso têm muitas vezes Certificado de Conformidade (COC) e são mais fáceis de matricular do que os americanos. O que costuma faltar:",
        [
          "faróis para circulação pela direita,",
          "luz de nevoeiro traseira do lado correto,",
          "velocímetro com escala em km/h.",
        ],
        "A matrícula exige o V5C (ou comprovativo de exportação), a fatura, traduções certificadas, o documento de desalfandegamento, o comprovativo dos impostos nacionais e a inspeção técnica.",
      ],
    },
    {
      id: "mistakes",
      title: "Os erros mais comuns ao importar do Reino Unido",
      paras: [
        [
          "Partir do princípio de que depois do Brexit tudo está isento de direitos – os 0% aplicam-se apenas a carros que cumprem as regras de origem.",
          "Pagar o IVA britânico e o IVA de importação da UE sobre o mesmo carro.",
          "Comprar um carro Cat A ou Cat B.",
          "Não verificar o historial MOT nem um relatório HPI.",
          "Atravessar a fronteira sem declarações aduaneiras quando conduz o carro pessoalmente.",
        ],
      ],
    },
  ],
};

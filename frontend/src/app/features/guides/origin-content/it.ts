import { OriginDeep } from './types';

export const ORIGIN_DEEP: OriginDeep = {
  USA: [
    {
      id: "market",
      title: "Il mercato auto degli USA – cosa conviene importare",
      paras: [
        "Gli Stati Uniti sono il più grande mercato dell'usato al mondo: ogni anno vi cambiano proprietario circa 40 milioni di veicoli e diversi milioni passano dalle aste assicurative. Per questo molti modelli – soprattutto incidentati – costano nettamente meno che in Europa e la scelta di versioni è enorme.",
        "Conviene soprattutto importare auto rare o costose in Europa: muscle car con grandi V8 (Mustang, Camaro, Challenger), grandi SUV e pick-up, versioni premium ben accessoriate ed elettriche, che negli USA si svalutano in fretta. Con le compatte economiche, trasporto e tasse spesso annullano il risparmio.",
        "Il prezzo d'asta è solo l'inizio. Si aggiungono commissioni d'asta, trasporto al porto, nolo, assicurazione, dazio, IVA, imposte nazionali, adeguamento alle norme UE e l'eventuale riparazione. Solo il totale dice se l'importazione conviene: calcolalo prima di fare un'offerta, non dopo.",
      ],
    },
    {
      id: "auctions",
      title: "Aste Copart e IAAI – come comprare",
      paras: [
        "Copart e IAAI (Insurance Auto Auctions) vendono soprattutto auto di assicurazioni, noleggi e banche: incidentate, ritrovate dopo un furto, alluvionate o semplicemente dismesse da una flotta. Le offerte si fanno online, mentre l'auto si trova in uno delle centinaia di piazzali del paese. La posizione conta: determina costo e tempi del trasporto al porto.",
        "Un acquirente europeo di solito offre tramite un broker (intermediario con licenza d'asta), perché molte auto – soprattutto con titolo salvage – possono essere acquistate solo da acquirenti autorizzati. Il broker prende una commissione e spesso organizza anche trasporto e documenti di esportazione.",
        "Al prezzo di aggiudicazione si sommano le commissioni d'asta: una commissione acquirente che cresce a scaglioni col prezzo, una per le offerte online, una di uscita dal piazzale (gate fee), una ambientale e una per la gestione del titolo. Per un'auto da qualche migliaio di dollari si tratta in genere di alcune centinaia fino a oltre mille dollari.",
        "Il pagamento va fatto in tempi brevi – di solito pochi giorni lavorativi – e l'auto va ritirata prima che scattino i costi di deposito. Pagare in ritardo comporta una penale e il blocco dell'account: tieni pronti i soldi per auto e commissioni prima di offrire.",
      ],
    },
    {
      id: "titles",
      title: "Tipi di titolo: clean, salvage, rebuilt",
      paras: [
        "Negli USA la proprietà si dimostra con un titolo (title) rilasciato dallo Stato. Il suo tipo racconta la storia dell'auto ed è importante per acquisto ed esportazione:",
        [
          "Clean – nessuna perdita totale nella storia; il più caro ma il meno rischioso.",
          "Salvage – l'assicurazione ha dichiarato la perdita totale (il costo di riparazione superava una quota del valore). Il titolo più comune su Copart e IAAI.",
          "Rebuilt / Reconstructed – ex perdita totale riparata e di nuovo ammessa alla circolazione negli USA.",
          "Non-repairable, Certificate of Destruction, Parts only, Junk – solo per ricambi. Non comprare queste auto per guidarle: esportazione e immatricolazione nell'UE possono essere impossibili o molto difficili.",
        ],
        "Nell'Unione europea le indicazioni del titolo americano non passano sulla carta di circolazione. Un'auto salvage può essere immatricolata se, dopo la riparazione, supera la revisione. Il titolo influisce però sul valore di rivendita e soprattutto indica che l'auto ha subito un danno grave, da riparare a regola d'arte.",
      ],
    },
    {
      id: "inspection",
      title: "Come controllare un'auto prima dell'asta",
      paras: [
        "All'asta non vedi l'auto di persona, quindi ogni dettaglio dell'annuncio conta. Prima di offrire:",
        [
          "Controlla lo storico del VIN (ad es. Carfax, AutoCheck, banca dati NMVTIS): danni, chilometraggio, numero di proprietari, furto e allagamento.",
          "Analizza foto e descrizione del danno (primary / secondary damage). «Front end» può andare dal paraurti ai longheroni piegati e agli airbag esplosi.",
          "Leggi bene le indicazioni sullo stato: «Run and Drive» significa che l'auto si è mossa all'arrivo al piazzale, non che sia in grado di circolare; «Engine Starts» solo che il motore si è avviato.",
          "Attenzione alle auto da zone di uragani e alluvioni (Florida, Texas, Louisiana). Segni d'acqua sotto la moquette, fango e connettori elettrici corrosi sono un motivo per rinunciare.",
          "Il chilometraggio è in miglia (1 miglio = 1,61 km) e può essere indicato come «not actual» o «exempt»: in quel caso il contachilometri non è affidabile.",
        ],
        "È saggio prevedere un margine per i danni nascosti, fino al 20–30% del costo di riparazione stimato. Chiedi il prezzo dei ricambi in Europa o negli USA prima di fissare l'offerta massima.",
      ],
    },
    {
      id: "shipping",
      title: "Esportazione e trasporto via mare",
      paras: [
        "Dopo l'acquisto, una bisarca porta l'auto dal piazzale al porto di esportazione. I porti più usati sono New Jersey/New York, Savannah (Georgia), Baltimora, Houston e Los Angeles/Long Beach. Dalla costa est la traversata verso i porti del Mare del Nord dura in genere 2–3 settimane; dalla California attraverso il canale di Panama fino a 5–6 settimane.",
        "Per esportare servono il titolo originale (o una copia autenticata) e la fattura. L'esportatore presenta la Electronic Export Information (EEI) nel sistema AES – obbligatoria per i veicoli usati qualunque sia il valore – e auto e documenti vanno presentati alla dogana americana (CBP) almeno 72 ore prima della partenza della nave.",
        "Esistono tre modalità di trasporto:",
        [
          "Container condiviso (di solito 3–4 auto in un container da 40 piedi): il più diffuso, adatto ad auto incidentate e non marcianti.",
          "Container esclusivo: più caro, ma l'auto viaggia da sola e puoi aggiungere ricambi.",
          "RoRo (nave roll-on/roll-off): spesso il più economico, ma solo per auto marcianti e con meno protezione dai danni.",
        ],
        "Conviene un'assicurazione sul trasporto, in genere l'1,5–2% del valore dell'auto. Nel porto UE il container viene scaricato e uno spedizioniere doganale sdogana l'auto. Scarico, terminal e agenzia si pagano nel porto di destinazione.",
      ],
    },
    {
      id: "duty",
      title: "Dazio, origine e sdoganamento nell'UE",
      paras: [
        "Il dazio standard UE sulle autovetture è del 10% del valore in dogana, cioè il prezzo dell'auto con le commissioni d'asta più trasporto e assicurazione fino al confine UE (valore CIF). I pick-up possono essere classificati come veicoli commerciali – e allora il dazio è del 22% – mentre le moto pagano il 6–8%.",
        "Dal 1° luglio 2026 alla fine del 2029 le auto prodotte negli USA possono entrare nell'UE con dazio 0% (regolamento (UE) 2026/1455). Condizione: dimostrare alla dogana l'origine americana dell'auto, che deve essere spedita direttamente dagli USA. Una fattura o un'etichetta «Made in USA» da sole non bastano: serve una prova d'origine. Il VIN dà un indizio: le auto costruite negli USA hanno un VIN che inizia con 1, 4 o 5. Anche un marchio giapponese o tedesco assemblato in America può rientrare; una BMW costruita in Europa e comprata negli USA no.",
        "L'IVA all'importazione si applica con l'aliquota del paese di sdoganamento. La base è il valore in dogana più dazio e costi di trasporto fino alla destinazione nell'UE. Le imprese possono usare il regime doganale 4200: sdoganare in un paese e assolvere l'IVA nel paese di immatricolazione.",
        "Dopo lo sdoganamento arrivano le imposte nazionali: a seconda del paese un'accisa (ad es. in Polonia il 3,1% o il 18,6% in base alla cilindrata), una tassa di immatricolazione basata su CO₂, potenza o valore, oppure nulla. Spesso sono loro a decidere se l'importazione conviene.",
      ],
    },
    {
      id: "adaptation",
      title: "Adeguamento alle norme UE e immatricolazione",
      paras: [
        "Le auto del mercato americano non rispettano alcune norme tecniche europee e vanno modificate prima della revisione:",
        [
          "Gli indicatori di direzione posteriori devono essere arancioni: su molte auto americane lampeggiano le luci di stop rosse.",
          "È obbligatorio il fendinebbia posteriore.",
          "I fari devono avere il fascio anabbagliante europeo ed essere regolati correttamente.",
          "Il tachimetro deve indicare i km/h (di solito basta la doppia scala).",
          "I sensori di pressione degli pneumatici (TPMS) americani funzionano a 315 MHz: in Europa è diffuso il 433 MHz, cosa che conta quando si cambiano le ruote.",
        ],
        "L'adeguamento delle luci costa in genere qualche centinaio di euro. In alcuni paesi – ad es. Germania o Francia – un'auto extra UE richiede inoltre un'omologazione individuale o una perizia, che costa tempo e denaro.",
        "Per l'immatricolazione prepara le traduzioni giurate di titolo e fattura, il documento di sdoganamento, la prova del pagamento delle imposte nazionali e l'esito della revisione. Molti paesi fissano un termine di legge per immatricolare un'auto importata: in Polonia, ad esempio, 30 giorni.",
      ],
    },
    {
      id: "mistakes",
      title: "Gli errori più comuni nell'import dagli USA",
      paras: [
        [
          "Fare offerte senza calcolare il costo totale: commissioni, trasporto e tasse possono raddoppiare il prezzo d'asta.",
          "Comprare un'auto con titolo «parts only» o certificate of destruction, che non si può immatricolare legalmente.",
          "Fidarsi di «Run and Drive» senza controllare lo storico del VIN.",
          "Nessun margine per danni nascosti e ricambi: riparare un'auto incidentata costa quasi sempre più di quanto mostrino le foto.",
          "Contare sul dazio 0% senza prova dell'origine americana: senza, paghi il 10%.",
          "Pagare l'asta in ritardo e accumulare costi di deposito nel piazzale.",
          "Superare il termine per l'immatricolazione o per la dichiarazione delle imposte nazionali dopo l'arrivo dell'auto.",
        ],
      ],
    },
  ],
  CANADA: [
    {
      id: "market",
      title: "Il mercato auto del Canada – in cosa differisce dagli USA",
      paras: [
        "Il Canada è un mercato più piccolo degli USA ma con un'offerta molto simile: stessi marchi, modelli e allestimenti, spesso un po' più economici che in Europa. Molti lo considerano un'alternativa agli USA, soprattutto per le auto prodotte in stabilimenti canadesi, che possono beneficiare dell'accordo CETA.",
        "Le auto canadesi hanno alcuni vantaggi: contachilometri in chilometri, luci diurne di serie e dotazioni per l'inverno (sedili riscaldati, a volte preriscaldatore motore). Il punto debole può essere la ruggine: d'inverno le strade sono molto salate e il sottoscocca di un'auto dell'Ontario o del Québec può essere messo peggio di quello di un'auto del sud degli USA.",
        "Dal Canada si importano soprattutto SUV e pick-up, auto prodotte localmente (ad es. Toyota RAV4, Lexus RX, Honda CR-V e Civic, Chrysler Pacifica) e auto ex leasing con pochi chilometri.",
      ],
    },
    {
      id: "auctions",
      title: "Dove comprare un'auto in Canada",
      paras: [
        "Le auto incidentate in Canada sono vendute da Copart Canada e IAA (già Impact Auto Auctions), quelle non incidentate da aste per operatori come ADESA e dai concessionari. Come negli USA, a molte aste si accede solo tramite un broker con licenza.",
        "Sono diffusi anche gli acquisti da concessionari e privati tramite portali di annunci. In un acquisto privato devi occuparti tu dei documenti di esportazione e del trasporto al porto: per questo la maggior parte degli acquirenti europei si affida a una società di esportazione che ritira l'auto, controlla i documenti e la imbarca.",
        "Al prezzo si aggiungono commissioni d'asta o del concessionario e – dal concessionario – le imposte canadesi sulle vendite (GST/HST/PST). Una parte può essere rimborsata o non applicata se il concessionario vende direttamente per l'esportazione: chiedilo prima di comprare.",
      ],
    },
    {
      id: "titles",
      title: "Documenti di proprietà e stati di danno",
      paras: [
        "In Canada non esiste il «title» all'americana: il documento è l'immatricolazione rilasciata dalla provincia (in Ontario l'«ownership»). Lo stato di danno è annotato nel registro provinciale:",
        [
          "Ontario e la maggior parte delle province: Normal, Salvage (perdita totale non ammessa alla circolazione), Rebuilt (riparata e approvata dopo ispezione) e Irreparable – solo ricambi.",
          "Québec: veicoli gravemente incidentati (VGA – véhicule gravement accidenté) con la dicitura «reconstruit» (ricostruito) o «irrécupérable» (irrecuperabile).",
        ],
        "Non comprare per guidarle auto irreparable o irrécupérable: non si possono immatricolare legalmente. Gli altri stati non passano sulla carta di circolazione europea, ma influiscono sul valore e segnalano un danno grave.",
      ],
    },
    {
      id: "inspection",
      title: "Come controllare un'auto dal Canada",
      paras: [
        [
          "Storico del VIN: un report CARFAX Canada mostra danni, immatricolazioni nelle province e chilometraggio; per auto arrivate dagli USA controlla anche lo storico americano.",
          "Gravami (liens): in Canada un'auto può essere a garanzia di un prestito. Verifica nel registro delle garanzie della provincia (ad es. PPSA) che sia libera da vincoli, altrimenti l'esportazione può essere bloccata e potresti persino perdere l'auto.",
          "Ruggine: chiedi foto di sottoscocca, longheroni sottoporta, passaruota e tubi dei freni: il sale stradale lascia il segno.",
          "Versione di mercato: le auto canadesi sono in genere molto simili a quelle americane e richiedono modifiche simili alle luci.",
        ],
        "Per le auto all'asta valgono le stesse regole degli USA: foto dei danni, significato di «Run and Drive» e margine per i danni nascosti.",
      ],
    },
    {
      id: "shipping",
      title: "Esportazione e trasporto via mare dal Canada",
      paras: [
        "I porti più usati sono Halifax e Montréal a est e Vancouver a ovest. Dalla costa est la nave verso i porti del Mare del Nord impiega di solito circa 2 settimane, una delle rotte più rapide per l'Europa. Le auto dell'ovest viaggiano spesso in treno verso est o partono da Vancouver attraverso il canale di Panama, con tempi più lunghi.",
        "Per esportare servono il documento di proprietà (immatricolazione provinciale), la prova d'acquisto e una dichiarazione di esportazione nel sistema della CBSA (CERS), di solito presentata dall'esportatore o dallo spedizioniere. L'auto deve essere libera da gravami.",
        "Le modalità di trasporto sono le stesse degli USA: container condiviso, container esclusivo o RoRo per le auto marcianti. D'inverno considera possibili ritardi nel trasporto via terra fino al porto.",
      ],
    },
    {
      id: "duty",
      title: "Dazio e accordo CETA",
      paras: [
        "Grazie all'accordo commerciale UE–Canada (CETA), le auto prodotte in Canada possono entrare nell'UE con dazio 0%. La condizione è l'origine canadese confermata da una dichiarazione di origine dell'esportatore. Comprare in Canada non basta: molte auto vendute lì sono costruite negli USA, in Messico o in Giappone e pagano il 10% pieno.",
        "Un VIN che inizia con «2» indica un'auto costruita in Canada. È un buon indizio ma non una prova: comprando da un privato è spesso difficile ottenere la dichiarazione di origine e senza di essa il dazio è del 10% del valore in dogana (CIF). I pick-up classificati come commerciali pagano il 22%.",
        "Sul dazio si applica l'IVA all'importazione del paese di sdoganamento e, nel paese di immatricolazione, le imposte nazionali (accisa o tassa di immatricolazione). Le imprese possono usare il regime 4200 e assolvere l'IVA nel paese di destinazione.",
      ],
    },
    {
      id: "adaptation",
      title: "Adeguamento alle norme UE e immatricolazione",
      paras: [
        "Le auto canadesi sono un po' più facili da immatricolare di quelle americane: hanno tachimetro in km/h e luci diurne di serie. Di solito bisogna comunque:",
        [
          "passare gli indicatori posteriori all'arancione se lampeggiano le luci di stop,",
          "aggiungere un fendinebbia posteriore,",
          "adattare i fari al fascio anabbagliante europeo.",
        ],
        "Per l'immatricolazione servono traduzioni giurate, il documento di sdoganamento, la prova delle imposte nazionali e la revisione. Paesi come Germania o Francia possono richiedere un'omologazione individuale.",
      ],
    },
    {
      id: "mistakes",
      title: "Gli errori più comuni nell'import dal Canada",
      paras: [
        [
          "Pensare che ogni auto dal Canada paghi dazio 0%: vale solo per auto prodotte in Canada con dichiarazione di origine.",
          "Non verificare i gravami (liens) prima dell'acquisto.",
          "Trascurare la ruggine del sottoscocca su auto di province con inverni rigidi.",
          "Comprare un'auto con stato irreparable o irrécupérable.",
          "Sottovalutare il trasporto via terra dalle province occidentali ai porti dell'est.",
        ],
      ],
    },
  ],
  JAPAN: [
    {
      id: "market",
      title: "Il mercato auto del Giappone – perché JDM",
      paras: [
        "Il Giappone è famoso per auto in ottime condizioni tecniche e con pochi chilometri. Il motivo è la severa revisione shaken, sempre più cara con l'età del veicolo: molti giapponesi vendono dopo pochi anni e i prezzi delle auto più vecchie scendono rapidamente.",
        "Dal Giappone si importano soprattutto auto JDM (Japanese Domestic Market): leggende sportive (Nissan Skyline GT-R, Toyota Supra, Mazda RX-7, Honda NSX), fuoristrada (Toyota Land Cruiser), monovolume e ibride recenti. Per i collezionisti contano soprattutto i modelli mai venduti ufficialmente in Europa.",
        "Tutte le auto del mercato giapponese hanno la guida a destra. Si possono immatricolare nell'UE, ma guidarle con il traffico a destra è meno comodo e possono essere più difficili da rivendere, tranne i modelli da collezione ricercati.",
      ],
    },
    {
      id: "auctions",
      title: "Le aste in Giappone – USS e le altre",
      paras: [
        "La maggior parte delle auto usate in Giappone passa da aste per operatori. La più grande è la rete USS, accanto tra le altre a TAA, CAA, HAA, JU e Arai. Ogni settimana vi si offrono decine di migliaia di auto.",
        "Un acquirente straniero non partecipa direttamente: lo fa un esportatore giapponese (agente d'asta), che ha accesso alle aste, traduce il foglio d'asta, compra l'auto, la radia per l'export e la spedisce. Al prezzo di aggiudicazione si sommano commissione d'asta, commissione dell'esportatore, trasporto interno al porto e documenti di esportazione. Si paga di solito in yen.",
        "Si può anche comprare dallo stock di un esportatore: può costare di più, ma l'auto è già controllata e spesso aspetta al porto.",
      ],
    },
    {
      id: "titles",
      title: "Come leggere un foglio d'asta giapponese",
      paras: [
        "Il foglio d'asta (auction sheet) è il rapporto dell'ispettore dell'asta: la fonte d'informazioni più importante sull'auto. Contiene un voto complessivo, un voto degli interni e una mappa dei danni della carrozzeria.",
        [
          "Voto complessivo: S o 6 – praticamente nuova; 5 e 4,5 – ottime condizioni; 4 – buone condizioni con lievi segni d'uso; 3,5 e 3 – difetti visibili o più chilometri; R o RA – incidente riparato (RA – riparazione minore); 0 o *** – danneggiata, alluvionata o senza voto.",
          "Voto interni: da A (come nuovi) a E (molto usurati).",
          "Mappa dei danni: A – graffio, U – ammaccatura, B – ammaccatura con graffio, W – ondulazione o segni di riparazione, S e C – ruggine e corrosione, P – segni di vernice, X – pezzo da sostituire, XX – pezzo sostituito, Y – crepa o foro. Il numero accanto alla lettera (1–3) indica l'entità del danno.",
        ],
        "Il foglio riporta anche il chilometraggio verificato dall'asta, la dotazione e le note dell'ispettore in giapponese: un buon esportatore le traduce prima dell'offerta.",
      ],
    },
    {
      id: "inspection",
      title: "A cosa fare attenzione con le auto giapponesi",
      paras: [
        [
          "Chilometraggio: le auto giapponesi hanno di solito chilometri reali e bassi, ma verificane lo storico sul foglio d'asta e sul certificato di esportazione.",
          "Ruggine: le auto del nord (Hokkaido) e delle zone costiere possono essere corrose dal sale; guarda le foto del sottoscocca.",
          "Modifiche: le sportive hanno spesso sospensioni, scarico e motore modificati, cosa che può complicare la revisione nell'UE.",
          "Limitatori: molte auto JDM hanno un limitatore di fabbrica a 180 km/h.",
          "Elettronica: le autoradio giapponesi usano la banda FM 76–90 MHz, navigatore e menu sono in giapponese e il dispositivo di pedaggio ETC in Europa è inutile.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Esportazione e trasporto dal Giappone",
      paras: [
        "Dopo l'acquisto l'esportatore radia l'auto e ottiene il certificato di esportazione (Export Certificate), il documento che sostituisce l'immatricolazione, con i dati del veicolo e il chilometraggio. Serve per lo sdoganamento e l'immatricolazione nell'UE, insieme a fattura e polizza di carico (B/L).",
        "Le auto partono soprattutto da Yokohama, Nagoya, Kobe e Osaka. Le navi RoRo per l'Europa impiegano di solito 5–7 settimane (via canale di Suez o circumnavigando l'Africa), i container altrettanto o poco di più. Il container è una buona scelta per auto di valore o non marcianti.",
        "I porti di destinazione più comuni sono Bremerhaven, Rotterdam, Anversa e Zeebrugge. Conviene assicurare il trasporto: su una traversata lunga il rischio di danni è maggiore.",
      ],
    },
    {
      id: "duty",
      title: "Dazio e accordo UE–Giappone",
      paras: [
        "L'Accordo di partenariato economico UE–Giappone (APE) ha eliminato gradualmente il dazio sulle auto: dal 2026 le auto di origine giapponese possono entrare nell'UE con dazio 0%. L'origine si dimostra con una dichiarazione di origine dell'esportatore o con la conoscenza dell'importatore (documenti che provano che l'auto è stata costruita in Giappone).",
        "Le auto JDM costruite in Giappone di solito rientrano. Attenzione ai marchi giapponesi costruiti altrove (ad es. negli USA o in Thailandia): pagano il 10% standard del valore in dogana. Senza prova d'origine il dazio è comunque del 10%.",
        "Le auto con oltre 30 anni in condizioni originali possono essere considerate veicoli da collezione: il dazio è allora dello 0% e alcuni paesi applicano un'IVA ridotta. Dopo lo sdoganamento, nel paese di immatricolazione si applicano le imposte nazionali in base a motore, emissioni o valore.",
      ],
    },
    {
      id: "adaptation",
      title: "Guida a destra – immatricolazione nell'UE",
      paras: [
        "Le auto con guida a destra possono essere immatricolate nei paesi UE se rispettano i requisiti tecnici. Le modifiche principali sono:",
        [
          "fari per la circolazione a destra (regolazione o sostituzione dei gruppi ottici),",
          "fendinebbia posteriore sul lato corretto e indicatori arancioni (le auto giapponesi di solito li hanno già),",
          "tachimetro in km/h: le auto giapponesi lo hanno di serie.",
        ],
        "Alcuni paesi, come la Germania, richiedono un'omologazione individuale o una perizia. Per l'immatricolazione servono le traduzioni del certificato di esportazione e della fattura, il documento di sdoganamento, la prova delle imposte nazionali e la revisione.",
      ],
    },
    {
      id: "mistakes",
      title: "Gli errori più comuni nell'import dal Giappone",
      paras: [
        [
          "Fare offerte senza il foglio d'asta tradotto.",
          "Sottovalutare i tempi: dall'acquisto all'immatricolazione passano spesso 2–3 mesi.",
          "Contare sul dazio 0% per un marchio giapponese costruito fuori dal Giappone.",
          "Dimenticare il costo dell'adeguamento delle luci e di un'eventuale omologazione individuale.",
          "Comprare un'auto molto modificata che non passerà la revisione.",
          "Non assicurare la lunga traversata.",
        ],
      ],
    },
  ],
  UAE: [
    {
      id: "market",
      title: "Il mercato auto degli Emirati Arabi Uniti",
      paras: [
        "Dubai e gli altri emirati sono tra i maggiori mercati di auto di lusso al mondo. La forte domanda di auto nuove riempie il mercato dell'usato di SUV, sportive e berline premium di pochi anni, spesso più economiche che in Europa.",
        "La maggior parte delle auto vendute negli Emirati sono versioni GCC (Gulf Cooperation Council), pensate per il caldo: climatizzazione e raffreddamento potenziati, a volte dotazioni diverse da quelle europee. Ci sono anche molte auto arrivate dagli USA – spesso incidentate – rivendute come «import».",
        "Dagli Emirati si importano soprattutto grandi SUV (Nissan Patrol, Toyota Land Cruiser, Lexus LX), auto di lusso e sportive. Con le auto più chilometrate bisogna tener conto degli effetti del clima.",
      ],
    },
    {
      id: "auctions",
      title: "Dove comprare un'auto negli Emirati",
      paras: [
        "Si compra dai concessionari (anche nei programmi di usato certificato dei marchi), alle aste come Emirates Auction e Copart EAU e dagli annunci. A Dubai c'è inoltre un grande mercato dell'usato con molte società di esportazione al servizio degli acquirenti stranieri.",
        "Comprando dall'estero, la via più sicura è un esportatore affidabile: controlla auto e documenti, la radia, ottiene il certificato di esportazione e la spedisce.",
      ],
    },
    {
      id: "titles",
      title: "Documenti: Mulkiya e certificato di esportazione",
      paras: [
        "Il documento di immatricolazione negli Emirati è la carta Mulkiya rilasciata dall'autorità dei trasporti (a Dubai la RTA). Per l'esportazione l'auto va radiata e va ottenuto un certificato di esportazione (spesso con targhe export): il documento chiave per lo sdoganamento nell'UE.",
        "L'auto non deve avere multe non pagate né vincoli bancari. Negli Emirati molte auto si comprano a rate: prima dell'acquisto verifica che il finanziamento sia estinto e che la banca abbia autorizzato l'esportazione.",
      ],
    },
    {
      id: "inspection",
      title: "Come controllare un'auto dagli Emirati",
      paras: [
        [
          "Origine: verifica con il VIN se l'auto è una versione GCC o arriva dagli USA. Un VIN che inizia con 1, 4 o 5 indica un'auto costruita negli USA: in quel caso controllane lo storico americano (danni, titolo salvage).",
          "Allagamento: dopo i nubifragi del 2024 sono arrivate sul mercato molte auto alluvionate. Cerca segni d'acqua, fango e corrosione nell'abitacolo e nell'elettronica.",
          "Danni da clima: le alte temperature usurano guarnizioni in gomma, plastiche, batterie, pneumatici e climatizzatore.",
          "Storico di manutenzione: le auto dei concessionari hanno di solito una documentazione completa, un grande vantaggio alla rivendita.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Esportazione e trasporto dagli Emirati",
      paras: [
        "Il porto principale è Jebel Ali a Dubai. La traversata verso i porti europei dura di solito 3–5 settimane, a seconda della rotta (Mar Rosso e canale di Suez o circumnavigazione dell'Africa) e del porto di destinazione. Le auto viaggiano in container o su navi RoRo.",
        "Per lo sdoganamento nell'UE servono certificato di esportazione, fattura e polizza di carico (B/L). Per le auto arrivate negli Emirati dagli USA sono utili anche i documenti dello storico americano.",
      ],
    },
    {
      id: "duty",
      title: "Dazio sull'import dagli Emirati",
      paras: [
        "L'UE non ha con gli Emirati alcun accordo che riduca il dazio sulle auto: le auto degli Emirati pagano quindi il 10% standard del valore in dogana (CIF) e i pick-up classificati come commerciali il 22%. Vale anche per le auto costruite negli USA: il dazio 0% sulle auto americane richiede la spedizione diretta dagli USA.",
        "Sul dazio si applica l'IVA all'importazione del paese di sdoganamento e, nel paese di immatricolazione, le imposte nazionali. Le auto con oltre 30 anni in condizioni originali possono essere considerate da collezione, con dazio 0%.",
      ],
    },
    {
      id: "adaptation",
      title: "Adeguamento alle norme UE e immatricolazione",
      paras: [
        "Le versioni GCC hanno la guida a sinistra, tachimetro in km/h e in genere un'illuminazione vicina a quella europea, quindi le modifiche sono spesso minori che sulle auto americane. Controlla comunque indicatori, fendinebbia posteriore e fari.",
        "Le auto portate negli Emirati dagli USA hanno specifiche americane e richiedono le stesse modifiche delle auto comprate direttamente in America. Alcuni paesi UE richiedono un'omologazione individuale.",
      ],
    },
    {
      id: "mistakes",
      title: "Gli errori più comuni nell'import dagli Emirati",
      paras: [
        [
          "Comprare un'auto americana venduta come «GCC» senza controllare VIN e storico.",
          "Un finanziamento o multe non pagate che bloccano l'esportazione.",
          "Non notare segni di allagamento e danni da calore.",
          "Contare sul dazio 0%: le auto degli Emirati pagano il 10% standard.",
        ],
      ],
    },
  ],
  UK: [
    {
      id: "market",
      title: "Il mercato auto del Regno Unito dopo la Brexit",
      paras: [
        "Il Regno Unito è un grande mercato dell'usato con un'offerta enorme di auto premium, sportive e d'epoca. Dalla Brexit è un paese terzo per l'UE, quindi l'importazione richiede lo sdoganamento; ma grazie all'Accordo sugli scambi commerciali e la cooperazione UE–Regno Unito (TCA), le auto che rispettano le regole di origine possono entrare con dazio 0%.",
        "Tutte le auto britanniche hanno la guida a destra. Per questo si importano soprattutto auto per cui questo conta poco o particolarmente convenienti: auto d'epoca, da collezione, versioni rare e premium. È diffuso anche il rientro di auto di marchi europei finite in precedenza nel Regno Unito.",
      ],
    },
    {
      id: "auctions",
      title: "Dove comprare un'auto nel Regno Unito",
      paras: [
        "Si compra dai concessionari, dagli annunci (ad es. Auto Trader) e alle aste: per operatori (BCA, Manheim) e di veicoli incidentati (Copart UK). Molte auto hanno uno storico di manutenzione documentato.",
        "Alle aste di incidentate le auto riportano una categoria di danno da conoscere prima dell'acquisto.",
      ],
    },
    {
      id: "titles",
      title: "Categorie di danno e il V5C",
      paras: [
        "Il documento di immatricolazione è il V5C (logbook). Nel Regno Unito le perdite totali ricevono una categoria:",
        [
          "Cat S – danno strutturale (ad es. longheroni, montanti); l'auto può essere riparata e tornare su strada.",
          "Cat N – danno non strutturale (ad es. elettronica, pannelli di carrozzeria); l'auto può essere riparata.",
          "Cat B – solo ricambi, la scocca va distrutta.",
          "Cat A – solo demolizione.",
        ],
        "Non comprare per guidarle auto di categoria A o B. Le categorie S e N indicano un danno grave passato: verifica la qualità della riparazione.",
      ],
    },
    {
      id: "inspection",
      title: "Come controllare un'auto dal Regno Unito",
      paras: [
        [
          "Storico MOT: sul sito governativo gov.uk puoi consultare gratis, con la targa, tutte le revisioni MOT, con il chilometraggio di ogni anno e l'elenco dei difetti. È il modo migliore per scoprire un contachilometri scalato.",
          "Report HPI (o simile): mostra finanziamenti in corso, furto e se l'auto è stata registrata come perdita totale.",
          "Storico di manutenzione e numero di proprietari dal V5C.",
          "Chilometraggio in miglia: per l'immatricolazione nell'UE il tachimetro deve indicare anche i km/h.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Esportazione e trasporto dal Regno Unito",
      paras: [
        "La maggior parte delle auto attraversa la Manica in traghetto o in treno (Dover–Calais, Eurotunnel), su bisarca o guidando. Il trasporto richiede di solito da qualche giorno a una settimana. Le auto dalla Scozia o dal nord dell'Inghilterra possono anche viaggiare su navi RoRo verso porti del Benelux e della Germania.",
        "Dalla Brexit servono due dichiarazioni doganali: una di esportazione nel Regno Unito e una di importazione nell'UE, anche se guidi tu l'auto. Di solito se ne occupa uno spedizioniere doganale al terminal. Il proprietario comunica inoltre alla DVLA l'esportazione definitiva tramite la parte apposita del V5C.",
        "Guidare con targa britannica fino al paese di immatricolazione richiede assicurazione e MOT validi: spesso la bisarca è più semplice.",
      ],
    },
    {
      id: "duty",
      title: "Dazio, TCA e IVA",
      paras: [
        "L'Accordo sugli scambi commerciali e la cooperazione UE–Regno Unito (TCA) consente il dazio 0%, ma solo per auto che rispettano le regole di origine, cioè in pratica costruite nel Regno Unito o nell'UE. L'origine si dimostra con una dichiarazione di origine dell'esportatore o con la conoscenza dell'importatore. Un'auto giapponese o americana comprata nel Regno Unito paga il 10% standard del valore in dogana.",
        "Indipendentemente dal dazio si paga l'IVA all'importazione del paese di sdoganamento. Comprando da un concessionario britannico, chiedi se la vendita per l'esportazione può avvenire senza IVA britannica: altrimenti pagherai l'IVA due volte.",
        "Nel paese di immatricolazione si aggiungono le imposte nazionali in base a motore, emissioni o valore.",
      ],
    },
    {
      id: "adaptation",
      title: "Guida a destra e immatricolazione nell'UE",
      paras: [
        "Le auto britanniche sono state costruite secondo le regole europee di omologazione, quindi spesso hanno il certificato di conformità (COC) e si immatricolano più facilmente di quelle americane. Di solito resta da fare:",
        [
          "fari per la circolazione a destra,",
          "fendinebbia posteriore sul lato corretto,",
          "tachimetro con scala in km/h.",
        ],
        "Per l'immatricolazione servono il V5C (o la prova di esportazione), la fattura, le traduzioni giurate, il documento di sdoganamento, la prova delle imposte nazionali e la revisione.",
      ],
    },
    {
      id: "mistakes",
      title: "Gli errori più comuni nell'import dal Regno Unito",
      paras: [
        [
          "Pensare che dopo la Brexit sia tutto esente da dazio: lo 0% vale solo per auto che rispettano le regole di origine.",
          "Pagare l'IVA britannica e l'IVA all'importazione UE sulla stessa auto.",
          "Comprare un'auto di categoria A o B.",
          "Non controllare lo storico MOT e un report HPI.",
          "Attraversare il confine senza dichiarazioni doganali guidando tu l'auto.",
        ],
      ],
    },
  ],
};

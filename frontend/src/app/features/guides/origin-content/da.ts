import { OriginDeep } from './types';

export const ORIGIN_DEEP: OriginDeep = {
  USA: [
    {
      id: "market",
      title: "Det amerikanske bilmarked – hvad kan betale sig at importere",
      paras: [
        "USA er verdens største marked for brugte biler: omkring 40 millioner køretøjer skifter ejer hvert år, og flere millioner går gennem forsikringsauktioner. Derfor er mange modeller – især skadede – markant billigere end i Europa, og udvalget af versioner er enormt.",
        "Det betaler sig som regel at importere biler, der er sjældne eller dyre i Europa: muscle cars med store V8-motorer (Mustang, Camaro, Challenger), store SUV'er og pickupper, veludstyrede premiumversioner og elbiler, som taber værdi hurtigt i USA. På billigere småbiler æder fragt og afgifter ofte besparelsen.",
        "Husk, at auktionsprisen kun er begyndelsen. Oveni kommer auktionsgebyrer, transport til havnen, søfragt, forsikring, told, moms, nationale afgifter, EU-tilpasning og eventuel reparation. Først totalen viser, om importen kan betale sig – så regn efter, før du byder, ikke bagefter.",
      ],
    },
    {
      id: "auctions",
      title: "Auktionerne Copart og IAAI – sådan køber du",
      paras: [
        "Copart og IAAI (Insurance Auto Auctions) sælger primært biler fra forsikringsselskaber, biludlejere og banker – skadede, fundet efter tyveri, oversvømmede eller blot udfaset fra flåder. Budgivningen foregår online, mens bilen står på en af flere hundrede pladser landet over. Placeringen betyder noget: den afgør pris og tid for transporten til havnen.",
        "En køber fra Europa byder typisk via en broker (mellemmand med auktionslicens), fordi mange biler – især med salvage-title – kun må købes af licenserede købere. Brokeren tager kommission og ordner ofte også transport og eksportpapirer.",
        "Oven i hammerslaget kommer auktionsgebyrer: et købergebyr, der stiger trinvist med prisen, et gebyr for onlinebud, et gate fee for at få bilen udleveret, et miljøgebyr og et gebyr for håndtering af title. For en bil til nogle tusinde dollars er det typisk fra nogle hundrede til over tusind dollars i alt.",
        "Betalingen skal ske inden for kort tid – oftest nogle få hverdage – og bilen skal hentes, før der begynder at løbe opbevaringsgebyrer på. For sen betaling betyder bøde og spærret konto, så hav pengene til bil og gebyrer klar, før du byder.",
      ],
    },
    {
      id: "titles",
      title: "Typer af title: clean, salvage, rebuilt",
      paras: [
        "I USA dokumenteres ejerskab med en title udstedt af delstaten. Typen fortæller bilens historie og har betydning for køb og eksport:",
        [
          "Clean – ingen totalskade i bilens historik; dyrest, men mindst risikabel.",
          "Salvage – forsikringsselskabet har erklæret bilen totalskadet (reparationsprisen oversteg en vis andel af bilens værdi). Den mest almindelige title på Copart og IAAI.",
          "Rebuilt / Reconstructed – en tidligere totalskade, der er repareret og igen godkendt til kørsel i USA.",
          "Non-repairable, Certificate of Destruction, Parts only, Junk – kun til reservedele. Køb dem ikke for at køre i dem: eksport og registrering i EU kan være umulig eller meget svær.",
        ],
        "I EU overføres den amerikanske title-mærkning ikke til registreringsattesten. En salvage-bil kan registreres, hvis den består synet efter reparation. Title påvirker dog gensalgsværdien og viser frem for alt, at bilen har haft alvorlige skader – som skal være repareret ordentligt.",
      ],
    },
    {
      id: "inspection",
      title: "Sådan tjekker du bilen, før du byder",
      paras: [
        "Du kan ikke se bilen selv på auktionen, så hver detalje i annoncen tæller. Før du byder:",
        [
          "Tjek historikken via VIN (fx Carfax, AutoCheck, NMVTIS-databasen): skader, kilometerstand, antal ejere, tyveri og oversvømmelse.",
          "Gennemgå billederne og skadesbeskrivelsen (primary / secondary damage). ”Front end” kan betyde alt fra en kofanger til bøjede længdevanger og udløste airbags.",
          "Læs tilstandsmærkerne grundigt: ”Run and Drive” betyder, at bilen kunne køre, da den ankom til pladsen, ikke at den er køreklar; ”Engine Starts” betyder kun, at motoren startede.",
          "Vær forsigtig med biler fra orkan- og oversvømmelsesområder (Florida, Texas, Louisiana). Vandmærker under tæppet, slam og korroderede elstik er grund til at trække sig.",
          "Kilometerstanden er i miles (1 mile = 1,61 km) og kan være markeret ”not actual” eller ”exempt” – så kan man ikke stole på tælleren.",
        ],
        "Det er klogt at have en buffer til skjulte skader – op til 20–30 % af den anslåede reparationspris. Indhent priser på dele fra Europa eller USA, før du fastsætter dit maksimumbud.",
      ],
    },
    {
      id: "shipping",
      title: "Eksport og søfragt",
      paras: [
        "Efter købet kører en autotransporter bilen fra pladsen til eksporthavnen. De mest brugte havne er New Jersey/New York, Savannah (Georgia), Baltimore, Houston og Los Angeles/Long Beach. Fra østkysten tager sejladsen til Nordsøhavnene typisk 2–3 uger, fra Californien gennem Panamakanalen op til 5–6 uger.",
        "Eksport kræver original title (eller bekræftet kopi) og fakturaen. Eksportøren indsender Electronic Export Information (EEI) i AES – obligatorisk for brugte køretøjer uanset værdi – og bil og dokumenter skal fremvises for det amerikanske toldvæsen (CBP) mindst 72 timer før skibets afgang.",
        "Der er tre måder at fragte på:",
        [
          "Delt container (typisk 3–4 biler i en 40-fods container) – den mest populære, egnet til skadede og ikke-kørende biler.",
          "Egen container – dyrere, men bilen rejser alene, og du kan lægge dele med.",
          "RoRo (roll-on/roll-off-skib) – ofte billigst, men kun til kørende biler og med mindre beskyttelse mod skader.",
        ],
        "Det betaler sig at tegne transportforsikring – typisk 1,5–2 % af bilens værdi. I EU-havnen losses containeren, og en toldagent fortolder bilen. Gebyrer for losning, terminal og agent betales i destinationshavnen.",
      ],
    },
    {
      id: "duty",
      title: "Told, oprindelse og fortoldning i EU",
      paras: [
        "Den almindelige EU-told på personbiler er 10 % af toldværdien. Toldværdien er bilens pris med auktionsgebyrer plus transport og forsikring til EU's grænse (CIF-værdien). Pickupper kan klassificeres som varebiler – så er tolden 22 % – og motorcykler betaler 6–8 %.",
        "Fra 1. juli 2026 til udgangen af 2029 kan biler fremstillet i USA indføres i EU med 0 % told (forordning (EU) 2026/1455). Betingelsen: du skal bevise bilens amerikanske oprindelse over for toldvæsenet, og bilen skal sendes direkte fra USA. En faktura eller et ”Made in USA”-mærkat er ikke nok – der kræves oprindelsesbevis. VIN giver et fingerpeg: biler bygget i USA har et VIN, der begynder med 1, 4 eller 5. Også et japansk eller tysk mærke samlet i Amerika kan kvalificere, mens en BMW bygget i Europa og købt i USA ikke kan.",
        "Importmoms opkræves med satsen i det land, hvor bilen fortoldes. Momsgrundlaget er toldværdien plus told og transportomkostninger til bestemmelsesstedet i EU. Virksomheder kan bruge toldprocedure 4200: fortolde bilen i ét land og afregne momsen i registreringslandet.",
        "Efter fortoldningen kommer de nationale afgifter – afhængigt af landet en punktafgift (fx 3,1 % eller 18,6 % i Polen afhængigt af motorstørrelse), en registreringsafgift baseret på CO₂, effekt eller værdi (som den danske registreringsafgift), eller slet ingenting. Det er ofte dem, der afgør, om importen kan betale sig.",
      ],
    },
    {
      id: "adaptation",
      title: "EU-tilpasning og registrering",
      paras: [
        "Biler bygget til det amerikanske marked opfylder ikke visse europæiske tekniske regler og skal derfor ændres før synet:",
        [
          "Bageste blinklys skal være gule (orange) – på mange amerikanske biler blinker de røde bremselys i stedet.",
          "En bageste tågelygte er påkrævet.",
          "Forlygterne skal have europæisk nærlysmønster og være korrekt indstillet.",
          "Speedometeret skal vise km/t (dobbelt skala er som regel nok).",
          "Amerikanske dæktrykssensorer (TPMS) arbejder på 315 MHz – i Europa er 433 MHz almindeligt, hvilket betyder noget ved hjulskift.",
        ],
        "Ombygning af lyset koster typisk nogle hundrede euro. I nogle lande – fx Tyskland eller Frankrig – skal en bil fra et land uden for EU også have en enkeltgodkendelse eller en sagkyndig erklæring før registrering, hvilket koster tid og penge.",
        "Til registreringen skal du bruge autoriserede oversættelser af title og faktura, tolddokumentet, kvittering for betalt national afgift og synsrapporten. Mange lande har en lovbestemt frist for registrering af en importeret bil – i Polen for eksempel 30 dage.",
      ],
    },
    {
      id: "mistakes",
      title: "De mest almindelige fejl ved import fra USA",
      paras: [
        [
          "At byde uden at beregne den samlede pris – gebyrer, fragt og afgifter kan fordoble auktionsprisen.",
          "At købe en bil med ”parts only”-title eller ophugningsattest, som ikke lovligt kan registreres.",
          "At stole på ”Run and Drive” uden at tjekke historikken via VIN.",
          "Ingen buffer til skjulte skader og dele – reparation af en skadet bil koster næsten altid mere, end billederne antyder.",
          "At regne med 0 % told uden bevis for amerikansk oprindelse – uden det betaler du 10 %.",
          "At betale auktionen for sent og få opbevaringsgebyrer på pladsen.",
          "At overskride fristen for registrering eller angivelse af den nationale afgift, efter bilen er ankommet.",
        ],
      ],
    },
  ],
  CANADA: [
    {
      id: "market",
      title: "Det canadiske bilmarked – sådan adskiller det sig fra USA",
      paras: [
        "Canada er et mindre marked end USA, men tilbyder stort set det samme: de samme mærker, modeller og udstyrsniveauer, ofte til lidt lavere priser end i Europa. Mange købere ser Canada som et alternativ til USA, især for biler fra canadiske fabrikker, som kan være omfattet af CETA-aftalen.",
        "Canadiske biler har nogle fordele: kilometertæller i kilometer, fabriksmonteret kørelys og vinterudstyr (sædevarme, nogle gange motorvarmer). Ulempen kan være rust – om vinteren saltes vejene kraftigt, og undervognen på en bil fra Ontario eller Quebec kan se værre ud end på en bil fra det sydlige USA.",
        "De mest almindelige importer fra Canada er SUV'er og pickupper, lokalt producerede biler (fx Toyota RAV4, Lexus RX, Honda CR-V og Civic, Chrysler Pacifica) og leasingbiler med lavt kilometertal.",
      ],
    },
    {
      id: "auctions",
      title: "Hvor du køber bil i Canada",
      paras: [
        "Skadede biler sælges i Canada af Copart Canada og IAA (tidligere Impact Auto Auctions); uskadte biler på forhandlerauktioner som ADESA og af forhandlere. Ligesom i USA er mange auktioner kun tilgængelige via en licenseret broker.",
        "Det er også populært at købe fra forhandlere og private via annoncesider. Ved privatkøb skal du selv klare eksportpapirer og transport til havnen, så de fleste europæiske købere bruger et eksportfirma, der henter bilen, tjekker dokumenterne og sender den.",
        "Læg auktions- eller forhandlergebyrer oven i prisen og – ved køb hos forhandler – canadiske salgsafgifter (GST/HST/PST). Nogle kan refunderes eller opkræves ikke, når forhandleren sælger direkte til eksport – spørg, før du køber.",
      ],
    },
    {
      id: "titles",
      title: "Ejerdokumenter og skadesstatus",
      paras: [
        "Canada har ingen ”title” som i USA – dokumentet er registreringen udstedt af provinsen (i Ontario ”ownership”). Skadesstatus registreres i provinsregistret:",
        [
          "Ontario og de fleste provinser: Normal, Salvage (totalskade, må ikke køre), Rebuilt (repareret og godkendt efter kontrol) og Irreparable – kun til dele.",
          "Quebec: alvorligt skadede køretøjer (VGA – véhicule gravement accidenté) mærket ”reconstruit” (genopbygget) eller ”irrécupérable” (kan ikke repareres).",
        ],
        "Køb ikke biler mærket irreparable eller irrécupérable for at køre i dem – de kan ikke registreres lovligt. Andre statusser overføres ikke til EU-registreringsattesten, men de påvirker værdien og viser, at bilen har haft alvorlige skader.",
      ],
    },
    {
      id: "inspection",
      title: "Sådan tjekker du en bil fra Canada",
      paras: [
        [
          "Historik via VIN: en CARFAX Canada-rapport viser skader, provinsregistreringer og kilometerstand; for biler, der er kommet fra USA, tjek også den amerikanske historik.",
          "Pant: i Canada kan en bil være sikkerhed for et lån. Tjek i provinsens pantregister (fx PPSA), at bilen er fri for hæftelser – ellers kan eksporten blive blokeret, og du kan endda miste bilen.",
          "Rust: bed om billeder af undervogn, bundkarme, hjulkasser og bremserør – vejsaltet sætter sine spor.",
          "Markedsversion: canadiske biler ligger som regel meget tæt på de amerikanske og kræver lignende lysændringer.",
        ],
        "For auktionsbiler gælder de samme regler som i USA: skadesbilleder, betydningen af ”Run and Drive” og en buffer til skjulte skader.",
      ],
    },
    {
      id: "shipping",
      title: "Eksport og fragt fra Canada",
      paras: [
        "De mest brugte havne er Halifax og Montreal i øst og Vancouver i vest. Fra østkysten sejler skibet til Nordsøhavnene typisk på omkring 2 uger – en af de hurtigste ruter til Europa. Biler fra de vestlige provinser kører ofte østpå med tog eller sejler fra Vancouver gennem Panamakanalen, hvilket tager længere tid.",
        "Eksport kræver ejerdokumentet (provinsregistreringen), købsbevis og en eksportangivelse i CBSA's system (CERS), som normalt indsendes af eksportøren eller speditøren. Bilen skal være fri for pant.",
        "Fragtmulighederne er de samme som fra USA: delt container, egen container eller RoRo til kørende biler. Om vinteren skal du regne med mulige forsinkelser i landtransporten til havnen.",
      ],
    },
    {
      id: "duty",
      title: "Told og CETA-aftalen",
      paras: [
        "Takket være handelsaftalen mellem EU og Canada (CETA) kan biler fremstillet i Canada indføres i EU med 0 % told. Betingelsen er canadisk oprindelse bekræftet med en oprindelseserklæring fra eksportøren. Det er ikke nok at købe bilen i Canada – mange biler, der sælges der, er bygget i USA, Mexico eller Japan og betaler de fulde 10 %.",
        "Et VIN, der begynder med ”2”, betyder, at bilen er bygget i Canada. Det er et godt fingerpeg, men intet bevis – ved køb fra en privatperson er det ofte svært at få en oprindelseserklæring, og uden den er tolden 10 % af toldværdien (CIF). Pickupper klassificeret som varebiler betaler 22 %.",
        "Ud over tolden opkræves importmoms i fortoldningslandet og nationale afgifter (punktafgift eller registreringsafgift) i registreringslandet. Virksomheder kan bruge procedure 4200 og afregne momsen i bestemmelseslandet.",
      ],
    },
    {
      id: "adaptation",
      title: "EU-tilpasning og registrering",
      paras: [
        "Canadiske biler er lidt nemmere at registrere end amerikanske: de har speedometer i km/t og fabriksmonteret kørelys. Som regel skal du dog stadig:",
        [
          "skifte de bageste blinklys til gule, hvis bremselysene blinker,",
          "montere en bageste tågelygte,",
          "tilpasse forlygterne til europæisk nærlysmønster.",
        ],
        "Registreringen kræver autoriserede oversættelser af dokumenterne, tolddokumentet, bevis for nationale afgifter og syn. Lande som Tyskland eller Frankrig kan kræve enkeltgodkendelse.",
      ],
    },
    {
      id: "mistakes",
      title: "De mest almindelige fejl ved import fra Canada",
      paras: [
        [
          "At tro, at alle biler fra Canada har 0 % told – det gælder kun biler fremstillet i Canada med oprindelseserklæring.",
          "Ikke at tjekke for pant før købet.",
          "At overse rust på undervognen hos biler fra provinser med hårde vintre.",
          "At købe en bil med status irreparable eller irrécupérable.",
          "At undervurdere landtransporten fra de vestlige provinser til havnene i øst.",
        ],
      ],
    },
  ],
  JAPAN: [
    {
      id: "market",
      title: "Det japanske bilmarked – hvorfor JDM",
      paras: [
        "Japan er kendt for biler i meget god teknisk stand og med lavt kilometertal. Årsagen er det strenge shaken-syn, som bliver dyrere, jo ældre bilen er – derfor sælger mange japanere deres biler efter få år, og priserne på ældre biler falder hurtigt.",
        "De fleste importer fra Japan er JDM-biler (Japanese Domestic Market) – sportsvognslegender (Nissan Skyline GT-R, Toyota Supra, Mazda RX-7, Honda NSX), terrængående biler (Toyota Land Cruiser), minibusser og nyere hybrider. For samlere er nøglemodellerne dem, der aldrig officielt er solgt i Europa.",
        "Alle biler fra det japanske marked er højrestyrede. De kan registreres i EU, men er mindre behagelige i højretrafik og kan være sværere at sælge videre – bortset fra eftertragtede samlermodeller.",
      ],
    },
    {
      id: "auctions",
      title: "Auktioner i Japan – USS og andre",
      paras: [
        "De fleste brugte biler i Japan går gennem forhandlerauktioner. Den største er USS-netværket, og derudover blandt andre TAA, CAA, HAA, JU og Arai. Titusindvis af biler udbydes hver uge.",
        "En udenlandsk køber byder ikke selv – det gør en japansk eksportør (auktionsagent): agenten har adgang til auktionerne, oversætter auktionsarket, køber bilen, afregistrerer den til eksport og sender den. Oven i hammerslaget kommer auktionsgebyret, eksportørens kommission, indenlandsk transport til havnen og eksportdokumenter. Der betales normalt i yen.",
        "Du kan også købe fra en eksportørs lager – det kan koste mere, men bilen er allerede tjekket og står ofte klar i havnen.",
      ],
    },
    {
      id: "titles",
      title: "Sådan læser du et japansk auktionsark",
      paras: [
        "Auktionsarket (auction sheet) er auktionsinspektørens rapport – den vigtigste informationskilde om bilen. Det indeholder en samlet karakter, en karakter for kabinen og et skadeskort over karrosseriet.",
        [
          "Samlet karakter: S eller 6 – reelt ny; 5 og 4,5 – meget god stand; 4 – god med små brugsspor; 3,5 og 3 – synlige fejl eller højere kilometertal; R eller RA – repareret ulykkesskade (RA – mindre reparation); 0 eller *** – skadet, oversvømmet eller ikke bedømt.",
          "Kabinekarakter: fra A (som ny) til E (meget slidt).",
          "Skadeskort: A – ridse, U – bule, B – bule med ridse, W – ujævnhed eller spor af reparation, S og C – rust og korrosion, P – lakspor, X – del der skal udskiftes, XX – udskiftet del, Y – revne eller hul. Tallet ved bogstavet (1–3) angiver skadens størrelse.",
        ],
        "Arket viser også kilometerstanden kontrolleret af auktionen, udstyret og inspektørens noter på japansk – en god eksportør oversætter dem, før du byder.",
      ],
    },
    {
      id: "inspection",
      title: "Hvad du skal være opmærksom på ved japanske biler",
      paras: [
        [
          "Kilometerstand: japanske biler har normalt ægte, lav kilometerstand, men tjek historikken på auktionsarket og eksportcertifikatet.",
          "Rust: biler fra nord (Hokkaido) og kystområder kan være angrebet af salt – se billeder af undervognen.",
          "Ombygninger: sportsvogne har ofte ændret undervogn, udstødning og motor, hvilket kan gøre synet i EU sværere.",
          "Hastighedsbegrænsere: mange JDM-biler har en fabriksbegrænser på 180 km/t.",
          "Elektronik: japanske radioer bruger FM-båndet 76–90 MHz, navigation og menuer er på japansk, og ETC-enheden til vejafgifter er ubrugelig i Europa.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Eksport og fragt fra Japan",
      paras: [
        "Efter købet afregistrerer eksportøren bilen og skaffer et Export Certificate – dokumentet, der erstatter registreringen, med bilens data og kilometerstand. Det skal bruges til fortoldning og registrering i EU sammen med fakturaen og konnossementet (B/L).",
        "Bilerne afskibes hovedsageligt fra Yokohama, Nagoya, Kobe og Osaka. RoRo-skibe til Europa tager typisk 5–7 uger (via Suezkanalen eller rundt om Afrika), containere omtrent det samme eller lidt længere. Container er et godt valg til værdifulde eller ikke-kørende biler.",
        "De mest almindelige destinationshavne er Bremerhaven, Rotterdam, Antwerpen og Zeebrugge. Transportforsikring betaler sig – på en lang sejlads er risikoen for skader større.",
      ],
    },
    {
      id: "duty",
      title: "Told og aftalen mellem EU og Japan",
      paras: [
        "Den økonomiske partnerskabsaftale mellem EU og Japan (EPA) har gradvist afskaffet tolden på biler – fra 2026 kan biler med japansk oprindelse indføres i EU med 0 % told. Oprindelsen dokumenteres med en oprindelseserklæring fra eksportøren eller importørens kendskab (dokumenter, der viser, at bilen er bygget i Japan).",
        "JDM-biler bygget i Japan kvalificerer normalt. Pas på japanske mærker bygget andre steder (fx i USA eller Thailand) – de betaler de almindelige 10 % af toldværdien. Uden oprindelsesbevis er tolden også 10 %.",
        "Biler over 30 år i original stand kan betragtes som samlerkøretøjer – så er tolden 0 %, og nogle lande opkræver nedsat moms. Efter fortoldningen gælder nationale afgifter baseret på motor, udledning eller værdi i registreringslandet.",
      ],
    },
    {
      id: "adaptation",
      title: "Højrestyring – registrering i EU",
      paras: [
        "Højrestyrede biler kan registreres i EU-lande, hvis de opfylder de tekniske krav. De vigtigste ændringer er:",
        [
          "forlygter med lysmønster til højretrafik (justering eller udskiftning af glas),",
          "bageste tågelygte i den rigtige side og gule blinklys (japanske biler har dem som regel allerede),",
          "speedometer i km/t – japanske biler har det fra fabrikken.",
        ],
        "Nogle lande, fx Tyskland, kræver enkeltgodkendelse eller en sagkyndig erklæring. Registreringen kræver oversættelser af eksportcertifikatet og fakturaen, tolddokumentet, bevis for nationale afgifter og syn.",
      ],
    },
    {
      id: "mistakes",
      title: "De mest almindelige fejl ved import fra Japan",
      paras: [
        [
          "At byde uden et oversat auktionsark.",
          "At undervurdere tiden – fra køb til registrering går der ofte 2–3 måneder.",
          "At regne med 0 % told for et japansk mærke bygget uden for Japan.",
          "At glemme udgiften til ombygning af lys og eventuel enkeltgodkendelse.",
          "At købe en kraftigt ombygget bil, der ikke består synet.",
          "Ingen forsikring til den lange sejlads.",
        ],
      ],
    },
  ],
  UAE: [
    {
      id: "market",
      title: "Bilmarkedet i De Forenede Arabiske Emirater",
      paras: [
        "Dubai og de øvrige emirater er blandt verdens største markeder for luksusbiler. Den store efterspørgsel efter nye biler fylder brugtmarkedet med få år gamle SUV'er, sportsvogne og premiumsedaner – ofte billigere end i Europa.",
        "De fleste biler, der sælges i Emiraterne, er GCC-versioner (Golfstaternes Samarbejdsråd), bygget til varmen: kraftigere aircondition og køling, nogle gange andet udstyr end i Europa. Der er også mange biler hentet fra USA – ofte skadede – som videresælges som ”import”.",
        "De mest almindelige importer fra Emiraterne er store SUV'er (Nissan Patrol, Toyota Land Cruiser, Lexus LX), luksus- og sportsvogne. Ved biler med højere kilometertal skal du tænke på klimaets påvirkning.",
      ],
    },
    {
      id: "auctions",
      title: "Hvor du køber bil i Emiraterne",
      paras: [
        "Biler købes hos forhandlere (herunder mærkernes certificerede brugtbilsprogrammer), på auktioner som Emirates Auction og Copart UAE og via annoncer. Dubai har også et stort brugtbilsmarked med mange eksportfirmaer, der betjener udenlandske købere.",
        "Ved køb fra udlandet er det sikrest at gå gennem en pålidelig eksportør: eksportøren tjekker bil og dokumenter, afregistrerer den, skaffer eksportcertifikatet og sender bilen.",
      ],
    },
    {
      id: "titles",
      title: "Dokumenter: Mulkiya og eksportcertifikat",
      paras: [
        "Registreringsdokumentet i Emiraterne er Mulkiya-kortet, udstedt af færdselsmyndigheden (i Dubai RTA). Til eksport skal bilen afregistreres, og der skal udstedes et eksportcertifikat (ofte med eksportnummerplader) – nøgledokumentet til fortoldning i EU.",
        "Bilen må ikke have ubetalte bøder eller bankpant. Mange biler i Emiraterne købes på kredit – tjek før købet, at lånet er indfriet, og at banken har frigivet bilen til eksport.",
      ],
    },
    {
      id: "inspection",
      title: "Sådan tjekker du en bil fra Emiraterne",
      paras: [
        [
          "Oprindelse: tjek via VIN, om bilen er en GCC-version eller kommer fra USA. Et VIN, der begynder med 1, 4 eller 5, betyder en USA-bygget bil – tjek så dens amerikanske historik (skader, salvage-title).",
          "Oversvømmelse: efter stormene i 2024 kom mange oversvømmede biler på markedet. Kig efter vandmærker, slam og korrosion i kabinen og elektronikken.",
          "Klimaskader: høje temperaturer slider på gummilister, plast, batterier, dæk og aircondition.",
          "Servicehistorik: forhandlerbiler har normalt komplette optegnelser – et stort plus ved videresalg.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Eksport og fragt fra Emiraterne",
      paras: [
        "Hovedhavnen er Jebel Ali i Dubai. Sejladsen til europæiske havne tager typisk 3–5 uger afhængigt af ruten (via Det Røde Hav og Suezkanalen eller rundt om Afrika) og destinationshavnen. Bilerne fragtes i container eller på RoRo-skibe.",
        "Fortoldning i EU kræver eksportcertifikatet, fakturaen og konnossementet (B/L). For biler, der tidligere er kommet til Emiraterne fra USA, er dokumenter fra den amerikanske historik også nyttige.",
      ],
    },
    {
      id: "duty",
      title: "Told ved import fra Emiraterne",
      paras: [
        "EU har ingen aftale med Emiraterne, der sænker tolden på biler, så biler fra Emiraterne betaler de almindelige 10 % af toldværdien (CIF), og pickupper klassificeret som varebiler 22 %. Det gælder også USA-byggede biler: 0 % told på amerikanske biler kræver forsendelse direkte fra USA.",
        "Ud over tolden opkræves importmoms i fortoldningslandet og nationale afgifter i registreringslandet. Biler over 30 år i original stand kan betragtes som samlerkøretøjer med 0 % told.",
      ],
    },
    {
      id: "adaptation",
      title: "EU-tilpasning og registrering",
      paras: [
        "Biler i GCC-version er venstrestyrede, har speedometer i km/t og som regel lys tæt på europæisk specifikation, så ændringerne er ofte mindre end for amerikanske biler. Tjek alligevel blinklys, bageste tågelygte og forlygter.",
        "Biler hentet til Emiraterne fra USA har amerikansk specifikation og kræver de samme ændringer som biler købt direkte i USA. Nogle EU-lande kræver enkeltgodkendelse.",
      ],
    },
    {
      id: "mistakes",
      title: "De mest almindelige fejl ved import fra Emiraterne",
      paras: [
        [
          "At købe en amerikansk bil solgt som ”GCC” uden at tjekke VIN og historik.",
          "Et ubetalt lån eller bøder, der blokerer eksporten.",
          "At overse tegn på oversvømmelse og varmeskader.",
          "At regne med 0 % told – biler fra Emiraterne betaler de almindelige 10 %.",
        ],
      ],
    },
  ],
  UK: [
    {
      id: "market",
      title: "Det britiske bilmarked efter brexit",
      paras: [
        "Storbritannien er et stort brugtbilsmarked med et enormt udvalg af premium-, sports- og veteranbiler. Siden brexit er landet et tredjeland for EU, så import kræver fortoldning – men takket være handels- og samarbejdsaftalen mellem EU og Storbritannien (TCA) kan biler, der opfylder oprindelsesreglerne, indføres med 0 % told.",
        "Alle britiske biler er højrestyrede. Derfor importeres oftest biler, hvor det ikke betyder noget, eller som er usædvanligt gode køb: veteranbiler, samlerbiler, sjældne versioner og premiumbiler. Det er også populært at hente biler af europæiske mærker tilbage, som tidligere er endt i Storbritannien.",
      ],
    },
    {
      id: "auctions",
      title: "Hvor du køber bil i Storbritannien",
      paras: [
        "Biler købes hos forhandlere, via annoncer (fx Auto Trader) og på auktioner – forhandlerauktioner (BCA, Manheim) og auktioner for skadede biler (Copart UK). Mange biler har dokumenteret servicehistorik.",
        "På auktioner for skadede biler har bilerne en skadeskategori, som du skal forstå, før du køber.",
      ],
    },
    {
      id: "titles",
      title: "Skadeskategorier og V5C",
      paras: [
        "Registreringsdokumentet er V5C (logbook). Totalskadede biler i Storbritannien får en kategori:",
        [
          "Cat S – strukturelle skader (fx længdevanger, stolper); bilen kan repareres og komme tilbage på vejen.",
          "Cat N – ikke-strukturelle skader (fx elektronik, karrosseripaneler); bilen kan repareres.",
          "Cat B – kun til dele, karrosseriet skal destrueres.",
          "Cat A – kun til ophugning.",
        ],
        "Køb ikke Cat A- eller Cat B-biler for at køre i dem. Kategori S og N betyder alvorlige tidligere skader – tjek reparationens kvalitet.",
      ],
    },
    {
      id: "inspection",
      title: "Sådan tjekker du en bil fra Storbritannien",
      paras: [
        [
          "MOT-historik: på det offentlige websted gov.uk kan du gratis se alle MOT-syn via registreringsnummeret – med kilometerstand for hvert år og liste over fejl. Det er den bedste måde at opdage en skruet kilometertæller på.",
          "HPI-tjek (eller lignende): viser udestående finansiering, tyveri, og om bilen er registreret som totalskadet.",
          "Servicehistorik og antal ejere ifølge V5C.",
          "Kilometerstand i miles – til registrering i EU skal speedometeret også vise km/t.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Eksport og transport fra Storbritannien",
      paras: [
        "De fleste biler krydser Den Engelske Kanal med færge eller tog (Dover–Calais, Eurotunnel), på autotransporter eller kørt. Transporten tager typisk fra nogle dage til en uge. Biler fra Skotland eller det nordlige England kan også sejles med RoRo-skib til havne i Benelux og Tyskland.",
        "Siden brexit kræves to toldangivelser: en eksportangivelse i Storbritannien og en importangivelse i EU – også hvis du selv kører bilen. En toldagent ved terminalen ordner dem som regel. Ejeren anmelder desuden den permanente eksport til DVLA med den relevante del af V5C.",
        "At køre på britiske nummerplader til registreringslandet kræver gyldig forsikring og MOT – en autotransporter er ofte enklere.",
      ],
    },
    {
      id: "duty",
      title: "Told, TCA og moms",
      paras: [
        "Handels- og samarbejdsaftalen mellem EU og Storbritannien (TCA) giver 0 % told, men kun for biler, der opfylder oprindelsesreglerne – i praksis bygget i Storbritannien eller EU. Oprindelsen dokumenteres med en oprindelseserklæring fra eksportøren eller importørens kendskab. En japansk eller amerikansk bil købt i Storbritannien betaler de almindelige 10 % af toldværdien.",
        "Importmoms i fortoldningslandet skal betales uanset tolden. Ved køb hos en britisk forhandler, spørg om salget kan ske som eksport uden britisk moms – ellers betaler du moms to gange.",
        "I registreringslandet gælder nationale afgifter baseret på motor, udledning eller værdi.",
      ],
    },
    {
      id: "adaptation",
      title: "Højrestyring og registrering i EU",
      paras: [
        "Britiske biler er bygget efter europæiske typegodkendelsesregler og har derfor ofte en overensstemmelsesattest (COC) og er nemmere at registrere end amerikanske. Det, der som regel mangler:",
        [
          "forlygter til højretrafik,",
          "bageste tågelygte i den rigtige side,",
          "speedometer med km/t-skala.",
        ],
        "Registreringen kræver V5C (eller bevis for eksport), faktura, autoriserede oversættelser, tolddokument, bevis for nationale afgifter og syn.",
      ],
    },
    {
      id: "mistakes",
      title: "De mest almindelige fejl ved import fra Storbritannien",
      paras: [
        [
          "At tro, at alt er toldfrit efter brexit – 0 % gælder kun biler, der opfylder oprindelsesreglerne.",
          "At betale både britisk moms og EU-importmoms af samme bil.",
          "At købe en Cat A- eller Cat B-bil.",
          "Ikke at tjekke MOT-historikken og en HPI-rapport.",
          "At krydse grænsen uden toldangivelser, når du selv kører bilen.",
        ],
      ],
    },
  ],
};

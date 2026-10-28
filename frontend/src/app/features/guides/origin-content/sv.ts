import { OriginDeep } from './types';

export const ORIGIN_DEEP: OriginDeep = {
  USA: [
    {
      id: "market",
      title: "Den amerikanska bilmarknaden – vad lönar sig att importera",
      paras: [
        "USA är världens största marknad för begagnade bilar: omkring 40 miljoner fordon byter ägare där varje år, och flera miljoner går via försäkringsauktioner. Därför är många modeller – särskilt skadade – klart billigare än i Europa, och utbudet av versioner är enormt.",
        "Det lönar sig oftast att importera bilar som är sällsynta eller dyra i Europa: muscle cars med stora V8-motorer (Mustang, Camaro, Challenger), stora SUV:ar och pickuper, välutrustade premiumversioner och elbilar, som tappar i värde snabbt i USA. På billigare småbilar äter frakt och skatter ofta upp besparingen.",
        "Kom ihåg att auktionspriset bara är början. Till det kommer auktionsavgifter, transport till hamnen, sjöfrakt, försäkring, tull, moms, nationella skatter, anpassning till EU-krav och eventuell reparation. Först totalsumman visar om importen lönar sig – så räkna innan du budar, inte efteråt.",
      ],
    },
    {
      id: "auctions",
      title: "Auktionerna Copart och IAAI – så köper du",
      paras: [
        "Copart och IAAI (Insurance Auto Auctions) säljer främst bilar från försäkringsbolag, biluthyrare och banker – skadade, återfunna efter stöld, översvämmade eller helt enkelt utrangerade ur bilparker. Budgivningen sker online medan bilen står på någon av flera hundra uppställningsplatser runt om i landet. Platsen spelar roll: den avgör kostnaden och tiden för transporten till hamnen.",
        "En köpare från Europa budar vanligtvis via en broker (mellanhand med auktionslicens), eftersom många bilar – särskilt med salvage-title – bara får köpas av licensierade köpare. Brokern tar provision och ordnar ofta även transport och exportdokument.",
        "Utöver klubbat pris tillkommer auktionsavgifter: en köparavgift som stiger stegvis med priset, en avgift för onlinebudgivning, en gate fee för att hämta ut bilen, en miljöavgift och en avgift för hantering av title. För en bil för några tusen dollar blir det vanligtvis från några hundra till över tusen dollar totalt.",
        "Betalningen ska ske inom kort tid – oftast några arbetsdagar – och bilen måste hämtas innan förvaringsavgifter börjar löpa. Sen betalning innebär straffavgift och spärrat konto, så ha pengarna för bilen och avgifterna redo innan du budar.",
      ],
    },
    {
      id: "titles",
      title: "Typer av title: clean, salvage, rebuilt",
      paras: [
        "I USA bevisas äganderätten med en title som utfärdas av delstaten. Typen berättar bilens historia och är viktig vid köp och export:",
        [
          "Clean – ingen totalskada i bilens historik; dyrast men minst riskabel.",
          "Salvage – försäkringsbolaget har förklarat bilen totalskadad (reparationskostnaden översteg en viss andel av bilens värde). Den vanligaste title-typen på Copart och IAAI.",
          "Rebuilt / Reconstructed – en tidigare totalskada som reparerats och åter godkänts för trafik i USA.",
          "Non-repairable, Certificate of Destruction, Parts only, Junk – endast för delar. Köp inte sådana för att köra: export och registrering i EU kan vara omöjlig eller mycket svår.",
        ],
        "I EU förs den amerikanska title-märkningen inte över till registreringsbeviset. En salvage-bil kan registreras om den klarar besiktningen efter reparation. Title påverkar ändå andrahandsvärdet och visar framför allt att bilen haft allvarliga skador – som måste repareras ordentligt.",
      ],
    },
    {
      id: "inspection",
      title: "Så kontrollerar du bilen innan du budar",
      paras: [
        "Du kan inte se bilen på plats vid auktionen, så varje detalj i annonsen räknas. Innan du budar:",
        [
          "Kontrollera historiken via VIN (t.ex. Carfax, AutoCheck, NMVTIS-databasen): skador, miltal, antal ägare, stöld och översvämning.",
          "Studera bilderna och skadebeskrivningen (primary / secondary damage). ”Front end” kan betyda allt från en stötfångare till böjda längsgående balkar och utlösta krockkuddar.",
          "Läs tillståndsmärkningen noga: ”Run and Drive” betyder att bilen gick att köra när den kom till uppställningsplatsen, inte att den är trafikduglig; ”Engine Starts” betyder bara att motorn startade.",
          "Var försiktig med bilar från orkan- och översvämningsområden (Florida, Texas, Louisiana). Vattenmärken under mattan, slam och korroderade elkontakter är skäl att avstå.",
          "Miltalet anges i engelska mil (1 mile = 1,61 km) och kan vara märkt ”not actual” eller ”exempt” – då går det inte att lita på mätaren.",
        ],
        "Det är klokt att ha en buffert för dolda skador – upp till 20–30 % av den beräknade reparationskostnaden. Ta in prisuppgifter på delar från Europa eller USA innan du bestämmer ditt maxbud.",
      ],
    },
    {
      id: "shipping",
      title: "Export och sjöfrakt",
      paras: [
        "Efter köpet kör en biltransport bilen från uppställningsplatsen till exporthamnen. De vanligaste hamnarna är New Jersey/New York, Savannah (Georgia), Baltimore, Houston och Los Angeles/Long Beach. Från östkusten tar resan till Nordsjöhamnarna vanligtvis 2–3 veckor, från Kalifornien via Panamakanalen upp till 5–6 veckor.",
        "Export kräver original-title (eller bestyrkt kopia) och fakturan. Exportören lämnar Electronic Export Information (EEI) i AES – obligatoriskt för begagnade fordon oavsett värde – och bilen och dokumenten måste visas upp för amerikanska tullen (CBP) minst 72 timmar innan fartyget avgår.",
        "Det finns tre sätt att frakta:",
        [
          "Delad container (vanligtvis 3–4 bilar i en 40-fotscontainer) – mest populärt, passar skadade och icke körbara bilar.",
          "Egen container – dyrare, men bilen åker ensam och du kan lägga till delar.",
          "RoRo (roll-on/roll-off-fartyg) – ofta billigast, men bara för körbara bilar och med sämre skydd mot skador.",
        ],
        "Det lönar sig att teckna transportförsäkring – vanligtvis 1,5–2 % av bilens värde. I EU-hamnen lossas containern och ett tullombud förtullar bilen. Avgifter för lossning, terminal och ombud betalas i destinationshamnen.",
      ],
    },
    {
      id: "duty",
      title: "Tull, ursprung och förtullning i EU",
      paras: [
        "Den ordinarie EU-tullen på personbilar är 10 % av tullvärdet. Tullvärdet är bilens pris inklusive auktionsavgifter plus transport och försäkring till EU:s gräns (CIF-värdet). Pickuper kan klassas som lastbilar – då är tullen 22 % – och motorcyklar betalar 6–8 %.",
        "Från 1 juli 2026 till slutet av 2029 kan bilar tillverkade i USA föras in i EU med 0 % tull (förordning (EU) 2026/1455). Villkoret: du måste bevisa bilens amerikanska ursprung för tullen, och bilen måste skeppas direkt från USA. En faktura eller en ”Made in USA”-etikett räcker inte – ursprungsbevis krävs. VIN ger en ledtråd: bilar byggda i USA har ett VIN som börjar på 1, 4 eller 5. Även ett japanskt eller tyskt märke som monterats i USA kan kvalificera, medan en BMW byggd i Europa och köpt i USA inte gör det.",
        "Importmoms tas ut enligt skattesatsen i det land där bilen förtullas. Momsunderlaget är tullvärdet plus tull och transportkostnader till destinationen i EU. Företag kan använda tullförfarande 4200: förtulla bilen i ett land och redovisa momsen i registreringslandet.",
        "Efter förtullningen tillkommer nationella skatter – beroende på land en punktskatt (t.ex. 3,1 % eller 18,6 % i Polen beroende på motorstorlek), en registreringsskatt baserad på CO₂, effekt eller värde, eller ingenting alls. Det är ofta de som avgör om importen lönar sig.",
      ],
    },
    {
      id: "adaptation",
      title: "EU-anpassning och registrering",
      paras: [
        "Bilar byggda för den amerikanska marknaden uppfyller inte vissa europeiska tekniska regler och behöver därför ändras före besiktningen:",
        [
          "Bakre blinkers måste vara gula (orange) – på många amerikanska bilar blinkar de röda bromsljusen i stället.",
          "En bakre dimljuslykta krävs.",
          "Strålkastarna måste ha europeiskt halvljusmönster och vara rätt inställda.",
          "Hastighetsmätaren ska visa km/h (dubbel skala räcker oftast).",
          "Amerikanska däcktryckssensorer (TPMS) arbetar på 315 MHz – i Europa är 433 MHz vanligt, vilket spelar roll vid hjulbyte.",
        ],
        "Ombyggnaden av belysningen kostar vanligtvis några hundra euro. I vissa länder – t.ex. Tyskland eller Frankrike – behöver en bil från ett land utanför EU även ett individuellt godkännande eller ett expertutlåtande före registrering, vilket kostar tid och pengar.",
        "Inför registreringen behöver du auktoriserade översättningar av title och faktura, tulldokumentet, kvitto på betald nationell skatt och besiktningsprotokollet. Många länder har en lagstadgad tidsfrist för att registrera en importerad bil – i Polen till exempel 30 dagar.",
      ],
    },
    {
      id: "mistakes",
      title: "De vanligaste misstagen vid import från USA",
      paras: [
        [
          "Att buda utan att räkna ut totalkostnaden – avgifter, frakt och skatter kan fördubbla auktionspriset.",
          "Att köpa en bil med ”parts only”-title eller skrotningsintyg som inte lagligen kan registreras.",
          "Att lita på ”Run and Drive” utan att kontrollera historiken via VIN.",
          "Ingen buffert för dolda skador och delar – att reparera en krockad bil kostar nästan alltid mer än bilderna antyder.",
          "Att räkna med 0 % tull utan bevis på amerikanskt ursprung – utan det betalar du 10 %.",
          "Att betala auktionen för sent och dra på sig förvaringsavgifter.",
          "Att missa fristen för registrering eller deklaration av den nationella skatten efter att bilen kommit fram.",
        ],
      ],
    },
  ],
  CANADA: [
    {
      id: "market",
      title: "Den kanadensiska bilmarknaden – så skiljer den sig från USA",
      paras: [
        "Kanada är en mindre marknad än USA men erbjuder i stort sett samma sak: samma märken, modeller och utrustningsnivåer, ofta till något lägre priser än i Europa. Många köpare ser landet som ett alternativ till USA, särskilt för bilar från kanadensiska fabriker, som kan omfattas av CETA-avtalet.",
        "Kanadensiska bilar har några fördelar: vägmätare i kilometer, fabriksmonterade varselljus och vinterutrustning (stolsvärme, ibland motorvärmare). Nackdelen kan vara rost – på vintern saltas vägarna kraftigt, och underredet på en bil från Ontario eller Quebec kan se sämre ut än på en bil från södra USA.",
        "De vanligaste importerna från Kanada är SUV:ar och pickuper, lokalt tillverkade bilar (t.ex. Toyota RAV4, Lexus RX, Honda CR-V och Civic, Chrysler Pacifica) och leasingbilar med låga miltal.",
      ],
    },
    {
      id: "auctions",
      title: "Var du köper bil i Kanada",
      paras: [
        "Skadade bilar säljs i Kanada av Copart Canada och IAA (tidigare Impact Auto Auctions); oskadade bilar på handlarauktioner som ADESA och av bilhandlare. Precis som i USA är många auktioner bara tillgängliga via en licensierad broker.",
        "Det är också populärt att köpa från handlare och privatpersoner via annonssajter. Vid privatköp måste du själv sköta exportpapper och transport till hamnen, så de flesta europeiska köpare anlitar ett exportföretag som hämtar bilen, kontrollerar dokumenten och skeppar den.",
        "Lägg till auktions- eller handlaravgifter och – vid köp från handlare – kanadensiska försäljningsskatter (GST/HST/PST). Vissa kan återbetalas eller inte tas ut när handlaren säljer direkt för export – fråga innan du köper.",
      ],
    },
    {
      id: "titles",
      title: "Ägarhandlingar och skadestatus",
      paras: [
        "Kanada har ingen ”title” av amerikansk typ – handlingen är registreringen som utfärdas av provinsen (i Ontario ”ownership”). Skadestatusen registreras i provinsregistret:",
        [
          "Ontario och de flesta provinser: Normal, Salvage (totalskada som inte får köras), Rebuilt (reparerad och godkänd efter kontroll) och Irreparable – endast för delar.",
          "Quebec: svårt skadade fordon (VGA – véhicule gravement accidenté) märkta ”reconstruit” (återuppbyggd) eller ”irrécupérable” (ej reparerbar).",
        ],
        "Köp inte bilar märkta irreparable eller irrécupérable för att köra – de kan inte registreras lagligt. Övriga statusar förs inte över till EU:s registreringsbevis, men de påverkar värdet och visar att bilen haft allvarliga skador.",
      ],
    },
    {
      id: "inspection",
      title: "Så kontrollerar du en bil från Kanada",
      paras: [
        [
          "Historik via VIN: en CARFAX Canada-rapport visar skador, provinsregistreringar och miltal; för bilar som kommit från USA, kontrollera även den amerikanska historiken.",
          "Panträtter: i Kanada kan en bil vara säkerhet för ett lån. Kontrollera i provinsens panträttsregister (t.ex. PPSA) att bilen är fri från belastningar – annars kan exporten stoppas och du kan till och med förlora bilen.",
          "Rost: be om bilder av underrede, trösklar, hjulhus och bromsrör – vägsaltet tar ut sin rätt.",
          "Marknadsversion: kanadensiska bilar ligger oftast mycket nära de amerikanska och behöver liknande ändringar av belysningen.",
        ],
        "För auktionsbilar gäller samma regler som i USA: skadebilder, vad ”Run and Drive” betyder och en buffert för dolda skador.",
      ],
    },
    {
      id: "shipping",
      title: "Export och frakt från Kanada",
      paras: [
        "De mest använda hamnarna är Halifax och Montreal i öst och Vancouver i väst. Från östkusten tar fartyget till Nordsjöhamnarna vanligtvis cirka 2 veckor – en av de snabbaste rutterna till Europa. Bilar från de västra provinserna går ofta österut med tåg eller skeppas från Vancouver via Panamakanalen, vilket tar längre tid.",
        "Export kräver ägarhandlingen (provinsregistreringen), köpebevis och en exportdeklaration i CBSA:s system (CERS), som oftast lämnas av exportören eller speditören. Bilen måste vara fri från panträtter.",
        "Fraktalternativen är desamma som från USA: delad container, egen container eller RoRo för körbara bilar. Räkna med möjliga förseningar i landtransporten till hamnen på vintern.",
      ],
    },
    {
      id: "duty",
      title: "Tull och CETA-avtalet",
      paras: [
        "Tack vare handelsavtalet mellan EU och Kanada (CETA) kan bilar tillverkade i Kanada föras in i EU med 0 % tull. Villkoret är kanadensiskt ursprung som bekräftas med en ursprungsförsäkran från exportören. Att köpa bilen i Kanada räcker inte – många bilar som säljs där är byggda i USA, Mexiko eller Japan och betalar hela 10 %.",
        "Ett VIN som börjar på ”2” betyder att bilen byggts i Kanada. Det är en bra ledtråd men inget bevis – vid köp från privatperson är det ofta svårt att få en ursprungsförsäkran, och utan den är tullen 10 % av tullvärdet (CIF). Pickuper som klassas som lastbilar betalar 22 %.",
        "Utöver tullen tas importmoms ut i förtullningslandet och nationella skatter (punktskatt eller registreringsskatt) i registreringslandet. Företag kan använda förfarande 4200 och redovisa momsen i destinationslandet.",
      ],
    },
    {
      id: "adaptation",
      title: "EU-anpassning och registrering",
      paras: [
        "Kanadensiska bilar är något enklare att registrera än amerikanska: de har hastighetsmätare i km/h och fabriksmonterade varselljus. Oftast behöver du ändå:",
        [
          "byta bakre blinkers till gula om bromsljusen blinkar,",
          "montera en bakre dimljuslykta,",
          "anpassa strålkastarna till europeiskt halvljusmönster.",
        ],
        "Registreringen kräver auktoriserade översättningar av dokumenten, tulldokumentet, bevis på nationella skatter och besiktning. Länder som Tyskland eller Frankrike kan kräva individuellt godkännande.",
      ],
    },
    {
      id: "mistakes",
      title: "De vanligaste misstagen vid import från Kanada",
      paras: [
        [
          "Att tro att alla bilar från Kanada har 0 % tull – det gäller bara bilar tillverkade i Kanada med ursprungsförsäkran.",
          "Att inte kontrollera panträtter före köpet.",
          "Att bortse från rost på underredet hos bilar från provinser med hårda vintrar.",
          "Att köpa en bil med statusen irreparable eller irrécupérable.",
          "Att underskatta landtransporten från de västra provinserna till hamnarna i öst.",
        ],
      ],
    },
  ],
  JAPAN: [
    {
      id: "market",
      title: "Den japanska bilmarknaden – varför JDM",
      paras: [
        "Japan är känt för bilar i mycket gott tekniskt skick och med låga miltal. Orsaken är den stränga shaken-besiktningen, som blir dyrare ju äldre bilen är – därför säljer många japaner sina bilar efter några år, och priserna på äldre bilar faller snabbt.",
        "De flesta importer från Japan är JDM-bilar (Japanese Domestic Market) – sportbilslegender (Nissan Skyline GT-R, Toyota Supra, Mazda RX-7, Honda NSX), terrängbilar (Toyota Land Cruiser), minibussar och nyare hybrider. För samlare är nyckelmodellerna de som aldrig officiellt sålts i Europa.",
        "Alla bilar från den japanska marknaden är högerstyrda. De kan registreras i EU, men är mindre bekväma i högertrafik och kan vara svårare att sälja vidare – utom eftertraktade samlarmodeller.",
      ],
    },
    {
      id: "auctions",
      title: "Auktioner i Japan – USS och andra",
      paras: [
        "De flesta begagnade bilar i Japan går via handlarauktioner. Den största är USS-nätverket, och därutöver bland annat TAA, CAA, HAA, JU och Arai. Tiotusentals bilar bjuds ut varje vecka.",
        "En utländsk köpare budar inte själv – det gör en japansk exportör (auktionsagent): agenten har tillgång till auktionerna, översätter auktionsbladet, köper bilen, avregistrerar den för export och skeppar den. Utöver klubbat pris tillkommer auktionsavgiften, exportörens provision, inrikes transport till hamnen och exportdokument. Betalning sker oftast i yen.",
        "Du kan också köpa ur en exportörs lager – det kan kosta mer, men bilen är redan kontrollerad och står ofta i hamnen.",
      ],
    },
    {
      id: "titles",
      title: "Så läser du ett japanskt auktionsblad",
      paras: [
        "Auktionsbladet (auction sheet) är auktionsinspektörens rapport – den viktigaste informationskällan om bilen. Det innehåller ett helhetsbetyg, ett interiörbetyg och en skadekarta över karossen.",
        [
          "Helhetsbetyg: S eller 6 – i princip ny; 5 och 4,5 – mycket gott skick; 4 – gott skick med små bruksspår; 3,5 och 3 – synliga brister eller högre miltal; R eller RA – reparerad krockskada (RA – mindre reparation); 0 eller *** – skadad, översvämmad eller ej betygsatt.",
          "Interiörbetyg: från A (som ny) till E (kraftigt sliten).",
          "Skadekarta: A – repa, U – buckla, B – buckla med repa, W – ojämnhet eller spår av reparation, S och C – rost och korrosion, P – lackspår, X – del som ska bytas, XX – bytt del, Y – spricka eller hål. Siffran bredvid bokstaven (1–3) anger skadans storlek.",
        ],
        "Bladet visar även miltalet som auktionen kontrollerat, utrustningen och inspektörens anteckningar på japanska – en bra exportör översätter dem innan du budar.",
      ],
    },
    {
      id: "inspection",
      title: "Vad du ska se upp med hos japanska bilar",
      paras: [
        [
          "Miltal: japanska bilar har oftast äkta, låga miltal, men kontrollera historiken på auktionsbladet och exportcertifikatet.",
          "Rost: bilar från norr (Hokkaido) och kustområden kan vara angripna av salt – titta på bilder av underredet.",
          "Modifieringar: sportbilar har ofta ändrad fjädring, avgassystem och motor, vilket kan försvåra besiktningen i EU.",
          "Hastighetsbegränsare: många JDM-bilar har en fabriksbegränsare på 180 km/h.",
          "Elektronik: japanska radioapparater använder FM-bandet 76–90 MHz, navigering och menyer är på japanska och ETC-enheten för vägavgifter är oanvändbar i Europa.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Export och frakt från Japan",
      paras: [
        "Efter köpet avregistrerar exportören bilen och skaffar ett Export Certificate – handlingen som ersätter registreringen, med bilens uppgifter och miltal. Den behövs för förtullning och registrering i EU, tillsammans med fakturan och konossementet (B/L).",
        "Bilarna skeppas främst från Yokohama, Nagoya, Kobe och Osaka. RoRo-fartyg till Europa tar vanligtvis 5–7 veckor (via Suezkanalen eller runt Afrika), containrar ungefär lika lång tid eller något längre. Container är ett bra val för värdefulla eller icke körbara bilar.",
        "De vanligaste destinationshamnarna är Bremerhaven, Rotterdam, Antwerpen och Zeebrugge. Transportförsäkring lönar sig – på en lång resa är risken för skador större.",
      ],
    },
    {
      id: "duty",
      title: "Tull och avtalet mellan EU och Japan",
      paras: [
        "Avtalet om ekonomiskt partnerskap mellan EU och Japan (EPA) har stegvis avskaffat tullen på bilar – från 2026 kan bilar med japanskt ursprung föras in i EU med 0 % tull. Ursprunget visas med en ursprungsförsäkran från exportören eller genom importörens kännedom (dokument som visar att bilen byggts i Japan).",
        "JDM-bilar byggda i Japan kvalificerar oftast. Se upp med japanska märken som byggts på annat håll (t.ex. i USA eller Thailand) – de betalar ordinarie 10 % av tullvärdet. Utan ursprungsbevis är tullen också 10 %.",
        "Bilar äldre än 30 år i originalskick kan räknas som samlarfordon – då är tullen 0 % och vissa länder tar ut reducerad moms. Efter förtullningen gäller nationella skatter baserade på motor, utsläpp eller värde i registreringslandet.",
      ],
    },
    {
      id: "adaptation",
      title: "Högerstyrning – registrering i EU",
      paras: [
        "Högerstyrda bilar kan registreras i EU-länder om de uppfyller de tekniska kraven. De viktigaste ändringarna är:",
        [
          "strålkastare med ljusbild för högertrafik (justering eller byte av glas),",
          "bakre dimljus på rätt sida och gula blinkers (japanska bilar har dem oftast redan),",
          "hastighetsmätare i km/h – japanska bilar har det från fabrik.",
        ],
        "Vissa länder, t.ex. Tyskland, kräver individuellt godkännande eller ett expertutlåtande. Registreringen kräver översättningar av exportcertifikatet och fakturan, tulldokumentet, bevis på nationella skatter och besiktning.",
      ],
    },
    {
      id: "mistakes",
      title: "De vanligaste misstagen vid import från Japan",
      paras: [
        [
          "Att buda utan ett översatt auktionsblad.",
          "Att underskatta tiden – från köp till registrering går det ofta 2–3 månader.",
          "Att räkna med 0 % tull för ett japanskt märke som byggts utanför Japan.",
          "Att glömma kostnaden för ombyggd belysning och eventuellt individuellt godkännande.",
          "Att köpa en kraftigt modifierad bil som inte klarar besiktningen.",
          "Ingen försäkring för den långa sjöresan.",
        ],
      ],
    },
  ],
  UAE: [
    {
      id: "market",
      title: "Bilmarknaden i Förenade Arabemiraten",
      paras: [
        "Dubai och de andra emiraten hör till världens största marknader för lyxbilar. Den starka efterfrågan på nya bilar fyller begagnatmarknaden med några år gamla SUV:ar, sportbilar och premiumsedaner – ofta billigare än i Europa.",
        "De flesta bilar som säljs i Emiraten är GCC-versioner (Gulfstaternas samarbetsråd), byggda för värmen: kraftigare luftkonditionering och kylning, ibland annan utrustning än i Europa. Det finns också många bilar som tagits in från USA – ofta skadade – och säljs vidare som ”import”.",
        "De vanligaste importerna från Emiraten är stora SUV:ar (Nissan Patrol, Toyota Land Cruiser, Lexus LX), lyx- och sportbilar. På bilar med högre miltal bör du ha klimatets påverkan i åtanke.",
      ],
    },
    {
      id: "auctions",
      title: "Var du köper bil i Emiraten",
      paras: [
        "Bilar köps från handlare (inklusive märkenas certifierade begagnatprogram), på auktioner som Emirates Auction och Copart UAE och via annonser. Dubai har också en stor begagnatmarknad med många exportföretag som betjänar utländska köpare.",
        "Vid köp från utlandet är det säkrast att gå via en pålitlig exportör: exportören kontrollerar bilen och dokumenten, avregistrerar den, skaffar exportcertifikatet och skeppar bilen.",
      ],
    },
    {
      id: "titles",
      title: "Dokument: Mulkiya och exportcertifikat",
      paras: [
        "Registreringshandlingen i Emiraten är Mulkiya-kortet, som utfärdas av trafikmyndigheten (i Dubai RTA). För export måste bilen avregistreras och ett exportcertifikat utfärdas (ofta med exportskyltar) – nyckeldokumentet för förtullning i EU.",
        "Bilen får inte ha obetalda böter eller bankpant. Många bilar i Emiraten köps på kredit – kontrollera före köpet att lånet är betalt och att banken har släppt bilen för export.",
      ],
    },
    {
      id: "inspection",
      title: "Så kontrollerar du en bil från Emiraten",
      paras: [
        [
          "Ursprung: kontrollera via VIN om bilen är en GCC-version eller kommer från USA. Ett VIN som börjar på 1, 4 eller 5 betyder en USA-byggd bil – kontrollera då dess amerikanska historik (skador, salvage-title).",
          "Översvämning: efter stormarna 2024 kom många översvämmade bilar ut på marknaden. Leta efter vattenmärken, slam och korrosion i kupén och elektroniken.",
          "Klimatskador: höga temperaturer sliter på gummitätningar, plaster, batterier, däck och luftkonditionering.",
          "Servicehistorik: bilar från handlare har oftast fullständiga anteckningar – ett stort plus vid andrahandsförsäljning.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Export och frakt från Emiraten",
      paras: [
        "Huvudhamnen är Jebel Ali i Dubai. Resan till europeiska hamnar tar vanligtvis 3–5 veckor, beroende på rutt (via Röda havet och Suezkanalen eller runt Afrika) och destinationshamn. Bilarna fraktas i container eller på RoRo-fartyg.",
        "Förtullning i EU kräver exportcertifikatet, fakturan och konossementet (B/L). För bilar som tidigare kommit till Emiraten från USA är även dokument från den amerikanska historiken användbara.",
      ],
    },
    {
      id: "duty",
      title: "Tull vid import från Emiraten",
      paras: [
        "EU har inget avtal med Förenade Arabemiraten som sänker tullen på bilar, så bilar från Emiraten betalar ordinarie 10 % av tullvärdet (CIF), och pickuper som klassas som lastbilar 22 %. Det gäller även USA-byggda bilar: 0 % tull på amerikanska bilar kräver att de skeppas direkt från USA.",
        "Utöver tullen tas importmoms ut i förtullningslandet och nationella skatter i registreringslandet. Bilar äldre än 30 år i originalskick kan räknas som samlarfordon med 0 % tull.",
      ],
    },
    {
      id: "adaptation",
      title: "EU-anpassning och registrering",
      paras: [
        "Bilar i GCC-version är vänsterstyrda, har hastighetsmätare i km/h och oftast belysning som ligger nära europeisk specifikation, så ändringarna blir ofta mindre än för amerikanska bilar. Kontrollera ändå blinkers, bakre dimljus och strålkastare.",
        "Bilar som tagits till Emiraten från USA har amerikansk specifikation och behöver samma ändringar som bilar köpta direkt i USA. Vissa EU-länder kräver individuellt godkännande.",
      ],
    },
    {
      id: "mistakes",
      title: "De vanligaste misstagen vid import från Emiraten",
      paras: [
        [
          "Att köpa en amerikansk bil som säljs som ”GCC” utan att kontrollera VIN och historik.",
          "Ett obetalt lån eller böter som stoppar exporten.",
          "Att missa tecken på översvämning och värmeskador.",
          "Att räkna med 0 % tull – bilar från Emiraten betalar ordinarie 10 %.",
        ],
      ],
    },
  ],
  UK: [
    {
      id: "market",
      title: "Den brittiska bilmarknaden efter brexit",
      paras: [
        "Storbritannien är en stor begagnatmarknad med ett enormt utbud av premium-, sport- och veteranbilar. Sedan brexit är landet ett tredjeland för EU, så import kräver förtullning – men tack vare handels- och samarbetsavtalet mellan EU och Storbritannien (TCA) kan bilar som uppfyller ursprungsreglerna föras in med 0 % tull.",
        "Alla brittiska bilar är högerstyrda. Därför importeras oftast bilar där det inte spelar någon roll eller som är exceptionellt prisvärda: veteranbilar, samlarbilar, sällsynta versioner och premiumbilar. Det är också populärt att ta tillbaka bilar av europeiska märken som tidigare hamnat i Storbritannien.",
      ],
    },
    {
      id: "auctions",
      title: "Var du köper bil i Storbritannien",
      paras: [
        "Bilar köps från handlare, via annonser (t.ex. Auto Trader) och på auktioner – handlarauktioner (BCA, Manheim) och auktioner för skadade bilar (Copart UK). Många bilar har dokumenterad servicehistorik.",
        "På auktioner för skadade bilar har bilarna en skadekategori som du behöver förstå innan du köper.",
      ],
    },
    {
      id: "titles",
      title: "Skadekategorier och V5C",
      paras: [
        "Registreringshandlingen är V5C (logbook). Totalskadade bilar i Storbritannien får en kategori:",
        [
          "Cat S – strukturella skador (t.ex. längsgående balkar, stolpar); bilen kan repareras och åter användas på väg.",
          "Cat N – icke-strukturella skador (t.ex. elektronik, karosspaneler); bilen kan repareras.",
          "Cat B – endast för delar, karossen måste förstöras.",
          "Cat A – endast skrotning.",
        ],
        "Köp inte Cat A- eller Cat B-bilar för att köra. Kategorierna S och N innebär allvarliga tidigare skador – kontrollera reparationens kvalitet.",
      ],
    },
    {
      id: "inspection",
      title: "Så kontrollerar du en bil från Storbritannien",
      paras: [
        [
          "MOT-historik: på myndighetssajten gov.uk kan du gratis se alla MOT-besiktningar via registreringsnumret – med mätarställning för varje år och en lista över fel. Det är det bästa sättet att upptäcka en tillbakavriden mätare.",
          "HPI-kontroll (eller liknande): visar utestående finansiering, stöld och om bilen registrerats som totalskadad.",
          "Servicehistorik och antal ägare enligt V5C.",
          "Miltal i engelska mil – för registrering i EU måste hastighetsmätaren även visa km/h.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Export och transport från Storbritannien",
      paras: [
        "De flesta bilar korsar Engelska kanalen med färja eller tåg (Dover–Calais, Eurotunnel), på biltransport eller körda. Transporten tar vanligtvis några dagar till en vecka. Bilar från Skottland eller norra England kan också skeppas med RoRo-fartyg till hamnar i Benelux och Tyskland.",
        "Sedan brexit behövs två tulldeklarationer: en exportdeklaration i Storbritannien och en importdeklaration i EU – även om du kör bilen själv. Ett tullombud vid terminalen brukar sköta dem. Fordonsinnehavaren anmäler också den permanenta exporten till DVLA med motsvarande del av V5C.",
        "Att köra på brittiska skyltar till registreringslandet kräver giltig försäkring och MOT – en biltransport är ofta enklare.",
      ],
    },
    {
      id: "duty",
      title: "Tull, TCA och moms",
      paras: [
        "Handels- och samarbetsavtalet mellan EU och Storbritannien (TCA) ger 0 % tull, men bara för bilar som uppfyller ursprungsreglerna – i praktiken byggda i Storbritannien eller EU. Ursprunget visas med en ursprungsförsäkran från exportören eller genom importörens kännedom. En japansk eller amerikansk bil som köpts i Storbritannien betalar ordinarie 10 % av tullvärdet.",
        "Importmoms i förtullningslandet ska betalas oavsett tull. Vid köp från en brittisk handlare, fråga om försäljningen kan göras som export utan brittisk moms – annars betalar du moms två gånger.",
        "I registreringslandet gäller nationella skatter baserade på motor, utsläpp eller värde.",
      ],
    },
    {
      id: "adaptation",
      title: "Högerstyrning och registrering i EU",
      paras: [
        "Brittiska bilar är byggda enligt europeiska typgodkännanderegler och har därför ofta ett intyg om överensstämmelse (COC) och är enklare att registrera än amerikanska. Det som oftast återstår:",
        [
          "strålkastare för högertrafik,",
          "bakre dimljus på rätt sida,",
          "hastighetsmätare med km/h-skala.",
        ],
        "Registreringen kräver V5C (eller bevis på export), faktura, auktoriserade översättningar, tulldokument, bevis på nationella skatter och besiktning.",
      ],
    },
    {
      id: "mistakes",
      title: "De vanligaste misstagen vid import från Storbritannien",
      paras: [
        [
          "Att tro att allt är tullfritt efter brexit – 0 % gäller bara bilar som uppfyller ursprungsreglerna.",
          "Att betala både brittisk moms och EU-importmoms på samma bil.",
          "Att köpa en Cat A- eller Cat B-bil.",
          "Att inte kontrollera MOT-historiken och en HPI-rapport.",
          "Att passera gränsen utan tulldeklarationer när du kör bilen själv.",
        ],
      ],
    },
  ],
};

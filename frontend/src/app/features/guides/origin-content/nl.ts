import { OriginDeep } from './types';

export const ORIGIN_DEEP: OriginDeep = {
  USA: [
    {
      id: "market",
      title: "De Amerikaanse automarkt – wat loont om te importeren",
      paras: [
        "De Verenigde Staten zijn de grootste occasionmarkt ter wereld: er wisselen jaarlijks zo'n 40 miljoen voertuigen van eigenaar en enkele miljoenen gaan via verzekeringsveilingen. Daarom zijn veel modellen – vooral schadeauto's – duidelijk goedkoper dan in Europa en is de keuze aan uitvoeringen enorm.",
        "Het loont vooral om auto's te importeren die in Europa zeldzaam of duur zijn: muscle cars met grote V8's (Mustang, Camaro, Challenger), grote SUV's en pick-ups, goed uitgeruste premiumversies en elektrische auto's, die in de VS snel in waarde dalen. Bij goedkope compacte auto's eten transport en belastingen de besparing vaak op.",
        "De veilingprijs is pas het begin. Daar komen veilingkosten, transport naar de haven, zeevracht, verzekering, invoerrecht, btw, nationale belastingen, aanpassing aan EU-eisen en eventuele reparatie bij. Pas het totaal laat zien of de import loont – reken het dus uit vóór je biedt, niet erna.",
      ],
    },
    {
      id: "auctions",
      title: "Veilingen van Copart en IAAI – zo koop je",
      paras: [
        "Copart en IAAI (Insurance Auto Auctions) verkopen vooral auto's van verzekeraars, verhuurbedrijven en banken – beschadigd, teruggevonden na diefstal, overstroomd of gewoon uit een vloot gehaald. Er wordt online geboden, terwijl de auto op een van de honderden terreinen in het land staat. De locatie telt: die bepaalt de kosten en de duur van het transport naar de haven.",
        "Een koper uit Europa biedt meestal via een broker (tussenpersoon met veilinglicentie), omdat veel auto's – vooral met een salvage-title – alleen door gelicentieerde kopers mogen worden gekocht. De broker rekent een commissie en regelt vaak ook transport en exportpapieren.",
        "Bovenop de hamerprijs komen de veilingkosten: een kopersprovisie die in stappen meestijgt met de prijs, een fee voor online bieden, een gate fee voor het ophalen van het terrein, een milieuheffing en een fee voor de title-afhandeling. Bij een auto van enkele duizenden dollars is dat samen meestal enkele honderden tot ruim duizend dollar.",
        "Betalen moet binnen korte tijd – meestal enkele werkdagen – en de auto moet worden opgehaald voordat stallingskosten beginnen. Te laat betalen betekent een boete en een geblokkeerd account, dus zorg dat het geld voor auto en kosten klaarstaat voordat je biedt.",
      ],
    },
    {
      id: "titles",
      title: "Soorten titles: clean, salvage, rebuilt",
      paras: [
        "In de VS wordt eigendom aangetoond met een title die de staat uitgeeft. Het soort title vertelt de geschiedenis van de auto en is belangrijk bij aankoop en export:",
        [
          "Clean – geen total loss in de geschiedenis; het duurst maar het minst riskant.",
          "Salvage – de verzekeraar verklaarde de auto total loss (de reparatiekosten overschreden een deel van de waarde). De meest voorkomende title bij Copart en IAAI.",
          "Rebuilt / Reconstructed – een voormalige total loss die is gerepareerd en in de VS weer op de weg mag.",
          "Non-repairable, Certificate of Destruction, Parts only, Junk – alleen voor onderdelen. Koop zulke auto's niet om mee te rijden: export en registratie in de EU kunnen onmogelijk of erg lastig zijn.",
        ],
        "In de Europese Unie worden Amerikaanse title-vermeldingen niet overgenomen in het kentekenbewijs. Een salvage-auto kan worden geregistreerd als hij na reparatie de keuring doorstaat. De title beïnvloedt wel de verkoopwaarde en laat vooral zien dat de auto zware schade had – die vakkundig moet worden hersteld.",
      ],
    },
    {
      id: "inspection",
      title: "Zo controleer je een auto vóór het bieden",
      paras: [
        "Op de veiling zie je de auto niet zelf, dus elk detail in de advertentie telt. Voordat je biedt:",
        [
          "Controleer de VIN-historie (bijv. Carfax, AutoCheck, de NMVTIS-database): schade, kilometerstand, aantal eigenaren, diefstal en overstroming.",
          "Bestudeer de foto's en de schadeomschrijving (primary / secondary damage). „Front end” kan van een bumper tot verbogen chassisbalken en afgegane airbags betekenen.",
          "Lees de conditievermeldingen goed: „Run and Drive” betekent dat de auto reed bij aankomst op het terrein, niet dat hij verkeersveilig is; „Engine Starts” betekent alleen dat de motor startte.",
          "Wees voorzichtig met auto's uit orkaan- en overstromingsgebieden (Florida, Texas, Louisiana). Waterranden onder de vloerbedekking, slib en gecorrodeerde stekkers zijn een reden om af te haken.",
          "De kilometerstand staat in mijlen (1 mijl = 1,61 km) en kan als „not actual” of „exempt” zijn gemarkeerd – dan is de teller niet betrouwbaar.",
        ],
        "Houd een reserve aan voor verborgen schade – tot 20–30% van de geschatte reparatiekosten. Vraag prijzen voor onderdelen in Europa of de VS op voordat je je maximumbod bepaalt.",
      ],
    },
    {
      id: "shipping",
      title: "Export en zeevracht",
      paras: [
        "Na aankoop brengt een autotransporter de auto van het terrein naar de exporthaven. De meest gebruikte havens zijn New Jersey/New York, Savannah (Georgia), Baltimore, Houston en Los Angeles/Long Beach. Vanaf de oostkust duurt de overtocht naar Noordzeehavens meestal 2–3 weken, vanuit Californië via het Panamakanaal tot 5–6 weken.",
        "Voor export zijn de originele title (of een gewaarmerkte kopie) en de factuur nodig. De exporteur dient de Electronic Export Information (EEI) in via AES – verplicht voor gebruikte voertuigen ongeacht de waarde – en auto en documenten moeten minstens 72 uur voor vertrek van het schip bij de Amerikaanse douane (CBP) worden aangeboden.",
        "Er zijn drie manieren van transport:",
        [
          "Gedeelde container (meestal 3–4 auto's in een 40-voetscontainer) – het populairst, geschikt voor schadeauto's en niet-rijdende auto's.",
          "Exclusieve container – duurder, maar de auto reist alleen en je kunt onderdelen bijladen.",
          "RoRo (roll-on/roll-off-schip) – vaak het goedkoopst, maar alleen voor rijdende auto's en met minder bescherming tegen schade.",
        ],
        "Een transportverzekering is de moeite waard – meestal 1,5–2% van de autowaarde. In de EU-haven wordt de container gelost en klaart een douane-expediteur de auto in. Lossen, terminal en agentschap betaal je in de bestemmingshaven.",
      ],
    },
    {
      id: "duty",
      title: "Invoerrecht, oorsprong en inklaring in de EU",
      paras: [
        "Het standaard EU-invoerrecht op personenauto's is 10% van de douanewaarde. Die waarde is de prijs van de auto met veilingkosten plus transport en verzekering tot de EU-grens (CIF-waarde). Pick-ups kunnen als bedrijfsvoertuig worden ingedeeld – dan is het invoerrecht 22% – en motoren betalen 6–8%.",
        "Van 1 juli 2026 tot eind 2029 kunnen in de VS gebouwde auto's de EU binnenkomen tegen 0% invoerrecht (Verordening (EU) 2026/1455). Voorwaarde: je moet de Amerikaanse oorsprong aan de douane aantonen en de auto moet rechtstreeks uit de VS worden verscheept. Een factuur of een „Made in USA”-label alleen is niet genoeg – er is een oorsprongsbewijs nodig. Het VIN geeft een aanwijzing: in de VS gebouwde auto's hebben een VIN dat met 1, 4 of 5 begint. Ook een Japans of Duits merk dat in Amerika is gebouwd kan in aanmerking komen, een in Europa gebouwde BMW die in de VS is gekocht niet.",
        "Invoer-btw wordt berekend tegen het tarief van het land waar wordt ingeklaard. De grondslag is de douanewaarde plus invoerrecht en transportkosten tot de bestemming in de EU. Bedrijven kunnen douaneregeling 4200 gebruiken: inklaren in het ene land en de btw afdragen in het land van registratie.",
        "Na de inklaring komen nationale belastingen – afhankelijk van het land een accijns (bijv. 3,1% of 18,6% in Polen, afhankelijk van de cilinderinhoud), een registratiebelasting op basis van CO₂, vermogen of waarde, of niets. Die bepalen vaak of de import loont.",
      ],
    },
    {
      id: "adaptation",
      title: "Aanpassing aan EU-eisen en registratie",
      paras: [
        "Auto's voor de Amerikaanse markt voldoen niet aan een aantal Europese technische eisen en moeten vóór de keuring worden aangepast:",
        [
          "De achterste richtingaanwijzers moeten oranje zijn – bij veel Amerikaanse auto's knipperen de rode remlichten.",
          "Een mistachterlicht is verplicht.",
          "De koplampen moeten de Europese dimlichtbundel hebben en goed zijn afgesteld.",
          "De snelheidsmeter moet km/h tonen (een dubbele schaal is meestal genoeg).",
          "Amerikaanse bandenspanningssensoren (TPMS) werken op 315 MHz – in Europa is 433 MHz gebruikelijk, wat telt bij het wisselen van wielen.",
        ],
        "Het aanpassen van de verlichting kost meestal enkele honderden euro. In sommige landen – bijv. Duitsland of Frankrijk – heeft een auto van buiten de EU bovendien een individuele goedkeuring of een expertrapport nodig, wat tijd en geld kost. In Nederland keurt de RDW een geïmporteerde auto bij de toelating.",
        "Voor de registratie heb je beëdigde vertalingen van title en factuur nodig, het inklaringsdocument, het bewijs van betaalde nationale belastingen en het keuringsrapport. Veel landen kennen een wettelijke termijn om een geïmporteerde auto te registreren – in Polen bijvoorbeeld 30 dagen.",
      ],
    },
    {
      id: "mistakes",
      title: "De meest gemaakte fouten bij import uit de VS",
      paras: [
        [
          "Bieden zonder de totale kosten uit te rekenen – kosten, transport en belastingen kunnen de veilingprijs verdubbelen.",
          "Een auto kopen met een „parts only”-title of certificate of destruction die niet legaal te registreren is.",
          "Vertrouwen op „Run and Drive” zonder de VIN-historie te controleren.",
          "Geen reserve voor verborgen schade en onderdelen – een schadeauto repareren kost bijna altijd meer dan de foto's doen vermoeden.",
          "Uitgaan van 0% invoerrecht zonder bewijs van Amerikaanse oorsprong – zonder bewijs betaal je 10%.",
          "Te laat betalen op de veiling en stallingskosten op het terrein oplopen.",
          "De termijn voor registratie of de aangifte van nationale belastingen na aankomst van de auto missen.",
        ],
      ],
    },
  ],
  CANADA: [
    {
      id: "market",
      title: "De Canadese automarkt – zo verschilt hij van de VS",
      paras: [
        "Canada is een kleinere markt dan de VS, maar met een vergelijkbaar aanbod: dezelfde merken, modellen en uitvoeringen, vaak iets goedkoper dan in Europa. Veel kopers zien Canada als alternatief voor de VS, vooral voor auto's uit Canadese fabrieken, die van het CETA-verdrag kunnen profiteren.",
        "Canadese auto's hebben enkele voordelen: een kilometerteller, af fabriek dagrijverlichting en winteruitrusting (stoelverwarming, soms een motorvoorverwarmer). Het nadeel kan roest zijn – 's winters wordt er veel gestrooid, en de onderkant van een auto uit Ontario of Quebec kan er slechter uitzien dan die van een auto uit het zuiden van de VS.",
        "Uit Canada worden vooral SUV's en pick-ups geïmporteerd, auto's die er zijn gebouwd (bijv. Toyota RAV4, Lexus RX, Honda CR-V en Civic, Chrysler Pacifica) en ex-leaseauto's met weinig kilometers.",
      ],
    },
    {
      id: "auctions",
      title: "Waar koop je een auto in Canada",
      paras: [
        "Schadeauto's worden in Canada verkocht door Copart Canada en IAA (voorheen Impact Auto Auctions), schadevrije auto's door handelaarsveilingen zoals ADESA en door dealers. Net als in de VS kom je bij veel veilingen alleen binnen via een gelicentieerde broker.",
        "Kopen bij dealers en particulieren via advertentiesites is ook populair. Bij een particuliere aankoop regel je de exportpapieren en het transport naar de haven zelf, dus de meeste Europese kopers schakelen een exportbedrijf in dat de auto ophaalt, de papieren controleert en hem verscheept.",
        "Bij de prijs komen veiling- of dealerkosten en – bij een dealer – de Canadese omzetbelastingen (GST/HST/PST). Een deel daarvan kan worden terugbetaald of niet worden gerekend als de dealer rechtstreeks voor export verkoopt – vraag ernaar vóór de aankoop.",
      ],
    },
    {
      id: "titles",
      title: "Eigendomsdocumenten en schadestatussen",
      paras: [
        "Canada kent geen Amerikaanse „title” – het document is de registratie van de provincie (in Ontario de „ownership”). De schadestatus staat in het provinciale register:",
        [
          "Ontario en de meeste provincies: Normal, Salvage (total loss, niet toegelaten op de weg), Rebuilt (gerepareerd en goedgekeurd na inspectie) en Irreparable – alleen voor onderdelen.",
          "Quebec: zwaar beschadigde voertuigen (VGA – véhicule gravement accidenté) met de vermelding „reconstruit” (herbouwd) of „irrécupérable” (onherstelbaar).",
        ],
        "Koop auto's met de status irreparable of irrécupérable niet om mee te rijden – ze kunnen niet legaal worden geregistreerd. Andere statussen worden niet overgenomen in het EU-kentekenbewijs, maar beïnvloeden de waarde en wijzen op zware schade.",
      ],
    },
    {
      id: "inspection",
      title: "Zo controleer je een auto uit Canada",
      paras: [
        [
          "VIN-historie: een CARFAX Canada-rapport toont schade, registraties in provincies en kilometerstand; controleer bij auto's die uit de VS kwamen ook de Amerikaanse historie.",
          "Pandrecht (lien): in Canada kan een auto onderpand zijn voor een lening. Controleer in het provinciale pandregister (bijv. PPSA) of de auto vrij is van lasten – anders kan de export worden geblokkeerd en kun je de auto zelfs kwijtraken.",
          "Roest: vraag foto's van de onderkant, dorpels, wielkasten en remleidingen – strooizout laat sporen na.",
          "Marktversie: Canadese auto's lijken meestal sterk op Amerikaanse en vragen vergelijkbare aanpassingen aan de verlichting.",
        ],
        "Voor veilingauto's gelden dezelfde regels als in de VS: schadefoto's, de betekenis van „Run and Drive” en een reserve voor verborgen schade.",
      ],
    },
    {
      id: "shipping",
      title: "Export en zeevracht uit Canada",
      paras: [
        "De meest gebruikte havens zijn Halifax en Montreal in het oosten en Vancouver in het westen. Vanaf de oostkust doet het schip naar Noordzeehavens er meestal zo'n 2 weken over – een van de snelste routes naar Europa. Auto's uit het westen gaan vaak per spoor naar het oosten of varen vanuit Vancouver via het Panamakanaal, wat langer duurt.",
        "Voor export zijn het eigendomsdocument (provinciale registratie), het aankoopbewijs en een exportaangifte in het CBSA-systeem (CERS) nodig, die meestal de exporteur of expediteur indient. De auto moet vrij zijn van pandrecht.",
        "De transportmogelijkheden zijn dezelfde als vanuit de VS: gedeelde container, exclusieve container of RoRo voor rijdende auto's. Houd in de winter rekening met vertraging in het landtransport naar de haven.",
      ],
    },
    {
      id: "duty",
      title: "Invoerrecht en het CETA-verdrag",
      paras: [
        "Dankzij het handelsverdrag EU–Canada (CETA) kunnen in Canada gebouwde auto's de EU binnenkomen tegen 0% invoerrecht. Voorwaarde is de Canadese oorsprong, bevestigd door een oorsprongsverklaring van de exporteur. Kopen in Canada is niet genoeg – veel auto's die in Canada worden verkocht zijn gebouwd in de VS, Mexico of Japan en betalen de volle 10%.",
        "Een VIN dat met „2” begint betekent een in Canada gebouwde auto. Dat is een goede aanwijzing, maar geen bewijs – bij aankoop van een particulier is een oorsprongsverklaring vaak lastig te krijgen, en zonder die verklaring is het invoerrecht 10% van de douanewaarde (CIF). Pick-ups die als bedrijfsvoertuig zijn ingedeeld betalen 22%.",
        "Bovenop het invoerrecht komt de invoer-btw van het land van inklaring, en in het land van registratie de nationale belastingen (accijns of registratiebelasting). Bedrijven kunnen regeling 4200 gebruiken en de btw in het bestemmingsland afdragen.",
      ],
    },
    {
      id: "adaptation",
      title: "Aanpassing aan EU-eisen en registratie",
      paras: [
        "Canadese auto's zijn iets makkelijker te registreren dan Amerikaanse: ze hebben een km/h-teller en af fabriek dagrijverlichting. Meestal moet je toch:",
        [
          "de achterste richtingaanwijzers oranje maken als de remlichten knipperen,",
          "een mistachterlicht toevoegen,",
          "de koplampen aanpassen aan de Europese dimlichtbundel.",
        ],
        "Voor registratie zijn beëdigde vertalingen nodig, het inklaringsdocument, het bewijs van nationale belastingen en een keuring. Landen als Duitsland of Frankrijk kunnen een individuele goedkeuring eisen.",
      ],
    },
    {
      id: "mistakes",
      title: "De meest gemaakte fouten bij import uit Canada",
      paras: [
        [
          "Ervan uitgaan dat elke auto uit Canada 0% invoerrecht betaalt – dat geldt alleen voor in Canada gebouwde auto's met een oorsprongsverklaring.",
          "Vóór de aankoop niet controleren op pandrecht (lien).",
          "Roest aan de onderkant negeren bij auto's uit provincies met strenge winters.",
          "Een auto met de status irreparable of irrécupérable kopen.",
          "Het landtransport van de westelijke provincies naar de havens in het oosten onderschatten.",
        ],
      ],
    },
  ],
  JAPAN: [
    {
      id: "market",
      title: "De Japanse automarkt – waarom JDM",
      paras: [
        "Japan staat bekend om auto's in zeer goede technische staat met weinig kilometers. De reden is de strenge shaken-keuring, die duurder wordt naarmate de auto ouder is – veel Japanners verkopen daarom na een paar jaar en de prijzen van oudere auto's dalen snel.",
        "Uit Japan worden vooral JDM-auto's (Japanese Domestic Market) geïmporteerd – sportlegendes (Nissan Skyline GT-R, Toyota Supra, Mazda RX-7, Honda NSX), terreinwagens (Toyota Land Cruiser), MPV's en nieuwere hybrides. Voor verzamelaars draait het vooral om modellen die nooit officieel in Europa zijn verkocht.",
        "Alle auto's van de Japanse markt hebben het stuur rechts. Ze kunnen in de EU worden geregistreerd, maar rijden met rechts stuur is minder comfortabel en zulke auto's zijn soms lastiger te verkopen – behalve gezochte verzamelmodellen.",
      ],
    },
    {
      id: "auctions",
      title: "Veilingen in Japan – USS en andere",
      paras: [
        "De meeste gebruikte auto's in Japan gaan via handelaarsveilingen. De grootste is het USS-netwerk, naast onder meer TAA, CAA, HAA, JU en Arai. Er worden elke week tienduizenden auto's aangeboden.",
        "Een buitenlandse koper biedt niet zelf – een Japanse exporteur (veilingagent) doet dat: hij heeft toegang tot de veilingen, vertaalt het veilingblad, koopt de auto, schrijft hem uit voor export en verscheept hem. Bovenop de hamerprijs komen de veilingfee, de commissie van de exporteur, het transport naar de haven en de exportdocumenten. Er wordt meestal in yen betaald.",
        "Je kunt ook uit de voorraad van een exporteur kopen – dat kan duurder zijn, maar de auto is al gecontroleerd en staat vaak al in de haven.",
      ],
    },
    {
      id: "titles",
      title: "Zo lees je een Japans veilingblad",
      paras: [
        "Het veilingblad (auction sheet) is het rapport van de veilinginspecteur – de belangrijkste informatiebron over de auto. Het bevat een totaalcijfer, een cijfer voor het interieur en een schadekaart van de carrosserie.",
        [
          "Totaalcijfer: S of 6 – praktisch nieuw; 5 en 4,5 – zeer goede staat; 4 – goede staat met lichte gebruikssporen; 3,5 en 3 – zichtbare gebreken of meer kilometers; R of RA – herstelde ongevalschade (RA – kleine reparatie); 0 of *** – beschadigd, overstroomd of niet beoordeeld.",
          "Interieurcijfer: van A (als nieuw) tot E (sterk versleten).",
          "Schadekaart: A – kras, U – deuk, B – deuk met kras, W – golving of reparatiesporen, S en C – roest en corrosie, P – lakvlekken, X – te vervangen onderdeel, XX – vervangen onderdeel, Y – scheur of gat. Het cijfer naast de letter (1–3) geeft de omvang van de schade aan.",
        ],
        "Het blad toont ook de door de veiling gecontroleerde kilometerstand, de uitrusting en opmerkingen van de inspecteur in het Japans – een goede exporteur vertaalt die vóór je biedt.",
      ],
    },
    {
      id: "inspection",
      title: "Waar je op let bij auto's uit Japan",
      paras: [
        [
          "Kilometerstand: Japanse auto's hebben meestal echte, lage kilometerstanden, maar controleer het verloop op het veilingblad en het exportcertificaat.",
          "Roest: auto's uit het noorden (Hokkaido) en kustgebieden kunnen door zout zijn aangetast – bekijk foto's van de onderkant.",
          "Modificaties: sportauto's hebben vaak een aangepast onderstel, uitlaat en motor, wat de keuring in de EU lastiger kan maken.",
          "Begrenzers: veel JDM-auto's zijn af fabriek begrensd op 180 km/h.",
          "Elektronica: Japanse radio's gebruiken de FM-band van 76–90 MHz, navigatie en menu's zijn in het Japans en het ETC-tolkastje is in Europa nutteloos.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Export en verscheping uit Japan",
      paras: [
        "Na de aankoop schrijft de exporteur de auto uit en vraagt hij het exportcertificaat (Export Certificate) aan – het document dat de registratie vervangt, met de autogegevens en de kilometerstand. Het is nodig voor inklaring en registratie in de EU, samen met de factuur en het cognossement (B/L).",
        "Auto's vertrekken vooral uit Yokohama, Nagoya, Kobe en Osaka. RoRo-schepen naar Europa doen er meestal 5–7 weken over (via het Suezkanaal of om Afrika heen), containers ongeveer even lang of iets langer. Een container is een goede keuze voor waardevolle of niet-rijdende auto's.",
        "De meest gebruikte bestemmingshavens zijn Bremerhaven, Rotterdam, Antwerpen en Zeebrugge. Een transportverzekering loont – op een lange reis is het risico op schade groter.",
      ],
    },
    {
      id: "duty",
      title: "Invoerrecht en het verdrag EU–Japan",
      paras: [
        "De Economische Partnerschapsovereenkomst EU–Japan (EPO) heeft het invoerrecht op auto's stapsgewijs afgeschaft – sinds 2026 kunnen auto's van Japanse oorsprong de EU binnenkomen tegen 0% invoerrecht. De oorsprong wordt aangetoond met een oorsprongsverklaring van de exporteur of met kennis van de importeur (documenten die laten zien dat de auto in Japan is gebouwd).",
        "In Japan gebouwde JDM-auto's komen meestal in aanmerking. Let op bij Japanse merken die elders zijn gebouwd (bijv. in de VS of Thailand) – die betalen het standaard 10% van de douanewaarde. Zonder oorsprongsbewijs is het invoerrecht ook 10%.",
        "Auto's ouder dan 30 jaar in originele staat kunnen als verzamelvoertuig gelden – dan is het invoerrecht 0% en rekenen sommige landen minder btw. Na de inklaring gelden in het land van registratie nationale belastingen op basis van motor, uitstoot of waarde.",
      ],
    },
    {
      id: "adaptation",
      title: "Rechts stuur – registratie in de EU",
      paras: [
        "Auto's met rechts stuur kunnen in EU-landen worden geregistreerd als ze aan de technische eisen voldoen. De belangrijkste aanpassingen:",
        [
          "koplampen voor rechts verkeer (afstellen of vervangen van de lampunits),",
          "een mistachterlicht aan de juiste kant en oranje richtingaanwijzers (Japanse auto's hebben die meestal al),",
          "een snelheidsmeter in km/h – Japanse auto's hebben die af fabriek.",
        ],
        "Sommige landen, zoals Duitsland, eisen een individuele goedkeuring of een expertrapport. Voor registratie zijn vertalingen van het exportcertificaat en de factuur nodig, het inklaringsdocument, het bewijs van nationale belastingen en een keuring.",
      ],
    },
    {
      id: "mistakes",
      title: "De meest gemaakte fouten bij import uit Japan",
      paras: [
        [
          "Bieden zonder vertaald veilingblad.",
          "De doorlooptijd onderschatten – van aankoop tot registratie gaan vaak 2–3 maanden voorbij.",
          "Uitgaan van 0% invoerrecht voor een Japans merk dat buiten Japan is gebouwd.",
          "De kosten van het aanpassen van de verlichting en een eventuele individuele goedkeuring vergeten.",
          "Een sterk gemodificeerde auto kopen die de keuring niet haalt.",
          "Geen verzekering voor de lange zeereis.",
        ],
      ],
    },
  ],
  UAE: [
    {
      id: "market",
      title: "De automarkt in de Verenigde Arabische Emiraten",
      paras: [
        "Dubai en de andere emiraten behoren tot de grootste markten voor luxeauto's ter wereld. De grote vraag naar nieuwe auto's vult de occasionmarkt met enkele jaren oude SUV's, sportwagens en premium sedans – vaak goedkoper dan in Europa.",
        "De meeste auto's die in de VAE worden verkocht zijn GCC-versies (Gulf Cooperation Council), gebouwd voor de hitte: sterkere airco en koeling, soms een andere uitrusting dan in Europa. Er zijn ook veel auto's uit de VS – vaak met schade – die als „import” worden doorverkocht.",
        "Uit de VAE worden vooral grote SUV's (Nissan Patrol, Toyota Land Cruiser, Lexus LX), luxe- en sportauto's geïmporteerd. Houd bij auto's met meer kilometers rekening met de gevolgen van het klimaat.",
      ],
    },
    {
      id: "auctions",
      title: "Waar koop je een auto in de VAE",
      paras: [
        "Auto's koop je bij dealers (ook via gecertificeerde occasionprogramma's van merken), op veilingen zoals Emirates Auction en Copart VAE en via advertenties. Dubai heeft daarnaast een grote occasionmarkt met veel exportbedrijven voor buitenlandse kopers.",
        "Bij aankoop vanuit het buitenland is een betrouwbare exporteur de veiligste weg: die controleert de auto en de documenten, schrijft hem uit, regelt het exportcertificaat en verscheept hem.",
      ],
    },
    {
      id: "titles",
      title: "Documenten: Mulkiya en exportcertificaat",
      paras: [
        "Het registratiedocument in de VAE is de Mulkiya-kaart van de verkeersautoriteit (in Dubai de RTA). Voor export moet de auto worden uitgeschreven en een exportcertificaat worden verkregen (vaak met exportplaten) – het belangrijkste document voor de inklaring in de EU.",
        "De auto mag geen openstaande boetes en geen bankpandrecht hebben. In de VAE worden veel auto's op krediet gekocht – controleer vóór de aankoop of de lening is afgelost en de bank de auto voor export heeft vrijgegeven.",
      ],
    },
    {
      id: "inspection",
      title: "Zo controleer je een auto uit de VAE",
      paras: [
        [
          "Herkomst: controleer met het VIN of de auto een GCC-versie is of uit de VS komt. Een VIN dat met 1, 4 of 5 begint betekent een in de VS gebouwde auto – controleer dan de Amerikaanse historie (schade, salvage-title).",
          "Overstroming: na het noodweer van 2024 kwamen veel auto's met waterschade op de markt. Zoek naar waterranden, slib en corrosie in het interieur en de elektronica.",
          "Klimaatschade: hoge temperaturen tasten rubberen afdichtingen, kunststof, accu's, banden en airco aan.",
          "Onderhoudshistorie: dealerauto's hebben meestal een volledige historie – een groot pluspunt bij doorverkoop.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Export en verscheping uit de VAE",
      paras: [
        "De belangrijkste haven is Jebel Ali in Dubai. De overtocht naar Europese havens duurt meestal 3–5 weken, afhankelijk van de route (via de Rode Zee en het Suezkanaal of om Afrika heen) en de bestemmingshaven. Auto's reizen in containers of op RoRo-schepen.",
        "Voor inklaring in de EU zijn het exportcertificaat, de factuur en het cognossement (B/L) nodig. Bij auto's die eerder uit de VS naar de VAE kwamen, zijn ook documenten uit de Amerikaanse historie nuttig.",
      ],
    },
    {
      id: "duty",
      title: "Invoerrecht bij import uit de VAE",
      paras: [
        "De EU heeft met de VAE geen verdrag dat het invoerrecht op auto's verlaagt, dus auto's uit de Emiraten betalen het standaard 10% van de douanewaarde (CIF) en pick-ups die als bedrijfsvoertuig zijn ingedeeld 22%. Dat geldt ook voor in de VS gebouwde auto's: het 0%-tarief voor Amerikaanse auto's vereist verscheping rechtstreeks uit de VS.",
        "Bovenop het invoerrecht komt de invoer-btw van het land van inklaring, en in het land van registratie de nationale belastingen. Auto's ouder dan 30 jaar in originele staat kunnen als verzamelvoertuig gelden, met 0% invoerrecht.",
      ],
    },
    {
      id: "adaptation",
      title: "Aanpassing aan EU-eisen en registratie",
      paras: [
        "GCC-versies hebben het stuur links, een km/h-teller en meestal verlichting die dicht bij de Europese ligt, dus de aanpassingen zijn vaak kleiner dan bij Amerikaanse auto's. Controleer toch de richtingaanwijzers, het mistachterlicht en de koplampen.",
        "Auto's die uit de VS naar de VAE zijn gebracht hebben Amerikaanse specificaties en vragen dezelfde aanpassingen als auto's die rechtstreeks in Amerika zijn gekocht. Sommige EU-landen eisen een individuele goedkeuring.",
      ],
    },
    {
      id: "mistakes",
      title: "De meest gemaakte fouten bij import uit de VAE",
      paras: [
        [
          "Een Amerikaanse auto kopen die als „GCC” wordt verkocht zonder VIN en historie te controleren.",
          "Een openstaande lening of boetes die de export blokkeren.",
          "Sporen van overstroming en hitteschade over het hoofd zien.",
          "Rekenen op 0% invoerrecht – auto's uit de VAE betalen het standaard 10%.",
        ],
      ],
    },
  ],
  UK: [
    {
      id: "market",
      title: "De Britse automarkt na de brexit",
      paras: [
        "Het Verenigd Koninkrijk is een grote occasionmarkt met een enorm aanbod aan premium-, sport- en klassieke auto's. Sinds de brexit is het voor de EU een derde land, dus import vraagt om inklaring – maar dankzij de handels- en samenwerkingsovereenkomst EU–VK (TCA) kunnen auto's die aan de oorsprongsregels voldoen tegen 0% invoerrecht binnenkomen.",
        "Alle Britse auto's hebben het stuur rechts. Daarom worden vooral auto's geïmporteerd waarbij dat weinig uitmaakt of die bijzonder voordelig zijn: klassiekers, verzamelauto's, zeldzame uitvoeringen en premiumauto's. Ook het terughalen van auto's van Europese merken die eerder naar het VK gingen is populair.",
      ],
    },
    {
      id: "auctions",
      title: "Waar koop je een auto in het VK",
      paras: [
        "Auto's koop je bij dealers, via advertenties (bijv. Auto Trader) en op veilingen – handelaarsveilingen (BCA, Manheim) en schadeveilingen (Copart UK). Veel auto's hebben een gedocumenteerde onderhoudshistorie.",
        "Op schadeveilingen hebben auto's een schadecategorie die je vóór de aankoop moet kennen.",
      ],
    },
    {
      id: "titles",
      title: "Schadecategorieën en het V5C",
      paras: [
        "Het registratiedocument is het V5C (logbook). Total loss-auto's krijgen in het VK een categorie:",
        [
          "Cat S – constructieve schade (bijv. chassisbalken, stijlen); de auto kan worden gerepareerd en terug de weg op.",
          "Cat N – niet-constructieve schade (bijv. elektronica, carrosseriedelen); de auto kan worden gerepareerd.",
          "Cat B – alleen voor onderdelen, de carrosserie moet worden vernietigd.",
          "Cat A – alleen voor de sloop.",
        ],
        "Koop auto's van categorie A of B niet om mee te rijden. Categorie S en N betekenen zware schade in het verleden – controleer de kwaliteit van de reparatie.",
      ],
    },
    {
      id: "inspection",
      title: "Zo controleer je een auto uit het VK",
      paras: [
        [
          "MOT-historie: op de overheidssite gov.uk bekijk je gratis met het kenteken alle MOT-keuringen – met de kilometerstand van elk jaar en de lijst met gebreken. Zo ontdek je het best een teruggedraaide teller.",
          "HPI-check (of vergelijkbaar): toont openstaande financiering, diefstal en of de auto als total loss is geregistreerd.",
          "Onderhoudshistorie en het aantal eigenaren uit het V5C.",
          "Kilometerstand in mijlen – voor registratie in de EU moet de teller ook km/h tonen.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Export en transport uit het VK",
      paras: [
        "De meeste auto's steken het Kanaal over per veerboot of trein (Dover–Calais, Eurotunnel), op een transporter of rijdend. Het transport duurt meestal enkele dagen tot een week. Auto's uit Schotland of Noord-Engeland kunnen ook per RoRo-schip naar havens in de Benelux en Duitsland.",
        "Sinds de brexit zijn twee douaneaangiften nodig: een exportaangifte in het VK en een invoeraangifte in de EU – ook als je de auto zelf rijdt. Meestal regelt een douane-expediteur bij de terminal dat. De houder meldt de definitieve export bovendien bij de DVLA via het betreffende deel van het V5C.",
        "Met Britse kentekenplaten naar het land van registratie rijden vraagt een geldige verzekering en MOT – een transporter is vaak eenvoudiger.",
      ],
    },
    {
      id: "duty",
      title: "Invoerrecht, TCA en btw",
      paras: [
        "De handels- en samenwerkingsovereenkomst EU–VK (TCA) maakt 0% invoerrecht mogelijk, maar alleen voor auto's die aan de oorsprongsregels voldoen – in de praktijk gebouwd in het VK of de EU. De oorsprong wordt aangetoond met een oorsprongsverklaring van de exporteur of kennis van de importeur. Een Japanse of Amerikaanse auto die in het VK is gekocht betaalt het standaard 10% van de douanewaarde.",
        "Los van het invoerrecht betaal je de invoer-btw van het land van inklaring. Vraag bij aankoop bij een Britse dealer of een exportverkoop zonder Britse btw mogelijk is – anders betaal je de btw twee keer.",
        "In het land van registratie komen nationale belastingen op basis van motor, uitstoot of waarde.",
      ],
    },
    {
      id: "adaptation",
      title: "Rechts stuur en registratie in de EU",
      paras: [
        "Britse auto's zijn gebouwd volgens Europese typegoedkeuringsregels, hebben daarom vaak een certificaat van overeenstemming (COC) en zijn makkelijker te registreren dan Amerikaanse. Meestal blijft over:",
        [
          "koplampen voor rechts verkeer,",
          "een mistachterlicht aan de juiste kant,",
          "een snelheidsmeter met km/h-schaal.",
        ],
        "Voor registratie zijn het V5C (of een exportbewijs), de factuur, beëdigde vertalingen, het inklaringsdocument, het bewijs van nationale belastingen en een keuring nodig.",
      ],
    },
    {
      id: "mistakes",
      title: "De meest gemaakte fouten bij import uit het VK",
      paras: [
        [
          "Ervan uitgaan dat na de brexit alles vrij van invoerrecht is – 0% geldt alleen voor auto's die aan de oorsprongsregels voldoen.",
          "Britse btw én EU-invoer-btw betalen voor dezelfde auto.",
          "Een auto van categorie A of B kopen.",
          "De MOT-historie en een HPI-rapport niet controleren.",
          "Zonder douaneaangiften de grens oversteken als je de auto zelf rijdt.",
        ],
      ],
    },
  ],
};

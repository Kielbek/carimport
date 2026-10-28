import { OriginDeep } from './types';

export const ORIGIN_DEEP: OriginDeep = {
  USA: [
    {
      id: "market",
      title: "JAV automobilių rinka – ką verta importuoti",
      paras: [
        "Jungtinės Valstijos yra didžiausia naudotų automobilių rinka pasaulyje: kasmet ten savininką pakeičia apie 40 milijonų transporto priemonių, o keli milijonai parduodami draudimo bendrovių aukcionuose. Todėl daugelis modelių – ypač apgadinti – yra gerokai pigesni nei Europoje, o versijų pasirinkimas didžiulis.",
        "Paprastai verta importuoti automobilius, kurie Europoje reti arba brangūs: muscle car tipo automobilius su dideliais V8 varikliais (Mustang, Camaro, Challenger), didelius visureigius ir pikapus, gerai įrengtas premium versijas bei elektromobilius, kurie JAV greitai praranda vertę. Pigesnių kompaktinių automobilių atveju transportas ir mokesčiai dažnai suvalgo sutaupymą.",
        "Atminkite, kad aukciono kaina – tik pradžia. Prie jos prisideda aukciono mokesčiai, transportas iki uosto, jūrinis frachtas, draudimas, muitas, PVM, nacionaliniai mokesčiai, pritaikymas ES reikalavimams ir galimas remontas. Tik bendra suma parodo, ar importas apsimoka – todėl skaičiuokite prieš statydami, o ne po to.",
      ],
    },
    {
      id: "auctions",
      title: "Copart ir IAAI aukcionai – kaip pirkti",
      paras: [
        "Copart ir IAAI (Insurance Auto Auctions) daugiausia parduoda draudimo bendrovių, nuomos įmonių ir bankų automobilius – apgadintus, rastus po vagystės, paskendusius ar tiesiog nurašytus iš parkų. Statymai vyksta internetu, o automobilis stovi vienoje iš kelių šimtų aikštelių visoje šalyje. Vieta svarbi: nuo jos priklauso transportavimo iki uosto kaina ir trukmė.",
        "Pirkėjas iš Europos paprastai stato per brokerį (tarpininką su aukciono licencija), nes daugelį automobilių – ypač su salvage titulu – gali pirkti tik licencijuoti pirkėjai. Brokeris ima komisinius ir dažnai pasirūpina transportu bei eksporto dokumentais.",
        "Prie laimėtos kainos pridedami aukciono mokesčiai: pirkėjo mokestis, laipsniškai didėjantis kartu su kaina, internetinio statymo mokestis, gate fee už išvežimą iš aikštelės, aplinkosaugos mokestis ir titulo tvarkymo mokestis. Kelių tūkstančių dolerių automobiliui tai paprastai sudaro nuo kelių šimtų iki daugiau nei tūkstančio dolerių.",
        "Sumokėti reikia per trumpą laiką – paprastai per kelias darbo dienas – o automobilį iš aikštelės reikia išsivežti, kol nepradėti skaičiuoti saugojimo mokesčiai. Pavėluotas mokėjimas reiškia baudą ir užblokuotą paskyrą, todėl pinigus automobiliui ir mokesčiams turėkite paruoštus prieš statydami.",
      ],
    },
    {
      id: "titles",
      title: "Titulų tipai: clean, salvage, rebuilt",
      paras: [
        "JAV nuosavybę patvirtina valstijos išduotas titulas (title). Jo tipas atskleidžia automobilio istoriją ir yra svarbus perkant bei eksportuojant:",
        [
          "Clean – automobilio istorijoje nėra visiško sunaikinimo; brangiausias, bet mažiausiai rizikingas.",
          "Salvage – draudikas pripažino visišką sunaikinimą (remonto kaina viršijo tam tikrą automobilio vertės dalį). Dažniausias titulas Copart ir IAAI aukcionuose.",
          "Rebuilt / Reconstructed – buvęs visiškai sunaikintas automobilis, kuris suremontuotas ir JAV vėl leistas eksploatuoti.",
          "Non-repairable, Certificate of Destruction, Parts only, Junk – tik dalims. Nepirkite jų važinėti: eksportas ir registracija ES gali būti neįmanomi arba labai sudėtingi.",
        ],
        "Europos Sąjungoje JAV titulo žymos į registracijos liudijimą neperkeliamos. Salvage automobilį galima įregistruoti, jei po remonto jis praeina techninę apžiūrą. Vis dėlto titulas daro įtaką perpardavimo kainai ir svarbiausia – rodo, kad automobilis turėjo rimtų pažeidimų, kurie turi būti tinkamai suremontuoti.",
      ],
    },
    {
      id: "inspection",
      title: "Kaip patikrinti automobilį prieš statant",
      paras: [
        "Aukcione automobilio pats nepamatysite, todėl svarbi kiekviena skelbimo detalė. Prieš statydami:",
        [
          "Patikrinkite istoriją pagal VIN (pvz., Carfax, AutoCheck, NMVTIS duomenų bazė): pažeidimus, ridą, savininkų skaičių, vagystes ir potvynius.",
          "Išnagrinėkite nuotraukas ir pažeidimų aprašymą (primary / secondary damage). „Front end“ gali reikšti bet ką – nuo buferio iki sulenktų išilginių sijų ir išsiskleidusių oro pagalvių.",
          "Atidžiai skaitykite būklės žymas: „Run and Drive“ reiškia, kad automobilis važiavo atvykęs į aikštelę, o ne kad jis tinkamas eismui; „Engine Starts“ reiškia tik tai, kad variklis užsivedė.",
          "Būkite atsargūs su automobiliais iš uraganų ir potvynių zonų (Florida, Teksasas, Luiziana). Vandens žymės po kilimu, dumblas ir korozijos paveiktos elektros jungtys – priežastis atsisakyti.",
          "Rida nurodoma myliomis (1 mylia = 1,61 km) ir gali būti pažymėta „not actual“ arba „exempt“ – tada ridos skaitikliu pasitikėti negalima.",
        ],
        "Protinga turėti rezervą paslėptiems pažeidimams – iki 20–30 % numatomos remonto kainos. Prieš nustatydami didžiausią statymą, gaukite dalių kainų pasiūlymą iš Europos ar JAV.",
      ],
    },
    {
      id: "shipping",
      title: "Eksportas ir jūrinis transportas",
      paras: [
        "Po pirkimo autovežis nuveža automobilį iš aikštelės į eksporto uostą. Dažniausi uostai – Naujasis Džersis/Niujorkas, Savana (Džordžija), Baltimorė, Hiustonas ir Los Andželas/Long Byčas. Iš rytinės pakrantės kelionė iki Šiaurės jūros uostų paprastai trunka 2–3 savaites, iš Kalifornijos per Panamos kanalą – iki 5–6 savaičių.",
        "Eksportui reikia originalaus titulo (arba patvirtintos kopijos) ir sąskaitos faktūros. Eksportuotojas pateikia Electronic Export Information (EEI) AES sistemoje – privaloma naudotoms transporto priemonėms nepriklausomai nuo vertės – o automobilis ir dokumentai turi būti pateikti JAV muitinei (CBP) likus ne mažiau kaip 72 valandoms iki laivo išplaukimo.",
        "Gabenti galima trimis būdais:",
        [
          "Bendras konteineris (paprastai 3–4 automobiliai 40 pėdų konteineryje) – populiariausias, tinka apgadintiems ir nevažiuojantiems automobiliams.",
          "Atskiras konteineris – brangiau, bet automobilis keliauja vienas ir galima pridėti dalių.",
          "RoRo (roll-on/roll-off laivas) – dažnai pigiausia, bet tik važiuojantiems automobiliams ir su mažesne apsauga nuo pažeidimų.",
        ],
        "Verta apdrausti krovinį – paprastai 1,5–2 % automobilio vertės. ES uoste konteineris iškraunamas, o muitinės tarpininkas automobilį išmuitina. Iškrovimo, terminalo ir agentūros mokesčiai mokami paskirties uoste.",
      ],
    },
    {
      id: "duty",
      title: "Muitas, kilmė ir išmuitinimas ES",
      paras: [
        "Standartinis ES muitas lengviesiems automobiliams – 10 % muitinės vertės. Muitinės vertė – tai automobilio kaina su aukciono mokesčiais plius transportas ir draudimas iki ES sienos (CIF vertė). Pikapai gali būti priskirti krovininėms transporto priemonėms – tada muitas 22 % – o motociklams taikoma 6–8 %.",
        "Nuo 2026 m. liepos 1 d. iki 2029 m. pabaigos JAV pagaminti automobiliai į ES gali būti įvežami taikant 0 % muitą (Reglamentas (ES) 2026/1455). Sąlyga: muitinei turite įrodyti amerikietišką automobilio kilmę, o automobilis turi būti išsiųstas tiesiai iš JAV. Sąskaitos ar lipduko „Made in USA“ nepakanka – reikia kilmės įrodymo. VIN duoda užuominą: JAV pagamintų automobilių VIN prasideda 1, 4 arba 5. Sąlygas gali atitikti ir Amerikoje surinktas japoniškas ar vokiškas automobilis, o Europoje pagamintas ir JAV pirktas BMW – ne.",
        "Importo PVM skaičiuojamas pagal šalies, kurioje automobilis išmuitinamas, tarifą. PVM bazė – muitinės vertė plius muitas ir transporto išlaidos iki paskirties vietos ES. Įmonės gali taikyti muitinės procedūrą 4200: išmuitinti automobilį vienoje šalyje, o PVM deklaruoti registracijos šalyje.",
        "Po išmuitinimo mokami nacionaliniai mokesčiai – priklausomai nuo šalies akcizas (pvz., Lenkijoje 3,1 % arba 18,6 % pagal variklio tūrį), registracijos mokestis pagal CO₂, galią ar vertę (Lietuvoje – automobilių registracijos mokestis pagal CO₂), arba visai nieko. Dažnai būtent jie lemia, ar importas apsimoka.",
      ],
    },
    {
      id: "adaptation",
      title: "Pritaikymas ES reikalavimams ir registracija",
      paras: [
        "JAV rinkai pagaminti automobiliai neatitinka kai kurių Europos techninių reikalavimų, todėl prieš techninę apžiūrą juos reikia perdaryti:",
        [
          "Galiniai posūkių žibintai turi būti oranžiniai – daugelyje amerikietiškų automobilių mirksi raudoni stabdžių žibintai.",
          "Privalomas galinis rūko žibintas.",
          "Priekiniai žibintai turi turėti europietišką artimųjų šviesų pluoštą ir būti tinkamai sureguliuoti.",
          "Spidometras turi rodyti km/h (paprastai pakanka dvigubos skalės).",
          "Amerikietiški padangų slėgio jutikliai (TPMS) veikia 315 MHz dažniu – Europoje įprastas 433 MHz, o tai svarbu keičiant ratus.",
        ],
        "Žibintų perdarymas paprastai kainuoja kelis šimtus eurų. Kai kuriose šalyse – pvz., Vokietijoje ar Prancūzijoje – automobiliui iš ne ES šalies prieš registraciją dar reikia individualaus patvirtinimo arba eksperto išvados, o tai užima laiko ir kainuoja.",
        "Registracijai paruoškite titulo ir sąskaitos faktūros vertimus, išmuitinimo dokumentą, nacionalinio mokesčio sumokėjimo įrodymą ir techninės apžiūros protokolą. Daugelis šalių nustato teisinį terminą importuotam automobiliui įregistruoti – pavyzdžiui, Lenkijoje 30 dienų.",
      ],
    },
    {
      id: "mistakes",
      title: "Dažniausios klaidos importuojant iš JAV",
      paras: [
        [
          "Statymas neapskaičiavus bendros kainos – mokesčiai, transportas ir rinkliavos gali padvigubinti aukciono kainą.",
          "Automobilio su „parts only“ titulu ar sunaikinimo pažyma pirkimas, kurio negalima teisėtai įregistruoti.",
          "Pasitikėjimas „Run and Drive“ žyma nepatikrinus istorijos pagal VIN.",
          "Rezervo paslėptiems pažeidimams ir dalims neturėjimas – daužto automobilio remontas beveik visada kainuoja daugiau, nei rodo nuotraukos.",
          "Tikėjimasis 0 % muito be amerikietiškos kilmės įrodymo – be jo mokėsite 10 %.",
          "Pavėluotas aukciono apmokėjimas ir susikaupę saugojimo mokesčiai aikštelėje.",
          "Praleistas registracijos ar nacionalinio mokesčio deklaravimo terminas atvykus automobiliui.",
        ],
      ],
    },
  ],
  CANADA: [
    {
      id: "market",
      title: "Kanados automobilių rinka – kuo ji skiriasi nuo JAV",
      paras: [
        "Kanada yra mažesnė rinka nei JAV, bet siūlo beveik tą patį: tas pačias markes, modelius ir komplektacijas, dažnai šiek tiek pigiau nei Europoje. Daugelis pirkėjų laiko ją JAV alternatyva, ypač kalbant apie Kanados gamyklose pagamintus automobilius, kuriems gali būti taikomas CETA susitarimas.",
        "Kanadietiški automobiliai turi kelis privalumus: ridos skaitiklį kilometrais, gamyklinius dienos šviesos žibintus ir žieminę įrangą (šildomas sėdynes, kartais variklio pašildytuvą). Trūkumas gali būti korozija – žiemą keliai gausiai barstomi druska, todėl automobilio iš Ontarijo ar Kvebeko dugnas gali atrodyti prasčiau nei automobilio iš pietinių JAV.",
        "Iš Kanados dažniausiai importuojami visureigiai ir pikapai, vietoje pagaminti automobiliai (pvz., Toyota RAV4, Lexus RX, Honda CR-V ir Civic, Chrysler Pacifica) bei mažos ridos automobiliai po lizingo.",
      ],
    },
    {
      id: "auctions",
      title: "Kur pirkti automobilį Kanadoje",
      paras: [
        "Apgadintus automobilius Kanadoje parduoda Copart Canada ir IAA (buvęs Impact Auto Auctions), neapgadintus – prekybininkų aukcionai, pavyzdžiui, ADESA, ir prekybininkai. Kaip ir JAV, daugelis aukcionų prieinami tik per licencijuotą brokerį.",
        "Populiaru pirkti ir iš prekybininkų bei privačių asmenų per skelbimų portalus. Perkant iš privataus asmens eksporto dokumentais ir transportu iki uosto teks pasirūpinti patiems, todėl dauguma Europos pirkėjų naudojasi eksporto įmone, kuri paima automobilį, patikrina dokumentus ir jį išsiunčia.",
        "Prie kainos pridėkite aukciono ar prekybininko mokesčius ir – perkant iš prekybininko – Kanados pardavimo mokesčius (GST/HST/PST). Kai kuriuos jų galima susigrąžinti arba jie netaikomi, kai prekybininkas parduoda tiesiogiai eksportui – pasiteiraukite prieš pirkdami.",
      ],
    },
    {
      id: "titles",
      title: "Nuosavybės dokumentai ir pažeidimų statusai",
      paras: [
        "Kanadoje nėra amerikietiško tipo „title“ – dokumentas yra provincijos išduota registracija (Ontarijuje – „ownership“). Pažeidimo statusas įrašomas į provincijos registrą:",
        [
          "Ontarijas ir dauguma provincijų: Normal, Salvage (visiškas sunaikinimas, eksploatuoti draudžiama), Rebuilt (suremontuotas ir patvirtintas po patikros) ir Irreparable – tik dalims.",
          "Kvebekas: sunkiai apgadintos transporto priemonės (VGA – véhicule gravement accidenté), pažymėtos „reconstruit“ (atkurta) arba „irrécupérable“ (neatkuriama).",
        ],
        "Nepirkite važinėti automobilių, pažymėtų irreparable ar irrécupérable – jų negalima teisėtai įregistruoti. Kiti statusai į ES registracijos liudijimą neperkeliami, tačiau turi įtakos vertei ir rodo, kad automobilis turėjo rimtų pažeidimų.",
      ],
    },
    {
      id: "inspection",
      title: "Kaip patikrinti automobilį iš Kanados",
      paras: [
        [
          "Istorija pagal VIN: CARFAX Canada ataskaita parodo pažeidimus, provincijų registracijas ir ridą; automobiliams, atvykusiems iš JAV, patikrinkite ir JAV istoriją.",
          "Įkeitimai: Kanadoje automobilis gali būti paskolos užstatas. Provincijos įkeitimų registre (pvz., PPSA) patikrinkite, ar automobilis neapsunkintas – kitaip eksportas gali būti užblokuotas ir automobilį galite net prarasti.",
          "Korozija: paprašykite dugno, slenksčių, ratų arkų ir stabdžių vamzdelių nuotraukų – kelių druska palieka pėdsakų.",
          "Rinkos versija: kanadietiški automobiliai paprastai labai panašūs į amerikietiškus ir jiems reikia panašių žibintų pakeitimų.",
        ],
        "Aukciono automobiliams galioja tos pačios taisyklės kaip JAV: pažeidimų nuotraukos, „Run and Drive“ reikšmė ir rezervas paslėptiems pažeidimams.",
      ],
    },
    {
      id: "shipping",
      title: "Eksportas ir transportas iš Kanados",
      paras: [
        "Dažniausiai naudojami uostai – Halifaksas ir Monrealis rytuose bei Vankuveris vakaruose. Iš rytinės pakrantės laivas iki Šiaurės jūros uostų plaukia paprastai apie 2 savaites – tai vienas greičiausių maršrutų į Europą. Automobiliai iš vakarinių provincijų dažnai keliauja į rytus traukiniu arba išplukdomi iš Vankuverio per Panamos kanalą, o tai užtrunka ilgiau.",
        "Eksportui reikia nuosavybės dokumento (provincijos registracijos), pirkimo įrodymo ir eksporto deklaracijos CBSA sistemoje (CERS), kurią paprastai pateikia eksportuotojas arba ekspeditorius. Automobilis neturi būti įkeistas.",
        "Gabenimo galimybės tos pačios kaip iš JAV: bendras konteineris, atskiras konteineris arba RoRo važiuojantiems automobiliams. Žiemą įvertinkite galimus sausumos transporto iki uosto vėlavimus.",
      ],
    },
    {
      id: "duty",
      title: "Muitas ir CETA susitarimas",
      paras: [
        "Dėl ES ir Kanados prekybos susitarimo (CETA) Kanadoje pagaminti automobiliai į ES gali būti įvežami taikant 0 % muitą. Sąlyga – Kanados kilmė, patvirtinta eksportuotojo kilmės deklaracija. Nepakanka nupirkti automobilį Kanadoje – daugelis ten parduodamų automobilių pagaminti JAV, Meksikoje ar Japonijoje ir už juos mokamas visas 10 % muitas.",
        "VIN, prasidedantis „2“, reiškia, kad automobilis pagamintas Kanadoje. Tai gera užuomina, bet ne įrodymas – perkant iš privataus asmens kilmės deklaraciją dažnai sunku gauti, o be jos muitas sudaro 10 % muitinės vertės (CIF). Krovininėms priskirtiems pikapams taikoma 22 %.",
        "Be muito mokamas išmuitinimo šalies importo PVM ir registracijos šalies nacionaliniai mokesčiai (akcizas ar registracijos mokestis). Įmonės gali taikyti procedūrą 4200 ir deklaruoti PVM paskirties šalyje.",
      ],
    },
    {
      id: "adaptation",
      title: "Pritaikymas ES reikalavimams ir registracija",
      paras: [
        "Kanadietiškus automobilius įregistruoti šiek tiek lengviau nei amerikietiškus: jie turi spidometrą km/h ir gamyklinius dienos šviesos žibintus. Tačiau paprastai vis tiek reikia:",
        [
          "pakeisti galinius posūkių žibintus oranžiniais, jei mirksi stabdžių žibintai,",
          "įrengti galinį rūko žibintą,",
          "pritaikyti priekinius žibintus europietiškam artimųjų šviesų pluoštui.",
        ],
        "Registracijai reikia dokumentų vertimų, išmuitinimo dokumento, nacionalinių mokesčių įrodymo ir techninės apžiūros. Tokios šalys kaip Vokietija ar Prancūzija gali reikalauti individualaus patvirtinimo.",
      ],
    },
    {
      id: "mistakes",
      title: "Dažniausios klaidos importuojant iš Kanados",
      paras: [
        [
          "Manymas, kad kiekvienam automobiliui iš Kanados taikomas 0 % muitas – tai galioja tik Kanadoje pagamintiems automobiliams su kilmės deklaracija.",
          "Nepatikrintas įkeitimas prieš pirkimą.",
          "Dugno korozijos ignoravimas automobiliuose iš atšiaurių žiemų provincijų.",
          "Automobilio su statusu irreparable ar irrécupérable pirkimas.",
          "Sausumos transporto iš vakarinių provincijų iki rytinių uostų nuvertinimas.",
        ],
      ],
    },
  ],
  JAPAN: [
    {
      id: "market",
      title: "Japonijos automobilių rinka – kodėl JDM",
      paras: [
        "Japonija garsėja labai geros techninės būklės ir mažos ridos automobiliais. Priežastis – griežta shaken techninė apžiūra, kuri brangsta senstant automobiliui – todėl daugelis japonų parduoda automobilius po kelerių metų, o senesnių automobilių kainos greitai krenta.",
        "Didžioji dalis importo iš Japonijos – JDM automobiliai (Japanese Domestic Market): sportinių automobilių legendos (Nissan Skyline GT-R, Toyota Supra, Mazda RX-7, Honda NSX), visureigiai (Toyota Land Cruiser), vienatūriai ir naujesni hibridai. Kolekcininkams svarbiausi modeliai, kurie Europoje niekada nebuvo oficialiai parduodami.",
        "Visi Japonijos rinkos automobiliai yra su dešiniuoju vairu. Juos galima įregistruoti ES, tačiau važiuoti jais dešiniuoju eismu mažiau patogu ir juos sunkiau parduoti – išskyrus paklausius kolekcinius modelius.",
      ],
    },
    {
      id: "auctions",
      title: "Aukcionai Japonijoje – USS ir kiti",
      paras: [
        "Dauguma naudotų automobilių Japonijoje parduodami prekybininkų aukcionuose. Didžiausias – USS tinklas, be to, be kitų, TAA, CAA, HAA, JU ir Arai. Kas savaitę siūloma dešimtys tūkstančių automobilių.",
        "Užsienio pirkėjas nestato pats – tai daro Japonijos eksportuotojas (aukciono agentas): jis turi prieigą prie aukcionų, išverčia aukciono lapą, nuperka automobilį, išregistruoja jį eksportui ir išsiunčia. Prie laimėtos kainos pridedamas aukciono mokestis, eksportuotojo komisiniai, vidaus transportas iki uosto ir eksporto dokumentai. Mokama paprastai jenomis.",
        "Galima pirkti ir iš eksportuotojo sandėlio – gali kainuoti daugiau, bet automobilis jau patikrintas ir dažnai laukia uoste.",
      ],
    },
    {
      id: "titles",
      title: "Kaip skaityti Japonijos aukciono lapą",
      paras: [
        "Aukciono lapas (auction sheet) – tai aukciono inspektoriaus ataskaita, svarbiausias informacijos apie automobilį šaltinis. Jame pateikiamas bendras įvertinimas, salono įvertinimas ir kėbulo pažeidimų žemėlapis.",
        [
          "Bendras įvertinimas: S arba 6 – praktiškai naujas; 5 ir 4,5 – labai gera būklė; 4 – gera, su nedideliais naudojimo pėdsakais; 3,5 ir 3 – matomi defektai arba didesnė rida; R arba RA – suremontuota avarija (RA – nedidelis remontas); 0 arba *** – apgadintas, paskendęs arba neįvertintas.",
          "Salono įvertinimas: nuo A (kaip naujas) iki E (labai nusidėvėjęs).",
          "Pažeidimų žemėlapis: A – įbrėžimas, U – įlenkimas, B – įlenkimas su įbrėžimu, W – nelygumas ar remonto pėdsakai, S ir C – rūdys ir korozija, P – dažų pėdsakai, X – keistina detalė, XX – pakeista detalė, Y – įtrūkimas ar skylė. Skaičius šalia raidės (1–3) rodo pažeidimo dydį.",
        ],
        "Lape taip pat nurodoma aukciono patikrinta rida, įranga ir inspektoriaus pastabos japonų kalba – geras eksportuotojas jas išverčia prieš statymą.",
      ],
    },
    {
      id: "inspection",
      title: "Į ką atkreipti dėmesį perkant japonišką automobilį",
      paras: [
        [
          "Rida: japoniški automobiliai paprastai turi tikrą, mažą ridą, bet patikrinkite jos istoriją aukciono lape ir eksporto sertifikate.",
          "Rūdys: automobiliai iš šiaurės (Hokaido) ir pakrančių gali būti pažeisti druskos – peržiūrėkite dugno nuotraukas.",
          "Modifikacijos: sportiniai automobiliai dažnai turi pakeistą pakabą, išmetimo sistemą ir variklį, o tai gali apsunkinti techninę apžiūrą ES.",
          "Greičio ribotuvai: daugelis JDM automobilių turi gamyklinį ribotuvą ties 180 km/h.",
          "Elektronika: japoniški radijo imtuvai naudoja 76–90 MHz FM diapazoną, navigacija ir meniu – japonų kalba, o ETC kelių mokesčių įrenginys Europoje nenaudingas.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Eksportas ir transportas iš Japonijos",
      paras: [
        "Po pirkimo eksportuotojas išregistruoja automobilį ir gauna Export Certificate – registraciją pakeičiantį dokumentą su automobilio duomenimis ir rida. Jo reikia išmuitinimui ir registracijai ES kartu su sąskaita faktūra ir konosamentu (B/L).",
        "Automobiliai daugiausia išplukdomi iš Jokohamos, Nagojos, Kobės ir Osakos. RoRo laivai į Europą paprastai plaukia 5–7 savaites (per Sueco kanalą arba aplink Afriką), konteineriai – panašiai arba šiek tiek ilgiau. Konteineris – geras pasirinkimas vertingiems ar nevažiuojantiems automobiliams.",
        "Dažniausi paskirties uostai – Bremerhafenas, Roterdamas, Antverpenas ir Zebriugė. Krovinio draudimas apsimoka – ilgos kelionės metu pažeidimų rizika didesnė.",
      ],
    },
    {
      id: "duty",
      title: "Muitas ir ES bei Japonijos susitarimas",
      paras: [
        "ES ir Japonijos ekonominės partnerystės susitarimas (EPS) palaipsniui panaikino muitą automobiliams – nuo 2026 m. japoniškos kilmės automobiliai į ES gali būti įvežami taikant 0 % muitą. Kilmė įrodoma eksportuotojo kilmės deklaracija arba importuotojo žiniomis (dokumentais, rodančiais, kad automobilis pagamintas Japonijoje).",
        "Japonijoje pagaminti JDM automobiliai paprastai atitinka sąlygas. Būkite atsargūs su kitur (pvz., JAV ar Tailande) pagamintomis japoniškomis markėmis – joms taikomas standartinis 10 % muitinės vertės muitas. Be kilmės įrodymo muitas taip pat 10 %.",
        "Senesni nei 30 metų originalios būklės automobiliai gali būti laikomi kolekcinėmis transporto priemonėmis – tada muitas 0 %, o kai kuriose šalyse taikomas lengvatinis PVM. Po išmuitinimo registracijos šalyje mokami nacionaliniai mokesčiai pagal variklį, emisijas ar vertę.",
      ],
    },
    {
      id: "adaptation",
      title: "Dešinysis vairas – registracija ES",
      paras: [
        "Automobilius su dešiniuoju vairu galima įregistruoti ES šalyse, jei jie atitinka techninius reikalavimus. Pagrindiniai pakeitimai:",
        [
          "priekiniai žibintai su šviesos pluoštu dešiniajam eismui (sureguliavimas arba stiklų pakeitimas),",
          "galinis rūko žibintas tinkamoje pusėje ir oranžiniai posūkių žibintai (japoniški automobiliai juos paprastai jau turi),",
          "spidometras km/h – japoniški automobiliai jį turi gamykliškai.",
        ],
        "Kai kurios šalys, pvz., Vokietija, reikalauja individualaus patvirtinimo ar eksperto išvados. Registracijai reikia eksporto sertifikato ir sąskaitos faktūros vertimų, išmuitinimo dokumento, nacionalinių mokesčių įrodymo ir techninės apžiūros.",
      ],
    },
    {
      id: "mistakes",
      title: "Dažniausios klaidos importuojant iš Japonijos",
      paras: [
        [
          "Statymas be išversto aukciono lapo.",
          "Laiko nuvertinimas – nuo pirkimo iki registracijos dažnai praeina 2–3 mėnesiai.",
          "Tikėjimasis 0 % muito japoniškai markei, pagamintai ne Japonijoje.",
          "Pamirštos žibintų perdarymo ir galimo individualaus patvirtinimo išlaidos.",
          "Stipriai modifikuoto automobilio, kuris nepraeis techninės apžiūros, pirkimas.",
          "Draudimo ilgai kelionei neturėjimas.",
        ],
      ],
    },
  ],
  UAE: [
    {
      id: "market",
      title: "Jungtinių Arabų Emyratų automobilių rinka",
      paras: [
        "Dubajus ir kiti emyratai – vienos didžiausių prabangių automobilių rinkų pasaulyje. Didelė naujų automobilių paklausa pripildo naudotų automobilių rinką kelerių metų senumo visureigių, sportinių automobilių ir premium sedanų – dažnai pigesnių nei Europoje.",
        "Dauguma JAE parduodamų automobilių yra GCC versijos (Persijos įlankos bendradarbiavimo taryba), pritaikytos karščiui: galingesnis kondicionierius ir aušinimas, kartais kitokia įranga nei Europoje. Taip pat yra daug iš JAV atvežtų automobilių – dažnai apgadintų – kurie perparduodami kaip „importiniai“.",
        "Iš JAE dažniausiai importuojami dideli visureigiai (Nissan Patrol, Toyota Land Cruiser, Lexus LX), prabangūs ir sportiniai automobiliai. Didesnės ridos automobilių atveju atsižvelkite į klimato poveikį.",
      ],
    },
    {
      id: "auctions",
      title: "Kur pirkti automobilį JAE",
      paras: [
        "Automobiliai perkami iš prekybininkų (įskaitant markių sertifikuotų naudotų automobilių programas), aukcionuose, pavyzdžiui, Emirates Auction ir Copart UAE, bei iš skelbimų. Dubajuje taip pat veikia didelė naudotų automobilių rinka su daugybe eksporto įmonių, aptarnaujančių užsienio pirkėjus.",
        "Perkant iš užsienio saugiausia veikti per patikimą eksportuotoją: jis patikrina automobilį ir dokumentus, jį išregistruoja, gauna eksporto sertifikatą ir išsiunčia automobilį.",
      ],
    },
    {
      id: "titles",
      title: "Dokumentai: Mulkiya ir eksporto sertifikatas",
      paras: [
        "Registracijos dokumentas JAE – Mulkiya kortelė, kurią išduoda eismo institucija (Dubajuje – RTA). Eksportui automobilis turi būti išregistruotas ir gautas eksporto sertifikatas (dažnai su eksporto numeriais) – pagrindinis dokumentas išmuitinant ES.",
        "Automobilis neturi turėti nesumokėtų baudų ar banko įkeitimo. Daugelis automobilių JAE perkami kreditan – prieš pirkdami patikrinkite, ar paskola grąžinta ir bankas atleido automobilį eksportui.",
      ],
    },
    {
      id: "inspection",
      title: "Kaip patikrinti automobilį iš JAE",
      paras: [
        [
          "Kilmė: pagal VIN patikrinkite, ar automobilis yra GCC versija, ar atvežtas iš JAV. VIN, prasidedantis 1, 4 arba 5, reiškia JAV pagamintą automobilį – tada patikrinkite jo JAV istoriją (pažeidimus, salvage titulą).",
          "Potvyniai: po 2024 m. audrų į rinką pateko daug paskendusių automobilių. Ieškokite vandens žymių, dumblo ir korozijos salone bei elektronikoje.",
          "Klimato pažeidimai: aukšta temperatūra dėvi gumines tarpines, plastikus, akumuliatorius, padangas ir kondicionierių.",
          "Aptarnavimo istorija: prekybininkų automobiliai paprastai turi pilnus įrašus – didelis pliusas perparduodant.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Eksportas ir transportas iš JAE",
      paras: [
        "Pagrindinis uostas – Džebel Ali Dubajuje. Kelionė iki Europos uostų paprastai trunka 3–5 savaites, priklausomai nuo maršruto (per Raudonąją jūrą ir Sueco kanalą arba aplink Afriką) ir paskirties uosto. Automobiliai gabenami konteineriuose arba RoRo laivais.",
        "Išmuitinant ES reikia eksporto sertifikato, sąskaitos faktūros ir konosamento (B/L). Automobiliams, anksčiau atvežtiems į JAE iš JAV, naudingi ir JAV istorijos dokumentai.",
      ],
    },
    {
      id: "duty",
      title: "Muitas importuojant iš JAE",
      paras: [
        "ES neturi su JAE susitarimo, kuris sumažintų automobilių muitą, todėl automobiliams iš Emyratų taikomas standartinis 10 % muitinės vertės (CIF) muitas, o krovininėms priskirtiems pikapams – 22 %. Tai galioja ir JAV pagamintiems automobiliams: 0 % muitas amerikietiškiems automobiliams taikomas tik juos gabenant tiesiai iš JAV.",
        "Be muito mokamas išmuitinimo šalies importo PVM ir registracijos šalies nacionaliniai mokesčiai. Senesni nei 30 metų originalios būklės automobiliai gali būti laikomi kolekcinėmis transporto priemonėmis su 0 % muitu.",
      ],
    },
    {
      id: "adaptation",
      title: "Pritaikymas ES reikalavimams ir registracija",
      paras: [
        "GCC versijos automobiliai turi kairįjį vairą, spidometrą km/h ir paprastai europietiškai specifikacijai artimą apšvietimą, todėl pakeitimų dažnai reikia mažiau nei amerikietiškiems automobiliams. Vis dėlto patikrinkite posūkių žibintus, galinį rūko žibintą ir priekinius žibintus.",
        "Į JAE iš JAV atvežti automobiliai turi amerikietišką specifikaciją ir jiems reikia tų pačių pakeitimų kaip tiesiogiai Amerikoje pirktiems automobiliams. Kai kurios ES šalys reikalauja individualaus patvirtinimo.",
      ],
    },
    {
      id: "mistakes",
      title: "Dažniausios klaidos importuojant iš JAE",
      paras: [
        [
          "Amerikietiško automobilio, parduodamo kaip „GCC“, pirkimas nepatikrinus VIN ir istorijos.",
          "Negrąžinta paskola ar baudos, blokuojančios eksportą.",
          "Nepastebėti potvynio ir karščio pažeidimų požymiai.",
          "Tikėjimasis 0 % muito – automobiliams iš JAE taikomas standartinis 10 %.",
        ],
      ],
    },
  ],
  UK: [
    {
      id: "market",
      title: "Jungtinės Karalystės automobilių rinka po „Brexit“",
      paras: [
        "Jungtinė Karalystė – didelė naudotų automobilių rinka su milžiniška premium, sportinių ir klasikinių automobilių pasiūla. Po „Brexit“ ji ES yra trečioji šalis, todėl importui reikia išmuitinimo – tačiau dėl ES ir JK prekybos ir bendradarbiavimo susitarimo (TCA) kilmės taisykles atitinkantys automobiliai gali būti įvežami taikant 0 % muitą.",
        "Visi britiški automobiliai yra su dešiniuoju vairu. Todėl dažniausiai importuojami automobiliai, kuriems tai nesvarbu arba kurie yra išskirtinai palankūs: klasikiniai, kolekciniai automobiliai, retos versijos ir premium automobiliai. Populiaru ir susigrąžinti Europos markių automobilius, kurie anksčiau pateko į Britaniją.",
      ],
    },
    {
      id: "auctions",
      title: "Kur pirkti automobilį Jungtinėje Karalystėje",
      paras: [
        "Automobiliai perkami iš prekybininkų, per skelbimus (pvz., Auto Trader) ir aukcionuose – prekybininkų (BCA, Manheim) bei apgadintų automobilių (Copart UK). Daugelis automobilių turi dokumentuotą aptarnavimo istoriją.",
        "Apgadintų automobilių aukcionuose automobiliams suteikiama pažeidimo kategorija, kurią turite suprasti prieš pirkdami.",
      ],
    },
    {
      id: "titles",
      title: "Pažeidimų kategorijos ir V5C",
      paras: [
        "Registracijos dokumentas – V5C (logbook). Visiškai sunaikintiems automobiliams Jungtinėje Karalystėje suteikiama kategorija:",
        [
          "Cat S – konstrukciniai pažeidimai (pvz., išilginės sijos, statramsčiai); automobilį galima suremontuoti ir grąžinti į kelią.",
          "Cat N – nekonstrukciniai pažeidimai (pvz., elektronika, kėbulo plokštės); automobilį galima suremontuoti.",
          "Cat B – tik dalims, kėbulas turi būti sunaikintas.",
          "Cat A – tik utilizuoti.",
        ],
        "Nepirkite Cat A ar Cat B automobilių važinėti. S ir N kategorijos reiškia rimtus praeities pažeidimus – patikrinkite remonto kokybę.",
      ],
    },
    {
      id: "inspection",
      title: "Kaip patikrinti automobilį iš Jungtinės Karalystės",
      paras: [
        [
          "MOT istorija: vyriausybės svetainėje gov.uk pagal valstybinį numerį galite nemokamai patikrinti visas MOT technines apžiūras – su kiekvienų metų rida ir gedimų sąrašu. Tai geriausias būdas aptikti atsuktą ridą.",
          "HPI patikra (ar panaši): parodo neapmokėtą finansavimą, vagystes ir ar automobilis buvo užregistruotas kaip visiškai sunaikintas.",
          "Aptarnavimo istorija ir savininkų skaičius pagal V5C.",
          "Rida myliomis – registracijai ES spidometras turi rodyti ir km/h.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Eksportas ir transportas iš Jungtinės Karalystės",
      paras: [
        "Dauguma automobilių kerta Lamanšą keltu arba traukiniu (Doveris–Kalė, Eurotunelis), autovežiu arba savo eiga. Transportas paprastai trunka nuo kelių dienų iki savaitės. Automobiliai iš Škotijos ar Šiaurės Anglijos taip pat gali būti gabenami RoRo laivu į Beniliukso ir Vokietijos uostus.",
        "Po „Brexit“ reikia dviejų muitinės deklaracijų: eksporto Jungtinėje Karalystėje ir importo ES – net jei automobiliu važiuojate patys. Paprastai jas sutvarko muitinės tarpininkas terminale. Valdytojas taip pat praneša DVLA apie galutinį eksportą atitinkama V5C dalimi.",
        "Važiuojant su britiškais numeriais iki registracijos šalies reikia galiojančio draudimo ir MOT – autovežis dažnai paprastesnis.",
      ],
    },
    {
      id: "duty",
      title: "Muitas, TCA ir PVM",
      paras: [
        "ES ir JK prekybos ir bendradarbiavimo susitarimas (TCA) leidžia taikyti 0 % muitą, bet tik kilmės taisykles atitinkantiems automobiliams – praktiškai pagamintiems Jungtinėje Karalystėje ar ES. Kilmė įrodoma eksportuotojo kilmės deklaracija arba importuotojo žiniomis. Jungtinėje Karalystėje pirktam japoniškam ar amerikietiškam automobiliui taikomas standartinis 10 % muitinės vertės muitas.",
        "Išmuitinimo šalies importo PVM mokamas nepriklausomai nuo muito. Perkant iš britų prekybininko pasiteiraukite, ar pardavimą galima įforminti kaip eksportą be JK PVM – kitaip PVM sumokėsite du kartus.",
        "Registracijos šalyje taikomi nacionaliniai mokesčiai pagal variklį, emisijas ar vertę.",
      ],
    },
    {
      id: "adaptation",
      title: "Dešinysis vairas ir registracija ES",
      paras: [
        "Britiški automobiliai pagaminti pagal Europos tipo patvirtinimo taisykles, todėl dažnai turi atitikties sertifikatą (COC) ir juos lengviau įregistruoti nei amerikietiškus. Paprastai lieka:",
        [
          "priekiniai žibintai dešiniajam eismui,",
          "galinis rūko žibintas tinkamoje pusėje,",
          "spidometras su km/h skale.",
        ],
        "Registracijai reikia V5C (arba eksporto įrodymo), sąskaitos faktūros, vertimų, išmuitinimo dokumento, nacionalinių mokesčių įrodymo ir techninės apžiūros.",
      ],
    },
    {
      id: "mistakes",
      title: "Dažniausios klaidos importuojant iš Jungtinės Karalystės",
      paras: [
        [
          "Manymas, kad po „Brexit“ viskas be muito – 0 % galioja tik kilmės taisykles atitinkantiems automobiliams.",
          "JK PVM ir ES importo PVM mokėjimas už tą patį automobilį.",
          "Cat A ar Cat B automobilio pirkimas.",
          "Nepatikrinta MOT istorija ir HPI ataskaita.",
          "Sienos kirtimas be muitinės deklaracijų, kai automobiliu važiuojate patys.",
        ],
      ],
    },
  ],
};

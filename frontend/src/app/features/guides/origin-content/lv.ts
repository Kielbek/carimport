import { OriginDeep } from './types';

export const ORIGIN_DEEP: OriginDeep = {
  USA: [
    {
      id: "market",
      title: "ASV auto tirgus – ko ir vērts ievest",
      paras: [
        "Amerikas Savienotās Valstis ir pasaulē lielākais lietoto auto tirgus: katru gadu tur īpašnieku nomaina ap 40 miljoniem transportlīdzekļu, un vairāki miljoni tiek pārdoti apdrošinātāju izsolēs. Tāpēc daudzi modeļi – īpaši bojāti – ir manāmi lētāki nekā Eiropā, un versiju izvēle ir milzīga.",
        "Parasti ir vērts ievest auto, kas Eiropā ir reti vai dārgi: muscle car tipa auto ar lieliem V8 dzinējiem (Mustang, Camaro, Challenger), lielus apvidus auto un pikapus, labi aprīkotas premium versijas un elektroauto, kas ASV ātri zaudē vērtību. Lētākiem kompaktajiem auto ietaupījumu bieži apēd transports un nodokļi.",
        "Atcerieties, ka izsoles cena ir tikai sākums. Klāt nāk izsoles maksas, transports līdz ostai, jūras frakts, apdrošināšana, muita, PVN, valsts nodokļi, pielāgošana ES prasībām un iespējamais remonts. Tikai kopsumma parāda, vai imports atmaksājas – tāpēc rēķiniet pirms solīšanas, nevis pēc tam.",
      ],
    },
    {
      id: "auctions",
      title: "Copart un IAAI izsoles – kā pirkt",
      paras: [
        "Copart un IAAI (Insurance Auto Auctions) galvenokārt pārdod apdrošinātāju, nomas uzņēmumu un banku auto – bojātus, atrastus pēc zādzības, applūdušus vai vienkārši norakstītus no autoparkiem. Solīšana notiek tiešsaistē, bet auto stāv vienā no vairākiem simtiem laukumu visā valstī. Atrašanās vietai ir nozīme: no tās atkarīga transporta līdz ostai cena un ilgums.",
        "Pircējs no Eiropas parasti sola ar brokera (starpnieka ar izsoles licenci) starpniecību, jo daudzus auto – īpaši ar salvage titulu – drīkst pirkt tikai licencēti pircēji. Brokeris ņem komisiju un bieži nokārto arī transportu un eksporta dokumentus.",
        "Pie nosolītās cenas pieskaitāmas izsoles maksas: pircēja maksa, kas pakāpeniski aug līdz ar cenu, tiešsaistes solīšanas maksa, gate fee par izvešanu no laukuma, vides maksa un titula apstrādes maksa. Auto par dažiem tūkstošiem dolāru tas kopā parasti ir no dažiem simtiem līdz vairāk nekā tūkstotim dolāru.",
        "Samaksa jāveic īsā laikā – parasti dažās darba dienās – un auto jāizved no laukuma, pirms sāk skaitīties glabāšanas maksas. Novēlota samaksa nozīmē sodu un bloķētu kontu, tāpēc naudu auto un maksām turiet gatavu pirms solīšanas.",
      ],
    },
    {
      id: "titles",
      title: "Titulu veidi: clean, salvage, rebuilt",
      paras: [
        "ASV īpašumtiesības apliecina štata izsniegts tituls (title). Tā veids atklāj auto vēsturi un ir svarīgs pirkšanā un eksportā:",
        [
          "Clean – auto vēsturē nav pilnīgas bojāejas; dārgākais, bet vismazāk riskantais.",
          "Salvage – apdrošinātājs atzinis pilnīgu bojāeju (remonta izmaksas pārsniedza noteiktu daļu no auto vērtības). Visbiežākais tituls Copart un IAAI izsolēs.",
          "Rebuilt / Reconstructed – bijusi pilnīga bojāeja, kas saremontēta un ASV atkal pielaista satiksmei.",
          "Non-repairable, Certificate of Destruction, Parts only, Junk – tikai rezerves daļām. Nepērciet tos braukšanai: eksports un reģistrācija ES var būt neiespējama vai ļoti sarežģīta.",
        ],
        "Eiropas Savienībā ASV titula atzīmes reģistrācijas apliecībā netiek pārnestas. Salvage auto var reģistrēt, ja pēc remonta tas iztur tehnisko apskati. Tomēr tituls ietekmē tālākpārdošanas vērtību un galvenokārt liecina, ka auto ir bijuši nopietni bojājumi – kas jānovērš kvalitatīvi.",
      ],
    },
    {
      id: "inspection",
      title: "Kā pārbaudīt auto pirms solīšanas",
      paras: [
        "Izsolē auto klātienē neredzēsiet, tāpēc svarīga ir katra sludinājuma detaļa. Pirms solāt:",
        [
          "Pārbaudiet vēsturi pēc VIN (piem., Carfax, AutoCheck, NMVTIS datubāze): bojājumus, nobraukumu, īpašnieku skaitu, zādzības un plūdus.",
          "Izpētiet fotogrāfijas un bojājumu aprakstu (primary / secondary damage). „Front end“ var nozīmēt jebko – no bampera līdz saliektām garensijām un nostrādājušiem drošības spilveniem.",
          "Uzmanīgi lasiet stāvokļa atzīmes: „Run and Drive“ nozīmē, ka auto brauca, ierodoties laukumā, nevis ka tas ir derīgs satiksmei; „Engine Starts“ nozīmē tikai to, ka dzinējs iedarbojās.",
          "Esiet piesardzīgi ar auto no viesuļvētru un plūdu reģioniem (Florida, Teksasa, Luiziāna). Ūdens pēdas zem paklāja, dubļi un korodēti elektriskie savienotāji ir iemesls atteikties.",
          "Nobraukums norādīts jūdzēs (1 jūdze = 1,61 km) un var būt atzīmēts „not actual“ vai „exempt“ – tad odometram uzticēties nevar.",
        ],
        "Saprātīgi ir paredzēt rezervi slēptiem bojājumiem – līdz 20–30 % no aplēstajām remonta izmaksām. Pirms nosakāt maksimālo solījumu, iegūstiet rezerves daļu cenu piedāvājumu no Eiropas vai ASV.",
      ],
    },
    {
      id: "shipping",
      title: "Eksports un jūras pārvadājumi",
      paras: [
        "Pēc pirkuma autovedējs aizved auto no laukuma uz eksporta ostu. Biežāk izmantotās ostas ir Ņūdžersija/Ņujorka, Savanna (Džordžija), Baltimora, Hjūstona un Losandželosa/Longbīča. No austrumu krasta brauciens līdz Ziemeļjūras ostām parasti ilgst 2–3 nedēļas, no Kalifornijas caur Panamas kanālu – līdz 5–6 nedēļām.",
        "Eksportam nepieciešams oriģinālais tituls (vai apliecināta kopija) un rēķins. Eksportētājs iesniedz Electronic Export Information (EEI) AES sistēmā – obligāti lietotiem transportlīdzekļiem neatkarīgi no vērtības – un auto un dokumenti jāuzrāda ASV muitai (CBP) vismaz 72 stundas pirms kuģa atiešanas.",
        "Pārvadāt var trīs veidos:",
        [
          "Kopīgs konteiners (parasti 3–4 auto 40 pēdu konteinerā) – populārākais, piemērots bojātiem un nebraucošiem auto.",
          "Atsevišķs konteiners – dārgāk, bet auto ceļo viens un var pievienot rezerves daļas.",
          "RoRo (roll-on/roll-off kuģis) – bieži lētākais, bet tikai braucošiem auto un ar mazāku aizsardzību pret bojājumiem.",
        ],
        "Kravas apdrošināšana atmaksājas – parasti 1,5–2 % no auto vērtības. ES ostā konteineru izkrauj, un muitas starpnieks auto nomuito. Izkraušanas, termināļa un aģenta maksas maksā galamērķa ostā.",
      ],
    },
    {
      id: "duty",
      title: "Muita, izcelsme un muitošana ES",
      paras: [
        "Standarta ES muita vieglajiem auto ir 10 % no muitas vērtības. Muitas vērtība ir auto cena ar izsoles maksām plus transports un apdrošināšana līdz ES robežai (CIF vērtība). Pikapus var klasificēt kā kravas transportlīdzekļus – tad muita ir 22 % – bet motocikliem piemēro 6–8 %.",
        "No 2026. gada 1. jūlija līdz 2029. gada beigām ASV ražotus auto var ievest ES ar 0 % muitu (Regula (ES) 2026/1455). Nosacījums: muitai jāpierāda auto ASV izcelsme, un auto jānosūta tieši no ASV. Ar rēķinu vai uzlīmi „Made in USA“ nepietiek – vajadzīgs izcelsmes apliecinājums. VIN dod mājienu: ASV ražotu auto VIN sākas ar 1, 4 vai 5. Nosacījumiem var atbilst arī Amerikā salikta japāņu vai vācu marka, bet Eiropā ražots un ASV pirkts BMW – ne.",
        "Importa PVN aprēķina pēc tās valsts likmes, kurā auto tiek muitots. PVN bāze ir muitas vērtība plus muita un transporta izmaksas līdz galamērķim ES. Uzņēmumi var izmantot muitas procedūru 4200: muitošana vienā valstī un PVN deklarēšana reģistrācijas valstī.",
        "Pēc muitošanas seko valsts nodokļi – atkarībā no valsts akcīzes nodoklis (piem., Polijā 3,1 % vai 18,6 % atkarībā no dzinēja tilpuma), reģistrācijas nodoklis pēc CO₂, jaudas vai vērtības, vai vispār nekas. Bieži tieši tie izšķir, vai imports atmaksājas.",
      ],
    },
    {
      id: "adaptation",
      title: "Pielāgošana ES prasībām un reģistrācija",
      paras: [
        "ASV tirgum ražoti auto neatbilst dažām Eiropas tehniskajām prasībām, tāpēc pirms tehniskās apskates tie jāpārveido:",
        [
          "Aizmugurējiem pagrieziena rādītājiem jābūt dzelteniem (oranžiem) – daudziem ASV auto mirgo sarkanie bremžu lukturi.",
          "Obligāts ir aizmugurējais miglas lukturis.",
          "Priekšējiem lukturiem jābūt ar Eiropas tuvās gaismas kūli un pareizi noregulētiem.",
          "Spidometram jārāda km/h (parasti pietiek ar dubultu skalu).",
          "ASV riepu spiediena sensori (TPMS) darbojas 315 MHz frekvencē – Eiropā izplatīta ir 433 MHz, kas ir svarīgi, mainot riteņus.",
        ],
        "Lukturu pārbūve parasti maksā dažus simtus eiro. Dažās valstīs – piem., Vācijā vai Francijā – auto no valsts ārpus ES pirms reģistrācijas vajadzīgs arī individuāls apstiprinājums vai eksperta atzinums, kas prasa laiku un naudu.",
        "Reģistrācijai sagatavojiet titula un rēķina tulkojumus, muitošanas dokumentu, valsts nodokļa samaksas apliecinājumu un tehniskās apskates protokolu. Daudzas valstis nosaka likumīgu termiņu importēta auto reģistrācijai – piemēram, Polijā 30 dienas.",
      ],
    },
    {
      id: "mistakes",
      title: "Biežākās kļūdas, ievedot auto no ASV",
      paras: [
        [
          "Solīšana, neaprēķinot kopējās izmaksas – maksas, transports un nodokļi var dubultot izsoles cenu.",
          "Auto ar „parts only“ titulu vai iznīcināšanas apliecību pirkšana, ko nevar likumīgi reģistrēt.",
          "Uzticēšanās „Run and Drive“ atzīmei, nepārbaudot vēsturi pēc VIN.",
          "Rezerves trūkums slēptiem bojājumiem un rezerves daļām – sasista auto remonts gandrīz vienmēr maksā vairāk, nekā liecina fotogrāfijas.",
          "Paļaušanās uz 0 % muitu bez ASV izcelsmes apliecinājuma – bez tā jāmaksā 10 %.",
          "Novēlota izsoles samaksa un uzkrātas glabāšanas maksas laukumā.",
          "Nokavēts reģistrācijas vai valsts nodokļa deklarēšanas termiņš pēc auto ierašanās.",
        ],
      ],
    },
  ],
  CANADA: [
    {
      id: "market",
      title: "Kanādas auto tirgus – ar ko tas atšķiras no ASV",
      paras: [
        "Kanāda ir mazāks tirgus nekā ASV, bet piedāvā gandrīz to pašu: tās pašas markas, modeļus un komplektācijas, bieži par nedaudz zemākām cenām nekā Eiropā. Daudzi pircēji to uzskata par alternatīvu ASV, īpaši Kanādas rūpnīcās ražotiem auto, kuriem var piemērot CETA nolīgumu.",
        "Kanādas auto ir dažas priekšrocības: odometrs kilometros, rūpnīcas dienas gaitas lukturi un ziemas aprīkojums (apsildāmi sēdekļi, dažkārt dzinēja priekšsildītājs). Trūkums var būt korozija – ziemā ceļus intensīvi kaisa ar sāli, un auto no Ontārio vai Kvebekas apakša var izskatīties sliktāk nekā auto no ASV dienvidiem.",
        "No Kanādas visbiežāk ieved apvidus auto un pikapus, uz vietas ražotus auto (piem., Toyota RAV4, Lexus RX, Honda CR-V un Civic, Chrysler Pacifica) un auto pēc līzinga ar nelielu nobraukumu.",
      ],
    },
    {
      id: "auctions",
      title: "Kur pirkt auto Kanādā",
      paras: [
        "Bojātus auto Kanādā pārdod Copart Canada un IAA (agrāk Impact Auto Auctions), nebojātus – tirgotāju izsoles, piemēram, ADESA, un tirgotāji. Tāpat kā ASV, daudzas izsoles pieejamas tikai ar licencēta brokera starpniecību.",
        "Populāra ir arī pirkšana no tirgotājiem un privātpersonām sludinājumu portālos. Pērkot no privātpersonas, eksporta dokumenti un transports līdz ostai jākārto pašam, tāpēc vairums Eiropas pircēju izmanto eksporta uzņēmumu, kas paņem auto, pārbauda dokumentus un to nosūta.",
        "Pie cenas pieskaitiet izsoles vai tirgotāja maksas un – pērkot no tirgotāja – Kanādas pārdošanas nodokļus (GST/HST/PST). Dažus no tiem var atgūt vai tie netiek piemēroti, ja tirgotājs pārdod tieši eksportam – pajautājiet pirms pirkuma.",
      ],
    },
    {
      id: "titles",
      title: "Īpašuma dokumenti un bojājumu statusi",
      paras: [
        "Kanādā nav ASV tipa „title“ – dokuments ir provinces izsniegta reģistrācija (Ontārio – „ownership“). Bojājuma statuss tiek ierakstīts provinces reģistrā:",
        [
          "Ontārio un vairums provinču: Normal, Salvage (pilnīga bojāeja, aizliegts piedalīties satiksmē), Rebuilt (saremontēts un apstiprināts pēc pārbaudes) un Irreparable – tikai rezerves daļām.",
          "Kvebeka: smagi bojāti transportlīdzekļi (VGA – véhicule gravement accidenté) ar atzīmi „reconstruit“ (atjaunots) vai „irrécupérable“ (neatjaunojams).",
        ],
        "Nepērciet braukšanai auto ar atzīmi irreparable vai irrécupérable – tos nevar likumīgi reģistrēt. Citi statusi ES reģistrācijas apliecībā netiek pārnesti, taču tie ietekmē vērtību un liecina, ka auto bijuši nopietni bojājumi.",
      ],
    },
    {
      id: "inspection",
      title: "Kā pārbaudīt auto no Kanādas",
      paras: [
        [
          "Vēsture pēc VIN: CARFAX Canada atskaite parāda bojājumus, provinču reģistrācijas un nobraukumu; auto, kas ieradušies no ASV, pārbaudiet arī ASV vēsturi.",
          "Ķīlas: Kanādā auto var būt aizdevuma nodrošinājums. Provinces ķīlu reģistrā (piem., PPSA) pārbaudiet, vai auto nav apgrūtināts – citādi eksportu var bloķēt un auto var pat zaudēt.",
          "Korozija: palūdziet apakšas, sliekšņu, riteņu arku un bremžu caurulīšu fotogrāfijas – ceļa sāls atstāj pēdas.",
          "Tirgus versija: Kanādas auto parasti ir ļoti līdzīgi ASV auto un prasa līdzīgas lukturu izmaiņas.",
        ],
        "Izsoļu auto attiecas tie paši noteikumi kā ASV: bojājumu fotogrāfijas, „Run and Drive“ nozīme un rezerve slēptiem bojājumiem.",
      ],
    },
    {
      id: "shipping",
      title: "Eksports un transports no Kanādas",
      paras: [
        "Visbiežāk izmantotās ostas ir Halifaksa un Monreāla austrumos un Vankūvera rietumos. No austrumu krasta kuģis līdz Ziemeļjūras ostām parasti kuģo apmēram 2 nedēļas – viens no ātrākajiem maršrutiem uz Eiropu. Auto no rietumu provincēm bieži dodas uz austrumiem ar vilcienu vai izkuģo no Vankūveras caur Panamas kanālu, kas aizņem ilgāku laiku.",
        "Eksportam nepieciešams īpašuma dokuments (provinces reģistrācija), pirkuma apliecinājums un eksporta deklarācija CBSA sistēmā (CERS), ko parasti iesniedz eksportētājs vai ekspeditors. Auto nedrīkst būt apgrūtināts ar ķīlu.",
        "Pārvadāšanas iespējas ir tādas pašas kā no ASV: kopīgs konteiners, atsevišķs konteiners vai RoRo braucošiem auto. Ziemā rēķinieties ar iespējamu sauszemes transporta kavēšanos līdz ostai.",
      ],
    },
    {
      id: "duty",
      title: "Muita un CETA nolīgums",
      paras: [
        "Pateicoties ES un Kanādas tirdzniecības nolīgumam (CETA), Kanādā ražotus auto var ievest ES ar 0 % muitu. Nosacījums ir Kanādas izcelsme, ko apstiprina eksportētāja izcelsmes deklarācija. Nepietiek ar auto pirkšanu Kanādā – daudzi tur pārdotie auto ražoti ASV, Meksikā vai Japānā, un par tiem maksā pilnus 10 %.",
        "VIN, kas sākas ar „2“, nozīmē, ka auto ražots Kanādā. Tas ir labs mājiens, bet ne pierādījums – pērkot no privātpersonas, izcelsmes deklarāciju bieži ir grūti iegūt, un bez tās muita ir 10 % no muitas vērtības (CIF). Kā kravas transportlīdzekļi klasificētiem pikapiem piemēro 22 %.",
        "Papildus muitai maksā muitošanas valsts importa PVN un reģistrācijas valsts nodokļus (akcīzes vai reģistrācijas nodokli). Uzņēmumi var izmantot procedūru 4200 un deklarēt PVN galamērķa valstī.",
      ],
    },
    {
      id: "adaptation",
      title: "Pielāgošana ES prasībām un reģistrācija",
      paras: [
        "Kanādas auto reģistrēt ir nedaudz vieglāk nekā ASV auto: tiem ir spidometrs km/h un rūpnīcas dienas gaitas lukturi. Tomēr parasti joprojām jāveic:",
        [
          "aizmugurējo pagrieziena rādītāju nomaiņa pret dzelteniem, ja mirgo bremžu lukturi,",
          "aizmugurējā miglas luktura uzstādīšana,",
          "priekšējo lukturu pielāgošana Eiropas tuvās gaismas kūlim.",
        ],
        "Reģistrācijai nepieciešami dokumentu tulkojumi, muitošanas dokuments, valsts nodokļu apliecinājums un tehniskā apskate. Tādas valstis kā Vācija vai Francija var pieprasīt individuālu apstiprinājumu.",
      ],
    },
    {
      id: "mistakes",
      title: "Biežākās kļūdas, ievedot auto no Kanādas",
      paras: [
        [
          "Pieņēmums, ka katram auto no Kanādas piemēro 0 % muitu – tas attiecas tikai uz Kanādā ražotiem auto ar izcelsmes deklarāciju.",
          "Nepārbaudīta ķīla pirms pirkuma.",
          "Apakšas korozijas ignorēšana auto no provincēm ar bargām ziemām.",
          "Auto ar statusu irreparable vai irrécupérable pirkšana.",
          "Sauszemes transporta no rietumu provincēm līdz austrumu ostām novērtēšana par zemu.",
        ],
      ],
    },
  ],
  JAPAN: [
    {
      id: "market",
      title: "Japānas auto tirgus – kāpēc JDM",
      paras: [
        "Japāna ir slavena ar auto ļoti labā tehniskā stāvoklī un ar nelielu nobraukumu. Iemesls ir stingrā shaken tehniskā apskate, kas kļūst dārgāka, auto novecojot, – tāpēc daudzi japāņi pārdod auto pēc dažiem gadiem, un vecāku auto cenas strauji krīt.",
        "Lielākā daļa importa no Japānas ir JDM auto (Japanese Domestic Market) – sporta auto leģendas (Nissan Skyline GT-R, Toyota Supra, Mazda RX-7, Honda NSX), apvidus auto (Toyota Land Cruiser), minivens un jaunāki hibrīdi. Kolekcionāriem galvenie ir modeļi, kas Eiropā nekad nav oficiāli pārdoti.",
        "Visi Japānas tirgus auto ir ar labās puses stūri. Tos var reģistrēt ES, taču braukt ar tiem labās puses satiksmē ir mazāk ērti, un tos ir grūtāk pārdot – izņemot pieprasītus kolekcijas modeļus.",
      ],
    },
    {
      id: "auctions",
      title: "Izsoles Japānā – USS un citas",
      paras: [
        "Vairums lietoto auto Japānā tiek pārdoti tirgotāju izsolēs. Lielākais ir USS tīkls, kā arī, cita starpā, TAA, CAA, HAA, JU un Arai. Katru nedēļu tiek piedāvāti desmitiem tūkstošu auto.",
        "Ārvalstu pircējs nesola pats – to dara Japānas eksportētājs (izsoles aģents): viņam ir piekļuve izsolēm, viņš iztulko izsoles lapu, nopērk auto, izslēdz to no reģistra eksportam un nosūta. Pie nosolītās cenas pieskaita izsoles maksu, eksportētāja komisiju, iekšzemes transportu līdz ostai un eksporta dokumentus. Maksā parasti jenās.",
        "Var pirkt arī no eksportētāja noliktavas – tas var maksāt vairāk, bet auto jau ir pārbaudīts un bieži gaida ostā.",
      ],
    },
    {
      id: "titles",
      title: "Kā lasīt Japānas izsoles lapu",
      paras: [
        "Izsoles lapa (auction sheet) ir izsoles inspektora ziņojums – svarīgākais informācijas avots par auto. Tajā ir kopējais vērtējums, salona vērtējums un virsbūves bojājumu karte.",
        [
          "Kopējais vērtējums: S vai 6 – praktiski jauns; 5 un 4,5 – ļoti labs stāvoklis; 4 – labs, ar nelielām lietošanas pēdām; 3,5 un 3 – redzami defekti vai lielāks nobraukums; R vai RA – novērsti avārijas bojājumi (RA – neliels remonts); 0 vai *** – bojāts, applūdis vai nenovērtēts.",
          "Salona vērtējums: no A (kā jauns) līdz E (stipri nolietots).",
          "Bojājumu karte: A – skrāpējums, U – iespiedums, B – iespiedums ar skrāpējumu, W – nelīdzenums vai remonta pēdas, S un C – rūsa un korozija, P – krāsas pēdas, X – maināma detaļa, XX – nomainīta detaļa, Y – plaisa vai caurums. Skaitlis pie burta (1–3) norāda bojājuma lielumu.",
        ],
        "Lapā norādīts arī izsoles pārbaudītais nobraukums, aprīkojums un inspektora piezīmes japāņu valodā – labs eksportētājs tās iztulko pirms solīšanas.",
      ],
    },
    {
      id: "inspection",
      title: "Kam pievērst uzmanību Japānas auto",
      paras: [
        [
          "Nobraukums: Japānas auto parasti ir patiess, neliels nobraukums, taču pārbaudiet tā vēsturi izsoles lapā un eksporta sertifikātā.",
          "Rūsa: auto no ziemeļiem (Hokaido) un piekrastes reģioniem var būt sāls bojāti – apskatiet apakšas fotogrāfijas.",
          "Modifikācijas: sporta auto bieži ir mainīta piekare, izplūdes sistēma un dzinējs, kas var sarežģīt tehnisko apskati ES.",
          "Ātruma ierobežotāji: daudziem JDM auto ir rūpnīcas ierobežotājs 180 km/h.",
          "Elektronika: Japānas radio izmanto FM diapazonu 76–90 MHz, navigācija un izvēlnes ir japāņu valodā, un ETC ceļu nodevu ierīce Eiropā nav izmantojama.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Eksports un transports no Japānas",
      paras: [
        "Pēc pirkuma eksportētājs izslēdz auto no reģistra un iegūst Export Certificate – reģistrāciju aizstājošu dokumentu ar auto datiem un nobraukumu. Tas vajadzīgs muitošanai un reģistrācijai ES kopā ar rēķinu un konosamentu (B/L).",
        "Auto galvenokārt izkuģo no Jokohamas, Nagojas, Kobes un Osakas. RoRo kuģi līdz Eiropai parasti kuģo 5–7 nedēļas (caur Suecas kanālu vai apkārt Āfrikai), konteineri – aptuveni tikpat vai nedaudz ilgāk. Konteiners ir laba izvēle vērtīgiem vai nebraucošiem auto.",
        "Biežākās galamērķa ostas ir Brēmerhāfene, Roterdama, Antverpene un Zēbrugge. Kravas apdrošināšana atmaksājas – ilgā braucienā bojājumu risks ir lielāks.",
      ],
    },
    {
      id: "duty",
      title: "Muita un ES un Japānas nolīgums",
      paras: [
        "ES un Japānas ekonomiskā partnerattiecību nolīgums (EPN) pakāpeniski atcēla muitu auto – no 2026. gada Japānas izcelsmes auto var ievest ES ar 0 % muitu. Izcelsmi apliecina eksportētāja izcelsmes deklarācija vai importētāja zināšanas (dokumenti, kas pierāda, ka auto ražots Japānā).",
        "Japānā ražoti JDM auto parasti atbilst nosacījumiem. Uzmanieties ar citur (piem., ASV vai Taizemē) ražotām japāņu markām – par tām maksā standarta 10 % no muitas vērtības. Bez izcelsmes apliecinājuma muita arī ir 10 %.",
        "Par 30 gadiem vecākus auto oriģinālā stāvoklī var uzskatīt par kolekcijas transportlīdzekļiem – tad muita ir 0 %, un dažas valstis piemēro samazinātu PVN. Pēc muitošanas reģistrācijas valstī maksā valsts nodokļus atkarībā no dzinēja, izmešiem vai vērtības.",
      ],
    },
    {
      id: "adaptation",
      title: "Labās puses stūre – reģistrācija ES",
      paras: [
        "Auto ar labās puses stūri var reģistrēt ES valstīs, ja tie atbilst tehniskajām prasībām. Galvenās izmaiņas ir:",
        [
          "priekšējie lukturi ar gaismas kūli labās puses satiksmei (regulēšana vai stiklu nomaiņa),",
          "aizmugurējais miglas lukturis pareizajā pusē un dzelteni pagrieziena rādītāji (Japānas auto tie parasti jau ir),",
          "spidometrs km/h – Japānas auto tas ir no rūpnīcas.",
        ],
        "Dažas valstis, piem., Vācija, pieprasa individuālu apstiprinājumu vai eksperta atzinumu. Reģistrācijai nepieciešami eksporta sertifikāta un rēķina tulkojumi, muitošanas dokuments, valsts nodokļu apliecinājums un tehniskā apskate.",
      ],
    },
    {
      id: "mistakes",
      title: "Biežākās kļūdas, ievedot auto no Japānas",
      paras: [
        [
          "Solīšana bez iztulkotas izsoles lapas.",
          "Laika novērtēšana par zemu – no pirkuma līdz reģistrācijai bieži paiet 2–3 mēneši.",
          "Paļaušanās uz 0 % muitu japāņu markai, kas ražota ārpus Japānas.",
          "Aizmirstas lukturu pārbūves un iespējamā individuālā apstiprinājuma izmaksas.",
          "Stipri modificēta auto pirkšana, kas neizturēs tehnisko apskati.",
          "Apdrošināšanas trūkums garajam braucienam.",
        ],
      ],
    },
  ],
  UAE: [
    {
      id: "market",
      title: "Apvienoto Arābu Emirātu auto tirgus",
      paras: [
        "Dubaija un citi emirāti ir vieni no lielākajiem luksusa auto tirgiem pasaulē. Lielais pieprasījums pēc jauniem auto piepilda lietoto auto tirgu ar dažus gadus veciem apvidus auto, sporta auto un premium sedaniem – bieži lētākiem nekā Eiropā.",
        "Vairums AAE pārdoto auto ir GCC versijas (Persijas līča sadarbības padome), kas būvētas karstumam: jaudīgāks gaisa kondicionieris un dzesēšana, dažkārt atšķirīgs aprīkojums nekā Eiropā. Ir arī daudz no ASV atvestu auto – bieži bojātu – kurus pārpārdod kā „importu“.",
        "No AAE visbiežāk ieved lielus apvidus auto (Nissan Patrol, Toyota Land Cruiser, Lexus LX), luksusa un sporta auto. Auto ar lielāku nobraukumu ņemiet vērā klimata ietekmi.",
      ],
    },
    {
      id: "auctions",
      title: "Kur pirkt auto AAE",
      paras: [
        "Auto pērk no tirgotājiem (tostarp marku sertificēto lietoto auto programmām), izsolēs, piemēram, Emirates Auction un Copart UAE, un no sludinājumiem. Dubaijā ir arī liels lietoto auto tirgus ar daudziem eksporta uzņēmumiem, kas apkalpo ārvalstu pircējus.",
        "Pērkot no ārzemēm, drošākais ceļš ir caur uzticamu eksportētāju: viņš pārbauda auto un dokumentus, izslēdz auto no reģistra, iegūst eksporta sertifikātu un nosūta auto.",
      ],
    },
    {
      id: "titles",
      title: "Dokumenti: Mulkiya un eksporta sertifikāts",
      paras: [
        "Reģistrācijas dokuments AAE ir Mulkiya karte, ko izsniedz satiksmes iestāde (Dubaijā – RTA). Eksportam auto jāizslēdz no reģistra un jāiegūst eksporta sertifikāts (bieži ar eksporta numuriem) – galvenais dokuments muitošanai ES.",
        "Auto nedrīkst būt nesamaksātu sodu vai bankas ķīlas. Daudzus auto AAE pērk uz kredīta – pirms pirkuma pārbaudiet, vai aizdevums ir atmaksāts un banka atbrīvojusi auto eksportam.",
      ],
    },
    {
      id: "inspection",
      title: "Kā pārbaudīt auto no AAE",
      paras: [
        [
          "Izcelsme: pēc VIN pārbaudiet, vai auto ir GCC versija vai atvests no ASV. VIN, kas sākas ar 1, 4 vai 5, nozīmē ASV ražotu auto – tad pārbaudiet tā ASV vēsturi (bojājumus, salvage titulu).",
          "Plūdi: pēc 2024. gada vētrām tirgū nonāca daudz applūdušu auto. Meklējiet ūdens pēdas, dubļus un koroziju salonā un elektronikā.",
          "Klimata bojājumi: augsta temperatūra nolieto gumijas blīves, plastmasu, akumulatorus, riepas un gaisa kondicionieri.",
          "Apkopes vēsture: tirgotāju auto parasti ir pilni ieraksti – liels pluss tālākpārdošanā.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Eksports un transports no AAE",
      paras: [
        "Galvenā osta ir Džebelali Dubaijā. Brauciens līdz Eiropas ostām parasti ilgst 3–5 nedēļas atkarībā no maršruta (caur Sarkano jūru un Suecas kanālu vai apkārt Āfrikai) un galamērķa ostas. Auto pārvadā konteineros vai RoRo kuģos.",
        "Muitošanai ES nepieciešams eksporta sertifikāts, rēķins un konosaments (B/L). Auto, kas agrāk ievesti AAE no ASV, noderīgi ir arī ASV vēstures dokumenti.",
      ],
    },
    {
      id: "duty",
      title: "Muita, ievedot no AAE",
      paras: [
        "ES nav ar AAE nolīguma, kas samazinātu muitu auto, tāpēc par auto no Emirātiem maksā standarta 10 % no muitas vērtības (CIF), bet par kravas transportlīdzekļiem klasificētiem pikapiem – 22 %. Tas attiecas arī uz ASV ražotiem auto: 0 % muita ASV auto piemērojama tikai, ja tie nosūtīti tieši no ASV.",
        "Papildus muitai maksā muitošanas valsts importa PVN un reģistrācijas valsts nodokļus. Par 30 gadiem vecākus auto oriģinālā stāvoklī var uzskatīt par kolekcijas transportlīdzekļiem ar 0 % muitu.",
      ],
    },
    {
      id: "adaptation",
      title: "Pielāgošana ES prasībām un reģistrācija",
      paras: [
        "GCC versijas auto ir ar kreisās puses stūri, spidometru km/h un parasti apgaismojumu, kas ir tuvs Eiropas specifikācijai, tāpēc izmaiņu bieži vajag mazāk nekā ASV auto. Tomēr pārbaudiet pagrieziena rādītājus, aizmugurējo miglas lukturi un priekšējos lukturus.",
        "No ASV uz AAE atvestiem auto ir ASV specifikācija, un tiem vajag tās pašas izmaiņas kā tieši Amerikā pirktiem auto. Dažas ES valstis pieprasa individuālu apstiprinājumu.",
      ],
    },
    {
      id: "mistakes",
      title: "Biežākās kļūdas, ievedot auto no AAE",
      paras: [
        [
          "ASV auto, kas pārdots kā „GCC“, pirkšana bez VIN un vēstures pārbaudes.",
          "Neatmaksāts aizdevums vai sodi, kas bloķē eksportu.",
          "Nepamanītas plūdu un karstuma bojājumu pazīmes.",
          "Paļaušanās uz 0 % muitu – par auto no AAE maksā standarta 10 %.",
        ],
      ],
    },
  ],
  UK: [
    {
      id: "market",
      title: "Lielbritānijas auto tirgus pēc „Brexit“",
      paras: [
        "Apvienotā Karaliste ir liels lietoto auto tirgus ar milzīgu premium, sporta un klasisko auto piedāvājumu. Kopš „Brexit“ tā ES ir trešā valsts, tāpēc importam vajadzīga muitošana – taču, pateicoties ES un AK tirdzniecības un sadarbības nolīgumam (TCA), izcelsmes noteikumiem atbilstošus auto var ievest ar 0 % muitu.",
        "Visi britu auto ir ar labās puses stūri. Tāpēc visbiežāk ieved auto, kam tas nav svarīgi vai kas ir īpaši izdevīgi: klasiskos un kolekcijas auto, retas versijas un premium auto. Populāra ir arī Eiropas marku auto, kas agrāk nonākuši Lielbritānijā, atvešana atpakaļ.",
      ],
    },
    {
      id: "auctions",
      title: "Kur pirkt auto Lielbritānijā",
      paras: [
        "Auto pērk no tirgotājiem, sludinājumos (piem., Auto Trader) un izsolēs – tirgotāju (BCA, Manheim) un bojātu auto (Copart UK). Daudziem auto ir dokumentēta apkopes vēsture.",
        "Bojātu auto izsolēs auto ir bojājuma kategorija, kas jāsaprot pirms pirkuma.",
      ],
    },
    {
      id: "titles",
      title: "Bojājumu kategorijas un V5C",
      paras: [
        "Reģistrācijas dokuments ir V5C (logbook). Pilnīgas bojāejas auto Apvienotajā Karalistē saņem kategoriju:",
        [
          "Cat S – strukturāli bojājumi (piem., garensijas, statņi); auto var saremontēt un atgriezt uz ceļa.",
          "Cat N – nestrukturāli bojājumi (piem., elektronika, virsbūves paneļi); auto var saremontēt.",
          "Cat B – tikai rezerves daļām, virsbūve jāiznīcina.",
          "Cat A – tikai utilizācijai.",
        ],
        "Nepērciet Cat A vai Cat B auto braukšanai. Kategorijas S un N nozīmē nopietnus iepriekšējus bojājumus – pārbaudiet remonta kvalitāti.",
      ],
    },
    {
      id: "inspection",
      title: "Kā pārbaudīt auto no Lielbritānijas",
      paras: [
        [
          "MOT vēsture: valdības vietnē gov.uk pēc reģistrācijas numura bez maksas var apskatīt visas MOT tehniskās apskates – ar katra gada nobraukumu un defektu sarakstu. Tas ir labākais veids, kā atklāt attītu odometru.",
          "HPI pārbaude (vai līdzīga): parāda neatmaksātu finansējumu, zādzības un to, vai auto reģistrēts kā pilnīga bojāeja.",
          "Apkopes vēsture un īpašnieku skaits pēc V5C.",
          "Nobraukums jūdzēs – reģistrācijai ES spidometram jārāda arī km/h.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Eksports un transports no Lielbritānijas",
      paras: [
        "Vairums auto šķērso Lamanšu ar prāmi vai vilcienu (Duvra–Kalē, Eirotunelis), ar autovedēju vai pašgaitā. Transports parasti ilgst no dažām dienām līdz nedēļai. Auto no Skotijas vai Ziemeļanglijas var kuģot arī ar RoRo kuģi uz Beniluksa un Vācijas ostām.",
        "Kopš „Brexit“ vajadzīgas divas muitas deklarācijas: eksporta Apvienotajā Karalistē un importa ES – pat ja ar auto braucat paši. Parasti tās nokārto muitas starpnieks terminālī. Turētājs arī paziņo DVLA par galīgo eksportu ar attiecīgo V5C daļu.",
        "Braukšanai ar britu numuriem līdz reģistrācijas valstij vajadzīga derīga apdrošināšana un MOT – autovedējs bieži ir vienkāršāks.",
      ],
    },
    {
      id: "duty",
      title: "Muita, TCA un PVN",
      paras: [
        "ES un AK tirdzniecības un sadarbības nolīgums (TCA) ļauj piemērot 0 % muitu, bet tikai izcelsmes noteikumiem atbilstošiem auto – praksē ražotiem Apvienotajā Karalistē vai ES. Izcelsmi apliecina eksportētāja izcelsmes deklarācija vai importētāja zināšanas. Par Apvienotajā Karalistē pirktu japāņu vai amerikāņu auto maksā standarta 10 % no muitas vērtības.",
        "Muitošanas valsts importa PVN jāmaksā neatkarīgi no muitas. Pērkot no britu tirgotāja, pajautājiet, vai pārdošanu var noformēt kā eksportu bez AK PVN – citādi PVN samaksāsiet divreiz.",
        "Reģistrācijas valstī maksā valsts nodokļus atkarībā no dzinēja, izmešiem vai vērtības.",
      ],
    },
    {
      id: "adaptation",
      title: "Labās puses stūre un reģistrācija ES",
      paras: [
        "Britu auto ražoti saskaņā ar Eiropas tipa apstiprinājuma noteikumiem, tāpēc tiem bieži ir atbilstības sertifikāts (COC) un tos ir vieglāk reģistrēt nekā ASV auto. Parasti atliek:",
        [
          "priekšējie lukturi labās puses satiksmei,",
          "aizmugurējais miglas lukturis pareizajā pusē,",
          "spidometrs ar km/h skalu.",
        ],
        "Reģistrācijai nepieciešams V5C (vai eksporta apliecinājums), rēķins, tulkojumi, muitošanas dokuments, valsts nodokļu apliecinājums un tehniskā apskate.",
      ],
    },
    {
      id: "mistakes",
      title: "Biežākās kļūdas, ievedot auto no Lielbritānijas",
      paras: [
        [
          "Pieņēmums, ka pēc „Brexit“ viss ir bez muitas – 0 % attiecas tikai uz izcelsmes noteikumiem atbilstošiem auto.",
          "AK PVN un ES importa PVN maksāšana par to pašu auto.",
          "Cat A vai Cat B auto pirkšana.",
          "Nepārbaudīta MOT vēsture un HPI atskaite.",
          "Robežas šķērsošana bez muitas deklarācijām, braucot ar auto pašam.",
        ],
      ],
    },
  ],
};

import { OriginDeep } from './types';

export const ORIGIN_DEEP: OriginDeep = {
  USA: [
    {
      id: "market",
      title: "USA automaailm – mida tasub sisse tuua",
      paras: [
        "Ameerika Ühendriigid on maailma suurim kasutatud autode turg: igal aastal vahetab seal omanikku umbes 40 miljonit sõidukit ja mitu miljonit läheb läbi kindlustusseltside oksjonite. Seetõttu on paljud mudelid – eriti kahjustatud – Euroopast märgatavalt odavamad ja versioonide valik on tohutu.",
        "Tavaliselt tasub sisse tuua autosid, mis on Euroopas haruldased või kallid: suurte V8-mootoritega muscle car'e (Mustang, Camaro, Challenger), suuri maastureid ja pikapeid, hästi varustatud premium-versioone ning elektriautosid, mis kaotavad USA-s kiiresti väärtust. Odavamate väikeautode puhul söövad transport ja maksud sääst sageli ära.",
        "Pea meeles, et oksjonihind on alles algus. Lisanduvad oksjonitasud, transport sadamasse, merevedu, kindlustus, toll, käibemaks, riiklikud maksud, ELi nõuetele kohandamine ja võimalik remont. Alles kogusumma näitab, kas import tasub end ära – seega arvuta enne pakkumist, mitte pärast.",
      ],
    },
    {
      id: "auctions",
      title: "Copart ja IAAI oksjonid – kuidas osta",
      paras: [
        "Copart ja IAAI (Insurance Auto Auctions) müüvad peamiselt kindlustusseltside, rendifirmade ja pankade autosid – kahjustatud, pärast vargust leitud, üleujutatud või lihtsalt autopargist välja arvatud. Pakkumised tehakse internetis, auto seisab aga ühel mitmesajast platsist üle riigi. Asukoht on oluline: sellest sõltuvad sadamasse vedamise hind ja aeg.",
        "Euroopa ostja pakub tavaliselt maakleri (oksjonilitsentsiga vahendaja) kaudu, sest paljusid autosid – eriti salvage-title'iga – tohivad osta ainult litsentseeritud ostjad. Maakler võtab vahendustasu ja korraldab sageli ka transpordi ning ekspordidokumendid.",
        "Haamrihinnale lisanduvad oksjonitasud: hinnaga astmeliselt kasvav ostjatasu, internetipakkumise tasu, platsilt väljastamise gate fee, keskkonnatasu ja title'i käsitlemise tasu. Mõne tuhande dollari eest auto puhul on see kokku tavaliselt mõnesajast üle tuhande dollarini.",
        "Maksta tuleb lühikese aja jooksul – tavaliselt mõne tööpäeva jooksul – ja auto tuleb platsilt ära viia enne, kui hakkavad kogunema hoiutasud. Hiline makse tähendab trahvi ja blokeeritud kontot, seega hoia raha auto ja tasude jaoks valmis enne pakkumist.",
      ],
    },
    {
      id: "titles",
      title: "Title'i tüübid: clean, salvage, rebuilt",
      paras: [
        "USA-s tõendab omandit osariigi väljastatud title. Selle tüüp räägib auto ajaloost ja on oluline nii ostmisel kui ka ekspordil:",
        [
          "Clean – auto ajaloos pole täiskahju; kõige kallim, kuid väikseima riskiga.",
          "Salvage – kindlustusselts tunnistas auto täiskahjuks (remondikulu ületas teatud osa auto väärtusest). Copartis ja IAAI-s kõige levinum title.",
          "Rebuilt / Reconstructed – endine täiskahju, mis on remonditud ja USA-s uuesti liiklusesse lubatud.",
          "Non-repairable, Certificate of Destruction, Parts only, Junk – ainult varuosadeks. Ära osta neid sõitmiseks: eksport ja registreerimine ELis võivad olla võimatud või väga keerulised.",
        ],
        "Euroopa Liidus ei kandu Ameerika title'i märked registreerimistunnistusele. Salvage-auto saab registreerida, kui see läbib pärast remonti tehnoülevaatuse. Title mõjutab siiski edasimüügi hinda ja näitab eelkõige, et autol on olnud tõsiseid kahjustusi – mis peavad olema korralikult parandatud.",
      ],
    },
    {
      id: "inspection",
      title: "Kuidas autot enne pakkumist kontrollida",
      paras: [
        "Oksjonil ei saa sa autot ise näha, seega loeb iga detail kuulutuses. Enne pakkumist:",
        [
          "Kontrolli ajalugu VIN-koodi järgi (nt Carfax, AutoCheck, NMVTIS-andmebaas): kahjustused, läbisõit, omanike arv, vargused ja üleujutused.",
          "Uuri fotosid ja kahjustuste kirjeldust (primary / secondary damage). „Front end“ võib tähendada mida tahes stange'ist kuni kõverdunud pikitalade ja avanenud turvapatjadeni.",
          "Loe seisukorramärgiseid hoolikalt: „Run and Drive“ tähendab, et auto liikus platsile saabudes, mitte et see on liikluskõlblik; „Engine Starts“ tähendab ainult, et mootor käivitus.",
          "Ole ettevaatlik orkaani- ja üleujutuspiirkondade autodega (Florida, Texas, Louisiana). Veejäljed vaiba all, muda ja korrodeerunud elektripistikud on põhjus loobumiseks.",
          "Läbisõit on miilides (1 miil = 1,61 km) ja võib olla märgitud „not actual“ või „exempt“ – siis ei saa odomeetrit usaldada.",
        ],
        "Mõistlik on hoida varu varjatud kahjustuste jaoks – kuni 20–30% hinnangulisest remondikulust. Küsi enne maksimaalse pakkumise määramist varuosade hinnapakkumist Euroopast või USA-st.",
      ],
    },
    {
      id: "shipping",
      title: "Eksport ja merevedu",
      paras: [
        "Pärast ostu viib autoveok auto platsilt ekspordisadamasse. Levinumad sadamad on New Jersey/New York, Savannah (Georgia), Baltimore, Houston ja Los Angeles/Long Beach. Idarannikult kestab teekond Põhjamere sadamatesse tavaliselt 2–3 nädalat, Californiast Panama kanali kaudu kuni 5–6 nädalat.",
        "Ekspordiks on vaja originaal-title'it (või kinnitatud koopiat) ja arvet. Eksportija esitab AES-süsteemis Electronic Export Information (EEI) teatise – kasutatud sõidukite puhul kohustuslik olenemata väärtusest – ning auto ja dokumendid tuleb esitada USA tollile (CBP) vähemalt 72 tundi enne laeva väljumist.",
        "Vedamiseks on kolm võimalust:",
        [
          "Jagatud konteiner (tavaliselt 3–4 autot 40-jalases konteineris) – kõige populaarsem, sobib kahjustatud ja mittesõitvatele autodele.",
          "Eraldi konteiner – kallim, kuid auto sõidab üksi ja saad lisada varuosi.",
          "RoRo (roll-on/roll-off laev) – sageli kõige odavam, kuid ainult sõitvatele autodele ja väiksema kaitsega kahjustuste eest.",
        ],
        "Kaubakindlustus tasub end ära – tavaliselt 1,5–2% auto väärtusest. ELi sadamas laaditakse konteiner tühjaks ja tolliagent vormistab auto tollis. Mahalaadimise, terminali ja agendi tasud makstakse sihtsadamas.",
      ],
    },
    {
      id: "duty",
      title: "Toll, päritolu ja tollivormistus ELis",
      paras: [
        "ELi tavaline toll sõiduautodele on 10% tolliväärtusest. Tolliväärtus on auto hind koos oksjonitasudega pluss transport ja kindlustus ELi piirini (CIF-väärtus). Pikapid võidakse klassifitseerida veoautodeks – siis on toll 22% – ja mootorrattad maksavad 6–8%.",
        "Alates 1. juulist 2026 kuni 2029. aasta lõpuni võivad USA-s valmistatud autod siseneda ELi 0% tolliga (määrus (EL) 2026/1455). Tingimus: pead tõendama tollile auto USA päritolu ning auto tuleb saata otse USA-st. Arve või kleebis „Made in USA“ ei piisa – vaja on päritolutõendit. VIN annab vihje: USA-s ehitatud autode VIN algab numbriga 1, 4 või 5. Tingimustele võib vastata ka Ameerikas kokku pandud Jaapani või Saksa mark, kuid Euroopas valmistatud ja USA-st ostetud BMW mitte.",
        "Impordi käibemaksu arvestatakse selle riigi määra järgi, kus auto tollivormistatakse. Käibemaksu alus on tolliväärtus pluss toll ja transpordikulud sihtkohani ELis. Ettevõtted saavad kasutada tolliprotseduuri 4200: tollivormistus ühes riigis ja käibemaksu deklareerimine registreerimisriigis.",
        "Pärast tollivormistust tulevad riiklikud maksud – sõltuvalt riigist aktsiis (nt Poolas 3,1% või 18,6% olenevalt mootori mahust), CO₂, võimsuse või väärtuse põhine registreerimistasu (Eestis mootorsõiduki registreerimistasu) või üldse mitte midagi. Sageli otsustavad just need, kas import tasub end ära.",
      ],
    },
    {
      id: "adaptation",
      title: "ELi nõuetele kohandamine ja registreerimine",
      paras: [
        "USA turu jaoks ehitatud autod ei vasta mõnele Euroopa tehnilisele nõudele, mistõttu vajavad need enne ülevaatust muudatusi:",
        [
          "Tagumised suunatuled peavad olema kollased (oranžid) – paljudel Ameerika autodel vilguvad hoopis punased piduritulid.",
          "Tagumine udutuli on kohustuslik.",
          "Esituledel peab olema Euroopa lähitulede muster ja need peavad olema õigesti reguleeritud.",
          "Spidomeeter peab näitama km/h (tavaliselt piisab topeltskaalast).",
          "Ameerika rehvirõhuandurid (TPMS) töötavad sagedusel 315 MHz – Euroopas on levinud 433 MHz, mis on oluline rataste vahetamisel.",
        ],
        "Tulede ümberehitus maksab tavaliselt mõnisada eurot. Mõnes riigis – nt Saksamaal või Prantsusmaal – vajab väljastpoolt ELi pärit auto enne registreerimist ka üksikkinnitust või eksperdiarvamust, mis nõuab aega ja raha.",
        "Registreerimiseks valmista ette title'i ja arve vandetõlked, tollivormistuse dokument, riikliku maksu tasumise tõend ja ülevaatuse akt. Paljud riigid on kehtestanud imporditud auto registreerimiseks seadusliku tähtaja – näiteks Poolas 30 päeva.",
      ],
    },
    {
      id: "mistakes",
      title: "Kõige levinumad vead USA-st importimisel",
      paras: [
        [
          "Pakkumine ilma kogukulu arvutamata – tasud, transport ja maksud võivad oksjonihinna kahekordistada.",
          "„Parts only“ title'i või hävitamistõendiga auto ostmine, mida ei saa seaduslikult registreerida.",
          "„Run and Drive“ märke usaldamine ilma VIN-i järgi ajalugu kontrollimata.",
          "Puuduv varu varjatud kahjustuste ja varuosade jaoks – avariiauto remont maksab peaaegu alati rohkem, kui fotod lasevad arvata.",
          "0% tollile lootmine ilma USA päritolu tõendita – ilma selleta maksad 10%.",
          "Oksjoni hiline tasumine ja hoiutasude kogunemine platsil.",
          "Registreerimise või riikliku maksu deklareerimise tähtaja ületamine pärast auto saabumist.",
        ],
      ],
    },
  ],
  CANADA: [
    {
      id: "market",
      title: "Kanada automaailm – mille poolest see erineb USA-st",
      paras: [
        "Kanada on USA-st väiksem turg, kuid pakub praktiliselt sama: samad margid, mudelid ja varustustasemed, sageli veidi madalama hinnaga kui Euroopas. Paljud ostjad peavad Kanadat USA alternatiiviks, eriti Kanada tehastes valmistatud autode puhul, mis võivad saada kasu CETA lepingust.",
        "Kanada autodel on mõned eelised: odomeeter kilomeetrites, tehases paigaldatud päevatuled ja talvevarustus (istmesoojendus, mõnikord mootori eelsoojendus). Puuduseks võib olla rooste – talvel soolatakse teid tugevalt ning Ontariost või Quebecist pärit auto põhi võib olla halvemas seisus kui USA lõunaosast pärit autol.",
        "Kanadast tuuakse kõige sagedamini maastureid ja pikapeid, kohapeal valmistatud autosid (nt Toyota RAV4, Lexus RX, Honda CR-V ja Civic, Chrysler Pacifica) ning väikese läbisõiduga liisingust tulnud autosid.",
      ],
    },
    {
      id: "auctions",
      title: "Kust osta autot Kanadas",
      paras: [
        "Kahjustatud autosid müüvad Kanadas Copart Canada ja IAA (endine Impact Auto Auctions), kahjustamata autosid edasimüüjate oksjonid, näiteks ADESA, ja autokauplused. Nagu USA-s, on paljud oksjonid kättesaadavad ainult litsentseeritud maakleri kaudu.",
        "Populaarne on ka ostmine kauplustelt ja eraisikutelt kuulutusportaalide kaudu. Eraisikult ostes pead ekspordidokumendid ja transpordi sadamasse ise korraldama, seetõttu kasutab enamik Euroopa ostjaid ekspordifirmat, mis toob auto ära, kontrollib dokumente ja saadab selle teele.",
        "Lisa hinnale oksjoni- või kauplusetasud ning – kauplusest ostes – Kanada müügimaksud (GST/HST/PST). Osa neist saab tagasi või neid ei võeta, kui kauplus müüb otse ekspordiks – küsi enne ostu.",
      ],
    },
    {
      id: "titles",
      title: "Omandidokumendid ja kahjustuste staatused",
      paras: [
        "Kanadas ei ole USA-tüüpi „title'it“ – dokumendiks on provintsi väljastatud registreering (Ontarios „ownership“). Kahjustuse staatus kantakse provintsi registrisse:",
        [
          "Ontario ja enamik provintse: Normal, Salvage (täiskahju, liiklusesse ei lubata), Rebuilt (remonditud ja pärast kontrolli heaks kiidetud) ja Irreparable – ainult varuosadeks.",
          "Quebec: raskelt kahjustatud sõidukid (VGA – véhicule gravement accidenté) märkega „reconstruit“ (taastatud) või „irrécupérable“ (parandamatu).",
        ],
        "Ära osta sõitmiseks autosid märkega irreparable või irrécupérable – neid ei saa seaduslikult registreerida. Muud staatused ELi registreerimistunnistusele ei kandu, kuid mõjutavad väärtust ja näitavad, et autol on olnud tõsiseid kahjustusi.",
      ],
    },
    {
      id: "inspection",
      title: "Kuidas kontrollida autot Kanadast",
      paras: [
        [
          "Ajalugu VIN-i järgi: CARFAX Canada raport näitab kahjustusi, provintside registreeringuid ja läbisõitu; USA-st tulnud autode puhul kontrolli ka USA ajalugu.",
          "Pandiõigused: Kanadas võib auto olla laenu tagatiseks. Kontrolli provintsi pandiregistrist (nt PPSA), et auto on koormisteta – vastasel juhul võidakse eksport blokeerida ja võid isegi autost ilma jääda.",
          "Rooste: küsi fotosid põhjast, lävepakkudest, rattakoobastest ja pidurivoolikutest – teesool jätab oma jälje.",
          "Turuversioon: Kanada autod on tavaliselt USA omadele väga sarnased ja vajavad sarnaseid tulede muudatusi.",
        ],
        "Oksjoniautodele kehtivad samad reeglid kui USA-s: kahjustuste fotod, „Run and Drive“ tähendus ja varu varjatud kahjustuste jaoks.",
      ],
    },
    {
      id: "shipping",
      title: "Eksport ja vedu Kanadast",
      paras: [
        "Enim kasutatavad sadamad on idas Halifax ja Montreal ning läänes Vancouver. Idarannikult jõuab laev Põhjamere sadamatesse tavaliselt umbes 2 nädalaga – üks kiiremaid marsruute Euroopasse. Lääneprovintside autod sõidavad sageli rongiga itta või väljuvad Vancouverist Panama kanali kaudu, mis võtab kauem aega.",
        "Ekspordiks on vaja omandidokumenti (provintsi registreering), ostutõendit ja ekspordideklaratsiooni CBSA süsteemis (CERS), mille esitab tavaliselt eksportija või ekspedeerija. Auto peab olema pandivaba.",
        "Veovõimalused on samad kui USA-st: jagatud konteiner, eraldi konteiner või RoRo sõitvatele autodele. Talvel arvesta võimalike viivitustega maismaaveol sadamasse.",
      ],
    },
    {
      id: "duty",
      title: "Toll ja CETA leping",
      paras: [
        "Tänu ELi ja Kanada kaubanduslepingule (CETA) võivad Kanadas valmistatud autod siseneda ELi 0% tolliga. Tingimuseks on Kanada päritolu, mida kinnitab eksportija päritoluavaldus. Kanadast ostmisest ei piisa – paljud seal müüdavad autod on valmistatud USA-s, Mehhikos või Jaapanis ja maksavad täit 10%.",
        "Numbriga „2“ algav VIN tähendab, et auto on valmistatud Kanadas. See on hea vihje, kuid mitte tõend – eraisikult ostes on päritoluavaldust sageli raske saada ja ilma selleta on toll 10% tolliväärtusest (CIF). Veoautodeks klassifitseeritud pikapid maksavad 22%.",
        "Lisaks tollile võetakse tollivormistusriigi impordi käibemaksu ja registreerimisriigi riiklikke makse (aktsiis või registreerimistasu). Ettevõtted saavad kasutada protseduuri 4200 ja deklareerida käibemaksu sihtriigis.",
      ],
    },
    {
      id: "adaptation",
      title: "ELi nõuetele kohandamine ja registreerimine",
      paras: [
        "Kanada autosid on veidi lihtsam registreerida kui USA omi: neil on km/h spidomeeter ja tehases paigaldatud päevatuled. Tavaliselt tuleb siiski:",
        [
          "vahetada tagumised suunatuled kollaste vastu, kui piduritulid vilguvad,",
          "lisada tagumine udutuli,",
          "kohandada esituled Euroopa lähitulede mustrile.",
        ],
        "Registreerimiseks on vaja dokumentide vandetõlkeid, tollivormistuse dokumenti, riiklike maksude tõendit ja tehnoülevaatust. Sellised riigid nagu Saksamaa või Prantsusmaa võivad nõuda üksikkinnitust.",
      ],
    },
    {
      id: "mistakes",
      title: "Kõige levinumad vead Kanadast importimisel",
      paras: [
        [
          "Eeldus, et iga Kanadast pärit auto maksab 0% tolli – see kehtib ainult Kanadas valmistatud autodele, millel on päritoluavaldus.",
          "Pandiõiguse kontrollimata jätmine enne ostu.",
          "Põhja rooste eiramine karmide talvedega provintsidest pärit autodel.",
          "Auto ostmine staatusega irreparable või irrécupérable.",
          "Lääneprovintsidest idasadamatesse toimuva maismaaveo alahindamine.",
        ],
      ],
    },
  ],
  JAPAN: [
    {
      id: "market",
      title: "Jaapani automaailm – miks JDM",
      paras: [
        "Jaapan on tuntud väga heas tehnilises seisukorras ja väikese läbisõiduga autode poolest. Põhjuseks on range shaken-ülevaatus, mis auto vananedes kallineb – seetõttu müüvad paljud jaapanlased oma autod mõne aasta pärast ja vanemate autode hinnad langevad kiiresti.",
        "Suurem osa Jaapanist imporditavatest autodest on JDM-autod (Japanese Domestic Market) – sportautode legendid (Nissan Skyline GT-R, Toyota Supra, Mazda RX-7, Honda NSX), maasturid (Toyota Land Cruiser), mahtuniversaalid ja uuemad hübriidid. Kollektsionääride jaoks on võtmemudelid need, mida Euroopas pole kunagi ametlikult müüdud.",
        "Kõik Jaapani turu autod on paremapoolse rooliga. ELis saab neid registreerida, kuid parempoolses liikluses on nendega sõitmine ebamugavam ja neid võib olla raskem edasi müüa – välja arvatud nõutud kollektsioonimudelid.",
      ],
    },
    {
      id: "auctions",
      title: "Oksjonid Jaapanis – USS ja teised",
      paras: [
        "Enamik Jaapani kasutatud autodest läbib edasimüüjate oksjoneid. Suurim on USS-võrgustik, lisaks muu hulgas TAA, CAA, HAA, JU ja Arai. Igal nädalal pakutakse kümneid tuhandeid autosid.",
        "Välismaine ostja ei paku ise – seda teeb Jaapani eksportija (oksjoniagent): tal on oksjonitele ligipääs, ta tõlgib oksjonilehe, ostab auto, kustutab selle ekspordiks registrist ja saadab teele. Haamrihinnale lisanduvad oksjonitasu, eksportija vahendustasu, siseriiklik transport sadamasse ja ekspordidokumendid. Tavaliselt makstakse jeenides.",
        "Võid osta ka eksportija laost – see võib maksta rohkem, kuid auto on juba kontrollitud ja ootab sageli sadamas.",
      ],
    },
    {
      id: "titles",
      title: "Kuidas lugeda Jaapani oksjonilehte",
      paras: [
        "Oksjonileht (auction sheet) on oksjoni inspektori aruanne – kõige olulisem teabeallikas auto kohta. See sisaldab üldhinnet, salongi hinnet ja kere kahjustuste kaarti.",
        [
          "Üldhinne: S või 6 – praktiliselt uus; 5 ja 4,5 – väga hea seisukord; 4 – hea, väikeste kasutusjälgedega; 3,5 ja 3 – nähtavad puudused või suurem läbisõit; R või RA – parandatud avariikahjustus (RA – väike remont); 0 või *** – kahjustatud, üleujutatud või hindamata.",
          "Salongi hinne: A-st (nagu uus) kuni E-ni (tugevalt kulunud).",
          "Kahjustuste kaart: A – kriimustus, U – mõlk, B – mõlk koos kriimustusega, W – ebatasasus või remondijäljed, S ja C – rooste ja korrosioon, P – värvijäljed, X – vahetamist vajav detail, XX – vahetatud detail, Y – mõra või auk. Tähe kõrval olev number (1–3) näitab kahjustuse suurust.",
        ],
        "Lehel on ka oksjoni kontrollitud läbisõit, varustus ja inspektori jaapanikeelsed märkused – hea eksportija tõlgib need enne pakkumist.",
      ],
    },
    {
      id: "inspection",
      title: "Millele Jaapani autode puhul tähelepanu pöörata",
      paras: [
        [
          "Läbisõit: Jaapani autodel on tavaliselt tegelik ja väike läbisõit, kuid kontrolli selle ajalugu oksjonilehelt ja eksporditunnistuselt.",
          "Rooste: põhjast (Hokkaido) ja rannikualadelt pärit autod võivad olla soola tõttu korrodeerunud – vaata põhja fotosid.",
          "Ümberehitused: sportautodel on sageli muudetud vedrustus, väljalase ja mootor, mis võib ELi tehnoülevaatuse keerulisemaks teha.",
          "Kiirusepiirikud: paljudel JDM-autodel on tehasepoolne piirik 180 km/h juures.",
          "Elektroonika: Jaapani raadiod kasutavad FM-sagedusala 76–90 MHz, navigatsioon ja menüüd on jaapani keeles ning ETC teemaksuseade on Euroopas kasutu.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Eksport ja vedu Jaapanist",
      paras: [
        "Pärast ostu kustutab eksportija auto registrist ja hangib Export Certificate'i – registreeringut asendava dokumendi auto andmete ja läbisõiduga. Seda on vaja ELi tollivormistuseks ja registreerimiseks koos arve ja konossemendiga (B/L).",
        "Autod väljuvad peamiselt Yokohamast, Nagoyast, Kobest ja Osakast. RoRo-laevad sõidavad Euroopasse tavaliselt 5–7 nädalat (läbi Suessi kanali või ümber Aafrika), konteinerid umbes sama kaua või veidi kauem. Konteiner on hea valik väärtuslikele või mittesõitvatele autodele.",
        "Levinumad sihtsadamad on Bremerhaven, Rotterdam, Antwerpen ja Zeebrugge. Kaubakindlustus tasub end ära – pikal merereisil on kahjustuste oht suurem.",
      ],
    },
    {
      id: "duty",
      title: "Toll ja ELi–Jaapani leping",
      paras: [
        "ELi ja Jaapani majanduspartnerluse leping (EPA) kaotas autode tolli järk-järgult – alates 2026. aastast võivad Jaapani päritoluga autod siseneda ELi 0% tolliga. Päritolu tõendatakse eksportija päritoluavaldusega või importija teadmistega (dokumendid, mis näitavad, et auto on valmistatud Jaapanis).",
        "Jaapanis valmistatud JDM-autod vastavad tavaliselt tingimustele. Ole ettevaatlik mujal (nt USA-s või Tais) valmistatud Jaapani markidega – need maksavad tavapärast 10% tolliväärtusest. Ilma päritolutõendita on toll samuti 10%.",
        "Üle 30 aasta vanad originaalseisukorras autod võivad olla kollektsioonisõidukid – siis on toll 0% ja mõned riigid rakendavad vähendatud käibemaksu. Pärast tollivormistust kehtivad registreerimisriigis mootoril, heitkogustel või väärtusel põhinevad riiklikud maksud.",
      ],
    },
    {
      id: "adaptation",
      title: "Paremapoolne rool – registreerimine ELis",
      paras: [
        "Paremapoolse rooliga autosid saab ELi riikides registreerida, kui need vastavad tehnilistele nõuetele. Peamised muudatused on:",
        [
          "parempoolse liikluse valgusmustriga esituled (reguleerimine või klaaside vahetus),",
          "tagumine udutuli õigel pool ja kollased suunatuled (Jaapani autodel on need tavaliselt juba olemas),",
          "km/h spidomeeter – Jaapani autodel on see tehasest.",
        ],
        "Mõned riigid, nt Saksamaa, nõuavad üksikkinnitust või eksperdiarvamust. Registreerimiseks on vaja eksporditunnistuse ja arve tõlkeid, tollivormistuse dokumenti, riiklike maksude tõendit ja tehnoülevaatust.",
      ],
    },
    {
      id: "mistakes",
      title: "Kõige levinumad vead Jaapanist importimisel",
      paras: [
        [
          "Pakkumine ilma tõlgitud oksjonileheta.",
          "Aja alahindamine – ostust registreerimiseni kulub sageli 2–3 kuud.",
          "0% tollile lootmine väljaspool Jaapanit valmistatud Jaapani margi puhul.",
          "Tulede ümberehituse ja võimaliku üksikkinnituse kulu unustamine.",
          "Tugevalt ümberehitatud auto ostmine, mis ei läbi tehnoülevaatust.",
          "Puuduv kindlustus pikaks merereisiks.",
        ],
      ],
    },
  ],
  UAE: [
    {
      id: "market",
      title: "Araabia Ühendemiraatide automaailm",
      paras: [
        "Dubai ja teised emiraadid kuuluvad maailma suurimate luksusautode turgude hulka. Suur nõudlus uute autode järele täidab kasutatud autode turu mõne aasta vanuste maasturite, sportautode ja premium-sedaanidega – sageli Euroopast odavamalt.",
        "Enamik Araabia Ühendemiraatides müüdavatest autodest on GCC-versioonid (Pärsia lahe koostöönõukogu), mis on ehitatud kuumuse jaoks: võimsam kliimaseade ja jahutus, mõnikord teistsugune varustus kui Euroopas. Palju on ka USA-st toodud autosid – sageli kahjustatud –, mida müüakse edasi „impordina“.",
        "Araabia Ühendemiraatidest tuuakse kõige sagedamini suuri maastureid (Nissan Patrol, Toyota Land Cruiser, Lexus LX), luksus- ja sportautosid. Suurema läbisõiduga autode puhul pea silmas kliima mõju.",
      ],
    },
    {
      id: "auctions",
      title: "Kust osta autot Araabia Ühendemiraatides",
      paras: [
        "Autosid ostetakse kauplustest (sh markide sertifitseeritud kasutatud autode programmidest), oksjonitelt nagu Emirates Auction ja Copart UAE ning kuulutustest. Dubais on ka suur kasutatud autode turg paljude ekspordifirmadega, mis teenindavad välismaiseid ostjaid.",
        "Välismaalt ostes on kõige turvalisem tegutseda usaldusväärse eksportija kaudu: eksportija kontrollib autot ja dokumente, kustutab auto registrist, hangib eksporditunnistuse ja saadab auto teele.",
      ],
    },
    {
      id: "titles",
      title: "Dokumendid: Mulkiya ja eksporditunnistus",
      paras: [
        "Araabia Ühendemiraatide registreerimisdokument on liiklusameti (Dubais RTA) väljastatud Mulkiya kaart. Ekspordiks tuleb auto registrist kustutada ja hankida eksporditunnistus (sageli koos ekspordinumbrimärkidega) – see on ELi tollivormistuse võtmedokument.",
        "Autol ei tohi olla tasumata trahve ega panga pandiõigust. Paljud autod ostetakse Araabia Ühendemiraatides krediidiga – kontrolli enne ostu, et laen on tasutud ja pank on auto ekspordiks vabastanud.",
      ],
    },
    {
      id: "inspection",
      title: "Kuidas kontrollida autot Araabia Ühendemiraatidest",
      paras: [
        [
          "Päritolu: kontrolli VIN-i järgi, kas auto on GCC-versioon või tulnud USA-st. Numbriga 1, 4 või 5 algav VIN tähendab USA-s valmistatud autot – kontrolli siis selle USA ajalugu (kahjustused, salvage-title).",
          "Üleujutus: pärast 2024. aasta torme jõudis turule palju üleujutatud autosid. Otsi veejälgi, muda ja korrosiooni salongis ja elektroonikas.",
          "Kliimakahjustused: kõrged temperatuurid kulutavad kummitihendeid, plasti, akusid, rehve ja kliimaseadet.",
          "Hooldusajalugu: kaupluste autodel on tavaliselt täielikud hooldusandmed – suur pluss edasimüügil.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Eksport ja vedu Araabia Ühendemiraatidest",
      paras: [
        "Peamine sadam on Jebel Ali Dubais. Teekond Euroopa sadamatesse kestab tavaliselt 3–5 nädalat olenevalt marsruudist (läbi Punase mere ja Suessi kanali või ümber Aafrika) ja sihtsadamast. Autosid veetakse konteinerites või RoRo-laevadel.",
        "ELi tollivormistuseks on vaja eksporditunnistust, arvet ja konossementi (B/L). Autode puhul, mis on varem USA-st Araabia Ühendemiraatidesse jõudnud, on kasulikud ka USA ajaloo dokumendid.",
      ],
    },
    {
      id: "duty",
      title: "Toll importimisel Araabia Ühendemiraatidest",
      paras: [
        "ELil ei ole Araabia Ühendemiraatidega lepingut, mis vähendaks autode tolli, seega maksavad emiraatidest pärit autod tavapärast 10% tolliväärtusest (CIF) ja veoautodeks klassifitseeritud pikapid 22%. See kehtib ka USA-s valmistatud autodele: Ameerika autode 0% toll eeldab otsevedu USA-st.",
        "Lisaks tollile võetakse tollivormistusriigi impordi käibemaksu ja registreerimisriigi riiklikke makse. Üle 30 aasta vanad originaalseisukorras autod võivad olla 0% tolliga kollektsioonisõidukid.",
      ],
    },
    {
      id: "adaptation",
      title: "ELi nõuetele kohandamine ja registreerimine",
      paras: [
        "GCC-versiooni autod on vasakpoolse rooliga, neil on km/h spidomeeter ja tavaliselt Euroopa spetsifikatsioonile lähedane valgustus, seega on muudatusi sageli vähem kui USA autodel. Kontrolli siiski suunatulesid, tagumist udutuld ja esitulesid.",
        "USA-st Araabia Ühendemiraatidesse toodud autodel on Ameerika spetsifikatsioon ja need vajavad samu muudatusi nagu otse Ameerikast ostetud autod. Mõned ELi riigid nõuavad üksikkinnitust.",
      ],
    },
    {
      id: "mistakes",
      title: "Kõige levinumad vead Araabia Ühendemiraatidest importimisel",
      paras: [
        [
          "„GCC“ nime all müüdava Ameerika auto ostmine ilma VIN-i ja ajalugu kontrollimata.",
          "Tasumata laen või trahvid, mis blokeerivad ekspordi.",
          "Üleujutuse ja kuumakahjustuste märkide märkamata jätmine.",
          "0% tollile lootmine – Araabia Ühendemiraatidest pärit autod maksavad tavapärast 10%.",
        ],
      ],
    },
  ],
  UK: [
    {
      id: "market",
      title: "Ühendkuningriigi automaailm pärast Brexitit",
      paras: [
        "Ühendkuningriik on suur kasutatud autode turg tohutu valikuga premium-, sport- ja klassikalistest autodest. Pärast Brexitit on see ELi jaoks kolmas riik, seega nõuab import tollivormistust – kuid tänu ELi ja Ühendkuningriigi kaubandus- ja koostöölepingule (TCA) võivad päritolureeglitele vastavad autod siseneda 0% tolliga.",
        "Kõik Briti autod on paremapoolse rooliga. Seetõttu tuuakse kõige sagedamini autosid, mille puhul see ei ole oluline või mis on erakordselt soodsad: klassikalised ja kollektsiooniautod, haruldased versioonid ja premium-autod. Populaarne on ka varem Suurbritanniasse jõudnud Euroopa markide autode tagasitoomine.",
      ],
    },
    {
      id: "auctions",
      title: "Kust osta autot Ühendkuningriigis",
      paras: [
        "Autosid ostetakse kauplustest, kuulutuste kaudu (nt Auto Trader) ja oksjonitelt – edasimüüjate oksjonitelt (BCA, Manheim) ja kahjustatud autode oksjonitelt (Copart UK). Paljudel autodel on dokumenteeritud hooldusajalugu.",
        "Kahjustatud autode oksjonitel on autodel kahjustuskategooria, millest pead enne ostu aru saama.",
      ],
    },
    {
      id: "titles",
      title: "Kahjustuskategooriad ja V5C",
      paras: [
        "Registreerimisdokument on V5C (logbook). Täiskahjuks tunnistatud autod saavad Ühendkuningriigis kategooria:",
        [
          "Cat S – struktuursed kahjustused (nt pikitalad, piilarid); auto saab remontida ja liiklusesse tagasi viia.",
          "Cat N – mittestruktuursed kahjustused (nt elektroonika, kerepaneelid); auto saab remontida.",
          "Cat B – ainult varuosadeks, kere tuleb hävitada.",
          "Cat A – ainult utiliseerimiseks.",
        ],
        "Ära osta Cat A ega Cat B autosid sõitmiseks. Kategooriad S ja N tähendavad tõsiseid varasemaid kahjustusi – kontrolli remondi kvaliteeti.",
      ],
    },
    {
      id: "inspection",
      title: "Kuidas kontrollida autot Ühendkuningriigist",
      paras: [
        [
          "MOT-ajalugu: valitsuse veebilehel gov.uk saad registreerimisnumbri järgi tasuta vaadata kõiki MOT-ülevaatusi – iga aasta läbisõidu ja puuduste loeteluga. See on parim viis tagasikeeratud odomeetri avastamiseks.",
          "HPI-kontroll (või sarnane): näitab tasumata finantseeringut, vargust ja seda, kas auto on kantud täiskahjuks.",
          "Hooldusajalugu ja omanike arv V5C järgi.",
          "Läbisõit miilides – ELis registreerimiseks peab spidomeeter näitama ka km/h.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Eksport ja transport Ühendkuningriigist",
      paras: [
        "Enamik autosid ületab La Manche'i väina parvlaeva või rongiga (Dover–Calais, Eurotunnel), autoveokil või ise sõites. Transport kestab tavaliselt mõnest päevast nädalani. Šotimaalt või Põhja-Inglismaalt võivad autod sõita ka RoRo-laevaga Beneluxi ja Saksamaa sadamatesse.",
        "Pärast Brexitit on vaja kahte tollideklaratsiooni: ekspordideklaratsiooni Ühendkuningriigis ja impordideklaratsiooni ELis – ka siis, kui sõidad autoga ise. Tavaliselt vormistab need terminali tolliagent. Sõiduki valdaja teavitab ka DVLA-d alalisest ekspordist V5C vastava osaga.",
        "Briti numbrimärkidega registreerimisriiki sõitmine eeldab kehtivat kindlustust ja MOT-i – autoveok on sageli lihtsam.",
      ],
    },
    {
      id: "duty",
      title: "Toll, TCA ja käibemaks",
      paras: [
        "ELi ja Ühendkuningriigi kaubandus- ja koostööleping (TCA) võimaldab 0% tolli, kuid ainult päritolureeglitele vastavatele autodele – praktikas Ühendkuningriigis või ELis valmistatud autodele. Päritolu tõendatakse eksportija päritoluavaldusega või importija teadmistega. Ühendkuningriigist ostetud Jaapani või Ameerika auto maksab tavapärast 10% tolliväärtusest.",
        "Tollivormistusriigi impordi käibemaks tuleb tasuda olenemata tollist. Briti kauplusest ostes küsi, kas müügi saab vormistada ekspordina ilma Briti käibemaksuta – vastasel juhul maksad käibemaksu kaks korda.",
        "Registreerimisriigis kehtivad mootoril, heitkogustel või väärtusel põhinevad riiklikud maksud.",
      ],
    },
    {
      id: "adaptation",
      title: "Paremapoolne rool ja registreerimine ELis",
      paras: [
        "Briti autod on ehitatud Euroopa tüübikinnituse reeglite järgi, seetõttu on neil sageli vastavussertifikaat (COC) ja neid on lihtsam registreerida kui USA autosid. Tavaliselt jääb üle:",
        [
          "esituled parempoolseks liikluseks,",
          "tagumine udutuli õigel pool,",
          "km/h skaalaga spidomeeter.",
        ],
        "Registreerimiseks on vaja V5C-d (või ekspordi tõendit), arvet, vandetõlkeid, tollivormistuse dokumenti, riiklike maksude tõendit ja tehnoülevaatust.",
      ],
    },
    {
      id: "mistakes",
      title: "Kõige levinumad vead Ühendkuningriigist importimisel",
      paras: [
        [
          "Eeldus, et pärast Brexitit on kõik tollivaba – 0% kehtib ainult päritolureeglitele vastavatele autodele.",
          "Nii Briti käibemaksu kui ka ELi impordi käibemaksu tasumine sama auto eest.",
          "Cat A või Cat B auto ostmine.",
          "MOT-ajaloo ja HPI-raporti kontrollimata jätmine.",
          "Piiri ületamine ilma tollideklaratsioonideta, kui sõidad autoga ise.",
        ],
      ],
    },
  ],
};

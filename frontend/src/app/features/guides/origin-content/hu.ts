import { OriginDeep } from './types';

export const ORIGIN_DEEP: OriginDeep = {
  USA: [
    {
      id: "market",
      title: "Az amerikai autópiac – mit érdemes behozni",
      paras: [
        "Az Egyesült Államok a világ legnagyobb használtautó-piaca: évente mintegy 40 millió jármű cserél gazdát, és több millió megy át biztosítói aukciókon. Ezért sok modell – különösen a sérültek – jóval olcsóbb, mint Európában, és hatalmas a változatok választéka.",
        "Általában azokat az autókat éri meg behozni, amelyek Európában ritkák vagy drágák: nagy V8-as motorú muscle carokat (Mustang, Camaro, Challenger), nagy SUV-kat és pickupokat, jól felszerelt prémium változatokat és elektromos autókat, amelyek az USA-ban gyorsan veszítenek értékükből. Az olcsóbb kompaktoknál a szállítás és az adók gyakran elviszik a megtakarítást.",
        "Ne feledje, hogy az aukciós ár csak a kezdet. Hozzájönnek az aukciós díjak, a kikötőbe szállítás, a tengeri fuvar, a biztosítás, a vám, az áfa, a nemzeti adók, az uniós átalakítás és az esetleges javítás. Csak a végösszeg mutatja meg, hogy megéri-e az import – ezért licitálás előtt számoljon, ne utána.",
      ],
    },
    {
      id: "auctions",
      title: "Copart és IAAI aukciók – hogyan vásároljunk",
      paras: [
        "A Copart és az IAAI (Insurance Auto Auctions) főleg biztosítók, autókölcsönzők és bankok autóit árulja – sérült, lopás után előkerült, elárasztott vagy egyszerűen flottából kivont járműveket. A licitálás online zajlik, az autó pedig az ország több száz telephelyének egyikén áll. A helyszín számít: ettől függ a kikötőbe szállítás költsége és ideje.",
        "Az európai vásárló általában brókeren (aukciós engedéllyel rendelkező közvetítőn) keresztül licitál, mert sok autót – különösen salvage titlesal – csak engedéllyel rendelkező vevők vehetnek meg. A bróker jutalékot számol fel, és gyakran a szállítást és az exportpapírokat is intézi.",
        "A leütési árhoz jönnek az aukciós díjak: az árral sávosan növekvő vevői díj, az online licitálási díj, a telephelyről való kiadás díja (gate fee), a környezetvédelmi díj és a title kezelési díja. Egy néhány ezer dolláros autónál ez összesen általában néhány száztól több mint ezer dollárig terjed.",
        "A fizetési határidő rövid – általában néhány munkanap –, és az autót el kell vinni a telephelyről, mielőtt tárolási díjat kezdenének felszámolni. A késedelmes fizetés bírsággal és a fiók letiltásával jár, ezért az autó és a díjak árát licitálás előtt tegye félre.",
      ],
    },
    {
      id: "titles",
      title: "Title-típusok: clean, salvage, rebuilt",
      paras: [
        "Az USA-ban a tulajdonjogot az állam által kiadott title igazolja. Típusa elárulja az autó előéletét, és fontos a vásárlásnál és az exportnál:",
        [
          "Clean – az autó előéletében nincs totálkár; a legdrágább, de a legkisebb kockázatú.",
          "Salvage – a biztosító totálkárt állapított meg (a javítási költség meghaladta az autó értékének egy részét). A leggyakoribb title a Copartnál és az IAAI-nál.",
          "Rebuilt / Reconstructed – korábbi totálkár, amelyet megjavítottak, és az USA-ban újra forgalomba helyezhető.",
          "Non-repairable, Certificate of Destruction, Parts only, Junk – csak alkatrésznek. Ne vegye meg ezeket vezetésre: az export és az uniós forgalomba helyezés lehetetlen vagy nagyon nehéz lehet.",
        ],
        "Az Európai Unióban az amerikai title jelölései nem kerülnek át a forgalmi okmányba. Egy salvage autó forgalomba helyezhető, ha a javítás után átmegy a műszaki vizsgán. A title ettől még befolyásolja a viszonteladási értéket, és mindenekelőtt azt jelzi, hogy az autó súlyos kárt szenvedett – amelyet szakszerűen kell kijavítani.",
      ],
    },
    {
      id: "inspection",
      title: "Hogyan ellenőrizzük az autót licitálás előtt",
      paras: [
        "Az aukción nem láthatja személyesen az autót, ezért a hirdetés minden részlete számít. Licitálás előtt:",
        [
          "Ellenőrizze az előéletet az alvázszám (VIN) alapján (pl. Carfax, AutoCheck, NMVTIS adatbázis): károk, futásteljesítmény, tulajdonosok száma, lopás és árvíz.",
          "Nézze át a fotókat és a kárleírást (primary / secondary damage). A „Front end” jelenthet bármit a lökhárítótól a meghajlott hossztartókig és kioldott légzsákokig.",
          "Figyelmesen olvassa el az állapotcímkéket: a „Run and Drive” azt jelenti, hogy az autó a telephelyre érkezéskor mozgott, nem azt, hogy közlekedésre alkalmas; az „Engine Starts” csak azt, hogy a motor beindult.",
          "Legyen óvatos a hurrikán- és árvízsújtotta területekről (Florida, Texas, Louisiana) származó autókkal. Vízfoltok a szőnyeg alatt, iszap és korrodált elektromos csatlakozók – ezek okot adnak a visszalépésre.",
          "A futásteljesítmény mérföldben van (1 mérföld = 1,61 km), és lehet „not actual” vagy „exempt” jelölésű – ilyenkor a kilométeróra nem megbízható.",
        ],
        "Érdemes tartalékot képezni a rejtett hibákra – a becsült javítási költség akár 20–30%-át. Mielőtt meghatározza a maximális licitjét, kérjen árajánlatot alkatrészekre Európából vagy az USA-ból.",
      ],
    },
    {
      id: "shipping",
      title: "Export és tengeri szállítás",
      paras: [
        "A vásárlás után autószállító viszi az autót a telephelyről az exportkikötőbe. A leggyakoribb kikötők: New Jersey/New York, Savannah (Georgia), Baltimore, Houston és Los Angeles/Long Beach. A keleti partról az út az északi-tengeri kikötőkig általában 2–3 hét, Kaliforniából a Panama-csatornán át akár 5–6 hét.",
        "Az exporthoz az eredeti title (vagy hiteles másolata) és a számla szükséges. Az exportőr benyújtja az Electronic Export Information (EEI) bejelentést az AES rendszerben – használt járműveknél értéktől függetlenül kötelező –, és az autót és az iratokat legalább 72 órával a hajó indulása előtt be kell mutatni az amerikai vámhatóságnak (CBP).",
        "Háromféleképpen lehet szállítani:",
        [
          "Közös konténer (általában 3–4 autó egy 40 lábas konténerben) – a legnépszerűbb, sérült és nem üzemképes autókhoz is alkalmas.",
          "Saját konténer – drágább, de az autó egyedül utazik, és alkatrészeket is tehet mellé.",
          "RoRo (roll-on/roll-off hajó) – gyakran a legolcsóbb, de csak üzemképes autóknak, és kisebb védelmet nyújt a sérülések ellen.",
        ],
        "Érdemes szállítmánybiztosítást kötni – általában az autó értékének 1,5–2%-a. Az uniós kikötőben kirakodják a konténert, és vámügynök végzi a vámkezelést. A kirakodási, terminál- és ügynöki díjakat a célkikötőben kell fizetni.",
      ],
    },
    {
      id: "duty",
      title: "Vám, származás és uniós vámkezelés",
      paras: [
        "A személyautókra kivetett általános uniós vám a vámérték 10%-a. A vámérték az autó ára az aukciós díjakkal, plusz a szállítás és a biztosítás az EU határáig (CIF-érték). A pickupok tehergépjárműnek minősülhetnek – ilyenkor a vám 22% –, a motorkerékpárok pedig 6–8%-ot fizetnek.",
        "2026. július 1-jétől 2029 végéig az USA-ban gyártott autók 0% vámmal léphetnek be az EU-ba (2026/1455/EU rendelet). A feltétel: igazolnia kell a vámhatóságnak az autó amerikai származását, és az autót közvetlenül az USA-ból kell elszállítani. Egy számla vagy egy „Made in USA” címke nem elég – származási igazolás kell. Az alvázszám segít: az USA-ban gyártott autók VIN-je 1-gyel, 4-gyel vagy 5-tel kezdődik. Egy Amerikában összeszerelt japán vagy német márka is jogosult lehet, egy Európában gyártott, de az USA-ban vásárolt BMW viszont nem.",
        "Az importáfát annak az országnak a kulcsával számítják, ahol az autót vámkezelik. Az áfa alapja a vámérték plusz a vám és az EU-n belüli rendeltetési helyig tartó szállítás költsége. A vállalkozások használhatják a 4200-as vámeljárást: vámkezelés az egyik országban, az áfa elszámolása a forgalomba helyezés országában.",
        "A vámkezelés után jönnek a nemzeti adók – országtól függően jövedéki adó (pl. Lengyelországban a hengerűrtartalomtól függően 3,1% vagy 18,6%), CO₂-, teljesítmény- vagy értékalapú regisztrációs adó (Magyarországon regisztrációs adó), vagy semmi. Gyakran ezek döntik el, megéri-e az import.",
      ],
    },
    {
      id: "adaptation",
      title: "Uniós átalakítás és forgalomba helyezés",
      paras: [
        "Az amerikai piacra készült autók nem felelnek meg egyes európai műszaki előírásoknak, ezért a műszaki vizsga előtt át kell alakítani őket:",
        [
          "A hátsó irányjelzőknek borostyánsárgának kell lenniük – sok amerikai autón a piros féklámpák villognak.",
          "Kötelező a hátsó ködlámpa.",
          "A fényszóróknak európai tompított fényeloszlásúnak és helyesen beállítottnak kell lenniük.",
          "A sebességmérőnek km/h-t kell mutatnia (általában elég a kettős skála).",
          "Az amerikai keréknyomás-érzékelők (TPMS) 315 MHz-en működnek – Európában a 433 MHz a gyakori, ami kerékcserénél számít.",
        ],
        "A világítás átalakítása általában néhány száz euróba kerül. Egyes országokban – pl. Németországban vagy Franciaországban – az EU-n kívülről érkező autónak forgalomba helyezés előtt egyedi jóváhagyás vagy szakértői vélemény is kell, ami időbe és pénzbe kerül.",
        "A forgalomba helyezéshez készítse elő a title és a számla hiteles fordítását, a vámkezelési okmányt, a nemzeti adó megfizetésének igazolását és a műszaki vizsga igazolását. Sok ország törvényi határidőt szab a behozott autó forgalomba helyezésére – Lengyelországban például 30 napot.",
      ],
    },
    {
      id: "mistakes",
      title: "A leggyakoribb hibák az USA-ból történő importnál",
      paras: [
        [
          "Licitálás a teljes költség kiszámítása nélkül – a díjak, a szállítás és az adók megduplázhatják az aukciós árat.",
          "„Parts only” title-lel vagy megsemmisítési igazolással rendelkező autó vásárlása, amely legálisan nem helyezhető forgalomba.",
          "A „Run and Drive” jelölésben való bizalom az alvázszám szerinti előélet ellenőrzése nélkül.",
          "Nincs tartalék a rejtett hibákra és alkatrészekre – egy törött autó javítása szinte mindig többe kerül, mint amit a fotók sejtetnek.",
          "0% vámmal számolni amerikai származási igazolás nélkül – anélkül 10%-ot fizet.",
          "Késedelmes aukciós fizetés és tárolási díjak a telephelyen.",
          "A forgalomba helyezés vagy a nemzeti adóbevallás határidejének elmulasztása az autó megérkezése után.",
        ],
      ],
    },
  ],
  CANADA: [
    {
      id: "market",
      title: "A kanadai autópiac – miben különbözik az USA-tól",
      paras: [
        "Kanada kisebb piac, mint az USA, de nagyjából ugyanazt kínálja: ugyanazokat a márkákat, modelleket és felszereltségeket, gyakran valamivel alacsonyabb áron, mint Európában. Sok vásárló az USA alternatívájának tekinti, különösen a kanadai gyárakból származó autóknál, amelyek élvezhetik a CETA-megállapodás előnyeit.",
        "A kanadai autóknak van néhány előnye: kilométerben mérő óra, gyári nappali menetfény és téli felszereltség (ülésfűtés, néha motorblokk-előmelegítő). Hátrány lehet a korrózió – télen erősen sózzák az utakat, és egy ontariói vagy québeci autó alja rosszabb állapotban lehet, mint egy dél-amerikai államból származóé.",
        "Kanadából leggyakrabban SUV-kat és pickupokat, helyben gyártott autókat (pl. Toyota RAV4, Lexus RX, Honda CR-V és Civic, Chrysler Pacifica) és alacsony futású lízingből visszakerült autókat hoznak be.",
      ],
    },
    {
      id: "auctions",
      title: "Hol vegyünk autót Kanadában",
      paras: [
        "A sérült autókat Kanadában a Copart Canada és az IAA (korábban Impact Auto Auctions) árulja, a sértetleneket kereskedői aukciók, például az ADESA, és kereskedők. Az USA-hoz hasonlóan sok aukció csak engedéllyel rendelkező brókeren keresztül érhető el.",
        "Népszerű a kereskedőktől és magánszemélyektől való vásárlás is apróhirdetési oldalakon keresztül. Magánvásárlásnál az exportpapírokat és a kikötőbe szállítást magának kell intéznie, ezért a legtöbb európai vevő exportcéget vesz igénybe, amely elhozza az autót, ellenőrzi az iratokat és elszállítja.",
        "Adja hozzá az árhoz az aukciós vagy kereskedői díjakat, és – kereskedőtől vásárolva – a kanadai forgalmi adókat (GST/HST/PST). Ezek egy része visszaigényelhető vagy fel sem számítják, ha a kereskedő közvetlenül exportra értékesít – vásárlás előtt kérdezzen rá.",
      ],
    },
    {
      id: "titles",
      title: "Tulajdoni okmányok és kárstátuszok",
      paras: [
        "Kanadában nincs amerikai típusú „title” – az okmány a tartomány által kiadott regisztráció (Ontarióban „ownership”). A kárstátuszt a tartományi nyilvántartás rögzíti:",
        [
          "Ontario és a legtöbb tartomány: Normal, Salvage (totálkár, forgalomba nem helyezhető), Rebuilt (megjavítva és vizsgálat után jóváhagyva) és Irreparable – csak alkatrésznek.",
          "Québec: súlyosan sérült járművek (VGA – véhicule gravement accidenté) „reconstruit” (újjáépített) vagy „irrécupérable” (helyrehozhatatlan) jelöléssel.",
        ],
        "Ne vegyen meg vezetésre irreparable vagy irrécupérable jelölésű autót – legálisan nem helyezhető forgalomba. A többi státusz nem kerül át az uniós forgalmi okmányba, de befolyásolja az értéket, és azt mutatja, hogy az autó súlyos kárt szenvedett.",
      ],
    },
    {
      id: "inspection",
      title: "Hogyan ellenőrizzünk egy kanadai autót",
      paras: [
        [
          "Előélet az alvázszám alapján: a CARFAX Canada jelentése mutatja a károkat, a tartományi regisztrációkat és a futásteljesítményt; az USA-ból érkezett autóknál az amerikai előéletet is ellenőrizze.",
          "Zálogjog: Kanadában egy autó hitel fedezete lehet. Ellenőrizze a tartományi zálogjog-nyilvántartásban (pl. PPSA), hogy az autó tehermentes – különben az export blokkolható, és akár el is veszítheti az autót.",
          "Korrózió: kérjen fotókat az alvázról, a küszöbökről, a kerékívekről és a fékcsövekről – az útsó megteszi a hatását.",
          "Piaci változat: a kanadai autók általában nagyon közel állnak az amerikaiakhoz, és hasonló világítási átalakítást igényelnek.",
        ],
        "Aukciós autóknál ugyanazok a szabályok érvényesek, mint az USA-ban: kárfotók, a „Run and Drive” jelentése és tartalék a rejtett hibákra.",
      ],
    },
    {
      id: "shipping",
      title: "Export és szállítás Kanadából",
      paras: [
        "A leggyakrabban használt kikötők keleten Halifax és Montreal, nyugaton Vancouver. A keleti partról a hajóút az északi-tengeri kikötőkig általában körülbelül 2 hét – az egyik leggyorsabb útvonal Európába. A nyugati tartományok autói gyakran vasúton mennek keletre, vagy Vancouverből indulnak a Panama-csatornán át, ami tovább tart.",
        "Az exporthoz a tulajdoni okmány (tartományi regisztráció), a vásárlás igazolása és a CBSA rendszerében (CERS) benyújtott exportnyilatkozat kell, amelyet általában az exportőr vagy a szállítmányozó nyújt be. Az autónak tehermentesnek kell lennie.",
        "A szállítási lehetőségek ugyanazok, mint az USA-ból: közös konténer, saját konténer vagy RoRo az üzemképes autóknak. Télen számoljon a kikötőbe tartó szárazföldi szállítás esetleges késésével.",
      ],
    },
    {
      id: "duty",
      title: "Vám és a CETA-megállapodás",
      paras: [
        "Az EU–Kanada kereskedelmi megállapodásnak (CETA) köszönhetően a Kanadában gyártott autók 0% vámmal léphetnek be az EU-ba. A feltétel az exportőr származási nyilatkozatával igazolt kanadai származás. Nem elég Kanadában vásárolni – sok Kanadában árult autót az USA-ban, Mexikóban vagy Japánban gyártottak, és ezek a teljes 10%-ot fizetik.",
        "A „2”-vel kezdődő VIN azt jelenti, hogy az autót Kanadában gyártották. Ez jó támpont, de nem bizonyíték – magánszemélytől vásárolva gyakran nehéz származási nyilatkozatot szerezni, nélküle pedig a vám a vámérték (CIF) 10%-a. A tehergépjárműnek minősülő pickupok 22%-ot fizetnek.",
        "A vám mellett a vámkezelés országának importáfáját és a forgalomba helyezés országában a nemzeti adókat (jövedéki vagy regisztrációs adó) kell megfizetni. A vállalkozások használhatják a 4200-as eljárást, és a rendeltetési országban számolhatják el az áfát.",
      ],
    },
    {
      id: "adaptation",
      title: "Uniós átalakítás és forgalomba helyezés",
      paras: [
        "A kanadai autókat valamivel könnyebb forgalomba helyezni, mint az amerikaiakat: km/h-s sebességmérőjük és gyári nappali menetfényük van. Általában azonban még szükséges:",
        [
          "a hátsó irányjelzőket borostyánsárgára cserélni, ha a féklámpák villognak,",
          "hátsó ködlámpát beszerelni,",
          "a fényszórókat az európai tompított fényhez igazítani.",
        ],
        "A forgalomba helyezéshez hiteles fordítások, vámkezelési okmány, a nemzeti adók igazolása és műszaki vizsga kell. Egyes országok, például Németország vagy Franciaország, egyedi jóváhagyást kérhetnek.",
      ],
    },
    {
      id: "mistakes",
      title: "A leggyakoribb hibák a kanadai importnál",
      paras: [
        [
          "Azt feltételezni, hogy minden kanadai autó 0% vámot fizet – ez csak a Kanadában gyártott, származási nyilatkozattal rendelkező autókra vonatkozik.",
          "Vásárlás előtt nem ellenőrizni a zálogjogot.",
          "Figyelmen kívül hagyni az alváz korrózióját a zord telű tartományokból érkező autóknál.",
          "Irreparable vagy irrécupérable státuszú autót venni.",
          "Alábecsülni a nyugati tartományokból a keleti kikötőkbe tartó szárazföldi szállítást.",
        ],
      ],
    },
  ],
  JAPAN: [
    {
      id: "market",
      title: "A japán autópiac – miért JDM",
      paras: [
        "Japán a kiváló műszaki állapotú, alacsony futású autóiról ismert. Ennek oka a szigorú shaken műszaki vizsga, amely az autó korával egyre drágább – ezért sok japán tulajdonos néhány év után eladja az autóját, és az idősebb autók ára gyorsan esik.",
        "A Japánból érkező import nagy része JDM (Japanese Domestic Market) autó – sportlegendák (Nissan Skyline GT-R, Toyota Supra, Mazda RX-7, Honda NSX), terepjárók (Toyota Land Cruiser), egyterűek és újabb hibridek. A gyűjtők számára a kulcsmodellek azok, amelyeket Európában hivatalosan soha nem forgalmaztak.",
        "A japán piac minden autója jobbkormányos. Az EU-ban forgalomba helyezhetők, de jobb oldali közlekedésben kevésbé kényelmesek, és nehezebb továbbadni őket – kivéve a keresett gyűjtői modelleket.",
      ],
    },
    {
      id: "auctions",
      title: "Aukciók Japánban – USS és a többiek",
      paras: [
        "Japánban a használt autók többsége kereskedői aukciókon cserél gazdát. A legnagyobb az USS hálózat, mellette többek között a TAA, a CAA, a HAA, a JU és az Arai. Hetente több tízezer autót kínálnak.",
        "Külföldi vevő nem licitál közvetlenül – ezt egy japán exportőr (aukciós ügynök) végzi: hozzáfér az aukciókhoz, lefordítja az aukciós lapot, megveszi az autót, exportra kivonja a forgalomból és elszállítja. A leütési árhoz jön az aukciós díj, az exportőr jutaléka, a belföldi szállítás a kikötőig és az exportiratok. A fizetés általában jenben történik.",
        "Vásárolhat az exportőr készletéből is – ez drágább lehet, de az autót már ellenőrizték, és gyakran a kikötőben vár.",
      ],
    },
    {
      id: "titles",
      title: "Hogyan olvassuk a japán aukciós lapot",
      paras: [
        "Az aukciós lap (auction sheet) az aukciós ellenőr jelentése – a legfontosabb információforrás az autóról. Tartalmaz egy összesített osztályzatot, egy beltéri osztályzatot és a karosszéria kártérképét.",
        [
          "Összesített osztályzat: S vagy 6 – gyakorlatilag új; 5 és 4,5 – nagyon jó állapot; 4 – jó, kisebb használati nyomokkal; 3,5 és 3 – látható hibák vagy magasabb futás; R vagy RA – javított baleseti kár (RA – kisebb javítás); 0 vagy *** – sérült, elárasztott vagy osztályozatlan.",
          "Beltéri osztályzat: A-tól (újszerű) E-ig (erősen kopott).",
          "Kártérkép: A – karc, U – horpadás, B – horpadás karccal, W – hullámosság vagy javítás nyoma, S és C – rozsda és korrózió, P – festéknyom, X – cserélendő elem, XX – cserélt elem, Y – repedés vagy lyuk. A betű melletti szám (1–3) a kár nagyságát jelzi.",
        ],
        "A lap mutatja az aukció által ellenőrzött futásteljesítményt, a felszereltséget és az ellenőr japán nyelvű megjegyzéseit is – egy jó exportőr licitálás előtt lefordítja ezeket.",
      ],
    },
    {
      id: "inspection",
      title: "Mire figyeljünk a japán autóknál",
      paras: [
        [
          "Futásteljesítmény: a japán autók általában valós, alacsony futásúak, de ellenőrizze az előzményeket az aukciós lapon és az exporttanúsítványon.",
          "Rozsda: az északi (Hokkaidó) és tengerparti területekről érkező autókat korrodálhatta a só – nézze meg az alvázról készült fotókat.",
          "Módosítások: a sportautóknak gyakran módosított futóműve, kipufogója és motorja van, ami megnehezítheti az uniós műszaki vizsgát.",
          "Sebességkorlátozók: sok JDM autóban gyári, 180 km/h-s korlátozó van.",
          "Elektronika: a japán rádiók a 76–90 MHz-es FM-sávot használják, a navigáció és a menük japánul vannak, az ETC útdíjegység pedig Európában használhatatlan.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Export és szállítás Japánból",
      paras: [
        "A vásárlás után az exportőr kivonja az autót a forgalomból, és beszerzi az Export Certificate-et – a regisztrációt helyettesítő okmányt az autó adataival és futásteljesítményével. Erre a számlával és a hajóraklevéllel (B/L) együtt van szükség az uniós vámkezeléshez és forgalomba helyezéshez.",
        "Az autók főleg Jokohamából, Nagojából, Kobéból és Oszakából indulnak. A RoRo hajók Európába általában 5–7 hét alatt érnek (a Szuezi-csatornán át vagy Afrika megkerülésével), a konténerek nagyjából ugyanennyi vagy kicsit több idő alatt. Értékes vagy nem üzemképes autóhoz a konténer jó választás.",
        "A leggyakoribb célkikötők Bremerhaven, Rotterdam, Antwerpen és Zeebrugge. Szállítmánybiztosítást érdemes kötni – hosszú hajóúton nagyobb a sérülés kockázata.",
      ],
    },
    {
      id: "duty",
      title: "Vám és az EU–Japán megállapodás",
      paras: [
        "Az EU–Japán gazdasági partnerségi megállapodás (EPA) fokozatosan megszüntette az autókra kivetett vámot – 2026-tól a japán származású autók 0% vámmal léphetnek be az EU-ba. A származást az exportőr származási nyilatkozata vagy az importőr ismeretei (az autó japán gyártását igazoló dokumentumok) igazolják.",
        "A Japánban gyártott JDM autók általában jogosultak. Figyeljen a máshol (pl. az USA-ban vagy Thaiföldön) gyártott japán márkákra – ezek a vámérték szokásos 10%-át fizetik. Származási igazolás nélkül a vám szintén 10%.",
        "A 30 évnél idősebb, eredeti állapotú autók gyűjtői járműnek minősülhetnek – ilyenkor a vám 0%, és egyes országok kedvezményes áfát alkalmaznak. A vámkezelés után a forgalomba helyezés országában a motoron, a kibocsátáson vagy az értéken alapuló nemzeti adók érvényesek.",
      ],
    },
    {
      id: "adaptation",
      title: "Jobbkormány – forgalomba helyezés az EU-ban",
      paras: [
        "A jobbkormányos autók az uniós országokban forgalomba helyezhetők, ha megfelelnek a műszaki követelményeknek. A fő módosítások:",
        [
          "jobb oldali közlekedéshez igazított fényszórók (beállítás vagy a búrák cseréje),",
          "hátsó ködlámpa a megfelelő oldalon és borostyánsárga irányjelzők (a japán autókon általában már megvannak),",
          "km/h-s sebességmérő – a japán autókon gyárilag ilyen van.",
        ],
        "Egyes országok, pl. Németország, egyedi jóváhagyást vagy szakértői véleményt kérnek. A forgalomba helyezéshez az exporttanúsítvány és a számla fordítása, a vámkezelési okmány, a nemzeti adók igazolása és műszaki vizsga szükséges.",
      ],
    },
    {
      id: "mistakes",
      title: "A leggyakoribb hibák a japán importnál",
      paras: [
        [
          "Licitálás lefordított aukciós lap nélkül.",
          "Az idő alábecsülése – a vásárlástól a forgalomba helyezésig gyakran 2–3 hónap telik el.",
          "0% vámmal számolni egy Japánon kívül gyártott japán márkánál.",
          "Elfelejteni a világítás átalakításának és az esetleges egyedi jóváhagyásnak a költségét.",
          "Erősen módosított autót venni, amely nem megy át a műszaki vizsgán.",
          "Nincs biztosítás a hosszú hajóútra.",
        ],
      ],
    },
  ],
  UAE: [
    {
      id: "market",
      title: "Az Egyesült Arab Emírségek autópiaca",
      paras: [
        "Dubaj és a többi emírség a világ legnagyobb luxusautó-piacai közé tartozik. Az új autók iránti erős kereslet néhány éves SUV-kkal, sportautókkal és prémium szedánokkal tölti meg a használtautó-piacot – gyakran olcsóbban, mint Európában.",
        "Az Emírségekben árult autók többsége GCC (Öböl-menti Együttműködési Tanács) változat, a hőségre tervezve: erősebb klíma és hűtés, néha más felszereltség, mint Európában. Sok autót hoztak be az USA-ból is – gyakran sérülten –, amelyeket „importként” adnak tovább.",
        "Az Emírségekből leggyakrabban nagy SUV-kat (Nissan Patrol, Toyota Land Cruiser, Lexus LX), luxus- és sportautókat hoznak be. Magasabb futású autóknál vegye figyelembe az éghajlat hatásait.",
      ],
    },
    {
      id: "auctions",
      title: "Hol vegyünk autót az Emírségekben",
      paras: [
        "Az autókat kereskedőktől (a márkák minősített használtautó-programjait is beleértve), aukciókon, például az Emirates Auction és a Copart UAE oldalán, valamint hirdetésekből vásárolják. Dubajban nagy használtautó-piac is működik, sok exportcéggel, amelyek külföldi vevőket szolgálnak ki.",
        "Külföldről vásárolva a legbiztonságosabb egy megbízható exportőrön keresztül: ellenőrzi az autót és az iratokat, kivonja a forgalomból, beszerzi az exporttanúsítványt és elszállítja az autót.",
      ],
    },
    {
      id: "titles",
      title: "Okmányok: Mulkiya és exporttanúsítvány",
      paras: [
        "Az Emírségekben a forgalmi okmány a közlekedési hatóság (Dubajban az RTA) által kiadott Mulkiya kártya. Exporthoz az autót ki kell vonni a forgalomból, és exporttanúsítványt kell szerezni (gyakran exportrendszámmal) – ez a kulcsdokumentum az uniós vámkezeléshez.",
        "Az autón nem lehet kifizetetlen bírság vagy banki zálogjog. Az Emírségekben sok autót hitelre vesznek – vásárlás előtt ellenőrizze, hogy a hitelt visszafizették, és a bank engedélyezte az exportot.",
      ],
    },
    {
      id: "inspection",
      title: "Hogyan ellenőrizzünk egy autót az Emírségekből",
      paras: [
        [
          "Származás: az alvázszám alapján ellenőrizze, hogy GCC változatról vagy az USA-ból érkezett autóról van-e szó. Az 1-gyel, 4-gyel vagy 5-tel kezdődő VIN amerikai gyártású autót jelent – ilyenkor ellenőrizze az amerikai előéletét (károk, salvage title).",
          "Árvíz: a 2024-es viharok után sok elárasztott autó került a piacra. Keressen víznyomokat, iszapot és korróziót az utastérben és az elektronikában.",
          "Éghajlati károk: a magas hőmérséklet koptatja a gumitömítéseket, a műanyagokat, az akkumulátorokat, a gumiabroncsokat és a klímát.",
          "Szervizelőélet: a kereskedői autóknak általában teljes szervizkönyvük van – ez nagy előny továbbadáskor.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Export és szállítás az Emírségekből",
      paras: [
        "A fő kikötő a dubaji Jebel Ali. Az út az európai kikötőkig általában 3–5 hét, az útvonaltól (a Vörös-tengeren és a Szuezi-csatornán át vagy Afrika megkerülésével) és a célkikötőtől függően. Az autók konténerben vagy RoRo hajón utaznak.",
        "Az uniós vámkezeléshez az exporttanúsítvány, a számla és a hajóraklevél (B/L) kell. Az Emírségekbe korábban az USA-ból érkezett autóknál az amerikai előélet dokumentumai is hasznosak.",
      ],
    },
    {
      id: "duty",
      title: "Vám az Emírségekből történő importnál",
      paras: [
        "Az EU-nak nincs olyan megállapodása az Emírségekkel, amely csökkentené az autók vámját, így az Emírségekből érkező autók a vámérték (CIF) szokásos 10%-át fizetik, a tehergépjárműnek minősülő pickupok pedig 22%-ot. Ez az USA-ban gyártott autókra is vonatkozik: az amerikai autók 0%-os vámja közvetlen szállítást követel meg az USA-ból.",
        "A vám mellett a vámkezelés országának importáfáját és a forgalomba helyezés országában a nemzeti adókat kell megfizetni. A 30 évnél idősebb, eredeti állapotú autók 0% vámmal gyűjtői járműnek minősülhetnek.",
      ],
    },
    {
      id: "adaptation",
      title: "Uniós átalakítás és forgalomba helyezés",
      paras: [
        "A GCC változatú autók balkormányosak, km/h-s sebességmérőjük van, és világításuk általában közel áll az európai specifikációhoz, így az átalakítás gyakran kisebb, mint az amerikai autóknál. Ellenőrizze azért az irányjelzőket, a hátsó ködlámpát és a fényszórókat.",
        "Az USA-ból az Emírségekbe hozott autók amerikai specifikációjúak, és ugyanazokat az átalakításokat igénylik, mint a közvetlenül Amerikában vásárolt autók. Egyes uniós országok egyedi jóváhagyást kérnek.",
      ],
    },
    {
      id: "mistakes",
      title: "A leggyakoribb hibák az Emírségekből történő importnál",
      paras: [
        [
          "„GCC”-ként árult amerikai autó vásárlása a VIN és az előélet ellenőrzése nélkül.",
          "Fennálló hitel vagy bírság, amely blokkolja az exportot.",
          "Az árvíz és a hőség okozta károk jeleinek figyelmen kívül hagyása.",
          "0% vámmal számolni – az Emírségekből érkező autók a szokásos 10%-ot fizetik.",
        ],
      ],
    },
  ],
  UK: [
    {
      id: "market",
      title: "A brit autópiac a Brexit után",
      paras: [
        "Az Egyesült Királyság nagy használtautó-piac, hatalmas prémium-, sport- és klasszikusautó-kínálattal. A Brexit óta az EU számára harmadik ország, így az import vámkezelést igényel – az EU–Egyesült Királyság kereskedelmi és együttműködési megállapodásnak (TCA) köszönhetően azonban a származási szabályoknak megfelelő autók 0% vámmal léphetnek be.",
        "Minden brit autó jobbkormányos. Ezért leggyakrabban olyan autókat hoznak be, amelyeknél ez nem számít, vagy amelyek kivételesen jó vételnek számítanak: klasszikusokat, gyűjtői autókat, ritka változatokat és prémium autókat. Népszerű a korábban Nagy-Britanniába került európai márkájú autók visszahozatala is.",
      ],
    },
    {
      id: "auctions",
      title: "Hol vegyünk autót az Egyesült Királyságban",
      paras: [
        "Az autókat kereskedőktől, apróhirdetésekből (pl. Auto Trader) és aukciókon vásárolják – kereskedői (BCA, Manheim) és sérült autós (Copart UK) aukciókon. Sok autónak dokumentált szervizelőélete van.",
        "A sérült autós aukciókon az autók kárkategóriát kapnak, amelyet vásárlás előtt meg kell értenie.",
      ],
    },
    {
      id: "titles",
      title: "Kárkategóriák és a V5C",
      paras: [
        "A forgalmi okmány a V5C (logbook). A totálkáros autók az Egyesült Királyságban kategóriát kapnak:",
        [
          "Cat S – szerkezeti kár (pl. hossztartók, oszlopok); az autó megjavítható és visszatérhet a forgalomba.",
          "Cat N – nem szerkezeti kár (pl. elektronika, karosszériaelemek); az autó megjavítható.",
          "Cat B – csak alkatrésznek, a karosszériát meg kell semmisíteni.",
          "Cat A – csak bontásra.",
        ],
        "Ne vegyen Cat A vagy Cat B autót vezetésre. Az S és N kategória súlyos korábbi kárt jelent – ellenőrizze a javítás minőségét.",
      ],
    },
    {
      id: "inspection",
      title: "Hogyan ellenőrizzünk egy brit autót",
      paras: [
        [
          "MOT-előzmények: a kormányzati gov.uk oldalon rendszám alapján ingyen megnézheti az összes MOT műszaki vizsgát – minden év futásteljesítményével és a hibák listájával. Ez a legjobb módja a visszatekert kilométeróra kiszűrésének.",
          "HPI (vagy hasonló) ellenőrzés: mutatja a fennálló finanszírozást, a lopást, és hogy az autót nyilvántartották-e totálkárosként.",
          "Szervizelőélet és a tulajdonosok száma a V5C alapján.",
          "Futásteljesítmény mérföldben – az uniós forgalomba helyezéshez a sebességmérőnek km/h-t is mutatnia kell.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Export és szállítás az Egyesült Királyságból",
      paras: [
        "A legtöbb autó komppal vagy vonattal kel át a La Manche-csatornán (Dover–Calais, Eurotunnel), autószállítón vagy saját tengelyen. A szállítás általában néhány naptól egy hétig tart. Skóciából vagy Észak-Angliából az autók RoRo hajóval is mehetnek a Benelux-államok és Németország kikötőibe.",
        "A Brexit óta két vámáru-nyilatkozat kell: kiviteli az Egyesült Királyságban és behozatali az EU-ban – akkor is, ha maga vezeti az autót. Ezeket általában a terminálon dolgozó vámügynök intézi. Az üzembentartó a V5C megfelelő részével a végleges exportot is bejelenti a DVLA-nak.",
        "Brit rendszámmal a forgalomba helyezés országáig vezetni érvényes biztosítással és MOT-tal lehet – az autószállító gyakran egyszerűbb.",
      ],
    },
    {
      id: "duty",
      title: "Vám, TCA és áfa",
      paras: [
        "Az EU–Egyesült Királyság kereskedelmi és együttműködési megállapodás (TCA) 0% vámot tesz lehetővé, de csak a származási szabályoknak megfelelő autóknál – a gyakorlatban az Egyesült Királyságban vagy az EU-ban gyártottaknál. A származást az exportőr származási nyilatkozata vagy az importőr ismeretei igazolják. Az Egyesült Királyságban vásárolt japán vagy amerikai autó a vámérték szokásos 10%-át fizeti.",
        "A vámkezelés országának importáfáját a vámtól függetlenül meg kell fizetni. Brit kereskedőtől vásárolva kérdezze meg, lehet-e exportértékesítést brit áfa nélkül lebonyolítani – különben kétszer fizet áfát.",
        "A forgalomba helyezés országában a motoron, a kibocsátáson vagy az értéken alapuló nemzeti adók érvényesek.",
      ],
    },
    {
      id: "adaptation",
      title: "Jobbkormány és uniós forgalomba helyezés",
      paras: [
        "A brit autók az európai típusjóváhagyási szabályok szerint készültek, ezért gyakran van megfelelőségi tanúsítványuk (COC), és könnyebb forgalomba helyezni őket, mint az amerikaiakat. Általában ezek maradnak:",
        [
          "jobb oldali közlekedéshez igazított fényszórók,",
          "hátsó ködlámpa a megfelelő oldalon,",
          "km/h-s skálájú sebességmérő.",
        ],
        "A forgalomba helyezéshez V5C (vagy exportigazolás), számla, hiteles fordítások, vámkezelési okmány, a nemzeti adók igazolása és műszaki vizsga szükséges.",
      ],
    },
    {
      id: "mistakes",
      title: "A leggyakoribb hibák a brit importnál",
      paras: [
        [
          "Azt feltételezni, hogy a Brexit után minden vámmentes – a 0% csak a származási szabályoknak megfelelő autókra vonatkozik.",
          "Brit áfát és uniós importáfát is fizetni ugyanarra az autóra.",
          "Cat A vagy Cat B autót venni.",
          "Nem ellenőrizni a MOT-előzményeket és a HPI-jelentést.",
          "Vámáru-nyilatkozatok nélkül átlépni a határt, ha maga vezeti az autót.",
        ],
      ],
    },
  ],
};

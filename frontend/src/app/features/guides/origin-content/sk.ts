import { OriginDeep } from './types';

export const ORIGIN_DEEP: OriginDeep = {
  USA: [
    {
      id: "market",
      title: "Americký trh s autami – čo sa oplatí doviezť",
      paras: [
        "Spojené štáty sú najväčším trhom s jazdenými autami na svete: ročne tam zmení majiteľa okolo 40 miliónov vozidiel a niekoľko miliónov prejde poisťovacími aukciami. Preto je mnoho modelov – najmä poškodených – výrazne lacnejších ako v Európe a výber verzií je obrovský.",
        "Zvyčajne sa oplatí dovážať autá, ktoré sú v Európe zriedkavé alebo drahé: muscle cary s veľkými motormi V8 (Mustang, Camaro, Challenger), veľké SUV a pick-upy, dobre vybavené prémiové verzie a elektromobily, ktoré v USA rýchlo strácajú hodnotu. Pri lacnejších kompaktoch úsporu často zjedia doprava a dane.",
        "Pamätajte, že cena z aukcie je len začiatok. Pripočítajte aukčné poplatky, dopravu do prístavu, námornú prepravu, poistenie, clo, DPH, národné dane, úpravy pre EÚ a prípadnú opravu. Až celkový súčet ukáže, či sa dovoz oplatí – preto počítajte skôr, ako prihodíte, nie potom.",
      ],
    },
    {
      id: "auctions",
      title: "Aukcie Copart a IAAI – ako nakupovať",
      paras: [
        "Copart a IAAI (Insurance Auto Auctions) predávajú najmä autá od poisťovní, autopožičovní a bánk – poškodené, vrátené po krádeži, zaplavené alebo len vyradené z flotíl. Prihadzuje sa online, zatiaľ čo auto stojí na jednom z niekoľkých stoviek areálov po celej krajine. Na lokalite záleží: určuje cenu a čas dopravy do prístavu.",
        "Kupujúci z Európy zvyčajne prihadzuje cez brokera (sprostredkovateľa s aukčnou licenciou), pretože mnohé autá – najmä so salvage titlom – smú kupovať len licencovaní kupujúci. Broker si účtuje províziu a často zabezpečí aj dopravu a vývozné doklady.",
        "K vydraženej cene sa pripočítavajú aukčné poplatky: poplatok kupujúceho, ktorý rastie po stupňoch s cenou, poplatok za online prihadzovanie, gate fee za výjazd z areálu, ekologický poplatok a poplatok za vybavenie titlu. Pri aute za niekoľko tisíc dolárov to zvyčajne robí niekoľko stoviek až vyše tisíc dolárov.",
        "Platba je splatná v krátkej lehote – zvyčajne niekoľko pracovných dní – a auto treba vyzdvihnúť z areálu skôr, než začnú plynúť poplatky za státie. Neskorá platba znamená pokutu a zablokovaný účet, preto majte peniaze na auto aj poplatky pripravené pred prihadzovaním.",
      ],
    },
    {
      id: "titles",
      title: "Typy titlu: clean, salvage, rebuilt",
      paras: [
        "V USA sa vlastníctvo preukazuje titlom vydaným štátom. Jeho typ hovorí o histórii auta a je dôležitý pri kúpe aj vývoze:",
        [
          "Clean – v histórii auta žiadna totálna škoda; najdrahší, ale najmenej rizikový.",
          "Salvage – poisťovňa vyhlásila totálnu škodu (cena opravy prekročila určitý podiel hodnoty auta). Najčastejší title na Coparte a IAAI.",
          "Rebuilt / Reconstructed – bývalá totálna škoda, ktorá bola opravená a v USA znovu pripustená do premávky.",
          "Non-repairable, Certificate of Destruction, Parts only, Junk – len na diely. Nekupujte ich na jazdu: vývoz a registrácia v EÚ môžu byť nemožné alebo veľmi náročné.",
        ],
        "V Európskej únii sa označenia z amerického titlu do osvedčenia o evidencii neprenášajú. Auto so salvage titlom sa dá zaregistrovať, ak po oprave prejde technickou kontrolou. Title však ovplyvňuje cenu pri ďalšom predaji a najmä hovorí, že auto malo vážnu škodu – a tá musí byť poriadne opravená.",
      ],
    },
    {
      id: "inspection",
      title: "Ako auto preveriť pred prihadzovaním",
      paras: [
        "Na aukcii auto osobne neuvidíte, takže sa počíta každý detail v inzeráte. Predtým, ako prihodíte:",
        [
          "Preverte históriu podľa VIN (napr. Carfax, AutoCheck, databáza NMVTIS): škody, nájazd, počet majiteľov, krádež a zaplavenie.",
          "Preštudujte fotky a popis poškodenia (primary / secondary damage). „Front end“ môže znamenať čokoľvek od nárazníka po ohnuté pozdĺžniky a vystrelené airbagy.",
          "Pozorne čítajte štítky stavu: „Run and Drive“ znamená, že auto pri príjazde do areálu išlo, nie že je spôsobilé na premávku; „Engine Starts“ znamená len, že motor naskočil.",
          "Pozor na autá z oblastí hurikánov a povodní (Florida, Texas, Louisiana). Stopy vody pod kobercom, bahno a skorodované elektrické konektory sú dôvod odstúpiť.",
          "Nájazd je v míľach (1 míľa = 1,61 km) a môže byť označený „not actual“ alebo „exempt“ – vtedy sa tachometru nedá veriť.",
        ],
        "Rozumné je mať rezervu na skryté vady – až 20–30 % odhadovanej ceny opravy. Skôr ako stanovíte maximálny príhoz, nechajte si naceniť diely z Európy alebo USA.",
      ],
    },
    {
      id: "shipping",
      title: "Vývoz a námorná preprava",
      paras: [
        "Po kúpe odvezie auto z areálu do vývozného prístavu autotransportér. Najčastejšími prístavmi sú New Jersey/New York, Savannah (Georgia), Baltimore, Houston a Los Angeles/Long Beach. Z východného pobrežia trvá plavba do prístavov v Severnom mori zvyčajne 2–3 týždne, z Kalifornie cez Panamský prieplav až 5–6 týždňov.",
        "Na vývoz je potrebný originálny title (alebo overená kópia) a faktúra. Vývozca podá Electronic Export Information (EEI) v systéme AES – povinné pre jazdené vozidlá bez ohľadu na hodnotu – a auto aj doklady musia byť predložené americkej colnej správe (CBP) najmenej 72 hodín pred vyplávaním lode.",
        "Auto sa dá prepraviť tromi spôsobmi:",
        [
          "Zdieľaný kontajner (zvyčajne 3–4 autá v 40-stopovom kontajneri) – najobľúbenejší, vhodný pre poškodené a nepojazdné autá.",
          "Exkluzívny kontajner – drahší, ale auto cestuje samo a môžete pridať diely.",
          "RoRo (loď roll-on/roll-off) – často najlacnejšie, ale len pre pojazdné autá a s menšou ochranou pred poškodením.",
        ],
        "Oplatí sa poistenie zásielky – zvyčajne 1,5–2 % hodnoty auta. V prístave EÚ sa kontajner vyloží a colný deklarant auto preclí. Poplatky za vykládku, terminál a agentúru sa platia v cieľovom prístave.",
      ],
    },
    {
      id: "duty",
      title: "Clo, pôvod a preclenie v EÚ",
      paras: [
        "Štandardné clo EÚ na osobné autá je 10 % colnej hodnoty. Colná hodnota je cena auta s aukčnými poplatkami plus doprava a poistenie na hranicu EÚ (hodnota CIF). Pick-upy môžu byť zaradené ako nákladné vozidlá – vtedy je clo 22 % – a motocykle platia 6–8 %.",
        "Od 1. júla 2026 do konca roka 2029 môžu autá vyrobené v USA vstúpiť do EÚ s clom 0 % (nariadenie (EÚ) 2026/1455). Podmienka: colníkom musíte preukázať americký pôvod auta a auto musí byť odoslané priamo z USA. Faktúra ani štítok „Made in USA“ nestačia – potrebný je doklad o pôvode. Nápovedu dáva VIN: autá vyrobené v USA majú VIN začínajúci 1, 4 alebo 5. Nárok môže mať aj japonská či nemecká značka zmontovaná v Amerike, no BMW vyrobené v Európe a kúpené v USA nie.",
        "DPH pri dovoze sa platí podľa sadzby krajiny, kde sa auto preclieva. Základom DPH je colná hodnota plus clo a náklady na dopravu do cieľa v EÚ. Firmy môžu využiť colný režim 4200: precliť auto v jednej krajine a DPH odviesť v krajine registrácie.",
        "Po preclení prichádzajú národné dane – podľa krajiny spotrebná daň (napr. 3,1 % alebo 18,6 % v Poľsku podľa objemu motora), registračný poplatok podľa CO₂, výkonu alebo hodnoty, alebo vôbec nič. Často práve ony rozhodujú, či sa dovoz oplatí.",
      ],
    },
    {
      id: "adaptation",
      title: "Úpravy pre EÚ a registrácia",
      paras: [
        "Autá pre americký trh nespĺňajú niektoré európske technické predpisy, a preto potrebujú pred technickou kontrolou úpravy:",
        [
          "Zadné smerovky musia byť oranžové – pri mnohých amerických autách blikajú červené brzdové svetlá.",
          "Povinné je zadné hmlové svetlo.",
          "Svetlomety musia mať európsky tvar stretávacieho svetla a byť správne nastavené.",
          "Tachometer má ukazovať km/h (zvyčajne stačí dvojitá stupnica).",
          "Americké snímače tlaku v pneumatikách (TPMS) pracujú na 315 MHz – v Európe je bežných 433 MHz, čo je dôležité pri výmene kolies.",
        ],
        "Prestavba osvetlenia zvyčajne stojí niekoľko stoviek eur. V niektorých krajinách – napr. v Nemecku alebo Francúzsku – potrebuje auto z krajiny mimo EÚ pred registráciou ešte individuálne schválenie alebo znalecký posudok, čo stojí čas aj peniaze.",
        "Na registráciu si pripravte úradné preklady titlu a faktúry, doklad o preclení, potvrdenie o zaplatení národnej dane a protokol z technickej kontroly. Mnohé krajiny stanovujú zákonnú lehotu na registráciu dovezeného auta – v Poľsku napríklad 30 dní.",
      ],
    },
    {
      id: "mistakes",
      title: "Najčastejšie chyby pri dovoze z USA",
      paras: [
        [
          "Prihadzovať bez výpočtu celkových nákladov – poplatky, doprava a dane môžu cenu z aukcie zdvojnásobiť.",
          "Kúpiť auto s titlom „parts only“ alebo s osvedčením o zničení, ktoré sa nedá legálne zaregistrovať.",
          "Veriť „Run and Drive“ bez preverenia histórie podľa VIN.",
          "Nemať rezervu na skryté vady a diely – oprava havarovaného auta stojí takmer vždy viac, ako naznačujú fotky.",
          "Počítať s clom 0 % bez dokladu o americkom pôvode – bez neho zaplatíte 10 %.",
          "Zaplatiť aukciu neskoro a nazbierať poplatky za státie v areáli.",
          "Zmeškať lehotu na registráciu alebo priznanie národnej dane po príchode auta.",
        ],
      ],
    },
  ],
  CANADA: [
    {
      id: "market",
      title: "Kanadský trh s autami – čím sa líši od USA",
      paras: [
        "Kanada je menší trh ako USA, ale ponúka v podstate to isté: rovnaké značky, modely aj výbavy, často za o niečo nižšie ceny ako v Európe. Mnohí kupujúci ju vnímajú ako alternatívu k USA, najmä pri autách z kanadských tovární, ktoré môžu ťažiť z dohody CETA.",
        "Kanadské autá majú niekoľko výhod: tachometer v kilometroch, továrenské denné svietenie a zimnú výbavu (vyhrievané sedadlá, niekedy predhrev motora). Nevýhodou môže byť korózia – v zime sa cesty veľa solia a spodok auta z Ontária alebo Québecu môže vyzerať horšie ako pri aute z juhu USA.",
        "Najčastejšie sa z Kanady dovážajú SUV a pick-upy, autá vyrábané priamo tam (napr. Toyota RAV4, Lexus RX, Honda CR-V a Civic, Chrysler Pacifica) a autá po lízingu s nízkym nájazdom.",
      ],
    },
    {
      id: "auctions",
      title: "Kde v Kanade kúpiť auto",
      paras: [
        "Poškodené autá predávajú v Kanade Copart Canada a IAA (predtým Impact Auto Auctions), nepoškodené obchodnícke aukcie ako ADESA a predajcovia. Rovnako ako v USA je mnoho aukcií prístupných len cez licencovaného brokera.",
        "Obľúbený je aj nákup od predajcov a súkromníkov cez inzertné portály. Pri súkromnom nákupe musíte vývozné doklady a dopravu do prístavu zariadiť sami, preto väčšina európskych kupujúcich využíva vývoznú firmu, ktorá auto vyzdvihne, preverí doklady a odošle.",
        "K cene pripočítajte aukčné alebo predajcove poplatky a – pri nákupe u predajcu – kanadské dane z predaja (GST/HST/PST). Niektoré z nich sa dajú vrátiť alebo sa neúčtujú, keď predajca predáva priamo na vývoz – opýtajte sa pred kúpou.",
      ],
    },
    {
      id: "titles",
      title: "Doklady o vlastníctve a stav poškodenia",
      paras: [
        "Kanada nemá „title“ v americkom štýle – dokladom je registrácia vydaná provinciou (v Ontáriu „ownership“). Stav poškodenia sa zapisuje do provinčného registra:",
        [
          "Ontário a väčšina provincií: Normal, Salvage (totálna škoda bez povolenia na premávku), Rebuilt (opravené a schválené po kontrole) a Irreparable – len na diely.",
          "Québec: ťažko havarované vozidlá (VGA – véhicule gravement accidenté) označené „reconstruit“ (prestavané) alebo „irrécupérable“ (neopraviteľné).",
        ],
        "Autá označené irreparable alebo irrécupérable nekupujte na jazdu – nedajú sa legálne zaregistrovať. Ostatné stavy sa do osvedčenia o evidencii v EÚ neprenášajú, ale ovplyvňujú cenu a ukazujú, že auto malo vážnu škodu.",
      ],
    },
    {
      id: "inspection",
      title: "Ako preveriť auto z Kanady",
      paras: [
        [
          "História podľa VIN: správa CARFAX Canada ukáže škody, provinčné registrácie a nájazd; pri autách, ktoré prišli z USA, preverte aj americkú históriu.",
          "Záložné práva: v Kanade môže auto slúžiť ako záloh úveru. Overte v provinčnom registri záložných práv (napr. PPSA), že auto nie je zaťažené – inak môže byť vývoz zablokovaný a auto môžete aj stratiť.",
          "Korózia: vyžiadajte si fotky spodku, prahov, podbehov a brzdových rúrok – cestná soľ si vyberá daň.",
          "Trhová verzia: kanadské autá sú zvyčajne veľmi blízke americkým a potrebujú podobné úpravy osvetlenia.",
        ],
        "Pri autách z aukcií platia rovnaké pravidlá ako v USA: fotky poškodenia, význam „Run and Drive“ a rezerva na skryté vady.",
      ],
    },
    {
      id: "shipping",
      title: "Vývoz a preprava z Kanady",
      paras: [
        "Najpoužívanejšími prístavmi sú Halifax a Montreal na východe a Vancouver na západe. Z východného pobrežia trvá plavba do prístavov v Severnom mori zvyčajne asi 2 týždne – jedna z najrýchlejších trás do Európy. Autá zo západných provincií často idú na východ vlakom alebo vyplávajú z Vancouveru cez Panamský prieplav, čo trvá dlhšie.",
        "Na vývoz je potrebný doklad o vlastníctve (provinčná registrácia), doklad o kúpe a vývozné vyhlásenie v systéme CBSA (CERS), ktoré zvyčajne podáva vývozca alebo špeditér. Auto nesmie byť zaťažené záložným právom.",
        "Možnosti prepravy sú rovnaké ako z USA: zdieľaný kontajner, exkluzívny kontajner alebo RoRo pre pojazdné autá. V zime počítajte s možným oneskorením pozemnej dopravy do prístavu.",
      ],
    },
    {
      id: "duty",
      title: "Clo a dohoda CETA",
      paras: [
        "Vďaka obchodnej dohode EÚ–Kanada (CETA) môžu autá vyrobené v Kanade vstúpiť do EÚ s clom 0 %. Podmienkou je kanadský pôvod potvrdený vyhlásením o pôvode od vývozcu. Kúpiť auto v Kanade nestačí – mnohé autá predávané v Kanade boli vyrobené v USA, Mexiku alebo Japonsku a platia plných 10 %.",
        "VIN začínajúci „2“ znamená, že auto bolo vyrobené v Kanade. Je to dobrá nápoveda, nie však dôkaz – pri nákupe od súkromníka je často ťažké získať vyhlásenie o pôvode a bez neho je clo 10 % colnej hodnoty (CIF). Pick-upy zaradené ako nákladné vozidlá platia 22 %.",
        "K clu sa pripočítava DPH pri dovoze v krajine preclenia a národné dane (spotrebná daň alebo registračný poplatok) v krajine registrácie. Firmy môžu využiť režim 4200 a DPH odviesť v cieľovej krajine.",
      ],
    },
    {
      id: "adaptation",
      title: "Úpravy pre EÚ a registrácia",
      paras: [
        "Kanadské autá sa registrujú o niečo ľahšie ako americké: majú tachometer v km/h a továrenské denné svietenie. Zvyčajne je však stále potrebné:",
        [
          "zmeniť zadné smerovky na oranžové, ak blikajú brzdové svetlá,",
          "doplniť zadné hmlové svetlo,",
          "upraviť svetlomety na európsky tvar stretávacieho svetla.",
        ],
        "Registrácia vyžaduje úradné preklady dokladov, doklad o preclení, potvrdenie o národných daniach a technickú kontrolu. Krajiny ako Nemecko alebo Francúzsko môžu požadovať individuálne schválenie.",
      ],
    },
    {
      id: "mistakes",
      title: "Najčastejšie chyby pri dovoze z Kanady",
      paras: [
        [
          "Predpoklad, že každé auto z Kanady má clo 0 % – platí to len pre autá vyrobené v Kanade s vyhlásením o pôvode.",
          "Neoveriť pred kúpou, či na aute neviazne záložné právo.",
          "Ignorovať koróziu spodku pri autách z provincií s tuhými zimami.",
          "Kúpiť auto so stavom irreparable alebo irrécupérable.",
          "Podceniť pozemnú dopravu zo západných provincií do východných prístavov.",
        ],
      ],
    },
  ],
  JAPAN: [
    {
      id: "market",
      title: "Japonský trh s autami – prečo JDM",
      paras: [
        "Japonsko je známe autami vo veľmi dobrom technickom stave a s nízkym nájazdom. Dôvodom je prísna kontrola shaken, ktorá sa s vekom auta predražuje – mnohí Japonci preto predávajú po niekoľkých rokoch a ceny starších áut rýchlo klesajú.",
        "Väčšina dovozov z Japonska sú autá JDM (Japanese Domestic Market) – športové legendy (Nissan Skyline GT-R, Toyota Supra, Mazda RX-7, Honda NSX), terénne autá (Toyota Land Cruiser), minivany a novšie hybridy. Pre zberateľov sú kľúčové modely, ktoré sa v Európe nikdy oficiálne nepredávali.",
        "Všetky autá z japonského trhu majú riadenie vpravo. V EÚ sa dajú zaregistrovať, ale jazda vpravo je s nimi menej pohodlná a horšie sa predávajú – s výnimkou vyhľadávaných zberateľských modelov.",
      ],
    },
    {
      id: "auctions",
      title: "Aukcie v Japonsku – USS a ďalšie",
      paras: [
        "Väčšina jazdených áut v Japonsku prechádza obchodníckymi aukciami. Najväčšia je sieť USS, ďalej okrem iných TAA, CAA, HAA, JU a Arai. Každý týždeň sa ponúkajú desiatky tisíc áut.",
        "Zahraničný kupec neprihadzuje priamo – robí to japonský vývozca (aukčný agent): má prístup na aukcie, preloží aukčný list, auto kúpi, odhlási ho na vývoz a odošle. K vydraženej cene sa pripočítava aukčný poplatok, provízia vývozcu, vnútroštátna doprava do prístavu a vývozné doklady. Platí sa zvyčajne v jenoch.",
        "Kúpiť sa dá aj zo skladu vývozcu – môže to byť drahšie, ale auto je už preverené a často čaká v prístave.",
      ],
    },
    {
      id: "titles",
      title: "Ako čítať japonský aukčný list",
      paras: [
        "Aukčný list (auction sheet) je správa aukčného inšpektora – najdôležitejší zdroj informácií o aute. Obsahuje celkovú známku, známku interiéru a mapu poškodení karosérie.",
        [
          "Celková známka: S alebo 6 – prakticky nové; 5 a 4,5 – veľmi dobrý stav; 4 – dobrý s drobnými stopami používania; 3,5 a 3 – viditeľné vady alebo vyšší nájazd; R alebo RA – opravená nehoda (RA – drobná oprava); 0 alebo *** – poškodené, zaplavené alebo bez hodnotenia.",
          "Známka interiéru: od A (ako nový) po E (silne opotrebovaný).",
          "Mapa poškodení: A – škrabanec, U – preliačina, B – preliačina so škrabancom, W – zvlnenie alebo stopy opravy, S a C – hrdza a korózia, P – stopy laku, X – diel na výmenu, XX – vymenený diel, Y – prasklina alebo diera. Číslo pri písmene (1–3) udáva veľkosť poškodenia.",
        ],
        "List ukazuje aj nájazd overený aukciou, výbavu a poznámky inšpektora v japončine – dobrý vývozca ich pred prihadzovaním preloží.",
      ],
    },
    {
      id: "inspection",
      title: "Na čo si dať pri japonských autách pozor",
      paras: [
        [
          "Nájazd: japonské autá majú zvyčajne skutočný, nízky nájazd, ale overte jeho históriu v aukčnom liste a vo vývoznom certifikáte.",
          "Hrdza: autá zo severu (Hokkaidó) a z pobrežných oblastí môžu byť skorodované soľou – pozrite si fotky spodku.",
          "Úpravy: športové autá majú často upravený podvozok, výfuk a motor, čo môže sťažiť technickú kontrolu v EÚ.",
          "Obmedzovače rýchlosti: mnohé autá JDM majú továrenský obmedzovač na 180 km/h.",
          "Elektronika: japonské rádiá používajú pásmo FM 76–90 MHz, navigácia a menu sú v japončine a mýtna jednotka ETC je v Európe nepoužiteľná.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Vývoz a preprava z Japonska",
      paras: [
        "Po kúpe vývozca auto odhlási a získa Export Certificate – doklad, ktorý nahrádza registráciu, s údajmi o aute a nájazdom. Je potrebný na preclenie aj registráciu v EÚ, spolu s faktúrou a nákladným listom (B/L).",
        "Autá odchádzajú hlavne z Jokohamy, Nagoje, Kóbe a Ósaky. Lode RoRo do Európy plávajú zvyčajne 5–7 týždňov (cez Suezský prieplav alebo okolo Afriky), kontajnery zhruba rovnako alebo o niečo dlhšie. Kontajner je dobrá voľba pre cenné alebo nepojazdné autá.",
        "Najčastejšími cieľovými prístavmi sú Bremerhaven, Rotterdam, Antverpy a Zeebrugge. Poistenie zásielky sa oplatí – na dlhej plavbe je riziko poškodenia vyššie.",
      ],
    },
    {
      id: "duty",
      title: "Clo a dohoda EÚ–Japonsko",
      paras: [
        "Dohoda o hospodárskom partnerstve EÚ–Japonsko (EPA) postupne zrušila clo na autá – od roku 2026 môžu autá japonského pôvodu vstúpiť do EÚ s clom 0 %. Pôvod sa preukazuje vyhlásením o pôvode od vývozcu alebo vedomosťou dovozcu (doklady, že auto bolo vyrobené v Japonsku).",
        "Autá JDM vyrobené v Japonsku zvyčajne nárok majú. Pozor na japonské značky vyrobené inde (napr. v USA alebo Thajsku) – tie platia štandardných 10 % colnej hodnoty. Bez dokladu o pôvode je clo tiež 10 %.",
        "Autá staršie ako 30 rokov v originálnom stave môžu byť považované za zberateľské vozidlá – vtedy je clo 0 % a niektoré krajiny účtujú zníženú DPH. Po preclení platia v krajine registrácie národné dane podľa motora, emisií alebo hodnoty.",
      ],
    },
    {
      id: "adaptation",
      title: "Riadenie vpravo – registrácia v EÚ",
      paras: [
        "Autá s riadením vpravo sa dajú v krajinách EÚ zaregistrovať, ak spĺňajú technické požiadavky. Hlavné úpravy sú:",
        [
          "svetlomety s charakteristikou pre pravostrannú premávku (nastavenie alebo výmena skiel),",
          "zadné hmlové svetlo na správnej strane a oranžové smerovky (japonské autá ich zvyčajne už majú),",
          "tachometer v km/h – japonské autá ho majú z výroby.",
        ],
        "Niektoré krajiny, napr. Nemecko, vyžadujú individuálne schválenie alebo znalecký posudok. Na registráciu sú potrebné preklady vývozného certifikátu a faktúry, doklad o preclení, potvrdenie o národných daniach a technická kontrola.",
      ],
    },
    {
      id: "mistakes",
      title: "Najčastejšie chyby pri dovoze z Japonska",
      paras: [
        [
          "Prihadzovať bez preloženého aukčného listu.",
          "Podceniť čas – od kúpy po registráciu často uplynú 2–3 mesiace.",
          "Počítať s clom 0 % pri japonskej značke vyrobenej mimo Japonska.",
          "Zabudnúť na náklady na prestavbu svetiel a prípadné individuálne schválenie.",
          "Kúpiť silne upravené auto, ktoré neprejde technickou kontrolou.",
          "Nemať poistenie na dlhú plavbu.",
        ],
      ],
    },
  ],
  UAE: [
    {
      id: "market",
      title: "Trh s autami v Spojených arabských emirátoch",
      paras: [
        "Dubaj a ostatné emiráty patria k najväčším trhom s luxusnými autami na svete. Silný dopyt po nových autách plní trh jazdených áut niekoľkoročnými SUV, športovými autami a prémiovými sedanmi – často lacnejšími ako v Európe.",
        "Väčšina áut predávaných v SAE sú verzie GCC (Rada pre spoluprácu v Perzskom zálive), stavané pre horúčavy: silnejšia klimatizácia a chladenie, niekedy iná výbava ako v Európe. Je tu aj mnoho áut dovezených z USA – často poškodených – a ďalej predávaných ako „import“.",
        "Najčastejšie sa zo SAE dovážajú veľké SUV (Nissan Patrol, Toyota Land Cruiser, Lexus LX), luxusné a športové autá. Pri autách s vyšším nájazdom myslite na vplyv klímy.",
      ],
    },
    {
      id: "auctions",
      title: "Kde v SAE kúpiť auto",
      paras: [
        "Autá sa kupujú u predajcov (vrátane certifikovaných programov jazdených áut značiek), na aukciách ako Emirates Auction a Copart UAE a z inzerátov. Dubaj má aj veľký trh s jazdenými autami a mnoho vývozných firiem, ktoré obsluhujú zahraničných kupcov.",
        "Pri nákupe zo zahraničia je najbezpečnejšia cesta cez dôveryhodného vývozcu: preverí auto aj doklady, odhlási ho, získa vývozný certifikát a auto odošle.",
      ],
    },
    {
      id: "titles",
      title: "Doklady: Mulkiya a vývozný certifikát",
      paras: [
        "Registračným dokladom v SAE je karta Mulkiya vydaná dopravným úradom (v Dubaji RTA). Na vývoz musí byť auto odhlásené a musí byť vydaný vývozný certifikát (často s vývoznými značkami) – kľúčový doklad pre preclenie v EÚ.",
        "Auto nesmie mať nezaplatené pokuty ani bankové záložné právo. Mnoho áut sa v SAE kupuje na úver – pred kúpou overte, že je úver splatený a banka auto uvoľnila na vývoz.",
      ],
    },
    {
      id: "inspection",
      title: "Ako preveriť auto zo SAE",
      paras: [
        [
          "Pôvod: podľa VIN overte, či ide o verziu GCC, alebo o auto z USA. VIN začínajúci 1, 4 alebo 5 znamená auto vyrobené v USA – vtedy preverte jeho americkú históriu (škody, salvage title).",
          "Zaplavenie: po búrkach v roku 2024 sa na trh dostalo mnoho zaplavených áut. Hľadajte stopy vody, bahno a koróziu v kabíne a elektronike.",
          "Škody od klímy: vysoké teploty opotrebúvajú gumové tesnenia, plasty, batérie, pneumatiky a klimatizáciu.",
          "Servisná história: autá od predajcov mávajú kompletné záznamy – veľké plus pri ďalšom predaji.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Vývoz a preprava zo SAE",
      paras: [
        "Hlavným prístavom je Džabal Alí v Dubaji. Plavba do európskych prístavov trvá zvyčajne 3–5 týždňov podľa trasy (cez Červené more a Suezský prieplav, alebo okolo Afriky) a cieľového prístavu. Autá cestujú v kontajneroch alebo na lodiach RoRo.",
        "Preclenie v EÚ vyžaduje vývozný certifikát, faktúru a nákladný list (B/L). Pri autách, ktoré do SAE predtým prišli z USA, sa hodia aj doklady z americkej histórie.",
      ],
    },
    {
      id: "duty",
      title: "Clo pri dovoze zo SAE",
      paras: [
        "EÚ nemá so SAE žiadnu dohodu, ktorá by znižovala clo na autá, takže autá z Emirátov platia štandardných 10 % colnej hodnoty (CIF) a pick-upy zaradené ako nákladné vozidlá 22 %. Platí to aj pre autá vyrobené v USA: clo 0 % na americké autá vyžaduje prepravu priamo z USA.",
        "K clu sa pripočítava DPH pri dovoze v krajine preclenia a národné dane v krajine registrácie. Autá staršie ako 30 rokov v originálnom stave môžu byť považované za zberateľské vozidlá s clom 0 %.",
      ],
    },
    {
      id: "adaptation",
      title: "Úpravy pre EÚ a registrácia",
      paras: [
        "Autá vo verzii GCC majú riadenie vľavo, tachometer v km/h a zvyčajne osvetlenie blízke európskej špecifikácii, takže úpravy bývajú menšie ako pri amerických autách. Napriek tomu skontrolujte smerovky, zadné hmlové svetlo a svetlomety.",
        "Autá dovezené do SAE z USA majú americkú špecifikáciu a potrebujú rovnaké úpravy ako autá kúpené priamo v Amerike. Niektoré krajiny EÚ vyžadujú individuálne schválenie.",
      ],
    },
    {
      id: "mistakes",
      title: "Najčastejšie chyby pri dovoze zo SAE",
      paras: [
        [
          "Kúpiť americké auto predávané ako „GCC“ bez preverenia VIN a histórie.",
          "Nesplatený úver alebo pokuty, ktoré blokujú vývoz.",
          "Prehliadnuť známky zaplavenia a poškodenia teplom.",
          "Počítať s clom 0 % – autá zo SAE platia štandardných 10 %.",
        ],
      ],
    },
  ],
  UK: [
    {
      id: "market",
      title: "Britský trh s autami po brexite",
      paras: [
        "Spojené kráľovstvo je veľký trh s jazdenými autami a obrovskou ponukou prémiových, športových a klasických áut. Od brexitu je pre EÚ treťou krajinou, takže dovoz vyžaduje preclenie – vďaka Dohode o obchode a spolupráci EÚ–Spojené kráľovstvo (TCA) však autá spĺňajúce pravidlá pôvodu môžu vstúpiť s clom 0 %.",
        "Všetky britské autá majú riadenie vpravo. Preto sa najčastejšie dovážajú autá, pri ktorých to nevadí alebo ktoré sú mimoriadne výhodné: veterány, zberateľské autá, zriedkavé verzie a prémiové autá. Obľúbený je aj spätný dovoz áut európskych značiek, ktoré predtým odišli do Británie.",
      ],
    },
    {
      id: "auctions",
      title: "Kde v Spojenom kráľovstve kúpiť auto",
      paras: [
        "Autá sa kupujú u predajcov, cez inzerciu (napr. Auto Trader) a na aukciách – obchodníckych (BCA, Manheim) aj s havarovanými autami (Copart UK). Mnohé autá majú zdokumentovanú servisnú históriu.",
        "Na aukciách havarovaných áut majú autá kategóriu poškodenia, ktorej musíte pred kúpou rozumieť.",
      ],
    },
    {
      id: "titles",
      title: "Kategórie poškodenia a V5C",
      paras: [
        "Registračným dokladom je V5C (logbook). Autá s totálnou škodou dostávajú v Spojenom kráľovstve kategóriu:",
        [
          "Cat S – štrukturálne poškodenie (napr. pozdĺžniky, stĺpiky); auto sa dá opraviť a vrátiť na cestu.",
          "Cat N – neštrukturálne poškodenie (napr. elektronika, diely karosérie); auto sa dá opraviť.",
          "Cat B – len na diely, skelet karosérie musí byť zničený.",
          "Cat A – len do šrotu.",
        ],
        "Autá Cat A ani Cat B nekupujte na jazdu. Kategórie S a N znamenajú vážnu škodu v minulosti – preverte kvalitu opravy.",
      ],
    },
    {
      id: "inspection",
      title: "Ako preveriť auto zo Spojeného kráľovstva",
      paras: [
        [
          "História MOT: na vládnom webe gov.uk si zadarmo podľa evidenčného čísla zistíte všetky technické kontroly MOT – s nájazdom z každého roka a zoznamom chýb. Je to najlepší spôsob, ako odhaliť stočený tachometer.",
          "Previerka HPI (alebo podobná): ukáže nesplatené financovanie, krádež a či bolo auto vedené ako totálna škoda.",
          "Servisná história a počet majiteľov z V5C.",
          "Nájazd v míľach – na registráciu v EÚ musí tachometer ukazovať aj km/h.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Vývoz a doprava zo Spojeného kráľovstva",
      paras: [
        "Väčšina áut prechádza cez Lamanšský prieliv trajektom alebo vlakom (Dover–Calais, Eurotunnel), na autotransportéri alebo po vlastnej osi. Doprava zvyčajne trvá niekoľko dní až týždeň. Autá zo Škótska alebo severného Anglicka môžu plávať aj loďou RoRo do prístavov Beneluxu a Nemecka.",
        "Od brexitu sú potrebné dve colné vyhlásenia: vývozné v Spojenom kráľovstve a dovozné v EÚ – aj keď auto šoférujete sami. Zvyčajne ich vybaví colný deklarant na termináli. Držiteľ tiež oznámi DVLA trvalý vývoz príslušnou časťou V5C.",
        "Jazda na britských značkách do krajiny registrácie vyžaduje platné poistenie a MOT – autotransportér býva jednoduchší.",
      ],
    },
    {
      id: "duty",
      title: "Clo, TCA a DPH",
      paras: [
        "Dohoda o obchode a spolupráci EÚ–Spojené kráľovstvo (TCA) umožňuje clo 0 %, ale len pri autách spĺňajúcich pravidlá pôvodu – v praxi vyrobených v Spojenom kráľovstve alebo v EÚ. Pôvod sa preukazuje vyhlásením o pôvode od vývozcu alebo vedomosťou dovozcu. Japonské alebo americké auto kúpené v Spojenom kráľovstve platí štandardných 10 % colnej hodnoty.",
        "DPH pri dovoze v krajine preclenia sa platí bez ohľadu na clo. Pri nákupe u britského predajcu sa opýtajte, či sa predaj na vývoz dá urobiť bez britskej DPH – inak zaplatíte DPH dvakrát.",
        "V krajine registrácie platia národné dane podľa motora, emisií alebo hodnoty.",
      ],
    },
    {
      id: "adaptation",
      title: "Riadenie vpravo a registrácia v EÚ",
      paras: [
        "Britské autá boli stavané podľa európskych pravidiel typového schvaľovania, takže majú často Certifikát zhody (COC) a registrujú sa ľahšie ako americké. Zvyčajne zostáva:",
        [
          "svetlomety pre pravostrannú premávku,",
          "zadné hmlové svetlo na správnej strane,",
          "tachometer so stupnicou v km/h.",
        ],
        "Registrácia vyžaduje V5C (alebo doklad o vývoze), faktúru, úradné preklady, doklad o preclení, potvrdenie o národných daniach a technickú kontrolu.",
      ],
    },
    {
      id: "mistakes",
      title: "Najčastejšie chyby pri dovoze zo Spojeného kráľovstva",
      paras: [
        [
          "Predpoklad, že po brexite je všetko bez cla – 0 % platí len pre autá spĺňajúce pravidlá pôvodu.",
          "Zaplatiť britskú DPH aj dovoznú DPH v EÚ za to isté auto.",
          "Kúpiť auto Cat A alebo Cat B.",
          "Nepreveriť históriu MOT a správu HPI.",
          "Prekročiť hranicu bez colných vyhlásení, keď auto šoférujete sami.",
        ],
      ],
    },
  ],
};

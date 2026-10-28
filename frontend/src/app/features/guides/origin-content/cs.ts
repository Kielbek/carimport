import { OriginDeep } from './types';

export const ORIGIN_DEEP: OriginDeep = {
  USA: [
    {
      id: "market",
      title: "Americký trh s auty – co se vyplatí dovézt",
      paras: [
        "Spojené státy jsou největším trhem s ojetými auty na světě: ročně tam změní majitele kolem 40 milionů vozidel a několik milionů projde pojišťovacími aukcemi. Proto je mnoho modelů – zvlášť poškozených – výrazně levnějších než v Evropě a výběr verzí je obrovský.",
        "Obvykle se vyplatí dovážet auta, která jsou v Evropě vzácná nebo drahá: muscle cary s velkými motory V8 (Mustang, Camaro, Challenger), velká SUV a pick-upy, dobře vybavené prémiové verze a elektromobily, které v USA rychle ztrácejí hodnotu. U levnějších kompaktů úsporu často sní doprava a daně.",
        "Pamatujte, že cena z aukce je jen začátek. Připočtěte aukční poplatky, dopravu do přístavu, námořní přepravu, pojištění, clo, DPH, národní daně, úpravy pro EU a případnou opravu. Teprve celkový součet ukáže, zda se dovoz vyplatí – proto počítejte předtím, než přihodíte, ne potom.",
      ],
    },
    {
      id: "auctions",
      title: "Aukce Copart a IAAI – jak nakupovat",
      paras: [
        "Copart a IAAI (Insurance Auto Auctions) prodávají hlavně auta od pojišťoven, autopůjčoven a bank – poškozená, vrácená po krádeži, zatopená nebo jen vyřazená z flotil. Přihazuje se online, zatímco auto stojí na jednom z několika set areálů po celé zemi. Na lokalitě záleží: určuje cenu a dobu dopravy do přístavu.",
        "Kupující z Evropy obvykle přihazuje přes brokera (zprostředkovatele s aukční licencí), protože mnoho aut – zvlášť se salvage titlem – smějí kupovat jen licencovaní kupci. Broker si účtuje provizi a často zajistí i dopravu a vývozní doklady.",
        "K vydražené ceně se připočítávají aukční poplatky: poplatek kupujícího, který roste po stupních s cenou, poplatek za online přihazování, gate fee za výjezd z areálu, ekologický poplatek a poplatek za vyřízení titlu. U auta za několik tisíc dolarů to obvykle dělá několik set až přes tisíc dolarů.",
        "Platba je splatná v krátké lhůtě – obvykle několik pracovních dní – a auto je nutné vyzvednout z areálu dřív, než začnou běžet poplatky za stání. Pozdní platba znamená pokutu a zablokovaný účet, takže mějte peníze na auto i poplatky připravené před přihazováním.",
      ],
    },
    {
      id: "titles",
      title: "Typy titlu: clean, salvage, rebuilt",
      paras: [
        "V USA se vlastnictví prokazuje titlem vydaným státem. Jeho typ vypovídá o historii auta a je důležitý pro koupi i vývoz:",
        [
          "Clean – v historii auta žádná totální škoda; nejdražší, ale nejméně rizikový.",
          "Salvage – pojišťovna prohlásila totální škodu (cena opravy překročila určitý podíl hodnoty auta). Nejčastější title na Copartu a IAAI.",
          "Rebuilt / Reconstructed – dřívější totální škoda, která byla opravena a v USA znovu připuštěna do provozu.",
          "Non-repairable, Certificate of Destruction, Parts only, Junk – pouze na díly. Nekupujte je k jízdě: vývoz a registrace v EU mohou být nemožné nebo velmi obtížné.",
        ],
        "V Evropské unii se označení z amerického titlu do technického průkazu nepřenáší. Auto se salvage titlem lze zaregistrovat, pokud po opravě projde technickou kontrolou. Title přesto ovlivňuje cenu při dalším prodeji a hlavně říká, že auto mělo vážnou škodu – a ta musí být řádně opravena.",
      ],
    },
    {
      id: "inspection",
      title: "Jak auto prověřit před přihazováním",
      paras: [
        "Na aukci auto osobně neuvidíte, takže se počítá každý detail v inzerátu. Než přihodíte:",
        [
          "Prověřte historii podle VIN (např. Carfax, AutoCheck, databáze NMVTIS): škody, nájezd, počet majitelů, krádež a zatopení.",
          "Prostudujte fotky a popis poškození (primary / secondary damage). „Front end“ může znamenat cokoli od nárazníku po ohnuté podélníky a vystřelené airbagy.",
          "Pozorně čtěte štítky stavu: „Run and Drive“ znamená, že auto při příjezdu do areálu jelo, ne že je pojízdné do provozu; „Engine Starts“ znamená jen, že motor naskočil.",
          "Pozor na auta z oblastí hurikánů a povodní (Florida, Texas, Louisiana). Stopy vody pod kobercem, bahno a zkorodované elektrické konektory jsou důvod odstoupit.",
          "Nájezd je v mílích (1 míle = 1,61 km) a může být označen „not actual“ nebo „exempt“ – pak se tachometru nedá věřit.",
        ],
        "Rozumné je mít rezervu na skryté vady – až 20–30 % odhadované ceny opravy. Než stanovíte maximální příhoz, nechte si nacenit díly z Evropy nebo USA.",
      ],
    },
    {
      id: "shipping",
      title: "Vývoz a námořní přeprava",
      paras: [
        "Po koupi odveze auto z areálu do vývozního přístavu autotransportér. Nejčastějšími přístavy jsou New Jersey/New York, Savannah (Georgie), Baltimore, Houston a Los Angeles/Long Beach. Z východního pobřeží trvá plavba do přístavů v Severním moři obvykle 2–3 týdny, z Kalifornie přes Panamský průplav až 5–6 týdnů.",
        "K vývozu je potřeba originální title (nebo ověřená kopie) a faktura. Vývozce podá Electronic Export Information (EEI) v systému AES – povinné pro ojetá vozidla bez ohledu na hodnotu – a auto i doklady musí být předloženy americké celní správě (CBP) nejméně 72 hodin před vyplutím lodi.",
        "Přepravit auto lze třemi způsoby:",
        [
          "Sdílený kontejner (obvykle 3–4 auta ve 40stopém kontejneru) – nejoblíbenější, vhodný pro poškozená a nepojízdná auta.",
          "Exkluzivní kontejner – dražší, ale auto cestuje samo a můžete přidat díly.",
          "RoRo (loď roll-on/roll-off) – často nejlevnější, ale jen pro pojízdná auta a s menší ochranou před poškozením.",
        ],
        "Vyplatí se pojištění zásilky – obvykle 1,5–2 % hodnoty auta. V přístavu EU se kontejner vyloží a celní deklarant auto proclí. Poplatky za vykládku, terminál a agenturu se platí v cílovém přístavu.",
      ],
    },
    {
      id: "duty",
      title: "Clo, původ a proclení v EU",
      paras: [
        "Standardní clo EU na osobní auta je 10 % celní hodnoty. Celní hodnota je cena auta s aukčními poplatky plus doprava a pojištění na hranici EU (hodnota CIF). Pick-upy mohou být zařazeny jako nákladní vozidla – pak je clo 22 % – a motocykly platí 6–8 %.",
        "Od 1. července 2026 do konce roku 2029 mohou auta vyrobená v USA vstoupit do EU s clem 0 % (nařízení (EU) 2026/1455). Podmínka: celníkům musíte prokázat americký původ auta a auto musí být odesláno přímo z USA. Faktura ani štítek „Made in USA“ nestačí – je potřeba doklad o původu. Nápovědu dává VIN: auta vyrobená v USA mají VIN začínající 1, 4 nebo 5. Nárok může mít i japonská či německá značka smontovaná v Americe, ale BMW vyrobené v Evropě a koupené v USA ne.",
        "DPH při dovozu se platí podle sazby země, kde se auto proclívá. Základem DPH je celní hodnota plus clo a náklady na dopravu do cíle v EU. Firmy mohou využít celní režim 4200: proclít auto v jedné zemi a DPH odvést v zemi registrace.",
        "Po proclení přicházejí národní daně – podle země spotřební daň (např. 3,1 % nebo 18,6 % v Polsku podle objemu motoru), registrační daň podle CO₂, výkonu nebo hodnoty, nebo vůbec nic. Často právě ony rozhodují, zda se dovoz vyplatí.",
      ],
    },
    {
      id: "adaptation",
      title: "Úpravy pro EU a registrace",
      paras: [
        "Auta pro americký trh nesplňují některé evropské technické předpisy, a proto potřebují před technickou kontrolou úpravy:",
        [
          "Zadní blinkry musí být oranžové – u mnoha amerických aut blikají červená brzdová světla.",
          "Povinné je zadní mlhové světlo.",
          "Světlomety musí mít evropský tvar potkávacího světla a být správně seřízené.",
          "Tachometr má ukazovat km/h (obvykle stačí dvojitá stupnice).",
          "Americká čidla tlaku v pneumatikách (TPMS) pracují na 315 MHz – v Evropě je běžných 433 MHz, což je důležité při výměně kol.",
        ],
        "Přestavba osvětlení obvykle stojí několik set eur. V některých zemích – např. v Německu nebo Francii – potřebuje auto z mimounijní země před registrací ještě individuální schválení nebo znalecký posudek, což stojí čas i peníze.",
        "K registraci si připravte soudní překlady titlu a faktury, doklad o proclení, potvrzení o zaplacení národní daně a protokol z technické kontroly. Mnoho zemí stanoví zákonnou lhůtu pro registraci dovezeného auta – v Polsku například 30 dní.",
      ],
    },
    {
      id: "mistakes",
      title: "Nejčastější chyby při dovozu z USA",
      paras: [
        [
          "Přihazovat bez výpočtu celkových nákladů – poplatky, doprava a daně mohou cenu z aukce zdvojnásobit.",
          "Koupit auto s titlem „parts only“ nebo s osvědčením o zničení, které nelze legálně zaregistrovat.",
          "Věřit „Run and Drive“ bez prověření historie podle VIN.",
          "Nemít rezervu na skryté vady a díly – oprava bouraného auta stojí téměř vždy víc, než naznačují fotky.",
          "Počítat s clem 0 % bez dokladu o americkém původu – bez něj zaplatíte 10 %.",
          "Zaplatit aukci pozdě a nabrat poplatky za stání v areálu.",
          "Zmeškat lhůtu pro registraci nebo přiznání národní daně po příjezdu auta.",
        ],
      ],
    },
  ],
  CANADA: [
    {
      id: "market",
      title: "Kanadský trh s auty – čím se liší od USA",
      paras: [
        "Kanada je menší trh než USA, ale nabízí v podstatě totéž: stejné značky, modely i výbavy, často za o něco nižší ceny než v Evropě. Mnoho kupujících ji bere jako alternativu k USA, hlavně u aut z kanadských továren, která mohou těžit z dohody CETA.",
        "Kanadská auta mají několik výhod: tachometr v kilometrech, tovární denní svícení a zimní výbavu (vyhřívaná sedadla, někdy předehřev motoru). Nevýhodou může být koroze – v zimě se silnice hodně solí a spodek auta z Ontaria nebo Québecu může vypadat hůř než u auta z jihu USA.",
        "Nejčastěji se z Kanady dovážejí SUV a pick-upy, auta vyráběná přímo tam (např. Toyota RAV4, Lexus RX, Honda CR-V a Civic, Chrysler Pacifica) a auta po leasingu s nízkým nájezdem.",
      ],
    },
    {
      id: "auctions",
      title: "Kde v Kanadě koupit auto",
      paras: [
        "Poškozená auta prodávají v Kanadě Copart Canada a IAA (dříve Impact Auto Auctions), nepoškozená obchodnické aukce jako ADESA a dealeři. Stejně jako v USA je mnoho aukcí přístupných jen přes licencovaného brokera.",
        "Oblíbený je i nákup od dealerů a soukromníků přes inzertní portály. Při soukromém nákupu musíte vývozní doklady a dopravu do přístavu zařídit sami, proto většina evropských kupujících využívá vývozní firmu, která auto vyzvedne, prověří doklady a odešle.",
        "K ceně připočtěte aukční nebo dealerské poplatky a – při nákupu u dealera – kanadské daně z prodeje (GST/HST/PST). Některé z nich lze vrátit nebo se neúčtují, když dealer prodává přímo na vývoz – zeptejte se před koupí.",
      ],
    },
    {
      id: "titles",
      title: "Doklady o vlastnictví a stav poškození",
      paras: [
        "Kanada nemá „title“ v americkém stylu – dokladem je registrace vydaná provincií (v Ontariu „ownership“). Stav poškození se zapisuje do provinčního registru:",
        [
          "Ontario a většina provincií: Normal, Salvage (totální škoda bez povolení k provozu), Rebuilt (opraveno a schváleno po kontrole) a Irreparable – pouze na díly.",
          "Québec: těžce havarovaná vozidla (VGA – véhicule gravement accidenté) označená „reconstruit“ (přestavěné) nebo „irrécupérable“ (neopravitelné).",
        ],
        "Auta označená irreparable nebo irrécupérable nekupujte k jízdě – nelze je legálně zaregistrovat. Ostatní stavy se do technického průkazu v EU nepřenášejí, ale ovlivňují cenu a ukazují, že auto mělo vážnou škodu.",
      ],
    },
    {
      id: "inspection",
      title: "Jak prověřit auto z Kanady",
      paras: [
        [
          "Historie podle VIN: zpráva CARFAX Canada ukáže škody, provinční registrace a nájezd; u aut, která přišla z USA, prověřte i americkou historii.",
          "Zástavy: v Kanadě může auto sloužit jako zástava úvěru. Ověřte v provinčním registru zástav (např. PPSA), že auto není zatížené – jinak může být vývoz zablokován a auto můžete i ztratit.",
          "Koroze: vyžádejte si fotky spodku, prahů, podběhů a brzdových trubek – silniční sůl si vybírá daň.",
          "Tržní verze: kanadská auta jsou obvykle velmi blízká americkým a potřebují podobné úpravy osvětlení.",
        ],
        "U aut z aukcí platí stejná pravidla jako v USA: fotky poškození, význam „Run and Drive“ a rezerva na skryté vady.",
      ],
    },
    {
      id: "shipping",
      title: "Vývoz a přeprava z Kanady",
      paras: [
        "Nejpoužívanějšími přístavy jsou Halifax a Montreal na východě a Vancouver na západě. Z východního pobřeží trvá plavba do přístavů v Severním moři obvykle asi 2 týdny – jedna z nejrychlejších tras do Evropy. Auta ze západních provincií často jedou na východ vlakem nebo vyplouvají z Vancouveru přes Panamský průplav, což trvá déle.",
        "K vývozu je potřeba doklad o vlastnictví (provinční registrace), doklad o koupi a vývozní prohlášení v systému CBSA (CERS), které obvykle podává vývozce nebo speditér. Auto nesmí být zatížené zástavou.",
        "Možnosti přepravy jsou stejné jako z USA: sdílený kontejner, exkluzivní kontejner nebo RoRo pro pojízdná auta. V zimě počítejte s možným zpožděním pozemní dopravy do přístavu.",
      ],
    },
    {
      id: "duty",
      title: "Clo a dohoda CETA",
      paras: [
        "Díky obchodní dohodě EU–Kanada (CETA) mohou auta vyrobená v Kanadě vstoupit do EU s clem 0 %. Podmínkou je kanadský původ potvrzený prohlášením o původu od vývozce. Koupit auto v Kanadě nestačí – mnoho aut prodávaných v Kanadě bylo vyrobeno v USA, Mexiku nebo Japonsku a platí plných 10 %.",
        "VIN začínající „2“ znamená, že auto bylo vyrobeno v Kanadě. Je to dobrá nápověda, ne však důkaz – při nákupu od soukromníka je často těžké získat prohlášení o původu a bez něj je clo 10 % celní hodnoty (CIF). Pick-upy zařazené jako nákladní vozidla platí 22 %.",
        "Ke clu se připočítává DPH při dovozu v zemi proclení a národní daně (spotřební nebo registrační) v zemi registrace. Firmy mohou využít režim 4200 a DPH odvést v cílové zemi.",
      ],
    },
    {
      id: "adaptation",
      title: "Úpravy pro EU a registrace",
      paras: [
        "Kanadská auta se registrují o něco snáz než americká: mají tachometr v km/h a tovární denní svícení. Obvykle je ale stále potřeba:",
        [
          "změnit zadní blinkry na oranžové, pokud blikají brzdová světla,",
          "doplnit zadní mlhové světlo,",
          "upravit světlomety na evropský tvar potkávacího světla.",
        ],
        "Registrace vyžaduje soudní překlady dokladů, doklad o proclení, potvrzení o národních daních a technickou kontrolu. Země jako Německo nebo Francie mohou požadovat individuální schválení.",
      ],
    },
    {
      id: "mistakes",
      title: "Nejčastější chyby při dovozu z Kanady",
      paras: [
        [
          "Předpoklad, že každé auto z Kanady má clo 0 % – platí to jen pro auta vyrobená v Kanadě s prohlášením o původu.",
          "Neověřit před koupí, zda na autě nevázne zástava.",
          "Ignorovat korozi spodku u aut z provincií s tuhými zimami.",
          "Koupit auto se stavem irreparable nebo irrécupérable.",
          "Podcenit pozemní dopravu ze západních provincií do východních přístavů.",
        ],
      ],
    },
  ],
  JAPAN: [
    {
      id: "market",
      title: "Japonský trh s auty – proč JDM",
      paras: [
        "Japonsko je známé auty ve velmi dobrém technickém stavu a s nízkým nájezdem. Důvodem je přísná kontrola shaken, která se s věkem auta prodražuje – mnoho Japonců proto prodává po několika letech a ceny starších aut rychle klesají.",
        "Většina dovozů z Japonska jsou auta JDM (Japanese Domestic Market) – sportovní legendy (Nissan Skyline GT-R, Toyota Supra, Mazda RX-7, Honda NSX), terénní auta (Toyota Land Cruiser), minivany a novější hybridy. Pro sběratele jsou klíčové modely, které se v Evropě nikdy oficiálně neprodávaly.",
        "Všechna auta z japonského trhu mají řízení vpravo. V EU je lze zaregistrovat, ale jízda vpravo je s nimi méně pohodlná a hůř se prodávají – s výjimkou vyhledávaných sběratelských modelů.",
      ],
    },
    {
      id: "auctions",
      title: "Aukce v Japonsku – USS a další",
      paras: [
        "Většina ojetých aut v Japonsku prochází obchodnickými aukcemi. Největší je síť USS, dále mimo jiné TAA, CAA, HAA, JU a Arai. Každý týden se nabízejí desítky tisíc aut.",
        "Zahraniční kupec nepřihazuje přímo – dělá to japonský vývozce (aukční agent): má přístup na aukce, přeloží aukční list, auto koupí, odhlásí ho k vývozu a odešle. K vydražené ceně se připočítává aukční poplatek, provize vývozce, vnitrostátní doprava do přístavu a vývozní doklady. Platí se obvykle v jenech.",
        "Koupit lze i ze skladu vývozce – může to být dražší, ale auto už je prověřené a často čeká v přístavu.",
      ],
    },
    {
      id: "titles",
      title: "Jak číst japonský aukční list",
      paras: [
        "Aukční list (auction sheet) je zpráva aukčního inspektora – nejdůležitější zdroj informací o autě. Obsahuje celkovou známku, známku interiéru a mapu poškození karoserie.",
        [
          "Celková známka: S nebo 6 – prakticky nové; 5 a 4,5 – velmi dobrý stav; 4 – dobrý s drobnými stopami používání; 3,5 a 3 – viditelné vady nebo vyšší nájezd; R nebo RA – opravená nehoda (RA – drobná oprava); 0 nebo *** – poškozené, zatopené nebo bez hodnocení.",
          "Známka interiéru: od A (jako nový) po E (silně opotřebený).",
          "Mapa poškození: A – škrábanec, U – promáčklina, B – promáčklina se škrábancem, W – zvlnění nebo stopy opravy, S a C – rez a koroze, P – stopy laku, X – díl k výměně, XX – vyměněný díl, Y – prasklina nebo díra. Číslo u písmene (1–3) udává velikost poškození.",
        ],
        "List ukazuje také nájezd ověřený aukcí, výbavu a poznámky inspektora v japonštině – dobrý vývozce je před přihazováním přeloží.",
      ],
    },
    {
      id: "inspection",
      title: "Na co si dát u japonských aut pozor",
      paras: [
        [
          "Nájezd: japonská auta mají obvykle skutečný, nízký nájezd, ale ověřte jeho historii v aukčním listu a ve vývozním certifikátu.",
          "Rez: auta ze severu (Hokkaidó) a z pobřežních oblastí mohou být zkorodovaná solí – prohlédněte si fotky spodku.",
          "Úpravy: sportovní auta mají často upravený podvozek, výfuk a motor, což může ztížit technickou kontrolu v EU.",
          "Omezovače rychlosti: mnoho aut JDM má tovární omezovač na 180 km/h.",
          "Elektronika: japonská rádia používají pásmo FM 76–90 MHz, navigace a menu jsou v japonštině a mýtná jednotka ETC je v Evropě k ničemu.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Vývoz a přeprava z Japonska",
      paras: [
        "Po koupi vývozce auto odhlásí a získá Export Certificate – doklad, který nahrazuje registraci, s údaji o autě a nájezdem. Je potřeba k proclení i registraci v EU, spolu s fakturou a konosamentem (B/L).",
        "Auta odplouvají hlavně z Jokohamy, Nagoje, Kóbe a Ósaky. Lodě RoRo do Evropy plují obvykle 5–7 týdnů (přes Suezský průplav nebo kolem Afriky), kontejnery zhruba stejně nebo o něco déle. Kontejner je dobrá volba pro cenná nebo nepojízdná auta.",
        "Nejčastějšími cílovými přístavy jsou Bremerhaven, Rotterdam, Antverpy a Zeebrugge. Pojištění zásilky se vyplatí – na dlouhé plavbě je riziko poškození vyšší.",
      ],
    },
    {
      id: "duty",
      title: "Clo a dohoda EU–Japonsko",
      paras: [
        "Dohoda o hospodářském partnerství EU–Japonsko (EPA) postupně zrušila clo na auta – od roku 2026 mohou auta japonského původu vstoupit do EU s clem 0 %. Původ se prokazuje prohlášením o původu od vývozce nebo znalostí dovozce (doklady, že auto bylo vyrobeno v Japonsku).",
        "Auta JDM vyrobená v Japonsku obvykle nárok mají. Pozor na japonské značky vyrobené jinde (např. v USA nebo Thajsku) – ty platí standardních 10 % celní hodnoty. Bez dokladu o původu je clo také 10 %.",
        "Auta starší 30 let v originálním stavu mohou být považována za sběratelská vozidla – pak je clo 0 % a některé země účtují sníženou DPH. Po proclení platí v zemi registrace národní daně podle motoru, emisí nebo hodnoty.",
      ],
    },
    {
      id: "adaptation",
      title: "Řízení vpravo – registrace v EU",
      paras: [
        "Auta s řízením vpravo lze v zemích EU registrovat, pokud splňují technické požadavky. Hlavní úpravy jsou:",
        [
          "světlomety s charakteristikou pro pravostranný provoz (seřízení nebo výměna skel),",
          "zadní mlhové světlo na správné straně a oranžové blinkry (japonská auta je obvykle už mají),",
          "tachometr v km/h – japonská auta ho mají z výroby.",
        ],
        "Některé země, např. Německo, vyžadují individuální schválení nebo znalecký posudek. K registraci jsou potřeba překlady vývozního certifikátu a faktury, doklad o proclení, potvrzení o národních daních a technická kontrola.",
      ],
    },
    {
      id: "mistakes",
      title: "Nejčastější chyby při dovozu z Japonska",
      paras: [
        [
          "Přihazovat bez přeloženého aukčního listu.",
          "Podcenit čas – od koupě po registraci často uplynou 2–3 měsíce.",
          "Počítat s clem 0 % u japonské značky vyrobené mimo Japonsko.",
          "Zapomenout na náklady na přestavbu světel a případné individuální schválení.",
          "Koupit silně upravené auto, které neprojde technickou kontrolou.",
          "Nemít pojištění na dlouhou plavbu.",
        ],
      ],
    },
  ],
  UAE: [
    {
      id: "market",
      title: "Trh s auty ve Spojených arabských emirátech",
      paras: [
        "Dubaj a ostatní emiráty patří k největším trhům s luxusními auty na světě. Silná poptávka po nových autech plní trh ojetin několikaletými SUV, sporťáky a prémiovými sedany – často levnějšími než v Evropě.",
        "Většina aut prodávaných v SAE jsou verze GCC (Rada pro spolupráci arabských států Zálivu), stavěné pro horko: silnější klimatizace a chlazení, někdy jiná výbava než v Evropě. Je tu také mnoho aut dovezených z USA – často poškozených – a dále prodávaných jako „import“.",
        "Nejčastěji se ze SAE dovážejí velká SUV (Nissan Patrol, Toyota Land Cruiser, Lexus LX), luxusní a sportovní auta. U aut s vyšším nájezdem myslete na vliv klimatu.",
      ],
    },
    {
      id: "auctions",
      title: "Kde v SAE koupit auto",
      paras: [
        "Auta se kupují u dealerů (včetně certifikovaných programů ojetých vozů značek), na aukcích jako Emirates Auction a Copart UAE a z inzerátů. Dubaj má také velký trh s ojetinami a mnoho vývozních firem, které obsluhují zahraniční kupce.",
        "Při nákupu ze zahraničí je nejbezpečnější cesta přes důvěryhodného vývozce: prověří auto i doklady, odhlásí ho, získá vývozní certifikát a auto odešle.",
      ],
    },
    {
      id: "titles",
      title: "Doklady: Mulkiya a vývozní certifikát",
      paras: [
        "Registračním dokladem v SAE je karta Mulkiya vydaná dopravním úřadem (v Dubaji RTA). K vývozu musí být auto odhlášeno a musí být vydán vývozní certifikát (často s vývozními značkami) – klíčový doklad pro proclení v EU.",
        "Auto nesmí mít nezaplacené pokuty ani bankovní zástavu. Mnoho aut se v SAE kupuje na úvěr – před koupí ověřte, že je úvěr splacen a banka auto uvolnila k vývozu.",
      ],
    },
    {
      id: "inspection",
      title: "Jak prověřit auto ze SAE",
      paras: [
        [
          "Původ: podle VIN ověřte, zda jde o verzi GCC, nebo o auto z USA. VIN začínající 1, 4 nebo 5 znamená auto vyrobené v USA – pak prověřte jeho americkou historii (škody, salvage title).",
          "Zatopení: po bouřích v roce 2024 se na trh dostalo mnoho zatopených aut. Hledejte stopy vody, bahno a korozi v kabině a elektronice.",
          "Škody od klimatu: vysoké teploty opotřebovávají gumová těsnění, plasty, baterie, pneumatiky a klimatizaci.",
          "Servisní historie: auta od dealerů mívají kompletní záznamy – velké plus při dalším prodeji.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Vývoz a přeprava ze SAE",
      paras: [
        "Hlavním přístavem je Džabal Alí v Dubaji. Plavba do evropských přístavů trvá obvykle 3–5 týdnů podle trasy (přes Rudé moře a Suezský průplav, nebo kolem Afriky) a cílového přístavu. Auta cestují v kontejnerech nebo na lodích RoRo.",
        "Proclení v EU vyžaduje vývozní certifikát, fakturu a konosament (B/L). U aut, která do SAE dříve přišla z USA, se hodí i doklady z americké historie.",
      ],
    },
    {
      id: "duty",
      title: "Clo při dovozu ze SAE",
      paras: [
        "EU nemá se SAE žádnou dohodu, která by snižovala clo na auta, takže auta z Emirátů platí standardních 10 % celní hodnoty (CIF) a pick-upy zařazené jako nákladní vozidla 22 %. Platí to i pro auta vyrobená v USA: clo 0 % na americká auta vyžaduje přepravu přímo z USA.",
        "Ke clu se připočítává DPH při dovozu v zemi proclení a národní daně v zemi registrace. Auta starší 30 let v originálním stavu mohou být považována za sběratelská vozidla s clem 0 %.",
      ],
    },
    {
      id: "adaptation",
      title: "Úpravy pro EU a registrace",
      paras: [
        "Auta ve verzi GCC mají řízení vlevo, tachometr v km/h a obvykle osvětlení blízké evropské specifikaci, takže úpravy bývají menší než u amerických aut. Přesto zkontrolujte blinkry, zadní mlhové světlo a světlomety.",
        "Auta dovezená do SAE z USA mají americkou specifikaci a potřebují stejné úpravy jako auta koupená přímo v Americe. Některé země EU vyžadují individuální schválení.",
      ],
    },
    {
      id: "mistakes",
      title: "Nejčastější chyby při dovozu ze SAE",
      paras: [
        [
          "Koupit americké auto prodávané jako „GCC“ bez prověření VIN a historie.",
          "Nesplacený úvěr nebo pokuty, které blokují vývoz.",
          "Přehlédnout známky zatopení a poškození horkem.",
          "Počítat s clem 0 % – auta ze SAE platí standardních 10 %.",
        ],
      ],
    },
  ],
  UK: [
    {
      id: "market",
      title: "Britský trh s auty po brexitu",
      paras: [
        "Spojené království je velký trh s ojetinami a obrovskou nabídkou prémiových, sportovních a klasických aut. Od brexitu je pro EU třetí zemí, takže dovoz vyžaduje proclení – díky Dohodě o obchodu a spolupráci EU–Spojené království (TCA) však auta splňující pravidla původu mohou vstoupit s clem 0 %.",
        "Všechna britská auta mají řízení vpravo. Proto se nejčastěji dovážejí auta, u kterých to nevadí nebo která jsou mimořádně výhodná: veterány, sběratelská auta, vzácné verze a prémiová auta. Oblíbený je i zpětný dovoz aut evropských značek, která dříve odešla do Británie.",
      ],
    },
    {
      id: "auctions",
      title: "Kde ve Spojeném království koupit auto",
      paras: [
        "Auta se kupují u dealerů, přes inzerci (např. Auto Trader) a na aukcích – obchodnických (BCA, Manheim) i s havarovanými auty (Copart UK). Mnoho aut má doloženou servisní historii.",
        "Na aukcích havarovaných aut mají auta kategorii poškození, které musíte před koupí rozumět.",
      ],
    },
    {
      id: "titles",
      title: "Kategorie poškození a V5C",
      paras: [
        "Registračním dokladem je V5C (logbook). Auta s totální škodou dostávají ve Spojeném království kategorii:",
        [
          "Cat S – strukturální poškození (např. podélníky, sloupky); auto lze opravit a vrátit na silnici.",
          "Cat N – nestrukturální poškození (např. elektronika, díly karoserie); auto lze opravit.",
          "Cat B – pouze na díly, skelet karoserie musí být zničen.",
          "Cat A – pouze do šrotu.",
        ],
        "Auta Cat A ani Cat B nekupujte k jízdě. Kategorie S a N znamenají vážnou škodu v minulosti – prověřte kvalitu opravy.",
      ],
    },
    {
      id: "inspection",
      title: "Jak prověřit auto ze Spojeného království",
      paras: [
        [
          "Historie MOT: na vládním webu gov.uk si zdarma podle registrační značky zjistíte všechny technické kontroly MOT – s nájezdem z každého roku a seznamem závad. Je to nejlepší způsob, jak odhalit stočený tachometr.",
          "Prověrka HPI (nebo podobná): ukáže nesplacené financování, krádež a zda bylo auto vedeno jako totální škoda.",
          "Servisní historie a počet majitelů z V5C.",
          "Nájezd v mílích – pro registraci v EU musí tachometr ukazovat i km/h.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Vývoz a doprava ze Spojeného království",
      paras: [
        "Většina aut přejíždí kanál La Manche trajektem nebo vlakem (Dover–Calais, Eurotunnel), na autotransportéru nebo po vlastní ose. Doprava obvykle trvá několik dní až týden. Auta ze Skotska nebo severní Anglie mohou plout i lodí RoRo do přístavů Beneluxu a Německa.",
        "Od brexitu jsou potřeba dvě celní prohlášení: vývozní ve Spojeném království a dovozní v EU – i když auto řídíte sami. Obvykle je vyřídí celní deklarant na terminálu. Provozovatel také oznámí DVLA trvalý vývoz příslušnou částí V5C.",
        "Jízda na britských značkách do země registrace vyžaduje platné pojištění a MOT – autotransportér bývá jednodušší.",
      ],
    },
    {
      id: "duty",
      title: "Clo, TCA a DPH",
      paras: [
        "Dohoda o obchodu a spolupráci EU–Spojené království (TCA) umožňuje clo 0 %, ale jen u aut splňujících pravidla původu – v praxi vyrobených ve Spojeném království nebo v EU. Původ se prokazuje prohlášením o původu od vývozce nebo znalostí dovozce. Japonské nebo americké auto koupené ve Spojeném království platí standardních 10 % celní hodnoty.",
        "DPH při dovozu v zemi proclení se platí bez ohledu na clo. Při nákupu u britského dealera se zeptejte, zda lze prodej na vývoz provést bez britské DPH – jinak zaplatíte DPH dvakrát.",
        "V zemi registrace platí národní daně podle motoru, emisí nebo hodnoty.",
      ],
    },
    {
      id: "adaptation",
      title: "Řízení vpravo a registrace v EU",
      paras: [
        "Britská auta byla stavěna podle evropských pravidel schvalování typu, takže mají často Certifikát shody (COC) a registrují se snáz než americká. Obvykle zbývá:",
        [
          "světlomety pro pravostranný provoz,",
          "zadní mlhové světlo na správné straně,",
          "tachometr se stupnicí v km/h.",
        ],
        "Registrace vyžaduje V5C (nebo doklad o vývozu), fakturu, soudní překlady, doklad o proclení, potvrzení o národních daních a technickou kontrolu.",
      ],
    },
    {
      id: "mistakes",
      title: "Nejčastější chyby při dovozu ze Spojeného království",
      paras: [
        [
          "Předpoklad, že po brexitu je všechno bez cla – 0 % platí jen pro auta splňující pravidla původu.",
          "Zaplatit britskou DPH i dovozní DPH v EU za stejné auto.",
          "Koupit auto Cat A nebo Cat B.",
          "Neprověřit historii MOT a zprávu HPI.",
          "Překročit hranici bez celních prohlášení, když auto řídíte sami.",
        ],
      ],
    },
  ],
};

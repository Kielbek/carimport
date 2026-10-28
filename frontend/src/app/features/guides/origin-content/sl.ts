import { OriginDeep } from './types';

export const ORIGIN_DEEP: OriginDeep = {
  USA: [
    {
      id: "market",
      title: "Ameriški avtomobilski trg – kaj se splača uvoziti",
      paras: [
        "Združene države so največji trg rabljenih avtomobilov na svetu: vsako leto lastnika zamenja okoli 40 milijonov vozil, več milijonov pa jih gre skozi dražbe zavarovalnic. Zato so številni modeli – zlasti poškodovani – opazno cenejši kot v Evropi, izbira različic pa je ogromna.",
        "Običajno se splača uvažati avtomobile, ki so v Evropi redki ali dragi: muscle car avtomobile z velikimi motorji V8 (Mustang, Camaro, Challenger), velike SUV-je in pick-upe, dobro opremljene premium različice in električne avtomobile, ki v ZDA hitro izgubljajo vrednost. Pri cenejših kompaktnih avtomobilih prihranek pogosto pojedo prevoz in davki.",
        "Ne pozabite, da je cena z dražbe šele začetek. Prištejejo se dražbene pristojbine, prevoz do pristanišča, pomorska prevoznina, zavarovanje, carina, DDV, nacionalni davki, prilagoditev za EU in morebitno popravilo. Šele skupni znesek pokaže, ali se uvoz splača – zato računajte pred licitiranjem, ne potem.",
      ],
    },
    {
      id: "auctions",
      title: "Dražbe Copart in IAAI – kako kupovati",
      paras: [
        "Copart in IAAI (Insurance Auto Auctions) prodajata predvsem avtomobile zavarovalnic, rent-a-car podjetij in bank – poškodovane, najdene po kraji, poplavljene ali preprosto izločene iz voznih parkov. Licitira se prek spleta, avtomobil pa stoji na enem od več sto parkirišč po vsej državi. Lokacija je pomembna: od nje sta odvisna cena in čas prevoza do pristanišča.",
        "Kupec iz Evrope običajno licitira prek posrednika (brokerja z dražbeno licenco), ker lahko številne avtomobile – zlasti s titlom salvage – kupijo le licencirani kupci. Posrednik zaračuna provizijo in pogosto uredi tudi prevoz in izvozne dokumente.",
        "K izklicni ceni se prištejejo dražbene pristojbine: pristojbina kupca, ki raste stopenjsko s ceno, pristojbina za spletno licitiranje, gate fee za odvoz s parkirišča, okoljska pristojbina in pristojbina za obdelavo titla. Pri avtomobilu za nekaj tisoč dolarjev to skupaj običajno znese od nekaj sto do več kot tisoč dolarjev.",
        "Plačilo zapade v kratkem roku – običajno v nekaj delovnih dneh – avtomobil pa je treba prevzeti s parkirišča, preden začnejo teči stroški hrambe. Zamuda pri plačilu pomeni kazen in blokiran račun, zato imejte denar za avtomobil in pristojbine pripravljen pred licitiranjem.",
      ],
    },
    {
      id: "titles",
      title: "Vrste titla: clean, salvage, rebuilt",
      paras: [
        "V ZDA se lastništvo dokazuje s titlom (title), ki ga izda zvezna država. Njegova vrsta pove zgodovino avtomobila in je pomembna pri nakupu in izvozu:",
        [
          "Clean – v zgodovini avtomobila ni totalne škode; najdražji, a najmanj tvegan.",
          "Salvage – zavarovalnica je razglasila totalno škodo (strošek popravila je presegel del vrednosti avtomobila). Najpogostejši title na Copartu in IAAI.",
          "Rebuilt / Reconstructed – nekdanja totalna škoda, ki je bila popravljena in v ZDA znova dovoljena v prometu.",
          "Non-repairable, Certificate of Destruction, Parts only, Junk – samo za dele. Ne kupujte jih za vožnjo: izvoz in registracija v EU sta lahko nemogoča ali zelo težavna.",
        ],
        "V Evropski uniji se oznake iz ameriškega titla ne prenesejo v prometno dovoljenje. Avtomobil s titlom salvage je mogoče registrirati, če po popravilu opravi tehnični pregled. Title kljub temu vpliva na ceno pri nadaljnji prodaji in predvsem kaže, da je imel avtomobil resno škodo – ki mora biti pravilno popravljena.",
      ],
    },
    {
      id: "inspection",
      title: "Kako preveriti avtomobil pred licitiranjem",
      paras: [
        "Na dražbi avtomobila ne morete videti osebno, zato šteje vsaka podrobnost v oglasu. Preden licitirate:",
        [
          "Preverite zgodovino po VIN (npr. Carfax, AutoCheck, baza NMVTIS): škode, prevožene kilometre, število lastnikov, krajo in poplavo.",
          "Preučite fotografije in opis poškodb (primary / secondary damage). „Front end“ lahko pomeni karkoli, od odbijača do zvitih vzdolžnih nosilcev in sproženih zračnih blazin.",
          "Pozorno berite oznake stanja: „Run and Drive“ pomeni, da je avtomobil ob prihodu na parkirišče vozil, ne pa, da je primeren za promet; „Engine Starts“ pomeni le, da je motor vžgal.",
          "Previdno z avtomobili z območij orkanov in poplav (Florida, Teksas, Louisiana). Sledi vode pod preprogo, blato in korodirani električni priključki so razlog za odstop.",
          "Prevoženi kilometri so v miljah (1 milja = 1,61 km) in so lahko označeni z „not actual“ ali „exempt“ – takrat števcu ni mogoče zaupati.",
        ],
        "Pametno je imeti rezervo za skrite poškodbe – do 20–30 % ocenjenega stroška popravila. Preden določite najvišjo ponudbo, pridobite ponudbo za dele iz Evrope ali ZDA.",
      ],
    },
    {
      id: "shipping",
      title: "Izvoz in pomorski prevoz",
      paras: [
        "Po nakupu avtotransporter odpelje avtomobil s parkirišča v izvozno pristanišče. Najpogostejša pristanišča so New Jersey/New York, Savannah (Georgia), Baltimore, Houston in Los Angeles/Long Beach. Z vzhodne obale plovba do pristanišč ob Severnem morju običajno traja 2–3 tedne, iz Kalifornije skozi Panamski prekop do 5–6 tednov.",
        "Za izvoz sta potrebna originalni title (ali overjena kopija) in račun. Izvoznik odda Electronic Export Information (EEI) v sistemu AES – obvezno za rabljena vozila ne glede na vrednost – avtomobil in dokumente pa je treba predložiti ameriški carini (CBP) najmanj 72 ur pred izplutjem ladje.",
        "Prevoz je možen na tri načine:",
        [
          "Skupni zabojnik (običajno 3–4 avtomobili v 40-čeveljskem zabojniku) – najbolj priljubljen, primeren za poškodovane in nevozne avtomobile.",
          "Lastni zabojnik – dražji, a avtomobil potuje sam in lahko dodate dele.",
          "RoRo (ladja roll-on/roll-off) – pogosto najcenejši, a le za vozne avtomobile in z manjšo zaščito pred poškodbami.",
        ],
        "Splača se zavarovanje tovora – običajno 1,5–2 % vrednosti avtomobila. V pristanišču EU zabojnik raztovorijo, carinski zastopnik pa avtomobil ocarini. Stroški raztovarjanja, terminala in agencije se plačajo v namembnem pristanišču.",
      ],
    },
    {
      id: "duty",
      title: "Carina, poreklo in carinjenje v EU",
      paras: [
        "Standardna carina EU za osebne avtomobile znaša 10 % carinske vrednosti. Carinska vrednost je cena avtomobila z dražbenimi pristojbinami ter prevozom in zavarovanjem do meje EU (vrednost CIF). Pick-upi so lahko razvrščeni kot tovorna vozila – takrat je carina 22 % – motorna kolesa pa plačajo 6–8 %.",
        "Od 1. julija 2026 do konca leta 2029 lahko avtomobili, izdelani v ZDA, vstopijo v EU s carino 0 % (Uredba (EU) 2026/1455). Pogoj: carini morate dokazati ameriško poreklo avtomobila, avtomobil pa mora biti poslan neposredno iz ZDA. Račun ali nalepka „Made in USA“ ne zadoščata – potreben je dokaz o poreklu. Namig da VIN: avtomobili, izdelani v ZDA, imajo VIN, ki se začne z 1, 4 ali 5. Pogoje lahko izpolni tudi japonska ali nemška znamka, sestavljena v Ameriki, BMW, izdelan v Evropi in kupljen v ZDA, pa ne.",
        "DDV pri uvozu se obračuna po stopnji države, v kateri se avtomobil ocarini. Osnova za DDV je carinska vrednost skupaj s carino in stroški prevoza do namembnega kraja v EU. Podjetja lahko uporabijo carinski postopek 4200: carinjenje v eni državi in obračun DDV v državi registracije.",
        "Po carinjenju sledijo nacionalni davki – odvisno od države trošarina (npr. 3,1 % ali 18,6 % na Poljskem glede na prostornino motorja), davek ob registraciji glede na CO₂, moč ali vrednost (v Sloveniji davek na motorna vozila), ali nič. Pogosto prav ti odločijo, ali se uvoz splača.",
      ],
    },
    {
      id: "adaptation",
      title: "Prilagoditev za EU in registracija",
      paras: [
        "Avtomobili za ameriški trg ne izpolnjujejo nekaterih evropskih tehničnih predpisov, zato pred tehničnim pregledom potrebujejo predelave:",
        [
          "Zadnji smerniki morajo biti oranžni – pri številnih ameriških avtomobilih utripajo rdeče zavorne luči.",
          "Obvezna je zadnja meglenka.",
          "Žarometi morajo imeti evropsko obliko kratkega svetlobnega snopa in biti pravilno nastavljeni.",
          "Merilnik hitrosti mora kazati km/h (običajno zadošča dvojna skala).",
          "Ameriški senzorji tlaka v pnevmatikah (TPMS) delujejo na 315 MHz – v Evropi je običajnih 433 MHz, kar je pomembno pri menjavi koles.",
        ],
        "Predelava luči običajno stane nekaj sto evrov. V nekaterih državah – npr. v Nemčiji ali Franciji – avtomobil iz tretje države pred registracijo potrebuje še posamično odobritev ali strokovno mnenje, kar zahteva čas in denar.",
        "Za registracijo pripravite sodno overjene prevode titla in računa, carinski dokument, potrdilo o plačilu nacionalnega davka in zapisnik o tehničnem pregledu. Številne države določajo zakonski rok za registracijo uvoženega avtomobila – na Poljskem na primer 30 dni.",
      ],
    },
    {
      id: "mistakes",
      title: "Najpogostejše napake pri uvozu iz ZDA",
      paras: [
        [
          "Licitiranje brez izračuna skupnega stroška – pristojbine, prevoz in davki lahko podvojijo ceno z dražbe.",
          "Nakup avtomobila s titlom „parts only“ ali potrdilom o uničenju, ki ga ni mogoče zakonito registrirati.",
          "Zaupanje v „Run and Drive“ brez preverjanja zgodovine po VIN.",
          "Brez rezerve za skrite poškodbe in dele – popravilo karamboliranega avtomobila skoraj vedno stane več, kot kažejo fotografije.",
          "Računanje na carino 0 % brez dokaza o ameriškem poreklu – brez njega plačate 10 %.",
          "Zamuda pri plačilu dražbe in nabiranje stroškov hrambe na parkirišču.",
          "Zamujen rok za registracijo ali obračun nacionalnega davka po prihodu avtomobila.",
        ],
      ],
    },
  ],
  CANADA: [
    {
      id: "market",
      title: "Kanadski avtomobilski trg – v čem se razlikuje od ZDA",
      paras: [
        "Kanada je manjši trg kot ZDA, a ponuja skoraj enako: iste znamke, modele in stopnje opreme, pogosto po nekoliko nižjih cenah kot v Evropi. Številni kupci jo vidijo kot alternativo ZDA, zlasti pri avtomobilih iz kanadskih tovarn, ki lahko izkoristijo sporazum CETA.",
        "Kanadski avtomobili imajo nekaj prednosti: števec v kilometrih, tovarniške dnevne luči in zimsko opremo (ogrevani sedeži, včasih grelnik bloka motorja). Slabost je lahko korozija – pozimi ceste močno solijo in podvozje avtomobila iz Ontaria ali Quebeca je lahko v slabšem stanju kot pri avtomobilu z juga ZDA.",
        "Iz Kanade se najpogosteje uvažajo SUV-ji in pick-upi, avtomobili, izdelani tam (npr. Toyota RAV4, Lexus RX, Honda CR-V in Civic, Chrysler Pacifica), ter avtomobili po izteku lizinga z malo prevoženimi kilometri.",
      ],
    },
    {
      id: "auctions",
      title: "Kje kupiti avtomobil v Kanadi",
      paras: [
        "Poškodovane avtomobile v Kanadi prodajata Copart Canada in IAA (nekdanji Impact Auto Auctions), nepoškodovane pa trgovske dražbe, kot je ADESA, in trgovci. Tako kot v ZDA so številne dražbe dostopne le prek licenciranega posrednika.",
        "Priljubljen je tudi nakup pri trgovcih in zasebnikih prek oglasnikov. Pri zasebnem nakupu morate izvozne dokumente in prevoz do pristanišča urediti sami, zato večina evropskih kupcev uporabi izvozno podjetje, ki prevzame avtomobil, preveri dokumente in ga odpošlje.",
        "K ceni prištejte dražbene ali trgovske pristojbine in – pri nakupu pri trgovcu – kanadske prometne davke (GST/HST/PST). Nekatere je mogoče vrniti ali se ne zaračunajo, ko trgovec prodaja neposredno za izvoz – vprašajte pred nakupom.",
      ],
    },
    {
      id: "titles",
      title: "Dokumenti o lastništvu in statusi poškodb",
      paras: [
        "Kanada nima „titla“ po ameriškem vzoru – dokument je registracija, ki jo izda provinca (v Ontariu „ownership“). Status poškodbe je vpisan v provincialni register:",
        [
          "Ontario in večina provinc: Normal, Salvage (totalna škoda, ni dovoljeno v prometu), Rebuilt (popravljeno in odobreno po pregledu) in Irreparable – samo za dele.",
          "Quebec: hudo poškodovana vozila (VGA – véhicule gravement accidenté) z oznako „reconstruit“ (obnovljeno) ali „irrécupérable“ (nepopravljivo).",
        ],
        "Avtomobilov z oznako irreparable ali irrécupérable ne kupujte za vožnjo – ni jih mogoče zakonito registrirati. Drugi statusi se ne prenesejo v prometno dovoljenje v EU, vendar vplivajo na vrednost in kažejo, da je imel avtomobil resno škodo.",
      ],
    },
    {
      id: "inspection",
      title: "Kako preveriti avtomobil iz Kanade",
      paras: [
        [
          "Zgodovina po VIN: poročilo CARFAX Canada pokaže škode, provincialne registracije in prevožene kilometre; pri avtomobilih, ki so prišli iz ZDA, preverite tudi ameriško zgodovino.",
          "Zastavne pravice: v Kanadi je avtomobil lahko zavarovanje za posojilo. V provincialnem registru zastavnih pravic (npr. PPSA) preverite, da avtomobil ni obremenjen – sicer je lahko izvoz blokiran, avtomobil pa lahko celo izgubite.",
          "Korozija: zahtevajte fotografije podvozja, pragov, kolesnih lokov in zavornih cevi – cestna sol pusti posledice.",
          "Tržna različica: kanadski avtomobili so običajno zelo podobni ameriškim in potrebujejo podobne predelave luči.",
        ],
        "Za avtomobile z dražb veljajo enaka pravila kot v ZDA: fotografije poškodb, pomen „Run and Drive“ in rezerva za skrite poškodbe.",
      ],
    },
    {
      id: "shipping",
      title: "Izvoz in prevoz iz Kanade",
      paras: [
        "Najbolj uporabljena pristanišča so Halifax in Montreal na vzhodu ter Vancouver na zahodu. Z vzhodne obale ladja do pristanišč ob Severnem morju običajno pluje okoli 2 tedna – ena najhitrejših poti v Evropo. Avtomobili iz zahodnih provinc pogosto potujejo na vzhod z vlakom ali izplujejo iz Vancouvra skozi Panamski prekop, kar traja dlje.",
        "Za izvoz so potrebni dokument o lastništvu (provincialna registracija), dokazilo o nakupu in izvozna deklaracija v sistemu CBSA (CERS), ki jo običajno odda izvoznik ali špediter. Avtomobil ne sme biti obremenjen z zastavno pravico.",
        "Možnosti prevoza so enake kot iz ZDA: skupni zabojnik, lastni zabojnik ali RoRo za vozne avtomobile. Pozimi računajte na morebitne zamude pri kopenskem prevozu do pristanišča.",
      ],
    },
    {
      id: "duty",
      title: "Carina in sporazum CETA",
      paras: [
        "Zaradi trgovinskega sporazuma EU–Kanada (CETA) lahko avtomobili, izdelani v Kanadi, vstopijo v EU s carino 0 %. Pogoj je kanadsko poreklo, potrjeno z izjavo o poreklu izvoznika. Nakup v Kanadi ne zadošča – številni avtomobili, ki se prodajajo tam, so bili izdelani v ZDA, Mehiki ali na Japonskem in plačajo polnih 10 %.",
        "VIN, ki se začne z „2“, pomeni, da je bil avtomobil izdelan v Kanadi. To je dober namig, ne pa dokaz – pri nakupu od zasebnika je pogosto težko dobiti izjavo o poreklu, brez nje pa carina znaša 10 % carinske vrednosti (CIF). Pick-upi, razvrščeni kot tovorna vozila, plačajo 22 %.",
        "Poleg carine se plačata DDV pri uvozu države carinjenja in nacionalni davki (trošarina ali davek ob registraciji) v državi registracije. Podjetja lahko uporabijo postopek 4200 in DDV obračunajo v namembni državi.",
      ],
    },
    {
      id: "adaptation",
      title: "Prilagoditev za EU in registracija",
      paras: [
        "Kanadske avtomobile je nekoliko lažje registrirati kot ameriške: imajo merilnik hitrosti v km/h in tovarniške dnevne luči. Običajno je vseeno treba:",
        [
          "zamenjati zadnje smernike z oranžnimi, če utripajo zavorne luči,",
          "dodati zadnjo meglenko,",
          "prilagoditi žaromete evropski obliki kratkega svetlobnega snopa.",
        ],
        "Registracija zahteva sodno overjene prevode dokumentov, carinski dokument, potrdilo o nacionalnih davkih in tehnični pregled. Države, kot sta Nemčija ali Francija, lahko zahtevajo posamično odobritev.",
      ],
    },
    {
      id: "mistakes",
      title: "Najpogostejše napake pri uvozu iz Kanade",
      paras: [
        [
          "Predpostavka, da vsak avtomobil iz Kanade plača 0 % carine – to velja le za avtomobile, izdelane v Kanadi, z izjavo o poreklu.",
          "Nepreverjena zastavna pravica pred nakupom.",
          "Prezrta korozija podvozja pri avtomobilih iz provinc z ostrimi zimami.",
          "Nakup avtomobila s statusom irreparable ali irrécupérable.",
          "Podcenjen kopenski prevoz iz zahodnih provinc do vzhodnih pristanišč.",
        ],
      ],
    },
  ],
  JAPAN: [
    {
      id: "market",
      title: "Japonski avtomobilski trg – zakaj JDM",
      paras: [
        "Japonska je znana po avtomobilih v zelo dobrem tehničnem stanju in z malo prevoženimi kilometri. Razlog je strogi tehnični pregled shaken, ki se s starostjo avtomobila draži – zato številni Japonci prodajo avtomobile po nekaj letih, cene starejših avtomobilov pa hitro padajo.",
        "Večina uvoza z Japonske so avtomobili JDM (Japanese Domestic Market) – športne legende (Nissan Skyline GT-R, Toyota Supra, Mazda RX-7, Honda NSX), terenci (Toyota Land Cruiser), enoprostorci in novejši hibridi. Za zbiratelje so ključni modeli, ki se v Evropi nikoli niso uradno prodajali.",
        "Vsi avtomobili z japonskega trga imajo volan na desni. V EU jih je mogoče registrirati, vendar je vožnja z njimi po desni strani manj udobna in jih je težje prodati – razen iskanih zbirateljskih modelov.",
      ],
    },
    {
      id: "auctions",
      title: "Dražbe na Japonskem – USS in druge",
      paras: [
        "Večina rabljenih avtomobilov na Japonskem gre skozi trgovske dražbe. Največja je mreža USS, poleg nje pa med drugim TAA, CAA, HAA, JU in Arai. Vsak teden ponudijo več deset tisoč avtomobilov.",
        "Tuji kupec ne licitira neposredno – to stori japonski izvoznik (dražbeni zastopnik): ima dostop do dražb, prevede dražbeni list, kupi avtomobil, ga odjavi za izvoz in odpošlje. K izklicni ceni se prištejejo dražbena pristojbina, provizija izvoznika, notranji prevoz do pristanišča in izvozni dokumenti. Plačilo je običajno v jenih.",
        "Kupite lahko tudi iz zaloge izvoznika – lahko je dražje, a avtomobil je že preverjen in pogosto čaka v pristanišču.",
      ],
    },
    {
      id: "titles",
      title: "Kako brati japonski dražbeni list",
      paras: [
        "Dražbeni list (auction sheet) je poročilo dražbenega inšpektorja – najpomembnejši vir informacij o avtomobilu. Vsebuje skupno oceno, oceno notranjosti in zemljevid poškodb karoserije.",
        [
          "Skupna ocena: S ali 6 – praktično nov; 5 in 4,5 – zelo dobro stanje; 4 – dobro, z manjšimi sledmi uporabe; 3,5 in 3 – vidne napake ali več prevoženih kilometrov; R ali RA – popravljena nesreča (RA – manjše popravilo); 0 ali *** – poškodovan, poplavljen ali neocenjen.",
          "Ocena notranjosti: od A (kot nova) do E (močno obrabljena).",
          "Zemljevid poškodb: A – praska, U – udrtina, B – udrtina s prasko, W – valovitost ali sledi popravila, S in C – rja in korozija, P – sledi barve, X – del za zamenjavo, XX – zamenjan del, Y – razpoka ali luknja. Številka ob črki (1–3) pove velikost poškodbe.",
        ],
        "List pokaže tudi prevožene kilometre, ki jih je preverila dražba, opremo in opombe inšpektorja v japonščini – dober izvoznik jih prevede pred licitiranjem.",
      ],
    },
    {
      id: "inspection",
      title: "Na kaj paziti pri japonskih avtomobilih",
      paras: [
        [
          "Prevoženi kilometri: japonski avtomobili imajo običajno resnično, nizko kilometrino, vendar preverite njeno zgodovino na dražbenem listu in v izvoznem certifikatu.",
          "Rja: avtomobili s severa (Hokaido) in obalnih območij so lahko načeti zaradi soli – oglejte si fotografije podvozja.",
          "Predelave: športni avtomobili imajo pogosto predelano podvozje, izpuh in motor, kar lahko oteži tehnični pregled v EU.",
          "Omejevalniki hitrosti: številni avtomobili JDM imajo tovarniški omejevalnik pri 180 km/h.",
          "Elektronika: japonski radijski sprejemniki uporabljajo pas FM 76–90 MHz, navigacija in meniji so v japonščini, naprava za cestnino ETC pa je v Evropi neuporabna.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Izvoz in prevoz z Japonske",
      paras: [
        "Po nakupu izvoznik avtomobil odjavi in pridobi Export Certificate – dokument, ki nadomešča registracijo, s podatki o avtomobilu in prevoženimi kilometri. Potreben je za carinjenje in registracijo v EU, skupaj z računom in nakladnico (B/L).",
        "Avtomobili odplujejo predvsem iz Jokohame, Nagoje, Kobeja in Osake. Ladje RoRo do Evrope običajno plujejo 5–7 tednov (skozi Sueški prekop ali okoli Afrike), zabojniki približno enako ali malo dlje. Zabojnik je dobra izbira za dragocene ali nevozne avtomobile.",
        "Najpogostejša namembna pristanišča so Bremerhaven, Rotterdam, Antwerpen in Zeebrugge. Zavarovanje tovora se splača – na dolgi plovbi je tveganje poškodb večje.",
      ],
    },
    {
      id: "duty",
      title: "Carina in sporazum EU–Japonska",
      paras: [
        "Sporazum o gospodarskem partnerstvu EU–Japonska (EPA) je postopno odpravil carino na avtomobile – od leta 2026 lahko avtomobili japonskega porekla vstopijo v EU s carino 0 %. Poreklo se dokazuje z izjavo o poreklu izvoznika ali z vednostjo uvoznika (dokumenti, da je bil avtomobil izdelan na Japonskem).",
        "Avtomobili JDM, izdelani na Japonskem, običajno izpolnjujejo pogoje. Previdno z japonskimi znamkami, izdelanimi drugje (npr. v ZDA ali na Tajskem) – te plačajo standardnih 10 % carinske vrednosti. Brez dokaza o poreklu je carina prav tako 10 %.",
        "Avtomobili, starejši od 30 let, v originalnem stanju lahko štejejo za zbirateljska vozila – takrat je carina 0 %, nekatere države pa uporabljajo znižani DDV. Po carinjenju se v državi registracije plačajo nacionalni davki glede na motor, emisije ali vrednost.",
      ],
    },
    {
      id: "adaptation",
      title: "Volan na desni – registracija v EU",
      paras: [
        "Avtomobile z volanom na desni je mogoče registrirati v državah EU, če izpolnjujejo tehnične zahteve. Glavne predelave so:",
        [
          "žarometi s svetlobnim snopom za desni promet (nastavitev ali zamenjava stekel),",
          "zadnja meglenka na pravi strani in oranžni smerniki (japonski avtomobili jih običajno že imajo),",
          "merilnik hitrosti v km/h – japonski avtomobili ga imajo tovarniško.",
        ],
        "Nekatere države, npr. Nemčija, zahtevajo posamično odobritev ali strokovno mnenje. Za registracijo so potrebni prevodi izvoznega certifikata in računa, carinski dokument, potrdilo o nacionalnih davkih in tehnični pregled.",
      ],
    },
    {
      id: "mistakes",
      title: "Najpogostejše napake pri uvozu z Japonske",
      paras: [
        [
          "Licitiranje brez prevedenega dražbenega lista.",
          "Podcenjen čas – od nakupa do registracije pogosto mineta 2–3 meseci.",
          "Računanje na carino 0 % za japonsko znamko, izdelano zunaj Japonske.",
          "Pozabljeni stroški predelave luči in morebitne posamične odobritve.",
          "Nakup močno predelanega avtomobila, ki ne bo opravil tehničnega pregleda.",
          "Brez zavarovanja za dolgo plovbo.",
        ],
      ],
    },
  ],
  UAE: [
    {
      id: "market",
      title: "Avtomobilski trg v Združenih arabskih emiratih",
      paras: [
        "Dubaj in drugi emirati so med največjimi trgi luksuznih avtomobilov na svetu. Veliko povpraševanje po novih avtomobilih polni trg rabljenih z nekaj let starimi SUV-ji, športnimi avtomobili in premium limuzinami – pogosto cenejšimi kot v Evropi.",
        "Večina avtomobilov, prodanih v ZAE, je različic GCC (Svet za sodelovanje v Zalivu), izdelanih za vročino: močnejša klimatska naprava in hlajenje, včasih drugačna oprema kot v Evropi. Veliko je tudi avtomobilov, pripeljanih iz ZDA – pogosto poškodovanih – in naprej prodanih kot „uvoz“.",
        "Iz ZAE se najpogosteje uvažajo veliki SUV-ji (Nissan Patrol, Toyota Land Cruiser, Lexus LX), luksuzni in športni avtomobili. Pri avtomobilih z več prevoženimi kilometri upoštevajte vpliv podnebja.",
      ],
    },
    {
      id: "auctions",
      title: "Kje kupiti avtomobil v ZAE",
      paras: [
        "Avtomobili se kupujejo pri trgovcih (vključno s certificiranimi programi rabljenih vozil znamk), na dražbah, kot sta Emirates Auction in Copart UAE, ter iz oglasov. Dubaj ima tudi velik trg rabljenih avtomobilov s številnimi izvoznimi podjetji, ki strežejo tujim kupcem.",
        "Pri nakupu iz tujine je najvarneje prek zaupanja vrednega izvoznika: preveri avtomobil in dokumente, ga odjavi, pridobi izvozni certifikat in avtomobil odpošlje.",
      ],
    },
    {
      id: "titles",
      title: "Dokumenti: Mulkiya in izvozni certifikat",
      paras: [
        "Registracijski dokument v ZAE je kartica Mulkiya, ki jo izda prometni organ (v Dubaju RTA). Za izvoz mora biti avtomobil odjavljen in pridobiti je treba izvozni certifikat (pogosto z izvoznimi tablicami) – ključni dokument za carinjenje v EU.",
        "Avtomobil ne sme imeti neplačanih kazni ali bančne zastavne pravice. Številni avtomobili v ZAE so kupljeni na kredit – pred nakupom preverite, da je posojilo odplačano in da je banka sprostila avtomobil za izvoz.",
      ],
    },
    {
      id: "inspection",
      title: "Kako preveriti avtomobil iz ZAE",
      paras: [
        [
          "Poreklo: po VIN preverite, ali je avtomobil različica GCC ali je prišel iz ZDA. VIN, ki se začne z 1, 4 ali 5, pomeni avtomobil, izdelan v ZDA – takrat preverite njegovo ameriško zgodovino (škode, title salvage).",
          "Poplava: po neurjih leta 2024 je na trg prišlo veliko poplavljenih avtomobilov. Iščite sledi vode, blata in korozije v kabini in elektroniki.",
          "Poškodbe zaradi podnebja: visoke temperature obrabijo gumijasta tesnila, plastiko, akumulatorje, pnevmatike in klimatsko napravo.",
          "Servisna zgodovina: avtomobili trgovcev imajo običajno popolne zapise – velika prednost pri nadaljnji prodaji.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Izvoz in prevoz iz ZAE",
      paras: [
        "Glavno pristanišče je Jebel Ali v Dubaju. Plovba do evropskih pristanišč običajno traja 3–5 tednov, odvisno od poti (skozi Rdeče morje in Sueški prekop ali okoli Afrike) in namembnega pristanišča. Avtomobili potujejo v zabojnikih ali na ladjah RoRo.",
        "Carinjenje v EU zahteva izvozni certifikat, račun in nakladnico (B/L). Pri avtomobilih, ki so v ZAE prej prišli iz ZDA, so koristni tudi dokumenti iz ameriške zgodovine.",
      ],
    },
    {
      id: "duty",
      title: "Carina pri uvozu iz ZAE",
      paras: [
        "EU nima z ZAE sporazuma, ki bi znižal carino na avtomobile, zato avtomobili iz Emiratov plačajo standardnih 10 % carinske vrednosti (CIF), pick-upi, razvrščeni kot tovorna vozila, pa 22 %. To velja tudi za avtomobile, izdelane v ZDA: carina 0 % za ameriške avtomobile zahteva neposreden prevoz iz ZDA.",
        "Poleg carine se plačata DDV pri uvozu države carinjenja in nacionalni davki v državi registracije. Avtomobili, starejši od 30 let, v originalnem stanju lahko štejejo za zbirateljska vozila s carino 0 %.",
      ],
    },
    {
      id: "adaptation",
      title: "Prilagoditev za EU in registracija",
      paras: [
        "Avtomobili v različici GCC imajo volan na levi, merilnik hitrosti v km/h in običajno razsvetljavo, blizu evropski specifikaciji, zato so predelave pogosto manjše kot pri ameriških avtomobilih. Vseeno preverite smernike, zadnjo meglenko in žaromete.",
        "Avtomobili, pripeljani v ZAE iz ZDA, imajo ameriško specifikacijo in potrebujejo enake predelave kot avtomobili, kupljeni neposredno v Ameriki. Nekatere države EU zahtevajo posamično odobritev.",
      ],
    },
    {
      id: "mistakes",
      title: "Najpogostejše napake pri uvozu iz ZAE",
      paras: [
        [
          "Nakup ameriškega avtomobila, ki se prodaja kot „GCC“, brez preverjanja VIN in zgodovine.",
          "Neodplačano posojilo ali kazni, ki blokirajo izvoz.",
          "Spregledani znaki poplave in poškodb zaradi vročine.",
          "Računanje na carino 0 % – avtomobili iz ZAE plačajo standardnih 10 %.",
        ],
      ],
    },
  ],
  UK: [
    {
      id: "market",
      title: "Britanski avtomobilski trg po brexitu",
      paras: [
        "Združeno kraljestvo je velik trg rabljenih avtomobilov z ogromno ponudbo premium, športnih in klasičnih avtomobilov. Od brexita je za EU tretja država, zato uvoz zahteva carinjenje – zaradi Sporazuma o trgovini in sodelovanju med EU in Združenim kraljestvom (TCA) pa lahko avtomobili, ki izpolnjujejo pravila o poreklu, vstopijo s carino 0 %.",
        "Vsi britanski avtomobili imajo volan na desni. Zato se najpogosteje uvažajo avtomobili, pri katerih to ni pomembno ali ki so izjemno ugodni: oldtimerji, zbirateljski avtomobili, redke različice in premium avtomobili. Priljubljeno je tudi vračanje avtomobilov evropskih znamk, ki so prej odšli v Britanijo.",
      ],
    },
    {
      id: "auctions",
      title: "Kje kupiti avtomobil v Združenem kraljestvu",
      paras: [
        "Avtomobili se kupujejo pri trgovcih, prek oglasnikov (npr. Auto Trader) in na dražbah – trgovskih (BCA, Manheim) in dražbah poškodovanih vozil (Copart UK). Številni avtomobili imajo dokumentirano servisno zgodovino.",
        "Na dražbah poškodovanih vozil imajo avtomobili kategorijo poškodbe, ki jo morate pred nakupom razumeti.",
      ],
    },
    {
      id: "titles",
      title: "Kategorije poškodb in V5C",
      paras: [
        "Registracijski dokument je V5C (logbook). Avtomobili s totalno škodo v Združenem kraljestvu dobijo kategorijo:",
        [
          "Cat S – strukturne poškodbe (npr. vzdolžni nosilci, stebrički); avtomobil je mogoče popraviti in vrniti na cesto.",
          "Cat N – nestrukturne poškodbe (npr. elektronika, deli karoserije); avtomobil je mogoče popraviti.",
          "Cat B – samo za dele, karoserijo je treba uničiti.",
          "Cat A – samo za razrez.",
        ],
        "Avtomobilov Cat A ali Cat B ne kupujte za vožnjo. Kategoriji S in N pomenita resno škodo v preteklosti – preverite kakovost popravila.",
      ],
    },
    {
      id: "inspection",
      title: "Kako preveriti avtomobil iz Združenega kraljestva",
      paras: [
        [
          "Zgodovina MOT: na vladni spletni strani gov.uk lahko po registrski številki brezplačno preverite vse tehnične preglede MOT – s prevoženimi kilometri za vsako leto in seznamom napak. To je najboljši način za odkrivanje previtega števca.",
          "Preverjanje HPI (ali podobno): pokaže neodplačano financiranje, krajo in ali je bil avtomobil evidentiran kot totalna škoda.",
          "Servisna zgodovina in število lastnikov iz V5C.",
          "Prevoženi kilometri v miljah – za registracijo v EU mora merilnik hitrosti kazati tudi km/h.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Izvoz in prevoz iz Združenega kraljestva",
      paras: [
        "Večina avtomobilov prečka Rokavski preliv s trajektom ali vlakom (Dover–Calais, Eurotunnel), na avtotransporterju ali v vožnji. Prevoz običajno traja od nekaj dni do enega tedna. Avtomobili iz Škotske ali severne Anglije lahko potujejo tudi z ladjo RoRo do pristanišč Beneluksa in Nemčije.",
        "Od brexita sta potrebni dve carinski deklaraciji: izvozna v Združenem kraljestvu in uvozna v EU – tudi če avtomobil vozite sami. Običajno ju uredi carinski zastopnik na terminalu. Imetnik vozila prav tako obvesti DVLA o trajnem izvozu z ustreznim delom V5C.",
        "Vožnja z britanskimi tablicami do države registracije zahteva veljavno zavarovanje in MOT – avtotransporter je pogosto preprostejši.",
      ],
    },
    {
      id: "duty",
      title: "Carina, TCA in DDV",
      paras: [
        "Sporazum o trgovini in sodelovanju med EU in Združenim kraljestvom (TCA) omogoča carino 0 %, vendar le za avtomobile, ki izpolnjujejo pravila o poreklu – v praksi izdelane v Združenem kraljestvu ali EU. Poreklo se dokazuje z izjavo o poreklu izvoznika ali z vednostjo uvoznika. Japonski ali ameriški avtomobil, kupljen v Združenem kraljestvu, plača standardnih 10 % carinske vrednosti.",
        "DDV pri uvozu države carinjenja je treba plačati ne glede na carino. Pri nakupu pri britanskem trgovcu vprašajte, ali je izvozno prodajo mogoče izvesti brez britanskega DDV – sicer boste DDV plačali dvakrat.",
        "V državi registracije se plačajo nacionalni davki glede na motor, emisije ali vrednost.",
      ],
    },
    {
      id: "adaptation",
      title: "Volan na desni in registracija v EU",
      paras: [
        "Britanski avtomobili so izdelani po evropskih pravilih homologacije, zato imajo pogosto Potrdilo o skladnosti (COC) in jih je lažje registrirati kot ameriške. Običajno ostanejo:",
        [
          "žarometi za desni promet,",
          "zadnja meglenka na pravi strani,",
          "merilnik hitrosti s skalo v km/h.",
        ],
        "Registracija zahteva V5C (ali dokazilo o izvozu), račun, sodno overjene prevode, carinski dokument, potrdilo o nacionalnih davkih in tehnični pregled.",
      ],
    },
    {
      id: "mistakes",
      title: "Najpogostejše napake pri uvozu iz Združenega kraljestva",
      paras: [
        [
          "Predpostavka, da je po brexitu vse brez carine – 0 % velja le za avtomobile, ki izpolnjujejo pravila o poreklu.",
          "Plačilo britanskega DDV in uvoznega DDV v EU za isti avtomobil.",
          "Nakup avtomobila Cat A ali Cat B.",
          "Nepreverjena zgodovina MOT in poročilo HPI.",
          "Prečkanje meje brez carinskih deklaracij, ko avtomobil vozite sami.",
        ],
      ],
    },
  ],
};

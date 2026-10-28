import { OriginDeep } from './types';

export const ORIGIN_DEEP: OriginDeep = {
  USA: [
    {
      id: "market",
      title: "Američko tržište automobila – što se isplati uvesti",
      paras: [
        "Sjedinjene Države najveće su tržište rabljenih automobila na svijetu: svake godine vlasnika promijeni oko 40 milijuna vozila, a nekoliko milijuna prođe kroz aukcije osiguravatelja. Zato su mnogi modeli – osobito oštećeni – osjetno jeftiniji nego u Europi, a izbor verzija je golem.",
        "Obično se isplati uvoziti automobile koji su u Europi rijetki ili skupi: muscle carove s velikim V8 motorima (Mustang, Camaro, Challenger), velike SUV-ove i pick-upove, dobro opremljene premium verzije i električne automobile, koji u SAD-u brzo gube vrijednost. Kod jeftinijih kompaktnih automobila uštedu često pojedu prijevoz i porezi.",
        "Zapamtite da je cijena s aukcije samo početak. Dodaju se aukcijske naknade, prijevoz do luke, pomorska vozarina, osiguranje, carina, PDV, nacionalni porezi, prilagodba za EU i eventualni popravak. Tek ukupan iznos pokazuje isplati li se uvoz – zato računajte prije licitiranja, a ne poslije.",
      ],
    },
    {
      id: "auctions",
      title: "Aukcije Copart i IAAI – kako kupiti",
      paras: [
        "Copart i IAAI (Insurance Auto Auctions) prodaju uglavnom automobile osiguravatelja, rent-a-car tvrtki i banaka – oštećene, pronađene nakon krađe, poplavljene ili jednostavno izbačene iz flota. Licitira se online, a automobil stoji na jednom od nekoliko stotina parkirališta diljem zemlje. Lokacija je važna: o njoj ovise cijena i trajanje prijevoza do luke.",
        "Kupac iz Europe obično licitira preko brokera (posrednika s aukcijskom licencom), jer mnoge automobile – osobito sa salvage titlom – smiju kupovati samo licencirani kupci. Broker naplaćuje proviziju i često organizira i prijevoz i izvozne dokumente.",
        "Na postignutu cijenu dodaju se aukcijske naknade: naknada kupca koja raste u stupnjevima s cijenom, naknada za online licitiranje, gate fee za izlazak s parkirališta, ekološka naknada i naknada za obradu titla. Za automobil od nekoliko tisuća dolara to je ukupno obično od nekoliko stotina do više od tisuću dolara.",
        "Plaćanje dospijeva u kratkom roku – obično nekoliko radnih dana – a automobil treba preuzeti s parkirališta prije nego što krenu naknade za skladištenje. Kašnjenje s plaćanjem znači kaznu i blokiran račun, zato imajte novac za automobil i naknade spreman prije licitiranja.",
      ],
    },
    {
      id: "titles",
      title: "Vrste titla: clean, salvage, rebuilt",
      paras: [
        "U SAD-u se vlasništvo dokazuje titlom (title) koji izdaje savezna država. Njegova vrsta govori o povijesti automobila i važna je pri kupnji i izvozu:",
        [
          "Clean – u povijesti automobila nema totalne štete; najskuplji, ali najmanje rizičan.",
          "Salvage – osiguravatelj je proglasio totalnu štetu (trošak popravka premašio je dio vrijednosti automobila). Najčešći title na Copartu i IAAI-ju.",
          "Rebuilt / Reconstructed – bivša totalna šteta koja je popravljena i ponovno puštena u promet u SAD-u.",
          "Non-repairable, Certificate of Destruction, Parts only, Junk – samo za dijelove. Ne kupujte ih za vožnju: izvoz i registracija u EU mogu biti nemogući ili vrlo teški.",
        ],
        "U Europskoj uniji oznake iz američkog titla ne prenose se u prometnu dozvolu. Automobil sa salvage titlom može se registrirati ako nakon popravka prođe tehnički pregled. Title ipak utječe na cijenu pri preprodaji i, prije svega, pokazuje da je automobil imao ozbiljnu štetu – koja mora biti propisno popravljena.",
      ],
    },
    {
      id: "inspection",
      title: "Kako provjeriti automobil prije licitiranja",
      paras: [
        "Na aukciji ne možete osobno vidjeti automobil, pa je svaki detalj u oglasu važan. Prije licitiranja:",
        [
          "Provjerite povijest prema VIN-u (npr. Carfax, AutoCheck, baza NMVTIS): štete, kilometražu, broj vlasnika, krađu i poplavu.",
          "Proučite fotografije i opis štete (primary / secondary damage). „Front end” može značiti bilo što, od branika do savijenih uzdužnih nosača i aktiviranih zračnih jastuka.",
          "Pažljivo čitajte oznake stanja: „Run and Drive” znači da je automobil vozio pri dolasku na parkiralište, a ne da je sposoban za promet; „Engine Starts” znači samo da je motor upalio.",
          "Oprezno s automobilima iz područja uragana i poplava (Florida, Teksas, Louisiana). Tragovi vode ispod tepiha, mulj i korodirani električni konektori razlog su za odustajanje.",
          "Kilometraža je u miljama (1 milja = 1,61 km) i može biti označena kao „not actual” ili „exempt” – tada se brojaču kilometara ne može vjerovati.",
        ],
        "Razumno je imati rezervu za skrivene štete – do 20–30% procijenjenog troška popravka. Zatražite ponudu za dijelove iz Europe ili SAD-a prije nego što odredite najvišu ponudu.",
      ],
    },
    {
      id: "shipping",
      title: "Izvoz i pomorski prijevoz",
      paras: [
        "Nakon kupnje autotransporter odveze automobil s parkirališta u izvoznu luku. Najčešće luke su New Jersey/New York, Savannah (Georgia), Baltimore, Houston i Los Angeles/Long Beach. S istočne obale plovidba do luka Sjevernog mora obično traje 2–3 tjedna, iz Kalifornije kroz Panamski kanal do 5–6 tjedana.",
        "Za izvoz su potrebni originalni title (ili ovjerena kopija) i račun. Izvoznik podnosi Electronic Export Information (EEI) u sustavu AES – obvezno za rabljena vozila bez obzira na vrijednost – a automobil i dokumenti moraju se predočiti američkoj carini (CBP) najmanje 72 sata prije isplovljavanja broda.",
        "Postoje tri načina prijevoza:",
        [
          "Zajednički kontejner (obično 3–4 automobila u kontejneru od 40 stopa) – najpopularniji, prikladan za oštećene i nevozne automobile.",
          "Zaseban kontejner – skuplji, ali automobil putuje sam i možete dodati dijelove.",
          "RoRo (brod roll-on/roll-off) – često najjeftiniji, ali samo za vozne automobile i uz manju zaštitu od oštećenja.",
        ],
        "Isplati se osiguranje tereta – obično 1,5–2% vrijednosti automobila. U luci EU-a kontejner se istovaruje, a carinski zastupnik carini automobil. Naknade za istovar, terminal i agenciju plaćaju se u odredišnoj luci.",
      ],
    },
    {
      id: "duty",
      title: "Carina, podrijetlo i carinjenje u EU",
      paras: [
        "Standardna carina EU-a na osobne automobile iznosi 10% carinske vrijednosti. Carinska vrijednost je cijena automobila s aukcijskim naknadama plus prijevoz i osiguranje do granice EU-a (vrijednost CIF). Pick-upovi se mogu razvrstati kao teretna vozila – tada je carina 22% – a motocikli plaćaju 6–8%.",
        "Od 1. srpnja 2026. do kraja 2029. automobili proizvedeni u SAD-u mogu ući u EU uz carinu od 0% (Uredba (EU) 2026/1455). Uvjet: carini morate dokazati američko podrijetlo automobila, a automobil mora biti poslan izravno iz SAD-a. Račun ili naljepnica „Made in USA” nisu dovoljni – potreban je dokaz o podrijetlu. VIN daje naznaku: automobili proizvedeni u SAD-u imaju VIN koji počinje s 1, 4 ili 5. I japanska ili njemačka marka sastavljena u Americi može ispuniti uvjete, ali BMW proizveden u Europi i kupljen u SAD-u ne može.",
        "PDV pri uvozu obračunava se po stopi države u kojoj se automobil carini. Osnovica PDV-a je carinska vrijednost plus carina i troškovi prijevoza do odredišta u EU. Tvrtke mogu koristiti carinski postupak 4200: carinjenje u jednoj državi i obračun PDV-a u državi registracije.",
        "Nakon carinjenja slijede nacionalni porezi – ovisno o državi trošarina (npr. 3,1% ili 18,6% u Poljskoj, ovisno o obujmu motora), porez pri registraciji prema CO₂, snazi ili vrijednosti (u Hrvatskoj poseban porez na motorna vozila), ili ništa. Često upravo oni odlučuju isplati li se uvoz.",
      ],
    },
    {
      id: "adaptation",
      title: "Prilagodba za EU i registracija",
      paras: [
        "Automobili za američko tržište ne ispunjavaju neke europske tehničke propise, pa im prije tehničkog pregleda trebaju preinake:",
        [
          "Stražnji pokazivači smjera moraju biti narančasti – kod mnogih američkih automobila trepere crvena stop-svjetla.",
          "Obvezno je stražnje svjetlo za maglu.",
          "Prednja svjetla moraju imati europski oblik kratkog svjetla i biti pravilno podešena.",
          "Brzinomjer mora pokazivati km/h (obično je dovoljna dvostruka skala).",
          "Američki senzori tlaka u gumama (TPMS) rade na 315 MHz – u Europi je uobičajeno 433 MHz, što je važno pri zamjeni kotača.",
        ],
        "Preinaka svjetala obično stoji nekoliko stotina eura. U nekim državama – npr. Njemačkoj ili Francuskoj – automobil izvan EU-a prije registracije treba i pojedinačno odobrenje ili stručno mišljenje, što traži vrijeme i novac.",
        "Za registraciju pripremite ovjerene prijevode titla i računa, carinski dokument, potvrdu o plaćenom nacionalnom porezu i zapisnik s tehničkog pregleda. Mnoge države propisuju zakonski rok za registraciju uvezenog automobila – u Poljskoj, primjerice, 30 dana.",
      ],
    },
    {
      id: "mistakes",
      title: "Najčešće pogreške pri uvozu iz SAD-a",
      paras: [
        [
          "Licitiranje bez izračuna ukupnog troška – naknade, prijevoz i porezi mogu udvostručiti cijenu s aukcije.",
          "Kupnja automobila s titlom „parts only” ili potvrdom o uništenju, koji se ne može zakonito registrirati.",
          "Povjerenje u „Run and Drive” bez provjere povijesti prema VIN-u.",
          "Nedostatak rezerve za skrivene štete i dijelove – popravak udarenog automobila gotovo uvijek stoji više nego što fotografije sugeriraju.",
          "Računanje na carinu od 0% bez dokaza o američkom podrijetlu – bez njega plaćate 10%.",
          "Kasno plaćanje aukcije i gomilanje naknada za skladištenje na parkiralištu.",
          "Propušten rok za registraciju ili prijavu nacionalnog poreza nakon dolaska automobila.",
        ],
      ],
    },
  ],
  CANADA: [
    {
      id: "market",
      title: "Kanadsko tržište automobila – po čemu se razlikuje od SAD-a",
      paras: [
        "Kanada je manje tržište od SAD-a, ali nudi gotovo isto: iste marke, modele i razine opreme, često po nešto nižim cijenama nego u Europi. Mnogi kupci je vide kao alternativu SAD-u, osobito za automobile iz kanadskih tvornica, koji mogu iskoristiti sporazum CETA.",
        "Kanadski automobili imaju nekoliko prednosti: brojač u kilometrima, tvorničko dnevno svjetlo i zimsku opremu (grijana sjedala, ponekad grijač bloka motora). Nedostatak može biti korozija – zimi se ceste obilno sole i podvozje automobila iz Ontarija ili Quebeca može izgledati lošije od automobila s juga SAD-a.",
        "Iz Kanade se najčešće uvoze SUV-ovi i pick-upovi, automobili proizvedeni ondje (npr. Toyota RAV4, Lexus RX, Honda CR-V i Civic, Chrysler Pacifica) te automobili nakon leasinga s malom kilometražom.",
      ],
    },
    {
      id: "auctions",
      title: "Gdje kupiti automobil u Kanadi",
      paras: [
        "Oštećene automobile u Kanadi prodaju Copart Canada i IAA (nekadašnji Impact Auto Auctions), a neoštećene trgovačke aukcije poput ADESA-e i trgovci. Kao i u SAD-u, mnoge su aukcije dostupne samo preko licenciranog brokera.",
        "Popularna je i kupnja od trgovaca i privatnih osoba preko oglasnika. Pri privatnoj kupnji izvozne dokumente i prijevoz do luke morate organizirati sami, pa većina europskih kupaca koristi izvoznu tvrtku koja preuzme automobil, provjeri dokumente i pošalje ga.",
        "Cijeni dodajte aukcijske ili trgovačke naknade i – pri kupnji od trgovca – kanadske poreze na promet (GST/HST/PST). Neki se mogu vratiti ili se ne naplaćuju kad trgovac prodaje izravno za izvoz – pitajte prije kupnje.",
      ],
    },
    {
      id: "titles",
      title: "Dokumenti o vlasništvu i statusi oštećenja",
      paras: [
        "Kanada nema „title” po američkom uzoru – dokument je registracija koju izdaje provincija (u Ontariju „ownership”). Status oštećenja upisuje se u provincijski registar:",
        [
          "Ontario i većina provincija: Normal, Salvage (totalna šteta, nije dopuštena u prometu), Rebuilt (popravljeno i odobreno nakon pregleda) i Irreparable – samo za dijelove.",
          "Quebec: teško oštećena vozila (VGA – véhicule gravement accidenté) s oznakom „reconstruit” (obnovljeno) ili „irrécupérable” (nepopravljivo).",
        ],
        "Ne kupujte za vožnju automobile s oznakom irreparable ili irrécupérable – ne mogu se zakonito registrirati. Ostali statusi ne prenose se u prometnu dozvolu u EU, ali utječu na vrijednost i pokazuju da je automobil imao ozbiljnu štetu.",
      ],
    },
    {
      id: "inspection",
      title: "Kako provjeriti automobil iz Kanade",
      paras: [
        [
          "Povijest prema VIN-u: izvještaj CARFAX Canada pokazuje štete, provincijske registracije i kilometražu; za automobile koji su stigli iz SAD-a provjerite i američku povijest.",
          "Založna prava: u Kanadi automobil može biti jamstvo za kredit. Provjerite u provincijskom registru založnih prava (npr. PPSA) da je automobil bez tereta – inače izvoz može biti blokiran, a automobil možete čak i izgubiti.",
          "Korozija: zatražite fotografije podvozja, pragova, blatobrana i kočionih cijevi – sol na cestama ostavlja trag.",
          "Tržišna verzija: kanadski automobili obično su vrlo slični američkima i trebaju slične preinake svjetala.",
        ],
        "Za automobile s aukcija vrijede ista pravila kao u SAD-u: fotografije oštećenja, značenje „Run and Drive” i rezerva za skrivene štete.",
      ],
    },
    {
      id: "shipping",
      title: "Izvoz i prijevoz iz Kanade",
      paras: [
        "Najkorištenije luke su Halifax i Montreal na istoku te Vancouver na zapadu. S istočne obale brod do luka Sjevernog mora plovi obično oko 2 tjedna – jedna od najbržih ruta prema Europi. Automobili iz zapadnih provincija često putuju na istok vlakom ili isplovljavaju iz Vancouvera kroz Panamski kanal, što traje dulje.",
        "Za izvoz su potrebni dokument o vlasništvu (provincijska registracija), dokaz o kupnji i izvozna deklaracija u sustavu CBSA (CERS), koju obično podnosi izvoznik ili špediter. Automobil mora biti bez založnog prava.",
        "Mogućnosti prijevoza iste su kao iz SAD-a: zajednički kontejner, zaseban kontejner ili RoRo za vozne automobile. Zimi računajte na moguća kašnjenja kopnenog prijevoza do luke.",
      ],
    },
    {
      id: "duty",
      title: "Carina i sporazum CETA",
      paras: [
        "Zahvaljujući trgovinskom sporazumu EU–Kanada (CETA) automobili proizvedeni u Kanadi mogu ući u EU uz carinu od 0%. Uvjet je kanadsko podrijetlo potvrđeno izjavom o podrijetlu izvoznika. Nije dovoljno kupiti automobil u Kanadi – mnogi automobili koji se ondje prodaju proizvedeni su u SAD-u, Meksiku ili Japanu i plaćaju punih 10%.",
        "VIN koji počinje s „2” znači da je automobil proizveden u Kanadi. To je dobra naznaka, ali ne i dokaz – pri kupnji od privatne osobe često je teško dobiti izjavu o podrijetlu, a bez nje carina iznosi 10% carinske vrijednosti (CIF). Pick-upovi razvrstani kao teretna vozila plaćaju 22%.",
        "Uz carinu se plaćaju PDV pri uvozu države carinjenja i nacionalni porezi (trošarina ili porez pri registraciji) u državi registracije. Tvrtke mogu koristiti postupak 4200 i obračunati PDV u odredišnoj državi.",
      ],
    },
    {
      id: "adaptation",
      title: "Prilagodba za EU i registracija",
      paras: [
        "Kanadski se automobili registriraju nešto lakše od američkih: imaju brzinomjer u km/h i tvorničko dnevno svjetlo. Obično je ipak potrebno:",
        [
          "zamijeniti stražnje pokazivače narančastima ako trepere stop-svjetla,",
          "dodati stražnje svjetlo za maglu,",
          "prilagoditi prednja svjetla europskom obliku kratkog svjetla.",
        ],
        "Registracija zahtijeva ovjerene prijevode dokumenata, carinski dokument, potvrdu o nacionalnim porezima i tehnički pregled. Države poput Njemačke ili Francuske mogu zahtijevati pojedinačno odobrenje.",
      ],
    },
    {
      id: "mistakes",
      title: "Najčešće pogreške pri uvozu iz Kanade",
      paras: [
        [
          "Pretpostavka da svaki automobil iz Kanade plaća 0% carine – to vrijedi samo za automobile proizvedene u Kanadi s izjavom o podrijetlu.",
          "Neprovjereno založno pravo prije kupnje.",
          "Zanemarivanje korozije podvozja kod automobila iz provincija s oštrim zimama.",
          "Kupnja automobila sa statusom irreparable ili irrécupérable.",
          "Podcjenjivanje kopnenog prijevoza iz zapadnih provincija do istočnih luka.",
        ],
      ],
    },
  ],
  JAPAN: [
    {
      id: "market",
      title: "Japansko tržište automobila – zašto JDM",
      paras: [
        "Japan je poznat po automobilima u vrlo dobrom tehničkom stanju i s malom kilometražom. Razlog je strogi tehnički pregled shaken, koji poskupljuje sa starošću automobila – zato mnogi Japanci prodaju automobile nakon nekoliko godina, a cijene starijih automobila brzo padaju.",
        "Većina uvoza iz Japana su JDM automobili (Japanese Domestic Market) – sportske legende (Nissan Skyline GT-R, Toyota Supra, Mazda RX-7, Honda NSX), terenci (Toyota Land Cruiser), monovolumeni i noviji hibridi. Kolekcionarima su ključni modeli koji se u Europi nikada nisu službeno prodavali.",
        "Svi automobili s japanskog tržišta imaju volan na desnoj strani. U EU se mogu registrirati, ali vožnja njima u desnom prometu manje je udobna i teže se preprodaju – osim traženih kolekcionarskih modela.",
      ],
    },
    {
      id: "auctions",
      title: "Aukcije u Japanu – USS i ostale",
      paras: [
        "Većina rabljenih automobila u Japanu prolazi kroz trgovačke aukcije. Najveća je mreža USS, a uz nju, među ostalima, TAA, CAA, HAA, JU i Arai. Svaki tjedan nudi se desetke tisuća automobila.",
        "Strani kupac ne licitira izravno – to radi japanski izvoznik (aukcijski agent): ima pristup aukcijama, prevodi aukcijski list, kupuje automobil, odjavljuje ga za izvoz i šalje. Na postignutu cijenu dodaju se aukcijska naknada, provizija izvoznika, unutarnji prijevoz do luke i izvozni dokumenti. Plaća se obično u jenima.",
        "Možete kupiti i iz zalihe izvoznika – može stajati više, ali automobil je već provjeren i često čeka u luci.",
      ],
    },
    {
      id: "titles",
      title: "Kako čitati japanski aukcijski list",
      paras: [
        "Aukcijski list (auction sheet) izvještaj je aukcijskog inspektora – najvažniji izvor informacija o automobilu. Sadrži ukupnu ocjenu, ocjenu unutrašnjosti i kartu oštećenja karoserije.",
        [
          "Ukupna ocjena: S ili 6 – praktički nov; 5 i 4,5 – vrlo dobro stanje; 4 – dobro, s malim tragovima korištenja; 3,5 i 3 – vidljivi nedostaci ili veća kilometraža; R ili RA – popravljena prometna nesreća (RA – manji popravak); 0 ili *** – oštećen, poplavljen ili neocijenjen.",
          "Ocjena unutrašnjosti: od A (kao nova) do E (jako istrošena).",
          "Karta oštećenja: A – ogrebotina, U – udubljenje, B – udubljenje s ogrebotinom, W – valovitost ili tragovi popravka, S i C – hrđa i korozija, P – tragovi boje, X – dio za zamjenu, XX – zamijenjen dio, Y – pukotina ili rupa. Broj uz slovo (1–3) pokazuje veličinu oštećenja.",
        ],
        "List pokazuje i kilometražu koju je provjerila aukcija, opremu te bilješke inspektora na japanskom – dobar izvoznik prevede ih prije licitiranja.",
      ],
    },
    {
      id: "inspection",
      title: "Na što paziti kod japanskih automobila",
      paras: [
        [
          "Kilometraža: japanski automobili obično imaju stvarnu, malu kilometražu, ali provjerite njezinu povijest u aukcijskom listu i izvoznom certifikatu.",
          "Hrđa: automobili sa sjevera (Hokkaido) i iz obalnih područja mogu biti nagriženi solju – pogledajte fotografije podvozja.",
          "Preinake: sportski automobili često imaju preinačen ovjes, ispuh i motor, što može otežati tehnički pregled u EU.",
          "Graničnici brzine: mnogi JDM automobili imaju tvornički graničnik na 180 km/h.",
          "Elektronika: japanski radiouređaji koriste FM pojas 76–90 MHz, navigacija i izbornici su na japanskom, a uređaj za cestarinu ETC u Europi je beskoristan.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Izvoz i prijevoz iz Japana",
      paras: [
        "Nakon kupnje izvoznik odjavljuje automobil i pribavlja Export Certificate – dokument koji zamjenjuje registraciju, s podacima o automobilu i kilometražom. Potreban je za carinjenje i registraciju u EU, zajedno s računom i teretnicom (B/L).",
        "Automobili isplovljavaju uglavnom iz Yokohame, Nagoye, Kobea i Osake. RoRo brodovi do Europe obično plove 5–7 tjedana (kroz Sueski kanal ili oko Afrike), kontejneri otprilike jednako ili nešto dulje. Kontejner je dobar izbor za vrijedne ili nevozne automobile.",
        "Najčešće odredišne luke su Bremerhaven, Rotterdam, Antwerpen i Zeebrugge. Osiguranje tereta se isplati – na dugoj plovidbi rizik od oštećenja je veći.",
      ],
    },
    {
      id: "duty",
      title: "Carina i sporazum EU–Japan",
      paras: [
        "Sporazum o gospodarskom partnerstvu EU–Japan (EPA) postupno je ukinuo carinu na automobile – od 2026. automobili japanskog podrijetla mogu ući u EU uz carinu od 0%. Podrijetlo se dokazuje izjavom o podrijetlu izvoznika ili saznanjima uvoznika (dokumentima da je automobil proizveden u Japanu).",
        "JDM automobili proizvedeni u Japanu obično ispunjavaju uvjete. Oprez s japanskim markama proizvedenima drugdje (npr. u SAD-u ili Tajlandu) – one plaćaju standardnih 10% carinske vrijednosti. Bez dokaza o podrijetlu carina je također 10%.",
        "Automobili stariji od 30 godina u originalnom stanju mogu se smatrati kolekcionarskim vozilima – tada je carina 0%, a neke države primjenjuju sniženi PDV. Nakon carinjenja u državi registracije plaćaju se nacionalni porezi prema motoru, emisijama ili vrijednosti.",
      ],
    },
    {
      id: "adaptation",
      title: "Volan na desnoj strani – registracija u EU",
      paras: [
        "Automobili s volanom na desnoj strani mogu se registrirati u državama EU-a ako ispunjavaju tehničke zahtjeve. Glavne preinake su:",
        [
          "prednja svjetla prilagođena desnom prometu (podešavanje ili zamjena stakala),",
          "stražnje svjetlo za maglu na pravoj strani i narančasti pokazivači smjera (japanski automobili ih obično već imaju),",
          "brzinomjer u km/h – japanski automobili imaju ga tvornički.",
        ],
        "Neke države, npr. Njemačka, zahtijevaju pojedinačno odobrenje ili stručno mišljenje. Za registraciju su potrebni prijevodi izvoznog certifikata i računa, carinski dokument, potvrda o nacionalnim porezima i tehnički pregled.",
      ],
    },
    {
      id: "mistakes",
      title: "Najčešće pogreške pri uvozu iz Japana",
      paras: [
        [
          "Licitiranje bez prevedenog aukcijskog lista.",
          "Podcjenjivanje vremena – od kupnje do registracije često prođu 2–3 mjeseca.",
          "Računanje na carinu od 0% za japansku marku proizvedenu izvan Japana.",
          "Zaboravljen trošak preinake svjetala i eventualnog pojedinačnog odobrenja.",
          "Kupnja jako preinačenog automobila koji neće proći tehnički pregled.",
          "Nedostatak osiguranja za dugu plovidbu.",
        ],
      ],
    },
  ],
  UAE: [
    {
      id: "market",
      title: "Tržište automobila u Ujedinjenim Arapskim Emiratima",
      paras: [
        "Dubai i ostali emirati među najvećim su tržištima luksuznih automobila na svijetu. Velika potražnja za novim automobilima puni tržište rabljenih automobila nekoliko godina starim SUV-ovima, sportskim automobilima i premium limuzinama – često jeftinijima nego u Europi.",
        "Većina automobila koji se prodaju u UAE-u su GCC verzije (Vijeće za suradnju zaljevskih zemalja), izrađene za vrućinu: jači klima-uređaj i hlađenje, ponekad drugačija oprema nego u Europi. Ima i mnogo automobila dovezenih iz SAD-a – često oštećenih – koji se preprodaju kao „uvoz”.",
        "Iz UAE-a se najčešće uvoze veliki SUV-ovi (Nissan Patrol, Toyota Land Cruiser, Lexus LX), luksuzni i sportski automobili. Kod automobila s većom kilometražom imajte na umu utjecaj klime.",
      ],
    },
    {
      id: "auctions",
      title: "Gdje kupiti automobil u UAE-u",
      paras: [
        "Automobili se kupuju od trgovaca (uključujući certificirane programe rabljenih vozila marki), na aukcijama poput Emirates Auctiona i Copart UAE te iz oglasa. Dubai ima i veliko tržište rabljenih automobila s mnogo izvoznih tvrtki koje opslužuju strane kupce.",
        "Pri kupnji iz inozemstva najsigurnije je preko pouzdanog izvoznika: on provjeri automobil i dokumente, odjavi ga, pribavi izvozni certifikat i pošalje automobil.",
      ],
    },
    {
      id: "titles",
      title: "Dokumenti: Mulkiya i izvozni certifikat",
      paras: [
        "Registracijski dokument u UAE-u je kartica Mulkiya koju izdaje prometna uprava (u Dubaiju RTA). Za izvoz automobil mora biti odjavljen i mora se pribaviti izvozni certifikat (često s izvoznim pločicama) – ključni dokument za carinjenje u EU.",
        "Automobil ne smije imati neplaćene kazne ni bankovno založno pravo. Mnogi se automobili u UAE-u kupuju na kredit – prije kupnje provjerite je li kredit otplaćen i je li banka oslobodila automobil za izvoz.",
      ],
    },
    {
      id: "inspection",
      title: "Kako provjeriti automobil iz UAE-a",
      paras: [
        [
          "Podrijetlo: prema VIN-u provjerite je li automobil GCC verzija ili je stigao iz SAD-a. VIN koji počinje s 1, 4 ili 5 znači automobil proizveden u SAD-u – tada provjerite njegovu američku povijest (štete, salvage title).",
          "Poplava: nakon oluja 2024. na tržište je stiglo mnogo poplavljenih automobila. Tražite tragove vode, mulja i korozije u kabini i elektronici.",
          "Štete od klime: visoke temperature troše gumene brtve, plastiku, akumulatore, gume i klima-uređaj.",
          "Servisna povijest: automobili od trgovaca obično imaju potpune zapise – veliki plus pri preprodaji.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Izvoz i prijevoz iz UAE-a",
      paras: [
        "Glavna luka je Jebel Ali u Dubaiju. Plovidba do europskih luka obično traje 3–5 tjedana, ovisno o ruti (kroz Crveno more i Sueski kanal ili oko Afrike) i odredišnoj luci. Automobili putuju u kontejnerima ili na RoRo brodovima.",
        "Carinjenje u EU zahtijeva izvozni certifikat, račun i teretnicu (B/L). Za automobile koji su ranije u UAE stigli iz SAD-a korisni su i dokumenti iz američke povijesti.",
      ],
    },
    {
      id: "duty",
      title: "Carina pri uvozu iz UAE-a",
      paras: [
        "EU nema s UAE-om sporazum koji bi smanjio carinu na automobile, pa automobili iz Emirata plaćaju standardnih 10% carinske vrijednosti (CIF), a pick-upovi razvrstani kao teretna vozila 22%. To vrijedi i za automobile proizvedene u SAD-u: carina od 0% za američke automobile zahtijeva izravan prijevoz iz SAD-a.",
        "Uz carinu se plaćaju PDV pri uvozu države carinjenja i nacionalni porezi u državi registracije. Automobili stariji od 30 godina u originalnom stanju mogu se smatrati kolekcionarskim vozilima, uz carinu od 0%.",
      ],
    },
    {
      id: "adaptation",
      title: "Prilagodba za EU i registracija",
      paras: [
        "Automobili u GCC verziji imaju volan na lijevoj strani, brzinomjer u km/h i obično rasvjetu blisku europskoj specifikaciji, pa su preinake često manje nego kod američkih automobila. Ipak provjerite pokazivače smjera, stražnje svjetlo za maglu i prednja svjetla.",
        "Automobili dovezeni u UAE iz SAD-a imaju američku specifikaciju i trebaju iste preinake kao automobili kupljeni izravno u Americi. Neke države EU-a zahtijevaju pojedinačno odobrenje.",
      ],
    },
    {
      id: "mistakes",
      title: "Najčešće pogreške pri uvozu iz UAE-a",
      paras: [
        [
          "Kupnja američkog automobila koji se prodaje kao „GCC” bez provjere VIN-a i povijesti.",
          "Neotplaćen kredit ili kazne koji blokiraju izvoz.",
          "Previđeni znakovi poplave i oštećenja od vrućine.",
          "Računanje na carinu od 0% – automobili iz UAE-a plaćaju standardnih 10%.",
        ],
      ],
    },
  ],
  UK: [
    {
      id: "market",
      title: "Britansko tržište automobila nakon Brexita",
      paras: [
        "Ujedinjena Kraljevina veliko je tržište rabljenih automobila s golemom ponudom premium, sportskih i klasičnih automobila. Od Brexita je za EU treća zemlja, pa uvoz zahtijeva carinjenje – ali zahvaljujući Sporazumu o trgovini i suradnji EU–UK (TCA) automobili koji ispunjavaju pravila o podrijetlu mogu ući uz carinu od 0%.",
        "Svi britanski automobili imaju volan na desnoj strani. Zato se najčešće uvoze automobili kod kojih to nije važno ili koji su iznimno povoljni: oldtimeri, kolekcionarski automobili, rijetke verzije i premium automobili. Popularan je i povratak automobila europskih marki koji su prije otišli u Britaniju.",
      ],
    },
    {
      id: "auctions",
      title: "Gdje kupiti automobil u Ujedinjenoj Kraljevini",
      paras: [
        "Automobili se kupuju od trgovaca, preko oglasnika (npr. Auto Trader) i na aukcijama – trgovačkim (BCA, Manheim) i aukcijama oštećenih vozila (Copart UK). Mnogi automobili imaju dokumentiranu servisnu povijest.",
        "Na aukcijama oštećenih vozila automobili imaju kategoriju oštećenja koju morate razumjeti prije kupnje.",
      ],
    },
    {
      id: "titles",
      title: "Kategorije oštećenja i V5C",
      paras: [
        "Registracijski dokument je V5C (logbook). Automobili s totalnom štetom u Ujedinjenoj Kraljevini dobivaju kategoriju:",
        [
          "Cat S – strukturna oštećenja (npr. uzdužni nosači, stupovi); automobil se može popraviti i vratiti na cestu.",
          "Cat N – nestrukturna oštećenja (npr. elektronika, dijelovi karoserije); automobil se može popraviti.",
          "Cat B – samo za dijelove, karoserija se mora uništiti.",
          "Cat A – samo za otpad.",
        ],
        "Ne kupujte automobile Cat A ili Cat B za vožnju. Kategorije S i N znače ozbiljnu štetu u prošlosti – provjerite kvalitetu popravka.",
      ],
    },
    {
      id: "inspection",
      title: "Kako provjeriti automobil iz Ujedinjene Kraljevine",
      paras: [
        [
          "Povijest MOT-a: na vladinoj stranici gov.uk prema registarskoj oznaci besplatno možete provjeriti sve tehničke preglede MOT – s kilometražom za svaku godinu i popisom nedostataka. To je najbolji način da otkrijete vraćenu kilometražu.",
          "Provjera HPI (ili slična): pokazuje neotplaćeno financiranje, krađu i je li automobil evidentiran kao totalna šteta.",
          "Servisna povijest i broj vlasnika iz V5C.",
          "Kilometraža u miljama – za registraciju u EU brzinomjer mora pokazivati i km/h.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Izvoz i prijevoz iz Ujedinjene Kraljevine",
      paras: [
        "Većina automobila prelazi La Manche trajektom ili vlakom (Dover–Calais, Eurotunnel), na autotransporteru ili u vožnji. Prijevoz obično traje od nekoliko dana do tjedan dana. Automobili iz Škotske ili sjeverne Engleske mogu ići i RoRo brodom do luka Beneluksa i Njemačke.",
        "Od Brexita su potrebne dvije carinske deklaracije: izvozna u Ujedinjenoj Kraljevini i uvozna u EU – čak i ako automobil vozite sami. Obično ih sređuje carinski zastupnik na terminalu. Korisnik vozila obavještava i DVLA o trajnom izvozu odgovarajućim dijelom V5C.",
        "Vožnja s britanskim tablicama do države registracije zahtijeva valjano osiguranje i MOT – autotransporter je često jednostavniji.",
      ],
    },
    {
      id: "duty",
      title: "Carina, TCA i PDV",
      paras: [
        "Sporazum o trgovini i suradnji EU–UK (TCA) omogućuje carinu od 0%, ali samo za automobile koji ispunjavaju pravila o podrijetlu – u praksi proizvedene u Ujedinjenoj Kraljevini ili EU. Podrijetlo se dokazuje izjavom o podrijetlu izvoznika ili saznanjima uvoznika. Japanski ili američki automobil kupljen u Ujedinjenoj Kraljevini plaća standardnih 10% carinske vrijednosti.",
        "PDV pri uvozu države carinjenja plaća se neovisno o carini. Pri kupnji od britanskog trgovca pitajte može li se izvozna prodaja obaviti bez britanskog PDV-a – inače ćete PDV platiti dvaput.",
        "U državi registracije plaćaju se nacionalni porezi prema motoru, emisijama ili vrijednosti.",
      ],
    },
    {
      id: "adaptation",
      title: "Volan na desnoj strani i registracija u EU",
      paras: [
        "Britanski automobili izrađeni su prema europskim pravilima homologacije, pa često imaju Potvrdu o sukladnosti (COC) i lakše se registriraju od američkih. Obično preostaje:",
        [
          "prednja svjetla za desni promet,",
          "stražnje svjetlo za maglu na pravoj strani,",
          "brzinomjer sa skalom u km/h.",
        ],
        "Registracija zahtijeva V5C (ili dokaz o izvozu), račun, ovjerene prijevode, carinski dokument, potvrdu o nacionalnim porezima i tehnički pregled.",
      ],
    },
    {
      id: "mistakes",
      title: "Najčešće pogreške pri uvozu iz Ujedinjene Kraljevine",
      paras: [
        [
          "Pretpostavka da je nakon Brexita sve bez carine – 0% vrijedi samo za automobile koji ispunjavaju pravila o podrijetlu.",
          "Plaćanje britanskog PDV-a i uvoznog PDV-a u EU za isti automobil.",
          "Kupnja automobila Cat A ili Cat B.",
          "Neprovjerena povijest MOT-a i izvještaj HPI.",
          "Prelazak granice bez carinskih deklaracija kad automobil vozite sami.",
        ],
      ],
    },
  ],
};

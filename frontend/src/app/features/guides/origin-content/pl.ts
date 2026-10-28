import { OriginDeep } from './types';

export const ORIGIN_DEEP: OriginDeep = {
  USA: [
    {
      id: 'market',
      title: 'Rynek aut w USA – co się opłaca sprowadzać',
      paras: [
        'Stany Zjednoczone to największy rynek aut używanych na świecie: co roku zmienia tam właściciela ok. 40 milionów pojazdów, a kilka milionów trafia na aukcje ubezpieczeniowe. Dlatego ceny wielu modeli – zwłaszcza po szkodzie – są wyraźnie niższe niż w Europie, a wybór wersji jest ogromny.',
        'Najczęściej opłaca się sprowadzać auta, których w Europie brakuje albo są drogie: muscle cars z dużymi silnikami V8 (Mustang, Camaro, Challenger), pełnowymiarowe SUV-y i pickupy, bogato wyposażone wersje aut premium oraz elektryki, które w USA szybko tracą na wartości. Przy tańszych autach kompaktowych zysk często zjada transport i podatki.',
        'Pamiętaj, że cena „z aukcji” to dopiero początek. Do kosztu auta dochodzą opłaty aukcyjne, transport do portu, fracht, ubezpieczenie, cło, VAT, podatki krajowe, dostosowanie do norm UE i ewentualna naprawa. Dopiero suma pokazuje, czy import się opłaca – dlatego warto ją policzyć przed licytacją, a nie po niej.',
      ],
    },
    {
      id: 'auctions',
      title: 'Aukcje Copart i IAAI – jak kupić auto',
      paras: [
        'Copart i IAAI (Insurance Auto Auctions) sprzedają głównie auta od ubezpieczycieli, wypożyczalni i banków – uszkodzone, po kradzieży, zalane albo po prostu wycofane z floty. Aukcje odbywają się online, a auto stoi na jednym z kilkuset placów w całym kraju. Lokalizacja ma znaczenie: od niej zależy koszt i czas dowozu do portu.',
        'Osoba z Europy zwykle licytuje przez brokera (pośrednika z licencją aukcyjną), bo wiele aut – zwłaszcza z tytułem salvage – mogą kupować tylko licencjonowani nabywcy. Broker pobiera własną prowizję, a często organizuje też transport i dokumenty eksportowe.',
        'Do wylicytowanej kwoty dochodzą opłaty aukcji: opłata kupującego zależna od ceny (rośnie progowo), opłata za licytację online, opłata wyjazdowa z placu (gate fee), opłata środowiskowa i za obsługę dokumentu własności. Przy aucie za kilka tysięcy dolarów to łącznie zwykle od kilkuset do ponad tysiąca dolarów.',
        'Płatność trzeba zrobić w krótkim terminie – zwykle kilku dni roboczych – a auto odebrać z placu, zanim zaczną się naliczać opłaty za postój. Spóźnienie z płatnością kończy się karą i zablokowaniem konta, więc pieniądze na zakup i opłaty warto mieć przygotowane przed licytacją.',
      ],
    },
    {
      id: 'titles',
      title: 'Tytuły własności: clean, salvage, rebuilt',
      paras: [
        'W USA dokumentem własności jest tytuł (title) wydawany przez stan. Jego rodzaj mówi o historii auta i ma znaczenie przy zakupie oraz eksporcie:',
        [
          'Clean – auto bez szkody całkowitej w historii; najdroższe, ale najmniej ryzykowne.',
          'Salvage – ubezpieczyciel uznał szkodę całkowitą (koszt naprawy przekroczył próg wartości auta). To najczęstszy tytuł na Copart i IAAI.',
          'Rebuilt / Reconstructed – auto po szkodzie całkowitej naprawione i dopuszczone ponownie do ruchu w USA.',
          'Non-repairable, Certificate of Destruction, Parts only, Junk – auto przeznaczone tylko na części. Takich aut nie kupuj do jazdy: eksport i rejestracja w UE bywają niemożliwe lub bardzo trudne.',
        ],
        'W Unii Europejskiej amerykańskie oznaczenia tytułu nie przenoszą się do dowodu rejestracyjnego. Auto z tytułem salvage można zarejestrować, jeśli po naprawie przejdzie badanie techniczne. Tytuł wpływa jednak na cenę odsprzedaży, a przede wszystkim mówi, że auto miało poważną szkodę – trzeba ją rzetelnie naprawić.',
      ],
    },
    {
      id: 'inspection',
      title: 'Jak sprawdzić auto przed licytacją',
      paras: [
        'Na aukcji nie obejrzysz auta osobiście, dlatego każda informacja z ogłoszenia jest na wagę złota. Zanim zalicytujesz:',
        [
          'Sprawdź historię po numerze VIN (np. Carfax, AutoCheck, baza NMVTIS): szkody, przebieg, liczbę właścicieli, kradzież i zalanie.',
          'Przeanalizuj zdjęcia i opis szkody (primary / secondary damage). Szkoda „front end” może oznaczać zarówno zderzak, jak i uszkodzone podłużnice i poduszki powietrzne.',
          'Zwróć uwagę na oznaczenia stanu: „Run and Drive” oznacza, że auto ruszyło przy odbiorze na plac, a nie że jest sprawne; „Engine Starts” – że silnik tylko odpalił.',
          'Uważaj na auta z rejonów po huraganach i powodziach (Floryda, Teksas, Luizjana). Ślady wody pod wykładziną, osad, korozja złączy elektrycznych to sygnał, by odpuścić.',
          'Przebieg w milach (1 mila = 1,61 km) bywa oznaczony jako „not actual” lub „exempt” – wtedy licznik nie jest wiarygodny.',
        ],
        'Rozsądnie jest przyjąć zapas na ukryte uszkodzenia – nawet 20–30% szacowanego kosztu naprawy. Zamów też wycenę części z Europy lub USA, zanim podasz maksymalną kwotę licytacji.',
      ],
    },
    {
      id: 'shipping',
      title: 'Eksport i transport morski',
      paras: [
        'Po zakupie laweta zawozi auto z placu do portu eksportowego. Najczęściej wybierane porty to New Jersey/Nowy Jork, Savannah (Georgia), Baltimore, Houston oraz Los Angeles i Long Beach. Ze wschodniego wybrzeża do portów Morza Północnego rejs trwa zwykle 2–3 tygodnie, z Kalifornii przez Kanał Panamski – nawet 5–6 tygodni.',
        'Do eksportu potrzebny jest oryginalny tytuł własności (lub jego uwierzytelniona kopia) i faktura. Eksporter składa elektroniczną deklarację eksportową EEI w systemie AES – przy autach używanych wymagana niezależnie od wartości – a auto i dokumenty muszą trafić do amerykańskiej służby celnej (CBP) co najmniej 72 godziny przed wypłynięciem statku.',
        'Do wyboru są trzy sposoby transportu:',
        [
          'Kontener dzielony (zwykle 3–4 auta w kontenerze 40-stopowym) – najpopularniejszy, dobry dla aut uszkodzonych i niejezdnych.',
          'Kontener na wyłączność – droższy, ale auto jest samo, można dołożyć części.',
          'RoRo (statek, na który auta wjeżdżają) – często najtańszy, ale tylko dla aut jezdnych i z mniejszą ochroną przed uszkodzeniami.',
        ],
        'Warto wykupić ubezpieczenie cargo – zwykle 1,5–2% wartości auta. Po przypłynięciu do portu w UE kontener jest rozładowywany, a agencja celna przeprowadza odprawę. Za rozładunek, terminal i agencję płaci się w porcie przeznaczenia.',
      ],
    },
    {
      id: 'duty',
      title: 'Cło, pochodzenie auta i odprawa w UE',
      paras: [
        'Standardowe cło na samochody osobowe importowane do UE wynosi 10% wartości celnej. Wartość celna to cena auta z opłatami aukcyjnymi plus koszt transportu i ubezpieczenia do granicy UE (tzw. wartość CIF). Pickupy mogą zostać sklasyfikowane jako samochody dostawcze – wtedy cło wynosi 22%, a motocykle 6–8%.',
        'Od 1 lipca 2026 r. do końca 2029 r. auta wyprodukowane w USA mogą wjechać do UE z cłem 0% (rozporządzenie UE 2026/1455). Warunek: trzeba udowodnić służbie celnej amerykańskie pochodzenie auta, a auto musi płynąć bezpośrednio z USA. Sama faktura czy napis „Made in USA” nie wystarczą – potrzebny jest dowód pochodzenia. Wskazówką jest VIN: auta zbudowane w USA mają numer zaczynający się od 1, 4 lub 5. Auto japońskiej czy niemieckiej marki złożone w Ameryce też może się kwalifikować, a europejskie BMW kupione w USA – już nie.',
        'Na cło nalicza się VAT importowy według stawki kraju, w którym odbywa się odprawa. Podstawą VAT jest wartość celna powiększona o cło i koszty transportu do miejsca przeznaczenia w UE. Firmy mogą skorzystać z procedury 4200: odprawić auto w jednym kraju, a VAT rozliczyć w kraju rejestracji.',
        'Po odprawie dochodzą podatki krajowe – zależnie od kraju akcyza (np. w Polsce 3,1% lub 18,6% zależnie od pojemności silnika), podatek rejestracyjny liczony od emisji CO₂, mocy lub wartości auta, albo nic. To one często decydują, czy import się opłaca.',
      ],
    },
    {
      id: 'adaptation',
      title: 'Dostosowanie do norm UE i rejestracja',
      paras: [
        'Auta z rynku amerykańskiego nie spełniają części europejskich wymogów technicznych, więc przed badaniem technicznym trzeba je przerobić:',
        [
          'Tylne kierunkowskazy muszą świecić na pomarańczowo – w wielu autach z USA migają czerwone światła stop.',
          'Wymagane jest tylne światło przeciwmgielne.',
          'Reflektory muszą mieć europejską charakterystykę świateł mijania i poprawne ustawienie.',
          'Prędkościomierz powinien pokazywać km/h (podwójna skala zwykle wystarcza).',
          'Czujniki ciśnienia w oponach (TPMS) w USA pracują na 315 MHz – w Europie popularne jest 433 MHz, co przy wymianie kół ma znaczenie.',
        ],
        'Przeróbka oświetlenia to zwykle koszt rzędu kilkuset euro. W niektórych krajach – np. w Niemczech czy we Francji – przed rejestracją auta spoza UE wymagana jest dodatkowo indywidualna homologacja lub opinia rzeczoznawcy, co bywa czasochłonne i kosztowne.',
        'Do rejestracji przygotuj tłumaczenia przysięgłe tytułu i faktury, dokument odprawy celnej, potwierdzenie zapłaty podatków krajowych i zaświadczenie z badania technicznego. W wielu krajach na zarejestrowanie sprowadzonego auta jest ustawowy termin – w Polsce 30 dni.',
      ],
    },
    {
      id: 'mistakes',
      title: 'Najczęstsze błędy przy imporcie z USA',
      paras: [
        [
          'Licytowanie bez policzenia pełnego kosztu – opłaty, transport i podatki potrafią podwoić cenę z aukcji.',
          'Kupno auta z tytułem „parts only” lub „certificate of destruction”, którego nie da się legalnie zarejestrować.',
          'Ufanie oznaczeniu „Run and Drive” bez sprawdzenia historii VIN.',
          'Brak zapasu na ukryte szkody i części – naprawa aut po wypadku prawie zawsze kosztuje więcej niż na zdjęciach.',
          'Założenie cła 0% bez dowodu amerykańskiego pochodzenia auta – bez niego zapłacisz 10%.',
          'Zbyt późna płatność na aukcji i opłaty za postój na placu.',
          'Przekroczenie terminu na rejestrację lub deklarację podatku krajowego po sprowadzeniu auta.',
        ],
      ],
    },
  ],
  CANADA: [
    {
      id: 'market',
      title: 'Rynek aut w Kanadzie – czym się różni od USA',
      paras: [
        'Kanada to mniejszy rynek niż USA, ale z podobną ofertą: te same marki, modele i wersje wyposażenia, często w nieco niższych cenach niż w Europie. Wiele osób traktuje ją jako alternatywę dla USA, zwłaszcza przy autach z kanadyjskich fabryk, które mogą skorzystać z umowy CETA.',
        'Auta kanadyjskie mają kilka zalet: licznik w kilometrach, światła do jazdy dziennej montowane fabrycznie i wyposażenie przygotowane na zimę (podgrzewane fotele, czasem grzałka silnika). Wadą bywa korozja – zimą drogi są intensywnie solone, a podwozie auta z Ontario czy Quebecu potrafi wyglądać gorzej niż auta z południa USA.',
        'Najczęściej sprowadza się z Kanady SUV-y i pickupy, auta produkowane na miejscu (np. Toyota RAV4, Lexus RX, Honda CR-V i Civic, Chrysler Pacifica) oraz auta poleasingowe z małym przebiegiem.',
      ],
    },
    {
      id: 'auctions',
      title: 'Gdzie kupić auto w Kanadzie',
      paras: [
        'Auta po szkodach sprzedają w Kanadzie Copart Canada i IAA (dawniej Impact Auto Auctions), a auta bez szkód – aukcje dealerskie, np. ADESA, oraz dealerzy. Podobnie jak w USA, na wiele aukcji wejdziesz tylko przez brokera z licencją.',
        'Popularne są też zakupy od dealerów i osób prywatnych przez portale ogłoszeniowe. Przy zakupie prywatnym musisz sam zadbać o dokumenty eksportowe i transport do portu, dlatego większość kupujących z Europy korzysta z firmy eksportowej, która odbiera auto, sprawdza dokumenty i nadaje je w porcie.',
        'Do ceny auta doliczysz opłaty aukcji lub dealera i – przy zakupie u dealera – kanadyjskie podatki sprzedażowe (GST/HST/PST). Przy eksporcie część z nich można odzyskać lub nie naliczać, jeśli dealer sprzedaje bezpośrednio na eksport – zapytaj o to przed zakupem.',
      ],
    },
    {
      id: 'titles',
      title: 'Dokumenty własności i statusy szkód',
      paras: [
        'W Kanadzie nie ma amerykańskiego „title” – dokumentem jest rejestracja wydawana przez prowincję (w Ontario tzw. ownership). Status szkody zapisuje się w rejestrze prowincji:',
        [
          'Ontario i większość prowincji: Normal, Salvage (auto po szkodzie całkowitej, niedopuszczone do ruchu), Rebuilt (naprawione i dopuszczone po kontroli) oraz Irreparable – tylko na części.',
          'Quebec: auta poważnie uszkodzone (VGA – véhicule gravement accidenté) z oznaczeniem „reconstruit” (naprawione) lub „irrécupérable” (nienaprawialne).',
        ],
        'Aut oznaczonych jako irreparable lub irrécupérable nie kupuj do jazdy – nie da się ich legalnie zarejestrować. Pozostałe statusy nie przenoszą się do dowodu rejestracyjnego w UE, ale wpływają na wartość i świadczą o poważnej szkodzie.',
      ],
    },
    {
      id: 'inspection',
      title: 'Jak sprawdzić auto z Kanady',
      paras: [
        [
          'Historia po VIN: raport CARFAX Canada pokazuje szkody, rejestracje w prowincjach i przebieg; dla aut, które przyjechały z USA, sprawdź też historię amerykańską.',
          'Zastaw (lien): w Kanadzie auto może być zabezpieczeniem kredytu. Sprawdź w rejestrze zastawów prowincji (np. PPSA), czy auto jest wolne od obciążeń – inaczej możesz mieć problem z eksportem, a nawet stracić auto.',
          'Korozja: poproś o zdjęcia podwozia, progów, nadkoli i przewodów hamulcowych – sól drogowa robi swoje.',
          'Wersja z rynku: auta kanadyjskie są zwykle bardzo zbliżone do amerykańskich, więc wymagają podobnych przeróbek oświetlenia.',
        ],
        'Przy autach z aukcji obowiązują te same zasady co w USA: zdjęcia szkód, opis „Run and Drive” i zapas na ukryte uszkodzenia.',
      ],
    },
    {
      id: 'shipping',
      title: 'Eksport i transport morski z Kanady',
      paras: [
        'Najczęściej wykorzystywane porty to Halifax i Montreal na wschodzie oraz Vancouver na zachodzie. Ze wschodniego wybrzeża do portów Morza Północnego statek płynie zwykle ok. 2 tygodni – to jedna z najszybszych tras do Europy. Auta z zachodu kraju często jadą koleją na wschód albo płyną z Vancouver przez Kanał Panamski, co trwa dłużej.',
        'Eksport wymaga dokumentu własności (rejestracji prowincji), dowodu zakupu i zgłoszenia eksportowego w systemie celnym CBSA (CERS), które zwykle składa eksporter lub spedytor. Auto musi być wolne od zastawu.',
        'Sposoby transportu są takie jak z USA: kontener dzielony, kontener na wyłączność albo RoRo dla aut jezdnych. Zimą liczy się z możliwymi opóźnieniami w transporcie lądowym do portu.',
      ],
    },
    {
      id: 'duty',
      title: 'Cło i umowa CETA',
      paras: [
        'Dzięki umowie handlowej UE–Kanada (CETA) auta wyprodukowane w Kanadzie mogą wjechać do UE z cłem 0%. Warunkiem jest kanadyjskie pochodzenie auta potwierdzone deklaracją pochodzenia od eksportera. Sam zakup w Kanadzie nie wystarczy – wiele aut sprzedawanych w Kanadzie powstało w USA, Meksyku czy Japonii i płaci pełne 10%.',
        'Pierwszy znak numeru VIN „2” oznacza auto zbudowane w Kanadzie. To dobra wskazówka, ale nie dowód – przy zakupie od osoby prywatnej często trudno uzyskać deklarację pochodzenia, a bez niej cło wynosi 10% wartości celnej (CIF). Pickupy sklasyfikowane jako dostawcze płacą 22%.',
        'Na cło nalicza się VAT importowy kraju odprawy, a w kraju rejestracji – podatki krajowe (akcyza lub podatek rejestracyjny). Firmy mogą skorzystać z procedury 4200 i rozliczyć VAT w kraju przeznaczenia.',
      ],
    },
    {
      id: 'adaptation',
      title: 'Dostosowanie do norm UE i rejestracja',
      paras: [
        'Auta kanadyjskie są nieco łatwiejsze do zarejestrowania niż amerykańskie: mają licznik w km/h i fabryczne światła do jazdy dziennej. Nadal jednak zwykle trzeba:',
        [
          'zmienić tylne kierunkowskazy na pomarańczowe, jeśli migają światła stop,',
          'dodać tylne światło przeciwmgielne,',
          'dostosować reflektory do europejskiej charakterystyki świateł mijania.',
        ],
        'Do rejestracji potrzebne są tłumaczenia przysięgłe dokumentów, dokument odprawy celnej, potwierdzenie podatków krajowych i badanie techniczne. W krajach takich jak Niemcy czy Francja może być wymagana indywidualna homologacja.',
      ],
    },
    {
      id: 'mistakes',
      title: 'Najczęstsze błędy przy imporcie z Kanady',
      paras: [
        [
          'Założenie, że każde auto z Kanady ma cło 0% – dotyczy to tylko aut wyprodukowanych w Kanadzie z deklaracją pochodzenia.',
          'Niesprawdzenie zastawu (lien) przed zakupem.',
          'Pominięcie korozji podwozia przy autach z prowincji z ostrą zimą.',
          'Kupno auta ze statusem irreparable lub irrécupérable.',
          'Niedoszacowanie transportu lądowego z zachodnich prowincji do portów na wschodzie.',
        ],
      ],
    },
  ],
  JAPAN: [
    {
      id: 'market',
      title: 'Rynek aut w Japonii – dlaczego JDM',
      paras: [
        'Japonia słynie z aut w bardzo dobrym stanie technicznym i z niskim przebiegiem. Powód to surowy przegląd shaken, który z wiekiem auta staje się coraz droższy – dlatego wielu Japończyków sprzedaje auta po kilku latach, a ceny starszych egzemplarzy szybko spadają.',
        'Z Japonii sprowadza się przede wszystkim auta JDM (Japanese Domestic Market) – sportowe legendy (Nissan Skyline GT-R, Toyota Supra, Mazda RX-7, Honda NSX), terenówki (Toyota Land Cruiser), minivany i nowsze hybrydy. Dla kolekcjonerów najważniejsze są modele, których nigdy oficjalnie nie sprzedawano w Europie.',
        'Wszystkie auta z rynku japońskiego mają kierownicę po prawej stronie. W UE można je zarejestrować, ale jazda „angolem” jest mniej wygodna, a takie auta bywają trudniejsze do odsprzedaży – wyjątkiem są poszukiwane modele kolekcjonerskie.',
      ],
    },
    {
      id: 'auctions',
      title: 'Aukcje w Japonii – USS i inne',
      paras: [
        'Większość aut używanych w Japonii trafia na aukcje dealerskie. Największa jest sieć USS, obok niej działają m.in. TAA, CAA, HAA, JU i Arai. Co tydzień wystawia się na nich dziesiątki tysięcy aut.',
        'Osoba z zagranicy nie licytuje sama – robi to japoński eksporter (agent aukcyjny), który ma dostęp do aukcji, tłumaczy arkusz aukcyjny, kupuje auto, rejestruje wywóz i nadaje je w porcie. Do ceny młotkowej dochodzą opłata aukcji, prowizja eksportera, transport w Japonii do portu i dokumenty eksportowe. Płaci się zwykle w jenach.',
        'Można też kupić auto z gotowej oferty eksportera (stock) – bywa drożej, ale auto jest już sprawdzone i często stoi w porcie.',
      ],
    },
    {
      id: 'titles',
      title: 'Arkusz aukcyjny – jak go czytać',
      paras: [
        'Arkusz aukcyjny (auction sheet) to raport inspektora aukcji – najważniejsze źródło wiedzy o aucie. Zawiera ocenę ogólną, ocenę wnętrza i mapę uszkodzeń nadwozia.',
        [
          'Ocena ogólna: S lub 6 – auto praktycznie nowe; 5 i 4,5 – bardzo dobry stan; 4 – dobry stan z drobnymi śladami użytkowania; 3,5 i 3 – widoczne usterki lub większy przebieg; R lub RA – auto po naprawie powypadkowej (RA – drobna naprawa); 0 lub *** – auto uszkodzone, zalane lub bez oceny.',
          'Ocena wnętrza: od A (jak nowe) do E (mocno zużyte).',
          'Mapa uszkodzeń: A – rysa, U – wgniecenie, B – wgniecenie z rysą, W – fala lub ślad naprawy lakierniczej, S i C – rdza i korozja, P – ślady lakieru, X – element do wymiany, XX – element wymieniony, Y – pęknięcie lub dziura. Cyfra obok litery (1–3) oznacza wielkość uszkodzenia.',
        ],
        'Arkusz pokazuje też przebieg zweryfikowany przez aukcję, wyposażenie i uwagi inspektora pisane po japońsku – dobry eksporter przetłumaczy je przed licytacją.',
      ],
    },
    {
      id: 'inspection',
      title: 'Na co uważać przy autach z Japonii',
      paras: [
        [
          'Przebieg: auta z Japonii mają zwykle prawdziwy i niski przebieg, ale sprawdź jego historię z arkusza i z certyfikatu eksportowego.',
          'Rdza: auta z północy (Hokkaido) i z wybrzeża bywają skorodowane od soli – zobacz zdjęcia podwozia.',
          'Modyfikacje: w autach sportowych częste są przeróbki zawieszenia, wydechu i silnika; mogą utrudnić badanie techniczne w UE.',
          'Ograniczniki: wiele aut JDM ma fabryczny ogranicznik prędkości 180 km/h.',
          'Elektronika: japońskie radio obsługuje pasmo FM 76–90 MHz, nawigacja i menu są po japońsku, a moduł ETC do płatności za autostrady jest w Europie bezużyteczny.',
        ],
      ],
    },
    {
      id: 'shipping',
      title: 'Eksport i transport z Japonii',
      paras: [
        'Po zakupie eksporter wyrejestrowuje auto i uzyskuje certyfikat eksportowy (Export Certificate) – dokument zastępujący dowód rejestracyjny, z danymi auta i przebiegiem. Jest potrzebny do odprawy i rejestracji w UE, razem z fakturą i konosamentem (B/L).',
        'Auta wypływają głównie z Jokohamy, Nagoi, Kobe i Osaki. Statki RoRo do Europy płyną zwykle 5–7 tygodni (trasa przez Kanał Sueski lub dookoła Afryki), a kontenery – podobnie lub nieco dłużej. Kontener jest dobrym wyborem dla aut cennych lub niejezdnych.',
        'Najpopularniejsze porty docelowe to Bremerhaven, Rotterdam, Antwerpia i Zeebrugge. Warto wykupić ubezpieczenie cargo – przy długim rejsie ryzyko uszkodzeń jest większe.',
      ],
    },
    {
      id: 'duty',
      title: 'Cło i umowa UE–Japonia',
      paras: [
        'Umowa o partnerstwie gospodarczym UE–Japonia (EPA) stopniowo znosiła cło na samochody – od 2026 r. auta japońskiego pochodzenia mogą wjechać do UE z cłem 0%. Pochodzenie potwierdza się deklaracją pochodzenia od eksportera albo na podstawie wiedzy importera (dokumentów potwierdzających, że auto zbudowano w Japonii).',
        'Auta JDM produkowane w Japonii zwykle się kwalifikują. Uwaga na auta japońskich marek zbudowane gdzie indziej (np. w USA czy Tajlandii) – te płacą standardowe 10% wartości celnej. Bez dowodu pochodzenia cło także wynosi 10%.',
        'Starsze auta, które mają ponad 30 lat i są w oryginalnym stanie, mogą zostać uznane za pojazdy kolekcjonerskie – wtedy cło wynosi 0%, a w części krajów VAT jest niższy. Po odprawie w kraju rejestracji dochodzą podatki krajowe zależne od silnika, emisji lub wartości.',
      ],
    },
    {
      id: 'adaptation',
      title: 'Kierownica po prawej – rejestracja w UE',
      paras: [
        'Auta z kierownicą po prawej stronie można zarejestrować w krajach UE, jeśli spełniają wymogi techniczne. Najważniejsze przeróbki to:',
        [
          'reflektory z charakterystyką do ruchu prawostronnego (przestawienie lub wymiana kloszy),',
          'tylne światło przeciwmgielne po właściwej stronie i pomarańczowe kierunkowskazy (w autach japońskich zwykle już są),',
          'prędkościomierz w km/h – japońskie auta mają go fabrycznie.',
        ],
        'W niektórych krajach, np. w Niemczech, wymagana jest indywidualna homologacja lub opinia rzeczoznawcy. Do rejestracji potrzebne są tłumaczenia certyfikatu eksportowego i faktury, dokument odprawy celnej, potwierdzenie podatków krajowych i badanie techniczne.',
      ],
    },
    {
      id: 'mistakes',
      title: 'Najczęstsze błędy przy imporcie z Japonii',
      paras: [
        [
          'Licytowanie bez przetłumaczonego arkusza aukcyjnego.',
          'Niedoszacowanie czasu – od zakupu do rejestracji mija często 2–3 miesiące.',
          'Założenie cła 0% dla auta japońskiej marki zbudowanego poza Japonią.',
          'Pominięcie kosztu przeróbki świateł i ewentualnej homologacji.',
          'Kupno mocno zmodyfikowanego auta, które nie przejdzie badania technicznego.',
          'Brak ubezpieczenia na długi rejs.',
        ],
      ],
    },
  ],
  UAE: [
    {
      id: 'market',
      title: 'Rynek aut w Zjednoczonych Emiratach Arabskich',
      paras: [
        'Dubaj i pozostałe emiraty to jeden z największych rynków aut luksusowych na świecie. Wysoki popyt na nowe auta sprawia, że rynek wtórny jest pełen kilkuletnich SUV-ów, aut sportowych i limuzyn premium – często w niższych cenach niż w Europie.',
        'Większość aut sprzedawanych w ZEA to wersje GCC (Gulf Cooperation Council), przygotowane na upały: wydajniejsza klimatyzacja i chłodzenie, czasem inne wyposażenie niż w Europie. Na rynku jest też sporo aut przywiezionych z USA – często po szkodach – które sprzedaje się dalej jako „import”.',
        'Najczęściej sprowadza się z ZEA duże SUV-y (Nissan Patrol, Toyota Land Cruiser, Lexus LX), auta luksusowe i sportowe. Przy autach z przebiegiem trzeba pamiętać o skutkach klimatu.',
      ],
    },
    {
      id: 'auctions',
      title: 'Gdzie kupić auto w ZEA',
      paras: [
        'Auta kupuje się od dealerów (także z certyfikowanych programów używanych aut marek), na aukcjach, m.in. Emirates Auction i Copart w ZEA, oraz z ogłoszeń. W Dubaju działa też duży rynek aut używanych z wieloma firmami eksportowymi, które obsługują kupujących z zagranicy.',
        'Przy zakupie z zagranicy najbezpieczniej działać przez sprawdzonego eksportera: zweryfikuje auto i dokumenty, wyrejestruje je, uzyska certyfikat eksportowy i nada w porcie.',
      ],
    },
    {
      id: 'titles',
      title: 'Dokumenty: Mulkiya i certyfikat eksportowy',
      paras: [
        'Dokumentem rejestracyjnym w ZEA jest karta Mulkiya wydawana przez urząd komunikacji (w Dubaju RTA). Do wywozu auto trzeba wyrejestrować i uzyskać certyfikat eksportowy (często z tablicami eksportowymi) – to podstawowy dokument dla odprawy w UE.',
        'Auto nie może mieć zaległych mandatów ani zastawu bankowego. W ZEA wiele aut kupuje się na kredyt – przed zakupem sprawdź, czy kredyt jest spłacony, a bank wydał zgodę na wywóz.',
      ],
    },
    {
      id: 'inspection',
      title: 'Jak sprawdzić auto z ZEA',
      paras: [
        [
          'Pochodzenie: sprawdź po VIN, czy auto jest wersją GCC, czy przypłynęło z USA. Numery zaczynające się od 1, 4 lub 5 oznaczają auto zbudowane w USA – wtedy sprawdź jego amerykańską historię (szkody, tytuł salvage).',
          'Zalanie: po ulewach w 2024 r. na rynek trafiło sporo aut po zalaniu. Szukaj śladów wody, osadów i korozji w kabinie oraz elektronice.',
          'Skutki klimatu: wysokie temperatury niszczą gumowe uszczelki, plastiki, akumulatory, opony i klimatyzację.',
          'Historia serwisowa: auta od dealerów mają zwykle pełną dokumentację – to duża wartość przy odsprzedaży.',
        ],
      ],
    },
    {
      id: 'shipping',
      title: 'Eksport i transport z ZEA',
      paras: [
        'Głównym portem jest Jebel Ali w Dubaju. Rejs do portów europejskich trwa zwykle 3–5 tygodni – zależnie od trasy (przez Morze Czerwone i Kanał Sueski albo dookoła Afryki) i portu docelowego. Auta płyną w kontenerach lub statkami RoRo.',
        'Do odprawy w UE potrzebne są certyfikat eksportowy, faktura i konosament (B/L). Dla aut, które wcześniej przypłynęły do ZEA z USA, przydadzą się też dokumenty z amerykańskiej historii.',
      ],
    },
    {
      id: 'duty',
      title: 'Cło przy imporcie z ZEA',
      paras: [
        'Unia Europejska nie ma z ZEA umowy, która obniżałaby cło na samochody, dlatego auta z Emiratów płacą standardowe 10% wartości celnej (CIF), a pickupy sklasyfikowane jako dostawcze – 22%. Dotyczy to także aut zbudowanych w USA: zerowe cło na auta amerykańskie wymaga transportu bezpośrednio z USA.',
        'Na cło nalicza się VAT importowy kraju odprawy, a w kraju rejestracji – podatki krajowe. Auta ponad 30-letnie w oryginalnym stanie mogą zostać uznane za kolekcjonerskie, z cłem 0%.',
      ],
    },
    {
      id: 'adaptation',
      title: 'Dostosowanie do norm UE i rejestracja',
      paras: [
        'Auta w wersji GCC mają kierownicę po lewej stronie, licznik w km/h i zwykle oświetlenie zbliżone do europejskiego, więc przeróbki są często mniejsze niż w autach z USA. Sprawdź jednak kierunkowskazy, tylne światło przeciwmgielne i reflektory.',
        'Auta przywiezione do ZEA z USA mają amerykańską specyfikację i wymagają takich samych przeróbek jak auta kupione bezpośrednio w Ameryce. W części krajów UE potrzebna jest indywidualna homologacja.',
      ],
    },
    {
      id: 'mistakes',
      title: 'Najczęstsze błędy przy imporcie z ZEA',
      paras: [
        [
          'Kupno auta z USA sprzedawanego jako „GCC” bez sprawdzenia VIN i historii.',
          'Zaległy kredyt lub mandaty, które blokują wywóz.',
          'Pominięcie śladów zalania i skutków upałów.',
          'Liczenie na zerowe cło – z ZEA płaci się standardowe 10%.',
        ],
      ],
    },
  ],
  UK: [
    {
      id: 'market',
      title: 'Rynek aut w Wielkiej Brytanii po brexicie',
      paras: [
        'Wielka Brytania to duży rynek aut używanych z ogromną ofertą aut premium, sportowych i klasycznych. Od brexitu jest dla UE krajem trzecim, więc import wymaga odprawy celnej – ale dzięki umowie handlowej UE–Wielka Brytania (TCA) auta spełniające reguły pochodzenia mogą wjechać z cłem 0%.',
        'Wszystkie auta brytyjskie mają kierownicę po prawej stronie. Dlatego najczęściej sprowadza się auta, przy których to nie przeszkadza albo które są wyjątkowo atrakcyjne cenowo: klasyki, auta kolekcjonerskie, rzadkie wersje i auta premium. Popularne jest też sprowadzanie aut europejskich marek, które wcześniej trafiły do UK.',
      ],
    },
    {
      id: 'auctions',
      title: 'Gdzie kupić auto w Wielkiej Brytanii',
      paras: [
        'Auta kupuje się od dealerów, z ogłoszeń (np. Auto Trader) i na aukcjach – dealerskich (BCA, Manheim) oraz powypadkowych (Copart UK). Na rynku jest dużo aut z udokumentowaną historią serwisową.',
        'Przy aukcjach powypadkowych auta są oznaczane kategorią szkody, którą trzeba znać przed zakupem.',
      ],
    },
    {
      id: 'titles',
      title: 'Kategorie szkód i dokument V5C',
      paras: [
        'Dokumentem rejestracyjnym jest V5C (logbook). Auta po szkodzie całkowitej mają w Wielkiej Brytanii kategorię:',
        [
          'Cat S – uszkodzenie konstrukcyjne (np. podłużnice, słupki), auto można naprawić i wrócić na drogę.',
          'Cat N – uszkodzenie niekonstrukcyjne (np. elektronika, elementy nadwozia), auto można naprawić.',
          'Cat B – tylko na części, nadwozie musi zostać zezłomowane.',
          'Cat A – tylko do złomowania.',
        ],
        'Aut kategorii A i B nie kupuj do jazdy. Kategorie S i N oznaczają poważną szkodę w przeszłości – sprawdź jakość naprawy.',
      ],
    },
    {
      id: 'inspection',
      title: 'Jak sprawdzić auto z Wielkiej Brytanii',
      paras: [
        [
          'Historia MOT: na stronie rządowej gov.uk za darmo sprawdzisz po numerze rejestracyjnym wszystkie przeglądy MOT – z przebiegiem z każdego roku i listą usterek. To najlepszy sposób, by wykryć cofnięty licznik.',
          'Raport HPI (lub podobny): pokazuje, czy auto ma niespłacony kredyt, czy było kradzione lub zapisane jako szkoda całkowita.',
          'Historia serwisowa i liczba właścicieli z dokumentu V5C.',
          'Przebieg w milach – licznik musi pokazywać też km/h przy rejestracji w UE.',
        ],
      ],
    },
    {
      id: 'shipping',
      title: 'Wywóz i transport z Wielkiej Brytanii',
      paras: [
        'Najczęściej auto przyjeżdża promem lub pociągiem przez kanał La Manche (Dover–Calais, Eurotunnel) na lawecie albo na kołach. Transport trwa zwykle od kilku dni do tygodnia. Auta ze Szkocji lub północnej Anglii mogą też płynąć statkiem RoRo do portów Beneluksu i Niemiec.',
        'Od brexitu potrzebne są dwa zgłoszenia celne: wywozowe w Wielkiej Brytanii i przywozowe w UE – nawet gdy jedziesz autem samodzielnie. Zwykle obsługuje je agencja celna przy terminalu. Właściciel zgłasza też w DVLA stały wywóz auta za pomocą odpowiedniej części dokumentu V5C.',
        'Jazda na brytyjskich tablicach do kraju rejestracji wymaga ważnego ubezpieczenia i przeglądu – często prościej zamówić lawetę.',
      ],
    },
    {
      id: 'duty',
      title: 'Cło, umowa TCA i VAT',
      paras: [
        'Umowa handlowa UE–Wielka Brytania (TCA) pozwala na import z cłem 0%, ale tylko dla aut, które spełniają reguły pochodzenia – czyli w praktyce zbudowanych w Wielkiej Brytanii lub w UE. Pochodzenie potwierdza deklaracja pochodzenia od eksportera albo wiedza importera. Auto japońskie czy amerykańskie kupione w UK płaci standardowe 10% wartości celnej.',
        'Niezależnie od cła płaci się VAT importowy kraju odprawy. Przy zakupie od brytyjskiego dealera zapytaj, czy sprzedaż na eksport może odbyć się bez brytyjskiego VAT – inaczej VAT zapłacisz dwa razy.',
        'W kraju rejestracji dochodzą podatki krajowe zależne od silnika, emisji lub wartości.',
      ],
    },
    {
      id: 'adaptation',
      title: 'Kierownica po prawej i rejestracja w UE',
      paras: [
        'Auta brytyjskie budowano według europejskich przepisów homologacyjnych, więc często mają dokument zgodności COC i są łatwiejsze do zarejestrowania niż auta z USA. Do dostosowania zwykle pozostają:',
        [
          'reflektory do ruchu prawostronnego,',
          'tylne światło przeciwmgielne po właściwej stronie,',
          'prędkościomierz z podziałką w km/h.',
        ],
        'Do rejestracji potrzebne są V5C (lub potwierdzenie wywozu), faktura, tłumaczenia przysięgłe, dokument odprawy celnej, potwierdzenie podatków krajowych i badanie techniczne.',
      ],
    },
    {
      id: 'mistakes',
      title: 'Najczęstsze błędy przy imporcie z Wielkiej Brytanii',
      paras: [
        [
          'Założenie, że po brexicie wszystko jest bez cła – zero dotyczy tylko aut spełniających reguły pochodzenia.',
          'Zapłacenie brytyjskiego VAT i VAT importowego w UE za to samo auto.',
          'Kupno auta Cat A lub Cat B.',
          'Niesprawdzenie historii MOT i raportu HPI.',
          'Brak zgłoszeń celnych przy samodzielnym przejeździe przez granicę.',
        ],
      ],
    },
  ],
};

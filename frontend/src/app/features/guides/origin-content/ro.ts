import { OriginDeep } from './types';

export const ORIGIN_DEEP: OriginDeep = {
  USA: [
    {
      id: "market",
      title: "Piața auto din SUA – ce merită importat",
      paras: [
        "Statele Unite sunt cea mai mare piață de mașini second-hand din lume: în fiecare an își schimbă proprietarul aproximativ 40 de milioane de vehicule, iar câteva milioane trec prin licitațiile asigurătorilor. De aceea multe modele – mai ales cele avariate – sunt vizibil mai ieftine decât în Europa, iar alegerea de versiuni este uriașă.",
        "De obicei merită importate mașinile rare sau scumpe în Europa: muscle car-uri cu motoare V8 mari (Mustang, Camaro, Challenger), SUV-uri și pickup-uri mari, versiuni premium bine echipate și mașini electrice, care în SUA se depreciază rapid. La compactele mai ieftine, transportul și taxele mănâncă adesea economia.",
        "Rețineți că prețul de la licitație este doar începutul. Se adaugă comisioanele licitației, transportul până la port, navlul maritim, asigurarea, taxa vamală, TVA-ul, taxele naționale, adaptarea la normele UE și eventuala reparație. Doar totalul vă arată dacă importul merită – așa că faceți calculul înainte de a licita, nu după.",
      ],
    },
    {
      id: "auctions",
      title: "Licitațiile Copart și IAAI – cum se cumpără",
      paras: [
        "Copart și IAAI (Insurance Auto Auctions) vând mai ales mașini de la asigurători, firme de închirieri și bănci – avariate, recuperate după furt, inundate sau pur și simplu scoase din flote. Licitația are loc online, iar mașina stă într-unul dintre cele câteva sute de parcuri din toată țara. Locația contează: ea decide costul și durata transportului până la port.",
        "Un cumpărător din Europa licitează de obicei printr-un broker (intermediar cu licență de licitație), pentru că multe mașini – mai ales cu titlu salvage – pot fi cumpărate doar de cumpărători licențiați. Brokerul percepe un comision și deseori se ocupă și de transport și de actele de export.",
        "La prețul adjudecat se adaugă comisioanele licitației: comisionul cumpărătorului, care crește în trepte odată cu prețul, comisionul pentru licitarea online, taxa de ieșire din parc (gate fee), taxa de mediu și taxa de procesare a titlului. Pentru o mașină de câteva mii de dolari, totalul este de obicei între câteva sute și peste o mie de dolari.",
        "Plata trebuie făcută într-un termen scurt – de regulă câteva zile lucrătoare – iar mașina trebuie ridicată din parc înainte să înceapă taxele de depozitare. Plata întârziată înseamnă penalitate și cont blocat, așa că pregătiți banii pentru mașină și comisioane înainte de a licita.",
      ],
    },
    {
      id: "titles",
      title: "Tipuri de titlu: clean, salvage, rebuilt",
      paras: [
        "În SUA proprietatea se dovedește prin titlul (title) emis de stat. Tipul lui spune istoria mașinii și contează la cumpărare și la export:",
        [
          "Clean – fără daună totală în istoric; cel mai scump, dar cel mai puțin riscant.",
          "Salvage – asigurătorul a declarat daună totală (costul reparației a depășit o parte din valoarea mașinii). Cel mai frecvent titlu la Copart și IAAI.",
          "Rebuilt / Reconstructed – fostă daună totală reparată și readmisă în circulație în SUA.",
          "Non-repairable, Certificate of Destruction, Parts only, Junk – doar pentru piese. Nu le cumpărați pentru a le conduce: exportul și înmatricularea în UE pot fi imposibile sau foarte dificile.",
        ],
        "În Uniunea Europeană, mențiunile din titlul american nu se transferă în certificatul de înmatriculare. O mașină salvage poate fi înmatriculată dacă trece inspecția tehnică după reparație. Titlul influențează totuși valoarea la revânzare și, mai ales, arată că mașina a avut avarii serioase – care trebuie reparate corect.",
      ],
    },
    {
      id: "inspection",
      title: "Cum verificați mașina înainte de licitare",
      paras: [
        "La licitație nu puteți vedea mașina personal, așa că fiecare detaliu din anunț contează. Înainte de a licita:",
        [
          "Verificați istoricul după VIN (de ex. Carfax, AutoCheck, baza NMVTIS): avarii, kilometraj, număr de proprietari, furt și inundații.",
          "Studiați fotografiile și descrierea avariilor (primary / secondary damage). „Front end” poate însemna orice, de la bară la lonjeroane îndoite și airbaguri declanșate.",
          "Citiți atent etichetele de stare: „Run and Drive” înseamnă că mașina a mers la sosirea în parc, nu că este aptă de circulație; „Engine Starts” înseamnă doar că motorul a pornit.",
          "Atenție la mașinile din zone cu uragane și inundații (Florida, Texas, Louisiana). Urme de apă sub mochetă, mâl și conectori electrici corodați sunt motive să renunțați.",
          "Kilometrajul este în mile (1 milă = 1,61 km) și poate fi marcat „not actual” sau „exempt” – atunci nu vă puteți baza pe odometru.",
        ],
        "Este înțelept să păstrați o rezervă pentru avarii ascunse – până la 20–30% din costul estimat al reparației. Cereți o ofertă de piese din Europa sau din SUA înainte de a stabili oferta maximă.",
      ],
    },
    {
      id: "shipping",
      title: "Export și transport maritim",
      paras: [
        "După cumpărare, o platformă auto duce mașina din parc la portul de export. Cele mai folosite porturi sunt New Jersey/New York, Savannah (Georgia), Baltimore, Houston și Los Angeles/Long Beach. De pe Coasta de Est, drumul până la porturile de la Marea Nordului durează de obicei 2–3 săptămâni; din California, prin Canalul Panama, până la 5–6 săptămâni.",
        "Exportul cere titlul original (sau o copie certificată) și factura. Exportatorul depune Electronic Export Information (EEI) în sistemul AES – obligatoriu pentru vehiculele second-hand indiferent de valoare – iar mașina și actele trebuie prezentate vămii americane (CBP) cu cel puțin 72 de ore înainte de plecarea navei.",
        "Există trei moduri de transport:",
        [
          "Container comun (de obicei 3–4 mașini într-un container de 40 de picioare) – cel mai popular, potrivit pentru mașini avariate și nefuncționale.",
          "Container exclusiv – mai scump, dar mașina călătorește singură și puteți adăuga piese.",
          "RoRo (navă roll-on/roll-off) – adesea cel mai ieftin, dar doar pentru mașini funcționale și cu mai puțină protecție la avarii.",
        ],
        "Merită asigurarea mărfii – de obicei 1,5–2% din valoarea mașinii. În portul UE containerul este descărcat, iar un agent vamal vămuiește mașina. Taxele de descărcare, de terminal și de agenție se plătesc în portul de destinație.",
      ],
    },
    {
      id: "duty",
      title: "Taxa vamală, originea și vămuirea în UE",
      paras: [
        "Taxa vamală standard a UE pentru autoturisme este de 10% din valoarea în vamă. Valoarea în vamă este prețul mașinii cu comisioanele licitației plus transportul și asigurarea până la granița UE (valoarea CIF). Pickup-urile pot fi clasificate ca vehicule de marfă – atunci taxa este 22% – iar motocicletele plătesc 6–8%.",
        "Din 1 iulie 2026 până la sfârșitul lui 2029, mașinile fabricate în SUA pot intra în UE cu taxă vamală 0% (Regulamentul (UE) 2026/1455). Condiția: trebuie să dovediți vămii originea americană a mașinii, iar mașina trebuie expediată direct din SUA. O factură sau o etichetă „Made in USA” nu ajung – este nevoie de dovada originii. VIN-ul dă un indiciu: mașinile construite în SUA au VIN care începe cu 1, 4 sau 5. Și o marcă japoneză sau germană asamblată în America se poate califica, dar un BMW fabricat în Europa și cumpărat în SUA nu.",
        "TVA-ul la import se aplică la cota țării unde se vămuiește mașina. Baza TVA este valoarea în vamă plus taxa vamală și costurile de transport până la destinația din UE. Firmele pot folosi regimul vamal 4200: vămuirea într-o țară și plata TVA-ului în țara de înmatriculare.",
        "După vămuire urmează taxele naționale – în funcție de țară, o acciză (de ex. 3,1% sau 18,6% în Polonia în funcție de capacitatea motorului), o taxă de înmatriculare după CO₂, putere sau valoare, sau nimic. Adesea ele decid dacă importul merită.",
      ],
    },
    {
      id: "adaptation",
      title: "Adaptarea la normele UE și înmatricularea",
      paras: [
        "Mașinile făcute pentru piața americană nu respectă unele reguli tehnice europene, așa că au nevoie de modificări înainte de inspecția tehnică:",
        [
          "Semnalizările spate trebuie să fie portocalii – la multe mașini americane clipesc stopurile roșii.",
          "Este obligatoriu un proiector de ceață spate.",
          "Farurile trebuie să aibă fasciculul de întâlnire european și să fie reglate corect.",
          "Vitezometrul trebuie să arate km/h (o scală dublă este de obicei suficientă).",
          "Senzorii americani de presiune în pneuri (TPMS) funcționează pe 315 MHz – în Europa este comun 433 MHz, ceea ce contează la schimbarea roților.",
        ],
        "Conversia luminilor costă de obicei câteva sute de euro. În unele țări – de ex. Germania sau Franța – o mașină din afara UE are nevoie și de omologare individuală sau de o expertiză înainte de înmatriculare, ceea ce costă timp și bani.",
        "Pentru înmatriculare pregătiți traduceri autorizate ale titlului și facturii, documentul de vămuire, dovada plății taxei naționale și certificatul de inspecție tehnică. Multe țări stabilesc un termen legal pentru înmatricularea unei mașini importate – în Polonia, de exemplu, 30 de zile.",
      ],
    },
    {
      id: "mistakes",
      title: "Cele mai frecvente greșeli la importul din SUA",
      paras: [
        [
          "Licitarea fără calculul costului total – comisioanele, transportul și taxele pot dubla prețul de la licitație.",
          "Cumpărarea unei mașini cu titlu „parts only” sau cu certificat de distrugere, care nu poate fi înmatriculată legal.",
          "Încrederea în „Run and Drive” fără verificarea istoricului după VIN.",
          "Lipsa unei rezerve pentru avarii ascunse și piese – repararea unei mașini lovite costă aproape întotdeauna mai mult decât sugerează fotografiile.",
          "Bazarea pe taxă vamală 0% fără dovada originii americane – fără ea plătiți 10%.",
          "Plata întârziată la licitație și acumularea taxelor de depozitare în parc.",
          "Ratarea termenului de înmatriculare sau de declarare a taxei naționale după sosirea mașinii.",
        ],
      ],
    },
  ],
  CANADA: [
    {
      id: "market",
      title: "Piața auto din Canada – prin ce diferă de SUA",
      paras: [
        "Canada este o piață mai mică decât SUA, dar oferă cam același lucru: aceleași mărci, modele și niveluri de echipare, adesea la prețuri puțin mai mici decât în Europa. Mulți cumpărători o văd ca alternativă la SUA, mai ales pentru mașinile din fabricile canadiene, care pot beneficia de acordul CETA.",
        "Mașinile canadiene au câteva avantaje: kilometraj în kilometri, lumini de zi din fabrică și echipare de iarnă (scaune încălzite, uneori preîncălzitor de bloc motor). Dezavantajul poate fi coroziunea – iarna drumurile sunt sărate intens, iar dedesubtul unei mașini din Ontario sau Quebec poate arăta mai rău decât al uneia din sudul SUA.",
        "Cel mai des se importă din Canada SUV-uri și pickup-uri, mașini produse local (de ex. Toyota RAV4, Lexus RX, Honda CR-V și Civic, Chrysler Pacifica) și mașini ieșite din leasing cu kilometraj mic.",
      ],
    },
    {
      id: "auctions",
      title: "De unde cumpărați o mașină în Canada",
      paras: [
        "Mașinile avariate sunt vândute în Canada de Copart Canada și IAA (fostă Impact Auto Auctions), iar cele neavariate de licitații pentru dealeri precum ADESA și de dealeri. Ca în SUA, multe licitații sunt accesibile doar printr-un broker licențiat.",
        "Este populară și cumpărarea de la dealeri și persoane fizice prin site-uri de anunțuri. La cumpărarea de la o persoană fizică trebuie să vă ocupați singur de actele de export și de transportul la port, așa că majoritatea cumpărătorilor europeni folosesc o firmă de export care ridică mașina, verifică actele și o expediază.",
        "Adăugați la preț comisioanele licitației sau ale dealerului și – la cumpărarea de la dealer – taxele canadiene pe vânzări (GST/HST/PST). Unele pot fi rambursate sau nu se percep când dealerul vinde direct la export – întrebați înainte de cumpărare.",
      ],
    },
    {
      id: "titles",
      title: "Documente de proprietate și statusuri de avarie",
      paras: [
        "Canada nu are un „title” ca în SUA – documentul este înregistrarea emisă de provincie (în Ontario, „ownership”). Statusul de avarie este trecut în registrul provincial:",
        [
          "Ontario și majoritatea provinciilor: Normal, Salvage (daună totală, interzisă în circulație), Rebuilt (reparată și aprobată după inspecție) și Irreparable – doar pentru piese.",
          "Quebec: vehicule grav accidentate (VGA – véhicule gravement accidenté) marcate „reconstruit” (reconstruit) sau „irrécupérable” (irecuperabil).",
        ],
        "Nu cumpărați pentru condus mașini marcate irreparable sau irrécupérable – nu pot fi înmatriculate legal. Celelalte statusuri nu se transferă în certificatul de înmatriculare din UE, dar afectează valoarea și arată că mașina a avut avarii serioase.",
      ],
    },
    {
      id: "inspection",
      title: "Cum verificați o mașină din Canada",
      paras: [
        [
          "Istoric după VIN: un raport CARFAX Canada arată avariile, înregistrările provinciale și kilometrajul; pentru mașinile venite din SUA, verificați și istoricul american.",
          "Gajuri: în Canada o mașină poate fi garanție pentru un credit. Verificați în registrul provincial de garanții (de ex. PPSA) că mașina este liberă de sarcini – altfel exportul poate fi blocat și chiar puteți pierde mașina.",
          "Coroziune: cereți fotografii cu dedesubtul, pragurile, pasajele roților și conductele de frână – sarea de pe drum își lasă amprenta.",
          "Versiunea de piață: mașinile canadiene sunt de obicei foarte apropiate de cele americane și au nevoie de modificări similare ale luminilor.",
        ],
        "Pentru mașinile de la licitație se aplică aceleași reguli ca în SUA: fotografiile avariilor, sensul lui „Run and Drive” și o rezervă pentru avarii ascunse.",
      ],
    },
    {
      id: "shipping",
      title: "Export și transport din Canada",
      paras: [
        "Cele mai folosite porturi sunt Halifax și Montreal în est și Vancouver în vest. De pe Coasta de Est, nava până la porturile de la Marea Nordului face de obicei cam 2 săptămâni – una dintre cele mai rapide rute spre Europa. Mașinile din provinciile vestice merg adesea spre est cu trenul sau pleacă din Vancouver prin Canalul Panama, ceea ce durează mai mult.",
        "Exportul cere documentul de proprietate (înregistrarea provincială), dovada cumpărării și o declarație de export în sistemul CBSA (CERS), depusă de obicei de exportator sau de casa de expediții. Mașina trebuie să fie liberă de gajuri.",
        "Opțiunile de transport sunt aceleași ca din SUA: container comun, container exclusiv sau RoRo pentru mașini funcționale. Iarna, luați în calcul posibile întârzieri ale transportului terestru spre port.",
      ],
    },
    {
      id: "duty",
      title: "Taxa vamală și acordul CETA",
      paras: [
        "Datorită acordului comercial UE–Canada (CETA), mașinile fabricate în Canada pot intra în UE cu taxă vamală 0%. Condiția este originea canadiană confirmată printr-o declarație de origine a exportatorului. Nu ajunge să cumpărați în Canada – multe mașini vândute acolo au fost fabricate în SUA, Mexic sau Japonia și plătesc integral 10%.",
        "Un VIN care începe cu „2” înseamnă că mașina a fost fabricată în Canada. Este un indiciu bun, dar nu o dovadă – la cumpărarea de la o persoană fizică este adesea greu de obținut declarația de origine, iar fără ea taxa este 10% din valoarea în vamă (CIF). Pickup-urile clasificate ca vehicule de marfă plătesc 22%.",
        "Pe lângă taxa vamală se plătește TVA-ul la import al țării de vămuire și taxele naționale (acciză sau taxă de înmatriculare) în țara de înmatriculare. Firmele pot folosi regimul 4200 și pot plăti TVA-ul în țara de destinație.",
      ],
    },
    {
      id: "adaptation",
      title: "Adaptarea la normele UE și înmatricularea",
      paras: [
        "Mașinile canadiene se înmatriculează ceva mai ușor decât cele americane: au vitezometru în km/h și lumini de zi din fabrică. De obicei mai trebuie totuși:",
        [
          "schimbate semnalizările spate în portocaliu, dacă clipesc stopurile,",
          "adăugat un proiector de ceață spate,",
          "adaptate farurile la fasciculul de întâlnire european.",
        ],
        "Înmatricularea cere traduceri autorizate ale actelor, documentul de vămuire, dovada taxelor naționale și inspecția tehnică. Țări precum Germania sau Franța pot cere omologare individuală.",
      ],
    },
    {
      id: "mistakes",
      title: "Cele mai frecvente greșeli la importul din Canada",
      paras: [
        [
          "Presupunerea că orice mașină din Canada plătește 0% – asta se aplică doar mașinilor fabricate în Canada, cu declarație de origine.",
          "Neverificarea unui gaj înainte de cumpărare.",
          "Ignorarea coroziunii dedesubtului la mașinile din provinciile cu ierni grele.",
          "Cumpărarea unei mașini cu status irreparable sau irrécupérable.",
          "Subestimarea transportului terestru din provinciile vestice până la porturile din est.",
        ],
      ],
    },
  ],
  JAPAN: [
    {
      id: "market",
      title: "Piața auto din Japonia – de ce JDM",
      paras: [
        "Japonia este cunoscută pentru mașini într-o stare tehnică foarte bună și cu kilometraj mic. Motivul este inspecția strictă shaken, care se scumpește pe măsură ce mașina îmbătrânește – de aceea mulți japonezi își vând mașinile după câțiva ani, iar prețurile mașinilor mai vechi scad repede.",
        "Majoritatea importurilor din Japonia sunt mașini JDM (Japanese Domestic Market) – legende sportive (Nissan Skyline GT-R, Toyota Supra, Mazda RX-7, Honda NSX), off-road-uri (Toyota Land Cruiser), monovolume și hibride mai noi. Pentru colecționari, modelele-cheie sunt cele care nu s-au vândut niciodată oficial în Europa.",
        "Toate mașinile de pe piața japoneză au volanul pe dreapta. Pot fi înmatriculate în UE, dar condusul pe dreapta este mai puțin comod și se revând mai greu – cu excepția modelelor de colecție căutate.",
      ],
    },
    {
      id: "auctions",
      title: "Licitații în Japonia – USS și altele",
      paras: [
        "Majoritatea mașinilor second-hand din Japonia trec prin licitații pentru dealeri. Cea mai mare este rețeaua USS, alături de, printre altele, TAA, CAA, HAA, JU și Arai. În fiecare săptămână sunt oferite zeci de mii de mașini.",
        "Un cumpărător străin nu licitează direct – o face un exportator japonez (agent de licitație): are acces la licitații, traduce fișa de licitație, cumpără mașina, o radiază pentru export și o expediază. La prețul adjudecat se adaugă comisionul licitației, comisionul exportatorului, transportul intern până la port și actele de export. Plata se face de obicei în yeni.",
        "Puteți cumpăra și din stocul unui exportator – poate costa mai mult, dar mașina a fost deja verificată și adesea așteaptă în port.",
      ],
    },
    {
      id: "titles",
      title: "Cum citiți o fișă de licitație japoneză",
      paras: [
        "Fișa de licitație (auction sheet) este raportul inspectorului licitației – cea mai importantă sursă de informații despre mașină. Conține o notă generală, o notă pentru interior și o hartă a avariilor caroseriei.",
        [
          "Nota generală: S sau 6 – practic nouă; 5 și 4,5 – stare foarte bună; 4 – bună, cu mici urme de uzură; 3,5 și 3 – defecte vizibile sau kilometraj mai mare; R sau RA – accident reparat (RA – reparație minoră); 0 sau *** – avariată, inundată sau neevaluată.",
          "Nota pentru interior: de la A (ca nou) la E (foarte uzat).",
          "Harta avariilor: A – zgârietură, U – lovitură, B – lovitură cu zgârietură, W – ondulație sau urme de reparație, S și C – rugină și coroziune, P – urme de vopsea, X – piesă de înlocuit, XX – piesă înlocuită, Y – fisură sau gaură. Cifra de lângă literă (1–3) arată mărimea avariei.",
        ],
        "Fișa arată și kilometrajul verificat de licitație, echiparea și notele inspectorului în japoneză – un exportator bun le traduce înainte să licitați.",
      ],
    },
    {
      id: "inspection",
      title: "La ce să fiți atenți la mașinile japoneze",
      paras: [
        [
          "Kilometraj: mașinile japoneze au de obicei kilometraj real și mic, dar verificați istoricul lui în fișa de licitație și în certificatul de export.",
          "Rugină: mașinile din nord (Hokkaido) și din zonele de coastă pot fi corodate de sare – uitați-vă la fotografiile dedesubtului.",
          "Modificări: mașinile sport au adesea suspensie, evacuare și motor modificate, ceea ce poate îngreuna inspecția tehnică în UE.",
          "Limitatoare de viteză: multe mașini JDM au un limitator din fabrică la 180 km/h.",
          "Electronică: radiourile japoneze folosesc banda FM 76–90 MHz, navigația și meniurile sunt în japoneză, iar unitatea de taxare ETC nu folosește la nimic în Europa.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Export și transport din Japonia",
      paras: [
        "După cumpărare, exportatorul radiază mașina și obține Export Certificate – documentul care înlocuiește înmatricularea, cu datele mașinii și kilometrajul. Este necesar pentru vămuire și înmatriculare în UE, împreună cu factura și conosamentul (B/L).",
        "Mașinile pleacă mai ales din Yokohama, Nagoya, Kobe și Osaka. Navele RoRo spre Europa fac de obicei 5–7 săptămâni (prin Canalul Suez sau ocolind Africa), containerele cam la fel sau puțin mai mult. Containerul este o alegere bună pentru mașini valoroase sau nefuncționale.",
        "Cele mai frecvente porturi de destinație sunt Bremerhaven, Rotterdam, Anvers și Zeebrugge. Merită asigurarea mărfii – pe un drum lung riscul de avarie este mai mare.",
      ],
    },
    {
      id: "duty",
      title: "Taxa vamală și acordul UE–Japonia",
      paras: [
        "Acordul de parteneriat economic UE–Japonia (APE) a eliminat treptat taxa vamală pe mașini – din 2026, mașinile de origine japoneză pot intra în UE cu taxă 0%. Originea se dovedește printr-o declarație de origine a exportatorului sau prin cunoștințele importatorului (documente care arată că mașina a fost fabricată în Japonia).",
        "Mașinile JDM fabricate în Japonia se califică de obicei. Atenție la mărcile japoneze fabricate în altă parte (de ex. în SUA sau Thailanda) – acestea plătesc standardul de 10% din valoarea în vamă. Fără dovada originii, taxa este tot 10%.",
        "Mașinile mai vechi de 30 de ani, în stare originală, pot fi considerate vehicule de colecție – atunci taxa vamală este 0%, iar unele țări aplică TVA redus. După vămuire se aplică, în țara de înmatriculare, taxele naționale după motor, emisii sau valoare.",
      ],
    },
    {
      id: "adaptation",
      title: "Volan pe dreapta – înmatricularea în UE",
      paras: [
        "Mașinile cu volan pe dreapta pot fi înmatriculate în țările UE dacă îndeplinesc cerințele tehnice. Principalele modificări sunt:",
        [
          "faruri cu fascicul pentru circulația pe dreapta (reglare sau înlocuirea dispersoarelor),",
          "proiector de ceață spate pe partea corectă și semnalizări portocalii (mașinile japoneze le au de obicei deja),",
          "vitezometru în km/h – mașinile japoneze îl au din fabrică.",
        ],
        "Unele țări, de ex. Germania, cer omologare individuală sau o expertiză. Înmatricularea cere traduceri ale certificatului de export și ale facturii, documentul de vămuire, dovada taxelor naționale și inspecția tehnică.",
      ],
    },
    {
      id: "mistakes",
      title: "Cele mai frecvente greșeli la importul din Japonia",
      paras: [
        [
          "Licitarea fără fișa de licitație tradusă.",
          "Subestimarea timpului – de la cumpărare la înmatriculare trec adesea 2–3 luni.",
          "Bazarea pe taxă 0% pentru o marcă japoneză fabricată în afara Japoniei.",
          "Uitarea costului conversiei luminilor și al unei eventuale omologări individuale.",
          "Cumpărarea unei mașini puternic modificate, care nu trece inspecția tehnică.",
          "Lipsa asigurării pentru drumul lung.",
        ],
      ],
    },
  ],
  UAE: [
    {
      id: "market",
      title: "Piața auto din Emiratele Arabe Unite",
      paras: [
        "Dubai și celelalte emirate sunt printre cele mai mari piețe de mașini de lux din lume. Cererea puternică de mașini noi umple piața second-hand cu SUV-uri, mașini sport și limuzine premium vechi de câțiva ani – adesea mai ieftine decât în Europa.",
        "Majoritatea mașinilor vândute în EAU sunt versiuni GCC (Consiliul de Cooperare al Golfului), construite pentru căldură: aer condiționat și răcire întărite, uneori altă echipare decât în Europa. Există și multe mașini aduse din SUA – adesea avariate – și revândute ca „import”.",
        "Cel mai des se importă din EAU SUV-uri mari (Nissan Patrol, Toyota Land Cruiser, Lexus LX), mașini de lux și sport. La mașinile cu kilometraj mai mare, țineți cont de efectele climei.",
      ],
    },
    {
      id: "auctions",
      title: "De unde cumpărați o mașină în EAU",
      paras: [
        "Mașinile se cumpără de la dealeri (inclusiv din programele de second-hand certificat ale mărcilor), la licitații precum Emirates Auction și Copart UAE și din anunțuri. Dubai are și o piață mare de mașini rulate, cu multe firme de export care servesc cumpărători străini.",
        "Când cumpărați din străinătate, cel mai sigur este prin intermediul unui exportator de încredere: verifică mașina și actele, o radiază, obține certificatul de export și o expediază.",
      ],
    },
    {
      id: "titles",
      title: "Documente: Mulkiya și certificatul de export",
      paras: [
        "Documentul de înmatriculare în EAU este cardul Mulkiya, emis de autoritatea rutieră (în Dubai, RTA). Pentru export mașina trebuie radiată și trebuie obținut un certificat de export (adesea cu numere de export) – documentul-cheie pentru vămuirea în UE.",
        "Mașina nu trebuie să aibă amenzi neplătite sau gaj bancar. Multe mașini din EAU sunt cumpărate în credit – înainte de cumpărare verificați că împrumutul este achitat și banca a eliberat mașina pentru export.",
      ],
    },
    {
      id: "inspection",
      title: "Cum verificați o mașină din EAU",
      paras: [
        [
          "Origine: verificați după VIN dacă mașina este versiune GCC sau a venit din SUA. Un VIN care începe cu 1, 4 sau 5 înseamnă o mașină fabricată în SUA – atunci verificați istoricul american (avarii, titlu salvage).",
          "Inundații: după furtunile din 2024 au ajuns pe piață multe mașini inundate. Căutați urme de apă, mâl și coroziune în habitaclu și la electronică.",
          "Avarii de climă: temperaturile ridicate uzează garniturile de cauciuc, plasticul, bateriile, anvelopele și aerul condiționat.",
          "Istoric de service: mașinile de la dealer au de obicei înregistrări complete – un mare plus la revânzare.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Export și transport din EAU",
      paras: [
        "Portul principal este Jebel Ali din Dubai. Drumul până la porturile europene durează de obicei 3–5 săptămâni, în funcție de rută (prin Marea Roșie și Canalul Suez sau ocolind Africa) și de portul de destinație. Mașinile călătoresc în containere sau pe nave RoRo.",
        "Vămuirea în UE cere certificatul de export, factura și conosamentul (B/L). Pentru mașinile ajunse anterior în EAU din SUA sunt utile și documentele din istoricul american.",
      ],
    },
    {
      id: "duty",
      title: "Taxa vamală la importul din EAU",
      paras: [
        "UE nu are cu EAU niciun acord care să reducă taxa vamală pe mașini, așa că mașinile din Emirate plătesc standardul de 10% din valoarea în vamă (CIF), iar pickup-urile clasificate ca vehicule de marfă 22%. Asta se aplică și mașinilor fabricate în SUA: taxa de 0% pentru mașinile americane cere transport direct din SUA.",
        "Pe lângă taxa vamală se plătește TVA-ul la import al țării de vămuire și taxele naționale în țara de înmatriculare. Mașinile mai vechi de 30 de ani, în stare originală, pot fi considerate vehicule de colecție, cu taxă vamală 0%.",
      ],
    },
    {
      id: "adaptation",
      title: "Adaptarea la normele UE și înmatricularea",
      paras: [
        "Mașinile în versiune GCC au volanul pe stânga, vitezometru în km/h și de obicei iluminare apropiată de specificația europeană, așa că modificările sunt adesea mai mici decât la mașinile americane. Verificați totuși semnalizările, proiectorul de ceață spate și farurile.",
        "Mașinile aduse în EAU din SUA au specificație americană și au nevoie de aceleași modificări ca mașinile cumpărate direct în America. Unele țări UE cer omologare individuală.",
      ],
    },
    {
      id: "mistakes",
      title: "Cele mai frecvente greșeli la importul din EAU",
      paras: [
        [
          "Cumpărarea unei mașini americane vândute drept „GCC” fără verificarea VIN-ului și a istoricului.",
          "Un credit neachitat sau amenzi care blochează exportul.",
          "Ratarea semnelor de inundație și de deteriorare din cauza căldurii.",
          "Bazarea pe taxă 0% – mașinile din EAU plătesc standardul de 10%.",
        ],
      ],
    },
  ],
  UK: [
    {
      id: "market",
      title: "Piața auto din Marea Britanie după Brexit",
      paras: [
        "Regatul Unit este o piață mare de mașini second-hand, cu o ofertă uriașă de mașini premium, sport și clasice. De la Brexit este o țară terță pentru UE, așa că importul cere vămuire – dar, datorită Acordului comercial și de cooperare UE–Regatul Unit (TCA), mașinile care respectă regulile de origine pot intra cu taxă vamală 0%.",
        "Toate mașinile britanice au volanul pe dreapta. De aceea cel mai des se importă mașini pentru care asta nu contează sau care sunt excepțional de avantajoase: clasice, mașini de colecție, versiuni rare și mașini premium. Este populară și readucerea mașinilor de mărci europene care au ajuns anterior în Marea Britanie.",
      ],
    },
    {
      id: "auctions",
      title: "De unde cumpărați o mașină în Marea Britanie",
      paras: [
        "Mașinile se cumpără de la dealeri, din anunțuri (de ex. Auto Trader) și la licitații – pentru dealeri (BCA, Manheim) și de mașini avariate (Copart UK). Multe mașini au istoric de service documentat.",
        "La licitațiile de mașini avariate, mașinile au o categorie de daună pe care trebuie s-o înțelegeți înainte de cumpărare.",
      ],
    },
    {
      id: "titles",
      title: "Categoriile de daună și V5C",
      paras: [
        "Documentul de înmatriculare este V5C (logbook). Mașinile cu daună totală primesc în Marea Britanie o categorie:",
        [
          "Cat S – avarii structurale (de ex. lonjeroane, stâlpi); mașina poate fi reparată și poate reveni pe drum.",
          "Cat N – avarii nestructurale (de ex. electronică, panouri de caroserie); mașina poate fi reparată.",
          "Cat B – doar pentru piese, caroseria trebuie distrusă.",
          "Cat A – doar la fier vechi.",
        ],
        "Nu cumpărați mașini Cat A sau Cat B pentru condus. Categoriile S și N înseamnă avarii serioase în trecut – verificați calitatea reparației.",
      ],
    },
    {
      id: "inspection",
      title: "Cum verificați o mașină din Marea Britanie",
      paras: [
        [
          "Istoricul MOT: pe site-ul guvernamental gov.uk puteți verifica gratuit, după numărul de înmatriculare, toate inspecțiile MOT – cu kilometrajul din fiecare an și lista defectelor. Este cea mai bună metodă de a depista un kilometraj dat înapoi.",
          "Verificare HPI (sau similară): arată finanțări neachitate, furt și dacă mașina a fost înregistrată ca daună totală.",
          "Istoricul de service și numărul de proprietari din V5C.",
          "Kilometraj în mile – pentru înmatricularea în UE vitezometrul trebuie să arate și km/h.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Export și transport din Marea Britanie",
      paras: [
        "Majoritatea mașinilor traversează Canalul Mânecii cu feribotul sau trenul (Dover–Calais, Eurotunnel), pe platformă sau conduse. Transportul durează de obicei de la câteva zile la o săptămână. Mașinile din Scoția sau din nordul Angliei pot merge și cu nava RoRo spre porturile din Benelux și Germania.",
        "De la Brexit sunt necesare două declarații vamale: una de export în Marea Britanie și una de import în UE – chiar dacă conduceți mașina personal. De obicei se ocupă de ele un agent vamal la terminal. Deținătorul anunță și DVLA despre exportul definitiv prin partea corespunzătoare a V5C.",
        "Condusul cu numere britanice până în țara de înmatriculare cere asigurare și MOT valabile – o platformă este adesea mai simplă.",
      ],
    },
    {
      id: "duty",
      title: "Taxa vamală, TCA și TVA",
      paras: [
        "Acordul comercial și de cooperare UE–Regatul Unit (TCA) permite taxă vamală 0%, dar doar pentru mașinile care respectă regulile de origine – în practică, fabricate în Regatul Unit sau în UE. Originea se dovedește printr-o declarație de origine a exportatorului sau prin cunoștințele importatorului. O mașină japoneză sau americană cumpărată în Regatul Unit plătește standardul de 10% din valoarea în vamă.",
        "TVA-ul la import al țării de vămuire se datorează indiferent de taxa vamală. Când cumpărați de la un dealer britanic, întrebați dacă vânzarea la export se poate face fără TVA britanic – altfel plătiți TVA de două ori.",
        "În țara de înmatriculare se aplică taxele naționale după motor, emisii sau valoare.",
      ],
    },
    {
      id: "adaptation",
      title: "Volan pe dreapta și înmatricularea în UE",
      paras: [
        "Mașinile britanice au fost construite după regulile europene de omologare, așa că au adesea Certificat de conformitate (COC) și se înmatriculează mai ușor decât cele americane. De obicei rămân:",
        [
          "farurile pentru circulația pe dreapta,",
          "proiectorul de ceață spate pe partea corectă,",
          "vitezometrul cu scală în km/h.",
        ],
        "Înmatricularea cere V5C (sau dovada exportului), factura, traduceri autorizate, documentul de vămuire, dovada taxelor naționale și inspecția tehnică.",
      ],
    },
    {
      id: "mistakes",
      title: "Cele mai frecvente greșeli la importul din Marea Britanie",
      paras: [
        [
          "Presupunerea că după Brexit totul este scutit de taxe vamale – 0% se aplică doar mașinilor care respectă regulile de origine.",
          "Plata TVA-ului britanic și a TVA-ului de import din UE pentru aceeași mașină.",
          "Cumpărarea unei mașini Cat A sau Cat B.",
          "Neverificarea istoricului MOT și a unui raport HPI.",
          "Trecerea frontierei fără declarații vamale când conduceți mașina personal.",
        ],
      ],
    },
  ],
};

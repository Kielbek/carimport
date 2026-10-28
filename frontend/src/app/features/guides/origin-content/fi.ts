import { OriginDeep } from './types';

export const ORIGIN_DEEP: OriginDeep = {
  USA: [
    {
      id: "market",
      title: "Yhdysvaltain automarkkinat – mitä kannattaa tuoda",
      paras: [
        "Yhdysvallat on maailman suurin käytettyjen autojen markkina: siellä vaihtaa omistajaa vuosittain noin 40 miljoonaa ajoneuvoa, ja useita miljoonia myydään vakuutusyhtiöiden huutokaupoissa. Siksi monet mallit – etenkin vaurioituneet – ovat selvästi Eurooppaa halvempia, ja versioiden valikoima on valtava.",
        "Yleensä kannattaa tuoda autoja, jotka ovat Euroopassa harvinaisia tai kalliita: isoilla V8-moottoreilla varustettuja muscle careja (Mustang, Camaro, Challenger), isoja SUV-autoja ja avolava-autoja, hyvin varusteltuja premium-versioita sekä sähköautoja, jotka menettävät Yhdysvalloissa arvoaan nopeasti. Halvemmissa pienemmissä autoissa kuljetus ja verot syövät säästön usein kokonaan.",
        "Muista, että huutokauppahinta on vasta alku. Lisäksi tulevat huutokauppamaksut, kuljetus satamaan, merirahti, vakuutus, tulli, arvonlisävero, kansalliset verot, EU-muutostyöt ja mahdollinen korjaus. Vasta kokonaissumma kertoo, kannattaako tuonti – laske siis ennen tarjoamista, älä jälkikäteen.",
      ],
    },
    {
      id: "auctions",
      title: "Copart- ja IAAI-huutokaupat – näin ostat",
      paras: [
        "Copart ja IAAI (Insurance Auto Auctions) myyvät pääasiassa vakuutusyhtiöiden, autovuokraamojen ja pankkien autoja – vaurioituneita, varkauden jälkeen löytyneitä, tulvan vahingoittamia tai yksinkertaisesti kalustosta poistettuja. Tarjoukset tehdään verkossa, ja auto seisoo jollakin satojen säilytysalueiden joukosta eri puolilla maata. Sijainnilla on merkitystä: se ratkaisee satamakuljetuksen hinnan ja keston.",
        "Eurooppalainen ostaja tekee tarjoukset yleensä välittäjän (brokerin, jolla on huutokauppalisenssi) kautta, koska monia autoja – etenkin salvage-titlellä – saavat ostaa vain lisensoidut ostajat. Välittäjä perii palkkion ja hoitaa usein myös kuljetuksen ja vientiasiakirjat.",
        "Vasarahinnan päälle tulevat huutokauppamaksut: hinnan mukana portaittain nouseva ostajan maksu, verkkotarjousmaksu, alueelta luovutuksen gate fee, ympäristömaksu ja titlen käsittelymaksu. Muutaman tuhannen dollarin autossa niitä kertyy yleensä muutamasta sadasta yli tuhanteen dollariin.",
        "Maksu on suoritettava lyhyessä ajassa – yleensä muutamassa arkipäivässä – ja auto on noudettava alueelta ennen kuin säilytysmaksut alkavat juosta. Myöhästynyt maksu tarkoittaa sakkoa ja tilin jäädyttämistä, joten pidä rahat autoon ja maksuihin valmiina ennen tarjoamista.",
      ],
    },
    {
      id: "titles",
      title: "Title-tyypit: clean, salvage, rebuilt",
      paras: [
        "Yhdysvalloissa omistus todistetaan osavaltion myöntämällä titlellä. Sen tyyppi kertoo auton historian ja vaikuttaa ostoon ja vientiin:",
        [
          "Clean – auton historiassa ei ole täystuhoa; kallein mutta pienin riski.",
          "Salvage – vakuutusyhtiö on todennut täystuhon (korjauskustannus ylitti tietyn osan auton arvosta). Copartin ja IAAI:n yleisin title.",
          "Rebuilt / Reconstructed – entinen täystuho, joka on korjattu ja hyväksytty Yhdysvalloissa uudelleen liikenteeseen.",
          "Non-repairable, Certificate of Destruction, Parts only, Junk – vain osiksi. Älä osta näitä ajettavaksi: vienti ja rekisteröinti EU:ssa voivat olla mahdottomia tai hyvin vaikeita.",
        ],
        "Euroopan unionissa amerikkalaisen titlen merkinnät eivät siirry rekisteröintitodistukseen. Salvage-auto voidaan rekisteröidä, jos se läpäisee katsastuksen korjauksen jälkeen. Title vaikuttaa silti jälleenmyyntiarvoon ja kertoo ennen kaikkea, että autolla on ollut vakavia vaurioita – jotka on korjattava kunnolla.",
      ],
    },
    {
      id: "inspection",
      title: "Näin tarkistat auton ennen tarjousta",
      paras: [
        "Huutokaupassa et näe autoa itse, joten jokainen ilmoituksen yksityiskohta on tärkeä. Ennen tarjousta:",
        [
          "Tarkista historia VIN-numerolla (esim. Carfax, AutoCheck, NMVTIS-tietokanta): vauriot, ajokilometrit, omistajien määrä, varkaudet ja tulvat.",
          "Tutki kuvat ja vauriokuvaus (primary / secondary damage). ”Front end” voi tarkoittaa mitä tahansa puskurista vääntyneisiin runkopalkkeihin ja lauenneisiin turvatyynyihin.",
          "Lue kuntomerkinnät tarkasti: ”Run and Drive” tarkoittaa, että auto liikkui saapuessaan alueelle, ei että se olisi liikennekelpoinen; ”Engine Starts” tarkoittaa vain, että moottori käynnistyi.",
          "Ole varovainen hurrikaani- ja tulva-alueiden autojen kanssa (Florida, Texas, Louisiana). Vesijäljet maton alla, liete ja syöpyneet sähköliittimet ovat syy luopua kaupasta.",
          "Ajomäärä on maileina (1 maili = 1,61 km), ja se voi olla merkitty ”not actual” tai ”exempt” – silloin mittariin ei voi luottaa.",
        ],
        "Piilovaurioita varten kannattaa varata puskuri – jopa 20–30 % arvioidusta korjauskustannuksesta. Pyydä osista hinta-arvio Euroopasta tai Yhdysvalloista ennen kuin päätät enimmäistarjouksesi.",
      ],
    },
    {
      id: "shipping",
      title: "Vienti ja merikuljetus",
      paras: [
        "Oston jälkeen autonkuljetusauto vie auton alueelta vientisatamaan. Yleisimmät satamat ovat New Jersey/New York, Savannah (Georgia), Baltimore, Houston ja Los Angeles/Long Beach. Itärannikolta matka Pohjanmeren satamiin kestää yleensä 2–3 viikkoa, Kaliforniasta Panaman kanavan kautta jopa 5–6 viikkoa.",
        "Vientiin tarvitaan alkuperäinen title (tai oikeaksi todistettu kopio) ja lasku. Viejä tekee Electronic Export Information (EEI) -ilmoituksen AES-järjestelmään – pakollinen käytetyille ajoneuvoille arvosta riippumatta – ja auto sekä asiakirjat on esitettävä Yhdysvaltain tullille (CBP) vähintään 72 tuntia ennen laivan lähtöä.",
        "Kuljetustapoja on kolme:",
        [
          "Jaettu kontti (yleensä 3–4 autoa 40 jalan kontissa) – suosituin, sopii vaurioituneille ja liikkumattomille autoille.",
          "Oma kontti – kalliimpi, mutta auto kulkee yksin ja mukaan voi laittaa osia.",
          "RoRo (roll-on/roll-off-alus) – usein halvin, mutta vain ajokuntoisille autoille ja heikommalla suojalla vaurioita vastaan.",
        ],
        "Kuljetusvakuutus kannattaa ottaa – yleensä 1,5–2 % auton arvosta. EU-satamassa kontti puretaan ja tulliasiamies tulliselvittää auton. Purku-, terminaali- ja asiamiesmaksut maksetaan määräsatamassa.",
      ],
    },
    {
      id: "duty",
      title: "Tulli, alkuperä ja tulliselvitys EU:ssa",
      paras: [
        "EU:n tavallinen tulli henkilöautoille on 10 % tullausarvosta. Tullausarvo on auton hinta huutokauppamaksuineen sekä kuljetus ja vakuutus EU:n rajalle (CIF-arvo). Avolava-autot voidaan luokitella tavara-autoiksi – silloin tulli on 22 % – ja moottoripyörät maksavat 6–8 %.",
        "1.7.2026 alkaen vuoden 2029 loppuun Yhdysvalloissa valmistetut autot voidaan tuoda EU:hun 0 %:n tullilla (asetus (EU) 2026/1455). Ehto: sinun on osoitettava tullille auton yhdysvaltalainen alkuperä, ja auto on lähetettävä suoraan Yhdysvalloista. Lasku tai ”Made in USA” -tarra ei riitä – tarvitaan alkuperäselvitys. VIN antaa vihjeen: Yhdysvalloissa valmistettujen autojen VIN alkaa numerolla 1, 4 tai 5. Myös Amerikassa koottu japanilainen tai saksalainen merkki voi täyttää ehdot, mutta Euroopassa valmistettu ja Yhdysvalloista ostettu BMW ei.",
        "Maahantuonnin arvonlisävero peritään sen maan verokannan mukaan, jossa auto tulliselvitetään. Veron peruste on tullausarvo lisättynä tullilla ja kuljetuskustannuksilla määränpäähän EU:ssa. Yritykset voivat käyttää tullimenettelyä 4200: tulliselvitys yhdessä maassa ja arvonlisäveron tilitys rekisteröintimaassa.",
        "Tulliselvityksen jälkeen tulevat kansalliset verot – maasta riippuen valmistevero (esim. Puolassa 3,1 % tai 18,6 % moottorin tilavuuden mukaan), CO₂-päästöihin, tehoon tai arvoon perustuva rekisteröintivero (Suomessa autovero) tai ei mitään. Usein juuri ne ratkaisevat, kannattaako tuonti.",
      ],
    },
    {
      id: "adaptation",
      title: "EU-muutostyöt ja rekisteröinti",
      paras: [
        "Yhdysvaltain markkinoille valmistetut autot eivät täytä kaikkia eurooppalaisia teknisiä vaatimuksia, joten ne vaativat muutoksia ennen katsastusta:",
        [
          "Takasuuntavilkkujen on oltava keltaiset (oranssit) – monissa amerikkalaisissa autoissa vilkkuvat punaiset jarruvalot.",
          "Takasumuvalo on pakollinen.",
          "Ajovaloissa on oltava eurooppalainen lähivalokuvio ja niiden on oltava oikein suunnatut.",
          "Nopeusmittarin on näytettävä km/h (kaksoisasteikko yleensä riittää).",
          "Amerikkalaiset rengaspaineanturit (TPMS) toimivat 315 MHz:n taajuudella – Euroopassa yleinen on 433 MHz, millä on merkitystä renkaita vaihdettaessa.",
        ],
        "Valojen muutostyö maksaa yleensä muutaman sata euroa. Joissakin maissa – esim. Saksassa tai Ranskassa – EU:n ulkopuolelta tuleva auto tarvitsee ennen rekisteröintiä myös yksittäishyväksynnän tai asiantuntijalausunnon, mikä vie aikaa ja rahaa.",
        "Rekisteröintiä varten valmistele titlen ja laskun virallinen käännös, tulliselvitysasiakirja, kuitti kansallisen veron maksusta ja katsastustodistus. Monissa maissa tuodun auton rekisteröinnille on laissa määräaika – esimerkiksi Puolassa 30 päivää.",
      ],
    },
    {
      id: "mistakes",
      title: "Yleisimmät virheet tuotaessa autoa Yhdysvalloista",
      paras: [
        [
          "Tarjoaminen laskematta kokonaiskustannusta – maksut, kuljetus ja verot voivat kaksinkertaistaa huutokauppahinnan.",
          "”Parts only” -titlellä tai romutustodistuksella varustetun auton ostaminen, jota ei voi laillisesti rekisteröidä.",
          "Luottaminen merkintään ”Run and Drive” tarkistamatta historiaa VIN-numerolla.",
          "Ei puskuria piilovaurioille ja osille – kolarivaurioisen auton korjaus maksaa lähes aina enemmän kuin kuvista voisi päätellä.",
          "0 %:n tulliin luottaminen ilman todistetta yhdysvaltalaisesta alkuperästä – ilman sitä maksat 10 %.",
          "Huutokaupan myöhästynyt maksu ja säilytysmaksujen kertyminen.",
          "Rekisteröinnin tai kansallisen veron ilmoittamisen määräajan ylittäminen auton saavuttua.",
        ],
      ],
    },
  ],
  CANADA: [
    {
      id: "market",
      title: "Kanadan automarkkinat – miten ne eroavat Yhdysvalloista",
      paras: [
        "Kanada on Yhdysvaltoja pienempi markkina, mutta tarjonta on lähes sama: samat merkit, mallit ja varustetasot, usein hieman Eurooppaa edullisemmin. Monet ostajat pitävät Kanadaa vaihtoehtona Yhdysvalloille, etenkin kanadalaisten tehtaiden autoissa, jotka voivat hyötyä CETA-sopimuksesta.",
        "Kanadalaisissa autoissa on muutama etu: mittari kilometreinä, tehdasasenteiset huomiovalot ja talvivarusteet (istuinlämmitys, joskus moottorinlämmitin). Haittapuolena voi olla ruoste – talvella teitä suolataan runsaasti, ja Ontariosta tai Quebecista tulevan auton pohja voi olla huonommassa kunnossa kuin Yhdysvaltain eteläosista tulevan.",
        "Kanadasta tuodaan yleisimmin SUV-autoja ja avolava-autoja, paikallisesti valmistettuja autoja (esim. Toyota RAV4, Lexus RX, Honda CR-V ja Civic, Chrysler Pacifica) sekä vähän ajettuja leasingautoja.",
      ],
    },
    {
      id: "auctions",
      title: "Mistä ostaa auto Kanadasta",
      paras: [
        "Vaurioituneita autoja myyvät Kanadassa Copart Canada ja IAA (entinen Impact Auto Auctions), vaurioitumattomia kauppiashuutokaupat kuten ADESA sekä autoliikkeet. Kuten Yhdysvalloissa, monet huutokaupat ovat käytettävissä vain lisensoidun välittäjän kautta.",
        "Suosittua on myös ostaa autoliikkeiltä ja yksityisiltä myyjiltä ilmoitussivustojen kautta. Yksityiskaupassa sinun on hoidettava vientiasiakirjat ja kuljetus satamaan itse, joten useimmat eurooppalaiset ostajat käyttävät vientiyritystä, joka noutaa auton, tarkistaa asiakirjat ja lähettää sen.",
        "Lisää hintaan huutokaupan tai liikkeen maksut ja – liikkeestä ostettaessa – Kanadan myyntiverot (GST/HST/PST). Osa niistä voidaan palauttaa tai jättää perimättä, kun liike myy suoraan vientiin – kysy ennen ostoa.",
      ],
    },
    {
      id: "titles",
      title: "Omistusasiakirjat ja vauriotilat",
      paras: [
        "Kanadassa ei ole yhdysvaltalaistyyppistä ”titleä” – asiakirja on provinssin myöntämä rekisteröinti (Ontariossa ”ownership”). Vauriotila merkitään provinssin rekisteriin:",
        [
          "Ontario ja useimmat provinssit: Normal, Salvage (täystuho, ei saa käyttää liikenteessä), Rebuilt (korjattu ja tarkastuksen jälkeen hyväksytty) ja Irreparable – vain osiksi.",
          "Quebec: vakavasti vaurioituneet ajoneuvot (VGA – véhicule gravement accidenté), joissa merkintä ”reconstruit” (uudelleenrakennettu) tai ”irrécupérable” (korjauskelvoton).",
        ],
        "Älä osta ajettavaksi autoja, joissa on merkintä irreparable tai irrécupérable – niitä ei voi rekisteröidä laillisesti. Muut tilat eivät siirry EU:n rekisteröintitodistukseen, mutta ne vaikuttavat arvoon ja kertovat, että autolla on ollut vakavia vaurioita.",
      ],
    },
    {
      id: "inspection",
      title: "Näin tarkistat auton Kanadasta",
      paras: [
        [
          "Historia VIN-numerolla: CARFAX Canada -raportti näyttää vauriot, provinssirekisteröinnit ja ajokilometrit; Yhdysvalloista tulleiden autojen osalta tarkista myös Yhdysvaltain historia.",
          "Panttaukset: Kanadassa auto voi olla lainan vakuutena. Tarkista provinssin panttirekisteristä (esim. PPSA), että auto on vapaa rasitteista – muuten vienti voidaan estää ja voit jopa menettää auton.",
          "Ruoste: pyydä kuvia pohjasta, kynnyksistä, pyöränkaarista ja jarruputkista – tiesuola jättää jälkensä.",
          "Markkinaversio: kanadalaiset autot ovat yleensä hyvin lähellä yhdysvaltalaisia ja vaativat samankaltaisia valomuutoksia.",
        ],
        "Huutokauppa-autoihin pätevät samat säännöt kuin Yhdysvalloissa: vauriokuvat, ”Run and Drive” -merkinnän merkitys ja puskuri piilovaurioille.",
      ],
    },
    {
      id: "shipping",
      title: "Vienti ja kuljetus Kanadasta",
      paras: [
        "Käytetyimmät satamat ovat Halifax ja Montreal idässä sekä Vancouver lännessä. Itärannikolta laiva Pohjanmeren satamiin kulkee yleensä noin 2 viikossa – yksi nopeimmista reiteistä Eurooppaan. Läntisten provinssien autot kulkevat usein itään junalla tai lähtevät Vancouverista Panaman kanavan kautta, mikä kestää kauemmin.",
        "Vientiin tarvitaan omistusasiakirja (provinssin rekisteröinti), ostotosite ja vienti-ilmoitus CBSA:n järjestelmään (CERS), jonka tekee yleensä viejä tai huolitsija. Auton on oltava vapaa panttauksista.",
        "Kuljetusvaihtoehdot ovat samat kuin Yhdysvalloista: jaettu kontti, oma kontti tai RoRo ajokuntoisille autoille. Talvella varaudu mahdollisiin viivästyksiin maakuljetuksessa satamaan.",
      ],
    },
    {
      id: "duty",
      title: "Tulli ja CETA-sopimus",
      paras: [
        "EU:n ja Kanadan välisen kauppasopimuksen (CETA) ansiosta Kanadassa valmistetut autot voidaan tuoda EU:hun 0 %:n tullilla. Ehtona on kanadalainen alkuperä, joka vahvistetaan viejän alkuperäilmoituksella. Pelkkä ostaminen Kanadasta ei riitä – monet siellä myytävät autot on valmistettu Yhdysvalloissa, Meksikossa tai Japanissa, ja niistä maksetaan täydet 10 %.",
        "Numerolla ”2” alkava VIN tarkoittaa, että auto on valmistettu Kanadassa. Se on hyvä vihje, mutta ei todiste – yksityiseltä ostettaessa alkuperäilmoitusta on usein vaikea saada, ja ilman sitä tulli on 10 % tullausarvosta (CIF). Tavara-autoiksi luokitellut avolava-autot maksavat 22 %.",
        "Tullin lisäksi peritään tulliselvitysmaan maahantuonnin arvonlisävero ja rekisteröintimaan kansalliset verot (valmistevero tai rekisteröintivero). Yritykset voivat käyttää menettelyä 4200 ja tilittää arvonlisäveron määrämaassa.",
      ],
    },
    {
      id: "adaptation",
      title: "EU-muutostyöt ja rekisteröinti",
      paras: [
        "Kanadalaiset autot on hieman helpompi rekisteröidä kuin yhdysvaltalaiset: niissä on km/h-nopeusmittari ja tehdasasenteiset huomiovalot. Yleensä on silti tarpeen:",
        [
          "vaihtaa takavilkut keltaisiksi, jos jarruvalot vilkkuvat,",
          "lisätä takasumuvalo,",
          "mukauttaa ajovalot eurooppalaiseen lähivalokuvioon.",
        ],
        "Rekisteröinti edellyttää asiakirjojen virallisia käännöksiä, tulliselvitysasiakirjaa, todistusta kansallisista veroista ja katsastusta. Esimerkiksi Saksa tai Ranska voivat vaatia yksittäishyväksynnän.",
      ],
    },
    {
      id: "mistakes",
      title: "Yleisimmät virheet tuotaessa autoa Kanadasta",
      paras: [
        [
          "Oletus, että jokainen Kanadasta tuotu auto saa 0 %:n tullin – se koskee vain Kanadassa valmistettuja autoja, joilla on alkuperäilmoitus.",
          "Panttauksen tarkistamatta jättäminen ennen ostoa.",
          "Pohjan ruosteen sivuuttaminen ankarien talvien provinsseista tulevissa autoissa.",
          "Auton ostaminen, jonka tila on irreparable tai irrécupérable.",
          "Läntisistä provinsseista itäisiin satamiin tapahtuvan maakuljetuksen aliarviointi.",
        ],
      ],
    },
  ],
  JAPAN: [
    {
      id: "market",
      title: "Japanin automarkkinat – miksi JDM",
      paras: [
        "Japani tunnetaan erittäin hyväkuntoisista ja vähän ajetuista autoista. Syynä on tiukka shaken-katsastus, joka kallistuu auton ikääntyessä – siksi monet japanilaiset myyvät autonsa muutaman vuoden jälkeen, ja vanhempien autojen hinnat laskevat nopeasti.",
        "Suurin osa Japanista tuoduista autoista on JDM-autoja (Japanese Domestic Market) – urheiluautolegendoja (Nissan Skyline GT-R, Toyota Supra, Mazda RX-7, Honda NSX), maastoautoja (Toyota Land Cruiser), tila-autoja ja uudempia hybridejä. Keräilijöille avainmalleja ovat ne, joita ei ole koskaan virallisesti myyty Euroopassa.",
        "Kaikki Japanin markkinoiden autot ovat oikealta ohjattavia. Ne voidaan rekisteröidä EU:ssa, mutta oikeanpuoleisessa liikenteessä ne ovat epämukavampia ja niitä voi olla vaikeampi myydä eteenpäin – haluttuja keräilymalleja lukuun ottamatta.",
      ],
    },
    {
      id: "auctions",
      title: "Huutokaupat Japanissa – USS ja muut",
      paras: [
        "Suurin osa Japanin käytetyistä autoista myydään kauppiashuutokaupoissa. Suurin on USS-verkosto, ja lisäksi muun muassa TAA, CAA, HAA, JU ja Arai. Joka viikko tarjolla on kymmeniä tuhansia autoja.",
        "Ulkomainen ostaja ei tee tarjouksia suoraan – sen tekee japanilainen viejä (huutokauppa-agentti): agentilla on pääsy huutokauppoihin, se kääntää huutokauppalomakkeen, ostaa auton, poistaa sen rekisteristä vientiä varten ja lähettää sen. Vasarahinnan päälle tulevat huutokauppamaksu, viejän palkkio, kotimaan kuljetus satamaan ja vientiasiakirjat. Maksu tehdään yleensä jeneinä.",
        "Voit ostaa myös viejän varastosta – se voi maksaa enemmän, mutta auto on jo tarkastettu ja odottaa usein satamassa.",
      ],
    },
    {
      id: "titles",
      title: "Näin luet japanilaisen huutokauppalomakkeen",
      paras: [
        "Huutokauppalomake (auction sheet) on huutokaupan tarkastajan raportti – tärkein tietolähde autosta. Siinä on kokonaisarvosana, sisätilojen arvosana ja korin vauriokartta.",
        [
          "Kokonaisarvosana: S tai 6 – käytännössä uusi; 5 ja 4,5 – erittäin hyvä kunto; 4 – hyvä, pieniä käytön jälkiä; 3,5 ja 3 – näkyviä vikoja tai enemmän ajoa; R tai RA – korjattu kolarivaurio (RA – pieni korjaus); 0 tai *** – vaurioitunut, tulvan vahingoittama tai arvioimaton.",
          "Sisätilojen arvosana: A:sta (kuin uusi) E:hen (voimakkaasti kulunut).",
          "Vauriokartta: A – naarmu, U – lommo, B – lommo ja naarmu, W – epätasaisuus tai korjauksen jälkiä, S ja C – ruoste ja korroosio, P – maalijälkiä, X – vaihdettava osa, XX – vaihdettu osa, Y – halkeama tai reikä. Kirjaimen vieressä oleva numero (1–3) kertoo vaurion koon.",
        ],
        "Lomakkeessa näkyvät myös huutokaupan tarkastamat ajokilometrit, varustelu ja tarkastajan japaninkieliset huomautukset – hyvä viejä kääntää ne ennen tarjousta.",
      ],
    },
    {
      id: "inspection",
      title: "Mihin kiinnittää huomiota japanilaisissa autoissa",
      paras: [
        [
          "Ajokilometrit: japanilaisissa autoissa on yleensä todelliset, vähäiset ajokilometrit, mutta tarkista niiden historia huutokauppalomakkeesta ja vientitodistuksesta.",
          "Ruoste: pohjoisesta (Hokkaido) ja rannikkoalueilta tulevat autot voivat olla suolan syövyttämiä – katso kuvat pohjasta.",
          "Muutostyöt: urheiluautoissa on usein muutettu alusta, pakoputkisto ja moottori, mikä voi vaikeuttaa katsastusta EU:ssa.",
          "Nopeudenrajoittimet: monissa JDM-autoissa on tehdasasenteinen 180 km/h:n rajoitin.",
          "Elektroniikka: japanilaiset radiot käyttävät FM-taajuusaluetta 76–90 MHz, navigaattori ja valikot ovat japaniksi, ja ETC-tiemaksulaite on Euroopassa hyödytön.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Vienti ja kuljetus Japanista",
      paras: [
        "Oston jälkeen viejä poistaa auton rekisteristä ja hankkii Export Certificate -todistuksen – rekisteröinnin korvaavan asiakirjan, jossa on auton tiedot ja ajokilometrit. Sitä tarvitaan tulliselvitykseen ja rekisteröintiin EU:ssa yhdessä laskun ja konossementin (B/L) kanssa.",
        "Autot lähtevät pääasiassa Jokohamasta, Nagoyasta, Kobesta ja Osakasta. RoRo-alukset Eurooppaan kulkevat yleensä 5–7 viikossa (Suezin kanavan kautta tai Afrikan ympäri), kontit suunnilleen yhtä kauan tai hieman pidempään. Kontti on hyvä valinta arvokkaille tai liikkumattomille autoille.",
        "Yleisimmät määräsatamat ovat Bremerhaven, Rotterdam, Antwerpen ja Zeebrugge. Kuljetusvakuutus kannattaa – pitkällä merimatkalla vaurioriski on suurempi.",
      ],
    },
    {
      id: "duty",
      title: "Tulli ja EU:n ja Japanin sopimus",
      paras: [
        "EU:n ja Japanin talouskumppanuussopimus (EPA) poisti autojen tullin asteittain – vuodesta 2026 alkaen japanilaista alkuperää olevat autot voidaan tuoda EU:hun 0 %:n tullilla. Alkuperä osoitetaan viejän alkuperäilmoituksella tai tuojan tiedoilla (asiakirjat, jotka osoittavat auton valmistetun Japanissa).",
        "Japanissa valmistetut JDM-autot täyttävät yleensä ehdot. Varo muualla (esim. Yhdysvalloissa tai Thaimaassa) valmistettuja japanilaisia merkkejä – niistä maksetaan tavanomainen 10 % tullausarvosta. Ilman alkuperäselvitystä tulli on myös 10 %.",
        "Yli 30 vuotta vanhat alkuperäiskuntoiset autot voidaan katsoa keräilyajoneuvoiksi – silloin tulli on 0 %, ja jotkin maat perivät alennetun arvonlisäveron. Tulliselvityksen jälkeen rekisteröintimaassa sovelletaan moottoriin, päästöihin tai arvoon perustuvia kansallisia veroja.",
      ],
    },
    {
      id: "adaptation",
      title: "Oikeanpuoleinen ohjaus – rekisteröinti EU:ssa",
      paras: [
        "Oikealta ohjattavat autot voidaan rekisteröidä EU-maissa, jos ne täyttävät tekniset vaatimukset. Tärkeimmät muutokset ovat:",
        [
          "oikeanpuoleiseen liikenteeseen soveltuva ajovalokuvio (säätö tai lasien vaihto),",
          "takasumuvalo oikealla puolella ja keltaiset vilkut (japanilaisissa autoissa ne ovat yleensä jo valmiina),",
          "km/h-nopeusmittari – japanilaisissa autoissa se on tehtaalta.",
        ],
        "Jotkin maat, esim. Saksa, vaativat yksittäishyväksynnän tai asiantuntijalausunnon. Rekisteröintiin tarvitaan vientitodistuksen ja laskun käännökset, tulliselvitysasiakirja, todistus kansallisista veroista ja katsastus.",
      ],
    },
    {
      id: "mistakes",
      title: "Yleisimmät virheet tuotaessa autoa Japanista",
      paras: [
        [
          "Tarjoaminen ilman käännettyä huutokauppalomaketta.",
          "Ajan aliarviointi – ostosta rekisteröintiin kuluu usein 2–3 kuukautta.",
          "0 %:n tulliin luottaminen Japanin ulkopuolella valmistetun japanilaisen merkin kohdalla.",
          "Valojen muutostyön ja mahdollisen yksittäishyväksynnän kustannusten unohtaminen.",
          "Voimakkaasti muutetun auton ostaminen, joka ei läpäise katsastusta.",
          "Ei vakuutusta pitkälle merimatkalle.",
        ],
      ],
    },
  ],
  UAE: [
    {
      id: "market",
      title: "Arabiemiirikuntien automarkkinat",
      paras: [
        "Dubai ja muut emiirikunnat kuuluvat maailman suurimpiin luksusautojen markkinoihin. Uusien autojen kova kysyntä täyttää käytettyjen markkinat muutaman vuoden vanhoilla SUV-autoilla, urheiluautoilla ja premium-sedaneilla – usein Eurooppaa edullisemmin.",
        "Suurin osa Arabiemiirikunnissa myydyistä autoista on GCC-versioita (Persianlahden yhteistyöneuvosto), jotka on tehty kuumuuteen: tehokkaampi ilmastointi ja jäähdytys, joskus eri varustelu kuin Euroopassa. Lisäksi on paljon Yhdysvalloista tuotuja autoja – usein vaurioituneita – joita myydään edelleen ”tuontiautoina”.",
        "Arabiemiirikunnista tuodaan yleisimmin isoja SUV-autoja (Nissan Patrol, Toyota Land Cruiser, Lexus LX) sekä luksus- ja urheiluautoja. Enemmän ajetuissa autoissa kannattaa huomioida ilmaston vaikutukset.",
      ],
    },
    {
      id: "auctions",
      title: "Mistä ostaa auto Arabiemiirikunnista",
      paras: [
        "Autoja ostetaan autoliikkeistä (myös merkkien sertifioiduista vaihtoautoohjelmista), huutokaupoista kuten Emirates Auction ja Copart UAE sekä ilmoituksista. Dubaissa on myös suuret käytettyjen autojen markkinat ja paljon vientiyrityksiä, jotka palvelevat ulkomaisia ostajia.",
        "Ulkomailta ostettaessa turvallisinta on toimia luotettavan viejän kautta: viejä tarkistaa auton ja asiakirjat, poistaa sen rekisteristä, hankkii vientitodistuksen ja lähettää auton.",
      ],
    },
    {
      id: "titles",
      title: "Asiakirjat: Mulkiya ja vientitodistus",
      paras: [
        "Arabiemiirikuntien rekisteröintiasiakirja on liikenneviranomaisen (Dubaissa RTA) myöntämä Mulkiya-kortti. Vientiä varten auto on poistettava rekisteristä ja sille on hankittava vientitodistus (usein vientikilpien kanssa) – tärkein asiakirja tulliselvitykseen EU:ssa.",
        "Autolla ei saa olla maksamattomia sakkoja eikä pankin panttausta. Monet autot Arabiemiirikunnissa ostetaan luotolla – tarkista ennen ostoa, että laina on maksettu ja pankki on vapauttanut auton vientiin.",
      ],
    },
    {
      id: "inspection",
      title: "Näin tarkistat auton Arabiemiirikunnista",
      paras: [
        [
          "Alkuperä: tarkista VIN-numerolla, onko auto GCC-versio vai tullut Yhdysvalloista. Numerolla 1, 4 tai 5 alkava VIN tarkoittaa Yhdysvalloissa valmistettua autoa – tarkista silloin sen historia Yhdysvalloissa (vauriot, salvage-title).",
          "Tulvat: vuoden 2024 myrskyjen jälkeen markkinoille tuli paljon tulvan vahingoittamia autoja. Etsi vesijälkiä, lietettä ja korroosiota matkustamosta ja elektroniikasta.",
          "Ilmastovauriot: korkeat lämpötilat kuluttavat kumitiivisteitä, muoveja, akkuja, renkaita ja ilmastointia.",
          "Huoltohistoria: liikkeiden autoilla on yleensä täydelliset merkinnät – suuri etu jälleenmyynnissä.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Vienti ja kuljetus Arabiemiirikunnista",
      paras: [
        "Pääsatama on Jebel Ali Dubaissa. Matka eurooppalaisiin satamiin kestää yleensä 3–5 viikkoa reitistä (Punaisenmeren ja Suezin kanavan kautta tai Afrikan ympäri) ja määräsatamasta riippuen. Autot kulkevat konteissa tai RoRo-aluksilla.",
        "Tulliselvitys EU:ssa edellyttää vientitodistusta, laskua ja konossementtia (B/L). Autoille, jotka ovat aiemmin tulleet Arabiemiirikuntiin Yhdysvalloista, myös Yhdysvaltain historian asiakirjat ovat hyödyllisiä.",
      ],
    },
    {
      id: "duty",
      title: "Tulli tuotaessa Arabiemiirikunnista",
      paras: [
        "EU:lla ei ole Arabiemiirikuntien kanssa sopimusta, joka alentaisi autojen tullia, joten emiirikunnista tulevista autoista maksetaan tavanomainen 10 % tullausarvosta (CIF) ja tavara-autoiksi luokitelluista avolava-autoista 22 %. Tämä koskee myös Yhdysvalloissa valmistettuja autoja: amerikkalaisten autojen 0 %:n tulli edellyttää suoraa kuljetusta Yhdysvalloista.",
        "Tullin lisäksi peritään tulliselvitysmaan maahantuonnin arvonlisävero ja rekisteröintimaan kansalliset verot. Yli 30 vuotta vanhat alkuperäiskuntoiset autot voidaan katsoa keräilyajoneuvoiksi, joiden tulli on 0 %.",
      ],
    },
    {
      id: "adaptation",
      title: "EU-muutostyöt ja rekisteröinti",
      paras: [
        "GCC-versiot ovat vasemmalta ohjattavia, niissä on km/h-nopeusmittari ja yleensä eurooppalaista määrittelyä lähellä oleva valaistus, joten muutoksia tarvitaan usein vähemmän kuin yhdysvaltalaisissa autoissa. Tarkista silti vilkut, takasumuvalo ja ajovalot.",
        "Yhdysvalloista Arabiemiirikuntiin tuoduissa autoissa on amerikkalainen määrittely, ja ne tarvitsevat samat muutokset kuin suoraan Amerikasta ostetut autot. Jotkin EU-maat vaativat yksittäishyväksynnän.",
      ],
    },
    {
      id: "mistakes",
      title: "Yleisimmät virheet tuotaessa autoa Arabiemiirikunnista",
      paras: [
        [
          "”GCC”-autona myydyn amerikkalaisen auton ostaminen tarkistamatta VIN-numeroa ja historiaa.",
          "Maksamaton laina tai sakot, jotka estävät viennin.",
          "Tulvan ja kuumuuden aiheuttamien vaurioiden merkkien huomaamatta jättäminen.",
          "0 %:n tulliin luottaminen – Arabiemiirikunnista tulevista autoista maksetaan tavanomainen 10 %.",
        ],
      ],
    },
  ],
  UK: [
    {
      id: "market",
      title: "Britannian automarkkinat brexitin jälkeen",
      paras: [
        "Yhdistynyt kuningaskunta on suuri käytettyjen autojen markkina, jolla on valtava valikoima premium-, urheilu- ja klassikkoautoja. Brexitin jälkeen se on EU:lle kolmas maa, joten tuonti vaatii tulliselvityksen – mutta EU:n ja Yhdistyneen kuningaskunnan kauppa- ja yhteistyösopimuksen (TCA) ansiosta alkuperäsäännöt täyttävät autot voidaan tuoda 0 %:n tullilla.",
        "Kaikki brittiläiset autot ovat oikealta ohjattavia. Siksi yleisimmin tuodaan autoja, joissa sillä ei ole merkitystä tai jotka ovat poikkeuksellisen edullisia: klassikoita, keräilyautoja, harvinaisia versioita ja premium-autoja. Suosittua on myös tuoda takaisin eurooppalaisten merkkien autoja, jotka ovat aiemmin päätyneet Britanniaan.",
      ],
    },
    {
      id: "auctions",
      title: "Mistä ostaa auto Britanniasta",
      paras: [
        "Autoja ostetaan autoliikkeistä, ilmoituksista (esim. Auto Trader) ja huutokaupoista – kauppiashuutokaupoista (BCA, Manheim) ja vaurioautojen huutokaupoista (Copart UK). Monilla autoilla on dokumentoitu huoltohistoria.",
        "Vaurioautojen huutokaupoissa autoilla on vauriokategoria, joka sinun on ymmärrettävä ennen ostoa.",
      ],
    },
    {
      id: "titles",
      title: "Vauriokategoriat ja V5C",
      paras: [
        "Rekisteröintiasiakirja on V5C (logbook). Täystuhoiksi todetut autot saavat Britanniassa kategorian:",
        [
          "Cat S – rakenteelliset vauriot (esim. runkopalkit, pilarit); auto voidaan korjata ja palauttaa liikenteeseen.",
          "Cat N – ei-rakenteelliset vauriot (esim. elektroniikka, koripaneelit); auto voidaan korjata.",
          "Cat B – vain osiksi, kori on tuhottava.",
          "Cat A – vain romutettavaksi.",
        ],
        "Älä osta Cat A- tai Cat B -autoja ajettavaksi. Kategoriat S ja N tarkoittavat vakavia aiempia vaurioita – tarkista korjauksen laatu.",
      ],
    },
    {
      id: "inspection",
      title: "Näin tarkistat auton Britanniasta",
      paras: [
        [
          "MOT-historia: hallituksen gov.uk-sivustolla voit rekisterinumerolla tarkistaa maksutta kaikki MOT-katsastukset – kunkin vuoden mittarilukemineen ja vikaluetteloineen. Se on paras tapa paljastaa pyöritetty mittari.",
          "HPI-tarkistus (tai vastaava): näyttää maksamattoman rahoituksen, varkaudet ja sen, onko auto kirjattu täystuhoksi.",
          "Huoltohistoria ja omistajien määrä V5C:stä.",
          "Ajomäärä maileina – EU-rekisteröintiä varten nopeusmittarin on näytettävä myös km/h.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Vienti ja kuljetus Britanniasta",
      paras: [
        "Useimmat autot ylittävät Englannin kanaalin lautalla tai junalla (Dover–Calais, Eurotunnel), autonkuljetusautolla tai ajaen. Kuljetus kestää yleensä muutamasta päivästä viikkoon. Skotlannista tai Pohjois-Englannista autot voivat kulkea myös RoRo-aluksella Beneluxin ja Saksan satamiin.",
        "Brexitin jälkeen tarvitaan kaksi tulli-ilmoitusta: vienti-ilmoitus Britanniassa ja tuonti-ilmoitus EU:ssa – myös silloin, kun ajat auton itse. Ne hoitaa yleensä terminaalin tulliasiamies. Ajoneuvon haltija ilmoittaa lisäksi pysyvästä viennistä DVLA:lle V5C:n asianomaisella osalla.",
        "Ajaminen brittikilvillä rekisteröintimaahan edellyttää voimassa olevaa vakuutusta ja MOT-katsastusta – autonkuljetus on usein yksinkertaisempi.",
      ],
    },
    {
      id: "duty",
      title: "Tulli, TCA ja arvonlisävero",
      paras: [
        "EU:n ja Yhdistyneen kuningaskunnan kauppa- ja yhteistyösopimus (TCA) mahdollistaa 0 %:n tullin, mutta vain alkuperäsäännöt täyttäville autoille – käytännössä Britanniassa tai EU:ssa valmistetuille. Alkuperä osoitetaan viejän alkuperäilmoituksella tai tuojan tiedoilla. Britanniasta ostetusta japanilaisesta tai amerikkalaisesta autosta maksetaan tavanomainen 10 % tullausarvosta.",
        "Tulliselvitysmaan maahantuonnin arvonlisävero on maksettava tullista riippumatta. Kun ostat brittiläiseltä autoliikkeeltä, kysy, voidaanko kauppa tehdä vientimyyntinä ilman Britannian arvonlisäveroa – muuten maksat arvonlisäveron kahteen kertaan.",
        "Rekisteröintimaassa sovelletaan moottoriin, päästöihin tai arvoon perustuvia kansallisia veroja.",
      ],
    },
    {
      id: "adaptation",
      title: "Oikeanpuoleinen ohjaus ja rekisteröinti EU:ssa",
      paras: [
        "Brittiläiset autot on valmistettu eurooppalaisten tyyppihyväksyntäsääntöjen mukaan, joten niillä on usein vaatimustenmukaisuustodistus (COC) ja ne on helpompi rekisteröidä kuin yhdysvaltalaiset. Yleensä jäljelle jää:",
        [
          "ajovalot oikeanpuoleiseen liikenteeseen,",
          "takasumuvalo oikealla puolella,",
          "nopeusmittari km/h-asteikolla.",
        ],
        "Rekisteröinti edellyttää V5C:tä (tai todistusta viennistä), laskua, virallisia käännöksiä, tulliselvitysasiakirjaa, todistusta kansallisista veroista ja katsastusta.",
      ],
    },
    {
      id: "mistakes",
      title: "Yleisimmät virheet tuotaessa autoa Britanniasta",
      paras: [
        [
          "Oletus, että brexitin jälkeen kaikki on tullitonta – 0 % koskee vain alkuperäsäännöt täyttäviä autoja.",
          "Sekä Britannian arvonlisäveron että EU:n tuonnin arvonlisäveron maksaminen samasta autosta.",
          "Cat A- tai Cat B -auton ostaminen.",
          "MOT-historian ja HPI-raportin tarkistamatta jättäminen.",
          "Rajan ylittäminen ilman tulli-ilmoituksia, kun ajat auton itse.",
        ],
      ],
    },
  ],
};

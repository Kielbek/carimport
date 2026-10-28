import { OriginDeep } from './types';

export const ORIGIN_DEEP: OriginDeep = {
  USA: [
    {
      id: "market",
      title: "Der US-Automarkt – was sich zu importieren lohnt",
      paras: [
        "Die USA sind der größte Gebrauchtwagenmarkt der Welt: Jedes Jahr wechseln dort rund 40 Millionen Fahrzeuge den Besitzer, mehrere Millionen gehen über Versicherungsauktionen. Deshalb sind viele Modelle – vor allem beschädigte – deutlich günstiger als in Europa, und die Auswahl an Versionen ist riesig.",
        "Am ehesten lohnen sich Autos, die in Europa selten oder teuer sind: Muscle Cars mit großen V8-Motoren (Mustang, Camaro, Challenger), große SUVs und Pick-ups, gut ausgestattete Premiumversionen und Elektroautos, die in den USA schnell an Wert verlieren. Bei günstigen Kompaktwagen fressen Transport und Steuern die Ersparnis oft auf.",
        "Der Auktionspreis ist nur der Anfang. Dazu kommen Auktionsgebühren, Transport zum Hafen, Seefracht, Versicherung, Zoll, Einfuhrumsatzsteuer, nationale Steuern, EU-Umrüstung und eventuelle Reparatur. Erst die Summe zeigt, ob sich der Import lohnt – rechnen Sie sie also vor dem Bieten aus, nicht danach.",
      ],
    },
    {
      id: "auctions",
      title: "Copart- und IAAI-Auktionen – so kaufen Sie",
      paras: [
        "Copart und IAAI (Insurance Auto Auctions) verkaufen vor allem Autos von Versicherern, Autovermietungen und Banken – beschädigt, nach Diebstahl wiedergefunden, überflutet oder einfach aus der Flotte ausgemustert. Geboten wird online, das Auto steht auf einem von mehreren hundert Plätzen im ganzen Land. Der Standort zählt: Er bestimmt Kosten und Dauer des Transports zum Hafen.",
        "Käufer aus Europa bieten meist über einen Broker (Vermittler mit Auktionslizenz), denn viele Autos – besonders mit Salvage-Title – dürfen nur lizenzierte Käufer erwerben. Der Broker berechnet eine Provision und organisiert oft auch Transport und Exportpapiere.",
        "Zum Zuschlagspreis kommen Auktionsgebühren: eine Käufergebühr, die stufenweise mit dem Preis steigt, eine Gebühr für Online-Gebote, eine Gate Fee für die Abholung vom Platz, eine Umweltgebühr und eine Gebühr für die Title-Abwicklung. Bei einem Auto für einige tausend Dollar sind das zusammen meist einige hundert bis über tausend Dollar.",
        "Bezahlt werden muss innerhalb kurzer Zeit – meist weniger Werktage –, und das Auto muss abgeholt werden, bevor Standgebühren anfallen. Wer zu spät zahlt, riskiert eine Strafe und ein gesperrtes Konto. Halten Sie das Geld für Auto und Gebühren also vor dem Bieten bereit.",
      ],
    },
    {
      id: "titles",
      title: "Title-Arten: Clean, Salvage, Rebuilt",
      paras: [
        "In den USA wird das Eigentum durch einen vom Bundesstaat ausgestellten Title nachgewiesen. Seine Art verrät die Geschichte des Autos und ist für Kauf und Export wichtig:",
        [
          "Clean – kein Totalschaden in der Vorgeschichte; am teuersten, aber am wenigsten riskant.",
          "Salvage – die Versicherung hat einen Totalschaden festgestellt (die Reparaturkosten überstiegen einen Anteil am Fahrzeugwert). Der häufigste Title bei Copart und IAAI.",
          "Rebuilt / Reconstructed – ein ehemaliger Totalschaden, der repariert und in den USA wieder zugelassen wurde.",
          "Non-repairable, Certificate of Destruction, Parts only, Junk – nur für Teile. Kaufen Sie solche Autos nicht zum Fahren: Export und EU-Zulassung können unmöglich oder sehr schwierig sein.",
        ],
        "In der EU werden US-Title-Vermerke nicht in die Zulassungsbescheinigung übernommen. Ein Salvage-Auto kann zugelassen werden, wenn es nach der Reparatur die Hauptuntersuchung besteht. Der Title beeinflusst aber den Wiederverkaufswert und zeigt vor allem, dass das Auto einen schweren Schaden hatte – der fachgerecht repariert werden muss.",
      ],
    },
    {
      id: "inspection",
      title: "So prüfen Sie ein Auto vor dem Bieten",
      paras: [
        "Bei der Auktion sehen Sie das Auto nicht persönlich, daher zählt jedes Detail im Angebot. Bevor Sie bieten:",
        [
          "Prüfen Sie die VIN-Historie (z. B. Carfax, AutoCheck, NMVTIS-Datenbank): Schäden, Laufleistung, Zahl der Vorbesitzer, Diebstahl und Überflutung.",
          "Werten Sie Fotos und Schadensbeschreibung (Primary / Secondary Damage) aus. „Front End“ kann vom Stoßfänger bis zu verbogenen Längsträgern und ausgelösten Airbags alles bedeuten.",
          "Lesen Sie die Zustandsangaben genau: „Run and Drive“ heißt, das Auto ist bei Ankunft auf dem Platz gefahren – nicht, dass es verkehrstauglich ist; „Engine Starts“ heißt nur, dass der Motor angesprungen ist.",
          "Vorsicht bei Autos aus Hurrikan- und Hochwassergebieten (Florida, Texas, Louisiana). Wasserränder unter dem Teppich, Schlamm und korrodierte Steckverbindungen sind ein Grund, die Finger davon zu lassen.",
          "Die Laufleistung steht in Meilen (1 Meile = 1,61 km) und kann als „not actual“ oder „exempt“ markiert sein – dann ist der Tachostand nicht verlässlich.",
        ],
        "Planen Sie eine Reserve für versteckte Schäden ein – bis zu 20–30 % der geschätzten Reparaturkosten. Holen Sie Ersatzteilpreise aus Europa oder den USA ein, bevor Sie Ihr Höchstgebot festlegen.",
      ],
    },
    {
      id: "shipping",
      title: "Export und Seefracht",
      paras: [
        "Nach dem Kauf bringt ein Autotransporter das Auto vom Platz zum Exporthafen. Die gängigsten Häfen sind New Jersey/New York, Savannah (Georgia), Baltimore, Houston sowie Los Angeles/Long Beach. Von der Ostküste dauert die Überfahrt zu Nordseehäfen meist 2–3 Wochen, von Kalifornien durch den Panamakanal bis zu 5–6 Wochen.",
        "Für den Export braucht man den Original-Title (oder eine beglaubigte Kopie) und die Rechnung. Der Exporteur meldet die Electronic Export Information (EEI) im AES-System – bei Gebrauchtfahrzeugen unabhängig vom Wert – und Auto und Dokumente müssen dem US-Zoll (CBP) mindestens 72 Stunden vor Abfahrt des Schiffs vorgelegt werden.",
        "Es gibt drei Transportarten:",
        [
          "Sammelcontainer (meist 3–4 Autos in einem 40-Fuß-Container) – am beliebtesten, geeignet für beschädigte und nicht fahrbereite Autos.",
          "Exklusiver Container – teurer, aber das Auto reist allein und Sie können Teile beiladen.",
          "RoRo (Roll-on/Roll-off-Schiff) – oft am günstigsten, aber nur für fahrbereite Autos und mit weniger Schutz vor Schäden.",
        ],
        "Eine Transportversicherung lohnt sich – meist 1,5–2 % des Fahrzeugwerts. Im EU-Hafen wird der Container entladen und ein Zollagent verzollt das Auto. Entladung, Terminal und Agentur bezahlt man im Zielhafen.",
      ],
    },
    {
      id: "duty",
      title: "Zoll, Ursprung und Verzollung in der EU",
      paras: [
        "Der reguläre EU-Zoll auf Pkw beträgt 10 % des Zollwerts. Der Zollwert ist der Preis des Autos mit Auktionsgebühren plus Transport und Versicherung bis zur EU-Grenze (CIF-Wert). Pick-ups können als Nutzfahrzeuge eingestuft werden – dann beträgt der Zoll 22 % –, Motorräder zahlen 6–8 %.",
        "Vom 1. Juli 2026 bis Ende 2029 können in den USA gebaute Autos zollfrei in die EU eingeführt werden (Verordnung (EU) 2026/1455). Bedingung: Der US-Ursprung muss dem Zoll nachgewiesen werden, und das Auto muss direkt aus den USA verschifft werden. Eine Rechnung oder ein „Made in USA“-Schild allein reicht nicht – ein Ursprungsnachweis ist nötig. Die VIN gibt einen Hinweis: In den USA gebaute Autos haben eine VIN, die mit 1, 4 oder 5 beginnt. Auch eine japanische oder deutsche Marke aus amerikanischer Produktion kann sich qualifizieren, ein in Europa gebauter BMW, der in den USA gekauft wurde, dagegen nicht.",
        "Die Einfuhrumsatzsteuer richtet sich nach dem Satz des Landes, in dem verzollt wird. Bemessungsgrundlage ist der Zollwert plus Zoll und Transportkosten bis zum Bestimmungsort in der EU. Unternehmen können das Zollverfahren 4200 nutzen: im einen Land verzollen und die Steuer im Zulassungsland abrechnen.",
        "Nach der Verzollung kommen nationale Steuern – je nach Land eine Verbrauchsteuer (z. B. in Polen 3,1 % oder 18,6 % je nach Hubraum), eine Zulassungssteuer nach CO₂, Leistung oder Wert oder gar nichts. Sie entscheiden oft, ob sich der Import lohnt.",
      ],
    },
    {
      id: "adaptation",
      title: "EU-Umrüstung und Zulassung",
      paras: [
        "Autos für den US-Markt erfüllen einige europäische technische Vorschriften nicht und müssen vor der Hauptuntersuchung umgerüstet werden:",
        [
          "Die hinteren Blinker müssen gelb leuchten – bei vielen US-Autos blinken die roten Bremsleuchten.",
          "Eine Nebelschlussleuchte ist Pflicht.",
          "Die Scheinwerfer brauchen das europäische Abblendlicht und müssen korrekt eingestellt sein.",
          "Der Tacho sollte km/h anzeigen (eine Doppelskala genügt meist).",
          "US-Reifendrucksensoren (TPMS) arbeiten mit 315 MHz – in Europa ist 433 MHz üblich, was beim Räderwechsel wichtig ist.",
        ],
        "Die Lichtumrüstung kostet meist einige hundert Euro. In manchen Ländern – etwa Deutschland (Vollabnahme nach § 21 StVZO) oder Frankreich – braucht ein Auto von außerhalb der EU zusätzlich eine Einzelgenehmigung oder ein Gutachten, was Zeit und Geld kostet.",
        "Für die Zulassung brauchen Sie beglaubigte Übersetzungen von Title und Rechnung, den Verzollungsnachweis, den Nachweis der nationalen Steuern und das Prüfprotokoll. Viele Länder setzen eine gesetzliche Frist für die Zulassung eines importierten Autos – in Polen etwa 30 Tage.",
      ],
    },
    {
      id: "mistakes",
      title: "Die häufigsten Fehler beim Import aus den USA",
      paras: [
        [
          "Bieten, ohne die Gesamtkosten zu berechnen – Gebühren, Transport und Steuern können den Auktionspreis verdoppeln.",
          "Kauf eines Autos mit „Parts only“-Title oder Certificate of Destruction, das nicht legal zugelassen werden kann.",
          "Vertrauen auf „Run and Drive“, ohne die VIN-Historie zu prüfen.",
          "Keine Reserve für versteckte Schäden und Teile – die Reparatur eines Unfallautos kostet fast immer mehr, als die Fotos vermuten lassen.",
          "Mit 0 % Zoll rechnen, ohne den US-Ursprung nachweisen zu können – ohne Nachweis zahlen Sie 10 %.",
          "Zu späte Zahlung bei der Auktion und Standgebühren auf dem Platz.",
          "Versäumte Fristen für Zulassung oder Steuererklärung nach der Ankunft des Autos.",
        ],
      ],
    },
  ],
  CANADA: [
    {
      id: "market",
      title: "Der kanadische Automarkt – Unterschiede zu den USA",
      paras: [
        "Kanada ist kleiner als der US-Markt, bietet aber Ähnliches: dieselben Marken, Modelle und Ausstattungen, oft etwas günstiger als in Europa. Viele sehen Kanada als Alternative zu den USA, besonders bei Autos aus kanadischen Werken, die vom CETA-Abkommen profitieren können.",
        "Kanadische Autos haben einige Vorteile: Tacho in Kilometern, ab Werk Tagfahrlicht und wintertaugliche Ausstattung (Sitzheizung, manchmal Motorvorwärmer). Nachteil kann Korrosion sein – im Winter wird viel gestreut, und der Unterboden eines Autos aus Ontario oder Québec sieht oft schlechter aus als bei einem Auto aus dem Süden der USA.",
        "Am häufigsten importiert werden SUVs und Pick-ups, in Kanada gebaute Autos (z. B. Toyota RAV4, Lexus RX, Honda CR-V und Civic, Chrysler Pacifica) und Leasingrückläufer mit wenig Kilometern.",
      ],
    },
    {
      id: "auctions",
      title: "Wo man in Kanada ein Auto kauft",
      paras: [
        "Unfallautos verkaufen in Kanada Copart Canada und IAA (früher Impact Auto Auctions), unbeschädigte Autos Händlerauktionen wie ADESA sowie Händler. Wie in den USA kommt man bei vielen Auktionen nur über einen lizenzierten Broker zum Zug.",
        "Beliebt sind auch Käufe bei Händlern und Privatleuten über Kleinanzeigenportale. Beim Privatkauf müssen Sie Exportpapiere und Transport zum Hafen selbst organisieren – die meisten Käufer aus Europa beauftragen daher eine Exportfirma, die das Auto abholt, die Papiere prüft und es verschifft.",
        "Zum Preis kommen Auktions- oder Händlergebühren und – beim Händlerkauf – kanadische Verkaufssteuern (GST/HST/PST). Ein Teil davon kann erstattet oder gar nicht berechnet werden, wenn der Händler direkt für den Export verkauft – fragen Sie vor dem Kauf.",
      ],
    },
    {
      id: "titles",
      title: "Eigentumsdokumente und Schadensstatus",
      paras: [
        "In Kanada gibt es keinen „Title“ nach US-Vorbild – Dokument ist die Zulassung der Provinz (in Ontario die „Ownership“). Der Schadensstatus steht im Provinzregister:",
        [
          "Ontario und die meisten Provinzen: Normal, Salvage (Totalschaden, nicht zum Verkehr zugelassen), Rebuilt (repariert und nach Prüfung zugelassen) und Irreparable – nur für Teile.",
          "Québec: schwer beschädigte Fahrzeuge (VGA – véhicule gravement accidenté) mit dem Vermerk „reconstruit“ (wiederaufgebaut) oder „irrécupérable“ (nicht reparierbar).",
        ],
        "Kaufen Sie Autos mit Status Irreparable oder irrécupérable nicht zum Fahren – sie können nicht legal zugelassen werden. Andere Status werden nicht in die EU-Zulassung übernommen, beeinflussen aber den Wert und zeigen einen schweren Schaden an.",
      ],
    },
    {
      id: "inspection",
      title: "So prüfen Sie ein Auto aus Kanada",
      paras: [
        [
          "VIN-Historie: Ein CARFAX-Canada-Bericht zeigt Schäden, Zulassungen in den Provinzen und Laufleistung; bei Autos, die aus den USA kamen, prüfen Sie auch die US-Historie.",
          "Pfandrechte (Liens): In Kanada kann ein Auto als Kreditsicherheit dienen. Prüfen Sie im Pfandregister der Provinz (z. B. PPSA), ob das Auto lastenfrei ist – sonst kann der Export blockiert werden und Sie riskieren sogar den Verlust des Autos.",
          "Korrosion: Lassen Sie sich Fotos von Unterboden, Schwellern, Radläufen und Bremsleitungen schicken – Streusalz hinterlässt Spuren.",
          "Marktversion: Kanadische Autos sind US-Modellen meist sehr ähnlich und brauchen ähnliche Lichtumrüstungen.",
        ],
        "Für Auktionsautos gelten dieselben Regeln wie in den USA: Schadensfotos, die Bedeutung von „Run and Drive“ und eine Reserve für versteckte Schäden.",
      ],
    },
    {
      id: "shipping",
      title: "Export und Verschiffung aus Kanada",
      paras: [
        "Die wichtigsten Häfen sind Halifax und Montréal im Osten sowie Vancouver im Westen. Von der Ostküste dauert die Überfahrt zu Nordseehäfen meist etwa 2 Wochen – eine der schnellsten Routen nach Europa. Autos aus dem Westen fahren oft per Bahn nach Osten oder werden ab Vancouver durch den Panamakanal verschifft, was länger dauert.",
        "Für den Export braucht man das Eigentumsdokument (Provinzzulassung), den Kaufnachweis und eine Ausfuhranmeldung im CBSA-System (CERS), die meist der Exporteur oder Spediteur abgibt. Das Auto muss lastenfrei sein.",
        "Die Transportarten sind dieselben wie aus den USA: Sammelcontainer, exklusiver Container oder RoRo für fahrbereite Autos. Im Winter ist mit Verzögerungen beim Landtransport zum Hafen zu rechnen.",
      ],
    },
    {
      id: "duty",
      title: "Zoll und das CETA-Abkommen",
      paras: [
        "Dank des Handelsabkommens EU–Kanada (CETA) können in Kanada gebaute Autos zollfrei in die EU eingeführt werden. Voraussetzung ist der kanadische Ursprung, bestätigt durch eine Ursprungserklärung des Exporteurs. Der Kauf in Kanada allein genügt nicht – viele dort verkaufte Autos stammen aus den USA, Mexiko oder Japan und zahlen die vollen 10 %.",
        "Eine VIN, die mit „2“ beginnt, bedeutet: in Kanada gebaut. Das ist ein guter Hinweis, aber kein Nachweis – beim Kauf von Privat ist eine Ursprungserklärung oft schwer zu bekommen, und ohne sie beträgt der Zoll 10 % des Zollwerts (CIF). Als Nutzfahrzeuge eingestufte Pick-ups zahlen 22 %.",
        "Auf den Zoll kommt die Einfuhrumsatzsteuer des Verzollungslandes, im Zulassungsland die nationalen Steuern (Verbrauch- oder Zulassungssteuer). Unternehmen können das Verfahren 4200 nutzen und die Steuer im Bestimmungsland abrechnen.",
      ],
    },
    {
      id: "adaptation",
      title: "EU-Umrüstung und Zulassung",
      paras: [
        "Kanadische Autos sind etwas leichter zuzulassen als US-Autos: Sie haben einen km/h-Tacho und ab Werk Tagfahrlicht. Meist muss man dennoch:",
        [
          "die hinteren Blinker auf Gelb umrüsten, wenn die Bremsleuchten blinken,",
          "eine Nebelschlussleuchte nachrüsten,",
          "die Scheinwerfer an das europäische Abblendlicht anpassen.",
        ],
        "Für die Zulassung braucht man beglaubigte Übersetzungen, den Verzollungsnachweis, den Nachweis der nationalen Steuern und eine Hauptuntersuchung. In Ländern wie Deutschland oder Frankreich kann eine Einzelgenehmigung nötig sein.",
      ],
    },
    {
      id: "mistakes",
      title: "Die häufigsten Fehler beim Import aus Kanada",
      paras: [
        [
          "Annehmen, jedes Auto aus Kanada sei zollfrei – das gilt nur für in Kanada gebaute Autos mit Ursprungserklärung.",
          "Vor dem Kauf nicht nach Pfandrechten (Liens) suchen.",
          "Unterbodenkorrosion bei Autos aus Provinzen mit harten Wintern übersehen.",
          "Ein Auto mit Status Irreparable oder irrécupérable kaufen.",
          "Den Landtransport aus den westlichen Provinzen zu den Häfen im Osten unterschätzen.",
        ],
      ],
    },
  ],
  JAPAN: [
    {
      id: "market",
      title: "Der japanische Automarkt – warum JDM",
      paras: [
        "Japan ist bekannt für Autos in sehr gutem technischen Zustand mit wenig Kilometern. Grund ist die strenge Shaken-Prüfung, die mit dem Fahrzeugalter immer teurer wird – viele Japaner verkaufen daher nach wenigen Jahren, und ältere Autos verlieren schnell an Wert.",
        "Importiert werden vor allem JDM-Autos (Japanese Domestic Market): Sportlegenden (Nissan Skyline GT-R, Toyota Supra, Mazda RX-7, Honda NSX), Geländewagen (Toyota Land Cruiser), Minivans und neuere Hybride. Für Sammler zählen vor allem Modelle, die nie offiziell in Europa verkauft wurden.",
        "Alle Autos vom japanischen Markt sind Rechtslenker. Sie können in der EU zugelassen werden, sind im Rechtsverkehr aber weniger komfortabel und mitunter schwerer wiederzuverkaufen – außer gesuchten Sammlermodellen.",
      ],
    },
    {
      id: "auctions",
      title: "Auktionen in Japan – USS und andere",
      paras: [
        "Die meisten Gebrauchtwagen in Japan laufen über Händlerauktionen. Die größte ist das USS-Netz, daneben u. a. TAA, CAA, HAA, JU und Arai. Jede Woche werden dort Zehntausende Autos angeboten.",
        "Ausländische Käufer bieten nicht selbst – das übernimmt ein japanischer Exporteur (Auktionsagent): Er hat Zugang zu den Auktionen, übersetzt das Auktionsblatt, kauft das Auto, meldet es für den Export ab und verschifft es. Zum Zuschlagspreis kommen Auktionsgebühr, Provision des Exporteurs, Transport zum Hafen und Exportdokumente. Bezahlt wird meist in Yen.",
        "Man kann auch aus dem Bestand eines Exporteurs kaufen – das kann teurer sein, dafür ist das Auto bereits geprüft und steht oft schon im Hafen.",
      ],
    },
    {
      id: "titles",
      title: "Das japanische Auktionsblatt lesen",
      paras: [
        "Das Auktionsblatt (Auction Sheet) ist der Bericht des Auktionsprüfers – die wichtigste Informationsquelle über das Auto. Es enthält eine Gesamtnote, eine Innenraumnote und eine Schadenskarte der Karosserie.",
        [
          "Gesamtnote: S oder 6 – praktisch neu; 5 und 4,5 – sehr guter Zustand; 4 – guter Zustand mit leichten Gebrauchsspuren; 3,5 und 3 – sichtbare Mängel oder höhere Laufleistung; R oder RA – reparierter Unfallschaden (RA – kleine Reparatur); 0 oder *** – beschädigt, überflutet oder ohne Bewertung.",
          "Innenraumnote: von A (wie neu) bis E (stark abgenutzt).",
          "Schadenskarte: A – Kratzer, U – Delle, B – Delle mit Kratzer, W – Welle oder Reparaturspuren, S und C – Rost und Korrosion, P – Lackspuren, X – zu ersetzendes Teil, XX – ersetztes Teil, Y – Riss oder Loch. Die Zahl neben dem Buchstaben (1–3) gibt die Größe des Schadens an.",
        ],
        "Das Blatt zeigt auch die von der Auktion geprüfte Laufleistung, die Ausstattung und Anmerkungen des Prüfers auf Japanisch – ein guter Exporteur übersetzt sie vor dem Bieten.",
      ],
    },
    {
      id: "inspection",
      title: "Worauf man bei Autos aus Japan achten sollte",
      paras: [
        [
          "Laufleistung: Japanische Autos haben meist echte, niedrige Laufleistungen, prüfen Sie den Verlauf aber im Auktionsblatt und im Exportzertifikat.",
          "Rost: Autos aus dem Norden (Hokkaido) und aus Küstengebieten können durch Salz korrodiert sein – sehen Sie sich Fotos des Unterbodens an.",
          "Umbauten: Sportwagen haben oft geändertes Fahrwerk, Auspuff und Motor, was die Hauptuntersuchung in der EU erschweren kann.",
          "Begrenzer: Viele JDM-Autos sind ab Werk auf 180 km/h begrenzt.",
          "Elektronik: Japanische Radios nutzen das UKW-Band 76–90 MHz, Navigation und Menüs sind auf Japanisch, und das ETC-Mautgerät ist in Europa nutzlos.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Export und Verschiffung aus Japan",
      paras: [
        "Nach dem Kauf meldet der Exporteur das Auto ab und besorgt das Exportzertifikat (Export Certificate) – das Dokument, das die Zulassung ersetzt, mit Fahrzeugdaten und Laufleistung. Es wird zusammen mit Rechnung und Konnossement (B/L) für Verzollung und Zulassung in der EU gebraucht.",
        "Die Autos laufen vor allem in Yokohama, Nagoya, Kobe und Osaka aus. RoRo-Schiffe nach Europa brauchen meist 5–7 Wochen (durch den Suezkanal oder um Afrika), Container ähnlich lange oder etwas länger. Für wertvolle oder nicht fahrbereite Autos ist ein Container eine gute Wahl.",
        "Die häufigsten Zielhäfen sind Bremerhaven, Rotterdam, Antwerpen und Zeebrügge. Eine Transportversicherung lohnt sich – auf einer langen Reise ist das Schadensrisiko höher.",
      ],
    },
    {
      id: "duty",
      title: "Zoll und das Abkommen EU–Japan",
      paras: [
        "Das Wirtschaftspartnerschaftsabkommen EU–Japan (EPA) hat den Zoll auf Autos schrittweise abgebaut – seit 2026 können Autos japanischen Ursprungs zollfrei in die EU eingeführt werden. Der Ursprung wird durch eine Ursprungserklärung des Exporteurs oder durch Kenntnis des Einführers (Unterlagen über die Fertigung in Japan) nachgewiesen.",
        "In Japan gebaute JDM-Autos qualifizieren sich in der Regel. Vorsicht bei japanischen Marken, die anderswo gebaut wurden (z. B. in den USA oder Thailand) – sie zahlen die regulären 10 % des Zollwerts. Ohne Ursprungsnachweis beträgt der Zoll ebenfalls 10 %.",
        "Autos über 30 Jahre in Originalzustand können als Sammlerfahrzeuge gelten – dann beträgt der Zoll 0 % und manche Länder erheben weniger Einfuhrumsatzsteuer. Nach der Verzollung fallen im Zulassungsland nationale Steuern je nach Motor, Emission oder Wert an.",
      ],
    },
    {
      id: "adaptation",
      title: "Rechtslenker – Zulassung in der EU",
      paras: [
        "Rechtslenker können in EU-Ländern zugelassen werden, wenn sie die technischen Anforderungen erfüllen. Die wichtigsten Änderungen:",
        [
          "Scheinwerfer für Rechtsverkehr (Einstellung oder Tausch der Streuscheiben),",
          "Nebelschlussleuchte auf der richtigen Seite und gelbe Blinker (japanische Autos haben sie meist schon),",
          "Tacho in km/h – japanische Autos haben ihn ab Werk.",
        ],
        "Manche Länder, etwa Deutschland, verlangen eine Einzelgenehmigung oder ein Gutachten. Für die Zulassung braucht man Übersetzungen von Exportzertifikat und Rechnung, den Verzollungsnachweis, den Nachweis der nationalen Steuern und eine Hauptuntersuchung.",
      ],
    },
    {
      id: "mistakes",
      title: "Die häufigsten Fehler beim Import aus Japan",
      paras: [
        [
          "Bieten ohne übersetztes Auktionsblatt.",
          "Die Dauer unterschätzen – vom Kauf bis zur Zulassung vergehen oft 2–3 Monate.",
          "0 % Zoll für eine japanische Marke annehmen, die außerhalb Japans gebaut wurde.",
          "Die Kosten der Lichtumrüstung und einer möglichen Einzelgenehmigung vergessen.",
          "Ein stark modifiziertes Auto kaufen, das die Hauptuntersuchung nicht besteht.",
          "Keine Versicherung für die lange Seereise.",
        ],
      ],
    },
  ],
  UAE: [
    {
      id: "market",
      title: "Der Automarkt in den Vereinigten Arabischen Emiraten",
      paras: [
        "Dubai und die anderen Emirate gehören zu den größten Märkten für Luxusautos weltweit. Die hohe Nachfrage nach Neuwagen füllt den Gebrauchtmarkt mit wenige Jahre alten SUVs, Sportwagen und Premiumlimousinen – oft günstiger als in Europa.",
        "Die meisten in den VAE verkauften Autos sind GCC-Versionen (Gulf Cooperation Council) für große Hitze: stärkere Klimaanlage und Kühlung, teils andere Ausstattung als in Europa. Es gibt auch viele aus den USA eingeführte Autos – oft Unfallwagen –, die als „Import“ weiterverkauft werden.",
        "Am häufigsten importiert werden große SUVs (Nissan Patrol, Toyota Land Cruiser, Lexus LX), Luxus- und Sportwagen. Bei Autos mit höherer Laufleistung sollte man die Folgen des Klimas bedenken.",
      ],
    },
    {
      id: "auctions",
      title: "Wo man in den VAE ein Auto kauft",
      paras: [
        "Autos kauft man bei Händlern (auch aus zertifizierten Gebrauchtwagenprogrammen der Marken), auf Auktionen wie Emirates Auction und Copart VAE sowie über Kleinanzeigen. In Dubai gibt es zudem einen großen Gebrauchtwagenmarkt mit vielen Exportfirmen für ausländische Käufer.",
        "Beim Kauf aus dem Ausland ist ein vertrauenswürdiger Exporteur der sicherste Weg: Er prüft Auto und Dokumente, meldet das Auto ab, besorgt das Exportzertifikat und verschifft es.",
      ],
    },
    {
      id: "titles",
      title: "Dokumente: Mulkiya und Exportzertifikat",
      paras: [
        "Zulassungsdokument in den VAE ist die Mulkiya-Karte der Verkehrsbehörde (in Dubai die RTA). Für den Export muss das Auto abgemeldet und ein Exportzertifikat ausgestellt werden (oft mit Exportkennzeichen) – das zentrale Dokument für die Verzollung in der EU.",
        "Das Auto darf keine offenen Bußgelder und kein Bankpfandrecht haben. Viele Autos in den VAE werden finanziert – prüfen Sie vor dem Kauf, ob der Kredit abbezahlt ist und die Bank das Auto für den Export freigegeben hat.",
      ],
    },
    {
      id: "inspection",
      title: "So prüfen Sie ein Auto aus den VAE",
      paras: [
        [
          "Herkunft: Prüfen Sie anhand der VIN, ob das Auto eine GCC-Version ist oder aus den USA kam. Eine VIN mit 1, 4 oder 5 am Anfang bedeutet: in den USA gebaut – prüfen Sie dann die US-Historie (Schäden, Salvage-Title).",
          "Überflutung: Nach den Unwettern 2024 kamen viele Autos mit Wasserschäden auf den Markt. Achten Sie auf Wasserränder, Schlamm und Korrosion im Innenraum und an der Elektronik.",
          "Klimaschäden: Hohe Temperaturen setzen Gummidichtungen, Kunststoffen, Batterien, Reifen und Klimaanlage zu.",
          "Wartungshistorie: Händlerautos haben meist lückenlose Nachweise – ein großes Plus beim Wiederverkauf.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Export und Verschiffung aus den VAE",
      paras: [
        "Der wichtigste Hafen ist Jebel Ali in Dubai. Die Überfahrt nach Europa dauert meist 3–5 Wochen, je nach Route (durch das Rote Meer und den Suezkanal oder um Afrika) und Zielhafen. Die Autos reisen im Container oder auf RoRo-Schiffen.",
        "Für die Verzollung in der EU braucht man Exportzertifikat, Rechnung und Konnossement (B/L). Bei Autos, die vorher aus den USA in die VAE kamen, sind auch Unterlagen aus der US-Historie nützlich.",
      ],
    },
    {
      id: "duty",
      title: "Zoll bei Importen aus den VAE",
      paras: [
        "Die EU hat mit den VAE kein Abkommen, das den Autozoll senkt – Autos aus den Emiraten zahlen daher regulär 10 % des Zollwerts (CIF), als Nutzfahrzeuge eingestufte Pick-ups 22 %. Das gilt auch für in den USA gebaute Autos: Die Zollfreiheit für amerikanische Autos setzt die Verschiffung direkt aus den USA voraus.",
        "Auf den Zoll kommt die Einfuhrumsatzsteuer des Verzollungslandes, im Zulassungsland die nationalen Steuern. Autos über 30 Jahre im Originalzustand können als Sammlerfahrzeuge mit 0 % Zoll gelten.",
      ],
    },
    {
      id: "adaptation",
      title: "EU-Umrüstung und Zulassung",
      paras: [
        "GCC-Versionen sind Linkslenker, haben einen km/h-Tacho und meist eine Beleuchtung nahe am europäischen Standard – die Umrüstung fällt daher oft kleiner aus als bei US-Autos. Prüfen Sie trotzdem Blinker, Nebelschlussleuchte und Scheinwerfer.",
        "Aus den USA in die VAE gebrachte Autos haben US-Spezifikation und brauchen dieselben Umrüstungen wie direkt in Amerika gekaufte. Manche EU-Länder verlangen eine Einzelgenehmigung.",
      ],
    },
    {
      id: "mistakes",
      title: "Die häufigsten Fehler beim Import aus den VAE",
      paras: [
        [
          "Ein als „GCC“ verkauftes US-Auto kaufen, ohne VIN und Historie zu prüfen.",
          "Offener Kredit oder Bußgelder, die den Export blockieren.",
          "Spuren von Überflutung und Hitzeschäden übersehen.",
          "Auf 0 % Zoll hoffen – Autos aus den VAE zahlen regulär 10 %.",
        ],
      ],
    },
  ],
  UK: [
    {
      id: "market",
      title: "Der britische Automarkt nach dem Brexit",
      paras: [
        "Großbritannien ist ein großer Gebrauchtwagenmarkt mit riesiger Auswahl an Premium-, Sport- und Klassikautos. Seit dem Brexit ist es für die EU ein Drittland, daher braucht ein Import eine Verzollung – dank des Handels- und Kooperationsabkommens EU–UK (TCA) können Autos, die die Ursprungsregeln erfüllen, aber zollfrei eingeführt werden.",
        "Alle britischen Autos sind Rechtslenker. Deshalb werden vor allem Autos importiert, bei denen das keine Rolle spielt oder die besonders preiswert sind: Klassiker, Sammlerautos, seltene Versionen und Premiumautos. Beliebt ist auch das Zurückholen von Autos europäischer Marken, die zuvor ins UK gingen.",
      ],
    },
    {
      id: "auctions",
      title: "Wo man in Großbritannien ein Auto kauft",
      paras: [
        "Autos kauft man bei Händlern, über Kleinanzeigen (z. B. Auto Trader) und auf Auktionen – Händlerauktionen (BCA, Manheim) und Unfallwagenauktionen (Copart UK). Viele Autos haben ein dokumentiertes Serviceheft.",
        "Auf Unfallwagenauktionen tragen die Autos eine Schadenskategorie, die man vor dem Kauf kennen muss.",
      ],
    },
    {
      id: "titles",
      title: "Schadenskategorien und das V5C",
      paras: [
        "Zulassungsdokument ist das V5C (Logbook). Totalschäden erhalten in Großbritannien eine Kategorie:",
        [
          "Cat S – struktureller Schaden (z. B. Längsträger, Säulen); das Auto kann repariert werden und zurück auf die Straße.",
          "Cat N – nicht struktureller Schaden (z. B. Elektronik, Karosserieteile); das Auto kann repariert werden.",
          "Cat B – nur für Teile, die Karosserie muss verschrottet werden.",
          "Cat A – nur zur Verschrottung.",
        ],
        "Kaufen Sie Autos der Kategorien A und B nicht zum Fahren. Kategorien S und N bedeuten einen schweren früheren Schaden – prüfen Sie die Qualität der Reparatur.",
      ],
    },
    {
      id: "inspection",
      title: "So prüfen Sie ein Auto aus Großbritannien",
      paras: [
        [
          "MOT-Historie: Auf der Regierungsseite gov.uk prüfen Sie kostenlos anhand des Kennzeichens alle MOT-Prüfungen – mit dem Kilometerstand jedes Jahres und der Mängelliste. So erkennen Sie am besten einen manipulierten Tacho.",
          "HPI-Check (oder ähnlich): zeigt offene Finanzierungen, Diebstahl und ob das Auto als Totalschaden registriert wurde.",
          "Serviceheft und Zahl der Halter aus dem V5C.",
          "Laufleistung in Meilen – der Tacho muss für die EU-Zulassung auch km/h anzeigen.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Ausfuhr und Transport aus Großbritannien",
      paras: [
        "Die meisten Autos überqueren den Ärmelkanal per Fähre oder Zug (Dover–Calais, Eurotunnel), auf dem Transporter oder auf eigener Achse. Der Transport dauert meist einige Tage bis eine Woche. Autos aus Schottland oder Nordengland können auch per RoRo-Schiff in Häfen in Benelux und Deutschland gelangen.",
        "Seit dem Brexit sind zwei Zollanmeldungen nötig: eine Ausfuhranmeldung im UK und eine Einfuhranmeldung in der EU – auch wenn Sie das Auto selbst fahren. Meist erledigt das ein Zollagent am Terminal. Der Halter meldet außerdem der DVLA die dauerhafte Ausfuhr über den entsprechenden Teil des V5C.",
        "Die Fahrt mit britischen Kennzeichen ins Zulassungsland erfordert gültige Versicherung und MOT – ein Transporter ist oft einfacher.",
      ],
    },
    {
      id: "duty",
      title: "Zoll, TCA und Mehrwertsteuer",
      paras: [
        "Das Handels- und Kooperationsabkommen EU–UK (TCA) erlaubt 0 % Zoll, aber nur für Autos, die die Ursprungsregeln erfüllen – praktisch also im UK oder in der EU gebaute. Der Ursprung wird durch eine Ursprungserklärung des Exporteurs oder Kenntnis des Einführers nachgewiesen. Ein japanisches oder amerikanisches Auto, das im UK gekauft wurde, zahlt die regulären 10 % des Zollwerts.",
        "Unabhängig vom Zoll fällt die Einfuhrumsatzsteuer des Verzollungslandes an. Fragen Sie beim Kauf von einem britischen Händler, ob ein Exportverkauf ohne britische Mehrwertsteuer möglich ist – sonst zahlen Sie die Steuer doppelt.",
        "Im Zulassungsland kommen nationale Steuern je nach Motor, Emission oder Wert hinzu.",
      ],
    },
    {
      id: "adaptation",
      title: "Rechtslenker und Zulassung in der EU",
      paras: [
        "Britische Autos wurden nach europäischen Typgenehmigungsregeln gebaut, haben daher oft eine Übereinstimmungsbescheinigung (COC) und sind leichter zuzulassen als US-Autos. Meist bleibt:",
        [
          "Scheinwerfer für Rechtsverkehr,",
          "Nebelschlussleuchte auf der richtigen Seite,",
          "Tacho mit km/h-Skala.",
        ],
        "Für die Zulassung braucht man das V5C (oder einen Ausfuhrnachweis), die Rechnung, beglaubigte Übersetzungen, den Verzollungsnachweis, den Nachweis der nationalen Steuern und eine Hauptuntersuchung.",
      ],
    },
    {
      id: "mistakes",
      title: "Die häufigsten Fehler beim Import aus Großbritannien",
      paras: [
        [
          "Annehmen, nach dem Brexit sei alles zollfrei – 0 % gilt nur für Autos, die die Ursprungsregeln erfüllen.",
          "Britische Mehrwertsteuer und EU-Einfuhrumsatzsteuer für dasselbe Auto zahlen.",
          "Ein Auto der Kategorie A oder B kaufen.",
          "MOT-Historie und HPI-Bericht nicht prüfen.",
          "Beim Selbstfahren die Grenze ohne Zollanmeldungen überqueren.",
        ],
      ],
    },
  ],
};

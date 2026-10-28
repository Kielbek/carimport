import { OriginDeep } from './types';

export const ORIGIN_DEEP: OriginDeep = {
  USA: [
    {
      id: 'market',
      title: 'The US car market – what is worth importing',
      paras: [
        'The United States is the world\'s largest used-car market: around 40 million vehicles change hands there every year, and several million go through insurance auctions. That is why many models – especially damaged ones – are clearly cheaper than in Europe, and the choice of versions is huge.',
        'It usually pays to import cars that are rare or expensive in Europe: muscle cars with big V8 engines (Mustang, Camaro, Challenger), full-size SUVs and pickups, well-equipped premium versions and electric cars, which lose value quickly in the US. With cheaper compact cars, shipping and taxes often eat up the saving.',
        'Remember that the auction price is only the start. Auction fees, transport to the port, freight, insurance, duty, VAT, national taxes, EU adaptation and any repair all come on top. Only the total tells you whether the import pays off – so work it out before you bid, not after.',
      ],
    },
    {
      id: 'auctions',
      title: 'Copart and IAAI auctions – how to buy',
      paras: [
        'Copart and IAAI (Insurance Auto Auctions) mainly sell cars from insurers, rental companies and banks – damaged, recovered after theft, flooded or simply retired from a fleet. Bidding happens online, while the car stands in one of several hundred yards across the country. The location matters: it decides the cost and time of getting the car to the port.',
        'A buyer from Europe usually bids through a broker (an intermediary with an auction licence), because many cars – especially with a salvage title – can only be bought by licensed buyers. The broker charges a commission and often also arranges transport and export paperwork.',
        'On top of the hammer price come the auction fees: a buyer fee that rises in steps with the price, an online bidding fee, a gate fee for leaving the yard, an environmental fee and a title handling fee. For a car of a few thousand dollars that is usually several hundred to over a thousand dollars in total.',
        'Payment is due within a short time – usually a few business days – and the car must be collected from the yard before storage fees start. Paying late means a penalty and a blocked account, so have the money for the car and fees ready before you bid.',
      ],
    },
    {
      id: 'titles',
      title: 'Title types: clean, salvage, rebuilt',
      paras: [
        'In the US, ownership is proven by a title issued by the state. Its type tells the car\'s history and matters for buying and export:',
        [
          'Clean – no total loss in the car\'s history; the most expensive but least risky.',
          'Salvage – the insurer declared a total loss (repair cost exceeded a share of the car\'s value). The most common title at Copart and IAAI.',
          'Rebuilt / Reconstructed – a former total loss that was repaired and allowed back on the road in the US.',
          'Non-repairable, Certificate of Destruction, Parts only, Junk – for parts only. Do not buy these to drive: export and EU registration can be impossible or very difficult.',
        ],
        'In the European Union, US title brands do not carry over to the registration document. A salvage car can be registered if it passes the roadworthiness test after repair. The title still affects the resale value and, above all, tells you the car had serious damage – which must be repaired properly.',
      ],
    },
    {
      id: 'inspection',
      title: 'How to check a car before bidding',
      paras: [
        'You cannot see the car in person at the auction, so every detail in the listing counts. Before you bid:',
        [
          'Check the VIN history (e.g. Carfax, AutoCheck, the NMVTIS database): damage, mileage, number of owners, theft and flooding.',
          'Study the photos and damage description (primary / secondary damage). "Front end" can mean anything from a bumper to bent chassis rails and deployed airbags.',
          'Read the condition labels carefully: "Run and Drive" means the car moved when it arrived at the yard, not that it is roadworthy; "Engine Starts" means the engine only started.',
          'Be careful with cars from hurricane and flood areas (Florida, Texas, Louisiana). Water marks under the carpet, silt and corroded electrical connectors are a reason to walk away.',
          'Mileage is in miles (1 mile = 1.61 km) and may be marked "not actual" or "exempt" – then the odometer cannot be trusted.',
        ],
        'It is sensible to keep a reserve for hidden damage – as much as 20–30% of the estimated repair cost. Get a quote for parts from Europe or the US before you set your maximum bid.',
      ],
    },
    {
      id: 'shipping',
      title: 'Export and ocean freight',
      paras: [
        'After purchase, a car carrier takes the car from the yard to the export port. The most common ports are New Jersey/New York, Savannah (Georgia), Baltimore, Houston and Los Angeles/Long Beach. From the East Coast, the voyage to North Sea ports usually takes 2–3 weeks; from California through the Panama Canal up to 5–6 weeks.',
        'Export requires the original title (or a certified copy) and the invoice. The exporter files the Electronic Export Information (EEI) in AES – required for used vehicles regardless of value – and the car and documents must be presented to US Customs (CBP) at least 72 hours before the ship sails.',
        'There are three ways to ship:',
        [
          'Shared container (usually 3–4 cars in a 40-foot container) – the most popular, suitable for damaged and non-running cars.',
          'Exclusive container – more expensive, but the car travels alone and you can add parts.',
          'RoRo (roll-on/roll-off ship) – often the cheapest, but only for running cars and with less protection against damage.',
        ],
        'Cargo insurance is worth taking – usually 1.5–2% of the car\'s value. At the EU port the container is unloaded and a customs agent clears the car. Unloading, terminal and agency fees are paid at the destination port.',
      ],
    },
    {
      id: 'duty',
      title: 'Duty, origin and EU customs clearance',
      paras: [
        'The standard EU duty on passenger cars is 10% of the customs value. The customs value is the price of the car with auction fees plus transport and insurance to the EU border (the CIF value). Pickups may be classified as goods vehicles – then the duty is 22% – and motorcycles pay 6–8%.',
        'From 1 July 2026 until the end of 2029, cars made in the US can enter the EU at 0% duty (Regulation (EU) 2026/1455). The condition: you must prove the car\'s US origin to customs, and the car must be shipped directly from the US. An invoice or a "Made in USA" label alone is not enough – proof of origin is needed. The VIN gives a hint: cars built in the US have a VIN starting with 1, 4 or 5. A Japanese or German brand assembled in America can also qualify, while a European-built BMW bought in the US cannot.',
        'Import VAT is charged at the rate of the country where the car is cleared. The VAT base is the customs value plus duty and transport costs to the destination in the EU. Businesses can use customs procedure 4200: clear the car in one country and account for VAT in the country of registration.',
        'After clearance come national taxes – depending on the country an excise duty (e.g. 3.1% or 18.6% in Poland depending on engine size), a registration tax based on CO₂, power or value, or nothing at all. These often decide whether the import pays off.',
      ],
    },
    {
      id: 'adaptation',
      title: 'EU adaptation and registration',
      paras: [
        'Cars built for the US market do not meet some European technical rules, so they need changes before the roadworthiness test:',
        [
          'Rear turn signals must be amber – on many US cars the red brake lights flash instead.',
          'A rear fog light is required.',
          'Headlights must have the European dipped-beam pattern and be correctly aimed.',
          'The speedometer should show km/h (a dual scale is usually enough).',
          'US tyre pressure sensors (TPMS) work at 315 MHz – 433 MHz is common in Europe, which matters when you change wheels.',
        ],
        'Converting the lights usually costs a few hundred euro. In some countries – e.g. Germany or France – a car from outside the EU also needs an individual approval or an expert report before registration, which can take time and money.',
        'For registration, prepare sworn translations of the title and invoice, the customs clearance document, proof of national tax payment and the roadworthiness certificate. Many countries set a legal deadline for registering an imported car – in Poland, for example, 30 days.',
      ],
    },
    {
      id: 'mistakes',
      title: 'The most common mistakes when importing from the US',
      paras: [
        [
          'Bidding without working out the full cost – fees, shipping and taxes can double the auction price.',
          'Buying a car with a "parts only" title or a certificate of destruction that cannot be legally registered.',
          'Trusting "Run and Drive" without checking the VIN history.',
          'No reserve for hidden damage and parts – repairing a crashed car almost always costs more than the photos suggest.',
          'Assuming 0% duty without proof of US origin – without it you pay 10%.',
          'Paying the auction late and running up storage fees in the yard.',
          'Missing the deadline for registration or the national tax return after the car arrives.',
        ],
      ],
    },
  ],
  CANADA: [
    {
      id: 'market',
      title: 'The Canadian car market – how it differs from the US',
      paras: [
        'Canada is a smaller market than the US but offers much the same: the same brands, models and trim levels, often at somewhat lower prices than in Europe. Many buyers see it as an alternative to the US, especially for cars from Canadian plants, which can benefit from the CETA agreement.',
        'Canadian cars have a few advantages: an odometer in kilometres, factory daytime running lights and winter-ready equipment (heated seats, sometimes an engine block heater). The downside can be corrosion – roads are heavily salted in winter, and the underside of a car from Ontario or Quebec can look worse than a car from the southern US.',
        'The most common imports from Canada are SUVs and pickups, cars built locally (e.g. Toyota RAV4, Lexus RX, Honda CR-V and Civic, Chrysler Pacifica) and low-mileage ex-lease cars.',
      ],
    },
    {
      id: 'auctions',
      title: 'Where to buy a car in Canada',
      paras: [
        'Damaged cars are sold in Canada by Copart Canada and IAA (formerly Impact Auto Auctions); undamaged cars by dealer auctions such as ADESA and by dealers. As in the US, many auctions are open only through a licensed broker.',
        'Buying from dealers and private sellers through classified sites is also popular. With a private purchase you must handle the export paperwork and transport to the port yourself, so most European buyers use an export company that collects the car, checks the documents and ships it.',
        'Add auction or dealer fees to the price and – when buying from a dealer – the Canadian sales taxes (GST/HST/PST). Some of these can be refunded or not charged when the dealer sells directly for export – ask before you buy.',
      ],
    },
    {
      id: 'titles',
      title: 'Ownership documents and damage statuses',
      paras: [
        'Canada has no US-style "title" – the document is the registration issued by the province (in Ontario the "ownership"). The damage status is recorded in the provincial register:',
        [
          'Ontario and most provinces: Normal, Salvage (a total loss not allowed on the road), Rebuilt (repaired and approved after inspection) and Irreparable – for parts only.',
          'Quebec: severely damaged vehicles (VGA – véhicule gravement accidenté) marked "reconstruit" (rebuilt) or "irrécupérable" (irreparable).',
        ],
        'Do not buy cars marked irreparable or irrécupérable to drive – they cannot be legally registered. Other statuses do not carry over to the EU registration document, but they affect the value and show the car had serious damage.',
      ],
    },
    {
      id: 'inspection',
      title: 'How to check a car from Canada',
      paras: [
        [
          'VIN history: a CARFAX Canada report shows damage, provincial registrations and mileage; for cars that came from the US, check the US history too.',
          'Liens: in Canada a car can be collateral for a loan. Check the provincial lien register (e.g. PPSA) that the car is free of charges – otherwise export can be blocked and you may even lose the car.',
          'Corrosion: ask for photos of the underbody, sills, wheel arches and brake lines – road salt takes its toll.',
          'Market version: Canadian cars are usually very close to US ones and need similar lighting changes.',
        ],
        'For auction cars the same rules apply as in the US: damage photos, the meaning of "Run and Drive" and a reserve for hidden damage.',
      ],
    },
    {
      id: 'shipping',
      title: 'Export and shipping from Canada',
      paras: [
        'The most used ports are Halifax and Montreal in the east and Vancouver in the west. From the East Coast, the ship to North Sea ports usually takes about 2 weeks – one of the fastest routes to Europe. Cars from the western provinces often travel east by rail or sail from Vancouver through the Panama Canal, which takes longer.',
        'Export requires the ownership document (provincial registration), proof of purchase and an export declaration in the CBSA system (CERS), usually filed by the exporter or forwarder. The car must be free of liens.',
        'Shipping options are the same as from the US: shared container, exclusive container or RoRo for running cars. In winter, allow for possible delays in land transport to the port.',
      ],
    },
    {
      id: 'duty',
      title: 'Duty and the CETA agreement',
      paras: [
        'Thanks to the EU–Canada trade agreement (CETA), cars made in Canada can enter the EU at 0% duty. The condition is Canadian origin confirmed by a statement on origin from the exporter. Buying in Canada is not enough – many cars sold in Canada were built in the US, Mexico or Japan and pay the full 10%.',
        'A VIN starting with "2" means the car was built in Canada. It is a good hint but not proof – when buying from a private person it is often hard to get a statement on origin, and without it the duty is 10% of the customs value (CIF). Pickups classified as goods vehicles pay 22%.',
        'Import VAT of the country of clearance is charged on top of duty, and national taxes (excise or registration tax) in the country of registration. Businesses can use procedure 4200 and account for VAT in the destination country.',
      ],
    },
    {
      id: 'adaptation',
      title: 'EU adaptation and registration',
      paras: [
        'Canadian cars are somewhat easier to register than US ones: they have a km/h speedometer and factory daytime running lights. Usually you still need to:',
        [
          'change the rear turn signals to amber if the brake lights flash,',
          'add a rear fog light,',
          'adapt the headlights to the European dipped-beam pattern.',
        ],
        'Registration requires sworn translations of the documents, the customs clearance document, proof of national taxes and a roadworthiness test. Countries such as Germany or France may require an individual approval.',
      ],
    },
    {
      id: 'mistakes',
      title: 'The most common mistakes when importing from Canada',
      paras: [
        [
          'Assuming every car from Canada pays 0% duty – that applies only to cars made in Canada with a statement on origin.',
          'Not checking for a lien before buying.',
          'Ignoring underbody corrosion on cars from provinces with harsh winters.',
          'Buying a car with an irreparable or irrécupérable status.',
          'Underestimating land transport from the western provinces to the eastern ports.',
        ],
      ],
    },
  ],
  JAPAN: [
    {
      id: 'market',
      title: 'The Japanese car market – why JDM',
      paras: [
        'Japan is known for cars in very good technical condition and with low mileage. The reason is the strict shaken inspection, which gets more expensive as a car ages – so many Japanese owners sell after a few years and prices of older cars fall quickly.',
        'Most imports from Japan are JDM cars (Japanese Domestic Market) – sports legends (Nissan Skyline GT-R, Toyota Supra, Mazda RX-7, Honda NSX), off-roaders (Toyota Land Cruiser), minivans and newer hybrids. For collectors the key models are those never officially sold in Europe.',
        'All cars from the Japanese market are right-hand drive. They can be registered in the EU, but driving one on the right is less comfortable and they can be harder to resell – except for sought-after collector models.',
      ],
    },
    {
      id: 'auctions',
      title: 'Auctions in Japan – USS and others',
      paras: [
        'Most used cars in Japan go through dealer auctions. The largest is the USS network, alongside TAA, CAA, HAA, JU and Arai, among others. Tens of thousands of cars are offered every week.',
        'A foreign buyer does not bid directly – a Japanese exporter (auction agent) does it: they have auction access, translate the auction sheet, buy the car, deregister it for export and ship it. On top of the hammer price come the auction fee, the exporter\'s commission, inland transport to the port and export documents. Payment is usually in yen.',
        'You can also buy from an exporter\'s stock – it can cost more, but the car has already been checked and often waits at the port.',
      ],
    },
    {
      id: 'titles',
      title: 'How to read a Japanese auction sheet',
      paras: [
        'The auction sheet is the auction inspector\'s report – the most important source of information about the car. It contains an overall grade, an interior grade and a body damage map.',
        [
          'Overall grade: S or 6 – practically new; 5 and 4.5 – very good condition; 4 – good with minor signs of use; 3.5 and 3 – visible faults or higher mileage; R or RA – repaired accident damage (RA – minor repair); 0 or *** – damaged, flooded or ungraded.',
          'Interior grade: from A (like new) to E (heavily worn).',
          'Damage map: A – scratch, U – dent, B – dent with scratch, W – wave or repair marks, S and C – rust and corrosion, P – paint marks, X – part to replace, XX – part replaced, Y – crack or hole. The number next to the letter (1–3) shows the size of the damage.',
        ],
        'The sheet also shows the mileage verified by the auction, the equipment and the inspector\'s notes in Japanese – a good exporter translates them before you bid.',
      ],
    },
    {
      id: 'inspection',
      title: 'What to watch out for with Japanese cars',
      paras: [
        [
          'Mileage: Japanese cars usually have genuine, low mileage, but check its history on the auction sheet and the export certificate.',
          'Rust: cars from the north (Hokkaido) and coastal areas can be corroded by salt – look at photos of the underbody.',
          'Modifications: sports cars often have modified suspension, exhaust and engine, which can make the EU roadworthiness test harder.',
          'Speed limiters: many JDM cars have a factory limiter at 180 km/h.',
          'Electronics: Japanese radios use the 76–90 MHz FM band, navigation and menus are in Japanese, and the ETC toll unit is useless in Europe.',
        ],
      ],
    },
    {
      id: 'shipping',
      title: 'Export and shipping from Japan',
      paras: [
        'After purchase the exporter deregisters the car and obtains the Export Certificate – the document that replaces the registration, with the car\'s details and mileage. It is needed for customs clearance and registration in the EU, together with the invoice and the bill of lading (B/L).',
        'Cars leave mainly from Yokohama, Nagoya, Kobe and Osaka. RoRo ships to Europe usually take 5–7 weeks (via the Suez Canal or around Africa), containers about the same or a little longer. A container is a good choice for valuable or non-running cars.',
        'The most common destination ports are Bremerhaven, Rotterdam, Antwerp and Zeebrugge. Cargo insurance is worth taking – the risk of damage is higher on a long voyage.',
      ],
    },
    {
      id: 'duty',
      title: 'Duty and the EU–Japan agreement',
      paras: [
        'The EU–Japan Economic Partnership Agreement (EPA) phased out car duty step by step – from 2026, cars of Japanese origin can enter the EU at 0% duty. Origin is proven by a statement on origin from the exporter or by the importer\'s knowledge (documents showing the car was built in Japan).',
        'JDM cars built in Japan usually qualify. Watch out for Japanese brands built elsewhere (e.g. in the US or Thailand) – these pay the standard 10% of the customs value. Without proof of origin the duty is also 10%.',
        'Cars over 30 years old in original condition may count as collector\'s vehicles – then the duty is 0% and some countries charge lower VAT. After clearance, national taxes based on the engine, emissions or value apply in the country of registration.',
      ],
    },
    {
      id: 'adaptation',
      title: 'Right-hand drive – registration in the EU',
      paras: [
        'Right-hand-drive cars can be registered in EU countries if they meet the technical requirements. The key changes are:',
        [
          'headlights with a pattern for driving on the right (re-aiming or replacing the lenses),',
          'a rear fog light on the correct side and amber turn signals (Japanese cars usually have them already),',
          'a km/h speedometer – Japanese cars have one from the factory.',
        ],
        'Some countries, e.g. Germany, require an individual approval or an expert report. Registration needs translations of the export certificate and invoice, the customs clearance document, proof of national taxes and a roadworthiness test.',
      ],
    },
    {
      id: 'mistakes',
      title: 'The most common mistakes when importing from Japan',
      paras: [
        [
          'Bidding without a translated auction sheet.',
          'Underestimating the time – from purchase to registration often takes 2–3 months.',
          'Assuming 0% duty for a Japanese brand built outside Japan.',
          'Forgetting the cost of converting the lights and a possible individual approval.',
          'Buying a heavily modified car that will not pass the roadworthiness test.',
          'No insurance for the long voyage.',
        ],
      ],
    },
  ],
  UAE: [
    {
      id: 'market',
      title: 'The car market in the United Arab Emirates',
      paras: [
        'Dubai and the other emirates are among the world\'s largest markets for luxury cars. Strong demand for new cars fills the used market with few-years-old SUVs, sports cars and premium saloons – often cheaper than in Europe.',
        'Most cars sold in the UAE are GCC (Gulf Cooperation Council) versions, built for the heat: stronger air conditioning and cooling, sometimes different equipment than in Europe. There are also many cars brought in from the US – often damaged – and resold as "imports".',
        'The most common imports from the UAE are large SUVs (Nissan Patrol, Toyota Land Cruiser, Lexus LX), luxury and sports cars. With higher-mileage cars, keep the effects of the climate in mind.',
      ],
    },
    {
      id: 'auctions',
      title: 'Where to buy a car in the UAE',
      paras: [
        'Cars are bought from dealers (including brands\' certified used programmes), at auctions such as Emirates Auction and Copart UAE, and from classified ads. Dubai also has a large used-car market with many export companies serving foreign buyers.',
        'When buying from abroad, the safest way is through a trusted exporter: they check the car and the documents, deregister it, obtain the export certificate and ship it.',
      ],
    },
    {
      id: 'titles',
      title: 'Documents: Mulkiya and the export certificate',
      paras: [
        'The registration document in the UAE is the Mulkiya card issued by the traffic authority (in Dubai, the RTA). For export the car must be deregistered and an export certificate obtained (often with export plates) – the key document for EU customs clearance.',
        'The car must have no unpaid fines and no bank lien. Many cars in the UAE are bought on credit – before buying, check that the loan is paid off and the bank has cleared the car for export.',
      ],
    },
    {
      id: 'inspection',
      title: 'How to check a car from the UAE',
      paras: [
        [
          'Origin: use the VIN to check whether the car is a GCC version or came from the US. A VIN starting with 1, 4 or 5 means a US-built car – then check its US history (damage, salvage title).',
          'Flooding: after the 2024 storms many flood-damaged cars reached the market. Look for water marks, silt and corrosion in the cabin and electronics.',
          'Climate damage: high temperatures wear out rubber seals, plastics, batteries, tyres and air conditioning.',
          'Service history: dealer cars usually have full records – a big plus when reselling.',
        ],
      ],
    },
    {
      id: 'shipping',
      title: 'Export and shipping from the UAE',
      paras: [
        'The main port is Jebel Ali in Dubai. The voyage to European ports usually takes 3–5 weeks, depending on the route (via the Red Sea and the Suez Canal or around Africa) and the destination port. Cars travel in containers or on RoRo ships.',
        'EU customs clearance requires the export certificate, the invoice and the bill of lading (B/L). For cars that earlier came to the UAE from the US, documents from the US history are useful too.',
      ],
    },
    {
      id: 'duty',
      title: 'Duty on imports from the UAE',
      paras: [
        'The EU has no agreement with the UAE that lowers car duty, so cars from the Emirates pay the standard 10% of the customs value (CIF), and pickups classified as goods vehicles 22%. This also applies to US-built cars: the 0% duty on American cars requires shipping directly from the US.',
        'Import VAT of the country of clearance is charged on top of duty, and national taxes in the country of registration. Cars over 30 years old in original condition may count as collector\'s vehicles, with 0% duty.',
      ],
    },
    {
      id: 'adaptation',
      title: 'EU adaptation and registration',
      paras: [
        'GCC-version cars are left-hand drive, have a km/h speedometer and usually lighting close to European specs, so the changes are often smaller than with US cars. Still check the turn signals, rear fog light and headlights.',
        'Cars brought to the UAE from the US have US specifications and need the same changes as cars bought directly in America. Some EU countries require an individual approval.',
      ],
    },
    {
      id: 'mistakes',
      title: 'The most common mistakes when importing from the UAE',
      paras: [
        [
          'Buying a US car sold as "GCC" without checking the VIN and history.',
          'An outstanding loan or fines that block export.',
          'Missing signs of flooding and heat damage.',
          'Counting on 0% duty – cars from the UAE pay the standard 10%.',
        ],
      ],
    },
  ],
  UK: [
    {
      id: 'market',
      title: 'The UK car market after Brexit',
      paras: [
        'The United Kingdom is a large used-car market with a huge choice of premium, sports and classic cars. Since Brexit it is a third country for the EU, so imports need customs clearance – but thanks to the EU–UK Trade and Cooperation Agreement (TCA), cars that meet the rules of origin can enter at 0% duty.',
        'All British cars are right-hand drive. That is why the most common imports are cars where this does not matter or that are exceptionally good value: classics, collector cars, rare versions and premium cars. Bringing back European-brand cars that went to the UK earlier is also popular.',
      ],
    },
    {
      id: 'auctions',
      title: 'Where to buy a car in the UK',
      paras: [
        'Cars are bought from dealers, through classifieds (e.g. Auto Trader) and at auctions – dealer auctions (BCA, Manheim) and salvage auctions (Copart UK). Many cars come with a documented service history.',
        'At salvage auctions, cars carry a damage category you need to understand before buying.',
      ],
    },
    {
      id: 'titles',
      title: 'Damage categories and the V5C',
      paras: [
        'The registration document is the V5C (logbook). Total-loss cars in the UK get a category:',
        [
          'Cat S – structural damage (e.g. chassis rails, pillars); the car can be repaired and return to the road.',
          'Cat N – non-structural damage (e.g. electronics, body panels); the car can be repaired.',
          'Cat B – parts only, the body shell must be crushed.',
          'Cat A – scrap only.',
        ],
        'Do not buy Cat A or Cat B cars to drive. Categories S and N mean serious past damage – check the quality of the repair.',
      ],
    },
    {
      id: 'inspection',
      title: 'How to check a car from the UK',
      paras: [
        [
          'MOT history: on the government website gov.uk you can check every MOT test by registration number for free – with the mileage from each year and the list of faults. It is the best way to spot a clocked odometer.',
          'HPI (or similar) check: shows outstanding finance, theft and whether the car was recorded as a write-off.',
          'Service history and the number of owners from the V5C.',
          'Mileage in miles – the speedometer must also show km/h for EU registration.',
        ],
      ],
    },
    {
      id: 'shipping',
      title: 'Export and transport from the UK',
      paras: [
        'Most cars cross the Channel by ferry or train (Dover–Calais, Eurotunnel), on a transporter or driven. Transport usually takes a few days to a week. Cars from Scotland or northern England can also go by RoRo ship to Benelux and German ports.',
        'Since Brexit two customs declarations are needed: an export declaration in the UK and an import declaration in the EU – even when you drive the car yourself. A customs agent at the terminal usually handles them. The keeper also notifies the DVLA of the permanent export using the relevant part of the V5C.',
        'Driving on British plates to the country of registration needs valid insurance and MOT – a transporter is often simpler.',
      ],
    },
    {
      id: 'duty',
      title: 'Duty, the TCA and VAT',
      paras: [
        'The EU–UK Trade and Cooperation Agreement (TCA) allows 0% duty, but only for cars that meet the rules of origin – in practice built in the UK or the EU. Origin is proven by a statement on origin from the exporter or the importer\'s knowledge. A Japanese or American car bought in the UK pays the standard 10% of the customs value.',
        'Import VAT of the country of clearance is due regardless of duty. When buying from a UK dealer, ask whether an export sale can be made without UK VAT – otherwise you pay VAT twice.',
        'National taxes based on the engine, emissions or value apply in the country of registration.',
      ],
    },
    {
      id: 'adaptation',
      title: 'Right-hand drive and EU registration',
      paras: [
        'British cars were built to European type-approval rules, so they often have a Certificate of Conformity (COC) and are easier to register than US cars. What usually remains:',
        [
          'headlights for driving on the right,',
          'a rear fog light on the correct side,',
          'a speedometer with a km/h scale.',
        ],
        'Registration requires the V5C (or proof of export), the invoice, sworn translations, the customs clearance document, proof of national taxes and a roadworthiness test.',
      ],
    },
    {
      id: 'mistakes',
      title: 'The most common mistakes when importing from the UK',
      paras: [
        [
          'Assuming everything is duty-free after Brexit – 0% applies only to cars that meet the rules of origin.',
          'Paying UK VAT and EU import VAT on the same car.',
          'Buying a Cat A or Cat B car.',
          'Not checking the MOT history and an HPI report.',
          'Crossing the border without customs declarations when driving the car yourself.',
        ],
      ],
    },
  ],
};

import { OriginDeep } from './types';

export const ORIGIN_DEEP: OriginDeep = {
  USA: [
    {
      id: "market",
      title: "Le marché automobile américain – ce qui vaut la peine d'être importé",
      paras: [
        "Les États-Unis sont le plus grand marché de l'occasion au monde : environ 40 millions de véhicules y changent de propriétaire chaque année, et plusieurs millions passent par les enchères d'assurance. C'est pourquoi de nombreux modèles – surtout accidentés – sont nettement moins chers qu'en Europe, avec un choix de versions immense.",
        "Il est le plus intéressant d'importer des voitures rares ou chères en Europe : muscle cars à gros V8 (Mustang, Camaro, Challenger), grands SUV et pick-up, versions premium bien équipées et voitures électriques, qui perdent vite de la valeur aux États-Unis. Pour les petites compactes bon marché, le transport et les taxes absorbent souvent l'économie.",
        "Le prix d'adjudication n'est qu'un début. S'y ajoutent les frais d'enchère, le transport jusqu'au port, le fret, l'assurance, les droits de douane, la TVA, les taxes nationales, la mise aux normes UE et une éventuelle réparation. Seul le total dit si l'import est rentable – calculez-le avant d'enchérir, pas après.",
      ],
    },
    {
      id: "auctions",
      title: "Enchères Copart et IAAI – comment acheter",
      paras: [
        "Copart et IAAI (Insurance Auto Auctions) vendent surtout des voitures d'assureurs, de loueurs et de banques – accidentées, retrouvées après un vol, inondées ou simplement retirées d'une flotte. Les enchères se font en ligne, la voiture étant stockée sur l'un des centaines de parcs du pays. L'emplacement compte : il détermine le coût et le délai d'acheminement jusqu'au port.",
        "Un acheteur européen passe généralement par un courtier (intermédiaire titulaire d'une licence d'enchère), car beaucoup de voitures – notamment à titre salvage – ne peuvent être achetées que par des acheteurs agréés. Le courtier prend une commission et organise souvent aussi le transport et les documents d'exportation.",
        "Au prix d'adjudication s'ajoutent les frais d'enchère : frais acheteur croissant par paliers selon le prix, frais d'enchère en ligne, frais de sortie du parc (gate fee), frais environnementaux et de gestion du titre. Pour une voiture de quelques milliers de dollars, cela représente en général de quelques centaines à plus de mille dollars.",
        "Le paiement est exigé dans un délai court – en général quelques jours ouvrés – et la voiture doit être retirée avant que des frais de stationnement ne commencent. Un retard de paiement entraîne une pénalité et le blocage du compte : ayez l'argent de la voiture et des frais prêt avant d'enchérir.",
      ],
    },
    {
      id: "titles",
      title: "Types de titres : clean, salvage, rebuilt",
      paras: [
        "Aux États-Unis, la propriété est prouvée par un titre (title) délivré par l'État. Son type raconte l'histoire de la voiture et compte pour l'achat et l'exportation :",
        [
          "Clean – aucune perte totale dans l'historique ; le plus cher mais le moins risqué.",
          "Salvage – l'assureur a déclaré une perte totale (le coût de réparation dépassait une part de la valeur). Le titre le plus courant chez Copart et IAAI.",
          "Rebuilt / Reconstructed – ancienne perte totale réparée et de nouveau autorisée à circuler aux États-Unis.",
          "Non-repairable, Certificate of Destruction, Parts only, Junk – pour pièces uniquement. N'achetez pas ces voitures pour rouler : l'exportation et l'immatriculation dans l'UE peuvent être impossibles ou très difficiles.",
        ],
        "Dans l'Union européenne, les mentions des titres américains ne sont pas reportées sur le certificat d'immatriculation. Une voiture salvage peut être immatriculée si elle réussit le contrôle technique après réparation. Le titre influe toutefois sur la valeur de revente et signale surtout un dommage grave – qui doit être réparé correctement.",
      ],
    },
    {
      id: "inspection",
      title: "Comment vérifier une voiture avant d'enchérir",
      paras: [
        "Aux enchères, vous ne voyez pas la voiture en personne : chaque détail de l'annonce compte. Avant d'enchérir :",
        [
          "Vérifiez l'historique du VIN (p. ex. Carfax, AutoCheck, base NMVTIS) : dommages, kilométrage, nombre de propriétaires, vol et inondation.",
          "Étudiez les photos et la description des dégâts (primary / secondary damage). « Front end » peut aller du pare-chocs aux longerons tordus et airbags déclenchés.",
          "Lisez bien les mentions d'état : « Run and Drive » signifie que la voiture a roulé à son arrivée au parc, pas qu'elle est en état de circuler ; « Engine Starts » signifie seulement que le moteur a démarré.",
          "Méfiez-vous des voitures venant de zones d'ouragans et d'inondations (Floride, Texas, Louisiane). Traces d'eau sous la moquette, limon et connecteurs électriques corrodés sont une raison de renoncer.",
          "Le kilométrage est en miles (1 mile = 1,61 km) et peut être marqué « not actual » ou « exempt » – le compteur n'est alors pas fiable.",
        ],
        "Prévoyez une réserve pour les dégâts cachés – jusqu'à 20–30 % du coût de réparation estimé. Demandez le prix des pièces en Europe ou aux États-Unis avant de fixer votre enchère maximale.",
      ],
    },
    {
      id: "shipping",
      title: "Exportation et fret maritime",
      paras: [
        "Après l'achat, un porte-voitures amène la voiture du parc au port d'exportation. Les ports les plus utilisés sont New Jersey/New York, Savannah (Géorgie), Baltimore, Houston et Los Angeles/Long Beach. Depuis la côte Est, la traversée vers les ports de la mer du Nord dure en général 2 à 3 semaines ; depuis la Californie par le canal de Panama, jusqu'à 5 à 6 semaines.",
        "L'exportation exige le titre original (ou une copie certifiée) et la facture. L'exportateur dépose l'Electronic Export Information (EEI) dans le système AES – obligatoire pour les véhicules d'occasion quelle que soit leur valeur – et la voiture et les documents doivent être présentés à la douane américaine (CBP) au moins 72 heures avant le départ du navire.",
        "Il existe trois modes de transport :",
        [
          "Conteneur partagé (en général 3–4 voitures dans un conteneur de 40 pieds) – le plus courant, adapté aux voitures accidentées et non roulantes.",
          "Conteneur exclusif – plus cher, mais la voiture voyage seule et vous pouvez ajouter des pièces.",
          "RoRo (navire roulier) – souvent le moins cher, mais uniquement pour les voitures roulantes et avec moins de protection contre les dommages.",
        ],
        "Une assurance transport vaut la peine – en général 1,5–2 % de la valeur de la voiture. Au port européen, le conteneur est déchargé et un commissionnaire en douane dédouane la voiture. Déchargement, terminal et agence se paient au port de destination.",
      ],
    },
    {
      id: "duty",
      title: "Droits de douane, origine et dédouanement dans l'UE",
      paras: [
        "Le droit de douane standard de l'UE sur les voitures particulières est de 10 % de la valeur en douane. Celle-ci correspond au prix de la voiture avec frais d'enchère, plus transport et assurance jusqu'à la frontière de l'UE (valeur CAF). Les pick-up peuvent être classés comme véhicules utilitaires – le droit est alors de 22 % – et les motos paient 6–8 %.",
        "Du 1er juillet 2026 à fin 2029, les voitures fabriquées aux États-Unis peuvent entrer dans l'UE avec 0 % de droits (règlement (UE) 2026/1455). Condition : prouver à la douane l'origine américaine de la voiture, qui doit être expédiée directement depuis les États-Unis. Une facture ou une mention « Made in USA » seule ne suffit pas – une preuve d'origine est nécessaire. Le VIN donne un indice : les voitures construites aux États-Unis ont un VIN commençant par 1, 4 ou 5. Une marque japonaise ou allemande assemblée en Amérique peut aussi en bénéficier, contrairement à une BMW fabriquée en Europe et achetée aux États-Unis.",
        "La TVA à l'importation est due au taux du pays de dédouanement. Sa base est la valeur en douane augmentée des droits et des frais de transport jusqu'à la destination dans l'UE. Les entreprises peuvent utiliser le régime douanier 4200 : dédouaner dans un pays et déclarer la TVA dans le pays d'immatriculation.",
        "Après le dédouanement viennent les taxes nationales – selon le pays une accise (p. ex. 3,1 % ou 18,6 % en Pologne selon la cylindrée), une taxe d'immatriculation basée sur le CO₂, la puissance ou la valeur, ou rien du tout. Ce sont souvent elles qui décident si l'import est rentable.",
      ],
    },
    {
      id: "adaptation",
      title: "Mise aux normes UE et immatriculation",
      paras: [
        "Les voitures du marché américain ne respectent pas certaines règles techniques européennes et doivent être modifiées avant le contrôle technique :",
        [
          "Les clignotants arrière doivent être orange – sur beaucoup de voitures américaines, ce sont les feux stop rouges qui clignotent.",
          "Un feu antibrouillard arrière est obligatoire.",
          "Les phares doivent avoir le faisceau de croisement européen et être correctement réglés.",
          "Le compteur doit indiquer les km/h (une double graduation suffit en général).",
          "Les capteurs de pression des pneus (TPMS) américains fonctionnent à 315 MHz – en Europe, 433 MHz est courant, ce qui compte lors d'un changement de roues.",
        ],
        "La mise aux normes de l'éclairage coûte en général quelques centaines d'euros. Dans certains pays – p. ex. l'Allemagne ou la France (réception à titre isolé, RTI) – une voiture hors UE nécessite en plus une homologation individuelle ou une expertise, ce qui prend du temps et de l'argent.",
        "Pour l'immatriculation, préparez les traductions assermentées du titre et de la facture, le document de dédouanement, la preuve du paiement des taxes nationales et le procès-verbal de contrôle technique. Beaucoup de pays fixent un délai légal pour immatriculer une voiture importée – en Pologne, par exemple, 30 jours.",
      ],
    },
    {
      id: "mistakes",
      title: "Les erreurs les plus fréquentes à l'import depuis les États-Unis",
      paras: [
        [
          "Enchérir sans calculer le coût total – frais, transport et taxes peuvent doubler le prix d'adjudication.",
          "Acheter une voiture à titre « parts only » ou certificate of destruction, impossible à immatriculer légalement.",
          "Se fier à « Run and Drive » sans vérifier l'historique du VIN.",
          "Ne prévoir aucune réserve pour les dégâts cachés et les pièces – réparer une voiture accidentée coûte presque toujours plus que ne le laissent croire les photos.",
          "Compter sur 0 % de droits sans preuve de l'origine américaine – sans elle, vous payez 10 %.",
          "Payer l'enchère en retard et accumuler des frais de stationnement au parc.",
          "Dépasser le délai d'immatriculation ou de déclaration des taxes nationales après l'arrivée de la voiture.",
        ],
      ],
    },
  ],
  CANADA: [
    {
      id: "market",
      title: "Le marché automobile canadien – en quoi il diffère des États-Unis",
      paras: [
        "Le Canada est un marché plus petit que les États-Unis mais à l'offre très proche : mêmes marques, modèles et finitions, souvent un peu moins chers qu'en Europe. Beaucoup y voient une alternative aux États-Unis, notamment pour les voitures sorties d'usines canadiennes, qui peuvent bénéficier de l'accord CETA.",
        "Les voitures canadiennes ont quelques atouts : compteur en kilomètres, feux de jour d'origine et équipement prêt pour l'hiver (sièges chauffants, parfois chauffe-moteur). Leur point faible peut être la corrosion – les routes sont fortement salées en hiver, et le soubassement d'une voiture de l'Ontario ou du Québec peut être en moins bon état que celui d'une voiture du sud des États-Unis.",
        "On importe surtout du Canada des SUV et des pick-up, des voitures fabriquées sur place (p. ex. Toyota RAV4, Lexus RX, Honda CR-V et Civic, Chrysler Pacifica) et des voitures de fin de location à faible kilométrage.",
      ],
    },
    {
      id: "auctions",
      title: "Où acheter une voiture au Canada",
      paras: [
        "Les voitures accidentées sont vendues au Canada par Copart Canada et IAA (anciennement Impact Auto Auctions), les voitures non accidentées par des enchères professionnelles comme ADESA et par les concessionnaires. Comme aux États-Unis, beaucoup d'enchères ne sont accessibles que via un courtier agréé.",
        "L'achat auprès de concessionnaires et de particuliers via des sites d'annonces est aussi courant. En cas d'achat privé, vous devez gérer vous-même les documents d'exportation et le transport jusqu'au port ; la plupart des acheteurs européens passent donc par une société d'exportation qui récupère la voiture, vérifie les papiers et l'expédie.",
        "Au prix s'ajoutent les frais d'enchère ou de concessionnaire et – chez un concessionnaire – les taxes de vente canadiennes (TPS/TVH/TVP). Une partie peut être remboursée ou non facturée si le concessionnaire vend directement à l'exportation – renseignez-vous avant d'acheter.",
      ],
    },
    {
      id: "titles",
      title: "Documents de propriété et statuts de dommages",
      paras: [
        "Le Canada n'a pas de « title » à l'américaine – le document est l'immatriculation délivrée par la province (en Ontario, l'« ownership »). Le statut de dommage est inscrit au registre provincial :",
        [
          "Ontario et la plupart des provinces : Normal, Salvage (perte totale non autorisée à circuler), Rebuilt (réparée et approuvée après inspection) et Irreparable – pour pièces uniquement.",
          "Québec : véhicules gravement accidentés (VGA) avec la mention « reconstruit » ou « irrécupérable ».",
        ],
        "N'achetez pas de voitures irreparable ou irrécupérable pour rouler – elles ne peuvent pas être immatriculées légalement. Les autres statuts ne sont pas reportés sur le certificat d'immatriculation européen, mais influent sur la valeur et signalent un dommage grave.",
      ],
    },
    {
      id: "inspection",
      title: "Comment vérifier une voiture canadienne",
      paras: [
        [
          "Historique du VIN : un rapport CARFAX Canada montre les dommages, les immatriculations provinciales et le kilométrage ; pour les voitures venues des États-Unis, vérifiez aussi l'historique américain.",
          "Privilèges (liens) : au Canada, une voiture peut garantir un prêt. Vérifiez au registre provincial des sûretés (p. ex. RDPRM au Québec, PPSA ailleurs) qu'elle est libre de toute charge – sinon l'exportation peut être bloquée, voire la voiture saisie.",
          "Corrosion : demandez des photos du soubassement, des bas de caisse, des passages de roue et des conduites de frein – le sel de déneigement laisse des traces.",
          "Version du marché : les voitures canadiennes sont en général très proches des américaines et nécessitent des modifications d'éclairage similaires.",
        ],
        "Pour les voitures d'enchères, les mêmes règles qu'aux États-Unis s'appliquent : photos des dégâts, sens de « Run and Drive » et réserve pour les dégâts cachés.",
      ],
    },
    {
      id: "shipping",
      title: "Exportation et transport maritime depuis le Canada",
      paras: [
        "Les ports les plus utilisés sont Halifax et Montréal à l'est, et Vancouver à l'ouest. Depuis la côte Est, la traversée vers les ports de la mer du Nord dure en général environ 2 semaines – l'une des routes les plus rapides vers l'Europe. Les voitures de l'Ouest voyagent souvent en train vers l'est ou partent de Vancouver par le canal de Panama, ce qui est plus long.",
        "L'exportation exige le document de propriété (immatriculation provinciale), la preuve d'achat et une déclaration d'exportation dans le système de l'ASFC (SDEC/CERS), généralement déposée par l'exportateur ou le transitaire. La voiture doit être libre de tout privilège.",
        "Les modes de transport sont les mêmes qu'aux États-Unis : conteneur partagé, conteneur exclusif ou RoRo pour les voitures roulantes. En hiver, prévoyez d'éventuels retards dans le transport terrestre jusqu'au port.",
      ],
    },
    {
      id: "duty",
      title: "Droits de douane et accord CETA",
      paras: [
        "Grâce à l'accord commercial UE–Canada (CETA), les voitures fabriquées au Canada peuvent entrer dans l'UE avec 0 % de droits. La condition est l'origine canadienne confirmée par une déclaration d'origine de l'exportateur. Acheter au Canada ne suffit pas – beaucoup de voitures vendues au Canada sont fabriquées aux États-Unis, au Mexique ou au Japon et paient les 10 % pleins.",
        "Un VIN commençant par « 2 » signifie une voiture construite au Canada. C'est un bon indice, pas une preuve – lors d'un achat auprès d'un particulier, la déclaration d'origine est souvent difficile à obtenir, et sans elle le droit est de 10 % de la valeur en douane (CAF). Les pick-up classés comme utilitaires paient 22 %.",
        "La TVA à l'importation du pays de dédouanement s'ajoute aux droits, puis les taxes nationales (accise ou taxe d'immatriculation) dans le pays d'immatriculation. Les entreprises peuvent utiliser le régime 4200 et déclarer la TVA dans le pays de destination.",
      ],
    },
    {
      id: "adaptation",
      title: "Mise aux normes UE et immatriculation",
      paras: [
        "Les voitures canadiennes sont un peu plus faciles à immatriculer que les américaines : compteur en km/h et feux de jour d'origine. Il faut néanmoins en général :",
        [
          "passer les clignotants arrière à l'orange si les feux stop clignotent,",
          "ajouter un feu antibrouillard arrière,",
          "adapter les phares au faisceau de croisement européen.",
        ],
        "L'immatriculation exige des traductions assermentées, le document de dédouanement, la preuve des taxes nationales et un contrôle technique. Des pays comme l'Allemagne ou la France peuvent exiger une homologation individuelle.",
      ],
    },
    {
      id: "mistakes",
      title: "Les erreurs les plus fréquentes à l'import depuis le Canada",
      paras: [
        [
          "Croire que toute voiture du Canada paie 0 % de droits – cela ne vaut que pour les voitures fabriquées au Canada avec une déclaration d'origine.",
          "Ne pas vérifier les privilèges (liens) avant l'achat.",
          "Ignorer la corrosion du soubassement sur les voitures de provinces aux hivers rigoureux.",
          "Acheter une voiture au statut irreparable ou irrécupérable.",
          "Sous-estimer le transport terrestre des provinces de l'Ouest vers les ports de l'Est.",
        ],
      ],
    },
  ],
  JAPAN: [
    {
      id: "market",
      title: "Le marché automobile japonais – pourquoi le JDM",
      paras: [
        "Le Japon est réputé pour ses voitures en très bon état technique et à faible kilométrage. La raison : l'inspection shaken, stricte et de plus en plus chère avec l'âge du véhicule – beaucoup de Japonais revendent donc après quelques années, et les prix des voitures plus anciennes baissent vite.",
        "On importe surtout du Japon des voitures JDM (Japanese Domestic Market) – légendes sportives (Nissan Skyline GT-R, Toyota Supra, Mazda RX-7, Honda NSX), tout-terrain (Toyota Land Cruiser), monospaces et hybrides récentes. Pour les collectionneurs, l'essentiel sont les modèles jamais vendus officiellement en Europe.",
        "Toutes les voitures du marché japonais ont le volant à droite. Elles peuvent être immatriculées dans l'UE, mais conduire avec le volant à droite est moins pratique et la revente peut être plus difficile – sauf pour les modèles de collection recherchés.",
      ],
    },
    {
      id: "auctions",
      title: "Les enchères au Japon – USS et les autres",
      paras: [
        "La plupart des voitures d'occasion au Japon passent par des enchères professionnelles. La plus grande est le réseau USS, à côté notamment de TAA, CAA, HAA, JU et Arai. Des dizaines de milliers de voitures y sont proposées chaque semaine.",
        "Un acheteur étranger n'enchérit pas lui-même – c'est un exportateur japonais (agent d'enchères) qui le fait : il a accès aux enchères, traduit la fiche d'enchère, achète la voiture, la radie pour l'export et l'expédie. Au prix d'adjudication s'ajoutent les frais d'enchère, la commission de l'exportateur, le transport jusqu'au port et les documents d'exportation. Le paiement se fait en général en yens.",
        "On peut aussi acheter dans le stock d'un exportateur – parfois plus cher, mais la voiture est déjà vérifiée et attend souvent au port.",
      ],
    },
    {
      id: "titles",
      title: "Comment lire une fiche d'enchère japonaise",
      paras: [
        "La fiche d'enchère (auction sheet) est le rapport de l'inspecteur de l'enchère – la source d'information la plus importante sur la voiture. Elle comporte une note globale, une note intérieure et un schéma des dommages de carrosserie.",
        [
          "Note globale : S ou 6 – pratiquement neuve ; 5 et 4,5 – très bon état ; 4 – bon état avec légères traces d'usage ; 3,5 et 3 – défauts visibles ou kilométrage plus élevé ; R ou RA – accident réparé (RA – petite réparation) ; 0 ou *** – accidentée, inondée ou non notée.",
          "Note intérieure : de A (comme neuf) à E (très usé).",
          "Schéma des dommages : A – rayure, U – bosse, B – bosse avec rayure, W – ondulation ou trace de réparation, S et C – rouille et corrosion, P – traces de peinture, X – pièce à remplacer, XX – pièce remplacée, Y – fissure ou trou. Le chiffre à côté de la lettre (1–3) indique la taille du dommage.",
        ],
        "La fiche indique aussi le kilométrage vérifié par l'enchère, l'équipement et les remarques de l'inspecteur en japonais – un bon exportateur les traduit avant que vous n'enchérissiez.",
      ],
    },
    {
      id: "inspection",
      title: "Points de vigilance pour les voitures japonaises",
      paras: [
        [
          "Kilométrage : les voitures japonaises ont en général un kilométrage réel et faible, mais vérifiez-en l'historique sur la fiche d'enchère et le certificat d'exportation.",
          "Rouille : les voitures du nord (Hokkaido) et des zones côtières peuvent être corrodées par le sel – regardez les photos du soubassement.",
          "Modifications : les sportives ont souvent suspension, échappement et moteur modifiés, ce qui peut compliquer le contrôle technique dans l'UE.",
          "Limiteurs : beaucoup de voitures JDM sont bridées d'usine à 180 km/h.",
          "Électronique : les autoradios japonais utilisent la bande FM 76–90 MHz, la navigation et les menus sont en japonais, et le boîtier de péage ETC est inutile en Europe.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Exportation et transport depuis le Japon",
      paras: [
        "Après l'achat, l'exportateur radie la voiture et obtient le certificat d'exportation (Export Certificate) – le document qui remplace l'immatriculation, avec les données du véhicule et le kilométrage. Il est nécessaire au dédouanement et à l'immatriculation dans l'UE, avec la facture et le connaissement (B/L).",
        "Les voitures partent surtout de Yokohama, Nagoya, Kobe et Osaka. Les navires RoRo vers l'Europe mettent en général 5 à 7 semaines (par le canal de Suez ou par le cap de Bonne-Espérance), les conteneurs autant ou un peu plus. Le conteneur est un bon choix pour les voitures de valeur ou non roulantes.",
        "Les ports de destination les plus courants sont Bremerhaven, Rotterdam, Anvers et Zeebruges. Une assurance transport vaut la peine – le risque de dommages est plus élevé sur une longue traversée.",
      ],
    },
    {
      id: "duty",
      title: "Droits de douane et accord UE–Japon",
      paras: [
        "L'accord de partenariat économique UE–Japon (APE) a supprimé progressivement les droits sur les voitures – depuis 2026, les voitures d'origine japonaise peuvent entrer dans l'UE avec 0 % de droits. L'origine se prouve par une déclaration d'origine de l'exportateur ou par la connaissance de l'importateur (documents montrant que la voiture a été construite au Japon).",
        "Les voitures JDM fabriquées au Japon remplissent généralement la condition. Attention aux marques japonaises construites ailleurs (p. ex. aux États-Unis ou en Thaïlande) – elles paient les 10 % standard de la valeur en douane. Sans preuve d'origine, le droit est aussi de 10 %.",
        "Les voitures de plus de 30 ans dans leur état d'origine peuvent être considérées comme véhicules de collection – le droit est alors de 0 % et certains pays appliquent une TVA réduite. Après le dédouanement, les taxes nationales liées au moteur, aux émissions ou à la valeur s'appliquent dans le pays d'immatriculation.",
      ],
    },
    {
      id: "adaptation",
      title: "Volant à droite – immatriculation dans l'UE",
      paras: [
        "Les voitures à volant à droite peuvent être immatriculées dans les pays de l'UE si elles respectent les exigences techniques. Les principales modifications :",
        [
          "phares adaptés à la circulation à droite (réglage ou remplacement des optiques),",
          "feu antibrouillard arrière du bon côté et clignotants orange (les voitures japonaises les ont généralement déjà),",
          "compteur en km/h – les voitures japonaises en sont équipées d'origine.",
        ],
        "Certains pays, comme l'Allemagne, exigent une homologation individuelle ou une expertise. L'immatriculation nécessite les traductions du certificat d'exportation et de la facture, le document de dédouanement, la preuve des taxes nationales et un contrôle technique.",
      ],
    },
    {
      id: "mistakes",
      title: "Les erreurs les plus fréquentes à l'import depuis le Japon",
      paras: [
        [
          "Enchérir sans fiche d'enchère traduite.",
          "Sous-estimer le délai – de l'achat à l'immatriculation, il faut souvent 2 à 3 mois.",
          "Compter sur 0 % de droits pour une marque japonaise construite hors du Japon.",
          "Oublier le coût de la mise aux normes de l'éclairage et d'une éventuelle homologation individuelle.",
          "Acheter une voiture très modifiée qui ne passera pas le contrôle technique.",
          "Ne pas assurer la longue traversée.",
        ],
      ],
    },
  ],
  UAE: [
    {
      id: "market",
      title: "Le marché automobile aux Émirats arabes unis",
      paras: [
        "Dubaï et les autres émirats figurent parmi les plus grands marchés de voitures de luxe au monde. La forte demande de voitures neuves remplit le marché de l'occasion de SUV, de sportives et de berlines premium de quelques années – souvent moins chères qu'en Europe.",
        "La plupart des voitures vendues aux Émirats sont des versions GCC (Gulf Cooperation Council), conçues pour la chaleur : climatisation et refroidissement renforcés, parfois un équipement différent de l'Europe. On y trouve aussi beaucoup de voitures venues des États-Unis – souvent accidentées – revendues comme « imports ».",
        "On importe surtout des Émirats de grands SUV (Nissan Patrol, Toyota Land Cruiser, Lexus LX), des voitures de luxe et de sport. Pour les voitures kilométrées, tenez compte des effets du climat.",
      ],
    },
    {
      id: "auctions",
      title: "Où acheter une voiture aux Émirats",
      paras: [
        "On achète auprès de concessionnaires (y compris les programmes d'occasion certifiée des marques), aux enchères comme Emirates Auction et Copart EAU, et via des annonces. Dubaï compte aussi un grand marché de l'occasion avec de nombreuses sociétés d'exportation pour les acheteurs étrangers.",
        "Pour acheter depuis l'étranger, le plus sûr est de passer par un exportateur de confiance : il vérifie la voiture et les documents, la radie, obtient le certificat d'exportation et l'expédie.",
      ],
    },
    {
      id: "titles",
      title: "Documents : Mulkiya et certificat d'exportation",
      paras: [
        "Le document d'immatriculation aux Émirats est la carte Mulkiya délivrée par l'autorité routière (à Dubaï, la RTA). Pour l'exportation, la voiture doit être radiée et un certificat d'exportation obtenu (souvent avec des plaques export) – le document clé du dédouanement dans l'UE.",
        "La voiture ne doit avoir ni amendes impayées ni gage bancaire. Beaucoup de voitures aux Émirats sont achetées à crédit – vérifiez avant l'achat que le prêt est remboursé et que la banque a autorisé l'exportation.",
      ],
    },
    {
      id: "inspection",
      title: "Comment vérifier une voiture des Émirats",
      paras: [
        [
          "Origine : vérifiez avec le VIN si la voiture est une version GCC ou vient des États-Unis. Un VIN commençant par 1, 4 ou 5 indique une voiture construite aux États-Unis – vérifiez alors son historique américain (dommages, titre salvage).",
          "Inondation : après les intempéries de 2024, beaucoup de voitures inondées sont arrivées sur le marché. Cherchez traces d'eau, limon et corrosion dans l'habitacle et l'électronique.",
          "Dégâts liés au climat : les fortes chaleurs usent joints en caoutchouc, plastiques, batteries, pneus et climatisation.",
          "Historique d'entretien : les voitures de concession ont en général un suivi complet – un gros atout à la revente.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Exportation et transport depuis les Émirats",
      paras: [
        "Le port principal est Jebel Ali à Dubaï. La traversée vers les ports européens dure en général 3 à 5 semaines selon l'itinéraire (mer Rouge et canal de Suez ou contournement de l'Afrique) et le port de destination. Les voitures voyagent en conteneur ou sur des navires RoRo.",
        "Le dédouanement dans l'UE exige le certificat d'exportation, la facture et le connaissement (B/L). Pour les voitures arrivées aux Émirats depuis les États-Unis, les documents de l'historique américain sont aussi utiles.",
      ],
    },
    {
      id: "duty",
      title: "Droits de douane à l'import des Émirats",
      paras: [
        "L'UE n'a pas d'accord avec les Émirats réduisant les droits sur les voitures : les voitures des Émirats paient donc les 10 % standard de la valeur en douane (CAF), et les pick-up classés utilitaires 22 %. Cela vaut aussi pour les voitures construites aux États-Unis : le droit de 0 % sur les voitures américaines exige une expédition directe depuis les États-Unis.",
        "La TVA à l'importation du pays de dédouanement s'ajoute aux droits, puis les taxes nationales dans le pays d'immatriculation. Les voitures de plus de 30 ans dans leur état d'origine peuvent être considérées comme véhicules de collection, avec 0 % de droits.",
      ],
    },
    {
      id: "adaptation",
      title: "Mise aux normes UE et immatriculation",
      paras: [
        "Les versions GCC ont le volant à gauche, un compteur en km/h et en général un éclairage proche des normes européennes : les modifications sont souvent moindres qu'avec les voitures américaines. Vérifiez quand même les clignotants, le feu antibrouillard arrière et les phares.",
        "Les voitures amenées aux Émirats depuis les États-Unis ont des spécifications américaines et nécessitent les mêmes modifications que les voitures achetées directement en Amérique. Certains pays de l'UE exigent une homologation individuelle.",
      ],
    },
    {
      id: "mistakes",
      title: "Les erreurs les plus fréquentes à l'import des Émirats",
      paras: [
        [
          "Acheter une voiture américaine vendue comme « GCC » sans vérifier le VIN et l'historique.",
          "Un crédit ou des amendes impayés qui bloquent l'exportation.",
          "Passer à côté des traces d'inondation et des dégâts dus à la chaleur.",
          "Compter sur 0 % de droits – les voitures des Émirats paient les 10 % standard.",
        ],
      ],
    },
  ],
  UK: [
    {
      id: "market",
      title: "Le marché automobile britannique après le Brexit",
      paras: [
        "Le Royaume-Uni est un grand marché de l'occasion avec un choix immense de voitures premium, sportives et anciennes. Depuis le Brexit, c'est un pays tiers pour l'UE : l'importation exige un dédouanement – mais grâce à l'accord de commerce et de coopération UE–Royaume-Uni (TCA), les voitures qui respectent les règles d'origine peuvent entrer avec 0 % de droits.",
        "Toutes les voitures britanniques ont le volant à droite. On importe donc surtout des voitures pour lesquelles cela importe peu ou qui sont particulièrement avantageuses : anciennes, voitures de collection, versions rares et voitures premium. Le rapatriement de voitures de marques européennes parties au Royaume-Uni est aussi courant.",
      ],
    },
    {
      id: "auctions",
      title: "Où acheter une voiture au Royaume-Uni",
      paras: [
        "On achète auprès de concessionnaires, via des annonces (p. ex. Auto Trader) et aux enchères – professionnelles (BCA, Manheim) et de véhicules accidentés (Copart UK). Beaucoup de voitures ont un historique d'entretien documenté.",
        "Aux enchères de véhicules accidentés, les voitures portent une catégorie de dommage qu'il faut connaître avant d'acheter.",
      ],
    },
    {
      id: "titles",
      title: "Catégories de dommages et le V5C",
      paras: [
        "Le document d'immatriculation est le V5C (logbook). Les voitures déclarées en perte totale reçoivent au Royaume-Uni une catégorie :",
        [
          "Cat S – dommage structurel (p. ex. longerons, montants) ; la voiture peut être réparée et reprendre la route.",
          "Cat N – dommage non structurel (p. ex. électronique, éléments de carrosserie) ; la voiture peut être réparée.",
          "Cat B – pour pièces uniquement, la caisse doit être détruite.",
          "Cat A – destruction uniquement.",
        ],
        "N'achetez pas de voitures de catégorie A ou B pour rouler. Les catégories S et N signalent un dommage grave passé – vérifiez la qualité de la réparation.",
      ],
    },
    {
      id: "inspection",
      title: "Comment vérifier une voiture britannique",
      paras: [
        [
          "Historique MOT : sur le site gouvernemental gov.uk, vous consultez gratuitement, avec le numéro d'immatriculation, tous les contrôles MOT – avec le kilométrage de chaque année et la liste des défauts. C'est le meilleur moyen de repérer un compteur trafiqué.",
          "Rapport HPI (ou équivalent) : indique un financement en cours, un vol et si la voiture a été enregistrée comme épave.",
          "Historique d'entretien et nombre de propriétaires d'après le V5C.",
          "Kilométrage en miles – le compteur doit aussi indiquer les km/h pour l'immatriculation dans l'UE.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Exportation et transport depuis le Royaume-Uni",
      paras: [
        "La plupart des voitures traversent la Manche en ferry ou en train (Douvres–Calais, Eurotunnel), sur un porte-voitures ou par la route. Le transport prend en général de quelques jours à une semaine. Les voitures d'Écosse ou du nord de l'Angleterre peuvent aussi partir en navire RoRo vers les ports du Benelux et d'Allemagne.",
        "Depuis le Brexit, deux déclarations en douane sont nécessaires : une déclaration d'exportation au Royaume-Uni et une déclaration d'importation dans l'UE – même si vous conduisez vous-même la voiture. Un commissionnaire en douane au terminal s'en charge généralement. Le détenteur signale aussi à la DVLA l'exportation définitive via la partie correspondante du V5C.",
        "Rouler en plaques britanniques jusqu'au pays d'immatriculation exige une assurance et un MOT valides – un porte-voitures est souvent plus simple.",
      ],
    },
    {
      id: "duty",
      title: "Droits de douane, TCA et TVA",
      paras: [
        "L'accord de commerce et de coopération UE–Royaume-Uni (TCA) permet 0 % de droits, mais seulement pour les voitures qui respectent les règles d'origine – en pratique construites au Royaume-Uni ou dans l'UE. L'origine se prouve par une déclaration d'origine de l'exportateur ou la connaissance de l'importateur. Une voiture japonaise ou américaine achetée au Royaume-Uni paie les 10 % standard de la valeur en douane.",
        "La TVA à l'importation du pays de dédouanement est due quels que soient les droits. En achetant chez un concessionnaire britannique, demandez si une vente à l'exportation peut se faire sans TVA britannique – sinon vous payez la TVA deux fois.",
        "Dans le pays d'immatriculation s'ajoutent les taxes nationales liées au moteur, aux émissions ou à la valeur.",
      ],
    },
    {
      id: "adaptation",
      title: "Volant à droite et immatriculation dans l'UE",
      paras: [
        "Les voitures britanniques ont été construites selon les règles européennes de réception, elles disposent donc souvent d'un certificat de conformité (COC) et s'immatriculent plus facilement que les américaines. Il reste en général :",
        [
          "les phares pour la circulation à droite,",
          "le feu antibrouillard arrière du bon côté,",
          "un compteur gradué en km/h.",
        ],
        "L'immatriculation exige le V5C (ou une preuve d'exportation), la facture, des traductions assermentées, le document de dédouanement, la preuve des taxes nationales et un contrôle technique.",
      ],
    },
    {
      id: "mistakes",
      title: "Les erreurs les plus fréquentes à l'import depuis le Royaume-Uni",
      paras: [
        [
          "Croire que tout est exempt de droits après le Brexit – 0 % ne vaut que pour les voitures respectant les règles d'origine.",
          "Payer la TVA britannique et la TVA d'importation européenne pour la même voiture.",
          "Acheter une voiture de catégorie A ou B.",
          "Ne pas vérifier l'historique MOT et un rapport HPI.",
          "Passer la frontière sans déclarations en douane en conduisant soi-même la voiture.",
        ],
      ],
    },
  ],
};

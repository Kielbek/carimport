import { OriginDeep } from './types';

export const ORIGIN_DEEP: OriginDeep = {
  USA: [
    {
      id: "market",
      title: "El mercado de coches de EE. UU. – qué merece la pena importar",
      paras: [
        "Estados Unidos es el mayor mercado de coches usados del mundo: cada año cambian de dueño unos 40 millones de vehículos y varios millones pasan por subastas de aseguradoras. Por eso muchos modelos – sobre todo siniestrados – son claramente más baratos que en Europa, y la oferta de versiones es enorme.",
        "Lo que más compensa importar son coches escasos o caros en Europa: muscle cars con grandes V8 (Mustang, Camaro, Challenger), SUV grandes y pick-ups, versiones premium bien equipadas y eléctricos, que en EE. UU. se deprecian rápido. En compactos baratos, el transporte y los impuestos suelen comerse el ahorro.",
        "El precio de subasta es solo el principio. Se suman tasas de subasta, transporte al puerto, flete, seguro, arancel, IVA, impuestos nacionales, adaptación a la normativa UE y la posible reparación. Solo el total dice si la importación compensa: calcúlalo antes de pujar, no después.",
      ],
    },
    {
      id: "auctions",
      title: "Subastas Copart e IAAI – cómo comprar",
      paras: [
        "Copart e IAAI (Insurance Auto Auctions) venden sobre todo coches de aseguradoras, empresas de alquiler y bancos: siniestrados, recuperados tras un robo, inundados o simplemente retirados de una flota. Se puja online y el coche está en una de las cientos de campas del país. La ubicación importa: decide el coste y el plazo del traslado al puerto.",
        "Un comprador europeo suele pujar a través de un bróker (intermediario con licencia de subasta), porque muchos coches – sobre todo con título salvage – solo pueden comprarlos compradores con licencia. El bróker cobra una comisión y a menudo organiza también el transporte y los documentos de exportación.",
        "Al precio de remate se suman las tasas de la subasta: una tarifa de comprador que sube por tramos según el precio, una tarifa por puja online, una tasa de salida de la campa (gate fee), una tasa medioambiental y otra por gestión del título. En un coche de unos pocos miles de dólares suelen ser en total de varios cientos a más de mil dólares.",
        "El pago se exige en poco tiempo – normalmente unos pocos días hábiles – y hay que retirar el coche antes de que empiecen a correr tasas de almacenamiento. Pagar tarde supone una penalización y el bloqueo de la cuenta, así que ten el dinero del coche y las tasas listo antes de pujar.",
      ],
    },
    {
      id: "titles",
      title: "Tipos de título: clean, salvage, rebuilt",
      paras: [
        "En EE. UU. la propiedad se acredita con un título (title) emitido por el estado. Su tipo cuenta la historia del coche y es importante para la compra y la exportación:",
        [
          "Clean – sin siniestro total en el historial; el más caro pero el menos arriesgado.",
          "Salvage – la aseguradora declaró siniestro total (la reparación superaba una parte del valor). El título más habitual en Copart e IAAI.",
          "Rebuilt / Reconstructed – antiguo siniestro total reparado y autorizado de nuevo a circular en EE. UU.",
          "Non-repairable, Certificate of Destruction, Parts only, Junk – solo para piezas. No compres estos coches para circular: la exportación y la matriculación en la UE pueden ser imposibles o muy difíciles.",
        ],
        "En la Unión Europea, las marcas del título estadounidense no pasan al permiso de circulación. Un coche salvage puede matricularse si supera la inspección técnica tras la reparación. Aun así, el título influye en el valor de reventa y, sobre todo, indica que el coche sufrió daños graves que hay que reparar bien.",
      ],
    },
    {
      id: "inspection",
      title: "Cómo revisar un coche antes de pujar",
      paras: [
        "En la subasta no ves el coche en persona, así que cada dato del anuncio cuenta. Antes de pujar:",
        [
          "Consulta el historial del VIN (p. ej. Carfax, AutoCheck, base NMVTIS): daños, kilometraje, número de dueños, robo e inundación.",
          "Analiza las fotos y la descripción del daño (primary / secondary damage). «Front end» puede ir desde un paragolpes hasta largueros doblados y airbags disparados.",
          "Lee bien las etiquetas de estado: «Run and Drive» significa que el coche se movió al llegar a la campa, no que esté en condiciones de circular; «Engine Starts», que el motor solo arrancó.",
          "Cuidado con coches de zonas de huracanes e inundaciones (Florida, Texas, Luisiana). Marcas de agua bajo la moqueta, lodo y conectores eléctricos corroídos son motivo para descartarlo.",
          "El kilometraje está en millas (1 milla = 1,61 km) y puede figurar como «not actual» o «exempt»: entonces el cuentakilómetros no es fiable.",
        ],
        "Es sensato reservar margen para daños ocultos: hasta un 20–30 % del coste de reparación estimado. Pide precio de piezas en Europa o EE. UU. antes de fijar tu puja máxima.",
      ],
    },
    {
      id: "shipping",
      title: "Exportación y transporte marítimo",
      paras: [
        "Tras la compra, un camión portacoches lleva el coche de la campa al puerto de exportación. Los puertos más usados son Nueva Jersey/Nueva York, Savannah (Georgia), Baltimore, Houston y Los Ángeles/Long Beach. Desde la costa este, la travesía a puertos del mar del Norte suele durar 2–3 semanas; desde California por el canal de Panamá, hasta 5–6 semanas.",
        "Para exportar se necesita el título original (o una copia certificada) y la factura. El exportador presenta la Electronic Export Information (EEI) en el sistema AES – obligatoria para vehículos usados sea cual sea su valor – y el coche y los documentos deben presentarse a la aduana de EE. UU. (CBP) al menos 72 horas antes de que zarpe el barco.",
        "Hay tres formas de transporte:",
        [
          "Contenedor compartido (normalmente 3–4 coches en un contenedor de 40 pies): el más popular, válido para coches siniestrados y que no arrancan.",
          "Contenedor exclusivo: más caro, pero el coche viaja solo y puedes añadir piezas.",
          "RoRo (buque de carga rodada): a menudo el más barato, pero solo para coches que circulan y con menos protección frente a daños.",
        ],
        "Merece la pena contratar un seguro de transporte: suele costar un 1,5–2 % del valor del coche. En el puerto de la UE se descarga el contenedor y un agente de aduanas despacha el coche. La descarga, la terminal y la agencia se pagan en el puerto de destino.",
      ],
    },
    {
      id: "duty",
      title: "Arancel, origen y despacho en la UE",
      paras: [
        "El arancel estándar de la UE para turismos es del 10 % del valor en aduana. Este valor es el precio del coche con tasas de subasta más el transporte y el seguro hasta la frontera de la UE (valor CIF). Los pick-ups pueden clasificarse como vehículos comerciales –entonces el arancel es del 22 %– y las motos pagan un 6–8 %.",
        "Del 1 de julio de 2026 a finales de 2029, los coches fabricados en EE. UU. pueden entrar en la UE con arancel 0 % (Reglamento (UE) 2026/1455). Condición: demostrar a la aduana el origen estadounidense del coche, que debe enviarse directamente desde EE. UU. Una factura o una etiqueta «Made in USA» no bastan: hace falta una prueba de origen. El VIN da una pista: los coches fabricados en EE. UU. tienen un VIN que empieza por 1, 4 o 5. Una marca japonesa o alemana ensamblada en América también puede acogerse; un BMW fabricado en Europa y comprado en EE. UU., no.",
        "El IVA de importación se aplica al tipo del país donde se despacha. Su base es el valor en aduana más el arancel y los costes de transporte hasta el destino en la UE. Las empresas pueden usar el régimen aduanero 4200: despachar en un país y liquidar el IVA en el país de matriculación.",
        "Tras el despacho llegan los impuestos nacionales: según el país, un impuesto especial (p. ej. en Polonia 3,1 % o 18,6 % según la cilindrada), un impuesto de matriculación según CO₂, potencia o valor, o nada. Suelen ser los que deciden si la importación compensa.",
      ],
    },
    {
      id: "adaptation",
      title: "Adaptación a la normativa UE y matriculación",
      paras: [
        "Los coches del mercado estadounidense no cumplen algunas normas técnicas europeas y hay que modificarlos antes de la inspección técnica:",
        [
          "Los intermitentes traseros deben ser ámbar: en muchos coches de EE. UU. parpadean las luces de freno rojas.",
          "Es obligatoria una luz antiniebla trasera.",
          "Los faros deben tener el haz de cruce europeo y estar bien regulados.",
          "El velocímetro debe indicar km/h (una doble escala suele bastar).",
          "Los sensores de presión de neumáticos (TPMS) de EE. UU. funcionan a 315 MHz; en Europa es habitual 433 MHz, lo que importa al cambiar ruedas.",
        ],
        "Adaptar las luces suele costar unos cientos de euros. En algunos países – p. ej. Alemania o Francia – un coche de fuera de la UE necesita además una homologación individual o un informe pericial, lo que lleva tiempo y dinero.",
        "Para matricular, prepara traducciones juradas del título y la factura, el documento de despacho aduanero, el justificante de los impuestos nacionales y el informe de inspección técnica. Muchos países fijan un plazo legal para matricular un coche importado: en Polonia, por ejemplo, 30 días.",
      ],
    },
    {
      id: "mistakes",
      title: "Los errores más comunes al importar desde EE. UU.",
      paras: [
        [
          "Pujar sin calcular el coste total: tasas, transporte e impuestos pueden duplicar el precio de subasta.",
          "Comprar un coche con título «parts only» o certificate of destruction que no se puede matricular legalmente.",
          "Fiarse de «Run and Drive» sin revisar el historial del VIN.",
          "No reservar margen para daños ocultos y piezas: reparar un coche accidentado casi siempre cuesta más de lo que sugieren las fotos.",
          "Contar con arancel 0 % sin prueba del origen estadounidense: sin ella pagas el 10 %.",
          "Pagar tarde en la subasta y acumular tasas de almacenamiento en la campa.",
          "Saltarse el plazo de matriculación o de declaración de impuestos nacionales tras la llegada del coche.",
        ],
      ],
    },
  ],
  CANADA: [
    {
      id: "market",
      title: "El mercado de coches de Canadá – en qué se diferencia de EE. UU.",
      paras: [
        "Canadá es un mercado más pequeño que EE. UU., pero con una oferta muy parecida: las mismas marcas, modelos y acabados, a menudo algo más baratos que en Europa. Muchos lo ven como alternativa a EE. UU., sobre todo para coches de fábricas canadienses, que pueden acogerse al acuerdo CETA.",
        "Los coches canadienses tienen algunas ventajas: cuentakilómetros en kilómetros, luces diurnas de fábrica y equipamiento para el invierno (asientos calefactados, a veces calentador del motor). El inconveniente puede ser la corrosión: en invierno las carreteras se salan mucho y los bajos de un coche de Ontario o Quebec pueden estar peor que los de uno del sur de EE. UU.",
        "Lo más importado de Canadá son SUV y pick-ups, coches fabricados allí (p. ej. Toyota RAV4, Lexus RX, Honda CR-V y Civic, Chrysler Pacifica) y coches de fin de renting con pocos kilómetros.",
      ],
    },
    {
      id: "auctions",
      title: "Dónde comprar un coche en Canadá",
      paras: [
        "Los coches siniestrados se venden en Canadá en Copart Canada e IAA (antes Impact Auto Auctions); los no siniestrados, en subastas profesionales como ADESA y en concesionarios. Como en EE. UU., a muchas subastas solo se accede a través de un bróker con licencia.",
        "También es habitual comprar a concesionarios y particulares en portales de anuncios. En una compra privada debes encargarte tú de los documentos de exportación y del transporte al puerto, por eso la mayoría de compradores europeos usa una empresa exportadora que recoge el coche, revisa los papeles y lo embarca.",
        "Al precio se suman las tasas de subasta o del concesionario y, en concesionario, los impuestos de venta canadienses (GST/HST/PST). Parte de ellos puede recuperarse o no cobrarse si el concesionario vende directamente para exportación: pregunta antes de comprar.",
      ],
    },
    {
      id: "titles",
      title: "Documentos de propiedad y estados de daño",
      paras: [
        "En Canadá no existe el «title» estadounidense: el documento es el registro emitido por la provincia (en Ontario, el «ownership»). El estado de daño figura en el registro provincial:",
        [
          "Ontario y la mayoría de provincias: Normal, Salvage (siniestro total no autorizado a circular), Rebuilt (reparado y aprobado tras inspección) e Irreparable, solo para piezas.",
          "Quebec: vehículos gravemente accidentados (VGA – véhicule gravement accidenté) con la mención «reconstruit» (reconstruido) o «irrécupérable» (irreparable).",
        ],
        "No compres para circular coches marcados como irreparable o irrécupérable: no pueden matricularse legalmente. Los demás estados no pasan al permiso de circulación europeo, pero afectan al valor e indican daños graves.",
      ],
    },
    {
      id: "inspection",
      title: "Cómo revisar un coche de Canadá",
      paras: [
        [
          "Historial del VIN: un informe CARFAX Canada muestra daños, registros en provincias y kilometraje; si el coche vino de EE. UU., revisa también el historial estadounidense.",
          "Cargas (liens): en Canadá un coche puede garantizar un préstamo. Comprueba en el registro de garantías de la provincia (p. ej. PPSA) que está libre de cargas; si no, la exportación puede bloquearse e incluso podrías perder el coche.",
          "Corrosión: pide fotos de los bajos, estribos, pasos de rueda y conductos de freno: la sal de las carreteras pasa factura.",
          "Versión de mercado: los coches canadienses suelen ser muy parecidos a los estadounidenses y necesitan cambios de luces similares.",
        ],
        "Para coches de subasta valen las mismas reglas que en EE. UU.: fotos de los daños, el significado de «Run and Drive» y un margen para daños ocultos.",
      ],
    },
    {
      id: "shipping",
      title: "Exportación y transporte marítimo desde Canadá",
      paras: [
        "Los puertos más usados son Halifax y Montreal en el este y Vancouver en el oeste. Desde la costa este, el barco a puertos del mar del Norte tarda normalmente unas 2 semanas, una de las rutas más rápidas a Europa. Los coches del oeste suelen ir en tren hacia el este o salir de Vancouver por el canal de Panamá, lo que tarda más.",
        "Para exportar se necesita el documento de propiedad (registro provincial), la prueba de compra y una declaración de exportación en el sistema de la CBSA (CERS), que suele presentar el exportador o el transitario. El coche debe estar libre de cargas.",
        "Las formas de transporte son las mismas que desde EE. UU.: contenedor compartido, contenedor exclusivo o RoRo para coches que circulan. En invierno hay que contar con posibles retrasos en el transporte terrestre al puerto.",
      ],
    },
    {
      id: "duty",
      title: "Arancel y el acuerdo CETA",
      paras: [
        "Gracias al acuerdo comercial UE–Canadá (CETA), los coches fabricados en Canadá pueden entrar en la UE con arancel 0 %. La condición es el origen canadiense confirmado por una declaración de origen del exportador. Comprar en Canadá no basta: muchos coches vendidos allí se fabricaron en EE. UU., México o Japón y pagan el 10 % completo.",
        "Un VIN que empieza por «2» indica un coche fabricado en Canadá. Es una buena pista, pero no una prueba: al comprar a un particular suele ser difícil conseguir la declaración de origen, y sin ella el arancel es del 10 % del valor en aduana (CIF). Los pick-ups clasificados como comerciales pagan un 22 %.",
        "Sobre el arancel se aplica el IVA de importación del país de despacho y, en el país de matriculación, los impuestos nacionales (especial o de matriculación). Las empresas pueden usar el régimen 4200 y liquidar el IVA en el país de destino.",
      ],
    },
    {
      id: "adaptation",
      title: "Adaptación a la normativa UE y matriculación",
      paras: [
        "Los coches canadienses son algo más fáciles de matricular que los estadounidenses: tienen velocímetro en km/h y luces diurnas de fábrica. Aun así, normalmente hay que:",
        [
          "cambiar los intermitentes traseros a ámbar si parpadean las luces de freno,",
          "añadir una luz antiniebla trasera,",
          "adaptar los faros al haz de cruce europeo.",
        ],
        "Para matricular se necesitan traducciones juradas, el documento de despacho aduanero, el justificante de impuestos nacionales y la inspección técnica. Países como Alemania o Francia pueden exigir una homologación individual.",
      ],
    },
    {
      id: "mistakes",
      title: "Los errores más comunes al importar desde Canadá",
      paras: [
        [
          "Dar por hecho que todo coche de Canadá paga 0 %: solo vale para coches fabricados en Canadá con declaración de origen.",
          "No comprobar cargas (liens) antes de comprar.",
          "Pasar por alto la corrosión de los bajos en coches de provincias con inviernos duros.",
          "Comprar un coche con estado irreparable o irrécupérable.",
          "Subestimar el transporte terrestre desde las provincias del oeste a los puertos del este.",
        ],
      ],
    },
  ],
  JAPAN: [
    {
      id: "market",
      title: "El mercado de coches de Japón – por qué JDM",
      paras: [
        "Japón es famoso por coches en muy buen estado técnico y con pocos kilómetros. La razón es la estricta inspección shaken, cada vez más cara a medida que el coche envejece: muchos japoneses venden tras pocos años y los precios de los coches más antiguos bajan rápido.",
        "Lo que más se importa de Japón son coches JDM (Japanese Domestic Market): leyendas deportivas (Nissan Skyline GT-R, Toyota Supra, Mazda RX-7, Honda NSX), todoterrenos (Toyota Land Cruiser), monovolúmenes e híbridos recientes. Para los coleccionistas, lo clave son los modelos nunca vendidos oficialmente en Europa.",
        "Todos los coches del mercado japonés llevan el volante a la derecha. Pueden matricularse en la UE, pero conducirlos por la derecha es menos cómodo y pueden ser más difíciles de revender, salvo los modelos de colección buscados.",
      ],
    },
    {
      id: "auctions",
      title: "Subastas en Japón – USS y otras",
      paras: [
        "La mayoría de los coches usados en Japón pasa por subastas profesionales. La mayor es la red USS, junto a TAA, CAA, HAA, JU y Arai, entre otras. Cada semana se ofrecen decenas de miles de coches.",
        "Un comprador extranjero no puja directamente: lo hace un exportador japonés (agente de subastas), que tiene acceso, traduce la hoja de subasta, compra el coche, lo da de baja para exportación y lo embarca. Al precio de remate se suman la tasa de subasta, la comisión del exportador, el transporte interior al puerto y los documentos de exportación. Se paga normalmente en yenes.",
        "También se puede comprar del stock de un exportador: puede salir más caro, pero el coche ya está revisado y a menudo espera en el puerto.",
      ],
    },
    {
      id: "titles",
      title: "Cómo leer una hoja de subasta japonesa",
      paras: [
        "La hoja de subasta (auction sheet) es el informe del inspector de la subasta: la fuente de información más importante sobre el coche. Incluye una nota general, una nota de interior y un mapa de daños de la carrocería.",
        [
          "Nota general: S o 6 – prácticamente nuevo; 5 y 4,5 – muy buen estado; 4 – buen estado con leves signos de uso; 3,5 y 3 – defectos visibles o más kilómetros; R o RA – accidente reparado (RA – reparación menor); 0 o *** – dañado, inundado o sin nota.",
          "Nota de interior: de A (como nuevo) a E (muy desgastado).",
          "Mapa de daños: A – arañazo, U – abolladura, B – abolladura con arañazo, W – ondulación o huellas de reparación, S y C – óxido y corrosión, P – marcas de pintura, X – pieza a sustituir, XX – pieza sustituida, Y – grieta o agujero. El número junto a la letra (1–3) indica el tamaño del daño.",
        ],
        "La hoja muestra también el kilometraje verificado por la subasta, el equipamiento y las notas del inspector en japonés: un buen exportador las traduce antes de pujar.",
      ],
    },
    {
      id: "inspection",
      title: "En qué fijarse con coches de Japón",
      paras: [
        [
          "Kilometraje: los coches japoneses suelen tener kilómetros reales y bajos, pero comprueba el historial en la hoja de subasta y en el certificado de exportación.",
          "Óxido: los coches del norte (Hokkaido) y de zonas costeras pueden estar corroídos por la sal; mira fotos de los bajos.",
          "Modificaciones: los deportivos suelen tener suspensión, escape y motor modificados, lo que puede complicar la inspección técnica en la UE.",
          "Limitadores: muchos coches JDM llevan un limitador de fábrica a 180 km/h.",
          "Electrónica: las radios japonesas usan la banda FM de 76–90 MHz, la navegación y los menús están en japonés y la unidad de peaje ETC no sirve en Europa.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Exportación y transporte desde Japón",
      paras: [
        "Tras la compra, el exportador da de baja el coche y obtiene el certificado de exportación (Export Certificate), el documento que sustituye al registro, con los datos del coche y el kilometraje. Es necesario para el despacho y la matriculación en la UE, junto con la factura y el conocimiento de embarque (B/L).",
        "Los coches salen sobre todo de Yokohama, Nagoya, Kobe y Osaka. Los buques RoRo a Europa tardan normalmente 5–7 semanas (por el canal de Suez o rodeando África); los contenedores, algo parecido o un poco más. El contenedor es buena opción para coches valiosos o que no arrancan.",
        "Los puertos de destino más habituales son Bremerhaven, Róterdam, Amberes y Zeebrugge. Conviene contratar un seguro de transporte: en una travesía larga el riesgo de daños es mayor.",
      ],
    },
    {
      id: "duty",
      title: "Arancel y el acuerdo UE–Japón",
      paras: [
        "El Acuerdo de Asociación Económica UE–Japón (AAE) eliminó el arancel de los coches de forma gradual: desde 2026, los coches de origen japonés pueden entrar en la UE con arancel 0 %. El origen se acredita con una declaración de origen del exportador o con el conocimiento del importador (documentos que demuestran que el coche se fabricó en Japón).",
        "Los coches JDM fabricados en Japón suelen cumplir. Ojo con las marcas japonesas fabricadas en otros países (p. ej. EE. UU. o Tailandia): pagan el 10 % estándar del valor en aduana. Sin prueba de origen, el arancel también es del 10 %.",
        "Los coches de más de 30 años en estado original pueden considerarse vehículos de colección: entonces el arancel es del 0 % y algunos países aplican un IVA reducido. Tras el despacho se aplican en el país de matriculación los impuestos nacionales según motor, emisiones o valor.",
      ],
    },
    {
      id: "adaptation",
      title: "Volante a la derecha – matriculación en la UE",
      paras: [
        "Los coches con volante a la derecha pueden matricularse en los países de la UE si cumplen los requisitos técnicos. Los cambios principales son:",
        [
          "faros para circular por la derecha (reglaje o cambio de las ópticas),",
          "luz antiniebla trasera en el lado correcto e intermitentes ámbar (los coches japoneses suelen tenerlos ya),",
          "velocímetro en km/h: los coches japoneses lo traen de fábrica.",
        ],
        "Algunos países, como Alemania, exigen una homologación individual o un informe pericial. Para matricular se necesitan traducciones del certificado de exportación y la factura, el documento de despacho, el justificante de impuestos nacionales y la inspección técnica.",
      ],
    },
    {
      id: "mistakes",
      title: "Los errores más comunes al importar desde Japón",
      paras: [
        [
          "Pujar sin la hoja de subasta traducida.",
          "Subestimar el plazo: de la compra a la matriculación pasan a menudo 2–3 meses.",
          "Contar con arancel 0 % para una marca japonesa fabricada fuera de Japón.",
          "Olvidar el coste de adaptar las luces y de una posible homologación individual.",
          "Comprar un coche muy modificado que no pasará la inspección técnica.",
          "No asegurar la larga travesía.",
        ],
      ],
    },
  ],
  UAE: [
    {
      id: "market",
      title: "El mercado de coches de los Emiratos Árabes Unidos",
      paras: [
        "Dubái y los demás emiratos están entre los mayores mercados de coches de lujo del mundo. La fuerte demanda de coches nuevos llena el mercado de ocasión de SUV, deportivos y berlinas premium de pocos años, a menudo más baratos que en Europa.",
        "La mayoría de los coches vendidos en los EAU son versiones GCC (Gulf Cooperation Council), preparadas para el calor: climatización y refrigeración reforzadas y a veces un equipamiento distinto al europeo. También hay muchos coches traídos de EE. UU. – a menudo siniestrados – que se revenden como «importados».",
        "Lo que más se importa de los EAU son SUV grandes (Nissan Patrol, Toyota Land Cruiser, Lexus LX), coches de lujo y deportivos. En coches con más kilómetros hay que tener en cuenta los efectos del clima.",
      ],
    },
    {
      id: "auctions",
      title: "Dónde comprar un coche en los EAU",
      paras: [
        "Se compra en concesionarios (también en programas de ocasión certificada de las marcas), en subastas como Emirates Auction y Copart EAU, y en anuncios. En Dubái hay además un gran mercado de usados con muchas empresas exportadoras que atienden a compradores extranjeros.",
        "Al comprar desde el extranjero, lo más seguro es hacerlo a través de un exportador de confianza: revisa el coche y los documentos, lo da de baja, obtiene el certificado de exportación y lo embarca.",
      ],
    },
    {
      id: "titles",
      title: "Documentos: Mulkiya y certificado de exportación",
      paras: [
        "El documento de registro en los EAU es la tarjeta Mulkiya, emitida por la autoridad de tráfico (en Dubái, la RTA). Para exportar hay que dar de baja el coche y obtener un certificado de exportación (a menudo con placas de exportación): el documento clave para el despacho en la UE.",
        "El coche no puede tener multas pendientes ni gravámenes bancarios. En los EAU muchos coches se compran a crédito: antes de comprar, comprueba que el préstamo está pagado y que el banco ha autorizado la exportación.",
      ],
    },
    {
      id: "inspection",
      title: "Cómo revisar un coche de los EAU",
      paras: [
        [
          "Origen: comprueba con el VIN si el coche es versión GCC o vino de EE. UU. Un VIN que empieza por 1, 4 o 5 indica un coche fabricado en EE. UU.: revisa entonces su historial estadounidense (daños, título salvage).",
          "Inundación: tras las tormentas de 2024 llegaron al mercado muchos coches inundados. Busca marcas de agua, lodo y corrosión en el habitáculo y la electrónica.",
          "Daños por el clima: las altas temperaturas desgastan juntas de goma, plásticos, baterías, neumáticos y climatización.",
          "Historial de mantenimiento: los coches de concesionario suelen tenerlo completo, una gran ventaja al revender.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Exportación y transporte desde los EAU",
      paras: [
        "El puerto principal es Jebel Ali, en Dubái. La travesía a puertos europeos suele durar 3–5 semanas, según la ruta (mar Rojo y canal de Suez o rodeando África) y el puerto de destino. Los coches viajan en contenedor o en buques RoRo.",
        "Para el despacho en la UE se necesitan el certificado de exportación, la factura y el conocimiento de embarque (B/L). En coches que llegaron antes a los EAU desde EE. UU., también son útiles los documentos del historial estadounidense.",
      ],
    },
    {
      id: "duty",
      title: "Arancel al importar desde los EAU",
      paras: [
        "La UE no tiene con los EAU ningún acuerdo que reduzca el arancel de los coches, así que los coches de los Emiratos pagan el 10 % estándar del valor en aduana (CIF), y los pick-ups clasificados como comerciales un 22 %. Esto vale también para coches fabricados en EE. UU.: el arancel 0 % de los coches estadounidenses exige enviarlos directamente desde EE. UU.",
        "Sobre el arancel se aplica el IVA de importación del país de despacho y, en el país de matriculación, los impuestos nacionales. Los coches de más de 30 años en estado original pueden considerarse de colección, con arancel 0 %.",
      ],
    },
    {
      id: "adaptation",
      title: "Adaptación a la normativa UE y matriculación",
      paras: [
        "Las versiones GCC llevan el volante a la izquierda, velocímetro en km/h y normalmente una iluminación próxima a la europea, así que los cambios suelen ser menores que en coches de EE. UU. Aun así, revisa intermitentes, luz antiniebla trasera y faros.",
        "Los coches llevados a los EAU desde EE. UU. tienen especificación estadounidense y necesitan los mismos cambios que los comprados directamente en América. Algunos países de la UE exigen una homologación individual.",
      ],
    },
    {
      id: "mistakes",
      title: "Los errores más comunes al importar desde los EAU",
      paras: [
        [
          "Comprar un coche estadounidense vendido como «GCC» sin revisar el VIN y el historial.",
          "Un préstamo o multas pendientes que bloquean la exportación.",
          "Pasar por alto señales de inundación y daños por calor.",
          "Contar con arancel 0 %: los coches de los EAU pagan el 10 % estándar.",
        ],
      ],
    },
  ],
  UK: [
    {
      id: "market",
      title: "El mercado de coches del Reino Unido tras el Brexit",
      paras: [
        "El Reino Unido es un gran mercado de coches usados con una oferta enorme de premium, deportivos y clásicos. Desde el Brexit es un país tercero para la UE, así que la importación exige despacho aduanero; pero gracias al Acuerdo de Comercio y Cooperación UE–Reino Unido (TCA), los coches que cumplen las normas de origen pueden entrar con arancel 0 %.",
        "Todos los coches británicos llevan el volante a la derecha. Por eso lo que más se importa son coches en los que esto no importa o que salen especialmente baratos: clásicos, coches de colección, versiones raras y premium. También es habitual traer de vuelta coches de marcas europeas que antes se fueron al Reino Unido.",
      ],
    },
    {
      id: "auctions",
      title: "Dónde comprar un coche en el Reino Unido",
      paras: [
        "Se compra en concesionarios, en anuncios (p. ej. Auto Trader) y en subastas: profesionales (BCA, Manheim) y de siniestrados (Copart UK). Muchos coches tienen historial de mantenimiento documentado.",
        "En las subastas de siniestrados, los coches llevan una categoría de daño que hay que conocer antes de comprar.",
      ],
    },
    {
      id: "titles",
      title: "Categorías de daño y el V5C",
      paras: [
        "El documento de registro es el V5C (logbook). Los siniestros totales reciben en el Reino Unido una categoría:",
        [
          "Cat S – daño estructural (p. ej. largueros, pilares); el coche puede repararse y volver a circular.",
          "Cat N – daño no estructural (p. ej. electrónica, piezas de carrocería); el coche puede repararse.",
          "Cat B – solo piezas, la carrocería debe destruirse.",
          "Cat A – solo desguace.",
        ],
        "No compres para circular coches de categoría A o B. Las categorías S y N indican daños graves en el pasado: revisa la calidad de la reparación.",
      ],
    },
    {
      id: "inspection",
      title: "Cómo revisar un coche del Reino Unido",
      paras: [
        [
          "Historial MOT: en la web del gobierno gov.uk puedes consultar gratis, con la matrícula, todas las inspecciones MOT, con el kilometraje de cada año y la lista de defectos. Es la mejor forma de detectar un cuentakilómetros manipulado.",
          "Informe HPI (o similar): muestra financiación pendiente, robo y si el coche se registró como siniestro total.",
          "Historial de mantenimiento y número de dueños según el V5C.",
          "Kilometraje en millas: para matricular en la UE el velocímetro debe indicar también km/h.",
        ],
      ],
    },
    {
      id: "shipping",
      title: "Exportación y transporte desde el Reino Unido",
      paras: [
        "La mayoría de los coches cruza el canal de la Mancha en ferry o tren (Dover–Calais, Eurotúnel), en camión portacoches o conduciendo. El transporte suele tardar de unos días a una semana. Los coches de Escocia o del norte de Inglaterra también pueden ir en buque RoRo a puertos del Benelux y Alemania.",
        "Desde el Brexit hacen falta dos declaraciones aduaneras: una de exportación en el Reino Unido y otra de importación en la UE, aunque conduzcas tú el coche. Normalmente las tramita un agente de aduanas en la terminal. El titular comunica además a la DVLA la exportación definitiva mediante la parte correspondiente del V5C.",
        "Circular con matrícula británica hasta el país de matriculación exige seguro y MOT en vigor: un camión portacoches suele ser más sencillo.",
      ],
    },
    {
      id: "duty",
      title: "Arancel, TCA e IVA",
      paras: [
        "El Acuerdo de Comercio y Cooperación UE–Reino Unido (TCA) permite arancel 0 %, pero solo para coches que cumplen las normas de origen, es decir, en la práctica fabricados en el Reino Unido o en la UE. El origen se acredita con una declaración de origen del exportador o con el conocimiento del importador. Un coche japonés o estadounidense comprado en el Reino Unido paga el 10 % estándar del valor en aduana.",
        "Con independencia del arancel se paga el IVA de importación del país de despacho. Si compras a un concesionario británico, pregunta si la venta para exportación puede hacerse sin IVA británico: si no, pagarás el IVA dos veces.",
        "En el país de matriculación se suman los impuestos nacionales según motor, emisiones o valor.",
      ],
    },
    {
      id: "adaptation",
      title: "Volante a la derecha y matriculación en la UE",
      paras: [
        "Los coches británicos se fabricaron según las normas europeas de homologación, así que a menudo tienen certificado de conformidad (COC) y se matriculan más fácilmente que los estadounidenses. Normalmente queda:",
        [
          "faros para circular por la derecha,",
          "luz antiniebla trasera en el lado correcto,",
          "velocímetro con escala en km/h.",
        ],
        "Para matricular se necesitan el V5C (o la prueba de exportación), la factura, traducciones juradas, el documento de despacho, el justificante de impuestos nacionales y la inspección técnica.",
      ],
    },
    {
      id: "mistakes",
      title: "Los errores más comunes al importar desde el Reino Unido",
      paras: [
        [
          "Creer que tras el Brexit todo está libre de arancel: el 0 % solo vale para coches que cumplen las normas de origen.",
          "Pagar el IVA británico y el IVA de importación de la UE por el mismo coche.",
          "Comprar un coche de categoría A o B.",
          "No revisar el historial MOT ni un informe HPI.",
          "Cruzar la frontera sin declaraciones aduaneras al conducir tú mismo el coche.",
        ],
      ],
    },
  ],
};

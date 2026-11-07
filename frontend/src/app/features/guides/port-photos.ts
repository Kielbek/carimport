import { ModelPhoto } from './model-types';

/**
 * Port photos from Wikimedia Commons, picked by hand from the candidates that tools/fetch_page_photos.py ports
 * saves in tools/page-photos.json (port-<code>). Shown on the port guide with author and licence.
 */
export const PORT_PHOTOS: Readonly<Record<string, ModelPhoto>> = {
  DEBRV: {"src": "/images/pages/port-DEBRV-4", "width": 1280, "height": 720, "author": "Dietmar Rabich", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0", "source": "https://commons.wikimedia.org/wiki/File:Bremerhaven,_%C3%9Cberseehafen,_Kaiserhafen_--_2024_--_2256.jpg"},
  DEHAM: {"src": "/images/pages/port-DEHAM-5", "width": 1280, "height": 720, "author": "Matti Blume", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0", "source": "https://commons.wikimedia.org/wiki/File:Bremen_Belle,_Zellmannstra%C3%9Fe,_Hamburg_(P1080475).jpg"},
  NLRTM: {"src": "/images/pages/port-NLRTM-3", "width": 1280, "height": 720, "author": "FrDr", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0", "source": "https://commons.wikimedia.org/wiki/File:Haven_van_Rotterdam_02.jpg"},
  BEANR: {"src": "/images/pages/port-BEANR-1", "width": 1280, "height": 720, "author": "Trougnouf", "license": "CC BY 4.0", "licenseUrl": "https://creativecommons.org/licenses/by/4.0", "source": "https://commons.wikimedia.org/wiki/File:Antwerp_Euroterminal_NV_during_sunset_civil_twilight_in_Kieldrecht,_Belgium_(DSCF3937).jpg"},
  BEZEE: {"src": "/images/pages/port-BEZEE-4", "width": 1280, "height": 720, "author": "CEphoto, Uwe Aranas", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0", "source": "https://commons.wikimedia.org/wiki/File:Zeebrugge_Belgium_Tugboat-Smit-Lion-and-Elbe-Highway.jpg"},
  PLGDN: {"src": "/images/pages/port-PLGDN-4", "width": 1280, "height": 720, "author": "Krzysztof Rakowski", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0", "source": "https://commons.wikimedia.org/wiki/File:Port_w_Gda%C5%84sku._Widok_z_Mostu_Siennickiego_-_panoramio.jpg"},
  PLGDY: {"src": "/images/pages/port-PLGDY-3", "width": 1280, "height": 720, "author": "Joymaster", "license": "Public domain", "licenseUrl": "https://commons.wikimedia.org/wiki/File:Gdynia_z_lotu_ptaka_-_081.JPG", "source": "https://commons.wikimedia.org/wiki/File:Gdynia_z_lotu_ptaka_-_081.JPG"},
  PLSZZ: {"src": "/images/pages/port-PLSZZ-4", "width": 1280, "height": 720, "author": "Photographs by Radosław Drożdżewski (User:Zwiadowca21)", "license": "CC BY-SA 4.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0", "source": "https://commons.wikimedia.org/wiki/File:Szczecin_-_Port_-_25.08.2024_16-28-47.jpg"},
  LTKLJ: {"src": "/images/pages/port-LTKLJ-4", "width": 1280, "height": 720, "author": "Algirdas at Lithuanian Wikipedia", "license": "CC BY-SA 3.0", "licenseUrl": "http://creativecommons.org/licenses/by-sa/3.0/", "source": "https://commons.wikimedia.org/wiki/File:Klaipedos_uostas3.jpg"},
  SIKOP: {"src": "/images/pages/port-SIKOP-1", "width": 1280, "height": 720, "author": "John at w:Picasa", "license": "CC BY-SA 3.0", "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0", "source": "https://commons.wikimedia.org/wiki/File:Koper_(38).jpg"},
};

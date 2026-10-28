#!/usr/bin/env python3
"""Fetches a freely licensed photo for every model in tools/models.json from Wikimedia Commons.

For each model without a photo (or with "photo": {"commons": "File:..."} to pin a file) it searches Commons, keeps
only CC0 / public domain / CC BY / CC BY-SA images in landscape orientation, saves public/images/models/<id>-640.webp
and -1280.webp (16:9 crop) and writes author, licence and source into models.json. Re-run the model generator after:
    python3 tools/fetch_model_photos.py [--force] [model-id ...]
    (backend) java -jar app.jar --spring.profiles.active=models
Review the chosen photos before publishing - search results can show the wrong generation or a toy model.
"""
import html, io, json, re, sys, time, urllib.error, urllib.parse, urllib.request
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
MODELS = ROOT / 'tools' / 'models.json'
OUT = ROOT / 'public' / 'images' / 'models'
API = 'https://commons.wikimedia.org/w/api.php'
UA = {'User-Agent': 'CargloModelPhotos/1.0 (https://cargloapp.com; kontakt@cargloapp.com)'}
FREE = re.compile(r'^(CC0|Public domain|PD|CC BY(-SA)? \d(\.\d)?)', re.I)
SIZES = (640, 1280)


def get(url, attempts=10):
    # Wikimedia rate-limits shared cloud IPs: pace the requests and honour Retry-After
    for attempt in range(attempts):
        time.sleep(1.5)
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
                return r.read()
        except urllib.error.HTTPError as e:
            if e.code != 429 or attempt == attempts - 1:
                raise
            wait = int(e.headers.get('Retry-After') or 30)
            print(f'  rate limited, waiting {wait}s', file=sys.stderr, flush=True)
            time.sleep(wait + 2)


def query(params):
    params = {**params, 'format': 'json', 'formatversion': '2'}
    return json.loads(get(API + '?' + urllib.parse.urlencode(params)))


def text(meta, key):
    raw = (meta.get(key) or {}).get('value', '')
    return html.unescape(re.sub(r'<[^>]+>', '', raw)).strip()


BAD_WORDS = re.compile(r'police|polic[ií]a|polizei|sheriff|patrol car|rac(e|ing)|rally|nascar|supercars|drift|prototype|concept|'
                       r'interior|dashboard|engine|wreck|crash|toy|lego|model kit|mach-e|rear', re.I)


def plausible(title, m):
    """Skips photos of the wrong generation (a year far from the model's) and of police, race or show cars."""
    if BAD_WORDS.search(title):
        return False
    if m.get('photoMust') and m['photoMust'].lower() not in title.lower():
        return False
    years = [int(y) for y in re.findall(r'(?<!\d)(19[5-9]\d|20[0-3]\d)(?!\d)', title)]
    return not years or any(abs(y - int(m['year'])) <= 4 for y in years)


def candidates(m):
    photo = m.get('photo') or {}
    pinned = None if 'src' in photo else photo.get('commons')  # a fetched photo is re-searched on --force
    common = {'prop': 'imageinfo', 'iiprop': 'url|size|mime|extmetadata', 'iiurlwidth': '1600'}
    if pinned:
        pages = query({'action': 'query', 'titles': pinned, **common})['query']['pages']
    else:
        searches = m.get('photoQuery') or f'{m["make"]} {m["model"].split(" ")[0]} {m["year"]}'
        pages = []
        for search in [searches] if isinstance(searches, str) else searches:
            found = query({'action': 'query', 'generator': 'search', 'gsrnamespace': '6', 'gsrlimit': '30',
                           'gsrsearch': search + ' filetype:bitmap -interior -engine -toy', **common})
            pages += sorted(found.get('query', {}).get('pages', []), key=lambda p: p.get('index', 0))
    for p in pages:
        info = (p.get('imageinfo') or [{}])[0]
        meta = info.get('extmetadata', {})
        lic = text(meta, 'LicenseShortName')
        w, h = info.get('width', 0), info.get('height', 0)
        if info.get('mime') not in ('image/jpeg', 'image/png') or not FREE.match(lic):
            continue
        if not pinned and (w < 1200 or not 1.25 <= w / max(h, 1) <= 2.1):
            continue
        if not pinned and not plausible(p['title'], m):
            continue
        yield p['title'], info, lic, text(meta, 'Artist') or 'unknown', (meta.get('LicenseUrl') or {}).get('value', '')


def save(model_id, url):
    img = Image.open(io.BytesIO(get(url))).convert('RGB')
    w, h = img.size
    th = round(w * 9 / 16)  # crop to 16:9 around the middle
    if th <= h:
        top = (h - th) // 2
        img = img.crop((0, top, w, top + th))
    else:
        tw = round(h * 16 / 9)
        left = (w - tw) // 2
        img = img.crop((left, 0, left + tw, h))
    OUT.mkdir(parents=True, exist_ok=True)
    for size in SIZES:
        img.resize((size, round(size * 9 / 16)), Image.LANCZOS).save(OUT / f'{model_id}-{size}.webp', 'WEBP', quality=80)
    return 1280, 720


def main(argv):
    force = '--force' in argv
    only = [a for a in argv if not a.startswith('--')]
    data = json.loads(MODELS.read_text())
    for m in data['models']:
        if only and m['id'] not in only:
            continue
        if m.get('photo', {}).get('src') and not force:
            continue
        found = next(candidates(m), None)
        if not found:
            print(f'{m["id"]}: no freely licensed landscape photo found - pin one with "photo": {{"commons": "File:..."}}')
            if force and m.pop('photo', None):  # better no photo than the wrong car
                for size in SIZES:
                    (OUT / f'{m["id"]}-{size}.webp').unlink(missing_ok=True)
                MODELS.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
            continue
        title, info, lic, author, lic_url = found
        width, height = save(m['id'], info['url'])
        m['photo'] = {
            'src': f'/images/models/{m["id"]}', 'width': width, 'height': height,
            'author': author[:120], 'license': lic,
            'licenseUrl': lic_url or 'https://creativecommons.org/publicdomain/zero/1.0/',
            'source': info.get('descriptionurl') or 'https://commons.wikimedia.org/wiki/' + urllib.parse.quote(title),
            'commons': title,
        }
        print(f'{m["id"]}: {title} ({lic}, {author[:40]})', flush=True)
        MODELS.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')  # saved per model, so a re-run resumes


if __name__ == '__main__':
    main(sys.argv[1:])

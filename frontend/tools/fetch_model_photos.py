#!/usr/bin/env python3
"""Fetches a freely licensed photo for every model in tools/models.json from Wikimedia Commons.

For each model without a photo (or with "photo": {"commons": "File:..."} to pin a file) it searches Commons, keeps
only CC0 / public domain / CC BY / CC BY-SA images in landscape orientation, saves public/images/models/<id>-640.webp
and -1280.webp (16:9 crop) and writes author, licence and source into models.json. Re-run the model generator after:
    python3 tools/fetch_model_photos.py [--force] [model-id ...]
    (backend) java -jar app.jar --spring.profiles.active=models
Review the chosen photos before publishing - search results can show the wrong generation or a toy model.
"""
import html, io, json, re, sys, urllib.parse, urllib.request
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
MODELS = ROOT / 'tools' / 'models.json'
OUT = ROOT / 'public' / 'images' / 'models'
API = 'https://commons.wikimedia.org/w/api.php'
UA = {'User-Agent': 'CargloModelPhotos/1.0 (https://cargloapp.com; kontakt@cargloapp.com)'}
FREE = re.compile(r'^(CC0|Public domain|PD|CC BY(-SA)? \d(\.\d)?)', re.I)
SIZES = (640, 1280)


def get(url):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r:
        return r.read()


def query(params):
    params = {**params, 'format': 'json', 'formatversion': '2'}
    return json.loads(get(API + '?' + urllib.parse.urlencode(params)))


def text(meta, key):
    raw = (meta.get(key) or {}).get('value', '')
    return html.unescape(re.sub(r'<[^>]+>', '', raw)).strip()


def candidates(m):
    pinned = (m.get('photo') or {}).get('commons')
    common = {'prop': 'imageinfo', 'iiprop': 'url|size|mime|extmetadata', 'iiurlwidth': '1600'}
    if pinned:
        pages = query({'action': 'query', 'titles': pinned, **common})['query']['pages']
    else:
        search = f'{m["make"]} {m["model"].split(" ")[0]} {m["year"]} filetype:bitmap -interior -engine -toy'
        pages = query({'action': 'query', 'generator': 'search', 'gsrsearch': search, 'gsrnamespace': '6',
                       'gsrlimit': '30', **common}).get('query', {}).get('pages', [])
    for p in sorted(pages, key=lambda p: p.get('index', 0)):
        info = (p.get('imageinfo') or [{}])[0]
        meta = info.get('extmetadata', {})
        lic = text(meta, 'LicenseShortName')
        w, h = info.get('width', 0), info.get('height', 0)
        if info.get('mime') not in ('image/jpeg', 'image/png') or not FREE.match(lic):
            continue
        if not pinned and (w < 1600 or not 1.25 <= w / max(h, 1) <= 2.1):
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
            continue
        title, info, lic, author, lic_url = found
        width, height = save(m['id'], info.get('thumburl') or info['url'])
        m['photo'] = {
            'src': f'/images/models/{m["id"]}', 'width': width, 'height': height,
            'author': author[:120], 'license': lic,
            'licenseUrl': lic_url or 'https://creativecommons.org/publicdomain/zero/1.0/',
            'source': info.get('descriptionurl') or 'https://commons.wikimedia.org/wiki/' + urllib.parse.quote(title),
            'commons': title,
        }
        print(f'{m["id"]}: {title} ({lic}, {author[:40]})')
    MODELS.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')


if __name__ == '__main__':
    main(sys.argv[1:])

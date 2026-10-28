#!/usr/bin/env python3
"""Fetches freely licensed Wikimedia Commons photos for article pages (Copart guide, VIN check).

For each page in PAGES it keeps up to MAX landscape candidates (CC0 / public domain / CC BY / CC BY-SA), saves them as
public/images/pages/<page>-<n>-640.webp and -1280.webp (16:9) and writes author, licence and source to
tools/page-photos.json. Pick the one to show by setting "chosen" in that file; review before publishing.
    python3 tools/fetch_page_photos.py
"""
import json, urllib.parse
from pathlib import Path
from fetch_model_photos import FREE, query, save, text

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'images' / 'pages'
DATA = ROOT / 'tools' / 'page-photos.json'
MAX = 6
PAGES = {
    'copart': ['incategory:Copart', 'incategory:"Car auctions"', 'incategory:"Salvage yards in the United States"',
               'damaged cars salvage yard', 'wrecked cars lot'],
    'vin': ['incategory:"Vehicle identification numbers"', 'VIN dashboard windshield car', 'VIN sticker door jamb'],
}
SKIP = ('race', 'nascar', 'speedway', 'bus', 'truck', 'locomotive', 'tram', 'motorcycle')


def candidates(searches):
    common = {'prop': 'imageinfo', 'iiprop': 'url|size|mime|extmetadata', 'iiurlwidth': '1600'}
    seen = set()
    for search in searches:
        found = query({'action': 'query', 'generator': 'search', 'gsrnamespace': '6', 'gsrlimit': '30',
                       'gsrsearch': search + ' filetype:bitmap', **common})
        for p in sorted(found.get('query', {}).get('pages', []), key=lambda p: p.get('index', 0)):
            info = (p.get('imageinfo') or [{}])[0]
            meta = info.get('extmetadata', {})
            lic = text(meta, 'LicenseShortName')
            w, h = info.get('width', 0), info.get('height', 0)
            if p['title'] in seen or any(w in p['title'].lower() for w in SKIP) or info.get('mime') not in ('image/jpeg', 'image/png') or not FREE.match(lic):
                continue
            if w < 1200 or not 1.2 <= w / max(h, 1) <= 2.1:
                continue
            seen.add(p['title'])
            yield p['title'], info, lic, text(meta, 'Artist') or 'unknown', (meta.get('LicenseUrl') or {}).get('value', '')


def main():
    import fetch_model_photos
    fetch_model_photos.OUT = OUT  # save() writes next to the page images
    data = json.loads(DATA.read_text()) if DATA.exists() else {}
    for page, searches in PAGES.items():
        found = []
        for n, (title, info, lic, author, lic_url) in enumerate(candidates(searches)):
            if n >= MAX:
                break
            width, height = save(f'{page}-{n + 1}', info['url'])
            found.append({
                'src': f'/images/pages/{page}-{n + 1}', 'width': width, 'height': height,
                'author': author[:120], 'license': lic,
                'licenseUrl': lic_url or 'https://creativecommons.org/publicdomain/zero/1.0/',
                'source': info.get('descriptionurl') or 'https://commons.wikimedia.org/wiki/' + urllib.parse.quote(title),
                'commons': title,
            })
            print(f'{page}-{n + 1}: {title} ({lic}, {author[:40]})', flush=True)
        data[page] = {'chosen': data.get(page, {}).get('chosen'), 'candidates': found}
        DATA.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')


if __name__ == '__main__':
    main()

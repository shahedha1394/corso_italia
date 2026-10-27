"""Build src/data/italy-map.json: simplified region outlines and city positions for the site's map.

Source: openpolis/geojson-italy (https://github.com/openpolis/geojson-italy),
administrative limits (c) ISTAT, licensed CC BY 4.0. Keep the attribution when you change this.

Usage:
    git clone --depth 1 https://github.com/openpolis/geojson-italy /tmp/geojson-italy
    python3 scripts/build-italy-map.py /tmp/geojson-italy/geojson

Run it again after adding a city to src/lib/taxonomy.ts (add the city to CITY_MUNICIPALITY first).
"""

import json
import math
import sys
from pathlib import Path

# Region name in the ISTAT data -> region key in src/lib/taxonomy.ts
REGIONS = {
    'Piemonte': 'piemonte',
    "Valle d'Aosta/Vallée d'Aoste": 'valle-d-aosta',
    'Liguria': 'liguria',
    'Lombardia': 'lombardia',
    'Trentino-Alto Adige/Südtirol': 'trentino-alto-adige',
    'Veneto': 'veneto',
    'Friuli-Venezia Giulia': 'friuli-venezia-giulia',
    'Emilia-Romagna': 'emilia-romagna',
    'Marche': 'marche',
    'Toscana': 'toscana',
    'Umbria': 'umbria',
    'Lazio': 'lazio',
    'Campania': 'campania',
    'Abruzzo': 'abruzzo',
    'Molise': 'molise',
    'Puglia': 'puglia',
    'Basilicata': 'basilicata',
    'Calabria': 'calabria',
    'Sicilia': 'sicilia',
    'Sardegna': 'sardegna',
}

# City key in src/lib/taxonomy.ts -> (municipality name in the ISTAT data, province code)
CITY_MUNICIPALITY = {
    'ancona': ('Ancona', 'AN'), 'aosta': ('Aosta', 'AO'), 'bari': ('Bari', 'BA'),
    'benevento': ('Benevento', 'BN'), 'bergamo': ('Bergamo', 'BG'), 'bologna': ('Bologna', 'BO'),
    'bolzano': ('Bolzano/Bozen', 'BZ'), 'brescia': ('Brescia', 'BS'), 'cagliari': ('Cagliari', 'CA'),
    'camerino': ('Camerino', 'MC'), 'campobasso': ('Campobasso', 'CB'), 'casamassima': ('Casamassima', 'BA'),
    'caserta': ('Caserta', 'CE'), 'cassino': ('Cassino', 'FR'), 'castellanza': ('Castellanza', 'VA'),
    'catania': ('Catania', 'CT'), 'catanzaro': ('Catanzaro', 'CZ'), 'chieti': ('Chieti', 'CH'),
    'enna': ('Enna', 'EN'), 'ferrara': ('Ferrara', 'FE'), 'firenze': ('Firenze', 'FI'),
    'foggia': ('Foggia', 'FG'), 'genova': ('Genova', 'GE'), 'laquila': ("L'Aquila", 'AQ'),
    'lecce': ('Lecce', 'LE'), 'lucca': ('Lucca', 'LU'), 'macerata': ('Macerata', 'MC'),
    'messina': ('Messina', 'ME'), 'milano': ('Milano', 'MI'), 'modena': ('Modena', 'MO'),
    'napoli': ('Napoli', 'NA'), 'novedrate': ('Novedrate', 'CO'), 'padova': ('Padova', 'PD'),
    'palermo': ('Palermo', 'PA'), 'parma': ('Parma', 'PR'), 'pavia': ('Pavia', 'PV'),
    'perugia': ('Perugia', 'PG'), 'pieve-emanuele': ('Pieve Emanuele', 'MI'), 'pisa': ('Pisa', 'PI'),
    'pollenzo': ('Bra', 'CN'), 'potenza': ('Potenza', 'PZ'), 'pozzilli': ('Pozzilli', 'IS'),
    'reggio-calabria': ('Reggio di Calabria', 'RC'), 'rende': ('Rende', 'CS'), 'roma': ('Roma', 'RM'),
    'salerno': ('Salerno', 'SA'), 'sassari': ('Sassari', 'SS'), 'siena': ('Siena', 'SI'),
    'teramo': ('Teramo', 'TE'), 'torino': ('Torino', 'TO'), 'torrevecchia-teatina': ('Torrevecchia Teatina', 'CH'),
    'trento': ('Trento', 'TN'), 'trieste': ('Trieste', 'TS'), 'udine': ('Udine', 'UD'),
    'urbino': ('Urbino', 'PU'), 'varese': ('Varese', 'VA'), 'venezia': ('Venezia', 'VE'),
    'vercelli': ('Vercelli', 'VC'), 'verona': ('Verona', 'VR'), 'viterbo': ('Viterbo', 'VT'),
}

WIDTH = 600  # SVG units; height follows from the projection
LAT0 = math.radians(42.0)  # equirectangular projection centred on Italy
TOLERANCE = 0.012  # degrees, Douglas-Peucker simplification
MIN_AREA = 0.004  # square degrees; smaller islands are dropped


def rings_of(geometry):
    polys = geometry['coordinates'] if geometry['type'] == 'MultiPolygon' else [geometry['coordinates']]
    return [poly[0] for poly in polys]  # outer rings only


def area(ring):
    return abs(sum(x1 * y2 - x2 * y1 for (x1, y1), (x2, y2) in zip(ring, ring[1:]))) / 2


def centroid(ring):
    a = cx = cy = 0.0
    for (x1, y1), (x2, y2) in zip(ring, ring[1:]):
        f = x1 * y2 - x2 * y1
        a += f
        cx += (x1 + x2) * f
        cy += (y1 + y2) * f
    a /= 2
    return cx / (6 * a), cy / (6 * a)


def simplify(points, tol):
    if len(points) < 3:
        return points
    (x1, y1), (x2, y2) = points[0], points[-1]
    dx, dy = x2 - x1, y2 - y1
    norm = math.hypot(dx, dy) or 1e-12
    best, index = 0.0, 0
    for i in range(1, len(points) - 1):
        px, py = points[i]
        d = abs(dy * px - dx * py + x2 * y1 - y2 * x1) / norm
        if d > best:
            best, index = d, i
    if best > tol:
        return simplify(points[: index + 1], tol)[:-1] + simplify(points[index:], tol)
    return [points[0], points[-1]]


def simplify_ring(ring, tol):
    # A closed ring starts and ends on the same point, so simplify its two halves separately.
    mid = len(ring) // 2
    return simplify(ring[: mid + 1], tol)[:-1] + simplify(ring[mid:], tol)


def main(src):
    regions = json.loads((Path(src) / 'limits_IT_regions.geojson').read_text(encoding='utf-8'))
    municipalities = json.loads((Path(src) / 'limits_IT_municipalities.geojson').read_text(encoding='utf-8'))

    shapes = {}
    lons, lats = [], []
    for feature in regions['features']:
        key = REGIONS[feature['properties']['reg_name']]
        rings = [r for r in rings_of(feature['geometry']) if area(r) >= MIN_AREA]
        rings = [simplify_ring(r, TOLERANCE) for r in rings]
        shapes[key] = [r for r in rings if len(r) >= 4]
        for r in shapes[key]:
            lons += [p[0] for p in r]
            lats += [p[1] for p in r]

    k = math.cos(LAT0)
    min_x, max_x = min(lons) * k, max(lons) * k
    min_y, max_y = min(lats), max(lats)
    scale = WIDTH / (max_x - min_x)
    height = round((max_y - min_y) * scale)

    def project(lon, lat):
        return round((lon * k - min_x) * scale, 1), round((max_y - lat) * scale, 1)

    def path(rings):
        parts = []
        for r in rings:
            pts = [project(*p) for p in r]
            parts.append('M' + 'L'.join(f'{x:g} {y:g}' for x, y in pts[:-1]) + 'Z')
        return ''.join(parts)

    found = {}
    for feature in municipalities['features']:
        p = feature['properties']
        found[(p['name'], p['prov_acr'])] = feature['geometry']
    cities = {}
    for key, name in sorted(CITY_MUNICIPALITY.items()):
        if name not in found:
            sys.exit(f'Municipality not found for {key}: {name}')
        ring = max(rings_of(found[name]), key=area)
        cities[key] = list(project(*centroid(ring)))

    out = {
        'source': 'Administrative limits (c) ISTAT, CC BY 4.0, via openpolis/geojson-italy',
        'width': WIDTH,
        'height': height,
        'regions': {key: path(rings) for key, rings in sorted(shapes.items())},
        'cities': cities,
    }
    target = Path(__file__).resolve().parent.parent / 'src' / 'data' / 'italy-map.json'
    target.parent.mkdir(exist_ok=True)
    target.write_text(json.dumps(out, ensure_ascii=False, separators=(',', ':')) + '\n', encoding='utf-8')
    print(f'Wrote {target} ({target.stat().st_size // 1024} KB, {len(cities)} cities, {WIDTH}x{height})')


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else '/tmp/geojson-italy/geojson')

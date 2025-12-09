
import requests
import sys

urls = {
    'Day 1': 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop',
    'Day 2': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
    'Day 3': 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1974&auto=format&fit=crop',
    'Day 4': 'https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?q=80&w=1974&auto=format&fit=crop',
    'Day 5': 'https://images.unsplash.com/photo-1622987437805-5c6f7c2609d7?q=80&w=2070&auto=format&fit=crop',
    'Day 6': 'https://images.unsplash.com/photo-1595839087662-bc1563204430?q=80&w=2071&auto=format&fit=crop',
    'Day 7': 'https://images.unsplash.com/photo-1570459027562-4a916cc6113f?q=80&w=1976&auto=format&fit=crop',
    'Day 8': 'https://images.unsplash.com/photo-1528360983277-13d9b152c6d4?q=80&w=2070&auto=format&fit=crop',
    'Day 9': 'https://images.unsplash.com/photo-1590559899731-a38283959c84?q=80&w=2080&auto=format&fit=crop',
    'Day 10': 'https://images.unsplash.com/photo-1599052993358-1b2e6e56d492?q=80&w=2070&auto=format&fit=crop',
    'Day 11': 'https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?q=80&w=2084&auto=format&fit=crop',
    'Day 12': 'https://images.unsplash.com/photo-1590253232487-17266f4dd92c?q=80&w=2070&auto=format&fit=crop',
    'Day 13': 'https://images.unsplash.com/photo-1533050487297-09b450131914?q=80&w=2070&auto=format&fit=crop',
    'Day 14': 'https://images.unsplash.com/photo-1478479405421-ce83c92fb3ba?q=80&w=1974&auto=format&fit=crop',
    'default': 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=2053&auto=format&fit=crop'
}

failed = False
for day, url in urls.items():
    try:
        response = requests.head(url, timeout=5)
        if response.status_code == 404:
            print(f"ERROR: {day} - 404 Not Found")
            failed = True
        elif response.status_code != 200:
            print(f"WARNING: {day} - Status {response.status_code}")
        else:
            print(f"OK: {day}")
    except Exception as e:
        print(f"ERROR: {day} - {e}")
        failed = True

if failed:
    sys.exit(1)

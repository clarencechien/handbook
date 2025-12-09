
import requests
import sys

urls = {
    'Day 6 (Uji Matcha)': 'https://images.unsplash.com/photo-8BeisQVOYE7?q=80&w=2070&auto=format&fit=crop',
    'Day 8 (Arashiyama)': 'https://images.unsplash.com/photo-6ZFApRqoYRK?q=80&w=2070&auto=format&fit=crop',
    'Day 9 (Osaka Skyline)': 'https://images.unsplash.com/photo-YjhVwVHyvY3?q=80&w=2070&auto=format&fit=crop',
    'Day 10 (Dotonbori)': 'https://images.unsplash.com/photo-LgbK_zreQT4?q=80&w=2070&auto=format&fit=crop',
    'Day 12 (Osaka Castle)': 'https://images.unsplash.com/photo-HNC0LE0tlb1?q=80&w=2070&auto=format&fit=crop'
}

failed = False
for day, url in urls.items():
    try:
        # Unsplash redirects photo-[shortID] to the full URL. We need to follow redirects.
        response = requests.head(url, allow_redirects=True, timeout=10)
        if response.status_code == 404:
            print(f"ERROR: {day} - 404 Not Found")
            failed = True
        elif response.status_code != 200:
            print(f"WARNING: {day} - Status {response.status_code}")
        else:
            print(f"OK: {day} -> {response.url}")
    except Exception as e:
        print(f"ERROR: {day} - {e}")
        failed = True

if failed:
    sys.exit(1)

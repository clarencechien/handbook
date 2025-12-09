
import requests
import re

ids = {
    'Day 6': '8BeisQVOYE7',
    'Day 8': '6ZFApRqoYRK',
    'Day 9': 'YjhVwVHyvY3',
    'Day 10': 'LgbK_zreQT4',
    'Day 12': 'HNC0LE0tlb1'
}

headers = {'User-Agent': 'Mozilla/5.0'}

for day, id in ids.items():
    url = f"https://unsplash.com/photos/{id}"
    try:
        response = requests.get(url, headers=headers, timeout=10)
        if response.status_code == 200:
            # Look for og:image
            match = re.search(r'property="og:image" content="([^"]+)"', response.text)
            if match:
                print(f"{day}: {match.group(1)}")
            else:
                print(f"{day}: No og:image found")
        else:
            print(f"{day}: Status {response.status_code}")
    except Exception as e:
        print(f"{day}: Error {e}")

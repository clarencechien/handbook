
import requests
import re

pages = {
    'Arashiyama': 'https://commons.wikimedia.org/wiki/File:Bamboo_Forest,_Arashiyama,_Kyoto,_Japan.jpg',
    'Osaka Skyline': 'https://commons.wikimedia.org/wiki/File:Osaka_-_Night_View.jpg',
    'Dotonbori': 'https://commons.wikimedia.org/wiki/File:Dotonbori,_Osaka,_at_night,_November_2016.jpg'
}

for name, url in pages.items():
    try:
        response = requests.get(url, timeout=10)
        # Look for the full resolution link, usually in <div class="fullMedia"><a href="...">
        match = re.search(r'<div class="fullMedia"><a href="([^"]+)"', response.text)
        if match:
            print(f"{name}: {match.group(1)}")
        else:
            # Fallback to og:image
            match = re.search(r'property="og:image" content="([^"]+)"', response.text)
            if match:
                print(f"{name}: {match.group(1)}")
            else:
                print(f"{name}: Not found")
    except Exception as e:
        print(f"{name}: Error {e}")

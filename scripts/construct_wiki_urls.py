
import hashlib
import requests

filenames = [
    'Bamboo_Forest,_Arashiyama,_Kyoto,_Japan.jpg',
    'Osaka_-_Night_View.jpg',
    'Dotonbori,_Osaka,_at_night,_November_2016.jpg',
    'Matcha_stone_mill_grinding_tencha_into_powder.jpg'
]

headers = {'User-Agent': 'Mozilla/5.0'}

for filename in filenames:
    # Wikimedia uses spaces replaced by underscores in filenames for hashing? 
    # Actually the filename usually has underscores already.
    # Let's ensure spaces are underscores.
    name = filename.replace(' ', '_')
    md5 = hashlib.md5(name.encode('utf-8')).hexdigest()
    a = md5[0]
    ab = md5[0:2]
    url = f"https://upload.wikimedia.org/wikipedia/commons/{a}/{ab}/{name}"
    
    try:
        response = requests.head(url, headers=headers, timeout=5)
        if response.status_code == 200:
            print(f"VALID: {url}")
        else:
            print(f"INVALID: {url} ({response.status_code})")
    except Exception as e:
        print(f"ERROR: {url} ({e})")

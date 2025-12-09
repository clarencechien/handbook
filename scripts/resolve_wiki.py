
import requests

filenames = [
    'Bamboo_Forest,_Arashiyama,_Kyoto,_Japan.jpg',
    'Osaka_-_Night_View.jpg',
    'Dotonbori,_Osaka,_at_night,_November_2016.jpg'
]

for filename in filenames:
    url = f"https://commons.wikimedia.org/wiki/Special:FilePath/{filename}"
    try:
        response = requests.head(url, allow_redirects=True, timeout=10)
        if response.status_code == 200:
            print(f"{filename}: {response.url}")
        else:
            print(f"{filename}: Error {response.status_code}")
    except Exception as e:
        print(f"{filename}: Error {e}")

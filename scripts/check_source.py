
import requests
import sys

url = 'https://source.unsplash.com/featured/?matcha,kyoto'

try:
    response = requests.head(url, allow_redirects=True, timeout=10)
    if response.status_code == 200:
        print(f"OK: {response.url}")
    else:
        print(f"ERROR: Status {response.status_code}")
except Exception as e:
    print(f"ERROR: {e}")

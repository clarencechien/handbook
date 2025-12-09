
import requests

url = "https://images.unsplash.com/photo-1542840428-ce911296c0d0?q=80&w=2070&auto=format&fit=crop"
try:
    response = requests.head(url, timeout=5)
    if response.status_code == 200:
        print(f"Uji: VALID")
    else:
        print(f"Uji: {response.status_code}")
except Exception as e:
    print(f"Uji: Error {e}")

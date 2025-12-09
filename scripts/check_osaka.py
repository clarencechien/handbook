
import requests
import sys

url = 'https://images.unsplash.com/photo-1715408669530-5b5c9b7e7b8a?q=80&w=2670&auto=format&fit=crop'

try:
    response = requests.head(url, timeout=10)
    if response.status_code == 200:
        print("OK")
    else:
        print(f"ERROR: {response.status_code}")
except Exception as e:
    print(f"ERROR: {e}")

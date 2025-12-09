
import requests

url = "https://images.unsplash.com/photo-1517686469429-1ad5b4bfae9c?q=80&w=2070&auto=format&fit=crop"
try:
    response = requests.head(url, timeout=5)
    print(f"Uji: {response.status_code}")
except Exception as e:
    print(f"Uji: Error {e}")

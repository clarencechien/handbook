
import requests

url = "https://images.unsplash.com/photo-1580138051672-325eb98b2749?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

try:
    response = requests.head(url, timeout=10)
    if response.status_code == 200:
        print(f"VALID: {response.status_code}")
    else:
        print(f"INVALID: {response.status_code}")
except Exception as e:
    print(f"ERROR: {e}")

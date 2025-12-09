
import requests

url = "https://images.unsplash.com/photo-1600713193398-7782a2874f5d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
try:
    response = requests.head(url, timeout=5)
    if response.status_code == 200:
        print(f"Osaka Castle: VALID")
    else:
        print(f"Osaka Castle: {response.status_code}")
except Exception as e:
    print(f"Osaka Castle: Error {e}")

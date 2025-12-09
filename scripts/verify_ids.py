
import requests

ids_to_test = {
    'Matcha': ['4wJxVFbZr1c', '8BeisQVOYE7'],
    'Bamboo': ['6ZFApRqoYRK'],
    'Osaka Night': ['YjhVwVHyvY3'],
    'Dotonbori': ['Np1aN841iAU'],
    'Osaka Castle': ['k0D_w4W-Yc4', 'J3X2sPZ08p8']
}

for category, ids in ids_to_test.items():
    print(f"--- {category} ---")
    for id in ids:
        url = f"https://images.unsplash.com/photo-{id}?q=80&w=2070&auto=format&fit=crop"
        try:
            response = requests.head(url, allow_redirects=True, timeout=5)
            if response.status_code == 200:
                print(f"VALID: {id} -> {response.url}")
            else:
                print(f"INVALID: {id} ({response.status_code})")
        except Exception as e:
            print(f"ERROR: {id} ({e})")

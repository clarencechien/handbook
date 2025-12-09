
import requests
import re
from bs4 import BeautifulSoup

pages = {
    'Day 6 (Uji Matcha)': 'https://unsplash.com/photos/matcha-powder-on-spoon-8BeisQVOYE7',
    'Day 8 (Arashiyama)': 'https://unsplash.com/photos/bamboo-forest-during-daytime-6ZFApRqoYRK',
    'Day 9 (Osaka Skyline)': 'https://unsplash.com/photos/city-skyline-during-night-time-YjhVwVHyvY3',
    'Day 10 (Dotonbori)': 'https://unsplash.com/photos/people-walking-on-street-during-night-time-LgbK_zreQT4',
    'Day 12 (Osaka Castle)': 'https://unsplash.com/photos/low-angle-photography-of-cherry-blossom-tree-near-building-during-daytime-HNC0LE0tlb1'
}

# Note: The URLs above are guesses based on search snippets. 
# Unsplash URLs are typically /photos/[slug]-[id] or just /photos/[id].
# I will try to fetch them. If they fail, I'll try to search for the ID directly.

def get_image_url(page_url):
    try:
        # Unsplash might block python requests, so we need a user agent
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'}
        response = requests.get(page_url, headers=headers, timeout=10)
        if response.status_code != 200:
            return f"Error: {response.status_code}"
        
        soup = BeautifulSoup(response.text, 'html.parser')
        og_image = soup.find('meta', property='og:image')
        if og_image:
            return og_image['content']
        else:
            return "Error: No og:image found"
    except Exception as e:
        return f"Error: {e}"

for name, url in pages.items():
    print(f"--- {name} ---")
    print(f"Page: {url}")
    image_url = get_image_url(url)
    print(f"Image: {image_url}")
    print()

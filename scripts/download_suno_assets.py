
import requests
import re
import os
import time

urls = [
    "https://suno.com/s/9fMfRIS0rmna516b",
    "https://suno.com/s/qMrhlRupesUtAl7Q",
    "https://suno.com/s/kHeyrbAQ24C4JhiI",
    "https://suno.com/s/nCbhwBWM0zFWabnT"
]

# Ensure directories exist
os.makedirs("assets/music", exist_ok=True)
os.makedirs("assets/images", exist_ok=True)

results = []

headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}

for url in urls:
    try:
        print(f"Processing {url}...")
        response = requests.get(url, headers=headers)
        content = response.text
        
        # Extract Metadata
        title_match = re.search(r'<meta property="og:title" content="([^"]+)"', content)
        audio_match = re.search(r'<meta property="og:audio" content="([^"]+)"', content)
        image_match = re.search(r'<meta property="og:image" content="([^"]+)"', content)
        
        title = title_match.group(1) if title_match else "Unknown Title"
        audio_url = audio_match.group(1) if audio_match else ""
        image_url = image_match.group(1) if image_match else ""
        
        # Clean title for filename
        safe_title = re.sub(r'[\\/*?:"<>| ]', "_", title)
        
        local_audio_path = ""
        local_image_path = ""
        
        if audio_url:
            print(f"  Downloading audio: {audio_url}")
            audio_res = requests.get(audio_url, headers=headers)
            if audio_res.status_code == 200:
                local_audio_path = f"assets/music/{safe_title}.mp3"
                with open(local_audio_path, "wb") as f:
                    f.write(audio_res.content)
            else:
                print(f"  Failed to download audio: {audio_res.status_code}")

        if image_url:
            print(f"  Downloading image: {image_url}")
            image_res = requests.get(image_url, headers=headers)
            if image_res.status_code == 200:
                local_image_path = f"assets/images/{safe_title}.jpeg"
                with open(local_image_path, "wb") as f:
                    f.write(image_res.content)
            else:
                print(f"  Failed to download image: {image_res.status_code}")

        results.append({
            "title": title,
            "local_audio": local_audio_path,
            "local_image": local_image_path
        })
        
        time.sleep(1) # Be nice

    except Exception as e:
        print(f"Error processing {url}: {e}")

print("\n--- Download Complete ---")
for r in results:
    print(f"Title: {r['title']}")
    print(f"  Audio: {r['local_audio']}")
    print(f"  Image: {r['local_image']}")

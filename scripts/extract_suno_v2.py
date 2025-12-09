
import requests
import re
import json

urls = [
    "https://suno.com/s/9fMfRIS0rmna516b",
    "https://suno.com/s/qMrhlRupesUtAl7Q",
    "https://suno.com/s/kHeyrbAQ24C4JhiI",
    "https://suno.com/s/nCbhwBWM0zFWabnT"
]

results = []

for url in urls:
    try:
        response = requests.get(url)
        content = response.text
        
        # Extract Metadata
        title_match = re.search(r'<meta property="og:title" content="([^"]+)"', content)
        audio_match = re.search(r'<meta property="og:audio" content="([^"]+)"', content)
        image_match = re.search(r'<meta property="og:image" content="([^"]+)"', content)
        
        title = title_match.group(1) if title_match else "Unknown Title"
        audio = audio_match.group(1) if audio_match else ""
        image = image_match.group(1) if image_match else ""
        
        lyrics = ""
        
        # Strategy 1: Look for double-quoted string containing "## Verse" or "## Chorus"
        # We use a non-greedy match for the start, but we need to be careful about escaped quotes.
        # However, for a quick script, assuming no escaped quotes inside the lyrics (or few) might work.
        # Actually, the lyrics contain \n, so we need to handle that.
        
        # Find start of "Verse 1" or "Verse"
        match = re.search(r'Verse \d', content)
        if not match:
             match = re.search(r'## (Verse|Chorus)', content)
             
        if match:
            start_index = match.start()
            # Search backwards for the opening quote
            # We look for a quote that is NOT escaped.
            # This is a simple heuristic: look for `"`
            
            # Walk backwards
            i = start_index
            while i > 0:
                if content[i] == '"' and content[i-1] != '\\':
                    break
                i -= 1
            quote_start = i
            
            # Walk forwards from start_index
            j = start_index
            while j < len(content):
                if content[j] == '"' and content[j-1] != '\\':
                    break
                j += 1
            quote_end = j
            
            if quote_start > 0 and quote_end < len(content):
                raw_lyrics = content[quote_start+1:quote_end]
                # Unescape
                lyrics = raw_lyrics.replace('\\n', '\n').replace('\\"', '"').replace('\\\\', '\\')
                
                # Clean up the prefix if it looks like "19:T6c1,# "
                # Remove everything before the first "# " or "## "
                clean_match = re.search(r'(#+ .*$)', lyrics, re.DOTALL)
                if clean_match:
                    lyrics = clean_match.group(1)

        if not lyrics:
             # Fallback to prompt
            prompt_match = re.search(r'"prompt":"(.*?)"', content)
            if prompt_match:
                lyrics = prompt_match.group(1).replace('\\n', '\n').replace('\\"', '"')
            else:
                lyrics = "Lyrics not found."

        results.append({
            "url": url,
            "title": title,
            "audio": audio,
            "image": image,
            "lyrics": lyrics
        })
        
        # Save full lyrics to a file
        filename = f"lyrics_{title[:10].replace(' ', '_')}.txt"
        # Remove invalid chars
        filename = re.sub(r'[\\/*?:"<>|]', "", filename)
        with open(filename, "w") as f:
            f.write(lyrics)

    except Exception as e:
        print(f"Error processing {url}: {e}")

print(json.dumps(results, indent=2))

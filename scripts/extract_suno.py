
import requests
import re
import json
import html

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
        
        # Extract Lyrics
        # The lyrics seem to be inside a script tag, often JSON stringified.
        # Looking for the pattern seen in the first file: "19:T6c1,# ... "
        # Or generally looking for the lyrics text.
        # Let's try to find the large text block that looks like lyrics.
        # It often starts with a title or section header like "## Verse" or just the song title.
        
        # Strategy: Look for the JSON string that contains "Verse 1" or similar common lyric markers
        # or try to parse the specific next.js data structure if possible, but regex is easier for this one-off.
        
        lyrics = ""
        # Regex to find the lyrics block within the specific Next.js chunk
        # It looks like: self.__next_f.push([1,"... \n\n## Verse 1\n\n ..."])
        # We can look for a string containing "## Verse" or "## Chorus"
        
        lyrics_match = re.search(r'\\n## (Verse|Chorus|Intro|Outro).*?\\n', content)
        
        if lyrics_match:
            # If we found a snippet, let's try to grab the whole string it belongs to.
            # The string is usually enclosed in double quotes inside the list.
            # We can try to extract the specific push call.
            
            # Alternative: The lyrics are usually the longest string with newlines in the file.
            pass

        # Let's try a more robust regex for the specific Next.js format seen:
        # self.__next_f.push([1,"..."]) where the string starts with something like "19:T6c1,# "
        # The key is that it contains the lyrics.
        
        # Let's look for the JSON blob that has "lyrics" or just the text content.
        # In the previous output, it was: self.__next_f.push([1,"19:T6c1,# Kyoto no Yakusoku..."])
        
        # We will look for the pattern: `self.__next_f.push\(\[1,"[^"]*?## Verse`
        # and capture the whole string.
        
        # Actually, let's just look for the `prompt` metadata if lyrics aren't explicitly labeled, 
        # but Suno usually puts generated lyrics in the text.
        
        # Let's try to find the large text block.
        # We can search for the title in the script tags, followed by newlines.
        
        # Refined Regex: Look for a string that contains the title and "Verse 1"
        # escaped newlines are \\n
        
        escaped_title = re.escape(title)
        # The title in lyrics might be slightly different or just at the top.
        
        # Let's try to extract the JSON-like string containing "## Verse 1"
        # It seems to be inside a string literal in JS.
        
        l_match = re.search(r'(\d+:T[a-zA-Z0-9]+,)?(# [^"]+?## (Verse|Chorus).*?)"\]\)', content, re.DOTALL)
        if not l_match:
             l_match = re.search(r'(\d+:T[a-zA-Z0-9]+,)?(.*?)## (Verse|Chorus).*?"\]\)', content, re.DOTALL)

        if l_match:
            raw_lyrics = l_match.group(0)
            # Clean up the JS artifacts
            # Remove the "19:T6c1," prefix if present
            # Remove the closing "] )"
            # Unescape \\n to \n
            
            # A simpler approach: Find the start of the lyrics (Title or Verse 1) and the end (End of string).
            
            # Let's just dump the raw content around "Verse 1" to a file and I'll clean it up manually if needed, 
            # or try to parse it better.
            
            # Actually, for the purpose of this script, let's just get the basic metadata 
            # and I will manually copy the lyrics if the extraction is too messy, 
            # OR I can try to get the "prompt" from the metadata JSON if it exists.
            
            # In the previous output: "metadata":{"tags":...,"prompt":"..."}
            # The prompt often contains the lyrics!
            
            prompt_match = re.search(r'"prompt":"(.*?)"', content)
            if prompt_match:
                lyrics = prompt_match.group(1).replace('\\n', '\n').replace('\\"', '"')
            else:
                lyrics = "Lyrics not found in prompt."
        else:
             # Fallback to prompt extraction
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
            "lyrics": lyrics[:50] + "..." # Just preview
        })
        
        # Save full lyrics to a file
        with open(f"lyrics_{title[:10].replace(' ', '_')}.txt", "w") as f:
            f.write(lyrics)

    except Exception as e:
        print(f"Error processing {url}: {e}")

print(json.dumps(results, indent=2))


#!/bin/bash

urls=(
    "https://unsplash.com/photos/matcha-powder-on-spoon-8BeisQVOYE7"
    "https://unsplash.com/photos/bamboo-forest-during-daytime-6ZFApRqoYRK"
    "https://unsplash.com/photos/city-skyline-during-night-time-YjhVwVHyvY3"
    "https://unsplash.com/photos/people-walking-on-street-during-night-time-LgbK_zreQT4"
    "https://unsplash.com/photos/low-angle-photography-of-cherry-blossom-tree-near-building-during-daytime-HNC0LE0tlb1"
)

names=(
    "Day 6 (Uji Matcha)"
    "Day 8 (Arashiyama)"
    "Day 9 (Osaka Skyline)"
    "Day 10 (Dotonbori)"
    "Day 12 (Osaka Castle)"
)

for i in "${!urls[@]}"; do
    echo "--- ${names[$i]} ---"
    url="${urls[$i]}"
    echo "Fetching $url..."
    content=$(curl -s -L "$url")
    image_url=$(echo "$content" | grep -oP 'property="og:image" content="\K[^"]+')
    if [ -z "$image_url" ]; then
        # Try alternate meta tag format
        image_url=$(echo "$content" | grep -oP 'name="twitter:image" content="\K[^"]+')
    fi
    echo "Image: $image_url"
    echo ""
done

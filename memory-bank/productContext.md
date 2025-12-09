# Product Context

## Why this project exists
To provide a reliable, interactive, and atmosphere-enhancing travel handbook for a group trip, specifically addressing the need for offline access in areas with poor network coverage.

## Problems it solves
- **No Internet**: Traditional online docs (Notion/Google Docs) fail without signal.
- **Spoiler Control**: Paper handbooks or shared docs make it hard to hide "surprise" itinerary items from participants while keeping them accessible to the leader.
- **Atmosphere**: Integrating music directly into the handbook simplifies the leader's job of DJing.

## How it should work
1.  **Load**: User visits the URL. Service Worker caches everything.
2.  **View**: User sees the itinerary presented in a beautiful, timeline-based visual format.
3.  **Offline**: User can reload the page in airplane mode and still see everything.
4.  **Admin**: Leader clicks the "C&E" avatar and enters a password to reveal hidden blocks and music controls.
5.  **Music**: Leader can play background music from a curated playlist. A "Download" button allows caching these songs for offline playback.

## User Experience Goals
- **"Magazine" Feel**: Typography and layout should feel like a polished publication, not a raw text file.
- **Visual Storytelling**: Use a timeline, card-based layout, and itinerary overview images to guide the user through the journey.
- **Romantic Aesthetic**: Soft colors, elegant typography, and subtle animations to match the honeymoon theme.
- **Seamless Offline**: The transition to offline should be invisible to the user.

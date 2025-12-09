# LoveTravel PWA Handbook ✈️

A PWA-enabled single-page application (SPA) travel handbook designed for offline use. It features background music, markdown content rendering, and a password-protected admin view for the trip leader.

## Features

- **📖 Markdown Content**: Easy-to-edit itinerary using standard Markdown.
- **🎵 Background Music**: Built-in audio player for creating atmosphere.
- **📶 Offline Capable**: Full PWA support with Service Worker caching. Works without internet!
- **👑 Admin Mode**: Hidden controls and "Surprise Blocks" for the trip leader.
- **📱 Mobile First**: Responsive design optimized for phone screens.

## Setup

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    ```
2.  **Add Assets**:
    - Place your background music file at `assets/music.mp3`.
    - Place your app icon at `assets/icon.png`.
3.  **Run Locally**:
    - You need a local server because of Service Worker and CORS restrictions.
    - Python: `python3 -m http.server`
    - Node: `npx http-server`
    - Open `http://localhost:8000` (or the port shown).

## Usage

### For Tourists
- Open the link.
- Scroll to read the itinerary.
- Enjoy the music (if played by the leader).

### For Leaders (Admin Mode)
1.  Scroll to the bottom of the page.
2.  Click the small **π** symbol in the footer.
3.  Enter the secret code: `love2025`.
4.  **Controls**:
    - You will see "Leader Controls" floating at the bottom right.
    - Use the Play/Pause buttons to control music.
    - "Surprise Blocks" (dashed red boxes) in the content will become visible.

## Customization

- **Content**: Edit `handbook.md`.
- **Secret Blocks**: Use the following syntax in `handbook.md`:
    ```markdown
    <!-- SECRET_START -->
    Your secret content here...
    <!-- SECRET_END -->
    ```
- **Password**: Change `SECRET_CODE` in `script.js`.

## Deployment

This project is designed for **GitHub Pages**.
1.  Push to GitHub.
2.  Go to Settings -> Pages.
3.  Select the `main` branch and `/` (root) folder.
4.  Save.
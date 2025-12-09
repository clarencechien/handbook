# LoveTravel PWA Handbook ✈️

A PWA-enabled single-page application (SPA) travel handbook designed for offline use. It features background music, markdown content rendering, and a password-protected admin view for the trip leader.

## ✨ Features

*   **Offline Access**: Fully functional PWA that works without an internet connection (after initial load).
*   **One Day Per Page**: Smooth scrolling layout with a "Travel Agency" aesthetic, featuring vintage maps and postcard-style chapter covers.
*   **Dynamic Imagery**: Automatically fetches high-quality travel photos from Unsplash and Wikimedia Commons based on the itinerary location.
*   **Itinerary Visualization**: Includes a responsive itinerary overview image for quick reference.
*   **Leader Mode**: Hidden admin features (music control, secret notes) accessible via a password.
*   **Secret Content**: Special "Leader Only" blocks in the itinerary that are hidden from the public view.
*   **Background Music**: Integrated audio player with a curated playlist and offline download support.
*   **Responsive Design**: Optimized for mobile devices with a "Scrapbook" look and feel.

## 🚀 Usage

1.  **Open the App**: Navigate to the deployed URL (or local server).
2.  **Browse Itinerary**: Scroll through the "Intro" section and then swipe up/down to view each day's plan.
3.  **Leader Login**:
    *   Click the **"C&E" Avatar** in the top right corner.
    *   Enter the secret password (default: `love2025`).
    *   **Success**: You'll see a "LEADER" indicator, a Floating Action Button (FAB) for controls, and hidden "Leader Only" notes will appear.
4.  **Music**:
    *   Use the FAB menu to access music controls.
    *   **Offline Mode**: Click the "Download" button in the music player to cache all songs for offline playback.

## Setup

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    ```
2.  **Run Locally**:
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
1.  Click the **"C&E" Avatar** in the header.
2.  Enter the secret code: `love2025`.
3.  **Controls**:
    - A Floating Action Button (FAB) will appear in the bottom right.
    - Click the FAB to open the menu.
    - Control music (Play/Pause, Next/Prev, Repeat).
    - **Download Music**: Click the download icon to save songs for offline use.
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
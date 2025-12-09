# LoveTravel PWA Handbook ✈️

A PWA-enabled single-page application (SPA) travel handbook designed for offline use. It features background music, markdown content rendering, and a password-protected admin view for the trip leader.

## ✨ Features

*   **Offline Access**: Fully functional PWA that works without an internet connection (after initial load).
*   **One Day Per Page**: Smooth scrolling layout with a "Travel Agency" aesthetic, featuring vintage maps and postcard-style chapter covers.
*   **Dynamic Imagery**: Automatically fetches high-quality travel photos from Unsplash based on the itinerary location.
*   **Leader Mode**: Hidden admin features (music control, secret notes) accessible via a password.
*   **Secret Content**: Special "Leader Only" blocks in the itinerary that are hidden from the public view.
*   **Background Music**: Integrated audio player for setting the mood.
*   **Responsive Design**: Optimized for mobile devices with a "Scrapbook" look and feel.

## 🚀 Usage

1.  **Open the App**: Navigate to the deployed URL (or local server).
2.  **Browse Itinerary**: Scroll through the "Intro" section and then swipe up/down to view each day's plan.
3.  **Leader Login**:
    *   Click the **"C&E" Avatar** in the top right corner.
    *   Enter the secret password (default: `love2025`).
    *   **Success**: You'll see a "LEADER" indicator, a Floating Action Button (FAB) for controls, and hidden "Leader Only" notes will appear.
4.  **Music**: Use the FAB or the music toggle in the admin menu to play/pause background music.

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
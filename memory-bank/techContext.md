# Tech Context

## Technologies
- **HTML5**: Semantic structure.
- **CSS3**: Styling, utilizing Tailwind CSS (via CDN) for utility classes and custom CSS for specific overrides.
- **JavaScript (ES6+)**: Core logic.
- **Service Worker API**: Offline capabilities.
- **marked.js**: Markdown parser (CDN).

## Development Setup
- No local build process required.
- Can be served via any static file server (e.g., `python3 -m http.server`, `npx http-server`, or VS Code Live Server).

## Technical Constraints
- **GitHub Pages**: Static hosting only. No backend.
- **Browser Compatibility**: Must work on modern mobile browsers (iOS Safari, Android Chrome).
- **Assets**: Audio files are hosted on Suno.ai CDN and cached locally via the Service Worker for offline access.
- **CORS**: Suno CDN supports CORS, allowing `fetch` requests for caching.

## Dependencies
- Tailwind CSS (CDN)
- marked.js (CDN)

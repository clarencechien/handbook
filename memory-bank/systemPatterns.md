# System Patterns

## Architecture
- **SPA (Single Page Application)**: All content is loaded dynamically or present in the initial HTML.
- **PWA (Progressive Web App)**: Uses a Service Worker to proxy requests and serve cached assets.
- **Client-Side Rendering**: Markdown is fetched raw and parsed in the browser using `marked.js`.

## Key Technical Decisions
- **Cache-First Strategy**: The Service Worker will aggressively cache all assets defined in the manifest and the `ASSETS_TO_CACHE` list. Network is only used if cache fails (or for updates, depending on specific strategy - initially Cache First).
- **Class-Based Visibility**: Admin content is hidden using a CSS class `.admin-only` (display: none). JS toggles this class based on authentication state.
- **DOM Injection**: The parsed Markdown HTML is injected into specific containers (`#public-content`).

## Component Relationships
- `index.html`: The shell.
- `script.js`: The controller. Fetches `handbook.md`, parses it, handles UI events.
- `sw.js`: The proxy. Intercepts network requests.
- `style.css`: The presentation.

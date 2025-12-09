document.addEventListener('DOMContentLoaded', () => {
    const mainContainer = document.querySelector('main');
    const authTrigger = document.getElementById('auth-trigger'); // We might need to change how this works
    const authModal = document.getElementById('auth-modal');
    const cancelAuthBtn = document.getElementById('cancel-auth');
    const submitAuthBtn = document.getElementById('submit-auth');
    const passwordInput = document.getElementById('password-input');
    const logoutBtn = document.getElementById('logout-btn'); // Need to re-bind this
    const bgMusic = document.getElementById('bg-music');

    // Floating Action Button (FAB) Logic
    const fabContainer = document.getElementById('fab-container');
    const fabMainBtn = document.getElementById('fab-main-btn');
    const fabMenu = document.getElementById('fab-menu');
    const btnMusic = document.getElementById('btn-music');
    const btnEdit = document.getElementById('btn-edit'); // Placeholder
    const btnView = document.getElementById('btn-view'); // Placeholder
    const btnLogout = document.getElementById('btn-logout');

    // Image Mapping for Days (Unsplash Source URLs)
    const dayImages = {
        'Day 1': 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop', // Tokyo/Arrival
        'Day 2': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop', // Kyoto Streets
        'Day 3': 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1974&auto=format&fit=crop', // Nara Deer
        'Day 4': 'https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?q=80&w=1974&auto=format&fit=crop', // Nijo Castle / ROKU
        'Day 5': 'https://images.unsplash.com/photo-1622987437805-5c6f7c2609d7?q=80&w=2070&auto=format&fit=crop', // Kinkakuji
        'Day 6': 'https://images.unsplash.com/photo-1595839087662-bc1563204430?q=80&w=2071&auto=format&fit=crop', // Uji Matcha
        'Day 7': 'https://images.unsplash.com/photo-1570459027562-4a916cc6113f?q=80&w=1976&auto=format&fit=crop', // Arashiyama Train
        'Day 8': 'https://images.unsplash.com/photo-1528360983277-13d9b152c6d4?q=80&w=2070&auto=format&fit=crop', // Bamboo Grove
        'Day 9': 'https://images.unsplash.com/photo-1590559899731-a38283959c84?q=80&w=2080&auto=format&fit=crop', // Osaka Skyline
        'Day 10': 'https://images.unsplash.com/photo-1599052993358-1b2e6e56d492?q=80&w=2070&auto=format&fit=crop', // Osaka River/Dotonbori
        'Day 11': 'https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?q=80&w=2084&auto=format&fit=crop', // Night City
        'Day 12': 'https://images.unsplash.com/photo-1590253232487-17266f4dd92c?q=80&w=2070&auto=format&fit=crop', // Osaka Castle
        'Day 13': 'https://images.unsplash.com/photo-1533050487297-09b450131914?q=80&w=2070&auto=format&fit=crop', // Shopping/Shrine
        'Day 14': 'https://images.unsplash.com/photo-1478479405421-ce83c92fb3ba?q=80&w=1974&auto=format&fit=crop', // Airport/Plane
        'default': 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=2053&auto=format&fit=crop' // Japan General
    };

    // --- 1. Markdown Fetcher & Parser ---
    fetch('handbook.md')
        .then(response => {
            if (!response.ok) throw new Error("Failed to load handbook");
            return response.text();
        })
        .then(markdown => {
            renderHandbook(markdown);
        })
        .catch(err => {
            mainContainer.innerHTML = `<div class="text-red-500 p-4">Error loading handbook: ${err.message}</div>`;
        });

    function renderHandbook(markdown) {
        // 1. Pre-process Secret Blocks
        const secretRegex = /<!--\s*SECRET_START\s*-->([\s\S]*?)<!--\s*SECRET_END\s*-->/g;
        let processedMarkdown = markdown.replace(secretRegex, (match, p1) => {
            // Parse the inner markdown content FIRST
            const parsedContent = marked.parse(p1);

            // IMPORTANT: The HTML below must NOT be indented, otherwise marked.js (running later)
            // will interpret the indented lines as Code Blocks!
            return `<div class="admin-only relative my-8 mx-auto max-w-2xl transform -rotate-1">
<div class="flex flex-col items-center gap-4 rounded-md border-2 border-dashed border-red-400 bg-red-50 px-6 py-8 text-center shadow-sm relative">
<div class="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-28 bg-yellow-100/60 transform rotate-2"></div>
<div class="font-display text-xl font-bold text-red-700">👑 LEADER ONLY</div>
<div class="text-base leading-relaxed text-gray-700 markdown-content">${parsedContent}</div>
</div>
</div>`;
        });

        // 2. Split Content Logic
        // Requirement: Everything before "## 🗺️ 每日詳細行程與餐飲狀態" is Intro (one big section).
        // Everything after is the Itinerary, which should be split by Chapter and Day.

        const splitMarker = "## 🗺️ 每日詳細行程與餐飲狀態";
        const mainParts = processedMarkdown.split(splitMarker);

        mainContainer.innerHTML = ''; // Clear loading state

        // --- PART A: INTRO ---
        if (mainParts.length > 0) {
            const introContent = mainParts[0];
            if (introContent.trim()) {
                createSection(introContent, 'intro');
            }
        }

        // --- PART B: ITINERARY ---
        if (mainParts.length > 1) {
            // Add the header back to the first part of the itinerary if needed, 
            // or just start splitting the rest.
            // The user wants the "Daily Itinerary" header to be part of the flow? 
            // Or maybe just start with the first Chapter?
            // Let's assume the text AFTER the marker starts with the content of that section.
            // We'll treat the marker itself as a section cover if we want, or just ignore it.
            // Let's add a cover slide for the "Daily Itinerary" section itself.

            createSection(`## 🗺️ 每日詳細行程與餐飲狀態\n(Daily Itinerary & Meal Status)`, 'section-cover');

            const itineraryContent = mainParts[1];

            // Split by Chapter (###) or Day (####)
            const itinerarySplitRegex = /^(#{3}\s+.*|#{4}\s+Day\s+\d+.*)/gm;
            const itineraryParts = itineraryContent.split(itinerarySplitRegex);

            for (let i = 0; i < itineraryParts.length; i++) {
                const part = itineraryParts[i];

                if (part.match(/^#{3}\s+/)) {
                    // Chapter
                    let content = part + '\n';
                    if (i + 1 < itineraryParts.length && !itineraryParts[i + 1].match(itinerarySplitRegex)) {
                        content += itineraryParts[i + 1];
                    }
                    createSection(content, 'chapter');
                } else if (part.match(/^#{4}\s+Day/)) {
                    // Day
                    let content = part + '\n';
                    if (i + 1 < itineraryParts.length && !itineraryParts[i + 1].match(itinerarySplitRegex)) {
                        content += itineraryParts[i + 1];
                    }
                    createSection(content, 'day');
                }
            }
        }

        // Re-run marked on the injected secret blocks' inner content if needed
    }

    function createSection(content, type) {
        const section = document.createElement('section');
        // Common classes for all slides
        // Use min-h-screen to allow content to grow.
        // snap-start is good, but we might need to relax it in CSS.
        section.className = "min-h-screen w-full flex flex-col items-center justify-start py-12 px-4 snap-start relative shrink-0";

        // Parse Markdown
        const htmlContent = marked.parse(content);

        if (type === 'chapter') {
            // --- CHAPTER SLIDE STYLE (Postcard Look) ---
            section.classList.add('justify-center');
            section.innerHTML = `
                <div class="w-full max-w-4xl bg-stone-100 p-2 rounded shadow-2xl transform rotate-1">
                    <div class="border-2 border-dashed border-stone-300 p-12 flex flex-col items-center justify-center min-h-[300px] relative bg-stone-50">
                        <!-- Stamp Decoration -->
                        <div class="absolute top-6 right-6 w-24 h-24 border-4 border-rose-200 rounded-full flex items-center justify-center opacity-40 transform rotate-12">
                            <div class="text-rose-300 font-bold text-xs text-center leading-tight">
                                TRAVEL<br>MEMORIES<br>2025
                            </div>
                        </div>
                        
                        <div class="prose prose-2xl max-w-none font-body text-slate-700 relative z-10">
                            ${htmlContent}
                        </div>
                    </div>
                </div>
            `;
        } else if (type === 'section-cover') {
            // --- SECTION COVER STYLE ---
            section.classList.add('justify-center');
            section.innerHTML = `
                <div class="w-full max-w-4xl bg-white p-1 rounded-lg shadow-2xl relative overflow-hidden text-center transform rotate-1">
                    <!-- Background Image (Vintage Map) -->
                    <div class="absolute inset-0 bg-cover bg-center opacity-25" 
                         style="background-image: url('https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?q=80&w=2064&auto=format&fit=crop');">
                    </div>
                    
                    <!-- Decorative Border Container -->
                    <div class="relative z-10 m-2 border-4 border-double border-rose-200 rounded-lg py-16 px-8 bg-white/60 backdrop-blur-sm">
                        <div class="prose prose-2xl max-w-none font-body text-rose-600">
                            ${htmlContent}
                        </div>
                        <div class="mt-8">
                             <span class="inline-block px-4 py-2 bg-rose-500 text-white text-lg font-handwriting rounded-full shadow-md transform -rotate-2">
                                Let's Go! ✈️
                             </span>
                        </div>
                    </div>
                </div>
            `;
        } else if (type === 'intro') {
            // --- INTRO SLIDE STYLE ---
            // This will be a long scrollable section.
            section.innerHTML = `
                <div class="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-lg shadow-xl relative mt-4 mb-20">
                    <div class="prose prose-lg max-w-none font-body text-gray-700">
                        ${htmlContent}
                    </div>
                </div>
            `;
        } else {
            // --- DAY SLIDE STYLE ---
            // Extract Day Number for Image Logic
            const dayMatch = content.match(/Day\s+(\d+)/);
            const dayNum = dayMatch ? `Day ${dayMatch[1]}` : 'default';
            const imageUrl = dayImages[dayNum] || dayImages['default'];

            section.innerHTML = `
                <div class="w-full max-w-4xl bg-white p-6 sm:p-10 rounded-lg shadow-xl relative mt-4 mb-20">
                    <!-- Tape Effects -->
                    <div class="absolute -top-4 -left-6 -rotate-12 h-8 w-32 bg-yellow-100/60 tape-edge-left hidden sm:block"></div>
                    <div class="absolute -bottom-5 -right-5 rotate-6 h-8 w-32 bg-yellow-100/60 tape-edge-right hidden sm:block"></div>
                    
                    <!-- Image Header -->
                    <div class="w-full h-48 sm:h-64 rounded-md bg-cover bg-center bg-no-repeat mb-8 shadow-md transform rotate-1"
                         style="background-image: url('${imageUrl}');">
                    </div>

                    <!-- Content -->
                    <div class="prose prose-lg max-w-none font-body text-gray-700">
                        ${htmlContent}
                    </div>
                </div>
            `;
        }

        mainContainer.appendChild(section);
    }

    // --- 2. Auth & UI Logic ---
    const SECRET_CODE = 'love2025';

    function checkAdminStatus() {
        const isAdmin = localStorage.getItem('isLeader') === 'true';
        if (isAdmin) {
            document.body.classList.add('is-admin');
            fabContainer.classList.remove('hidden');
        } else {
            document.body.classList.remove('is-admin');
            fabContainer.classList.add('hidden');
        }
        updateMusicUI(isAdmin && !bgMusic.paused);
    }

    // Initial check
    checkAdminStatus();

    // FAB Interactions
    if (fabMainBtn) {
        fabMainBtn.addEventListener('click', () => {
            fabMenu.classList.toggle('opacity-0');
            fabMenu.classList.toggle('translate-y-4');
            fabMenu.classList.toggle('pointer-events-none');
            fabMainBtn.classList.toggle('rotate-45');
        });
    }

    // Music Toggle
    if (btnMusic) {
        btnMusic.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                updateMusicUI(true);
            } else {
                bgMusic.pause();
                updateMusicUI(false);
            }
        });
    }

    // Logout
    if (btnLogout) {
        btnLogout.addEventListener('click', () => {
            localStorage.removeItem('isLeader');
            checkAdminStatus();
            alert("Logged out of Leader Mode");
        });
    }

    function updateMusicUI(isPlaying) {
        if (!btnMusic) return;
        const icon = btnMusic.querySelector('span');
        if (isPlaying) {
            icon.textContent = 'pause';
            btnMusic.classList.add('bg-rose-100', 'text-rose-600');
        } else {
            icon.textContent = 'play_arrow';
            btnMusic.classList.remove('bg-rose-100', 'text-rose-600');
        }
    }

    // Auth Modal Trigger (Hidden Easter Egg)
    // We need a way to trigger auth since the footer might be gone or different.
    // Let's add a double-click listener on the main title or a specific hidden element.
    // For now, let's keep the footer trigger if it exists, or add a global key listener?
    // Let's stick to the footer trigger, but we need to ensure it exists in the new layout.
    // Or, we can add a listener to the "Japan Adventure" title in the header.

    // Fallback: Triple click on the top header
    const topHeader = document.querySelector('header h1');
    if (topHeader) {
        topHeader.addEventListener('click', (e) => {
            if (e.detail === 3) {
                authModal.classList.remove('hidden');
                passwordInput.focus();
            }
        });
    }

    // Existing Auth Listeners
    if (cancelAuthBtn) {
        cancelAuthBtn.addEventListener('click', () => {
            authModal.classList.add('hidden');
        });
    }

    if (submitAuthBtn) {
        submitAuthBtn.addEventListener('click', () => {
            if (passwordInput.value === SECRET_CODE) {
                localStorage.setItem('isLeader', 'true');
                checkAdminStatus();
                authModal.classList.add('hidden');
                alert('Welcome back, Leader!');
            } else {
                alert('Wrong code!');
                passwordInput.value = '';
            }
        });
    }

    // Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js');
        });
    }
});

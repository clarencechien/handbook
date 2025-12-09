document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const authTrigger = document.getElementById('auth-trigger');
    const authModal = document.getElementById('auth-modal');
    const cancelAuthBtn = document.getElementById('cancel-auth');
    const submitAuthBtn = document.getElementById('submit-auth');
    const passwordInput = document.getElementById('password-input');
    const logoutBtn = document.getElementById('logout-btn');
    const bgMusic = document.getElementById('bg-music');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const musicStatus = document.getElementById('music-status');

    // --- 1. Markdown Fetcher & Parser ---
    fetch('handbook.md')
        .then(response => {
            if (!response.ok) throw new Error("Failed to load handbook");
            return response.text();
        })
        .then(markdown => {
            // Pre-process for Secret Blocks
            // Syntax: <!-- SECRET_START --> content <!-- SECRET_END -->
            const secretRegex = /<!--\s*SECRET_START\s*-->([\s\S]*?)<!--\s*SECRET_END\s*-->/g;

            // Replace with a div that has the .admin-only and .secret-block classes
            // We need to process the inner markdown later, but marked.js might mess up the div structure if we mix HTML and MD too freely.
            // Strategy: Replace the secret blocks with a unique placeholder, parse the whole MD, then replace placeholders with parsed secret content wrapped in the div.

            // Actually, marked.js handles HTML inside Markdown reasonably well. Let's try wrapping first.
            // But we want the content INSIDE the block to be parsed as Markdown too.

            const processedMarkdown = markdown.replace(secretRegex, (match, p1) => {
                return `<div class="admin-only secret-block">\n\n${p1}\n\n</div>`;
            });

            contentDiv.innerHTML = marked.parse(processedMarkdown);
        })
        .catch(err => {
            contentDiv.innerHTML = `<div class="text-red-500 p-4">Error loading handbook: ${err.message}</div>`;
        });

    // --- 2. Auth Logic ---
    const SECRET_CODE = 'love2025'; // Simple hardcoded password

    function checkAdminStatus() {
        const isAdmin = localStorage.getItem('isLeader') === 'true';
        if (isAdmin) {
            document.body.classList.add('is-admin');
        } else {
            document.body.classList.remove('is-admin');
            // Stop music if logging out? Maybe not, let's keep it playing if they accidentally logout.
            // But definitely hide controls.
        }
    }

    // Initial check
    checkAdminStatus();

    // Event Listeners
    authTrigger.addEventListener('click', () => {
        authModal.classList.remove('hidden');
        passwordInput.value = '';
        passwordInput.focus();
    });

    cancelAuthBtn.addEventListener('click', () => {
        authModal.classList.add('hidden');
    });

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

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isLeader');
        checkAdminStatus();
        // Optional: Pause music on logout
        // bgMusic.pause();
        // updateMusicUI(false);
    });

    // --- 3. Music Control ---
    function updateMusicUI(isPlaying) {
        if (isPlaying) {
            playBtn.classList.add('hidden');
            pauseBtn.classList.remove('hidden');
            musicStatus.textContent = "Now Playing...";
            musicStatus.classList.add('text-indigo-600', 'font-bold');
        } else {
            playBtn.classList.remove('hidden');
            pauseBtn.classList.add('hidden');
            musicStatus.textContent = "Music Paused";
            musicStatus.classList.remove('text-indigo-600', 'font-bold');
        }
    }

    playBtn.addEventListener('click', () => {
        bgMusic.play().then(() => {
            updateMusicUI(true);
        }).catch(e => {
            console.error("Playback failed:", e);
            alert("Playback failed. User interaction required first?");
        });
    });

    pauseBtn.addEventListener('click', () => {
        bgMusic.pause();
        updateMusicUI(false);
    });

    // --- 4. Service Worker Registration ---
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful with scope: ', registration.scope);
                }, err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial State Checks
    initLikes();
    initStreaks();
    initQuotes();
    initScrollAnimations();
});

// 2. Like Button Management
function initLikes() {
    const likeBtn = document.getElementById('like-btn');
    const likesCountSpan = document.getElementById('likes-count');

    if (!likeBtn) return;

    // Check if user has already liked
    if (localStorage.getItem('portfolio_liked') === 'true') {
        likeBtn.disabled = true;
        likeBtn.classList.add('liked');
        likeBtn.querySelector('.btn-text').textContent = 'Liked';
    }

    likeBtn.addEventListener('click', async () => {
        if (localStorage.getItem('portfolio_liked') === 'true') return;

        // Visual feedback immediately
        likeBtn.disabled = true;
        likeBtn.classList.add('liked');
        likeBtn.querySelector('.btn-text').textContent = 'Liked';

        try {
            const response = await fetch('/api/likes', { method: 'POST' });
            if (response.ok) {
                const data = await response.json();
                likesCountSpan.textContent = data.likes;
                localStorage.setItem('portfolio_liked', 'true');
            } else {
                // Rollback visual changes on failure
                likeBtn.disabled = false;
                likeBtn.classList.remove('liked');
                likeBtn.querySelector('.btn-text').textContent = 'Like';
            }
        } catch (error) {
            console.error('Error incrementing likes:', error);
            likeBtn.disabled = false;
            likeBtn.classList.remove('liked');
            likeBtn.querySelector('.btn-text').textContent = 'Like';
        }
    });
}

// 3. Coding Streaks Fetching and UI Rendering
async function initStreaks() {
    try {
        const response = await fetch('/api/streaks');
        if (!response.ok) throw new Error('Failed to fetch coding streaks');

        const snapshots = await response.json();

        snapshots.forEach(snapshot => {
            const platform = snapshot.platform; // LEETCODE or CODEFORCES
            const solved = snapshot.totalSolved;
            const streak = snapshot.currentStreak;
            const updatedTime = new Date(snapshot.lastUpdated);

            if (platform === 'LEETCODE') {
                updatePlatformUI('lc', solved, streak, updatedTime);
            } else if (platform === 'CODEFORCES') {
                updatePlatformUI('cf', solved, streak, updatedTime);
            }
        });
    } catch (error) {
        console.error('Error loading streaks:', error);
        // Fail gracefully, keep loaders or default layout values
        document.querySelectorAll('.loading-spinner').forEach(spinner => {
            spinner.outerHTML = '<span style="font-size:0.85rem; color:#ef4444;">Offline</span>';
        });
    }
}

function updatePlatformUI(prefix, solved, streak, updatedTime) {
    const solvedEl = document.getElementById(`${prefix}-solved`);
    const streakEl = document.getElementById(`${prefix}-streak`);
    const streakValEl = document.getElementById(`${prefix}-streak-val`);
    const updatedEl = document.getElementById(`${prefix}-updated`);

    if (solvedEl) solvedEl.textContent = solved;
    if (streakValEl) streakValEl.textContent = streak;

    if (streakEl) {
        if (streak > 0) {
            streakEl.classList.remove('inactive');
            streakEl.innerHTML = `🔥 ${streak} day streak`;
        } else {
            streakEl.classList.add('inactive');
            streakEl.innerHTML = `😴 No active streak`;
        }
    }

    if (updatedEl) {
        updatedEl.textContent = `Updated: ${updatedTime.toLocaleDateString()} ${updatedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
}

// 4. Quotes System
const QUOTES = [
    { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
    { text: "Clean code always looks like it was written by someone who cares.", author: "Michael Feathers" },
    { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
    { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" }
];

function initQuotes() {
    const textEl = document.getElementById('quote-text');
    const authorEl = document.getElementById('quote-author');

    if (!textEl || !authorEl) return;

    const randomIndex = Math.floor(Math.random() * QUOTES.length);
    const selected = QUOTES[randomIndex];

    textEl.textContent = `"${selected.text}"`;
    authorEl.textContent = `— ${selected.author}`;
}

// 5. Scroll Reveal Animations (Intersection Observer)
function initScrollAnimations() {
    const fadeEls = document.querySelectorAll('.fade-in');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate once
            }
        });
    }, observerOptions);

    fadeEls.forEach(el => observer.observe(el));
}

// institutional.js – Shared functionality for all institutional pages
(function () {
    'use strict';

    // ===== THEME =====
    const THEME_KEY = 'gittree-theme';

    const ICON_MOON = '<svg width="1em" height="1em" class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
    const ICON_SUN  = '<svg width="1em" height="1em" class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

    function applyTheme() {
        const saved = localStorage.getItem(THEME_KEY) || 'dark';
        document.body.classList.toggle('light-theme', saved === 'light');
        updateThemeIcon();
    }

    function updateThemeIcon() {
        const btn = document.getElementById('themeToggle');
        if (!btn) return;
        const isLight = document.body.classList.contains('light-theme');
        btn.setAttribute('title', isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode');
        btn.setAttribute('aria-label', isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode');
        // ICON_MOON and ICON_SUN are hardcoded SVG constants — not user-controlled input
        btn.innerHTML = isLight ? ICON_SUN : ICON_MOON;
    }

    function toggleTheme() {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
        updateThemeIcon();
    }

    // ===== SCROLL PROGRESS BAR =====
    function initProgressBar() {
        const bar = document.getElementById('read-progress');
        if (!bar) return;
        function update() {
            const scrollTop = window.scrollY || window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = Math.min(pct, 100) + '%';
        }
        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    // ===== SKIP TO TOP =====
    function initSkipToTop() {
        const btn = document.getElementById('skip-to-top');
        if (!btn) return;
        function onScroll() {
            const scrollY = window.scrollY || window.pageYOffset;
            btn.classList.toggle('visible', scrollY > 400);
        }
        window.addEventListener('scroll', onScroll, { passive: true });
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== CHIP NAVIGATION =====
    function initChipNav() {
        const chips = document.querySelectorAll('.chip[href^="#"]');
        if (!chips.length) return;

        chips.forEach(function (chip) {
            chip.addEventListener('click', function (e) {
                const href = chip.getAttribute('href');
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offset = 90;
                    const top = target.getBoundingClientRect().top + (window.scrollY || window.pageYOffset) - offset;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                }
            });
        });

        function updateActiveChip() {
            const scrollY = (window.scrollY || window.pageYOffset) + 120;
            chips.forEach(function (chip) {
                const target = document.querySelector(chip.getAttribute('href'));
                if (!target) return;
                const top    = target.offsetTop;
                const bottom = top + target.offsetHeight;
                chip.classList.toggle('active', scrollY >= top && scrollY < bottom);
            });
        }

        window.addEventListener('scroll', updateActiveChip, { passive: true });
        updateActiveChip();
    }

    // ===== LANGUAGE SELECTOR =====
    function initLanguageSelector() {
        const sel = document.getElementById('languageSelector');
        if (!sel) return;
        sel.addEventListener('change', function (e) {
            if (typeof setLanguage === 'function') setLanguage(e.target.value);
        });
    }

    // ===== INIT =====
    document.addEventListener('DOMContentLoaded', function () {
        applyTheme();

        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

        initProgressBar();
        initSkipToTop();
        initChipNav();
        initLanguageSelector();

        if (typeof initI18n === 'function') initI18n();
    });
}());

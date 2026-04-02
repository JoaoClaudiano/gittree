// institutional.js – Shared functionality for all institutional pages
(function () {
    'use strict';

    // ===== THEME =====
    var THEME_KEY = 'gittree-theme';

    var ICON_MOON = '<svg width="1em" height="1em" class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
    var ICON_SUN  = '<svg width="1em" height="1em" class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

    function applyTheme() {
        var saved = localStorage.getItem(THEME_KEY) || 'dark';
        document.body.classList.toggle('light-theme', saved === 'light');
        updateThemeIcon();
    }

    function updateThemeIcon() {
        var btn = document.getElementById('themeToggle');
        if (!btn) return;
        var isLight = document.body.classList.contains('light-theme');
        btn.setAttribute('title', isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode');
        btn.setAttribute('aria-label', isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode');
        btn.innerHTML = isLight ? ICON_SUN : ICON_MOON;
    }

    function toggleTheme() {
        document.body.classList.toggle('light-theme');
        var isLight = document.body.classList.contains('light-theme');
        localStorage.setItem(THEME_KEY, isLight ? 'light' : 'dark');
        updateThemeIcon();
    }

    // ===== SCROLL PROGRESS BAR =====
    function initProgressBar() {
        var bar = document.getElementById('read-progress');
        if (!bar) return;
        function update() {
            var scrollTop = window.scrollY || window.pageYOffset;
            var docHeight = document.documentElement.scrollHeight - window.innerHeight;
            var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            bar.style.width = Math.min(pct, 100) + '%';
        }
        window.addEventListener('scroll', update, { passive: true });
        update();
    }

    // ===== SKIP TO TOP =====
    function initSkipToTop() {
        var btn = document.getElementById('skip-to-top');
        if (!btn) return;
        function onScroll() {
            var scrollY = window.scrollY || window.pageYOffset;
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
        var chips = document.querySelectorAll('.chip[href^="#"]');
        if (!chips.length) return;

        chips.forEach(function (chip) {
            chip.addEventListener('click', function (e) {
                var href = chip.getAttribute('href');
                var target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    var offset = 90;
                    var top = target.getBoundingClientRect().top + (window.scrollY || window.pageYOffset) - offset;
                    window.scrollTo({ top: top, behavior: 'smooth' });
                }
            });
        });

        function updateActiveChip() {
            var scrollY = (window.scrollY || window.pageYOffset) + 120;
            chips.forEach(function (chip) {
                var target = document.querySelector(chip.getAttribute('href'));
                if (!target) return;
                var top    = target.offsetTop;
                var bottom = top + target.offsetHeight;
                chip.classList.toggle('active', scrollY >= top && scrollY < bottom);
            });
        }

        window.addEventListener('scroll', updateActiveChip, { passive: true });
        updateActiveChip();
    }

    // ===== LANGUAGE SELECTOR =====
    function initLanguageSelector() {
        var sel = document.getElementById('languageSelector');
        if (!sel) return;
        sel.addEventListener('change', function (e) {
            if (typeof setLanguage === 'function') setLanguage(e.target.value);
        });
    }

    // ===== INIT =====
    document.addEventListener('DOMContentLoaded', function () {
        applyTheme();

        var themeBtn = document.getElementById('themeToggle');
        if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

        initProgressBar();
        initSkipToTop();
        initChipNav();
        initLanguageSelector();

        if (typeof initI18n === 'function') initI18n();
    });
}());

// institutional.js – Shared functionality for all institutional pages
(function () {
    'use strict';

    // ===== THEME =====
    const THEME_KEY = 'gittree-theme';

    const ICON_MOON = '<svg width="1em" height="1em" class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>';
    const ICON_SUN  = '<svg width="1em" height="1em" class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

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

    // ===== CONTACT FORM =====
    function initContactForm() {
        var form = document.getElementById('contactForm');
        if (!form) return;

        var statusEl  = document.getElementById('contactFormStatus');
        var submitBtn = document.getElementById('contactSubmitBtn');
        var ENDPOINT  = 'https://formsubmit.co/ajax/f9ea5f92e0ced7e18a5ffb68081f7a05';

        var BTN_DEFAULT = submitBtn.innerHTML;
        var BTN_LOADING = '<svg width="1em" height="1em" class="svg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg><span>Sending\u2026</span>';

        function sanitize(str) {
            // Trim and remove control characters; display is always via textContent, never innerHTML
            return String(str).trim().replace(/[\u0000-\u001F\u007F]/g, '');
        }

        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
        }

        function showStatus(type, message) {
            statusEl.className = 'form-status ' + type;
            statusEl.textContent = message; // textContent prevents XSS
            statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        function clearStatus() {
            statusEl.className = 'form-status';
            statusEl.textContent = '';
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            clearStatus();

            var name    = sanitize(document.getElementById('contactName').value);
            var email   = sanitize(document.getElementById('contactEmail').value);
            var subject = sanitize(document.getElementById('contactSubject').value);
            var message = sanitize(document.getElementById('contactMessage').value);

            if (!name) {
                showStatus('error', 'Please enter your name.');
                document.getElementById('contactName').focus();
                return;
            }
            if (name.length > 100) {
                showStatus('error', 'Name must be 100 characters or fewer.');
                document.getElementById('contactName').focus();
                return;
            }
            if (!email || !isValidEmail(email)) {
                showStatus('error', 'Please enter a valid email address.');
                document.getElementById('contactEmail').focus();
                return;
            }
            if (!message || message.length < 10) {
                showStatus('error', 'Please enter a message of at least 10 characters.');
                document.getElementById('contactMessage').focus();
                return;
            }
            if (message.length > 2000) {
                showStatus('error', 'Message must be 2,000 characters or fewer.');
                document.getElementById('contactMessage').focus();
                return;
            }

            submitBtn.disabled = true;
            submitBtn.innerHTML = BTN_LOADING;

            fetch(ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    subject: subject || 'Contact form message',
                    message: message
                })
            })
            .then(function (res) {
                return res.json().then(function (data) {
                    return { ok: res.ok, data: data };
                });
            })
            .then(function (result) {
                if (result.ok && (result.data.success === 'true' || result.data.success === true)) {
                    showStatus('success', '\u2713 Your message was sent successfully! We\u2019ll get back to you within 24\u201348 business hours.');
                    form.reset();
                } else {
                    showStatus('error', 'Something went wrong. Please try again or email us directly at gittree@proton.me.');
                }
            })
            .catch(function () {
                showStatus('error', 'Network error. Please check your connection and try again, or email us at gittree@proton.me.');
            })
            .finally(function () {
                submitBtn.disabled = false;
                submitBtn.innerHTML = BTN_DEFAULT;
            });
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
        initContactForm();

        if (typeof initI18n === 'function') {
            // initI18n() is async; reveal body once translations are applied.
            initI18n().then(
                function () { document.body.style.visibility = 'visible'; },
                function () { document.body.style.visibility = 'visible'; }
            );
        } else {
            document.body.style.visibility = 'visible';
        }
    });
}());

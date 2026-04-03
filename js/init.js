// init.js – page initialization: i18n, cookie consent, analytics tracking, service worker
// Extracted from inline <script> blocks in index.html to allow removal of 'unsafe-inline'

// ===== i18n =====
document.addEventListener('DOMContentLoaded', function () {
    if (typeof initI18n === 'function') {
        initI18n();

        const languageSelector = document.getElementById('languageSelector');
        if (languageSelector) {
            languageSelector.addEventListener('change', function (e) {
                setLanguage(e.target.value);
            });
        }
    }
});

// ===== Cookie Consent =====
document.addEventListener('DOMContentLoaded', function () {
    function checkCookieConsent() {
        if (!localStorage.getItem('cookie_consent')) {
            const banner = document.getElementById('cookie-banner');
            if (banner) banner.style.display = 'block';
        }
    }

    function acceptAllCookies() {
        localStorage.setItem('cookie_consent', 'accepted');
        localStorage.setItem('cookie_analytics', 'true');
        localStorage.setItem('cookie_marketing', 'true');
        const banner = document.getElementById('cookie-banner');
        if (banner) banner.style.display = 'none';
    }

    function rejectAllCookies() {
        localStorage.setItem('cookie_consent', 'rejected');
        localStorage.setItem('cookie_analytics', 'false');
        localStorage.setItem('cookie_marketing', 'false');
        const banner = document.getElementById('cookie-banner');
        if (banner) banner.style.display = 'none';
    }

    // Expose globally so the cookie buttons can call them via addEventListener
    window.acceptAllCookies = acceptAllCookies;
    window.rejectAllCookies = rejectAllCookies;

    // Wire up cookie buttons without inline onclick handlers
    const acceptBtn = document.getElementById('cookieAcceptBtn');
    if (acceptBtn) acceptBtn.addEventListener('click', acceptAllCookies);

    const rejectBtn = document.getElementById('cookieRejectBtn');
    if (rejectBtn) rejectBtn.addEventListener('click', rejectAllCookies);

    checkCookieConsent();

    // ===== Analytics Event Tracking =====
    const trackedButtons = ['analyzeBtn', 'exportJSONBtn', 'exportCSVBtn', 'copyTreeBtn'];
    trackedButtons.forEach(function (btnId) {
        const btn = document.getElementById(btnId);
        if (btn) {
            btn.addEventListener('click', function () {
                if (window.dataLayer) {
                    window.dataLayer.push({
                        event: 'tool_usage',
                        tool_name: btnId.replace('Btn', ''),
                        tool_action: 'click'
                    });
                }
            });
        }
    });

    const repoInput = document.getElementById('repoInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    if (repoInput && analyzeBtn) {
        analyzeBtn.addEventListener('click', function () {
            const repo = repoInput.value.trim();
            if (repo && window.dataLayer) {
                window.dataLayer.push({
                    event: 'repo_analysis',
                    repo_url: repo,
                    analysis_type: 'github_repo'
                });
            }
        });
    }
});

// ===== Service Worker =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('service-worker.js')
            .then(function (registration) {
                console.log('[SW] Service Worker registrado!', registration.scope);

                // Detecta quando um novo SW foi instalado e está aguardando ativação.
                // Isso acontece quando um deploy novo é publicado: o SW antigo ainda
                // controla a página, mas o novo já foi baixado e está em "waiting".
                registration.addEventListener('updatefound', function () {
                    const newWorker = registration.installing;
                    if (!newWorker) return;

                    newWorker.addEventListener('statechange', function () {
                        // Novo SW instalado e pronto, mas ainda não ativo
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            console.log('[SW] Nova versão disponível. Recarregando...');
                            // Pede ao novo SW para pular a espera e assumir o controle imediatamente
                            newWorker.postMessage({ type: 'SKIP_WAITING' });
                        }
                    });
                });
            })
            .catch(function (err) {
                console.log('[SW] Falha no registro:', err);
            });

        // Recarrega a página automaticamente quando o SW assume o controle,
        // garantindo que o usuário veja sempre a versão mais recente após um deploy.
        let refreshing = false;
        navigator.serviceWorker.addEventListener('controllerchange', function () {
            if (!refreshing) {
                refreshing = true;
                window.location.reload();
            }
        });
    });
}

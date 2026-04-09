// GitTree i18n – Internationalization System
// Translation data lives in js/i18n/locales/{lang}.json (one file per language).
// Supports: English, Portuguese, Spanish, French, Italian, Japanese, Korean, Chinese

// ---------------------------------------------------------------------------
// Base URL for locale JSON files.
// Computed from this script's own URL so it works from both root pages (/)
// and locale sub-directories (/pt/, /es/, etc.).
// ---------------------------------------------------------------------------
const _localesBase = (function () {
    if (typeof document !== 'undefined' && document.currentScript) {
        return document.currentScript.src.replace(/\/[^/]+$/, '/locales/');
    }
    return '/js/i18n/locales/';
}());

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

/** Translation cache – keyed by locale code, values are flat key→string objects. */
const translations = {};

/** Language names in their native forms. */
const languageNames = {
    en: 'English',
    pt: 'Português',
    es: 'Español',
    fr: 'Français',
    it: 'Italiano',
    ja: '日本語',
    ko: '한국어',
    zh: '中文',
};

/** Currently active locale code. */
let currentLanguage = 'en';

// ---------------------------------------------------------------------------
// Locale loading
// ---------------------------------------------------------------------------

/**
 * Load a locale JSON file and cache it in `translations`.
 * Safe to call multiple times for the same locale (no-op when already cached).
 * Works in both browser (fetch) and Node.js (fs.promises).
 *
 * @param {string} lang - Locale code (e.g. 'en', 'pt')
 * @returns {Promise<void>}
 */
function loadLocale(lang) {
    if (translations[lang]) return Promise.resolve();

    // Node.js environment (used when this module is required by build scripts)
    if (typeof require !== 'undefined' && typeof window === 'undefined') {
        var path = require('path');
        var fs   = require('fs');
        var file = path.join(__dirname, 'locales', lang + '.json');
        translations[lang] = JSON.parse(fs.readFileSync(file, 'utf8'));
        return Promise.resolve();
    }

    // Browser environment
    return fetch(_localesBase + lang + '.json')
        .then(function (r) {
            if (!r.ok) throw new Error('HTTP ' + r.status);
            return r.json();
        })
        .then(function (data) {
            translations[lang] = data;
        });
}

// ---------------------------------------------------------------------------
// Core helpers
// ---------------------------------------------------------------------------

/**
 * Interpolate `{placeholder}` tokens in a string, and resolve plural objects.
 *
 * Plural format in JSON:  { "one": "...", "other": "..." }
 * The active plural form is chosen from `params.count` (preferred) or `params.n`.
 * When neither is provided the "other" form is used.
 *
 * @param {string|Object} value  - Raw value from the translations map
 * @param {Object}        [params] - Replacement tokens and optional 'count'/'n'
 * @returns {string}
 */
function interpolate(value, params) {
    // Plural object resolution
    if (value !== null && typeof value === 'object') {
        var count = params && (params.count !== undefined ? params.count : params.n);
        var form  = (count === 1) ? 'one' : 'other';
        value = value[form] !== undefined ? value[form] : (value.other !== undefined ? value.other : '');
    }

    if (typeof value !== 'string') return String(value);
    if (!params) return value;

    return value.replace(/\{(\w+)\}/g, function (_, key) {
        return params[key] !== undefined ? String(params[key]) : '{' + key + '}';
    });
}

/**
 * Translate a key, with optional interpolation and automatic English fallback.
 * Falls back to the English translation when the key is absent in the active locale.
 * Falls back to the key itself when not found in English either.
 *
 * @param {string} key      - Translation key
 * @param {Object} [params] - Interpolation tokens (e.g. { n: 5, format: 'JSON' })
 * @returns {string}
 */
function t(key, params) {
    var lang = translations[currentLanguage];
    var en   = translations['en'];
    var raw  = (lang && lang[key] !== undefined) ? lang[key]
             : (en  && en[key]   !== undefined) ? en[key]
             : key;
    return interpolate(raw, params);
}

// ---------------------------------------------------------------------------
// Language detection
// ---------------------------------------------------------------------------

/**
 * Determine the best available locale.
 * Checks localStorage first, then the browser's language preference.
 * @returns {string} Locale code
 */
function detectLanguage() {
    try {
        var saved = localStorage.getItem('gittree-language');
        if (saved && languageNames[saved]) return saved;
    } catch (_) {}

    var browserLang = (navigator.language || 'en').split('-')[0];
    return languageNames[browserLang] ? browserLang : 'en';
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Initialize the i18n system.
 * Detects the preferred language, loads its JSON (and English for fallback),
 * then applies translations to the current page.
 *
 * @returns {Promise<void>}
 */
function initI18n() {
    var lang = detectLanguage();
    var loads = lang !== 'en'
        ? Promise.all([loadLocale('en'), loadLocale(lang)])
        : loadLocale('en');

    return loads
        .catch(function (err) {
            console.error('[i18n] Failed to load locale, defaulting to English.', err);
            return loadLocale('en');
        })
        .then(function () {
            currentLanguage = translations[lang] ? lang : 'en';
            try { localStorage.setItem('gittree-language', currentLanguage); } catch (_) {}
            applyTranslations();
            updateSEO();
            updateLanguageSelector();
            console.log('\uD83C\uDF0D i18n initialized: ' + languageNames[currentLanguage] + ' (' + currentLanguage + ')');
        });
}

/**
 * Switch to a different language at runtime.
 * Loads the locale JSON if not yet cached, then re-applies all translations.
 *
 * @param {string} langCode - Language code (e.g. 'en', 'pt', 'ja')
 * @returns {Promise<void>}
 */
function setLanguage(langCode) {
    if (!languageNames[langCode]) {
        console.error("Language '" + langCode + "' not found. Falling back to English.");
        langCode = 'en';
    }

    return loadLocale(langCode)
        .catch(function (err) {
            console.error("[i18n] Could not load '" + langCode + "'. Keeping current language.", err);
            return; // resolve without switching
        })
        .then(function () {
            if (!translations[langCode]) return; // load failed silently above
            currentLanguage = langCode;
            try { localStorage.setItem('gittree-language', langCode); } catch (_) {}
            applyTranslations();
            updateSEO();
            updateLanguageSelector();
            if (typeof updateCacheStatus === 'function') updateCacheStatus();
            console.log('\u2705 Language changed to: ' + languageNames[langCode]);
        });
}

// ---------------------------------------------------------------------------
// DOM helpers
// ---------------------------------------------------------------------------

/**
 * Apply translations to all elements that carry data-i18n* attributes.
 */
function applyTranslations() {
    if (typeof document === 'undefined') return;

    var tr  = translations[currentLanguage] || {};
    var en  = translations['en'] || {};
    var year = String(new Date().getFullYear());

    /** Resolve a key to its translated, year-interpolated string (or null). */
    function resolve(key) {
        var raw = (tr[key] !== undefined) ? tr[key] : en[key];
        if (raw === undefined) return null;
        return interpolate(raw, { year: year });
    }

    // data-i18n → plain text content (or input placeholder)
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
        var val = resolve(el.getAttribute('data-i18n'));
        if (val === null) return;
        if (el.tagName === 'INPUT' && el.hasAttribute('placeholder')) {
            el.setAttribute('placeholder', val);
        } else {
            el.textContent = val;
        }
    });

    // data-i18n-html → innerHTML (for strings that contain HTML markup)
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
        var key = el.getAttribute('data-i18n-html');
        var raw = (tr[key] !== undefined) ? tr[key] : en[key];
        if (raw === undefined) return;
        el.innerHTML = typeof raw === 'string'
            ? raw.replace(/\{year\}/g, year)
            : String(raw);
    });

    // data-i18n-title → title attribute
    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
        var val = resolve(el.getAttribute('data-i18n-title'));
        if (val !== null) el.setAttribute('title', val);
    });

    // data-i18n-placeholder → placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
        var val = resolve(el.getAttribute('data-i18n-placeholder'));
        if (val !== null) el.setAttribute('placeholder', val);
    });
}

/**
 * Update SEO meta tags dynamically when the language changes.
 */
function updateSEO() {
    if (typeof document === 'undefined') return;

    var tr = translations[currentLanguage] || {};
    var en = translations['en'] || {};

    function get(key) {
        return (tr[key] !== undefined) ? tr[key] : en[key];
    }

    // <title>
    var titleEl  = document.querySelector('title');
    var titleKey = titleEl && titleEl.getAttribute('data-i18n');
    var pageTitle = titleKey ? get(titleKey) : get('pageTitle');
    if (pageTitle) document.title = String(pageTitle);

    // meta description
    var metaDesc = document.querySelector('meta[name="description"]');
    var desc = get('metaDescription');
    if (metaDesc && desc) metaDesc.setAttribute('content', String(desc));

    // meta keywords (update or create)
    var kw = get('metaKeywords');
    if (kw) {
        var metaKw = document.querySelector('meta[name="keywords"]');
        if (!metaKw) {
            metaKw = document.createElement('meta');
            metaKw.setAttribute('name', 'keywords');
            document.head.appendChild(metaKw);
        }
        metaKw.setAttribute('content', String(kw));
    }

    // HTML lang attribute
    document.documentElement.setAttribute('lang', currentLanguage);

    // Open Graph
    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && pageTitle) ogTitle.setAttribute('content', String(pageTitle));

    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && desc) ogDesc.setAttribute('content', String(desc));

    // Twitter
    var twTitle = document.querySelector('meta[property="twitter:title"]');
    if (twTitle && pageTitle) twTitle.setAttribute('content', String(pageTitle));

    var twDesc = document.querySelector('meta[property="twitter:description"]');
    if (twDesc && desc) twDesc.setAttribute('content', String(desc));
}

/**
 * Sync the language selector dropdown and the sigla badge to the active locale.
 */
function updateLanguageSelector() {
    if (typeof document === 'undefined') return;
    var sel = document.getElementById('languageSelector');
    if (sel) sel.value = currentLanguage;
    var icon = document.getElementById('langIcon');
    if (icon) icon.textContent = currentLanguage.toUpperCase();
}

// ---------------------------------------------------------------------------
// Module exports (Node.js / build scripts)
// ---------------------------------------------------------------------------

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { translations, languageNames, loadLocale, initI18n, setLanguage, t, interpolate };
}

// ---------------------------------------------------------------------------
// BFCache support
// Re-apply translations when the page is restored from the back/forward cache.
// DOMContentLoaded does not re-fire on bfcache restore.
// ---------------------------------------------------------------------------

if (typeof window !== 'undefined') {
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            initI18n();
        }
    });
}

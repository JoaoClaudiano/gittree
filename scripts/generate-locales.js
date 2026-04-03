#!/usr/bin/env node

/**
 * Static Multi-Locale Generator
 *
 * Generates pre-rendered locale HTML pages for all non-English languages.
 * Creates /pt/, /es/, /fr/, /it/, /ja/, /ko/, /zh/ directories with
 * translated HTML so search engines see the correct language without JS.
 *
 * Run: node scripts/generate-locales.js
 */

'use strict';

const fs   = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const BASE_URL = 'https://gittree.pages.dev';
const ROOT_DIR = path.join(__dirname, '..');

// Load each locale from its dedicated JSON file.
// This keeps the build script independent of the browser runtime in translations.js.
const LOCALES_DIR = path.join(ROOT_DIR, 'js', 'locales');

/** @type {Record<string, Record<string, string>>} */
const translations = {};
const ALL_LOCALE_CODES = ['en', 'pt', 'es', 'fr', 'it', 'ja', 'ko', 'zh'];
for (const locale of ALL_LOCALE_CODES) {
    translations[locale] = JSON.parse(
        fs.readFileSync(path.join(LOCALES_DIR, locale + '.json'), 'utf8')
    );
}

const languageNames = {
    en: 'English', pt: 'Português', es: 'Español', fr: 'Français',
    it: 'Italiano', ja: '日本語', ko: '한국어', zh: '中文',
};

/** Non-English locales to generate. */
const LOCALES = ['pt', 'es', 'fr', 'it', 'ja', 'ko', 'zh'];

/** Source HTML pages that get a locale copy. */
const PAGES = [
    'index.html',
    'sobre.html',
    'guia.html',
    'contato.html',
    'termos.html',
    'politica-de-privacidade.html',
];

/** Map locale code → og:locale value. */
const OG_LOCALE_MAP = {
    en: 'en_US', pt: 'pt_BR', es: 'es_ES', fr: 'fr_FR',
    it: 'it_IT', ja: 'ja_JP', ko: 'ko_KR', zh: 'zh_CN',
};

/** All locales including English (used for hreflang blocks). */
const ALL_LOCALES = ['en', ...LOCALES];

// ---------------------------------------------------------------------------
// URL helpers
// ---------------------------------------------------------------------------

/**
 * Returns the canonical URL for a page in a given locale.
 * English lives at the root; other locales live under /{locale}/.
 */
function getLocaleUrl(locale, page) {
    const pagePath = page === 'index.html' ? '' : page;
    const base = locale === 'en' ? BASE_URL : `${BASE_URL}/${locale}`;
    return pagePath ? `${base}/${pagePath}` : `${base}/`;
}

// ---------------------------------------------------------------------------
// HTML helpers
// ---------------------------------------------------------------------------

/** Escape text for safe insertion as HTML text content. */
function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

/** Update the lang="…" attribute on the <html> tag. */
function updateHtmlLang(html, lang) {
    return html.replace(/(<html\b[^>]*)\blang="[^"]*"/, `$1lang="${lang}"`);
}

/**
 * Replace the text content of the <title> element
 * (works with or without a data-i18n attribute on <title>).
 */
function updateTitleContent(html, newText) {
    return html.replace(/(<title[^>]*>)[^<]*(<\/title>)/i, `$1${escapeHtml(newText)}$2`);
}

/**
 * Update content="…" on a meta tag identified by a selector fragment
 * (e.g. 'name="description"' or 'property="og:title"').
 */
function updateMetaContent(html, selectorFragment, newContent) {
    const escaped = newContent.replace(/"/g, '&quot;');
    const frag = selectorFragment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // selector before content=
    let result = html.replace(
        new RegExp(`(<meta[^>]*${frag}[^>]*content=")([^"]*)(")`,'i'),
        `$1${escaped}$3`
    );
    // content= before selector
    if (result === html) {
        result = html.replace(
            new RegExp(`(<meta[^>]*content=")([^"]*)("[^>]*${frag}[^>]*)`,'i'),
            `$1${escaped}$3`
        );
    }
    return result;
}

/** Update the href="…" on the <link rel="canonical"> element. */
function updateCanonical(html, newHref) {
    return html
        .replace(/(<link[^>]*rel="canonical"[^>]*href=")([^"]*)(")/i, `$1${newHref}$3`)
        .replace(/(<link[^>]*href=")([^"]*)("[^>]*rel="canonical"[^>]*)/i, `$1${newHref}$3`);
}

/** Remove all existing hreflang <link> tags (prevents duplicates). */
function removeHreflangLinks(html) {
    return html.replace(/<link[^>]*rel="alternate"[^>]*hreflang="[^"]*"[^>]*>\s*/gi, '');
}

/** Build the full hreflang <link> block for a page (all locales + x-default). */
function buildHreflangLinks(page, indent) {
    indent = indent || '    ';
    const lines = [
        `${indent}<link rel="alternate" hreflang="x-default" href="${getLocaleUrl('en', page)}">`,
    ];
    for (const locale of ALL_LOCALES) {
        lines.push(`${indent}<link rel="alternate" hreflang="${locale}" href="${getLocaleUrl(locale, page)}">`);
    }
    return lines.join('\n');
}

/** Inject hreflang links just before </head>. */
function injectHreflangLinks(html, page) {
    return html.replace(/(\s*<\/head>)/i, `\n${buildHreflangLinks(page)}\n$1`);
}

/**
 * Replace og:locale:alternate tags and update og:locale for the current locale.
 */
function updateOgLocales(html, locale) {
    // Remove all existing alternates
    html = html.replace(/<meta[^>]*property="og:locale:alternate"[^>]*>\s*/gi, '');
    // Update og:locale value
    html = updateMetaContent(html, 'property="og:locale"', OG_LOCALE_MAP[locale] || 'en_US');
    // Re-insert alternates for all other locales
    const alternates = ALL_LOCALES
        .filter(l => l !== locale)
        .map(l => `    <meta property="og:locale:alternate" content="${OG_LOCALE_MAP[l]}">`)
        .join('\n');
    html = html.replace(/(<meta[^>]*property="og:locale"[^>]*>)/i, `$1\n${alternates}`);
    return html;
}

/**
 * Fix relative asset paths so they resolve correctly from a sub-directory.
 * Page-to-page .html links are left as-is (the locale folder has all pages).
 */
function fixAssetPaths(html) {
    return html
        .replace(/((?:src|href)=")(js\/)/g,              '$1../$2')
        .replace(/((?:src|href)=")(css\/)/g,             '$1../$2')
        .replace(/((?:src|href)=")(tailwind-[^"]+)(")/g, '$1../$2$3')
        .replace(/((?:src|href)=")(manifest\.json)(")/g, '$1../$2$3')
        .replace(/((?:src|href)=")(CHANGELOG\.md)(")/g,  '$1../$2$3');
}

/**
 * Replace root-only href="/" navigation links with the locale home.
 * Only matches exactly href="/" to avoid touching paths like href="/icons/…".
 */
function fixRootLinks(html, locale) {
    return html.replace(/href="\/"/g, `href="/${locale}/"`);
}

// ---------------------------------------------------------------------------
// data-i18n element content replacement
// ---------------------------------------------------------------------------

/**
 * Core helper: replaces the *inner content* of every element that carries
 * `data-i18n="key"` or `data-i18n-html="key"` with the supplied content.
 *
 * Uses a character-level depth counter to find the correct closing tag,
 * so it handles arbitrary nesting without a full HTML parser.
 *
 * @param {string}  html        Source HTML string
 * @param {string}  key         Translation key
 * @param {string}  content     Replacement content (already escaped if plain text)
 * @param {boolean} isHtml      When true: look for data-i18n-html; else data-i18n
 */
function replaceI18nContent(html, key, content, isHtml) {
    const attr = isHtml ? `data-i18n-html="${key}"` : `data-i18n="${key}"`;
    let result = html;
    let searchFrom = 0;

    while (true) {
        const attrIdx = result.indexOf(attr, searchFrom);
        if (attrIdx === -1) break;

        // Find the end of the opening tag
        const tagEnd = result.indexOf('>', attrIdx);
        if (tagEnd === -1) break;
        // Self-closing tags don't have inner content
        if (result[tagEnd - 1] === '/') { searchFrom = tagEnd + 1; continue; }

        // Extract the tag name by scanning backwards from attrIdx to '<'
        const tagStart = result.lastIndexOf('<', attrIdx);
        if (tagStart === -1) break;
        const tagNameMatch = result.substring(tagStart + 1, attrIdx).match(/^([a-zA-Z][a-zA-Z0-9-]*)/);
        if (!tagNameMatch) { searchFrom = tagEnd + 1; continue; }
        const tagName = tagNameMatch[1].toLowerCase();

        // Walk forward to find the matching closing tag, counting depth
        const closeTag  = `</${tagName}>`;
        const openPat   = `<${tagName}`;
        let depth       = 1;
        let pos         = tagEnd + 1;
        let closePos    = -1;

        while (depth > 0) {
            const nextOpen  = result.indexOf(openPat,  pos);
            const nextClose = result.indexOf(closeTag, pos);
            if (nextClose === -1) break;

            if (nextOpen !== -1 && nextOpen < nextClose) {
                // Verify it's actually a tag boundary (not a prefix of another tag name)
                const ch = result[nextOpen + openPat.length];
                if (ch === ' ' || ch === '>' || ch === '\n' || ch === '\t' || ch === '/' || ch === '\r') {
                    depth++;
                }
                pos = nextOpen + 1;
            } else {
                depth--;
                if (depth === 0) {
                    closePos = nextClose;
                } else {
                    pos = nextClose + closeTag.length;
                }
            }
        }

        if (closePos === -1) { searchFrom = tagEnd + 1; continue; }

        result   = result.substring(0, tagEnd + 1) + content + result.substring(closePos);
        searchFrom = tagEnd + 1 + content.length;
    }

    return result;
}

/**
 * Update every title="…" attribute on elements that carry data-i18n-title="key".
 */
function replaceI18nTitle(html, key, translatedText) {
    const attr = `data-i18n-title="${key}"`;
    let result = html;
    let searchFrom = 0;

    while (true) {
        const attrIdx = result.indexOf(attr, searchFrom);
        if (attrIdx === -1) break;

        const tagStart = result.lastIndexOf('<', attrIdx);
        const tagEnd   = result.indexOf('>', attrIdx);
        if (tagStart === -1 || tagEnd === -1) break;

        const openTag    = result.substring(tagStart, tagEnd + 1);
        const newOpenTag = openTag.replace(/title="[^"]*"/, `title="${escapeHtml(translatedText)}"`);
        result     = result.substring(0, tagStart) + newOpenTag + result.substring(tagEnd + 1);
        searchFrom = tagStart + newOpenTag.length;
    }

    return result;
}

/** Apply all translation keys to data-i18n* attributes in the HTML. */
function applyTranslations(html, locale) {
    const tr = translations[locale];
    if (!tr) return html;

    const year = String(new Date().getFullYear());

    for (const [key, raw] of Object.entries(tr)) {
        if (typeof raw !== 'string') continue;
        const value = raw.replace(/\{year\}/g, year);

        // Plain-text replacement (data-i18n)
        html = replaceI18nContent(html, key, escapeHtml(value), false);
        // HTML replacement (data-i18n-html) – insert raw translated markup
        html = replaceI18nContent(html, key, value, true);
        // Title-attribute replacement (data-i18n-title)
        html = replaceI18nTitle(html, key, value);
    }

    return html;
}

// ---------------------------------------------------------------------------
// Locale init script
// ---------------------------------------------------------------------------

/**
 * Inject an inline <script> immediately after <body …> that sets the locale
 * in localStorage *before* translations.js runs.  This eliminates the flash
 * of untranslated content (FOUC) on locale pages.
 */
function injectLangInitScript(html, locale) {
    const script = `    <script>(function(){try{localStorage.setItem('gittree-language','${locale}');}catch(e){}})()</script>`;
    return html.replace(/(<body\b[^>]*>)/i, `$1\n${script}`);
}

// ---------------------------------------------------------------------------
// Page processor
// ---------------------------------------------------------------------------

/**
 * Transform a source HTML page into a locale-specific copy.
 *
 * @param {string} sourceHtml  Raw HTML of the source page
 * @param {string} locale      Target locale code (e.g. 'ja')
 * @param {string} page        Filename (e.g. 'index.html')
 * @returns {string}           Transformed HTML ready to write to disk
 */
function processPage(sourceHtml, locale, page) {
    const tr = translations[locale] || translations.en;
    let html = sourceHtml;

    const pageTitle  = tr.pageTitle  || translations.en.pageTitle;
    const pageDesc   = tr.metaDescription || translations.en.metaDescription;
    const pageKw     = tr.metaKeywords    || translations.en.metaKeywords;
    const canonicalUrl = getLocaleUrl(locale, page);

    // 1. html lang attribute
    html = updateHtmlLang(html, locale);

    // 2. <title> text (the data-i18n replacement in step 10 will refine it
    //    for institutional pages that use a page-specific title key)
    html = updateTitleContent(html, pageTitle);

    // 3. meta description
    html = updateMetaContent(html, 'name="description"', pageDesc);

    // 4. meta keywords (update existing or insert after description)
    if (/<meta[^>]*name="keywords"[^>]*>/i.test(html)) {
        html = updateMetaContent(html, 'name="keywords"', pageKw);
    } else {
        html = html.replace(
            /(<meta[^>]*name="description"[^>]*>)/i,
            `$1\n    <meta name="keywords" content="${pageKw.replace(/"/g, '&quot;')}">`
        );
    }

    // 5. canonical URL
    html = updateCanonical(html, canonicalUrl);

    // 6. OG / Twitter URL, title, description, locale
    html = updateMetaContent(html, 'property="og:url"',          canonicalUrl);
    html = updateMetaContent(html, 'property="twitter:url"',     canonicalUrl);
    html = updateMetaContent(html, 'property="og:title"',        pageTitle);
    html = updateMetaContent(html, 'property="og:description"',  pageDesc);
    html = updateMetaContent(html, 'property="twitter:title"',   pageTitle);
    html = updateMetaContent(html, 'property="twitter:description"', pageDesc);
    html = updateOgLocales(html, locale);

    // 7. hreflang links
    html = removeHreflangLinks(html);
    html = injectHreflangLinks(html, page);

    // 8. Fix relative asset paths (CSS, JS, etc.) for sub-directory placement
    html = fixAssetPaths(html);

    // 9. Fix root navigation link
    html = fixRootLinks(html, locale);

    // 10. Replace all data-i18n* element content with translated text
    html = applyTranslations(html, locale);

    // 11. Inject early language init script (prevents FOUC)
    html = injectLangInitScript(html, locale);

    // 12. Update the langIcon sigla span to match the locale
    html = html.replace(
        /(<span\b[^>]*\bid="langIcon"[^>]*>)[^<]*(<\/span>)/,
        `$1${locale.toUpperCase()}$2`
    );

    return html;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
    let totalPages = 0;

    for (const locale of LOCALES) {
        const localeDir = path.join(ROOT_DIR, locale);

        if (!fs.existsSync(localeDir)) {
            fs.mkdirSync(localeDir, { recursive: true });
            console.log(`📁 Created: ${locale}/`);
        }

        let pagesGenerated = 0;

        for (const page of PAGES) {
            const sourcePath = path.join(ROOT_DIR, page);
            if (!fs.existsSync(sourcePath)) {
                console.warn(`⚠️  Skipping ${page} (not found)`);
                continue;
            }

            const sourceHtml   = fs.readFileSync(sourcePath, 'utf8');
            const processedHtml = processPage(sourceHtml, locale, page);
            const outputPath   = path.join(localeDir, page);

            fs.writeFileSync(outputPath, processedHtml, 'utf8');
            console.log(`   ✅ ${locale}/${page}`);
            pagesGenerated++;
            totalPages++;
        }

        console.log(`🌍 ${languageNames[locale]} (${locale}): ${pagesGenerated} pages\n`);
    }

    console.log(`✅ Done! Generated ${totalPages} locale pages across ${LOCALES.length} languages.`);
}

if (require.main === module) {
    main();
}

module.exports = { processPage, buildHreflangLinks, getLocaleUrl, LOCALES, PAGES };

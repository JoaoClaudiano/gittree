#!/usr/bin/env node

/**
 * Gerador Automático de Sitemap.xml
 * 
 * Este script escaneia o diretório do projeto e gera automaticamente
 * o sitemap.xml com todas as páginas HTML encontradas.
 */

const fs = require('fs');
const path = require('path');

// Configurações
const BASE_URL = 'https://gittree.pages.dev';
const OUTPUT_FILE = 'sitemap.xml';
const ROOT_DIR = '.';

// Locales suportados (prefixo de diretório → código hreflang)
const LOCALES = {
    '': 'en',       // raiz = inglês / default
    'pt': 'pt',
    'es': 'es',
    'fr': 'fr',
    'it': 'it',
    'ja': 'ja',
    'ko': 'ko',
    'zh': 'zh'
};

// Arquivos e diretórios a serem ignorados
const IGNORE_PATTERNS = [
    'node_modules',
    '.git',
    '.github',
    'scripts',
    'docs',
    '404.html',
    'google8df277a1c3c466cf.html'
];

// Prioridades baseadas no tipo de página
const PRIORITIES = {
    'index.html': { priority: 1.0, changefreq: 'daily' },
    'sobre.html': { priority: 0.9, changefreq: 'monthly' },
    'guia.html': { priority: 0.8, changefreq: 'monthly' },
    'politica-de-privacidade.html': { priority: 0.7, changefreq: 'yearly' },
    'termos.html': { priority: 0.7, changefreq: 'yearly' },
    'contato.html': { priority: 0.6, changefreq: 'yearly' },
    'default': { priority: 0.5, changefreq: 'monthly' }
};

/**
 * Verifica se um caminho deve ser ignorado
 */
function shouldIgnore(filePath) {
    return IGNORE_PATTERNS.some(pattern => filePath.includes(pattern));
}

/**
 * Busca recursivamente por arquivos HTML
 */
function findHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (shouldIgnore(filePath)) {
            return;
        }

        if (stat.isDirectory()) {
            findHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });

    return fileList;
}

/**
 * Gera a URL pública a partir do caminho do arquivo
 */
function generateUrl(filePath) {
    // Remove './' do início e converte para URL
    let url = filePath.replace(/^\.\//, '');
    
    // Se for index.html na raiz, usa apenas a base URL
    if (url === 'index.html') {
        return BASE_URL + '/';
    }

    // Se for index.html em subdiretório de locale, usa URL com trailing slash
    if (/^[a-z]{2}\/index\.html$/.test(url)) {
        return BASE_URL + '/' + url.replace('index.html', '');
    }
    
    return BASE_URL + '/' + url;
}

/**
 * Retorna todas as variantes hreflang para uma página (ex: "index.html")
 */
function buildHreflangLinks(filename) {
    return Object.entries(LOCALES).map(([prefix, lang]) => {
        let href;
        if (filename === 'index.html') {
            href = prefix === '' ? `${BASE_URL}/` : `${BASE_URL}/${prefix}/`;
        } else {
            href = prefix === '' ? `${BASE_URL}/${filename}` : `${BASE_URL}/${prefix}/${filename}`;
        }
        return { lang, href };
    });
}

/**
 * Obtém a prioridade e frequência de mudança para uma página
 */
function getPageInfo(filename) {
    return PRIORITIES[filename] || PRIORITIES['default'];
}

/**
 * Gera o conteúdo XML do sitemap
 */
function generateSitemap(htmlFiles) {
    const now = new Date().toISOString().split('T')[0];
    
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"\n';
    xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n';
    xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n';
    xml += '        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';

    // Ordena os arquivos para que index.html da raiz venha primeiro
    htmlFiles.sort((a, b) => {
        const aIsRoot = (a === './index.html' || a === 'index.html');
        const bIsRoot = (b === './index.html' || b === 'index.html');
        if (aIsRoot) return -1;
        if (bIsRoot) return 1;
        return a.localeCompare(b);
    });

    htmlFiles.forEach(filePath => {
        const filename = path.basename(filePath);
        const url = generateUrl(filePath);
        const pageInfo = getPageInfo(filename);
        const hreflangLinks = buildHreflangLinks(filename);

        xml += '    <url>\n';
        xml += `        <loc>${url}</loc>\n`;
        xml += `        <lastmod>${now}</lastmod>\n`;
        xml += `        <changefreq>${pageInfo.changefreq}</changefreq>\n`;
        xml += `        <priority>${pageInfo.priority}</priority>\n`;
        // x-default points to the root (English) version
        xml += `        <xhtml:link rel="alternate" hreflang="x-default" href="${hreflangLinks.find(l => l.lang === 'en').href}"/>\n`;
        hreflangLinks.forEach(({ lang, href }) => {
            xml += `        <xhtml:link rel="alternate" hreflang="${lang}" href="${href}"/>\n`;
        });
        xml += '    </url>\n';
    });

    xml += '</urlset>\n';

    return xml;
}

/**
 * Função principal
 */
function main() {
    try {
        console.log('🔍 Buscando arquivos HTML...');
        const htmlFiles = findHtmlFiles(ROOT_DIR);
        
        console.log(`📄 Encontrados ${htmlFiles.length} arquivos HTML`);
        htmlFiles.forEach(file => console.log(`   - ${file}`));

        console.log('\n📝 Gerando sitemap.xml...');
        const sitemapContent = generateSitemap(htmlFiles);

        fs.writeFileSync(OUTPUT_FILE, sitemapContent, 'utf8');
        
        console.log(`✅ Sitemap gerado com sucesso: ${OUTPUT_FILE}`);
        console.log(`📊 Total de URLs: ${htmlFiles.length}`);
        console.log(`🌐 Base URL: ${BASE_URL}`);
        
    } catch (error) {
        console.error('❌ Erro ao gerar sitemap:', error.message);
        process.exit(1);
    }
}

// Executa o script
if (require.main === module) {
    main();
}

module.exports = { findHtmlFiles, generateSitemap, generateUrl };

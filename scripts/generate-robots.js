#!/usr/bin/env node

/**
 * Gerador Automático de robots.txt
 * 
 * Este script gera automaticamente um arquivo robots.txt robusto
 * com configurações otimizadas para SEO.
 */

const fs = require('fs');

// Configurações
const BASE_URL = 'https://gittree.pages.dev';
const OUTPUT_FILE = 'robots.txt';

/**
 * Gera o conteúdo do robots.txt
 */
function generateRobotsTxt() {
    let content = '';
    
    // Cabeçalho
    content += '# robots.txt para GitTree\n';
    content += '# Gerado automaticamente\n';
    content += `# ${new Date().toISOString()}\n\n`;
    
    // Configuração padrão para todos os bots
    content += '# Configuração padrão\n';
    content += 'User-agent: *\n';
    content += 'Allow: /\n\n';
    
    // Bloquear áreas administrativas e privadas
    content += '# Áreas administrativas e privadas\n';
    content += 'Disallow: /admin/\n';
    content += 'Disallow: /private/\n';
    content += 'Disallow: /.git/\n';
    content += 'Disallow: /node_modules/\n';
    content += 'Disallow: /scripts/\n\n';
    
    // Bloquear arquivos técnicos
    content += '# Arquivos técnicos (wildcards)\n';
    content += 'Disallow: *.json\n';
    content += 'Disallow: *.js.map\n';
    content += 'Disallow: *.css.map\n';
    content += 'Disallow: *_config.yml\n\n';
    
    // Bloquear arquivos específicos
    content += '# Arquivos específicos\n';
    content += 'Disallow: /google*.html\n';
    content += 'Disallow: /404.html\n\n';
    
    // Permitir recursos importantes
    content += '# Permitir recursos importantes\n';
    content += 'Allow: /icons/\n';
    content += 'Allow: /*.css$\n';
    content += 'Allow: /*.js$\n';
    content += 'Allow: /manifest.json\n\n';
    
    // Configurações específicas por crawler
    content += '# Googlebot\n';
    content += 'User-agent: Googlebot\n';
    content += 'Allow: /\n';
    content += 'Crawl-delay: 0\n\n';
    
    content += '# Bingbot\n';
    content += 'User-agent: Bingbot\n';
    content += 'Allow: /\n';
    content += 'Crawl-delay: 0\n\n';
    
    content += '# DuckDuckBot\n';
    content += 'User-agent: DuckDuckBot\n';
    content += 'Allow: /\n\n';
    
    content += '# Slurp (Yahoo)\n';
    content += 'User-agent: Slurp\n';
    content += 'Allow: /\n\n';
    
    content += '# Baiduspider\n';
    content += 'User-agent: Baiduspider\n';
    content += 'Allow: /\n\n';
    
    content += '# YandexBot\n';
    content += 'User-agent: YandexBot\n';
    content += 'Allow: /\n\n';
    
    // Bloquear bots maliciosos conhecidos
    content += '# Bloquear bots maliciosos\n';
    content += 'User-agent: AhrefsBot\n';
    content += 'Disallow: /\n\n';
    
    content += 'User-agent: SemrushBot\n';
    content += 'Disallow: /\n\n';
    
    content += 'User-agent: MJ12bot\n';
    content += 'Disallow: /\n\n';
    
    content += 'User-agent: DotBot\n';
    content += 'Disallow: /\n\n';
    
    // Sitemap
    content += '# Sitemap\n';
    content += `Sitemap: ${BASE_URL}/sitemap.xml\n`;
    
    return content;
}

/**
 * Função principal
 */
function main() {
    try {
        console.log('📝 Gerando robots.txt...');
        
        const robotsContent = generateRobotsTxt();
        
        fs.writeFileSync(OUTPUT_FILE, robotsContent, 'utf8');
        
        console.log(`✅ robots.txt gerado com sucesso: ${OUTPUT_FILE}`);
        console.log(`🌐 Sitemap URL: ${BASE_URL}/sitemap.xml`);
        console.log('📋 Configurações incluídas:');
        console.log('   - Bloqueio de áreas administrativas');
        console.log('   - Bloqueio de arquivos técnicos');
        console.log('   - Configurações específicas por crawler');
        console.log('   - Bloqueio de bots maliciosos');
        
    } catch (error) {
        console.error('❌ Erro ao gerar robots.txt:', error.message);
        process.exit(1);
    }
}

// Executa o script
if (require.main === module) {
    main();
}

module.exports = { generateRobotsTxt };

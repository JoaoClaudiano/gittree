# Scripts de Automação - GitTree

Este diretório contém scripts Node.js para automação de tarefas relacionadas a SEO e deployment.

## 📁 Scripts Disponíveis

### 1. generate-sitemap.js

Gera automaticamente o arquivo `sitemap.xml` com todas as páginas HTML do projeto.

**Uso:**
```bash
npm run generate-sitemap
```

**Características:**
- Busca recursiva de arquivos HTML
- Ignora arquivos e diretórios desnecessários (node_modules, .git, etc.)
- Define prioridades automaticamente baseadas no tipo de página
- Gera URLs com namespace completo (news, images, video)
- Atualiza automaticamente a data de modificação

**Prioridades:**
- Homepage (index.html): 1.0 - daily
- Sobre (sobre.html): 0.9 - monthly
- Guia (guia.html): 0.8 - monthly
- Políticas (politica-de-privacidade.html, termos.html): 0.7 - yearly
- Contato (contato.html): 0.6 - yearly
- Outras páginas: 0.5 - monthly

---

### 2. generate-robots.js

Gera automaticamente o arquivo `robots.txt` com configurações otimizadas para SEO.

**Uso:**
```bash
npm run generate-robots
```

**Características:**
- Bloqueia áreas administrativas e privadas
- Bloqueia arquivos técnicos (.json, .js.map, .css.map)
- Permite recursos importantes (CSS, JS, ícones)
- Configurações específicas por crawler (Googlebot, Bingbot, etc.)
- Bloqueia bots maliciosos conhecidos (AhrefsBot, SemrushBot, etc.)
- Referência ao sitemap.xml

---

### 3. Geração Completa de SEO

Para gerar ambos os arquivos de uma vez:

```bash
npm run generate-seo
```

Este comando executa sequencialmente:
1. `generate-sitemap.js` - Gera sitemap.xml
2. `generate-robots.js` - Gera robots.txt

---

## 🔄 Integração com CI/CD

Os scripts são executados automaticamente pelo GitHub Actions no workflow de deploy:

```yaml
- name: Generate SEO files
  run: npm run generate-seo
```

Isso garante que os arquivos SEO estejam sempre atualizados a cada deploy.

---

## 🛠️ Desenvolvimento

### Modificando as Prioridades do Sitemap

Edite o objeto `PRIORITIES` em `generate-sitemap.js`:

```javascript
const PRIORITIES = {
    'index.html': { priority: 1.0, changefreq: 'daily' },
    'nova-pagina.html': { priority: 0.8, changefreq: 'weekly' },
    // ...
};
```

### Adicionando Exceções ao robots.txt

Modifique a função `generateRobotsTxt()` em `generate-robots.js` para adicionar novas regras.

### Ignorando Arquivos no Sitemap

Adicione padrões ao array `IGNORE_PATTERNS` em `generate-sitemap.js`:

```javascript
const IGNORE_PATTERNS = [
    'node_modules',
    '.git',
    'seu-padrao-aqui',
    // ...
];
```

---

## 📊 Saída dos Scripts

Ambos os scripts fornecem feedback detalhado no console:

**generate-sitemap.js:**
```
🔍 Buscando arquivos HTML...
📄 Encontrados 6 arquivos HTML
   - index.html
   - sobre.html
   - ...
📝 Gerando sitemap.xml...
✅ Sitemap gerado com sucesso: sitemap.xml
📊 Total de URLs: 6
🌐 Base URL: https://joaoclaudiano.github.io/gittree
```

**generate-robots.js:**
```
📝 Gerando robots.txt...
✅ robots.txt gerado com sucesso: robots.txt
🌐 Sitemap URL: https://joaoclaudiano.github.io/gittree/sitemap.xml
📋 Configurações incluídas:
   - Bloqueio de áreas administrativas
   - Bloqueio de arquivos técnicos
   - Configurações específicas por crawler
   - Bloqueio de bots maliciosos
```

---

## 🧪 Testando os Scripts

Para testar manualmente:

```bash
# Testar geração de sitemap
node scripts/generate-sitemap.js

# Testar geração de robots.txt
node scripts/generate-robots.js

# Verificar arquivos gerados
cat sitemap.xml
cat robots.txt
```

---

## 📝 Notas

- Os scripts usam apenas módulos nativos do Node.js (fs, path)
- Não há dependências externas necessárias
- Os arquivos gerados são sobrescritos a cada execução
- Formato UTF-8 é usado para todos os arquivos gerados

---

## 🔗 Recursos Relacionados

- [Sitemap Protocol](https://www.sitemaps.org/protocol.html)
- [robots.txt Specification](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [Google Search Console](https://search.google.com/search-console)

---

**Última atualização:** 06 de Fevereiro de 2026

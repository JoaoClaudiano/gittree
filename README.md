# 🌳 GitTree - Visualizador de Estrutura GitHub

---

**Uma ferramenta interativa para explorar e analisar a estrutura de repositórios GitHub de forma visual e intuitiva.**

[![Status](https://img.shields.io/badge/status-ativo-brightgreen)]()
[![Versão](https://img.shields.io/badge/versão-1.0-blue)]()
[![Licença](https://img.shields.io/badge/licença-MIT-green)]()

---

## 📋 Índice

- [O que esta versão faz?](#-o-que-esta-versão-faz)
- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Demonstração](#-demonstração)
- [Como Usar](#-como-usar)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Guias de Implementação](#-guias-de-implementação)
- [API GitHub](#-api-github)
- [Cache Local](#-cache-local)
- [Exportação](#-exportação)
- [Privacidade](#-privacidade)
- [Changelog](#-changelog)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)
- [Contato](#-contato)

---

## 📦 O que esta versão faz?

### Versão 1.0.0 - Lançamento Inicial (Fevereiro 2026)

Esta é a **primeira versão estável** do GitTree, trazendo uma solução completa para visualização e análise de repositórios GitHub.

#### 🎯 Principais Capacidades

**Visualização Inteligente:**
- Árvore interativa completa de arquivos e diretórios
- Skeleton loader com animação durante carregamento
- Expansão/colapso individual ou em lote
- Busca em tempo real com filtros

**Análise Profunda:**
- Métricas completas do repositório (arquivos, tamanho, estrutura)
- Bento UI Metadata Panel com informações detalhadas de arquivos
- Estatísticas de GitHub (stars, forks, watchers)
- Distribuição por tipos de arquivo e linguagens
- Gráficos interativos de visualização

**Experiência Premium:**
- Tema Deep Charcoal 2026 com efeitos glassmorphism
- Design responsivo (desktop, tablet, mobile)
- Modo claro/escuro com persistência
- Navegação completa por teclado (WCAG 2.1 AA)
- Animações suaves e modernas

**Recursos Avançados:**
- Cache local (24 horas) para acesso rápido
- Exportação em JSON e CSV
- Sistema de destacamento de arquivos importantes
- Histórico de repositórios analisados
- Correção automática de URLs do GitHub

**Performance e Acessibilidade:**
- Zero Layout Shift (CLS otimizado)
- Suporte completo a leitores de tela
- Navegação por teclado em todos os componentes
- Indicadores de foco visíveis
- Carregamento progressivo com skeleton

#### 📊 Casos de Uso

✅ **Desenvolvedores**: Explore estruturas de projetos open-source  
✅ **Tech Leads**: Analise arquitetura de código  
✅ **Estudantes**: Aprenda com projetos reais  
✅ **Documentadores**: Gere visões gerais de repositórios  
✅ **Code Reviewers**: Entenda mudanças estruturais

#### 🚀 Acesse Agora

**[GitTree Online - Versão 1.0.0](https://joaoclaudiano.github.io/gittree/)**

Para ver o histórico completo de mudanças, consulte o [**CHANGELOG.md**](docs/CHANGELOG.md).

---

## 🎯 Visão Geral

O GitTree é uma aplicação web que permite visualizar a estrutura completa de qualquer repositório público do GitHub. Transforme listas de arquivos em uma árvore interativa, obtenha métricas detalhadas e exporte os dados para análise posterior.

**Ideal para:**
- Entender a organização de projetos open-source
- Analisar a estrutura de dependências
- Documentar arquitetura de software
- Onboarding em novos projetos

---

## ✨ Funcionalidades

### 🌳 Visualização em Árvore
- Estrutura hierárquica de pastas e arquivos
- Expansão/colapso de diretórios
- Ícones específicos por tipo de arquivo
- Informações de tamanho para cada arquivo
- Busca em tempo real na árvore

### 📊 Análise de Métricas
- Contagem de arquivos e pastas
- Tamanho total do repositório
- Distribuição por tipos de arquivo
- Estatísticas de estrelas, forks e watchers
- Visualização em cards e gráficos

### 🎨 Interface Intuitiva
- Tema claro/escuro (salvo automaticamente)
- Design responsivo (mobile/desktop)
- Navegação por abas (Árvore/Métricas)
- Feedback visual em tempo real
- Animações suaves e transições

### 💾 Recursos Avançados
- **Cache local** - Armazena análises para acesso rápido
- **Exportação** - JSON e CSV com dados completos
- **Busca inteligente** - Sugestões de repositórios populares
- **Correção automática** - Detecta e corrige nomes de repositórios
- **Histórico** - Lembra último repositório analisado

---

## 🚀 Demonstração

**Teste agora:** [GitTree Online](https://joaoclaudiano.github.io/gittree/) 

**Exemplos para testar:**

- `JoaoClaudiano/geocsv`

## 📖 Como Usar

### 1. Acesso Rápido
1. Acesse a página principal (`index.html`)
2. Cole uma URL do GitHub ou digite `usuário/repositório`
3. Clique em **"Visualizar"** ou pressione **Enter**

### 2. Formatos Aceitos
```
usuario/repositorio
https://github.com/usuario/repositorio
https://github.com/usuario/repositorio.git
```
---

### 3. Navegação na Árvore
- **Clique em pastas** para expandir/recolher
- **Use a busca** para encontrar arquivos específicos
- **Botões Expandir/Recolher** para controlar toda a árvore
- **Passe o mouse** para ver detalhes dos arquivos

---

### 4. Exportação de Dados
- **JSON** - Estrutura completa para análise programática
- **CSV** - Tabela simplificada para planilhas
- Os downloads começam automaticamente após processamento

---

## 🛠️ Tecnologias

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Ícones:** Font Awesome 6
- **Fontes:** Google Fonts (Inter)
- **API:** GitHub REST API v3
- **Armazenamento:** LocalStorage (cache)
- **Design:** CSS Custom Properties (variáveis)
- **Responsividade:** Media Queries CSS

## 📁 Estrutura do Projeto

```
gittree/
├── 📄 index.html              # Página principal
├── 📄 main.js                 # Lógica principal da aplicação
├── 📄 style.css               # Estilos principais
├── 📄 utils.js                # Funções utilitárias
├── 📄 github-api.js           # Integração com API GitHub
├── 📄 components.js           # Componentes React (se aplicável)
├── 📄 _config.yml             # Configuração Jekyll (se aplicável)
├── 📄 README.md               # Este arquivo
│
├── 📄 politica-de-privacidade.html
├── 📄 termos.html
├── 📄 contato.html
├── 📄 guia.html
│
└── 📁 artigos/                # Artigos técnicos (se aplicável)
```

## 📖 Guias de Implementação

Este projeto serve como referência de arquitetura e SEO técnico. Consulte nossos guias:

### 🏗️ [Implementation Guide (Completo)](./docs/IMPLEMENTATION-GUIDE.md)
Guia detalhado com:
- Arquitetura modular e padrões de design
- Configuração completa de SEO (robots.txt, sitemap, meta tags)
- Componentes reutilizáveis (skeleton loader, modals, sidebars)
- Middleware e scripts de automação
- PWA com Service Worker
- Performance e estratégias de cache
- Acessibilidade WCAG 2.1
- Analytics e monitoramento

### 🚀 [Quick Start Boilerplate](./docs/QUICK-START-BOILERPLATE.md)
Referência rápida com templates copy-paste:
- Setup básico em 5 minutos
- Templates HTML prontos para usar
- Componentes essenciais
- Checklist pré-deploy
- Scripts utilitários

**Use estes guias para:**
- ✅ Criar novos projetos com a mesma qualidade técnica
- ✅ Implementar SEO profissional
- ✅ Seguir melhores práticas de arquitetura
- ✅ Construir componentes reutilizáveis
- ✅ Otimizar performance e acessibilidade

## 🔌 API GitHub

O GitTree utiliza a API pública do GitHub com as seguintes requisições:

1. **Informações do repositório:**
   ```
   GET https://api.github.com/repos/{owner}/{repo}
   ```

2. **Estrutura da árvore:**
   ```
   GET https://api.github.com/repos/{owner}/{repo}/git/trees/{branch}?recursive=1
   ```

3. **Limites de uso:**
   - 60 requisições por hora (não autenticado)
   - Cache local reduz chamadas à API
   - Mensagens de erro claras para limites excedidos

## 💾 Cache Local

### Funcionalidades:
- Armazena análises por 24 horas
- Reduz chamadas à API
- Acelera acessos repetidos
- Estatísticas de uso visíveis
- Limpeza manual disponível

---

## 🔒 Privacidade

### Coleta de Dados
- **Não coletamos** dados pessoais
- **Não armazenamos** código analisado
- **Não rastreamos** usuários individualmente
- **Cache local** fica apenas no seu navegador

### Conformidade
- Lei Geral de Proteção de Dados (LGPD)
- Políticas do Google AdSense
- Consentimento explícito para cookies

**[Ver Política de Privacidade Completa](politica-de-privacidade.html)**

---

## 📝 Changelog

### Acompanhe as Mudanças

O GitTree mantém um registro detalhado de todas as alterações, melhorias e correções em cada versão. Consulte o [**CHANGELOG.md**](docs/CHANGELOG.md) para:

- ✨ **Novidades** adicionadas em cada versão
- 🔧 **Melhorias** implementadas
- 🐛 **Bugs** corrigidos
- 🔒 **Atualizações** de segurança
- 📋 **Roadmap** de próximas funcionalidades

**Versão Atual:** [1.0.0](docs/CHANGELOG.md) - Lançamento Inicial

---

## 🤝 Contribuindo

## Diretrizes
- Mantenha o código limpo e documentado
- Teste suas mudanças em diferentes navegadores
- Siga o padrão de código existente
- Atualize a documentação conforme necessário

---

## 📄 Licença

Este projeto está licenciado sob a **Licença MIT**. Veja o arquivo [LICENSE](LICENSE) para detalhes completos.

**Resumo da licença:**
- Uso comercial permitido
- Modificações permitidas
- Distribuição permitida
- Sem garantia
- Atribuição não obrigatória, mas apreciada

---

## 📞 Contato

**Desenvolvedor:** João Claudiano  
**Email:** gittree@proton.me  
**GitHub:** [@JoaoClaudiano](https://github.com/JoaoClaudiano)  

**Links Úteis:**
- [Issues](https://github.com/JoaoClaudiano/gittree/issues) - Reportar bugs
- [Contato](contato.html) - Página de contato

---

## 🌟 Agradecimentos

- Equipe do **GitHub** pela API excelente
- Comunidade **open-source** pelos exemplos
- **Font Awesome** pelos ícones incríveis
- **Google Fonts** pela fonte Inter

---

**Desenvolvido com ❤️ para a comunidade de desenvolvedores**

*Se este projeto foi útil para você, considere dar uma ⭐ no repositório!*

---

*Nota: Este projeto está em desenvolvimento ativo. Novas funcionalidades e melhorias são adicionadas regularmente.*

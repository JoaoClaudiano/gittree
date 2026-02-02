# 🌳 GitTree - Visualizador de Estrutura GitHub

---

**Uma ferramenta interativa para explorar e analisar a estrutura de repositórios GitHub de forma visual e intuitiva.**

[![Status](https://img.shields.io/badge/status-ativo-brightgreen)]()
[![Versão](https://img.shields.io/badge/versão-1.0-blue)]()
[![Licença](https://img.shields.io/badge/licença-MIT-green)]()

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Demonstração](#-demonstração)
- [Como Usar](#-como-usar)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [API GitHub](#-api-github)
- [Cache Local](#-cache-local)
- [Exportação](#-exportação)
- [Privacidade](#-privacidade)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)
- [Contato](#-contato)

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
**Email:** jooclaudiano@gmail.com  
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

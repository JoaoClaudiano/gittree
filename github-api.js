// ==================== ANÁLISE DE REPOSITÓRIO ====================
const fetchRepositoryData = async (owner, repo) => {
    console.log(`Buscando dados do repositório: ${owner}/${repo}`);
    
    try {
        // 1. Informações básicas do repositório
        const repoRes = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
            headers: { 
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'CodeCartographer/1.0'
            }
        });
        
        if (!repoRes.ok) {
            if (repoRes.status === 404) {
                throw new Error('Repositório não encontrado');
            }
            throw new Error(`GitHub API: ${repoRes.status} ${repoRes.statusText}`);
        }
        
        const repoData = await repoRes.json();
        console.log('Repositório encontrado:', repoData.name);
        
        // 2. Buscar estrutura de arquivos
        const branch = repoData.default_branch || 'main';
        const treeRes = await fetch(
            `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`, {
            headers: { 
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'CodeCartographer/1.0'
            }
        });
        
        if (!treeRes.ok) {
            if (treeRes.status === 403) {
                throw new Error('Limite de requisições excedido. Tente novamente mais tarde.');
            }
            throw new Error(`Erro ao buscar árvore: ${treeRes.status}`);
        }
        
        const treeData = await treeRes.json();
        
        if (!treeData.tree || treeData.tree.length === 0) {
            throw new Error('Repositório vazio ou sem arquivos visíveis');
        }
        
        // 3. Processar arquivos
        const files = treeData.tree
            .filter(item => item.type === 'blob')
            .map(item => {
                const extension = item.path.split('.').pop().toLowerCase();
                return {
                    ...item,
                    path: item.path,
                    extension: extension,
                    sizeKB: item.size ? Math.round(item.size / 1024 * 10) / 10 : 0,
                    language: getFileLanguage(item.path),
                    isCodeFile: ['js', 'jsx', 'ts', 'tsx', 'py', 'java', 'rb', 'php', 'go'].includes(extension)
                };
            })
            .filter(file => {
                const path = file.path.toLowerCase();
                // Filtrar pastas desnecessárias
                return !path.includes('node_modules') && 
                       !path.includes('dist') && 
                       !path.includes('build') &&
                       !path.includes('.git') &&
                       !path.startsWith('.') &&
                       !path.endsWith('.lock') &&
                       !path.endsWith('.log');
            });
        
        console.log(`${files.length} arquivos processados`);
        
        return {
            success: true,
            repoInfo: {
                name: repoData.name,
                description: repoData.description,
                stars: repoData.stargazers_count,
                forks: repoData.forks_count,
                language: repoData.language,
                owner: repoData.owner.login,
                default_branch: branch,
                url: repoData.html_url
            },
            files: files,
            stats: {
                totalFiles: files.length,
                codeFiles: files.filter(f => f.isCodeFile).length,
                totalSizeKB: files.reduce((sum, f) => sum + f.sizeKB, 0)
            }
        };
        
    } catch (error) {
        console.error('Erro no fetchRepositoryData:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

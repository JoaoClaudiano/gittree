// ==================== FUNÇÕES UTILITÁRIAS GLOBAIS ====================
const getFileIcon = (extension) => {
    const icons = {
        'js': 'JS', 'jsx': 'JSX',
        'ts': 'TS', 'tsx': 'TSX',
        'css': 'CSS', 'scss': 'SCSS', 'less': 'LESS',
        'json': '{}', 'md': 'MD',
        'html': 'HTML', 'vue': 'VUE',
        'svelte': 'SVL', 'py': 'PY',
        'java': 'JAVA', 'rb': 'RB',
        'php': 'PHP', 'go': 'GO',
        'rs': 'RUST', 'cpp': 'C++', 'c': 'C'
    };
    return icons[extension] || '📄';
};

const getFileLanguage = (path) => {
    const ext = path.split('.').pop().toLowerCase();
    const languages = {
        'js': 'JavaScript',
        'jsx': 'JavaScript (React)',
        'ts': 'TypeScript',
        'tsx': 'TypeScript (React)',
        'css': 'CSS',
        'scss': 'SCSS',
        'less': 'LESS',
        'json': 'JSON',
        'md': 'Markdown',
        'html': 'HTML',
        'vue': 'Vue.js',
        'svelte': 'Svelte',
        'py': 'Python',
        'java': 'Java',
        'rb': 'Ruby',
        'php': 'PHP',
        'go': 'Go',
        'rs': 'Rust',
        'cpp': 'C++',
        'c': 'C'
    };
    return languages[ext] || ext.toUpperCase();
};

// ==================== SISTEMA DE CACHE ====================
const CACHE_PREFIX = 'codemap_';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 horas

const cache = {
    set: (key, data, ttl = CACHE_TTL) => {
        try {
            const item = {
                data,
                expiry: Date.now() + ttl,
                timestamp: Date.now()
            };
            localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(item));
            console.log(`Cache salvo: ${key}`);
            return true;
        } catch (err) {
            console.error('Erro ao salvar cache:', err);
            return false;
        }
    },
    
    get: (key) => {
        try {
            const itemStr = localStorage.getItem(CACHE_PREFIX + key);
            if (!itemStr) return null;
            
            const item = JSON.parse(itemStr);
            if (Date.now() > item.expiry) {
                localStorage.removeItem(CACHE_PREFIX + key);
                console.log(`Cache expirado: ${key}`);
                return null;
            }
            
            console.log(`Cache carregado: ${key}`);
            return item.data;
        } catch (err) {
            console.error('Erro ao ler cache:', err);
            return null;
        }
    },
    
    remove: (key) => {
        localStorage.removeItem(CACHE_PREFIX + key);
        console.log(`Cache removido: ${key}`);
    },
    
    clear: () => {
        const keys = Object.keys(localStorage);
        let count = 0;
        keys.forEach(key => {
            if (key.startsWith(CACHE_PREFIX)) {
                localStorage.removeItem(key);
                count++;
            }
        });
        console.log(`Cache limpo: ${count} itens removidos`);
        return count;
    },
    
    getStats: () => {
        const keys = Object.keys(localStorage);
        const cacheKeys = keys.filter(key => key.startsWith(CACHE_PREFIX));
        const stats = {
            total: cacheKeys.length,
            size: 0,
            repos: []
        };
        
        cacheKeys.forEach(key => {
            try {
                const item = JSON.parse(localStorage.getItem(key));
                stats.size += JSON.stringify(item).length;
                if (item.data && item.data.repoInfo) {
                    stats.repos.push({
                        name: item.data.repoInfo.name,
                        owner: item.data.repoInfo.owner,
                        files: item.data.files ? item.data.files.length : 0,
                        timestamp: new Date(item.timestamp).toLocaleDateString()
                    });
                }
            } catch (e) {
                console.warn(`Item inválido no cache: ${key}`);
            }
        });
        
        stats.sizeKB = Math.round(stats.size / 1024 * 100) / 100;
        stats.sizeMB = Math.round(stats.sizeKB / 1024 * 100) / 100;
        return stats;
    }
};

// ==================== UTILITÁRIOS ====================
const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        background: ${type === 'success' ? '#10b981' : 
                     type === 'error' ? '#ef4444' : 
                     type === 'warning' ? '#f59e0b' : '#3b82f6'};
        color: white;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease;
        font-family: 'Inter', sans-serif;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 
                           type === 'error' ? 'exclamation-circle' : 
                           type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
};

// Função para exportar dados como JSON
const exportAsJSON = (data, filename) => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `${filename}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
};

// Função para exportar dados como TXT
const exportAsTXT = (data, filename) => {
    let txtContent = `CodeCartographer Analysis - ${filename}\n`;
    txtContent += `Generated: ${new Date().toLocaleString()}\n`;
    txtContent += '='.repeat(60) + '\n\n';
    
    if (data.repoInfo) {
        txtContent += `REPOSITORY: ${data.repoInfo.owner}/${data.repoInfo.name}\n`;
        txtContent += `Description: ${data.repoInfo.description || 'N/A'}\n`;
        txtContent += `Stars: ${data.repoInfo.stars} | Forks: ${data.repoInfo.forks}\n`;
        txtContent += `Language: ${data.repoInfo.language || 'Multiple'}\n`;
        txtContent += '='.repeat(60) + '\n\n';
    }
    
    if (data.files) {
        txtContent += `TOTAL FILES: ${data.files.length}\n\n`;
        txtContent += 'FILE LIST:\n';
        txtContent += '-'.repeat(60) + '\n';
        
        data.files.forEach((file, index) => {
            txtContent += `${index + 1}. ${file.path}\n`;
            txtContent += `   Type: ${file.language} | Size: ${file.sizeKB} KB\n`;
            txtContent += `   Extension: .${file.extension}\n`;
            txtContent += '-'.repeat(40) + '\n';
        });
    }
    
    const dataUri = 'data:text/plain;charset=utf-8,' + encodeURIComponent(txtContent);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `${filename}.txt`);
    linkElement.click();
};

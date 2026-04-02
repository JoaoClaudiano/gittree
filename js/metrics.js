// Metrics and chart functions

function getFileTypes(files) {
    const types = new Set();
    files.forEach(file => {
        const match = file.path.match(/\.([^.]+)$/);
        types.add(match ? match[1].toLowerCase() : t('noExtension'));
    });
    return Array.from(types).sort();
}

function updateMetrics(treeData) {
    const files = treeData.tree.filter(item => item.type === 'blob');
    const folders = treeData.tree.filter(item => item.type === 'tree');
    const totalSize = files.reduce((sum, file) => sum + (file.size || 0), 0);

    const metricsPreview = document.getElementById('metricsPreview');
    if (metricsPreview) {
        const grid = metricsPreview.querySelector('.metrics-grid');
        grid.innerHTML = `
            <div class="metric-card">
                <div class="metric-value">${files.length}</div>
                <div class="metric-label">${t('metricFiles')}</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${folders.length}</div>
                <div class="metric-label">${t('metricFolders')}</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${formatBytes(totalSize)}</div>
                <div class="metric-label">${t('metricSize')}</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${getFileTypes(files).length}</div>
                <div class="metric-label">${t('metricTypes')}</div>
            </div>
        `;
    }

    window.currentTreeData = treeData;

    if (document.querySelector('.view-btn[data-view="metrics"]')?.classList.contains('active')) {
        updateMetricsDisplay();
    }
}

function generateFileTypesChart(files) {
    const fileTypesChartEl = document.getElementById('fileTypesChart');
    if (!fileTypesChartEl) return;

    if (typeof Chart === 'undefined') {
        fileTypesChartEl.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 300px; color: var(--dark-subtext);">
                <i class="fas fa-chart-pie" style="font-size: 48px; opacity: 0.5; margin-bottom: 15px;"></i>
                <p>${t('chartUnavailable')}</p>
            </div>
        `;
        return;
    }

    if (window.fileChart instanceof Chart) {
        window.fileChart.destroy();
    }

    if (files.length === 0) {
        fileTypesChartEl.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 300px; color: var(--dark-subtext);">
                <i class="fas fa-chart-pie" style="font-size: 48px; opacity: 0.5; margin-bottom: 15px;"></i>
                <p>${t('chartNoFiles')}</p>
            </div>
        `;
        return;
    }

    const typeCounts = {};
    files.forEach(file => {
        const match = file.path.match(/\.([^.]+)$/);
        const type = match ? match[1].toUpperCase() : t('treeOther');
        typeCounts[type] = (typeCounts[type] || 0) + 1;
    });

    const sortedTypes = Object.entries(typeCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8);

    const labels = sortedTypes.map(([type]) => type);
    const data = sortedTypes.map(([, count]) => count);

    const colors = [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(6, 182, 212, 0.8)',
        'rgba(132, 204, 22, 0.8)'
    ];

    fileTypesChartEl.innerHTML = `
        <div style="position: relative; height: 300px; width: 100%;">
            <canvas id="fileDistributionChart"></canvas>
        </div>
    `;

    setTimeout(() => {
        const ctx = document.getElementById('fileDistributionChart').getContext('2d');

        window.fileChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors.slice(0, labels.length),
                    borderColor: colors.map(color => color.replace('0.8', '1')),
                    borderWidth: 2,
                    hoverOffset: 15
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            color: 'var(--dark-text)',
                            font: {
                                family: "'Inter', sans-serif",
                                size: 12
                            },
                            padding: 15,
                            usePointStyle: true
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        titleColor: 'var(--dark-text)',
                        bodyColor: 'var(--dark-subtext)',
                        borderColor: 'var(--dark-border)',
                        borderWidth: 1,
                        cornerRadius: 6,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                const value = context.raw;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = Math.round((value / total) * 100);
                                return `${context.label}: ${value} ${t('chartFilesUnit')} (${percentage}%)`;
                            }
                        }
                    }
                },
                cutout: '60%',
                animation: {
                    animateScale: true,
                    animateRotate: true,
                    duration: 1000
                }
            }
        });
    }, 100);
}

function updateMetricsDisplay() {
    if (!window.currentTreeData) {
        const fileTypesChart = document.getElementById('fileTypesChart');
        if (fileTypesChart) {
            fileTypesChart.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 300px; color: var(--dark-subtext);">
                    <i class="fas fa-chart-pie" style="font-size: 48px; opacity: 0.5; margin-bottom: 15px;"></i>
                    <p>${t('chartAnalyzePrompt')}</p>
                </div>
            `;
        }
        return;
    }

    const treeData = window.currentTreeData;
    const files = treeData.tree.filter(item => item.type === 'blob');
    const folders = treeData.tree.filter(item => item.type === 'tree');
    const totalSize = files.reduce((sum, file) => sum + (file.size || 0), 0);

    const fileTypes = getFileTypes(files);

    const statsDisplay = document.getElementById('statsDisplay');
    if (statsDisplay) {
        statsDisplay.innerHTML = `
            <div class="stats-grid">
                <div class="metric-card">
                    <div class="metric-value">${files.length}</div>
                    <div class="metric-label">${t('metricTotalFiles')}</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">${folders.length}</div>
                    <div class="metric-label">${t('metricTotalFolders')}</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">${formatBytes(totalSize)}</div>
                    <div class="metric-label">${t('metricTotalSize')}</div>
                </div>
                <div class="metric-card">
                    <div class="metric-value">${fileTypes.length}</div>
                    <div class="metric-label">${t('fileTypesTitle')}</div>
                </div>
            </div>
            ${fileTypes.length > 0 ? `
                <div style="margin-top: 20px; text-align: left; width: 100%;">
                    <h5 style="color: var(--dark-subtext); margin-bottom: 10px;">${t('fileTypesTitle')}:</h5>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${fileTypes.map(type => `
                            <span style="background: rgba(16, 185, 129, 0.1); color: var(--primary);
                                  padding: 4px 12px; border-radius: 20px; font-size: 12px;">
                                ${type}
                            </span>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        `;
    }

    generateFileTypesChart(files);
}

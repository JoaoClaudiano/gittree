// Metrics and chart functions

function setChartPlaceholder(container, message) {
    container.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'display: flex; flex-direction: column; align-items: center; justify-content: center; height: 300px; color: var(--dark-subtext);';
    const icon = document.createElement('i');
    icon.className = 'fas fa-chart-pie';
    icon.style.cssText = 'font-size: 48px; opacity: 0.5; margin-bottom: 15px;';
    const p = document.createElement('p');
    p.textContent = message;
    wrapper.appendChild(icon);
    wrapper.appendChild(p);
    container.appendChild(wrapper);
}

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
        grid.innerHTML = '';
        const cards = [
            { value: files.length,             label: t('metricFiles') },
            { value: folders.length,           label: t('metricFolders') },
            { value: formatBytes(totalSize),   label: t('metricSize') },
            { value: getFileTypes(files).length, label: t('metricTypes') }
        ];
        cards.forEach(function (card) {
            const div = document.createElement('div');
            div.className = 'metric-card';
            const valDiv = document.createElement('div');
            valDiv.className = 'metric-value';
            valDiv.textContent = card.value;
            const lblDiv = document.createElement('div');
            lblDiv.className = 'metric-label';
            lblDiv.textContent = card.label;
            div.appendChild(valDiv);
            div.appendChild(lblDiv);
            grid.appendChild(div);
        });
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
        setChartPlaceholder(fileTypesChartEl, t('chartUnavailable'));
        return;
    }

    if (window.fileChart instanceof Chart) {
        window.fileChart.destroy();
    }

    if (files.length === 0) {
        setChartPlaceholder(fileTypesChartEl, t('chartNoFiles'));
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

    fileTypesChartEl.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'position: relative; height: 300px; width: 100%;';
    const canvas = document.createElement('canvas');
    canvas.id = 'fileDistributionChart';
    wrapper.appendChild(canvas);
    fileTypesChartEl.appendChild(wrapper);

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
            setChartPlaceholder(fileTypesChart, t('chartAnalyzePrompt'));
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
        statsDisplay.innerHTML = '';

        const statsGrid = document.createElement('div');
        statsGrid.className = 'stats-grid';

        const cards = [
            { value: files.length,           label: t('metricTotalFiles') },
            { value: folders.length,         label: t('metricTotalFolders') },
            { value: formatBytes(totalSize), label: t('metricTotalSize') },
            { value: fileTypes.length,       label: t('fileTypesTitle') }
        ];
        cards.forEach(function (card) {
            const div = document.createElement('div');
            div.className = 'metric-card';
            const valDiv = document.createElement('div');
            valDiv.className = 'metric-value';
            valDiv.textContent = card.value;
            const lblDiv = document.createElement('div');
            lblDiv.className = 'metric-label';
            lblDiv.textContent = card.label;
            div.appendChild(valDiv);
            div.appendChild(lblDiv);
            statsGrid.appendChild(div);
        });
        statsDisplay.appendChild(statsGrid);

        if (fileTypes.length > 0) {
            const section = document.createElement('div');
            section.style.cssText = 'margin-top: 20px; text-align: left; width: 100%;';

            const heading = document.createElement('h5');
            heading.style.cssText = 'color: var(--dark-subtext); margin-bottom: 10px;';
            heading.textContent = t('fileTypesTitle') + ':';
            section.appendChild(heading);

            const badgesRow = document.createElement('div');
            badgesRow.style.cssText = 'display: flex; flex-wrap: wrap; gap: 8px;';
            fileTypes.forEach(function (type) {
                const badge = document.createElement('span');
                badge.style.cssText = 'background: rgba(16, 185, 129, 0.1); color: var(--primary); padding: 4px 12px; border-radius: 20px; font-size: 12px;';
                badge.textContent = type;
                badgesRow.appendChild(badge);
            });
            section.appendChild(badgesRow);
            statsDisplay.appendChild(section);
        }
    }

    generateFileTypesChart(files);
}

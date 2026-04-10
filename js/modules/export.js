// Export functions – JSON and CSV download

function exportData(format) {
    if (!window.currentTreeData) {
        showStatus(t('statusNoData'), 'warning');
        return;
    }

    showStatus(t('statusExporting', { format: format.toUpperCase() }), 'info');

    setTimeout(() => {
        if (typeof showToast === 'function') showToast(t('statusExported'), 'success');
        else showStatus(t('statusExported'), 'success');

        const dataStr = format === 'json'
            ? JSON.stringify(window.currentTreeData, null, 2)
            : convertToCSV(window.currentTreeData);

        const dataBlob = new Blob([dataStr], { type: format === 'json' ? 'application/json' : 'text/csv' });
        const url = URL.createObjectURL(dataBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `gittree-export-${Date.now()}.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 1000);
}

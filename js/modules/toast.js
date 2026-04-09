// Toast notification system – non-intrusive pop-up messages

(function () {
    /**
     * Show a toast notification.
     * @param {string} message  - Text to display
     * @param {string} [type]   - 'success' | 'error' | 'warning' | 'info'  (default: 'info')
     * @param {number} [duration] - Auto-dismiss delay in ms (default: 3500; 0 = sticky)
     */
    function showToast(message, type, duration) {
        if (!message) return;
        type     = ['success', 'error', 'warning', 'info'].includes(type) ? type : 'info';
        duration = (duration === undefined) ? 3500 : duration;

        var container = _getContainer();

        var toast = document.createElement('div');
        toast.className = 'gt-toast gt-toast--' + type;
        toast.setAttribute('role', type === 'error' ? 'alert' : 'status');
        toast.setAttribute('aria-live', 'polite');

        var icons = {
            success: '<i class="fas fa-check-circle" aria-hidden="true"></i>',
            error:   '<i class="fas fa-exclamation-circle" aria-hidden="true"></i>',
            warning: '<i class="fas fa-exclamation-triangle" aria-hidden="true"></i>',
            info:    '<i class="fas fa-info-circle" aria-hidden="true"></i>'
        };

        var iconEl = document.createElement('span');
        iconEl.className = 'gt-toast__icon';
        iconEl.innerHTML = icons[type];

        var msgEl = document.createElement('span');
        msgEl.className = 'gt-toast__msg';
        msgEl.textContent = message;

        var closeBtn = document.createElement('button');
        closeBtn.className = 'gt-toast__close';
        closeBtn.setAttribute('aria-label', 'Dismiss notification');
        closeBtn.innerHTML = '<i class="fas fa-times" aria-hidden="true"></i>';
        closeBtn.addEventListener('click', function () { _dismiss(toast); });

        toast.appendChild(iconEl);
        toast.appendChild(msgEl);
        toast.appendChild(closeBtn);
        container.appendChild(toast);

        // Trigger enter animation on next frame
        requestAnimationFrame(function () {
            requestAnimationFrame(function () {
                toast.classList.add('gt-toast--visible');
            });
        });

        if (duration > 0) {
            setTimeout(function () { _dismiss(toast); }, duration);
        }

        return toast;
    }

    function _dismiss(toast) {
        if (!toast || toast.classList.contains('gt-toast--leaving')) return;
        toast.classList.remove('gt-toast--visible');
        toast.classList.add('gt-toast--leaving');
        toast.addEventListener('transitionend', function handler() {
            toast.removeEventListener('transitionend', handler);
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        });
    }

    function _getContainer() {
        var c = document.getElementById('gt-toast-container');
        if (!c) {
            c = document.createElement('div');
            c.id = 'gt-toast-container';
            c.className = 'gt-toast-container';
            c.setAttribute('aria-label', 'Notifications');
            document.body.appendChild(c);
        }
        return c;
    }

    window.showToast = showToast;
}());

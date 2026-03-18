// Make windows draggable by their title bar
document.addEventListener('DOMContentLoaded', function() {
    const windows = document.querySelectorAll('.window');

    windows.forEach(windowElement => {
        const titleBar = windowElement.querySelector('.title-bar');
        if (!titleBar) return;

        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        // Center the window initially (for main window) or when it becomes visible (for dialogs)
        if (windowElement.classList.contains('main-window')) {
            centerWindow(windowElement);
        }

        // For dialogs that appear via :target, center them when they become visible
        if (windowElement.id === 'exit-dialog') {
            // Center on initial load if hash matches
            if (window.location.hash === '#exit-dialog') {
                setTimeout(() => centerWindow(windowElement), 10);
            }

            // Use MutationObserver to detect when dialog is shown
            const observer = new MutationObserver(() => {
                if (window.location.hash === '#exit-dialog' && windowElement.offsetParent !== null) {
                    centerWindow(windowElement);
                }
            });
            observer.observe(windowElement, { attributes: true, attributeFilter: ['style'] });

            // Also check on hash change
            window.addEventListener('hashchange', () => {
                if (window.location.hash === '#exit-dialog') {
                    setTimeout(() => centerWindow(windowElement), 10);
                }
            });
        }

        titleBar.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        // Touch support for mobile
        titleBar.addEventListener('touchstart', dragStart);
        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', dragEnd);

        function centerWindow(element) {
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const elementWidth = element.offsetWidth;
            const elementHeight = element.offsetHeight;

            xOffset = (windowWidth - elementWidth) / 2;
            yOffset = (windowHeight - elementHeight) / 2;

            // Ensure it's not off-screen
            xOffset = Math.max(0, xOffset);
            yOffset = Math.max(0, yOffset);

            setTranslate(xOffset, yOffset, element);
        }

        function dragStart(e) {
            // Don't drag if clicking on buttons
            if (e.target.closest('button')) return;

            if (e.type === 'touchstart') {
                initialX = e.touches[0].clientX - xOffset;
                initialY = e.touches[0].clientY - yOffset;
            } else {
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
            }

            isDragging = true;
            windowElement.style.zIndex = windowElement.id === 'exit-dialog' ? 10000 : 1000;
        }

        function drag(e) {
            if (!isDragging) return;

            e.preventDefault();

            if (e.type === 'touchmove') {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }

            // Constrain to viewport bounds
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;
            const elementWidth = windowElement.offsetWidth;
            const elementHeight = windowElement.offsetHeight;

            // Keep at least some of the window visible
            const minVisiblePx = 50; // At least 50px must be visible
            const maxX = windowWidth - minVisiblePx;
            const maxY = windowHeight - minVisiblePx;
            const minX = -(elementWidth - minVisiblePx);
            const minY = 0; // Don't allow dragging above the top

            currentX = Math.max(minX, Math.min(currentX, maxX));
            currentY = Math.max(minY, Math.min(currentY, maxY));

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, windowElement);
        }

        function dragEnd(e) {
            isDragging = false;
        }

        function setTranslate(xPos, yPos, el) {
            el.style.left = xPos + 'px';
            el.style.top = yPos + 'px';
            el.style.transform = 'none'; // Remove any CSS transform
        }

        // Re-center on window resize
        window.addEventListener('resize', () => {
            if (!isDragging) {
                centerWindow(windowElement);
            }
        });
    });
});

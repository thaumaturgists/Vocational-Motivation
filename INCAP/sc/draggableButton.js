const DraggableButton = (function() {
    class DraggableButton {
        constructor(buttonId) {
            if (typeof buttonId !== 'string') {
                throw new TypeError('buttonId must be a string.');
            }

            const button = document.getElementById(buttonId);
            if (!button) {
                throw new Error(`Button with ID "${buttonId}" does not exist.`);
            }

            this.button = button;
            this.isDragging = false;
            this.offsetX = 0;
            this.offsetY = 0;
            this.isMoving = false; // Flag to track if a move is in progress

            this.initDragEvents();
        }
        initDragEvents() {
            this.button.addEventListener('mousedown', this.onMouseDown.bind(this));
            document.addEventListener('mouseup', this.onMouseUp.bind(this));
            document.addEventListener('mousemove', this.onMouseMove.bind(this));

            // Touch events for mobile
            this.button.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: true });
            document.addEventListener('touchend', this.onTouchEnd.bind(this));
            document.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: false });

            // Listen for window resize events
            window.addEventListener('resize', this.checkButtonBounds.bind(this));
        }
        onMouseDown(e) {
            e.preventDefault(); // Prevent default action
            this.isDragging = true;
            this.offsetX = e.clientX - this.button.getBoundingClientRect().left;
            this.offsetY = e.clientY - this.button.getBoundingClientRect().top;
        }
        onMouseUp() {
            this.isDragging = false;
        }
        onMouseMove(e) {
            if (this.isDragging) {
                if (!this.isMoving) {
                    this.isMoving = true;
                    requestAnimationFrame(() => {
                        this.moveButton(e.clientX, e.clientY);
                        this.isMoving = false; // Reset the flag after the update
                    });
                }
            }
        }
        onTouchStart(e) {
            e.preventDefault(); // Prevent default action
            this.isDragging = true;
            this.offsetX = e.touches[0].clientX - this.button.getBoundingClientRect().left;
            this.offsetY = e.touches[0].clientY - this.button.getBoundingClientRect().top;
        }
        onTouchEnd() {
            this.isDragging = false;
        }
        onTouchMove(e) {
            if (this.isDragging) {
                this.moveButton(e.touches[0].clientX, e.touches[0].clientY);
            }
        }
        moveButton(clientX, clientY) {
            const buttonRect = this.button.getBoundingClientRect();
            let left = clientX - this.offsetX;
            let top = clientY - this.offsetY;

            // Boundary checks
            const minX = 0;
            const minY = 0;
            const maxX = window.innerWidth - buttonRect.width;
            const maxY = window.innerHeight - buttonRect.height;

            // Constrain the button within the screen boundaries
            left = Math.max(minX, Math.min(left, maxX));
            top = Math.max(minY, Math.min(top, maxY));

            // Use requestAnimationFrame for smoother updates
            requestAnimationFrame(() => {
                this.button.style.left = `${left}px`;
                this.button.style.top = `${top}px`;
            });
        }
        checkButtonBounds() {
            const buttonRect = this.button.getBoundingClientRect();
            const maxX = window.innerWidth - buttonRect.width;
            const maxY = window.innerHeight - buttonRect.height;

            // Adjust position if the button is out of bounds
            let left = parseFloat(this.button.style.left) || 0;
            let top = parseFloat(this.button.style.top) || 0;

            left = Math.max(0, Math.min(left, maxX));
            top = Math.max(0, Math.min(top, maxY));

            this.button.style.left = `${left}px`;
            this.button.style.top = `${top}px`;
        }
        cleanup() {
            // Remove event listeners
            this.button.removeEventListener('mousedown', this.onMouseDown.bind(this));
            document.removeEventListener('mouseup', this.onMouseUp.bind(this));
            document.removeEventListener('mousemove', this.onMouseMove.bind(this));

            // Touch events for mobile
            this.button.removeEventListener('touchstart', this.onTouchStart.bind(this));
            document.removeEventListener('touchend', this.onTouchEnd.bind(this));
            document.removeEventListener('touchmove', this.onTouchMove.bind(this));

            // Remove resize event listener
            window.removeEventListener('resize', this.checkButtonBounds.bind(this));
        }
    }
    return DraggableButton; // Return the constructor function
})();

// Instantiate the DraggableButton class
const draggableButton = new DraggableButton('toggleButton');
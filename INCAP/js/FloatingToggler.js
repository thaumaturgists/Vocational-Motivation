function FloatingToggler(tag) {
    // Create styles for the floating button and toggle content
    const style = document.createElement('style');
    style.textContent = `
        .ft-floating-button {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: #007BFF;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 10px;
            cursor: pointer;
        }

        .ft-toggle-content {
            display: none; /* Initially hidden */
            margin-top: 20px;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        .ft-container {
            position: relative; /* To position the button correctly */
            display: inline-block; /* To fit the content */
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
    `;
    document.head.appendChild(style);

    // Create the floating button if it doesn't exist
    if (!tag.querySelector('.ft-floating-button')) {
        const button = document.createElement('button');
        button.className = 'ft-floating-button';
        button.innerText = 'Toggle';
        button.onclick = function(event) {
            event.stopPropagation(); // Prevent triggering the tag's onclick
            const content = tag.querySelector('.ft-toggle-content');
            if (content) {
                content.style.display = content.style.display === 'none' ? 'block' : 'none';
            }
        };
        tag.appendChild(button);
    }
}

//         <div class="FT-container" onclick="FloatingToggler(this)"></div>
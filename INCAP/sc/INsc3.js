(function () {
    // Create and append the style element
    const style = document.createElement('style');
    style.textContent = `
        .floating-button {
            position: fixed;
            top: 20px;
            left: 20px;
            padding: 12px 18px;
            background-color: #007BFF;
            color: white;
            border: none;
            border-radius: 30px;
            cursor: pointer;
            z-index: 9999;
            font-size: 18px;
            font-weight: bold;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            transition: background-color 0.3s, transform 0.2s, box-shadow 0.2s;
        }

        .floating-button:hover {
            background-color: #0056b3;
            transform: scale(1.05);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
        }

        #menu {
            position: fixed;
            top: 70px;
            left: 20px;
            background-color: white;
            border: 1px solid #ccc;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            display: none;
            z-index: 9998;
            width: 250px;
            padding: 10px;
            transition: opacity 0.3s ease;
        }

        #menu.show {
            display: block;
            opacity: 1;
        }

        #menu label {
            display: flex;
            align-items: center;
            padding: 10px;
            cursor: pointer;
            transition: background-color 0.2s;
        }

        #menu label:hover {
            background-color: #f1f1f1;
        }

        #menu input[type="checkbox"] {
            appearance: none;
            width: 20px;
            height: 20px;
            border: 2px solid #007BFF;
            border-radius: 4px;
            outline: none;
            cursor: pointer;
            position: relative;
            transition: background-color 0.2s, border-color 0.2s;
        }

        #menu input[type="checkbox"]:checked {
            background-color: #007BFF;
            border-color: #0056b3;
        }

        #menu input[type="checkbox"]:checked::after {
            content: '';
            position: absolute;
            top: 2px;
            left: 6px;
            width: 8px;
            height: 12px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg);
        }
    `;
    document.head.appendChild(style);

    // Create the menu and button elements
    const menu = createMenu();
    document.body.appendChild(menu);

    const button = createToggleButton();
    document.body.appendChild(button);

    // Object to hold container references for loaded scripts
    const scriptContainers = {};

    // Function to create the menu
    function createMenu() {
        const menuDiv = document.createElement('div');
        menuDiv.id = 'menu';
        menuDiv.innerHTML = `
            <label>
                <input type="checkbox" id="hideCountersCheckbox"> Hide Counters
            </label>
            <label><input type="checkbox" data-script="MusicMixer.js" data-integrity="sha384-b4b664256ca7c2efc61ed1843f8d1695991d1b192a195a5323b13bece387ec5bcb3296c7e9e600eae2f84c1bae6d2aa0"> Load Music Mixer</label>
            <label><input type="checkbox" data-script="GlowTag.js" data-integrity="sha384-9d9ac6d5cdb92cb00f0685f1621b9123c3912ebdf6a9b341c8336dccdfc6d840d616df2fac229b1c60dfe4fcbe291d02"> Load Glow</label>
        `;
        return menuDiv;
    }

    // Function to create the toggle button
    function createToggleButton() {
        const toggleButton = document.createElement('button');
        toggleButton.className = 'floating-button';
        toggleButton.id = 'toggleButton';
        toggleButton.innerHTML = '☰';
        toggleButton.addEventListener('click', toggleMenuVisibility);
        return toggleButton;
    }

    // Function to toggle the visibility of the menu
    function toggleMenuVisibility() {
        const menu = document.getElementById('menu');
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        console.log('Menu toggled:', menu.style.display);
    }

    // Function to calculate the hash of the script content
    async function calculateHash(content) {
        if (typeof content !== 'string') {
            console.error('Invalid content type for hash calculation. Expected a string.');
            return null;
        }
        const encoder = new TextEncoder();
        const data = encoder.encode(content);
        const hashBuffer = await crypto.subtle.digest('SHA-384', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return `sha384-${hashHex}`;
    }

    // Function to load a script with integrity check
    async function loadScript(src, expectedIntegrity) {
        if (typeof src !== 'string' || typeof expectedIntegrity !== 'string') {
            console.error('Invalid parameters for loadScript. Expected strings.');
            return;
        }

        console.log(`Attempting to load script: ${src}`);
        try {
            const response = await fetch(src);
            if (!response.ok) throw new Error('Network response was not ok');

            const scriptContent = await response.text();
            const hash = await calculateHash(scriptContent);

            // Log the calculated hash
            if (hash === null) return; // Exit if hash calculation failed
            console.log(`Calculated hash for ${src}: ${hash}`);

            if (hash === expectedIntegrity) {
                const script = document.createElement('script');
                script.src = src;
                script.defer = true;
                script.onload = () => handleScriptLoad(src);
                script.onerror = () => console.error(`Error loading script: ${src}`);
                document.body.appendChild(script);
            } else {
                console.error(`Integrity check failed for ${src}`);
            }
        } catch (error) {
            console.error('Error loading script:', error);
        }
    }

    // Function to handle successful script load
    function handleScriptLoad(src) {
        console.log(`Script loaded successfully: ${src}`);
        const className = src.replace('.js', ''); // Remove .js to get class name
        console.log(`Checking for class: ${className}`);
        if (typeof window[className] === 'function') {
            console.log(`Class found: ${className}. Creating instance...`);
            const instance = new window[className](); // Instantiate the class
            const containerName = src.replace('.js', 'Container'); // Create container name
            scriptContainers[containerName] = document.getElementById('musicMixer'); // Store the container reference
            if (scriptContainers[containerName]) {
                scriptContainers[containerName].style.display = 'block'; // Show the music mixer
                console.log(`${containerName} is now visible.`);
            } else {
                console.warn(`Container for ${containerName} not found.`);
            }
        } else {
            console.error(`Class ${className} is not defined in the loaded script.`);
        }
    }

    // Function to unload a script
    function unloadScript(src) {
        if (typeof src !== 'string') {
            console.error('Invalid parameter for unloadScript. Expected a string.');
            return;
        }

        console.log(`Attempting to unload script: ${src}`);
        const scripts = document.querySelectorAll(`script[src="${src}"]`);
        scripts.forEach(script => {
            script.remove();
            console.log(`Script removed: ${src}`);
        });

        const containerName = src.replace('.js', 'Container'); // Create container name
        // Remove the container if it exists
        if (scriptContainers[containerName]) {
            scriptContainers[containerName].remove();
            delete scriptContainers[containerName]; // Clear the reference
            console.log(`${containerName} UI removed.`);
        } else {
            console.warn(`No UI found for ${containerName} to remove.`);
        }
    }

    // Event listener for checkboxes
    document.addEventListener('change', function(event) {
        if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
            const scriptSrc = event.target.getAttribute('data-script');
            const expectedIntegrity = event.target.getAttribute('data-integrity');
            console.log(`Checkbox changed: ${scriptSrc} - Checked: ${event.target.checked}`);
            if (event.target.checked) {
                loadScript(scriptSrc, expectedIntegrity);
            } else {
                unloadScript(scriptSrc);
            }
        }
    });

    // Call the function to create the toggle button
    createToggleButton();
})();

document.getElementById('hideCountersCheckbox').addEventListener('change', function() {
    const counters = document.getElementById('floatingCounters');
    counters.style.display = this.checked ? 'none' : 'block';
});
(function() {
    const __extends = (this && this.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (const p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== "function" && b !== null)
                throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();

function createGlowTagStyles() {
    var styles = `
        glow-tag- {
            display: inline-block;
            margin: 0;
            position: relative;
            color: rgba(0, 0, 0, 0.42);
            text-shadow: 
                0 0 5px rgba(255, 255, 255, 0.8),
                0 0 10px rgba(255, 255, 255, 0.6),
                0 0 15px rgba(255, 255, 255, 0.4);
            animation: fade 10s infinite;
            transition: text-shadow 0.5s ease-in-out;
        }
        glow-tag- h1, glow-tag- h2, glow-tag- h3, glow-tag- p {
            color: inherit;
            margin: 0;
            padding: 0;
            position: relative;
            z-index: 1;
        }
        .highlight {
            font-weight: bold;
            padding: 0 2px;
            border-radius: 3px;
        }
        @keyframes fade {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 1; }
        }
    `;
    var styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

// Call the function to create and append the styles
createGlowTagStyles();

// Section 2: GlowTag Class Definition
var GlowTag = /** @class */ (function (_super) {
    __extends(GlowTag, _super);
    function GlowTag() {
        var _this = _super.call(this) || this;
        _this.colorCode = _this.getRandomColor();
        _this.style.color = _this.colorCode;
        _this.style.textShadow = _this.getGlowEffect(_this.colorCode);
        return _this;
    }
    GlowTag.prototype.connectedCallback = function () {
        this.style.transition = 'text-shadow 0.3s ease';
        this.addEventListener('mouseover', this.onMouseOver.bind(this));
        this.addEventListener('mouseout', this.onMouseOut.bind(this));
    };
    GlowTag.prototype.getRandomColor = function () {
        var array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        var randomColor = array[0] % 16777215; // Limit to 0xFFFFFF
        return "#" + randomColor.toString(16).padStart(6, '0');
    };
    GlowTag.prototype.getGlowEffect = function (color, intensity) {
        if (intensity === void 0) { intensity = 15; }
        if (typeof color !== 'string') {
            throw new TypeError('Expected color to be a string');
        }
        if (typeof intensity !== 'number') {
            throw new TypeError('Expected intensity to be a number');
        }
        return `
            0 0 5px ${color},
            0 0 ${intensity}px ${color},
            0 0 ${intensity + 5}px ${color}`;
    };
    GlowTag.prototype.onMouseOver = function () {
        this.style.textShadow = this.getGlowEffect(this.colorCode, 20); // Increase glow on hover
    };
    GlowTag.prototype.onMouseOut = function () {
        this.style.textShadow = this.getGlowEffect(this.colorCode); // Reset glow
    };
    return GlowTag;
}(HTMLElement));

// Define the custom element
customElements.define('glow-tag-', GlowTag);

// Section 3: Color Lightening Function
function lightenColor(color, percent) {
    if (typeof color !== 'string') {
        throw new TypeError('Expected color to be a string');
    }
    if (typeof percent !== 'number') {
        throw new TypeError('Expected percent to be a number');
    }

    var num = parseInt(color.slice(1), 16);
    var amt = Math.round(2.55 * percent);
    var R = Math.min((num >> 16) + amt, 255);
    var G = Math.min((num >> 8 & 0x00FF) + amt, 255);
    var B = Math.min((num & 0x0000FF) + amt, 255);
    return "#" + ((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1).padStart(6, '0');
}

// Section 4: Highlighting Random Words
function highlightRandomWords(element) {
    if (!(element instanceof HTMLElement)) {
        throw new TypeError('Expected element to be an instance of HTMLElement');
    }

    var words = element.innerText.split(' ');
    var highlightCount = Math.floor(words.length / 1.3);
    var currentHighlight = 0;
    var highlightDelay = 5875;

    var highlightNextWord = function () {
        if (currentHighlight < highlightCount) {
            var _a = getRandomHighlightParameters(words.length), startIndex = _a.startIndex, numWordsToHighlight = _a.numWordsToHighlight;
            highlightWords(words, startIndex, numWordsToHighlight);
        }
        element.innerHTML = words.join(' ');
        currentHighlight++;
        setTimeout(highlightNextWord, highlightDelay);
    };
    highlightNextWord();
}

function getRandomHighlightParameters(totalWords) {
    if (typeof totalWords !== 'number') {
        throw new TypeError('Expected totalWords to be a number');
    }

    var numWordsToHighlight = window.crypto.getRandomValues(new Uint32Array(1))[0] % 5 + 1; // Generates a number between 1 and 5
    var startIndex = window.crypto.getRandomValues(new Uint32Array(1))[0] % (totalWords - numWordsToHighlight); // Generates a number between 0 and (totalWords - numWordsToHighlight)
    return { startIndex: startIndex, numWordsToHighlight: numWordsToHighlight };
}

function highlightWords(words, startIndex, numWordsToHighlight) {
    if (!Array.isArray(words)) {
        throw new TypeError('Expected words to be an array');
    }
    if (typeof startIndex !== 'number' || typeof numWordsToHighlight !== 'number') {
        throw new TypeError('Expected startIndex and numWordsToHighlight to be numbers');
    }

    for (var j = 0; j < numWordsToHighlight; j++) {
        var wordIndex = startIndex + j;
        if (wordIndex < words.length && !words[wordIndex].includes('<span')) {
            words[wordIndex] = createHighlightedWord(words[wordIndex]);
        }
    }
}

function createHighlightedWord(word) {
    if (typeof word !== 'string') {
        throw new TypeError('Expected word to be a string');
    }

    var baseColor = getRandomColor();
    var halfIndex = Math.ceil(word.length / 3);
    var highlightedWord = '';
    for (var k = 0; k < word.length; k++) {
        var color = k < halfIndex ? baseColor : lightenColor(baseColor, (k - halfIndex + 1) * 10);
        highlightedWord += `<span class="highlight" style="color: ${color};">${word[k]}</span>`;
    }
    return highlightedWord;
}

// Section 5: Wrapping Elements with GlowTag
function wrapWithGlowTag(selector) {
    if (typeof selector !== 'string') {
        throw new TypeError('Expected selector to be a string');
    }

    var elements = document.querySelectorAll(selector);
    elements.forEach(function (element) {
        if (element.childNodes.length > 0) { // Ensure the element has child nodes
            var glowTag = document.createElement('glow-tag-');
            glowTag.innerHTML = element.innerHTML;
            element.innerHTML = ''; // Clear the original content
            element.appendChild(glowTag);
            highlightRandomWords(glowTag);
        }
    });
}

// Section 6: Random Color Generation
function getRandomColor() {
    var array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    var randomColor = array[0] % 16777215; // Limit to 0xFFFFFF
    return "#" + randomColor.toString(16).padStart(6, '0');
}

// Call to wrap specific elements
// Wrap structural tags
// wrapWithGlowTag('html, head, body, title, meta, link, style');

// Wrap content tags
wrapWithGlowTag('h1, h2, h3, h4, h5, h6, p, br, hr, strong, em, small, mark, del, ins');

// Wrap list tags
wrapWithGlowTag('ul, ol, li');

// Wrap link and media tags
wrapWithGlowTag('a, img, video, audio, iframe');

// Wrap table tags
wrapWithGlowTag('table, tr, th, td, caption');

// Wrap form tags
wrapWithGlowTag('form, input, textarea, button, select, option, label');

// Wrap scripting tags
wrapWithGlowTag('script, noscript');

// Wrap semantic tags
wrapWithGlowTag('header, nav, main, article, section, aside, footer, details, summary');

//Non-common
// Wrap meta tags
wrapWithGlowTag('base, link, meta');

// Wrap scripting and interactive tags
wrapWithGlowTag('canvas, script, noscript');

// Wrap form tags
wrapWithGlowTag('fieldset, legend, datalist, output');

// Wrap table tags
wrapWithGlowTag('thead, tbody, tfoot');

// Wrap embedded content tags
wrapWithGlowTag('embed, object, param');

// Wrap semantic tags
wrapWithGlowTag('time, mark, progress, meter');

// Wrap document structure tags
wrapWithGlowTag('address, blockquote, cite, q');

// Wrap interactive content tags
wrapWithGlowTag('details, summary');

// Wrap deprecated tags (not recommended for use)
wrapWithGlowTag('applet, bgsound, blink');

// Function to wrap a random element with GlowTag
function wrapRandomElementWithGlowTag() {
    var elements = Array.from(document.body.children); // Get all child elements of the body
    if (elements.length === 0) {
        console.log("No elements found to wrap.");
        return; // Exit if there are no elements
    }
    // Generate a cryptographically secure random index
    var randomValues = new Uint32Array(1);
    window.crypto.getRandomValues(randomValues);
    var randomIndex = randomValues[0] % elements.length; // Ensure the index is within bounds
    var selectedElement = elements[randomIndex];
    console.log("Selected random element: " + selectedElement.tagName);

    // Create a glow-tag- and set its inner HTML to the selected element's inner HTML
    var glowTag = document.createElement('glow-tag-');
    glowTag.innerHTML = selectedElement.innerHTML;

    // Add custom styles to the glow-tag-
    Object.assign(glowTag.style, {
        border: '2px solid #245313', // Example border
        padding: '10px', // Example padding
        borderRadius: '5px', // Example border radius
        backgroundColor: 'transparent', // Example background color
        boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)' // Example glow effect
    });

    // Replace the selected element with the glow-tag-
    selectedElement.innerHTML = ''; // Clear the original content
    selectedElement.appendChild(glowTag);
    console.log("Replaced element with glow-tag-: " + selectedElement.tagName);
}

// Call the new function to wrap a random element
wrapRandomElementWithGlowTag();
console.log("Wrapped a random element with glow-tag-.");

// Function to generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
    if (typeof min !== 'number' || typeof max !== 'number') {
        throw new TypeError('Expected min and max to be numbers');
    }
    var array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return Math.floor(array[0] / (0xFFFFFFFF + 1) * (max - min + 1)) + min;
}

// Function to randomly blur the screen
function randomBlur() {
    var blurAmount = getRandomInt(0, 4); // Random blur amount between 0 and 4 pixels
    var duration = getRandomInt(5000, 7000); // Random duration between 5 and 7 seconds
    document.body.style.filter = "blur(" + blurAmount + "px)"; // Apply the blur effect

    // Reset the blur after the duration
    setTimeout(function () {
        document.body.style.filter = 'blur(0px)'; // Remove the blur effect
    }, duration);
}

// Call the randomBlur function every 5 seconds
setInterval(randomBlur, 15555); // Adjusted to a more reasonable interval

// Function to create and apply additional styles dynamically
function createAdditionalStyles() {
    var styles = `
        .wrap-glow {
            position: relative; /* Positioning for glow effect */
            display: inline-block; /* Inline block for wrapping elements */
        }

        .wrap-glow::after {
            content: ''; /* Empty content for pseudo-element */
            position: absolute; /* Absolute positioning */
            top: 0; left: 0; right: 0; bottom: 0; /* Cover the entire element */
            background: rgba(255, 255, 255, 0.5); /* Light glow effect */
            filter: blur(10px); /* Blur for the glow */
            opacity: 0; /* Start invisible */
            transition: opacity 0.5s ease; /* Smooth transition for glow */
        }

        .wrap-glow:hover::after {
            opacity: 1; /* Show glow on hover */
        }
    `;
    var styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

// Call the function to create additional styles
createAdditionalStyles();
})();
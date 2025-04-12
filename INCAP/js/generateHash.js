// generateHash.js

async function generateHash(url) {
    const response = await fetch(url);
    const text = await response.text();
    const hashBuffer = await crypto.subtle.digest('SHA-384', new TextEncoder().encode(text));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    console.log(`sha384-${hashHex}`);
}

// generateHash('URL_OF_YOUR_FILE');
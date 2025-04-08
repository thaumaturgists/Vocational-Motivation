async function generateHash(url) {
    const response = await fetch(url);
    const text = await response.text();
    const hashBuffer = await crypto.subtle.digest('SHA-384', new TextEncoder().encode(text));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    console.log(`sha384-${hashHex}`);
}
console.log('1');
generateHash('https://thaumaturgists.github.io/Vocational-Motivation/INCAP/js/err2catch.js');
console.log('2');
generateHash('https://thaumaturgists.github.io/Vocational-Motivation/CIW-JavaScript-Exam/Doorman/style.css');
console.log('3');
generateHash('https://thaumaturgists.github.io/Vocational-Motivation/INCAP/js/main.js');
console.log('4');
generateHash('https://thaumaturgists.github.io/Vocational-Motivation/INCAP/js/toggleContent.js');
console.log('5');
generateHash('https://thaumaturgists.github.io/Vocational-Motivation/INCAP/js/pinfeather.js');
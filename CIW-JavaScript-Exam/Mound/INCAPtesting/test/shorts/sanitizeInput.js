function sanitizeInput(input) {
    const sanitized = input.replace(/[^a-zA-Z0-9\s-_]/g, '');
    if (sanitized.length > 50) { // Example: limit input length
        throw new Error('Input exceeds maximum length.');
    }
    if (sanitized.trim() === '') {
        throw new Error('Input cannot be empty.');
    }
    return sanitized;
}

validateResponse(data) {
    if (data && typeof data === 'object' && data.hasOwnProperty('expectedProperty')) {
        return data;
    }
    return null;
}

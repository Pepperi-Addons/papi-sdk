export class Helper {
    normalizeHeaders(requestHeaders: { [key: string]: string }) {
        const headers: { [key: string]: string } = {};
        for (const key in requestHeaders) {
            headers[key.toLowerCase()] = requestHeaders[key];
        }
        return headers;
    }
}

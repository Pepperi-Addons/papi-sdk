export class Helper {
    ParseHeaders(requestHeaders: { [key: string]: string }) {
        const headers: { [key: string]: string } = {};
        if (requestHeaders != null) {
            for (const key in requestHeaders) {
                headers[key.toLowerCase()] = requestHeaders[key];
            }
        }
        return headers;
    }
}

import fetch from 'node-fetch';

export async function getPerformance() {
    let res;
    if (window) {
        res = await import('./performance.client').then((m) => m.papi_performance);
    } else {
        res = await import('./performance.server').then((m) => m.papi_performance);
    }
    return res;
}

export const papi_fetch = typeof window !== 'undefined' ? window.fetch.bind(window) : fetch;

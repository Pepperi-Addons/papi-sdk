import fetch from 'node-fetch';

export async function getPerformance() {
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        if (global != undefined) {
            return require('perf_hooks')?.performance;
        }
    } catch {}
    try {
        if (window != undefined) {
            return window?.performance;
        }
    } catch {}
}

export const papi_fetch = typeof window !== 'undefined' ? window.fetch.bind(window) : fetch;

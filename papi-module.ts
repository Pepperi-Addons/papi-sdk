import fetch from 'node-fetch';

export function getPerformance() {
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

export const papi_fetch: typeof fetch = typeof window !== 'undefined' ? (window.fetch.bind(window) as any) : fetch;

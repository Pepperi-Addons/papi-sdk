import { performance } from 'perf_hooks';
import fetch from 'node-fetch';

export const papi_performance = typeof window !== 'undefined' ? window.performance : performance;
export const papi_fetch = typeof window !== 'undefined' ? window.fetch.bind(window) : fetch;

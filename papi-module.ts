import fetch from 'node-fetch';
export { crossPlatformPerformance as papi_performance } from './papi-performance';
export const papi_fetch = typeof window !== 'undefined' ? window.fetch.bind(window) : fetch;

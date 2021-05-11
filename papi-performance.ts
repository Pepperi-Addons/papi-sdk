/**
 * Requires a module which is protected against bundler minification.
 *
 * @param request The module path to resolve
 */
export function dynamicRequire(mod: any, request: string): any {
    // tslint:disable-next-line: no-unsafe-any
    return mod.require(request);
}

/**
 * Checks whether we're in the Node.js or Browser environment
 *
 * @returns Answer to given question
 */
export function isNodeEnv(): boolean {
    // tslint:disable:strict-type-predicates
    return Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';
}

const fallbackGlobalObject = {};

/**
 * Safely get global scope object
 *
 * @returns Global scope object
 */
export function getGlobalObject<T>(): T {
    return (isNodeEnv()
        ? global
        : typeof window !== 'undefined'
        ? window
        : typeof self !== 'undefined'
        ? self
        : fallbackGlobalObject) as T;
}
// tslint:enable:strict-type-predicates

const INITIAL_TIME = Date.now();

export const crossPlatformPerformance: Performance = (() => {
    if (isNodeEnv()) {
        try {
            const perfHooks = require('perf_hooks') as {
                performance: Performance;
            };
            return perfHooks.performance;
        } catch (e) {
            // return performanceFallback;
            console.log(e);
        }
    }
    if (getGlobalObject<Window>().performance) {
        // tslint:disable-next-line:strict-type-predicates
        if (performance.timeOrigin === undefined) {
            // @ts-ignore
            // tslint:disable-next-line:deprecation
            performance.timeOrigin = (performance.timing && performance.timing.navigationStart) || INITIAL_TIME;
        }
    }
    return getGlobalObject<Window>().performance;
})();

import { DependencyList, useMemo } from "react";
import { useCustomCompareMemo } from "./custom-compare.js";
import { useDeepCompareMemo } from "./deep-compare.js";
import { useMemoOnce } from "./once.js";
import { useAt } from "./time.js";
import { DepsAreEqual } from "./types.js";

/**
 * Returns true after the specified delay has passed.
 * @param delay Delay.
 * @returns True or false.
 */
export function useDelayOnce(delay: number | undefined) {
    return useAt(useMemoOnce(() => delay === undefined ? undefined : Date.now() + delay))
}

/**
 * Returns true after the specified delay has passed since the dependencies have changed.
 * @param delay Delay.
 * @returns True or false.
 */
export function useDelay(delay: number | undefined, deps: DependencyList) {
    return useAt(useMemo(() => delay === undefined ? undefined : Date.now() + delay, deps))
}

/**
 * Returns true after the specified delay has passed since the dependencies have changed.
 * @param delay Delay.
 * @returns True or false.
 */
export function useDeepCompareDelay(delay: number | undefined, deps: DependencyList) {
    return useAt(useDeepCompareMemo(() => delay === undefined ? undefined : Date.now() + delay, deps))
}

/**
 * Returns true after the specified delay has passed since the dependencies have changed.
 * @param delay Delay.
 * @returns True or false.
 */
export function useCustomCompareDelay<D extends DependencyList>(delay: number | undefined, deps: D, depsEqual: DepsAreEqual) {
    return useAt(useCustomCompareMemo(() => delay === undefined ? undefined : Date.now() + delay, deps, depsEqual))
}

/**
 * Returns true after the specified delay has passed since the delay time has changed.
 * @param delay Delay.
 * @returns True or false.
 */
export function useDelayBy(delay: number | undefined) {
    return useDelay(delay, [delay])
}

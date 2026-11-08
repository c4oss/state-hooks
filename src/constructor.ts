import { DependencyList, useMemo } from "react"
import { useCustomCompareMemo } from "./custom-compare.js"
import { useDeepCompareMemo } from "./deep-compare.js"
import { useMemoOnce } from "./once.js"
import { DepsAreEqual } from "./types.js"

/**
 * Creates a new instance of a class.
 * @param factory The class constructor.
 * @returns The new instance of the class.
 */
export function useConstructorOnce<T>(factory: new () => T) {
    return useMemoOnce(() => new factory())
}

/**
 * Creates a new instance of a class when the dependencies change.
 * @param factory The class constructor.
 * @param deps The dependencies.
 * @returns The new instance of the class.
 */

export function useConstructor<T, D extends DependencyList>(factory: new (...args: D) => T, deps: [...D]) {
    return useMemo(() => new factory(...deps), deps)
}

/**
 * Creates a new instance of a class when the dependencies change.
 * @param factory The class constructor.
 * @param deps The dependencies.
 * @returns The new instance of the class.
 */
export function useCustomCompareConstructor<T, D extends DependencyList>(factory: new (...args: D) => T, deps: [...D], depsAreEqual: DepsAreEqual) {
    return useCustomCompareMemo(() => new factory(...deps), deps, depsAreEqual)
}

/**
 * Creates a new instance of a class when the dependencies change.
 * @param factory The class constructor.
 * @param deps The dependencies.
 * @returns The new instance of the class.
 */
export function useDeepCompareConstructor<T, D extends DependencyList>(factory: new (...args: D) => T, deps: [...D]) {
    return useDeepCompareMemo(() => new factory(...deps), deps)
}

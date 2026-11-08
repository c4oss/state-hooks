import { DependencyList, useCallback } from "react"
import { useCustomCompareCallback } from "./custom-compare.js"
import { useDeepCompareCallback } from "./deep-compare.js"
import { DepsAreEqual } from "./types.js"

export function useCallbackFactory<T, D extends DependencyList>(factory: (...args: D) => T, deps: [...D]) {
    return useCallback(() => factory(...deps), deps)
}
export function useCustomCompareCallbackFactory<T, D extends DependencyList>(factory: (...args: D) => T, deps: [...D], depsAreEqual: DepsAreEqual) {
    return useCustomCompareCallback(() => factory(...deps), deps, depsAreEqual)
}
export function useDeepCompareCallbackFactory<T, D extends DependencyList>(factory: (...args: D) => T, deps: [...D]) {
    return useDeepCompareCallback(() => factory(...deps), deps)
}

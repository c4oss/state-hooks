import { DependencyList, useMemo } from "react"
import { useCustomCompareMemo } from "./custom-compare.js"
import { useDeepCompareMemo } from "./deep-compare.js"
import { DepsAreEqual } from "./types.js"

export function useFactory<T, D extends DependencyList>(factory: (...args: D) => T, deps: [...D]) {
    return useMemo(() => factory(...deps), deps)
}
export function useCustomCompareFactory<T, D extends DependencyList>(factory: (...args: D) => T, deps: [...D], depsAreEqual: DepsAreEqual) {
    return useCustomCompareMemo(() => factory(...deps), deps, depsAreEqual)
}
export function useDeepCompareFactory<T, D extends DependencyList>(factory: (...args: D) => T, deps: [...D]) {
    return useDeepCompareMemo(() => factory(...deps), deps)
}

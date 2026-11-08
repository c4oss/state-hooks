import { DependencyList, useCallback } from "react"
import { useCustomCompareCallback } from "./custom-compare.js"
import { useDeepCompareCallback } from "./deep-compare.js"
import { useCallbackOnce } from "./once.js"
import { DepsAreEqual } from "./types.js"

export function useConstructorCallbackOnce<T>(factory: new () => T) {
    return useCallbackOnce(() => new factory())
}
export function useConstructorCallback<T, D extends DependencyList>(factory: new (...args: D) => T, deps: [...D]) {
    return useCallback(() => new factory(...deps), deps)
}
export function useCustomCompareConstructorCallback<T, D extends DependencyList>(factory: new (...args: D) => T, deps: [...D], depsAreEqual: DepsAreEqual) {
    return useCustomCompareCallback(() => new factory(...deps), deps, depsAreEqual)
}
export function useDeepCompareConstructorCallback<T, D extends DependencyList>(factory: new (...args: D) => T, deps: [...D]) {
    return useDeepCompareCallback(() => new factory(...deps), deps)
}

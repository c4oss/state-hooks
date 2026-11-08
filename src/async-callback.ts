import { DependencyList, useCallback } from "react"
import { useCustomCompareCallback } from "./custom-compare.js"
import { useDeepCompareCallback } from "./deep-compare.js"
import { useCallbackOnce } from "./once.js"
import { useThrower } from "./thrower.js"
import { DepsAreEqual } from "./types.js"

export function useAsyncCallback<T extends (...args: any) => Promise<any>, D extends DependencyList>(callback: T, deps: [...D]) {
    const thrower = useThrower()
    return useCallback((...args: Parameters<T>) => {
        callback(...args).catch(thrower)
    }, deps)
}
export function useCustomCompareAsyncCallback<T extends (...args: any) => Promise<any>, D extends DependencyList>(callback: T, deps: [...D], depsAreEqual: DepsAreEqual) {
    const thrower = useThrower()
    return useCustomCompareCallback((...args: Parameters<T>) => {
        callback(...args).catch(thrower)
    }, deps, depsAreEqual)
}
export function useDeepCompareAsyncCallback<T extends (...args: any) => Promise<any>, D extends DependencyList>(callback: T, deps: [...D]) {
    const thrower = useThrower()
    return useDeepCompareCallback((...args: Parameters<T>) => {
        callback(...args).catch(thrower)
    }, deps)
}
export function useAsyncCallbackOnce<T extends (...args: any) => Promise<any>>(callback: T) {
    const thrower = useThrower()
    return useCallbackOnce((...args: Parameters<T>) => {
        callback(...args).catch(thrower)
    })
}

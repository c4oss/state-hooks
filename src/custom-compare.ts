import { DependencyList, EffectCallback, useCallback, useEffect, useMemo, useRef } from "react";
import { DepsAreEqual } from "./types.js";
import { useIsFirstMount } from "./updates.js";

function eachEqual<T extends DependencyList>(a: T, b: T, depsAreEqual: DepsAreEqual) {
    if (a.length !== b.length) {
        return false
    }
    return a.every((value, key) => depsAreEqual(value, b[key]))
}

export function useCustomCompareConstant<T>(value: T, depsAreEqual: DepsAreEqual) {
    return useCustomCompareMemo(() => value, [value], depsAreEqual)
}

export function useCustomCompareCallback<T extends Function, D extends DependencyList>(callback: T, deps: D, depsEqual: DepsAreEqual) {
    return useCallback(
        callback,
        useCustomCompareMemo(() => deps, deps, depsEqual)
    )
}

export function useCustomCompareMemo<T, D extends DependencyList>(factory: () => T, deps: D, depsEqual: DepsAreEqual) {
    const ref = useRef(deps)
    if (!eachEqual(ref.current, deps, depsEqual)) {
        ref.current = deps
    }
    return useMemo(factory, [ref.current])
}

export function useCustomCompareEffect<D extends DependencyList>(effect: EffectCallback, deps: D, depsEqual: DepsAreEqual) {
    return useEffect(
        effect,
        useCustomCompareMemo(() => deps, deps, depsEqual)
    )
}

export function useCustomCompareUpdateEffect<D extends DependencyList>(effect: EffectCallback, deps: D, depsAreEqual: DepsAreEqual) {
    const firstMount = useIsFirstMount()
    return useCustomCompareEffect(() => {
        if (firstMount) {
            return
        }
        return effect()
    }, deps, depsAreEqual)
}

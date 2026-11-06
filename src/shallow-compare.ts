import { DependencyList, EffectCallback } from "react"
import shallowEqual from "shallowequal"
import { useCustomCompareCallback, useCustomCompareEffect, useCustomCompareMemo, useCustomCompareUpdateEffect } from "./custom-compare.js"

export function useShallowCompareEffect(effect: EffectCallback, deps: DependencyList) {
    return useCustomCompareEffect(effect, deps, shallowEqual)
}
export function useShallowCompareUpdateEffect<D extends DependencyList>(effect: EffectCallback, deps: D) {
    return useCustomCompareUpdateEffect(effect, deps, shallowEqual)
}
export function useShallowCompareCallback<T extends Function>(callback: T, deps: DependencyList) {
    return useCustomCompareCallback(callback, deps, shallowEqual)
}
export function useShallowCompareMemo<T>(factory: () => T, deps: DependencyList) {
    return useCustomCompareMemo(factory, deps, shallowEqual)
}
export function useShallowCompareConstant<T>(value: T) {
    return useShallowCompareMemo(() => value, [value])
}

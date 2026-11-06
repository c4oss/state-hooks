import { dequal } from "dequal"
import { DependencyList, EffectCallback } from "react"
import { useCustomCompareCallback, useCustomCompareEffect, useCustomCompareMemo, useCustomCompareUpdateEffect } from "./custom-compare.js"

export function useDeepCompareEffect(effect: EffectCallback, deps: DependencyList) {
    return useCustomCompareEffect(effect, deps, dequal)
}
export function useDeepCompareUpdateEffect<D extends DependencyList>(effect: EffectCallback, deps: D) {
    return useCustomCompareUpdateEffect(effect, deps, dequal)
}
export function useDeepCompareCallback<T extends Function>(callback: T, deps: DependencyList) {
    return useCustomCompareCallback(callback, deps, dequal)
}
export function useDeepCompareMemo<T>(factory: () => T, deps: DependencyList) {
    return useCustomCompareMemo(factory, deps, dequal)
}
export function useDeepCompareConstant<T>(value: T) {
    return useCustomCompareMemo(() => value, [value], dequal)
}

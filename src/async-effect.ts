import { DependencyList, useEffect } from "react"
import { useCustomCompareEffect, useCustomCompareUpdateEffect } from "./custom-compare.js"
import { useDeepCompareEffect, useDeepCompareUpdateEffect } from "./deep-compare.js"
import { useEffectOnce } from "./once.js"
import { useThrower } from "./thrower.js"
import { DepsAreEqual } from "./types.js"
import { useUpdateEffect } from "./updates.js"

export type AsyncEffectCallback = () => PromiseLike<void>

export function useAsyncEffect<D extends DependencyList>(callback: AsyncEffectCallback, deps: D) {
    const thrower = useThrower()
    useEffect(() => {
        callback().then(() => void 0, thrower)
    }, deps)
}

export function useAsyncUpdateEffect(callback: AsyncEffectCallback) {
    const thrower = useThrower()
    useUpdateEffect(() => {
        callback().then(() => void 0, thrower)
    }, [
        callback
    ])
}
export function useAsyncEffectOnce(callback: AsyncEffectCallback) {
    const thrower = useThrower()
    useEffectOnce(() => {
        callback().then(() => void 0, thrower)
    })
}

export function useCustomCompareAsyncEffect<D extends DependencyList>(callback: AsyncEffectCallback, deps: D, depsEqual: DepsAreEqual<D>) {
    const thrower = useThrower()
    useCustomCompareEffect(() => {
        callback().then(() => void 0, thrower)
    }, deps, depsEqual)
}

export function useCustomCompareAsyncUpdateEffect<D extends DependencyList>(callback: AsyncEffectCallback, deps: D, depsEqual: DepsAreEqual<D>) {
    const thrower = useThrower()
    useCustomCompareUpdateEffect(() => {
        callback().then(() => void 0, thrower)
    }, deps, depsEqual)
}

export function useDeepCompareAsyncEffect<D extends DependencyList>(callback: AsyncEffectCallback, deps: D) {
    const thrower = useThrower()
    useDeepCompareEffect(() => {
        callback().then(() => void 0, thrower)
    }, deps)
}

export function useDeepCompareAsyncUpdateEffect<D extends DependencyList>(callback: AsyncEffectCallback, deps: D) {
    const thrower = useThrower()
    useDeepCompareUpdateEffect(() => {
        callback().then(() => void 0, thrower)
    }, deps)
}

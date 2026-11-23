import { DependencyList, useEffect } from "react"
import { useCustomCompareEffect, useCustomCompareUpdateEffect } from "./custom-compare.js"
import { useDeepCompareEffect, useDeepCompareUpdateEffect } from "./deep-compare.js"
import { useEffectOnce } from "./once.js"
import { useThrower } from "./thrower.js"
import { DepsAreEqual } from "./types.js"
import { useUpdateEffect } from "./updates.js"

export type AsyncEffectCallback = (signal: AbortSignal) => PromiseLike<void>

export function useAsyncEffect<D extends DependencyList>(callback: AsyncEffectCallback, deps: D) {
    const thrower = useThrower()
    useEffect(() => {
        const controller = new AbortController()
        callback(controller.signal).then(() => void 0, thrower)
        return () => {
            controller.abort()
        }
    }, deps)
}

export function useAsyncUpdateEffect(callback: AsyncEffectCallback) {
    const thrower = useThrower()
    useUpdateEffect(() => {
        const controller = new AbortController()
        callback(controller.signal).then(() => void 0, thrower)
        return () => {
            controller.abort()
        }
    }, [
        callback
    ])
}
export function useAsyncEffectOnce(callback: AsyncEffectCallback) {
    const thrower = useThrower()
    useEffectOnce(() => {
        const controller = new AbortController()
        callback(controller.signal).then(() => void 0, thrower)
        return () => {
            controller.abort()
        }
    })
}

export function useCustomCompareAsyncEffect<D extends DependencyList>(callback: AsyncEffectCallback, deps: D, depsEqual: DepsAreEqual) {
    const thrower = useThrower()
    useCustomCompareEffect(() => {
        const controller = new AbortController()
        callback(controller.signal).then(() => void 0, thrower)
        return () => {
            controller.abort()
        }
    }, deps, depsEqual)
}

export function useCustomCompareAsyncUpdateEffect<D extends DependencyList>(callback: AsyncEffectCallback, deps: D, depsEqual: DepsAreEqual) {
    const thrower = useThrower()
    useCustomCompareUpdateEffect(() => {
        const controller = new AbortController()
        callback(controller.signal).then(() => void 0, thrower)
        return () => {
            controller.abort()
        }
    }, deps, depsEqual)
}

export function useDeepCompareAsyncEffect<D extends DependencyList>(callback: AsyncEffectCallback, deps: D) {
    const thrower = useThrower()
    useDeepCompareEffect(() => {
        const controller = new AbortController()
        callback(controller.signal).then(() => void 0, thrower)
        return () => {
            controller.abort()
        }
    }, deps)
}

export function useDeepCompareAsyncUpdateEffect<D extends DependencyList>(callback: AsyncEffectCallback, deps: D) {
    const thrower = useThrower()
    useDeepCompareUpdateEffect(() => {
        const controller = new AbortController()
        callback(controller.signal).then(() => void 0, thrower)
        return () => {
            controller.abort()
        }
    }, deps)
}

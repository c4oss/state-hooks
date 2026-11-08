import { DependencyList, useCallback, useEffect } from "react"
import { useCustomCompareCallback } from "./custom-compare.js"
import { useDeepCompareCallback } from "./deep-compare.js"
import { DepsAreEqual } from "./types.js"

export function useInterval(timeout: number, effectCallback: () => void, deps: DependencyList) {
    const effect = useCallback(effectCallback, deps)
    useEffect(() => {
        const interval = setInterval(effect, timeout)
        return () => {
            clearInterval(interval)
        }
    }, [
        timeout,
        effect
    ])
}
export function useCustomCompareInterval<D extends DependencyList>(timeout: number, effectCallback: () => void, deps: D, depsAreEqual: DepsAreEqual) {
    const effect = useCustomCompareCallback(effectCallback, deps, depsAreEqual)
    useEffect(() => {
        const interval = setInterval(effect, timeout)
        return () => {
            clearInterval(interval)
        }
    }, [
        timeout,
        effect
    ])
}
export function useDeepCompareInterval(timeout: number, effectCallback: () => void, deps: DependencyList) {
    const effect = useDeepCompareCallback(effectCallback, deps)
    useEffect(() => {
        const interval = setInterval(effect, timeout)
        return () => {
            clearInterval(interval)
        }
    }, [
        timeout,
        effect
    ])
}

/*
export function useAsyncInterval(interval: number, effectCallback: () => PromiseLike<void>, deps: DependencyList) {
    const [next, setNext] = useState(Date.now)
    const run = useAt(next)
    const effect = useCallback(effectCallback, deps)
    useAsyncEffect(async () => {
        if (run) {
            await effect()
            setNext(Date.now() + interval)
        }
    }, [
        effect,
        run,
    ])
}
export function useAsyncCustomCompareInterval<D extends DependencyList>(interval: number, effectCallback: () => PromiseLike<void>, deps: D, depsAreEqual: DepsAreEqual) {
    const [next, setNext] = useState(Date.now)
    const run = useAt(next)
    const effect = useCustomCompareCallback(effectCallback, deps, depsAreEqual)
    useAsyncEffect(async () => {
        if (run) {
            await effect()
            setNext(Date.now() + interval)
        }
    }, [
        effect,
        run,
    ])
}
export function useAsyncDeepCompareInterval(interval: number, effectCallback: () => PromiseLike<void>, deps: DependencyList) {
    const [next, setNext] = useState(Date.now)
    const run = useAt(next)
    const effect = useDeepCompareCallback(effectCallback, deps)
    useAsyncEffect(async () => {
        if (run) {
            await effect()
            setNext(Date.now() + interval)
        }
    }, [
        effect,
        run,
    ])
}

*/
import { DependencyList, useCallback } from "react"
import { ValueOrFactory, callOrGet } from "value-or-factory"
import { useCounter } from "./counter.js"
import { useCustomCompareCallback } from "./custom-compare.js"
import { useDeepCompareCallback } from "./deep-compare.js"
import { useThrower } from "./thrower.js"
import { DepsAreEqual } from "./types.js"

/**
 * Returns an object that can be used to track async operations.
 * @returns An object that can be used to track async operations.
 */
export function useAsyncTracker() {
    const runs = useCounter()
    const thrower = useThrower()
    return {
        isRunning: runs.current > 0,
        runningCount: runs.current,
        reset: runs.reset,
        run: useCallback((promise: ValueOrFactory<PromiseLike<unknown>>) => {
            runs.increment()
            return callOrGet(promise).then(() => {
                runs.decrement()
            }, e => {
                runs.decrement()
                thrower(e)
            })
        }, [
            runs.increment,
            runs.decrement,
            thrower,
        ])
    }
}

export interface AsyncCallback<A extends readonly unknown[]> {

    readonly isRunning: boolean
    readonly runningCount: number
    readonly run: (...args: A) => PromiseLike<void>

}

export function useTrackingAsync<R, A extends readonly unknown[]>(func: (...args: A) => PromiseLike<R>): AsyncCallback<A> {
    const tracker = useAsyncTracker()
    return {
        isRunning: tracker.isRunning,
        runningCount: tracker.runningCount,
        run: useCallback((...args: A) => tracker.run(() => func(...args)), [tracker.run, func])
    }
}
export function useTrackingAsyncCallback<R, A extends readonly unknown[]>(func: (...args: A) => PromiseLike<R>, deps: DependencyList) {
    return useTrackingAsync(useCallback(func, deps))
}
export function useCustomCompareTrackingAsyncCallback<R, A extends readonly unknown[], D extends DependencyList>(func: (...args: A) => PromiseLike<R>, deps: D, depsAreEqual: DepsAreEqual<D>) {
    return useTrackingAsync(useCustomCompareCallback(func, deps, depsAreEqual))
}
export function useDeepCompareTrackingAsyncCallback<R, A extends readonly unknown[]>(func: (...args: A) => PromiseLike<R>, deps: DependencyList) {
    return useTrackingAsync(useDeepCompareCallback(func, deps))
}

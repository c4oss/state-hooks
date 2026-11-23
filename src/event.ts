import { useEffect, useEffectEvent } from "react"
import { useDeepCompareConstant } from "./deep-compare.js"

export interface EventTarget<E> {

    addEventListener(type: string, listener: ((evt: E) => void), options?: boolean | AddEventListenerOptions): void
    removeEventListener(type: string, listener: ((evt: E) => void), options?: EventListenerOptions | boolean): void

}

/**
 * Listens for an event on a target, calling the latest `listener` once per event, as it happens (so it can call
 * `preventDefault`). Changing `listener` doesn't re-subscribe.
 */
export function useEvent<T>(target: EventTarget<T>, type: string, listener: (event: T) => void, options?: EventListenerOptions | undefined) {
    const onEvent = useEffectEvent(listener)
    const stableOptions = useDeepCompareConstant(options)
    useEffect(() => {
        const handle = (event: T) => onEvent(event)
        target.addEventListener(type, handle, stableOptions)
        return () => {
            target.removeEventListener(type, handle, stableOptions)
        }
    }, [
        target,
        type,
        stableOptions,
    ])
}

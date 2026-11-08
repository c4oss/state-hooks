import { useEffect } from "react"
import { useArray } from "./array.js"
import { useDeepCompareConstant } from "./deep-compare.js"

export interface EventTarget<E> {

    addEventListener(type: string, listener: ((evt: E) => void), options?: boolean | AddEventListenerOptions): void
    removeEventListener(type: string, listener: ((evt: E) => void), options?: EventListenerOptions | boolean): void

}

export function useEvent<T>(target: EventTarget<T>, type: string, listener: (event: T) => void, options?: EventListenerOptions | undefined) {
    const events = useArray<T>()
    useEffect(() => {
        const listener = events.append
        target.addEventListener(type, listener, options)
        return () => {
            target.removeEventListener(type, listener)
        }
    }, [
        events,
        target,
        type,
        useDeepCompareConstant(options),
    ])
    useEffect(() => {
        events.value.forEach(listener)
    }, [
        events.value
    ])
}

import { DependencyList, EffectCallback, useEffect, useRef } from "react"

/**
 * Whether the component hasn't finished mounting: true until its first effects have run (and again if it remounts).
 * Set in an effect rather than during render, so a render React throws away doesn't count.
 */
export function useIsFirstMount() {
    const mounted = useRef(false)
    useEffect(() => {
        mounted.current = true
        return () => {
            mounted.current = false
        }
    }, [])
    return !mounted.current
}

/**
 * Wraps an effect so it's skipped the first time it runs after mounting (and after each remount), and runs every time
 * after. For the update effects: the first run is the mount.
 */
export function useSkipMount(effect: EffectCallback): EffectCallback {
    const ran = useRef(false)
    useEffect(() => {
        return () => {
            ran.current = false
        }
    }, [])
    return () => {
        if (!ran.current) {
            ran.current = true
            return
        }
        return effect()
    }
}

/**
 * Like useEffect, but not run when the component mounts: only when its dependencies change after.
 */
export function useUpdateEffect(effect: EffectCallback, deps: DependencyList) {
    const skipping = useSkipMount(effect)
    return useEffect(skipping, deps)
}

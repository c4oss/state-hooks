import { useCallback, useState } from "react"

/**
 * Returns a convenience method to throw an exception that is caught by the nearest error boundary: the component throws
 * it as it next renders, which is how an error boundary catches it.
 * @returns A method to throw an exception.
 */
export function useThrower() {
    // wrapped, so an exception that's a function isn't taken for a state updater
    const [thrown, setThrown] = useState<{ readonly exception: unknown }>()
    if (thrown !== undefined) {
        throw thrown.exception
    }
    return useCallback((exception: unknown) => setThrown({ exception }), [])
}

import { useEffect, useState } from "react"

/**
 * Creates an object URL (via `URL.createObjectURL`) for a blob, file or media source, and revokes it when the object changes or the component unmounts.
 * A string is treated as a URL that is already usable (such as a remote image `src`) and is returned unchanged.
 * For a blob or media source, the URL is created in an effect, so it is `undefined` on the first render and briefly after the object changes. It is never a URL that has already been revoked.
 * @param object The object to create a URL for, or a URL to pass through.
 * @returns The URL, or `undefined` if the object URL is not ready yet.
 */
export function useObjectUrl(object: Blob | MediaSource | string) {
    const [state, setState] = useState<string>()
    useEffect(() => {
        if (typeof object === "string") {
            return
        }
        const url = URL.createObjectURL(object)
        setState(url)
        return () => {
            URL.revokeObjectURL(url)
            setState(undefined)
        }
    }, [
        object
    ])
    if (typeof object === "string") {
        return object
    }
    return state
}

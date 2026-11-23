import { useLayoutEffect, useState } from "react"

/**
 * Creates an object URL (via `URL.createObjectURL`) for a blob, file or media source, and revokes it when the object changes or the component unmounts.
 * A string is treated as a URL that is already usable (such as a remote image `src`) and is returned unchanged.
 * For a blob or media source, the URL is made in a layout effect: after the first render, but before it's painted, so the
 * first frame shown already has it. It's never a URL made for another object, or one that has been revoked.
 * @param object The object to create a URL for, or a URL to pass through.
 * @returns The URL, or `undefined` on a render before it's made.
 */
export function useObjectUrl(object: Blob | MediaSource | string) {
    // the URL, with the object it's for: a new object has none until its own is made
    const [made, setMade] = useState<{ readonly object: Blob | MediaSource, readonly url: string }>()
    useLayoutEffect(() => {
        if (typeof object === "string") {
            return
        }
        const url = URL.createObjectURL(object)
        setMade({ object, url })
        return () => {
            URL.revokeObjectURL(url)
        }
    }, [
        object
    ])
    if (typeof object === "string") {
        return object
    }
    return made?.object === object ? made.url : undefined
}

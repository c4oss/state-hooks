import { useCallback, useEffect, useState } from "react"

function readLocalStorage(key: string) {
    return window.localStorage.getItem(key) ?? undefined
}

/**
 * A value in local storage, by key, and a function to set it: kept up to date as it's set (here, elsewhere in this tab,
 * or in another tab), and read again if the key changes.
 */
export function useLocalStorage(key: string) {
    // the last value seen, with its key: for another key, it's read afresh
    const [seen, setSeen] = useState(() => ({ key, value: readLocalStorage(key) }))
    const value = seen.key === key ? seen.value : readLocalStorage(key)
    useEffect(() => {
        const listen = (event: StorageEvent) => {
            if (event.key === key) {
                setSeen({ key, value: event.newValue ?? undefined })
            }
        }
        window.addEventListener("storage", listen)
        return () => {
            window.removeEventListener("storage", listen)
        }
    }, [
        key
    ])
    const setValue = useCallback((action: string | undefined | ((oldValue: string | undefined) => string | undefined)) => {
        const oldValue = window.localStorage.getItem(key)
        const newValue = typeof action === "function" ? action(oldValue ?? undefined) ?? null : action ?? null
        if (newValue === null) {
            window.localStorage.removeItem(key)
        }
        else {
            window.localStorage.setItem(key, newValue)
        }
        window.dispatchEvent(new StorageEvent("storage", {
            storageArea: window.localStorage,
            key,
            oldValue,
            newValue,
        }))
    }, [
        key
    ])
    return [value, setValue] as const
}

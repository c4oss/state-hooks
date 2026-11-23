import { EffectCallback, useState } from "react"
import { useEffectAt } from "./time.js"

export function useDebounce(debounceTime: number, callback: EffectCallback) {
    const [at, setAt] = useState<number>()
    useEffectAt(at, callback)
    return () => {
        setAt(Date.now() + debounceTime)
    }
}

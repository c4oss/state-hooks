import { dequal } from "dequal"
import { Dispatch, SetStateAction, useState } from "react"
import { useCustomCompareUpdateEffect } from "./custom-compare.js"

export function useSyncState<T>(inputValue: T, setInputValue?: Dispatch<SetStateAction<T>>) {
    return useCustomCompareSyncState(inputValue, setInputValue, (a, b) => a === b)
}
export function useDeepCompareSyncState<T>(inputValue: T, setInputValue?: Dispatch<SetStateAction<T>>) {
    return useCustomCompareSyncState(inputValue, setInputValue, dequal)
}
export function useCustomCompareSyncState<T>(inputValue: T, setInputValue: Dispatch<SetStateAction<T>> | undefined, compare: (a: T, b: T) => boolean) {
    const [value, setValue] = useState(inputValue)
    useCustomCompareUpdateEffect(() => {
        if (setInputValue === undefined) {
            setValue(inputValue)
        }
    },
        [inputValue] as const,
        (a, b) => compare(a as T, b as T))
    return [setInputValue !== undefined ? inputValue : value, setInputValue !== undefined ? setInputValue : setValue] as const
}

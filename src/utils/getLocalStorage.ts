import { Note } from "../types/notes"

export const getLocalStorgae = (key: string) => {
    const data = localStorage.getItem(key)
    if (!data) return null
    try {
        return JSON.parse(data) as Note[]
    } catch (error) {
        console.error("Error parsing localStorage data", error)
        return null
    }
}
// Array.from(new Set([...notes.map(note => note.tags).flat()]))

import { Note } from "../types/notes";

export const getTags = (notes: Note[]) => Array.from(new Set([...notes.map(note => note.tags).flat()]))
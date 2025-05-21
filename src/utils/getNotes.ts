import { Note } from "../types/notes";

export const getNotes = (notes: Note[]) => notes.filter(note => !note.isArchived)
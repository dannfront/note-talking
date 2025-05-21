import { Note } from "../types/notes";

export const getNotesArchives = (notes: Note[]) => notes.filter(note => note.isArchived)
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import supabase from "../lib/supabase/supabaseClient";
import { Tables } from "../types/supabase";
import { createTags, deleteTags, nullIdNote, updateTags } from "./tags";
import { CreateNote } from "../types/createNote";
import { getIdUserActive } from "./users";
import { UpdateNote } from "../types/updateNote";

type Note = Tables<'Notes'>


export async function createNewNote(note: CreateNote,) {
    try {

        const idUser = await getIdUserActive()

        if (!idUser) throw new Error('User not found')

        const { title, content, last_edited, isArchived, tags } = note

        const { data, error: errorCreate } = await supabase
            .from('Notes')
            .insert([
                {
                    title: title,
                    content: content,
                    lastEdited: last_edited,
                    isArchived: isArchived,
                    id_user: idUser,
                    id_tags: null,
                },
            ])
            .select() as unknown as PostgrestSingleResponse<Note[]>

        if (errorCreate || data.length === 0) {
            throw errorCreate
        }

        const idNote = data[0].id

        const idTags = await createTags(tags, idNote, idUser)

        if (!idTags) {
            throw new Error('Error creating tags')
        }

        const { error: errorUpdate } = await supabase
            .from('Notes')
            .update({ id_tags: idTags })
            .eq('id', idNote)


        if (errorUpdate) {
            throw errorUpdate
        }

        return data[0].id
    } catch (error) {
        console.error('Error creating note:', error)
        throw error
    }
}


export async function updateNotes(note: UpdateNote) {

    const { tags, id, ...rest } = note


    try {
        const { data, error } = await supabase
            .from('Notes')
            .update({ ...rest, lastEdited: new Date() })
            .eq('id', id)
            .select()

        if (error || data.length === 0) throw error

        const isUpdated = await updateTags(tags, id)

        if (!isUpdated) throw new Error('Error updating tags')

        return true

    } catch (error) {
        console.error('Error updating note:', error)
        return null
    }

}


export async function archivedNote(id: number) {
    try {

        const { data, error } = await supabase
            .from('Notes')
            .update({ isArchived: true })
            .eq('id', id)
            .select()
        if (error || data.length === 0) throw error

        return true

    } catch (error) {
        console.error('Error archiving note:', error)
        return null
    }
}

export async function restoreNote(id: number) {
    try {

        const { data, error } = await supabase
            .from('Notes')
            .update({ isArchived: false })
            .eq('id', id)
            .select()
        if (error || data.length === 0) throw error

        return true

    } catch (error) {
        console.error('Error restoring note:', error)
        return null
    }
}

export async function deleteNote(id: number) {

    try {

        const idTag = await selectIdTags(id) as number

        const [nullTags, nullNote] = await Promise.all([nullIdTags(idTag), nullIdNote(id)])

        if (!nullTags || !nullNote) throw new Error('Error nulling tags or note')

        const { data, error } = await supabase
            .from('Notes')
            .delete()
            .eq('id', id)
            .select()

        await deleteTags(idTag)
        if (error || data.length === 0) throw error
        return true

    } catch (error) {
        console.error('Error deleting note:', error)
        return null
    }

}

async function selectIdTags(idNote: number) {
    try {
        const { data, error } = await supabase
            .from('Notes')
            .select('id_tags')
            .eq('id', idNote)
            .single()

        if (error || !data) throw error

        return data.id_tags

    } catch (error) {
        console.error('Error selecting id_tags:', error)
        return null
    }

}

async function nullIdTags(id: number) {
    try {
        const { data, error } = await supabase
            .from('Notes')
            .update({ "id_tags": null })
            .eq('id_tags', id)
            .select()
            .single()

        if (error || !data) throw error
        return true

    } catch (error) {
        console.log(error);

        return null
    }
}

export async function getNotes(isArchived: boolean = false) {


    try {
        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError

        const { data, error } = await supabase
            .from("Notes")
            .select(`
            id,
            title,
            content,
            lastEdited,
            isArchived,
            Tags!Notes_id_tags_fkey (
            tags
            )
            `)
            .eq("id_user", user!.id)
            .eq("isArchived", isArchived)

        if (error) throw error

        return data


    } catch (error) {
        console.error('Error getting notes:', error)
        return null
    }

}


export async function getAllNotes() {
    try {
        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError

        const { data, error } = await supabase
            .from("Notes")
            .select(`
            id,
            title,
            content,
            lastEdited,
            isArchived,
            Tags!Notes_id_tags_fkey (
            tags
            )
            `)
            .eq("id_user", user!.id)


        if (error) throw error

        return data
    } catch (error) {
        console.log(error);

        return null
    }
}
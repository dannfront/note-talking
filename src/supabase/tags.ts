import { PostgrestSingleResponse } from "@supabase/supabase-js";
import supabase from "../lib/supabase/supabaseClient";
import { Tables } from "../types/supabase";

type Tags = Tables<'Tags'>

export async function createTags(tags: string[], idNote: number, idUser: string) {

    try {

        const { data, error } = await supabase
            .from('Tags')
            .insert([
                { tags: tags, id_note: idNote, id_user: idUser },
            ])
            .select() as unknown as PostgrestSingleResponse<Tags[]>


        if (error || data.length === 0) {
            throw error
        }

        return data[0].id



    } catch (error) {
        console.error('Error creating tags:', error)
        return null
    }

}

export async function updateTags(tags: string[], id_note: number) {

    try {

        const { data, error } = await supabase
            .from('Tags')
            .update({ tags: tags })
            .eq('id_note', id_note)
            .select()

        if (error || data.length === 0) {
            throw error
        }

        return true
    } catch (error) {
        console.error('Error updating tags:', error)
        return null
    }

}

export async function nullIdNote(id: number) {

    try {
        const { data, error } = await supabase
            .from('Tags')
            .update({ "id_note": null })
            .eq('id_note', id)
            .select()
        if (data?.length === 0 || error) {
            throw error

        }
        return true
    } catch (error) {
        return null
    }

}

export async function deleteTags(id: number) {
    try {
        const { data, error } = await supabase
            .from('Tags')
            .delete()
            .eq('id', id)
            .select()

        if (error || data.length === 0) {
            throw error
        }

        return true
    } catch (error) {
        return null
    }
}

export async function getTags() {
    try {

        const { data: { user } } = await supabase.auth.getUser()

        if (!user) return null


        const { data, error } = await supabase
            .from("Tags")
            .select(`
                tags
            `)
            .eq("id_user", user?.id);


        if (error) throw error
        const tags = data?.map(item => item.tags).flat()
        const uniqueTags = Array.from(new Set(tags))
        return uniqueTags || []

    } catch (error) {
        console.log(error);

        return null
    }
}



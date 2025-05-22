import supabase from "../lib/supabase/supabaseClient";



export async function signIn(email: string, password: string) {

    try {

        const { data: { user }, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) throw error;
        if (!user) throw new Error("User not found");

        return user;
    } catch (error) {
        console.log(error);

        return null;
    }

}

export const signUp = async (email: string, password: string) => {
    try {

        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error) throw error;

        return data;

    } catch (error) {
        console.log(error);

        return null;
    }
};


export async function getIdUserActive() {
    try {
        const { data: { user }, error } = await supabase.auth.getUser();

        if (!user || error) throw error;

        return user.id;
    } catch (error) {
        console.log(error);

        return null;
    }
}

export async function updatePassword(newPassword: string) {
    try {
        const { error } = await supabase.auth.updateUser({
            password: newPassword
        });

        if (error) throw error;

        return true;
    } catch (error) {
        console.log(error);

        return null;
    }

}

export async function signOut() {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) throw error;

        return true;
    } catch (error) {
        console.log(error);

        return null;
    }
}
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface UserProfile {
    id: string;
    email: string;
    full_name: string | null;
    avatar_url: string | null;
    plan: 'free' | 'pro' | 'team';
    google_drive_connected: boolean;
    google_drive_folder_id: string | null;
    created_at: string;
}

export interface Project {
    id: string;
    user_id: string;
    name: string;
    client_name: string;
    description: string | null;
    photo_count: number;
    created_at: string;
    updated_at: string;
}

export interface Photo {
    id: string;
    project_id: string;
    user_id: string;
    file_name: string;
    drive_file_id: string | null;
    latitude: number | null;
    longitude: number | null;
    address: string | null;
    captured_at: string;
    ai_description: string | null;
    created_at: string;
}

// Auth functions
export async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${window.location.origin}/auth/callback`,
            scopes: 'https://www.googleapis.com/auth/drive.file',
        },
    });

    if (error) throw error;
    return data;
}

export async function signInWithEmail(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;
    return data;
}

export async function signUpWithEmail(email: string, password: string, fullName: string) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
            },
        },
    });

    if (error) throw error;
    return data;
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

export async function getSession() {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
}

export async function getUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
}

// Profile functions
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
        .from('sitesnap_profiles')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
    }
    return data;
}

export async function updateUserProfile(userId: string, updates: Partial<UserProfile>) {
    const { data, error } = await supabase
        .from('sitesnap_profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

// Project functions
export async function getProjects(userId: string): Promise<Project[]> {
    const { data, error } = await supabase
        .from('sitesnap_projects')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

export async function createProject(project: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'photo_count'>) {
    const { data, error } = await supabase
        .from('sitesnap_projects')
        .insert(project)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function updateProject(projectId: string, updates: Partial<Project>) {
    const { data, error } = await supabase
        .from('sitesnap_projects')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', projectId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function deleteProject(projectId: string) {
    const { error } = await supabase
        .from('sitesnap_projects')
        .delete()
        .eq('id', projectId);

    if (error) throw error;
}

// Photo functions
export async function getPhotos(projectId: string): Promise<Photo[]> {
    const { data, error } = await supabase
        .from('sitesnap_photos')
        .select('*')
        .eq('project_id', projectId)
        .order('captured_at', { ascending: false });

    if (error) throw error;
    return data || [];
}

export async function createPhoto(photo: Omit<Photo, 'id' | 'created_at'>) {
    const { data, error } = await supabase
        .from('sitesnap_photos')
        .insert(photo)
        .select()
        .single();

    if (error) throw error;

    // Increment project photo count
    await supabase.rpc('sitesnap_increment_photo_count', { p_project_id: photo.project_id });

    return data;
}

export async function deletePhoto(photoId: string, projectId: string) {
    const { error } = await supabase
        .from('sitesnap_photos')
        .delete()
        .eq('id', photoId);

    if (error) throw error;

    // Decrement project photo count
    await supabase.rpc('sitesnap_decrement_photo_count', { p_project_id: projectId });
}

// Subscription to auth changes
export function onAuthStateChange(callback: (event: string, session: unknown) => void) {
    return supabase.auth.onAuthStateChange(callback);
}

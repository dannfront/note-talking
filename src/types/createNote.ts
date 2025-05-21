export interface CreateNote {
    title: string;
    content: string;
    tags: string[];
    last_edited?: Date;
    isArchived?: boolean;
    id_user?: number;
    id_tags?: number;
}

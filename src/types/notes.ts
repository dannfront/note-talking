export interface Note {
    title: string;
    Tags: { tags: string[] };
    content: string;
    lastEdited: string;
    isArchived?: boolean;
    id?: string;
}
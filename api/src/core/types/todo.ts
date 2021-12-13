export interface TodoItem {
    id: string;
    title: string;
    description: string;
    dateCreated: number;
    dateDue: number;
}

export interface UpdateData {
    title: string;
    description: string;
    dateDue: number;
    id?: string;
}

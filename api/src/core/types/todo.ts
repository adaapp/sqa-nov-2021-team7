export interface TodoItem {
    id: string;
    title: string;
    description: string;
    dateCreated: Date;
    dateDue: Date;
}

export interface UpdateData {
    title: string;
    description: string;
    dateDue: Date;
    id?: string;
}

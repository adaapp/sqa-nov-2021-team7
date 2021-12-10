export interface TodoItem {
    title: string,
    description?: string,
    dateCreated: number,
    dateDue?: number,
    deleteTodo: (id: string) => Promise<void>,
    id: string
}

export interface SuccessResponse {
    data?: unknown,
    message?: string
    id?: string
}

export interface ErrorResponse {
    data?: unknown,
    error?: string
}

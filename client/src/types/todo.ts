export interface TodoItem {
    title: string,
    description?: string,
    dateCreated: Date,
    dateDue?: Date,
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

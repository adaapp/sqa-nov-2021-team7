export interface TodoItem {
    title: string,
    description?: string,
    dateCreated: number,
    dateDue?: number
}

export interface SuccessResponse {
    data?: unknown,
    message?: string
}

export interface ErrorResponse {
    data?: unknown,
    error?: string
}

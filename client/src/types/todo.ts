export interface TodoItem {
    id: string,
    description: string,
    modifiedAt: Date,
    dueDate: Date
}

export interface SuccessResponse {
    message: string
}

export interface ErrorResponse {
    error: string
}
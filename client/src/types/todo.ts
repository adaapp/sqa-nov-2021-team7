export interface TodoItem {
    title: string,
    description?: string,
    dateCreated: Date,
    dateDue?: Date
}

export interface SuccessResponse {
    message: string
}

export interface ErrorResponse {
    error: string
}

export interface ValidationError {
    field: string;
    message: string;
}

export interface ErrorResponse {
    success: boolean;
    message: string;
    errors?: ValidationError[];
}

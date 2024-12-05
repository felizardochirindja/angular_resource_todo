export interface Todo {
    id: number
    todo: string
    completed: boolean
}

type ApiResponse<T> = {
    todos: T[]
    total: number
    skip: number
    limit: number
}

export type TodoResponse = ApiResponse<Todo>;

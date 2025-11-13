
export interface User {
    id: number;
    name: string;
    email: string;
    birthday_date?: string;
    working?: string;
}

export interface Task {
    id: number;
    title: string;
    description?: string;
    status: "nao_iniciada" | "em_progresso" | "concluida";
    userId: number;
    user?: User;
    initial_date?: string;
    finished_date?: string;
}

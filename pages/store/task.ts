import create from "zustand";

export interface Task {
    correct: string;
    incorrect: string;
}

export interface TaskState {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
}

export const useTasks = create<TaskState>((set) => ({
    tasks: [],
    setTasks: (tasks: Task[]) => set({ tasks: tasks }),
}));

import create from "zustand";
import { Condition } from "./participant";

export interface Task {
    correct: string;
    incorrect: string;
    condition: Condition;
    soundPath: string;
}

export interface TaskState {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
}

export const useTasks = create<TaskState>((set) => ({
    tasks: [],
    setTasks: (tasks: Task[]) => set({ tasks: tasks }),
}));

import create from "zustand";

export type Correctness = "correct" | "incorrect";
export type Condition = "experimental" | "control";
export type Nationality = "hungarian" | "danish";
export type Sex = "male" | "female" | "other";

export interface MousePosition {
    x: number;
    y: number;
    timestamp: number;
}
export interface Result {
    correct: string;
    incorrect: string;
    chosen: Correctness;
    condition: Condition;
    elapsedTime: number;
    mouseTrackingData: MousePosition[];
}
export interface Participant {
    id: string;
    nationality: Nationality;
    sex: Sex;
    screenHeight: number;
    screenWidth: number;
}

export interface Experiment {
    participant?: Participant;
    results: Result[];
    addResult: (result: Result) => void;
    setParticipant: (participant: Participant) => void;
}

export const useExperiment = create<Experiment>((set) => ({
    participant: undefined,
    results: [],
    addResult: (result: Result) =>
        set((state) => ({ results: [...state.results, result] })),
    setParticipant: (participant: Participant) =>
        set({ participant: participant }),
}));

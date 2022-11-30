import create from "zustand";

export interface MousePosition {
    x: number;
    y: number;
    timestamp: number;
}
export interface Result {
    correct: string;
    incorrect: string;
    chosen: "correct" | "incorrect";
    elapsedTime: number;
    mouseTrackingData: MousePosition[];
}
export interface Participant {
    id: string;
    nationality: "danish" | "hungarian";
    sex: "male" | "female" | "other";
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

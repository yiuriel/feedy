import { create } from "zustand";

type Answer = string | string[];

interface FeedbackFormState {
  answers: Record<string, Answer>;
  setAnswer: (questionId: string, answer: Answer) => void;
  resetAnswers: () => void;
  step: number;
  maxStep: number;
  setStep: (step: number) => void;
  setMaxStep: (step: number) => void;
}

export const useFeedbackFormStore = create<FeedbackFormState>((set) => ({
  answers: {},
  setAnswer: (questionId, answer) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [questionId]: answer,
      },
    })),
  resetAnswers: () => set({ answers: {} }),
  step: 1,
  maxStep: 0,
  setStep: (step: number) => set({ step }),
  setMaxStep: (maxStep: number) => set({ maxStep }),
}));

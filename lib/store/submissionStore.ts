import { create } from "zustand";
import { Submission } from "@/lib/api";

interface SubmissionStore {
  currentSubmission: Submission | null;
  submissions: Submission[];
  setCurrentSubmission: (submission: Submission | null | undefined) => void;
  addSubmission: (submission: Submission | undefined) => void;
  clearSubmissions: () => void;
}

export const useSubmissionStore = create<SubmissionStore>((set) => ({
  currentSubmission: null,
  submissions: [],
  setCurrentSubmission: (submission) =>
    set({ currentSubmission: submission || null }),
  addSubmission: (submission) =>
    set((state) => ({
      submissions: submission ? [submission, ...state.submissions] : state.submissions,
    })),
  clearSubmissions: () => set({ submissions: [] }),
}));
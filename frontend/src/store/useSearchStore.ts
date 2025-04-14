import { create } from "zustand";

interface SearchStore {
  term: string;
  setTerm: (value: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  term: "",
  setTerm: (value) => set({ term: value }),
}));

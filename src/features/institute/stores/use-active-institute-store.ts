import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ActiveInstituteState {
  activeInstituteId: string;
  setActiveInstitute: (id: string) => void;
}

export const useActiveInstituteStore = create<ActiveInstituteState>()(
  persist(
    (set) => ({
      activeInstituteId: "",
      setActiveInstitute: (id) => set({ activeInstituteId: id }),
    }),
    { name: "active-institute" },
  ),
);

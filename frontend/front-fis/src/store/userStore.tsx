import { create } from "zustand";

interface UserState {
  userId: number | null;
  setUserId: (id: number) => void;
  loadUserId: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userId: null,
  setUserId: (id) => {
    localStorage.setItem("userId", id.toString());
    set({ userId: id });
  },
  loadUserId: () => {
    const storedId = localStorage.getItem("userId");
    if (storedId) {
      set({ userId: parseInt(storedId) });
    }
  },
}));
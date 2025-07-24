import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  userStatus: string | null;
  login: (userStatus?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  userStatus: null,
  login: (userStatus) => set({ isLoggedIn: true, userStatus: userStatus ?? null }),
  logout: () => set({ isLoggedIn: false, userStatus: null }),
}));
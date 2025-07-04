import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  login: (token?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  token: null,
  login: (token) => set({ isLoggedIn: true, token: token ?? null }),
  logout: () => set({ isLoggedIn: false, token: null }),
}));

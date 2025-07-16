import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
  userStatus: string | null; 
  login: (token?: string, userStatus?: string) => void; 
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  token: null,
  userStatus: null, 
  login: (token, userStatus) => set({ isLoggedIn: true, token: token ?? null, userStatus: userStatus ?? null }),
  logout: () => set({ isLoggedIn: false, token: null, userStatus: null }),
}));
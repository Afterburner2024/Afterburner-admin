import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const { isLoggedIn, token, login, logout } = useAuthStore();
  return { isLoggedIn, token, login, logout };
}

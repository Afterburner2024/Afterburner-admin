import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const { isLoggedIn, login, logout } = useAuthStore();
  return { isLoggedIn, login, logout };
}

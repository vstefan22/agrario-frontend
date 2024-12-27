import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
  token: string | null;

  setUser: (user: any | null) => void;
  setToken: (token: string) => void;
  clearAuth: () => void;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      clearAuth: () => set({ user: null, isAuthenticated: false, token: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { StoreUser } from '../types/user-types';

interface AuthState {
  user: StoreUser | null;
  isAuthenticated: boolean;
  token: string | null;

  setUser: (user: StoreUser | null) => void;
  updateUser: (userData: Partial<StoreUser>) => void;
  setToken: (token: string) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,

      setUser: (user) => set({ user, isAuthenticated: !!user }),
      updateUser: (userData) =>
        set((state) => {
          if (!state.user) return {};
          const updatedUser = { ...state.user, ...userData };
          return {
            user: updatedUser,
            isAuthenticated: !!updatedUser,
          };
        }),
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

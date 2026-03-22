import { create } from 'zustand';

type User = {
  userId: string;
  email: string;
  role: string;
  entityId: string;
};

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  setAuth: (payload: { accessToken: string; refreshToken: string; user: User }) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  setAuth: ({ accessToken, refreshToken, user }) =>
    set({
      accessToken,
      refreshToken,
      user,
    }),
  clearAuth: () => set({ accessToken: null, refreshToken: null, user: null }),
}));

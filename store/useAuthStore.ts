import { create } from "zustand";
import { persist } from "zustand/middleware";
import { setAuthCookie, getAuthCookie, clearAuthCookie } from "@/lib/cookies";

interface AuthState {
  isLoggedIn: boolean;
  userEmail: string | null;
  userName: string | null;
  token: string | null;
  setAuth: (data: { token: string; email: string; name?: string }) => void;
  logout: () => void;
  hydrateFromCookie: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      userEmail: null,
      userName: null,
      token: null,
      setAuth: (data) => {
        setAuthCookie({ token: data.token, email: data.email, name: data.name });
        set({
          isLoggedIn: true,
          token: data.token,
          userEmail: data.email,
          userName: data.name ?? null,
        });
      },
      logout: () => {
        clearAuthCookie();
        set({ isLoggedIn: false, token: null, userEmail: null, userName: null });
      },
      hydrateFromCookie: () => {
        const data = getAuthCookie();
        const state = get();
        if (data?.token) {
          set({
            isLoggedIn: true,
            token: data.token,
            userEmail: data.email,
            userName: data.name ?? null,
          });
        } else if (!data && state.token) {
          clearAuthCookie();
          set({ isLoggedIn: false, token: null, userEmail: null, userName: null });
        }
      },
    }),
    { name: "auth-storage" }
  )
);

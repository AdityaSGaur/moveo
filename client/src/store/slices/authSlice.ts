import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const getStoredUser = (): User | null => {
  if (typeof window === "undefined") return null;
  try {
    const item = localStorage.getItem("moveo_user");
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initializeAuth: (state) => {
      if (typeof window !== "undefined") {
        try {
          const item = localStorage.getItem("moveo_user");
          if (item) {
            const user = JSON.parse(item);
            state.user = user;
            state.isAuthenticated = true;
          }
        } catch {
          // Ignore invalid JSON in localStorage
        }
      }
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem("moveo_user", JSON.stringify(action.payload));
        } catch (e) {
          console.error("Failed to save user in localStorage", e);
        }
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem("moveo_user");
        } catch (e) {
          console.error("Failed to remove user from localStorage", e);
        }
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { initializeAuth, setUser, logout, setLoading, setError } = authSlice.actions;
export default authSlice.reducer;


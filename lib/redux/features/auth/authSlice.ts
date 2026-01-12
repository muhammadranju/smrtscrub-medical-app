/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthState, User } from "@/interface/auth.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import type { RootState } from "../../store";

// Load initial state from localStorage (if available)
const loadAuthFromStorage = (): Partial<AuthState> => {
  if (typeof window === "undefined") return {};

  try {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const accessToken = Cookies.get("token");

    if (token || accessToken) {
      return {
        token: token || accessToken,
        user: null,
        isAuthenticated: true,
      };
    }
  } catch (error) {
    console.error("Error loading auth from storage:", error);
  }

  return {};
};

const initialState: AuthState = {
  user: null,
  token: null,
  authToken: null,
  isAuthenticated: false,
  isLoading: false,
  userEmail: "",
  logout: false,
  moduleTitle: "",
  ...loadAuthFromStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state: any,
      action: PayloadAction<{ user: User; token: string; remember?: boolean }>,
    ) => {
      const { user, token, remember } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      // Save to localStorage
      if (typeof window !== "undefined") {
        if (remember) {
          Cookies.set("token", token, { expires: 7 }); // Persistent for 7 days
          localStorage.setItem("token", token);
          sessionStorage.removeItem("token");
        } else {
          Cookies.set("token", token); // Session cookie
          sessionStorage.setItem("token", token);
          localStorage.removeItem("token");
        }
      }
    },
    logout: (state: any) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.userEmail = "";
      state.authToken = "";
      Cookies.remove("token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Clear localStorage
      if (typeof window !== "undefined") {
        Cookies.remove("token");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
      }

      if (!Cookies.get("token")) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
      }
    },
    setLoading: (state: any, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setAuthToken: (state: any, action: PayloadAction<string>) => {
      state.authToken = action.payload;
    },

    setUserEmail: (state: any, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
    setLogout: (state: any) => {
      state.isAuthenticated = false;
      state.userEmail = "";
      state.authToken = "";
      Cookies.remove("token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      state.isLoading = false;
      state.user = null;
      state.token = null;
      state.authToken = null;
      state.isAuthenticated = false;

      // Only redirect in browser environment
      if (typeof window !== "undefined") {
        // window.location.href = "/login?logout=true";
        window.location.href = `/login?redirect=${window.location.pathname.slice(
          1,
        )}`;
      }
    },

    setModuleTitle: (state: any, action: PayloadAction<string>) => {
      state.moduleTitle = action.payload;
    },
  },
});

// Fixed: Export all actions including setUserEmail and setAuthToken
export const {
  setCredentials,
  logout,
  setLoading,
  setAuthToken,
  setUserEmail,
  setLogout,
} = authSlice.actions;

// Selectors
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthToken = (state: RootState) => state.auth.authToken;
export const selectUserEmail = (state: RootState) => state.auth.userEmail;
export const selectLogout = (state: RootState) => state.auth.logout;

export const selectModuleTitle = (state: RootState) => state.auth.moduleTitle;

export default authSlice.reducer;

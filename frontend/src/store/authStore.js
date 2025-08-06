import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const API_URL = "http://localhost:3000/api/v1/user";
axios.defaults.withCredentials = true;

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      error: null,
      isLoading: false,

      // ✅ Signup function
      signup: async (fullName, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}`, {
            fullName,
            email,
            password,
          });
          set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Error in signing up",
            isLoading: false,
          });
        }
      },

      // ✅ Login function
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await axios.post(`${API_URL}/login`, { email, password });
          set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({
            error: error.response?.data?.message || "Error logging in",
            isLoading: false,
          });
        }
      },

      // ✅ Logout function (clears cookies)
      logout: async () => {
        try {
          await axios.post(`${API_URL}/logout`);
          set({ user: null, isAuthenticated: false, error: null, isLoading: false });
        } catch (error) {
          set({ error: "Error logging out", isLoading: false });
          throw error;
        }
      },

      // ✅ Validate token on page reload
      checkAuth: async () => {
        set({ isLoading: true });
        try {
          const { data } = await axios.get(`${API_URL}/validate-token`);
          set({ user: data.user, isAuthenticated: true, isLoading: false });
        } catch (error) {
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage", // LocalStorage key
      getStorage: () => localStorage,
    }
  )
);

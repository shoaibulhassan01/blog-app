import axios from "axios";
import { create } from "zustand";

const API_URL = "http://localhost:3000/api/v1/blog";
const CATEGORY_API_URL = "http://localhost:3000/api/v1/category"; // Categories API
axios.defaults.withCredentials = true;

export const useBlogStore = create((set) => ({
  allBlogs: [],
  blogsByUser: [],
  categories: [],
  categoriesByUser: [],

  // Fetch All Blogs
  fetchBlogs: async () => {
    try {
      const response = await axios.get(API_URL);
      set((state) => ({
        ...state,
        allBlogs: response.data,  // Merge current state with new blog data
      }));
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  },

  // Fetch Blogs By User
  fetchBlogsByUser: async (userId) => {
    await set((state) => ({
      ...state,
      blogsByUser: [],  // Clear blogsByUser before fetching new ones
    }));
    try {
      const response = await axios.get(`${API_URL}?userId=${userId}`);
      set((state) => ({
        ...state,
        blogsByUser: response.data,
      }));
    } catch (error) {
      console.error("Error fetching user blogs:", error);
    }
  },

  // Fetch Categories
  fetchCategories: async () => {
    try {
      const response = await axios.get(CATEGORY_API_URL);
      set((state) => ({
        ...state,
        categories: response.data, // Merge current state with new category data
      }));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },

  // Fetch Categories By User
  fetchCategoriesByUser: async (userId) => {
     set((state) => ({
      ...state,
      categoriesByUser: [],  // Clear categoriesByUser before fetching new ones
    }));
    try {
      const response = await axios.get(`${CATEGORY_API_URL}?userId=${userId}`);
      set((state) => ({
        ...state,
        categoriesByUser: response.data,
      }));
    } catch (error) {
      console.error("Error fetching user categories:", error);
    }
  },
}));

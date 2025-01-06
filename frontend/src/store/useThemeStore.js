import { create } from "zustand";

export const useThemeStore = create((set) => ({
  
  //holds the current theme value 
  theme: localStorage.getItem("chat-theme") || "coffee",
  setTheme: (theme) => {
    // saving theme   to the local storage with the key "chat-theme"
    localStorage.setItem("chat-theme", theme);
    // document.documentElement.setAttribute("data-theme", theme); // Apply theme
    set({ theme });
  },
}));
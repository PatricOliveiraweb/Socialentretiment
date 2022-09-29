import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
// <reference types="vite-plugin-svgr/client" />
export default defineConfig({
  plugins: [react(), svgr()],
});

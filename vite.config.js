import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/gerador-de-defeza/", // substitua pelo nome correto do seu repositório
  plugins: [react()],
});

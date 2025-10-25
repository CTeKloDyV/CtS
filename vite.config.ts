import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
import { fileURLToPath, URL } from "url";
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@mui/material",
        replacement: fileURLToPath(
          new URL("./node_modules/@mui/material", import.meta.url)
        ),
      },
    ],
  },
});

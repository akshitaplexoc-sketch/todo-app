import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cwd } from 'node:process';
 
function copyIndexTo404() {
  return {
    name: 'copy-index-to-404',
    closeBundle() {
      const distDir = resolve(cwd(), 'dist')
      copyFileSync(resolve(distDir, 'index.html'), resolve(distDir, '404.html'))
    },
  }
}
export default defineConfig({
 plugins: [react(), copyIndexTo404()],
  base: "/todo-app/",
});
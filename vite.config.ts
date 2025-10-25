import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import Pages from "vite-plugin-pages";
import getRepoName from "git-repo-name";

export default defineConfig(({ command, mode }) => {
    const isGitHubPages = mode === 'github-pages'
    const base = isGitHubPages ? `/${getRepoName.sync()}/` : '/'
  
    return {
      plugins: [react(), Pages()],
      base: base,
      build: {
        outDir: isGitHubPages ? 'dist-github' : 'dist',
        sourcemap: false,
        minify: 'esbuild'
      },
      server: {
        host: '0.0.0.0',
        port: process.env.PORT ? parseInt(process.env.PORT) : 3000
      },
      preview: {
        host: '0.0.0.0',
        port: process.env.PORT ? parseInt(process.env.PORT) : 3000
      },
      resolve: {
        alias: {
          "@": path.resolve(__dirname, "./src"),
        },
      },
    }
  })
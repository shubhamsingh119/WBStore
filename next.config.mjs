import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the Turbopack workspace root to this project so it doesn't scan
  // parent directories (e.g. a stray lockfile in the user's home folder).
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;

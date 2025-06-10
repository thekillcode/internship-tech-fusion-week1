/// <reference types="vite/client" />


interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_ENV: string;
  // add more environment variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
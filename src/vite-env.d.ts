/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STREAM_API_KEY_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string;
  readonly VITE_REGION: string;
  readonly VITE_IDENTITY_POOL_ID: string;
  readonly VITE_TRANSLIMIT_IN_MINUTES: string;
  readonly VITE_SECONDS_IN_MINUTE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** Must match Django mount: `/api/v1` + RTK paths like `/user/auth/...` */
export const BASE_URL =
  import.meta.env.VITE_BASE_URL ?? "http://127.0.0.1:8000/api/v1";

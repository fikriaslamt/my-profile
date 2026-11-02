/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Formspree / Web3Forms / Resend-compatible POST endpoint. */
  readonly PUBLIC_CONTACT_ENDPOINT?: string;
  /** Optional override for the mailto fallback address. */
  readonly PUBLIC_CONTACT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

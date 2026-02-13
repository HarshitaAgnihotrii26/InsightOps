// Vite environment typings for TypeScript
// Declares `import.meta.env` keys used in this project (VITE_* variables)
interface ImportMetaEnv {
  readonly VITE_OPENROUTER_API_KEY?: string;
  // add more `VITE_` keys here as needed
  [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
